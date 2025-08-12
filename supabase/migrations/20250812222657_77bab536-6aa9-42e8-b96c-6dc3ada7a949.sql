
-- 1) Tipos ENUM
create type public.referral_status as enum ('pending','activated','invalid','fraud');
create type public.referral_reward_status as enum ('granted','used','revoked');
create type public.referral_reward_type as enum ('videos_badge','comunidade_wpp','mentoria');

-- 2) Função helper de admin (baseada em profiles.status = 'admin')
create or replace function public.is_admin(uid uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles p
    where p.id = uid
      and p.status = 'admin'
  );
$$;

-- 3) Tabelas
create table public.referrals (
  id uuid primary key default gen_random_uuid(),
  referrer_email text not null,
  referee_profile_id uuid not null references public.profiles(id) on delete cascade,
  status public.referral_status not null default 'pending',
  created_at timestamptz not null default now(),
  activated_at timestamptz null,
  constraint unique_referral_per_referee unique (referee_profile_id)
);

create index referrals_referrer_email_idx on public.referrals (referrer_email);
create index referrals_status_idx on public.referrals (status);

create table public.referral_rewards (
  id uuid primary key default gen_random_uuid(),
  user_id uuid null references public.profiles(id) on delete set null,
  referrer_email text not null,
  reward public.referral_reward_type not null,
  status public.referral_reward_status not null default 'granted',
  metadata jsonb not null default '{}'::jsonb,
  granted_at timestamptz not null default now(),
  constraint unique_reward_per_email unique (referrer_email, reward)
);

create index referral_rewards_user_idx on public.referral_rewards (user_id);
create index referral_rewards_email_idx on public.referral_rewards (referrer_email);

-- 4) RLS
alter table public.referrals enable row level security;
alter table public.referral_rewards enable row level security;

-- referrals: SELECT (indicado vê o seu, indicador vê por e-mail, admin vê todos)
create policy "Referee can view own referral"
  on public.referrals for select
  using (auth.uid() = referee_profile_id);

create policy "Referrer can view referrals by email"
  on public.referrals for select
  using (
    exists (
      select 1
      from public.profiles p
      where p.id = auth.uid()
        and lower(coalesce(p.email, '')) = referrer_email
    )
  );

create policy "Admin can select referrals"
  on public.referrals for select
  using (public.is_admin(auth.uid()));

-- referrals: INSERT (apenas o indicado cria o próprio registro)
create policy "Referee can insert own referral"
  on public.referrals for insert
  with check (auth.uid() = referee_profile_id);

-- referrals: UPDATE/DELETE (apenas admin)
create policy "Admin can update referrals"
  on public.referrals for update
  using (public.is_admin(auth.uid()))
  with check (public.is_admin(auth.uid()));

create policy "Admin can delete referrals"
  on public.referrals for delete
  using (public.is_admin(auth.uid()));

-- referral_rewards: SELECT (dono por user_id, dono por e-mail, admin)
create policy "Owner by user_id can select rewards"
  on public.referral_rewards for select
  using (auth.uid() = user_id);

create policy "Owner by email can select rewards"
  on public.referral_rewards for select
  using (
    exists (
      select 1
      from public.profiles p
      where p.id = auth.uid()
        and lower(coalesce(p.email, '')) = referrer_email
    )
  );

create policy "Admin can select rewards"
  on public.referral_rewards for select
  using (public.is_admin(auth.uid()));

-- referral_rewards: INSERT/UPDATE/DELETE (apenas admin; triggers internos bypassam RLS)
create policy "Admin can write rewards"
  on public.referral_rewards for all
  using (public.is_admin(auth.uid()))
  with check (public.is_admin(auth.uid()));

-- 5) Triggers utilitários: normalizar e-mail para lowercase
create or replace function public.normalize_referrer_email()
returns trigger
language plpgsql
as $$
begin
  if new.referrer_email is not null then
    new.referrer_email := lower(new.referrer_email);
  end if;
  return new;
end;
$$;

create trigger referrals_normalize_email
  before insert or update on public.referrals
  for each row execute function public.normalize_referrer_email();

create trigger referral_rewards_normalize_email
  before insert or update on public.referral_rewards
  for each row execute function public.normalize_referrer_email();

-- 6) Trigger para impedir auto-indicação
create or replace function public.prevent_self_referral()
returns trigger
language plpgsql
as $$
declare
  referee_email text;
begin
  select lower(coalesce(email, '')) into referee_email
  from public.profiles
  where id = new.referee_profile_id;

  if referee_email = lower(coalesce(new.referrer_email, '')) then
    raise exception 'Auto-indicação não permitida (referrer_email igual ao e-mail do indicado)';
  end if;

  return new;
end;
$$;

create trigger referrals_prevent_self_referral
  before insert on public.referrals
  for each row execute function public.prevent_self_referral();

-- 7) Função para conceder prêmios com deduplicação
create or replace function public.grant_rewards_for_referrer(_email text)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  cnt int;
  _user_id uuid;
begin
  select count(*) into cnt
  from public.referrals
  where referrer_email = lower(_email)
    and status = 'activated';

  select id into _user_id
  from public.profiles
  where lower(coalesce(email, '')) = lower(_email)
  limit 1;

  -- Marco 1: videos_badge
  if cnt >= 1 then
    insert into public.referral_rewards (user_id, referrer_email, reward, status, metadata)
    values (_user_id, lower(_email), 'videos_badge', 'granted', jsonb_build_object('milestone', 1))
    on conflict (referrer_email, reward) do nothing;
  end if;

  -- Marco 10: comunidade_wpp
  if cnt >= 10 then
    insert into public.referral_rewards (user_id, referrer_email, reward, status, metadata)
    values (_user_id, lower(_email), 'comunidade_wpp', 'granted', jsonb_build_object('milestone', 10))
    on conflict (referrer_email, reward) do nothing;
  end if;

  -- Marco 20: mentoria
  if cnt >= 20 then
    insert into public.referral_rewards (user_id, referrer_email, reward, status, metadata)
    values (_user_id, lower(_email), 'mentoria', 'granted', jsonb_build_object('milestone', 20))
    on conflict (referrer_email, reward) do nothing;
  end if;
end;
$$;

-- 8) Função para ativar referral se elegível
create or replace function public.activate_referral_if_eligible(_user_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  _email text;
begin
  -- Ativa se estiver pending
  update public.referrals
  set status = 'activated',
      activated_at = now()
  where referee_profile_id = _user_id
    and status = 'pending'
  returning referrer_email into _email;

  -- Se ativou, concede prêmios para o indicador
  if found then
    perform public.grant_rewards_for_referrer(_email);
  end if;
end;
$$;

-- 9) Triggers de ativação: progresso e quiz
create or replace function public.trigger_activate_referral_from_progress()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  -- Ativa ao marcar watched=true
  if new.watched = true then
    perform public.activate_referral_if_eligible(new.user_id);
  end if;
  return new;
end;
$$;

drop trigger if exists user_progress_activate_referral on public.user_progress;

create trigger user_progress_activate_referral
  after insert or update of watched on public.user_progress
  for each row
  when (new.watched = true)
  execute function public.trigger_activate_referral_from_progress();

create or replace function public.trigger_activate_referral_from_quiz()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.user_id is not null then
    perform public.activate_referral_if_eligible(new.user_id);
  end if;
  return new;
end;
$$;

drop trigger if exists quiz_results_activate_referral on public.quiz_results;

create trigger quiz_results_activate_referral
  after insert on public.quiz_results
  for each row
  when (new.user_id is not null)
  execute function public.trigger_activate_referral_from_quiz();

-- 10) Backfill: vincular rewards a perfis quando o profile (e-mail) aparece/atualiza
create or replace function public.link_rewards_to_profile()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.referral_rewards rr
  set user_id = new.id
  where rr.user_id is null
    and rr.referrer_email = lower(coalesce(new.email, ''));
  return new;
end;
$$;

drop trigger if exists profiles_link_rewards on public.profiles;

create trigger profiles_link_rewards
  after insert or update of email on public.profiles
  for each row execute function public.link_rewards_to_profile();

-- 11) Views: contagem e tier
create or replace view public.referral_counts as
select
  referrer_email,
  count(*) filter (where status = 'activated') as activated_count
from public.referrals
group by referrer_email;

create or replace view public.referral_tiers as
select
  referrer_email,
  activated_count,
  case
    when activated_count >= 20 then 'mentoria'
    when activated_count >= 10 then 'comunidade_wpp'
    when activated_count >= 1 then 'videos_badge'
    else 'none'
  end as tier
from public.referral_counts;

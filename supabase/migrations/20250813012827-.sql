-- 1) Add referee_email to referrals and backfill
ALTER TABLE public.referrals
  ADD COLUMN IF NOT EXISTS referee_email text;

-- Backfill from profiles
UPDATE public.referrals r
SET referee_email = lower(p.email)
FROM public.profiles p
WHERE p.id = r.referee_profile_id
  AND (r.referee_email IS NULL OR r.referee_email = '');

-- 2) Ensure referrer_email normalized and prevent self-referral on insert/update
-- Triggers for referrals table
DROP TRIGGER IF EXISTS referrals_normalize_referrer_email ON public.referrals;
CREATE TRIGGER referrals_normalize_referrer_email
BEFORE INSERT OR UPDATE ON public.referrals
FOR EACH ROW EXECUTE FUNCTION public.normalize_referrer_email();

DROP TRIGGER IF EXISTS referrals_prevent_self_referral ON public.referrals;
CREATE TRIGGER referrals_prevent_self_referral
BEFORE INSERT ON public.referrals
FOR EACH ROW EXECUTE FUNCTION public.prevent_self_referral();

-- 3) Auto-set referee_email on insert from profiles
CREATE OR REPLACE FUNCTION public.set_referee_email_from_profile()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  IF NEW.referee_email IS NULL OR NEW.referee_email = '' THEN
    SELECT lower(coalesce(email, '')) INTO NEW.referee_email
    FROM public.profiles
    WHERE id = NEW.referee_profile_id;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS referrals_set_referee_email ON public.referrals;
CREATE TRIGGER referrals_set_referee_email
BEFORE INSERT ON public.referrals
FOR EACH ROW EXECUTE FUNCTION public.set_referee_email_from_profile();

-- 4) Keep referee_email in sync if profile email changes
CREATE OR REPLACE FUNCTION public.sync_referee_email_on_profile_update()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  IF NEW.email IS DISTINCT FROM OLD.email THEN
    UPDATE public.referrals r
    SET referee_email = lower(coalesce(NEW.email, ''))
    WHERE r.referee_profile_id = NEW.id;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS profiles_sync_referee_email ON public.profiles;
CREATE TRIGGER profiles_sync_referee_email
AFTER UPDATE OF email ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.sync_referee_email_on_profile_update();

-- 5) Activate referrals only via quiz results (remove progress-based activation if present)
-- Drop any possible user_progress activation triggers (names may vary)
DROP TRIGGER IF EXISTS on_user_progress_activate_referral ON public.user_progress;
DROP TRIGGER IF EXISTS activate_referral_on_progress ON public.user_progress;
DROP TRIGGER IF EXISTS trigger_activate_referral_from_progress ON public.user_progress;

-- Ensure quiz trigger exists
DROP TRIGGER IF EXISTS on_quiz_results_activate_referral ON public.quiz_results;
CREATE TRIGGER on_quiz_results_activate_referral
AFTER INSERT ON public.quiz_results
FOR EACH ROW EXECUTE FUNCTION public.trigger_activate_referral_from_quiz();
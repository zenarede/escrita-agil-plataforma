
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export type Referral = {
  id: string;
  referrer_email: string;
  referee_profile_id: string;
  status: "pending" | "activated" | "invalid" | "fraud";
  created_at: string;
  activated_at: string | null;
};

export type ReferralReward = {
  id: string;
  user_id: string | null;
  referrer_email: string;
  reward: "videos_badge" | "comunidade_wpp" | "mentoria";
  status: "granted" | "used" | "revoked";
  metadata: any;
  granted_at: string;
};

export type ReferralCount = {
  referrer_email: string;
  activated_count: number;
};

export type ReferralTier = {
  referrer_email: string;
  activated_count: number;
  tier: "mentoria" | "comunidade_wpp" | "videos_badge" | "none";
};

export const useReferrals = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [referral, setReferral] = useState<Referral | null>(null);
  const [counts, setCounts] = useState<ReferralCount | null>(null);
  const [tier, setTier] = useState<ReferralTier | null>(null);
  const [rewards, setRewards] = useState<ReferralReward[]>([]);

  const refresh = async () => {
    if (!user) return;
    setLoading(true);

    // 1) Referral do usuário (como indicado)
    const { data: myReferral } = await supabase
      .from("referrals")
      .select("*")
      .eq("referee_profile_id", user.id)
      .maybeSingle();

    setReferral(myReferral as Referral | null);

    // 2) E-mail do perfil do usuário (para ver contagem/prêmios como indicador)
    const { data: profile } = await supabase
      .from("profiles")
      .select("email")
      .eq("id", user.id)
      .single();

    const email = (profile?.email || "").toLowerCase();

    if (email) {
      // counts (view)
      const { data: rc } = await supabase
        .from("referral_counts")
        .select("*")
        .eq("referrer_email", email)
        .maybeSingle();
      setCounts(rc as ReferralCount | null);

      // tier (view)
      const { data: rt } = await supabase
        .from("referral_tiers")
        .select("*")
        .eq("referrer_email", email)
        .maybeSingle();
      setTier(rt as ReferralTier | null);

      // rewards
      const { data: rw } = await supabase
        .from("referral_rewards")
        .select("*")
        .or(
          [
            `user_id.eq.${user.id}`,
            `referrer_email.eq.${email}`,
          ].join(",")
        );

      setRewards((rw || []) as ReferralReward[]);
    } else {
      setCounts(null);
      setTier(null);
      setRewards([]);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (user) {
      refresh();
    } else {
      setReferral(null);
      setCounts(null);
      setTier(null);
      setRewards([]);
      setLoading(false);
    }
  }, [user?.id]);

  const hasVideosBadge = useMemo(
    () => rewards.some((r) => r.reward === "videos_badge" && r.status === "granted"),
    [rewards]
  );
  const hasCommunity = useMemo(
    () => rewards.some((r) => r.reward === "comunidade_wpp" && r.status === "granted"),
    [rewards]
  );
  const hasMentoria = useMemo(
    () => rewards.some((r) => r.reward === "mentoria" && r.status === "granted"),
    [rewards]
  );

  const submitReferral = async (referrerEmail: string) => {
    if (!user) throw new Error("not authenticated");
    const normalized = referrerEmail.trim().toLowerCase();

    const { data, error } = await supabase
      .from("referrals")
      .insert({
        referrer_email: normalized,
        referee_profile_id: user.id,
        status: "pending",
      })
      .select("*")
      .single();

    if (error) throw error;

    await refresh();
    return data as Referral;
  };

  return {
    loading,
    referral,
    counts,
    tier,
    rewards,
    hasVideosBadge,
    hasCommunity,
    hasMentoria,
    submitReferral,
    refresh,
  };
};

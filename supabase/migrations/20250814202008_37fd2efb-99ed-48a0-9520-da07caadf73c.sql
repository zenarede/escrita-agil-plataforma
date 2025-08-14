-- Add RLS policies for referral_counts and referral_tiers views
-- These views were identified as security risks due to lack of proper access control

-- Enable RLS on referral_counts (this is a view, but we need to secure access)
-- Since we can't directly enable RLS on views, we'll revoke public access and grant specific permissions

-- Revoke all permissions from public roles on both views
REVOKE ALL ON referral_counts FROM anon, authenticated;
REVOKE ALL ON referral_tiers FROM anon, authenticated;

-- Grant SELECT permission only to authenticated users who are admins or viewing their own referral data
-- For referral_counts: only admins and users viewing their own referral email should have access
GRANT SELECT ON referral_counts TO authenticated;

-- For referral_tiers: only admins and users viewing their own referral email should have access  
GRANT SELECT ON referral_tiers TO authenticated;

-- Create RLS-like policies by creating functions that check permissions
-- Function to check if user can view referral data
CREATE OR REPLACE FUNCTION public.can_view_referral_data(referrer_email_param text)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
  -- Allow if user is admin
  SELECT CASE 
    WHEN is_admin(auth.uid()) THEN true
    -- Allow if user's email matches the referrer_email
    WHEN EXISTS (
      SELECT 1 FROM public.profiles p 
      WHERE p.id = auth.uid() 
      AND lower(coalesce(p.email, '')) = lower(referrer_email_param)
    ) THEN true
    ELSE false
  END;
$$;

-- Create secure views that implement proper access control
CREATE OR REPLACE VIEW public.secure_referral_counts 
WITH (security_invoker=true) AS
SELECT 
  rc.referrer_email,
  rc.activated_count
FROM referral_counts rc
WHERE can_view_referral_data(rc.referrer_email);

CREATE OR REPLACE VIEW public.secure_referral_tiers
WITH (security_invoker=true) AS  
SELECT 
  rt.referrer_email,
  rt.activated_count,
  rt.tier
FROM referral_tiers rt
WHERE can_view_referral_data(rt.referrer_email);

-- Grant access to the secure views
GRANT SELECT ON secure_referral_counts TO authenticated;
GRANT SELECT ON secure_referral_tiers TO authenticated;
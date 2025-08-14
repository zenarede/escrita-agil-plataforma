import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { ReferralFirstLoginModal } from '@/components/referrals/ReferralFirstLoginModal';

// Modo mock para desenvolvimento - REMOVER QUANDO CORRIGIR SUPABASE
const MOCK_MODE = false;

const mockUser: User = {
  id: '92e4642a-a29f-4f66-8b5b-bd9c50f31a4f',
  email: 'zenarede16@gmail.com',
  aud: 'authenticated',
  app_metadata: {},
  user_metadata: {
    full_name: 'José Eduardo Almeida Barros',
    email: 'zenarede16@gmail.com'
  },
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
} as User;

const mockSession: Session = {
  access_token: 'mock-token',
  refresh_token: 'mock-refresh',
  expires_in: 3600,
  expires_at: Date.now() + 3600000,
  token_type: 'bearer',
  user: mockUser
} as Session;

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signInWithGoogle: (returnTo?: string) => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (MOCK_MODE) {
      // Modo mock - simula usuário logado
      setUser(mockUser);
      setSession(mockSession);
      setLoading(false);
      return;
    }

    
    
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
        
        // Handle successful login - defer database calls to prevent deadlock
        if (event === 'SIGNED_IN' && session?.user) {
          
          // Use setTimeout to defer Supabase calls and prevent deadlock
          setTimeout(() => {
            checkProfileAndRedirect(session.user);
          }, 0);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkProfileAndRedirect = async (user: any) => {
    try {
      
      const { data: profile } = await supabase
        .from('profiles')
        .select('cpf, phone, study_interests, qualifications')
        .eq('id', user.id)
        .single();
      
      const isProfileComplete = profile && 
        profile.cpf && 
        profile.phone && 
        profile.study_interests?.length > 0 && 
        profile.qualifications?.length > 0;
      
      // Get stored return URL from sessionStorage or localStorage
      const returnTo = sessionStorage.getItem('redirectAfterLogin') || localStorage.getItem('authReturnTo');
      sessionStorage.removeItem('redirectAfterLogin'); // Clean up
      localStorage.removeItem('authReturnTo'); // Clean up
      
      // Redirect logic for successful login
      if (window.location.pathname === '/login' || window.location.pathname === '/register' || returnTo) {
        if (!isProfileComplete) {
          localStorage.setItem('afterProfileSetup', returnTo || '/dashboard');
          window.location.href = '/profile-setup';
        } else {
          window.location.href = returnTo || '/dashboard';
        }
      }
    } catch (error) {
      // Error handling for profile check
    }
  };

  const signInWithGoogle = async (returnTo?: string) => {
    
    // Store the return URL for after login
    if (returnTo) {
      localStorage.setItem('authReturnTo', returnTo);
    }
    
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/login`
      }
    });
    
    if (error) {
      throw error;
    }
    
    
  };

  const signInWithEmail = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      throw error;
    }
  };

  const signUpWithEmail = async (email: string, password: string) => {
    const redirectUrl = `${window.location.origin}/`;
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl
      }
    });
    
    if (error) {
      throw error;
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      setSession(null);
      setUser(null);
      window.location.href = '/';
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      session,
      loading,
      signInWithGoogle,
      signInWithEmail,
      signUpWithEmail,
      signOut
    }}>
      {children}
      {/* Modal global de indicação no 1º login */}
      <ReferralFirstLoginModal />
    </AuthContext.Provider>
  );
};

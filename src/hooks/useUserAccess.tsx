
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface UserProfile {
  id: string;
  full_name: string | null;
  email: string | null;
  status: string | null;
  cursos_liberados: string[] | null;
  created_at: string | null;
  updated_at: string | null;
}

export const useUserAccess = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['user-access', user?.id],
    queryFn: async () => {
      if (!user) return null;
      
      console.log('Fetching user profile for access control:', user.id);
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (error) {
        console.error('Error fetching user profile:', error);
        throw error;
      }
      
      console.log('User profile data:', data);
      return data as UserProfile;
    },
    enabled: !!user
  });
};

export const useCanAccessCourse = (courseSlug: string) => {
  const { data: userProfile, isLoading } = useUserAccess();
  
  const canAccess = React.useMemo(() => {
    if (isLoading || !userProfile) return false;
    
    // Usuários com status "ativo" podem acessar cursos liberados
    if (userProfile.status === 'ativo' && userProfile.cursos_liberados) {
      return userProfile.cursos_liberados.includes(courseSlug);
    }
    
    // Usuários gratuitos não podem acessar cursos pagos
    return false;
  }, [userProfile, courseSlug, isLoading]);
  
  return {
    canAccess,
    userStatus: userProfile?.status,
    isLoading
  };
};

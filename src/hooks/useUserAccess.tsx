
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

// Modo mock para desenvolvimento - REMOVER QUANDO CORRIGIR SUPABASE
const MOCK_MODE = false;

const mockUserProfile: UserProfile = {
  id: '92e4642a-a29f-4f66-8b5b-bd9c50f31a4f',
  full_name: 'José Eduardo Almeida Barros',
  email: 'zenarede16@gmail.com',
  status: 'admin', // Permite acesso a tudo
  cursos_liberados: ['curso-1', 'curso-2', 'curso-3'], // Acesso a todos os cursos
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  cpf: '12345678901',
  phone: '11999999999',
  study_interests: ['Escrita', 'Literatura'],
  education_level: 'Superior',
  qualifications: ['Graduação', 'Pós-graduação']
};

export interface UserProfile {
  id: string;
  full_name: string | null;
  email: string | null;
  status: string | null;
  cursos_liberados: string[] | null;
  created_at: string | null;
  updated_at: string | null;
  cpf: string | null;
  phone: string | null;
  study_interests: string[] | null;
  education_level: string | null;
  qualifications: string[] | null;
}

export const useUserAccess = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['user-access', user?.id],
    queryFn: async () => {
      if (!user) return null;
      
      // Modo mock - retorna dados simulados
      if (MOCK_MODE) {
        return mockUserProfile;
      }
      
      
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (error) {
        throw error;
      }
      
      
      return data as UserProfile;
    },
    enabled: !!user
  });
};

export const useCanAccessCourse = (courseSlug: string) => {
  const { data: userProfile, isLoading } = useUserAccess();
  
  const canAccess = React.useMemo(() => {
    if (isLoading || !userProfile) {
      return false;
    }
    
    
    // ADMIN tem acesso a tudo
    if (userProfile.status === 'admin') {
      return true;
    }
    
    // Usuários com status "ativo" podem acessar cursos liberados
    if (userProfile.status === 'ativo' && userProfile.cursos_liberados) {
      const hasAccess = userProfile.cursos_liberados.includes(courseSlug);
      return hasAccess;
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

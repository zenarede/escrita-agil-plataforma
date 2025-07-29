import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface UserQuizResult {
  id: string;
  arquetipo_nome: string;
  respostas: any;
  niveis_calculados: any;
  nivel_confianca: string;
  created_at: string;
}

export const useUserQuizResult = () => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['user-quiz-result', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      
      const { data, error } = await supabase
        .from('quiz_results')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();
      
      if (error) throw error;
      return data;
    },
    enabled: !!user?.id
  });
};
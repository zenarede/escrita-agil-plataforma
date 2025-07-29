import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface QuizQuestion {
  id: string;
  pergunta_numero: number;
  texto: string;
  traco: string;
  inverso: boolean;
}

export interface Arquetipo {
  id: string;
  nome: string;
  entusiasta: string;
  sensivel: string;
  mente_aberta: string;
  organizado: string;
  tecnico: string;
  descricao: string;
  carreiras_favoraveis: string[];
  cursos_sugeridos: string[];
  cursos_indicados: string[];
}

export const useQuizQuestions = () => {
  return useQuery({
    queryKey: ['quiz-questions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('quiz_questions')
        .select('*')
        .eq('ativo', true)
        .order('pergunta_numero');
      
      if (error) throw error;
      return data as QuizQuestion[];
    }
  });
};

export const useArquetipos = () => {
  return useQuery({
    queryKey: ['arquetipos'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('arquetipos')
        .select('*')
        .order('nome');
      
      if (error) throw error;
      return data as Arquetipo[];
    }
  });
};
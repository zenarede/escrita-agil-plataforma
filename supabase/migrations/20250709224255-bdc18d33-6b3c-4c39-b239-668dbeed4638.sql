
-- Tabela para vídeos dos cursos
CREATE TABLE public.course_videos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  course_slug TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  video_url TEXT NOT NULL,
  duration_minutes INTEGER,
  upload_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Adicionar colunas na tabela profiles para controle de acesso
ALTER TABLE public.profiles 
ADD COLUMN status TEXT DEFAULT 'gratuito' CHECK (status IN ('ativo', 'pendente', 'gratuito')),
ADD COLUMN cursos_liberados TEXT[] DEFAULT '{}';

-- Enable RLS na tabela course_videos
ALTER TABLE public.course_videos ENABLE ROW LEVEL SECURITY;

-- Política para visualizar vídeos (todos podem ver por enquanto)
CREATE POLICY "Users can view course videos" ON public.course_videos
  FOR SELECT USING (true);

-- Inserir dados de teste
INSERT INTO public.course_videos (course_slug, title, description, video_url, duration_minutes, order_index) VALUES
('tcc-em-30-dias-metodo-agil', 'Introdução ao Método Ágil para TCC', 'Aprenda os primeiros passos para estruturar seu TCC de forma organizada', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 25, 1),
('tcc-em-30-dias-metodo-agil', 'Definindo sua Problemática', 'Como identificar e delimitar o problema de pesquisa do seu TCC', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 32, 2),
('tcc-em-30-dias-metodo-agil', 'Estruturando o Cronograma', 'Monte um cronograma realista para completar seu TCC em 30 dias', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 18, 3),
('metodo-rac-escrita-cientifica', 'Fundamentos do Método RAC', 'Entenda os pilares: Resumir, Analisar, Criticar', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 28, 1),
('metodo-rac-escrita-cientifica', 'Técnicas de Resumo Científico', 'Como resumir textos acadêmicos de forma eficiente', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 22, 2),
('preparacao-para-mestrado', 'Preparando o Projeto de Pesquisa', 'Elementos essenciais do projeto para seleção de mestrado', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 35, 1);

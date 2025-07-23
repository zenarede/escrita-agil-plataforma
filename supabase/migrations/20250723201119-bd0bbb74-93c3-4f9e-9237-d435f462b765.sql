-- Recriar todas as tabelas do zero com dados existentes

-- Primeiro, remover tabelas existentes se existirem
DROP TABLE IF EXISTS public.course_videos CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;

-- Criar tabela de perfis de usuários
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  cpf TEXT UNIQUE,
  email TEXT,
  phone TEXT,
  study_interests TEXT[],
  education_level TEXT,
  qualifications TEXT[],
  status TEXT DEFAULT 'gratuito' CHECK (status IN ('ativo', 'pendente', 'gratuito', 'admin')),
  cursos_liberados TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar tabela de vídeos dos cursos
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

-- Habilitar RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_videos ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para profiles
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Políticas RLS para course_videos
CREATE POLICY "Users can view course videos" ON public.course_videos
  FOR SELECT USING (true);

-- Função para criar perfil automaticamente no signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para novos usuários
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Inserir dados de cursos existentes
INSERT INTO public.course_videos (course_slug, title, description, video_url, duration_minutes, order_index) VALUES
('tcc-em-30-dias-metodo-agil', 'Introdução ao Método Ágil para TCC', 'Aprenda os primeiros passos para estruturar seu TCC de forma organizada', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 25, 1),
('tcc-em-30-dias-metodo-agil', 'Definindo sua Problemática', 'Como identificar e delimitar o problema de pesquisa do seu TCC', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 32, 2),
('tcc-em-30-dias-metodo-agil', 'Estruturando o Cronograma', 'Monte um cronograma realista para completar seu TCC em 30 dias', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 18, 3),
('metodo-rac-escrita-cientifica', 'Fundamentos do Método RAC', 'Entenda os pilares: Resumir, Analisar, Criticar', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 28, 1),
('metodo-rac-escrita-cientifica', 'Técnicas de Resumo Científico', 'Como resumir textos acadêmicos de forma eficiente', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 22, 2),
('preparacao-para-mestrado', 'Preparando o Projeto de Pesquisa', 'Elementos essenciais do projeto para seleção de mestrado', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 35, 1),
('artigos-cientificos-de-impacto', 'Estrutura de Artigos Científicos', 'Como estruturar um artigo para publicação', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 30, 1);

-- Criar usuário admin (José Eduardo)
INSERT INTO public.profiles (id, email, full_name, status, cursos_liberados)
VALUES (
  '92e4642a-a29f-4f66-8b5b-bd9c50f31a4f',
  'zenarede16@gmail.com',
  'José Eduardo Almeida Barros',
  'admin',
  ARRAY[
    'tcc-em-30-dias-metodo-agil',
    'metodo-rac-escrita-cientifica', 
    'preparacao-para-mestrado',
    'artigos-cientificos-de-impacto'
  ]
) ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  cursos_liberados = EXCLUDED.cursos_liberados;
-- Expandir dados dos cursos e implementar sistema de progresso
-- Adicionar mais vídeos aos cursos existentes
INSERT INTO videos (curso_id, titulo, descricao, url, ordem) VALUES
-- Curso: Como Escrever um Artigo Científico
('como-escrever-um-artigo-cientifico', 'Estrutura IMRAD - Introdução', 'Aprenda a estruturar a introdução do seu artigo seguindo o padrão IMRAD.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 4),
('como-escrever-um-artigo-cientifico', 'Metodologia Detalhada', 'Como descrever sua metodologia de forma clara e replicável.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 5),
('como-escrever-um-artigo-cientifico', 'Análise de Resultados', 'Técnicas para apresentar e analisar seus resultados científicos.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 6),
('como-escrever-um-artigo-cientifico', 'Discussão Efetiva', 'Como escrever uma discussão que conecta resultados com literatura.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 7),
('como-escrever-um-artigo-cientifico', 'Conclusões Impactantes', 'Estratégias para criar conclusões memoráveis e relevantes.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 8),
('como-escrever-um-artigo-cientifico', 'Revisão Final e Checklist', 'Lista de verificação completa antes de submeter seu artigo.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 9),

-- Curso: Metodologia de Pesquisa
('metodologia-de-pesquisa', 'Tipos de Pesquisa Científica', 'Exploração dos diferentes tipos de pesquisa: quantitativa, qualitativa e mista.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 4),
('metodologia-de-pesquisa', 'Amostragem e População', 'Como definir população e calcular amostras representativas.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 5),
('metodologia-de-pesquisa', 'Instrumentos de Coleta', 'Questionários, entrevistas e observação: quando usar cada um.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 6),
('metodologia-de-pesquisa', 'Análise Estatística Básica', 'Fundamentos de estatística para pesquisa científica.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 7),
('metodologia-de-pesquisa', 'Softwares de Análise', 'Introdução ao SPSS, R e outras ferramentas de análise.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 8),
('metodologia-de-pesquisa', 'Ética em Pesquisa', 'Comitês de ética, TCLE e boas práticas em pesquisa.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 9),

-- Curso: Escrita Acadêmica
('escrita-academica', 'Linguagem Científica', 'Características da linguagem acadêmica e como aplicá-las.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 4),
('escrita-academica', 'Coesão e Coerência', 'Técnicas para manter a unidade textual em textos acadêmicos.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 5),
('escrita-academica', 'Argumentação Científica', 'Como construir argumentos sólidos baseados em evidências.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 6),
('escrita-academica', 'Revisão e Edição', 'Estratégias para revisar e melhorar seus textos acadêmicos.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 7),
('escrita-academica', 'Feedback e Colaboração', 'Como dar e receber feedback em trabalhos acadêmicos.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 8),
('escrita-academica', 'Publicação e Divulgação', 'Estratégias para publicar e divulgar seu trabalho acadêmico.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 9);

-- Criar novos cursos
INSERT INTO cursos (slug, titulo, descricao, instrutor, duracao_estimada, nivel, status) VALUES
('metodologia-pesquisa-avancada', 'Metodologia de Pesquisa Avançada', 'Aprofunde seus conhecimentos em metodologia científica com técnicas avançadas de pesquisa, análise de dados complexos e design experimental.', 'Dr. Ana Silva', '6 semanas', 'Avançado', 'ativo'),
('publicacao-cientifica-internacional', 'Publicação Científica Internacional', 'Estratégias completas para publicar em revistas internacionais de alto impacto, desde a escolha do periódico até o processo de peer review.', 'Prof. Carlos Santos', '8 semanas', 'Avançado', 'ativo');

-- Adicionar preços aos cursos
INSERT INTO curso_precos (curso_slug, preco, moeda, tipo_preco) VALUES
('como-escrever-um-artigo-cientifico', 147.00, 'BRL', 'unico'),
('metodologia-de-pesquisa', 127.00, 'BRL', 'unico'),
('escrita-academica', 97.00, 'BRL', 'unico'),
('metodologia-pesquisa-avancada', 197.00, 'BRL', 'unico'),
('publicacao-cientifica-internacional', 247.00, 'BRL', 'unico');

-- Adicionar vídeos aos novos cursos
INSERT INTO videos (curso_id, titulo, descricao, url, ordem) VALUES
-- Metodologia de Pesquisa Avançada
('metodologia-pesquisa-avancada', 'Design Experimental Complexo', 'Como planejar experimentos com múltiplas variáveis e controles.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 1),
('metodologia-pesquisa-avancada', 'Meta-análise e Revisão Sistemática', 'Técnicas para conduzir meta-análises e revisões sistemáticas.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 2),
('metodologia-pesquisa-avancada', 'Análise Multivariada', 'Métodos estatísticos avançados para análise de dados complexos.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 3),
('metodologia-pesquisa-avancada', 'Pesquisa Longitudinal', 'Planejamento e execução de estudos longitudinais.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 4),
('metodologia-pesquisa-avancada', 'Big Data em Pesquisa', 'Como trabalhar com grandes volumes de dados na pesquisa.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 5),
('metodologia-pesquisa-avancada', 'Inteligência Artificial na Pesquisa', 'Aplicações de IA e machine learning em metodologia científica.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 6),
('metodologia-pesquisa-avancada', 'Validação de Instrumentos', 'Como criar e validar instrumentos de pesquisa robustos.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 7),
('metodologia-pesquisa-avancada', 'Reprodutibilidade Científica', 'Garantindo a reprodutibilidade dos seus resultados de pesquisa.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 8),

-- Publicação Científica Internacional
('publicacao-cientifica-internacional', 'Escolhendo a Revista Ideal', 'Como selecionar o periódico certo para sua pesquisa.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 1),
('publicacao-cientifica-internacional', 'Fator de Impacto e Métricas', 'Entendendo JCR, H-index e outras métricas científicas.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 2),
('publicacao-cientifica-internacional', 'Escrita para Periódicos Internacionais', 'Adaptando seu texto para audiência internacional.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 3),
('publicacao-cientifica-internacional', 'Processo de Peer Review', 'Como navegar pelo processo de revisão por pares.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 4),
('publicacao-cientifica-internacional', 'Respondendo aos Revisores', 'Estratégias para responder efetivamente aos comentários.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 5),
('publicacao-cientifica-internacional', 'Open Access e Copyright', 'Entendendo modelos de publicação e direitos autorais.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 6),
('publicacao-cientifica-internacional', 'Networking Acadêmico Internacional', 'Construindo redes de colaboração global.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 7),
('publicacao-cientifica-internacional', 'Ferramentas de Produtividade Científica', 'Software e ferramentas para otimizar sua produção científica.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 8),
('publicacao-cientifica-internacional', 'Estratégias de Publicação', 'Como maximizar o impacto das suas publicações.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 9),
('publicacao-cientifica-internacional', 'Carreira Acadêmica Internacional', 'Construindo uma carreira acadêmica de projeção global.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 10);

-- Criar tabela de progresso do usuário
CREATE TABLE IF NOT EXISTS user_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  curso_slug TEXT NOT NULL,
  video_id UUID NOT NULL,
  watched BOOLEAN NOT NULL DEFAULT false,
  watched_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  UNIQUE(user_id, video_id)
);

-- Enable RLS
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

-- Create policies for user progress
CREATE POLICY "Users can view their own progress" 
ON user_progress 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own progress" 
ON user_progress 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own progress" 
ON user_progress 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create function to update timestamps
CREATE TRIGGER update_user_progress_updated_at
BEFORE UPDATE ON user_progress
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Inserir dados de exemplo de progresso para o usuário existente
INSERT INTO user_progress (user_id, curso_slug, video_id, watched, watched_at)
SELECT 
  '2e4577ad-7183-4cd5-bf4e-c3827f132080',
  v.curso_id,
  v.id,
  CASE WHEN v.ordem <= 2 THEN true ELSE false END,
  CASE WHEN v.ordem <= 2 THEN now() - interval '1 day' ELSE NULL END
FROM videos v
WHERE v.curso_id IN ('como-escrever-um-artigo-cientifico', 'metodologia-de-pesquisa', 'escrita-academica')
ON CONFLICT (user_id, video_id) DO NOTHING;
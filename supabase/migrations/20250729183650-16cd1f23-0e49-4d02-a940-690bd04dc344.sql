-- Create archetipos table
CREATE TABLE public.archetipos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome TEXT NOT NULL UNIQUE,
  entusiasta TEXT NOT NULL,
  sensivel TEXT NOT NULL,
  mente_aberta TEXT NOT NULL,
  organizado TEXT NOT NULL,
  tecnico TEXT NOT NULL,
  descricao TEXT NOT NULL,
  carreiras_favoraveis TEXT[] NOT NULL DEFAULT '{}',
  cursos_sugeridos TEXT[] NOT NULL DEFAULT '{}',
  cursos_indicados TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create quiz_questions table
CREATE TABLE public.quiz_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pergunta_numero INTEGER NOT NULL UNIQUE,
  texto TEXT NOT NULL,
  traco TEXT NOT NULL,
  inverso BOOLEAN NOT NULL DEFAULT false,
  ativo BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create quiz_results table
CREATE TABLE public.quiz_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  arquetipo_nome TEXT NOT NULL,
  respostas JSONB NOT NULL,
  niveis_calculados JSONB NOT NULL,
  nivel_confianca TEXT NOT NULL,
  session_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.archetipos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_results ENABLE ROW LEVEL SECURITY;

-- Create policies for archetipos (public read)
CREATE POLICY "Anyone can view archetipos" 
ON public.arquetipos 
FOR SELECT 
USING (true);

-- Create policies for quiz_questions (public read)
CREATE POLICY "Anyone can view quiz questions" 
ON public.quiz_questions 
FOR SELECT 
USING (true);

-- Create policies for quiz_results
CREATE POLICY "Users can view their own results" 
ON public.quiz_results 
FOR SELECT 
USING (user_id = auth.uid() OR user_id IS NULL);

CREATE POLICY "Users can insert their own results" 
ON public.quiz_results 
FOR INSERT 
WITH CHECK (user_id = auth.uid() OR user_id IS NULL);

-- Insert the 12 archetipos
INSERT INTO public.archetipos (nome, entusiasta, sensivel, mente_aberta, organizado, tecnico, descricao, carreiras_favoraveis, cursos_sugeridos, cursos_indicados) VALUES
('Explorador Criativo', 'Alto', 'Médio', 'Alto', 'Médio', 'Médio', 'Você possui um perfil altamente criativo e aberto a experiências, com entusiasmo por ambientes que estimulam a imaginação e a inovação. Essa combinação sugere forte afinidade com áreas que exigem originalidade, expressão artística e pensamento fora da caixa.', 
ARRAY['Designer gráfico', 'Publicitário', 'Roteirista', 'UX/UI Designer', 'Comunicador', 'Redator Criativo'], 
ARRAY['Design', 'Publicidade', 'Arquitetura', 'Artes Visuais', 'Comunicação', 'Jornalismo', 'Engenharia de Inovação'], 
ARRAY['curso-design', 'curso-storytelling']),

('Executor Estratégico', 'Médio', 'Médio', 'Médio', 'Alto', 'Alto', 'Você apresenta perfil organizado, focado e orientado a resultados, com facilidade para atuar sob pressão e liderar processos complexos. Sua capacidade de planejamento estratégico favorece funções administrativas, jurídicas e operacionais.',
ARRAY['Gerente de Projetos', 'Analista de Políticas Públicas', 'Advogado Público', 'Coordenador de Operações'],
ARRAY['Administração', 'Engenharia de Produção', 'Direito', 'Logística', 'Gestão Pública', 'Relações Internacionais'],
ARRAY['curso-gestao', 'curso-lideranca']),

('Analista Técnico', 'Baixo', 'Médio', 'Baixo', 'Alto', 'Alto', 'Você possui perfil metódico, técnico e lógico, com forte capacidade analítica e atenção a detalhes. Esse traço favorece ocupações que envolvem dados, cálculos e análises precisas.',
ARRAY['Engenheiro de Processos', 'Cientista de Dados', 'Analista de Sistemas', 'Técnico em TI', 'Auditor'],
ARRAY['Engenharia', 'Ciência de Dados', 'Análise de Sistemas', 'Estatística', 'Contabilidade'],
ARRAY['curso-analise', 'curso-dados']),

('Facilitador Empático', 'Médio', 'Alto', 'Médio', 'Médio', 'Médio', 'Você é uma pessoa sensível, colaborativa e com alta empatia. Gosta de ouvir, acolher e construir relações de confiança. Perfis com esse traço costumam se destacar em profissões de cuidado e educação.',
ARRAY['Psicopedagogo', 'Terapeuta Ocupacional', 'Educador Social', 'Coach', 'Gestor de RH Humanizado'],
ARRAY['Psicologia', 'Pedagogia', 'Serviço Social', 'Fonoaudiologia', 'Educação Especial'],
ARRAY['curso-psicologia', 'curso-educacao']),

('Especialista Metódico', 'Baixo', 'Médio', 'Baixo', 'Alto', 'Alto', 'Você possui perfil disciplinado, reservado e sistemático, com interesse por normas, processos e estabilidade. Tem alto desempenho em rotinas de controle e ambientes regulados.',
ARRAY['Técnico de Processos', 'Arquivista', 'Engenheiro de Segurança', 'Analista de Compliance'],
ARRAY['Biblioteconomia', 'Ciências Contábeis', 'Engenharia Civil', 'Gestão da Qualidade'],
ARRAY['curso-processos', 'curso-qualidade']),

('Visionário Autêntico', 'Alto', 'Médio', 'Alto', 'Baixo', 'Médio', 'Você tem visão ampla, originalidade de pensamento e inclinação para liderar transformações com autenticidade. Persegue inovação com propósito e se destaca em contextos culturais ou de mudança.',
ARRAY['Fundador de Startup', 'Produtor Cultural', 'Trend Hunter', 'Diretor Criativo', 'Estrategista de Marca'],
ARRAY['Empreendedorismo', 'Design de Produto', 'Cinema e Mídias Digitais', 'Filosofia', 'Ciências Sociais'],
ARRAY['curso-empreendedorismo', 'curso-inovacao']),

('Executor Silencioso', 'Baixo', 'Alto', 'Médio', 'Alto', 'Alto', 'Você é focado, reservado e com grande capacidade de concentração. Prefere atuar nos bastidores com eficiência, mantendo ritmo constante e atenção à precisão técnica.',
ARRAY['Desenvolvedor Back-End', 'Engenheiro de Manutenção', 'Planejador Logístico', 'Técnico de Processos Industriais'],
ARRAY['Engenharia Elétrica', 'TI', 'Logística', 'Ciências Atuariais', 'Química Industrial'],
ARRAY['curso-programacao', 'curso-logistica']),

('Multipotencial Adaptável', 'Médio', 'Médio', 'Alto', 'Médio', 'Médio', 'Você demonstra flexibilidade, curiosidade e múltiplos interesses. É motivado por aprendizagem contínua e pela conexão entre diferentes áreas do conhecimento.',
ARRAY['Pesquisador', 'Consultor', 'Curador de Conteúdo', 'Profissional em Educação ou Cultura Digital'],
ARRAY['Ciências Sociais', 'Letras', 'Estudos Globais', 'Engenharia Interdisciplinar', 'Ciências Ambientais'],
ARRAY['curso-pesquisa', 'curso-multidisciplinar']),

('Líder Inspirador', 'Alto', 'Alto', 'Médio', 'Alto', 'Médio', 'Você combina habilidades de liderança, empatia e comunicação. Tem forte capacidade de influenciar e mobilizar pessoas em torno de um propósito comum.',
ARRAY['CEO', 'Diretor de Escola', 'Gestor de Equipes', 'Coordenador Pedagógico', 'Consultor em Desenvolvimento Humano'],
ARRAY['Administração', 'Educação', 'Engenharia de Produção', 'Psicologia Organizacional', 'Ciências Políticas'],
ARRAY['curso-lideranca', 'curso-comunicacao']),

('Desbravador Inovador', 'Alto', 'Baixo', 'Alto', 'Médio', 'Baixo', 'Você é curioso, inventivo e ousado. Tem facilidade para operar em fronteiras do conhecimento, em especial na ciência e tecnologia.',
ARRAY['Desenvolvedor Full-Stack', 'Pesquisador de IA', 'Fundador de Deep Tech', 'Analista de Inovação'],
ARRAY['Engenharia de Software', 'Física', 'Biotecnologia', 'Inteligência Artificial', 'Ciência da Computação'],
ARRAY['curso-ia', 'curso-tecnologia']),

('Tutor Analítico', 'Médio', 'Médio', 'Médio', 'Médio', 'Alto', 'Você é detalhista, paciente e gosta de ensinar com base em raciocínio lógico e análise crítica. Seu perfil é ideal para educação formal e apoio didático.',
ARRAY['Professor', 'Formador de Professores', 'Tutor de Plataforma Digital', 'Criador de Material Didático'],
ARRAY['Matemática', 'Física', 'Licenciaturas', 'Ciências Naturais', 'Educação Científica'],
ARRAY['curso-ensino', 'curso-didatica']),

('Inovador Pragmático', 'Médio', 'Médio', 'Alto', 'Alto', 'Médio', 'Você une criatividade e foco em resultados, com perfil voltado à resolução de problemas reais. Prefere ambientes que aliem propósito à inovação prática.',
ARRAY['Gerente de Produto', 'Designer de Serviços', 'Consultor de Inovação', 'Coordenador de UX Research'],
ARRAY['Design Estratégico', 'Engenharia de Produção', 'Administração de Startups', 'Economia Criativa'],
ARRAY['curso-produto', 'curso-ux']);

-- Insert quiz questions
INSERT INTO public.quiz_questions (pergunta_numero, texto, traco, inverso) VALUES
(1, 'Gosta de conversar com pessoas novas?', 'Entusiasta', false),
(2, 'Prefere fazer tarefas sozinho?', 'Entusiasta', true),
(3, 'Gosta de aprender métodos novos?', 'Mente Aberta', false),
(4, 'Prefere seguir regras testadas?', 'Mente Aberta', true),
(5, 'Lida bem com estresse?', 'Sensível', true),
(6, 'Tem variações de humor frequentes?', 'Sensível', false),
(7, 'Estabelece e persegue metas claras?', 'Organizado', false),
(8, 'Inicia vários projetos ao mesmo tempo?', 'Organizado', true),
(9, 'Percebe facilmente sentimentos alheios?', 'Técnico', true),
(10, 'Valoriza lógica mais que emoção?', 'Técnico', false),
(11, 'Fala com entusiasmo sobre seus interesses?', 'Entusiasta', false),
(12, 'Gosta de experimentar coisas novas?', 'Mente Aberta', false);

-- Create function to update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_archetipos()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_archetipos_updated_at
  BEFORE UPDATE ON public.archetipos
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_archetipos();

CREATE TRIGGER update_quiz_questions_updated_at
  BEFORE UPDATE ON public.quiz_questions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_archetipos();
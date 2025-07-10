-- Primeiro, remover a constraint existente
ALTER TABLE public.profiles DROP CONSTRAINT profiles_status_check;

-- Adicionar nova constraint que inclui 'admin'
ALTER TABLE public.profiles ADD CONSTRAINT profiles_status_check 
CHECK (status = ANY (ARRAY['ativo'::text, 'pendente'::text, 'gratuito'::text, 'admin'::text]));

-- Agora atualizar o usuário para admin com todos os cursos
UPDATE public.profiles 
SET 
  status = 'admin',
  cursos_liberados = ARRAY[
    'tcc-em-30-dias-metodo-agil',
    'metodo-rac-escrita-cientifica', 
    'preparacao-para-mestrado',
    'artigos-cientificos-de-impacto'
  ]
WHERE email = 'zenarede1606@gmail.com';
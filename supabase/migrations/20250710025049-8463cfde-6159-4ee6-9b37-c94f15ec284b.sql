-- Atualizar o usuário específico para ter acesso a todos os cursos e status admin
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

-- Se o usuário não existir ainda, inserir um perfil temporário
INSERT INTO public.profiles (id, email, full_name, status, cursos_liberados)
SELECT 
  '92e4642a-a29f-4f66-8b5b-bd9c50f31a4f'::uuid,
  'zenarede1606@gmail.com',
  'José Eduardo (Admin)',
  'admin',
  ARRAY[
    'tcc-em-30-dias-metodo-agil',
    'metodo-rac-escrita-cientifica', 
    'preparacao-para-mestrado',
    'artigos-cientificos-de-impacto'
  ]
WHERE NOT EXISTS (
  SELECT 1 FROM public.profiles WHERE email = 'zenarede1606@gmail.com'
);
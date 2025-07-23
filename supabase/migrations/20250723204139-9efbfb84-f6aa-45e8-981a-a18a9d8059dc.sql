-- Corrigir a função handle_new_user para funcionar melhor com Google OAuth
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, status, cursos_liberados)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(
      NEW.raw_user_meta_data->>'full_name',
      NEW.raw_user_meta_data->>'name', 
      CONCAT(NEW.raw_user_meta_data->>'first_name', ' ', NEW.raw_user_meta_data->>'last_name'),
      ''
    ),
    'gratuito',
    '{}'::text[]
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recriar o trigger para garantir que está ativo
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Criar o perfil faltante do usuário existente que não tem perfil
INSERT INTO public.profiles (id, email, full_name, status, cursos_liberados)
VALUES (
  '2e4577ad-7183-4cd5-bf4e-c3827f132080',
  'joseeduardoabarros@gmail.com',
  'José Eduardo Barros',
  'gratuito',
  '{}'::text[]
)
ON CONFLICT (id) DO NOTHING;
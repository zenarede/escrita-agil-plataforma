
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Login realizado!",
      description: "Redirecionando para a área do aluno...",
    });
    // Simulate redirect to dashboard
    setTimeout(() => {
      window.location.href = '/dashboard';
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        
        {/* Logo */}
        <div className="text-center">
          <Link to="/" className="flex items-center justify-center space-x-2 text-white">
            <BookOpen className="h-10 w-10" />
            <span className="text-2xl font-bold">Escrita com Ciência</span>
          </Link>
          <p className="mt-2 text-blue-100">
            Acesse sua área do aluno
          </p>
        </div>

        {/* Login Form */}
        <Card className="shadow-2xl">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-gray-900">
              Entrar na Plataforma
            </CardTitle>
            <p className="text-center text-gray-600">
              Entre com suas credenciais para acessar seus cursos
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="seu@email.com"
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Senha
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Sua senha"
                    className="pl-10 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Remember & Forgot */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember"
                    name="remember"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                    Lembrar de mim
                  </label>
                </div>
                <Link to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-500">
                  Esqueceu a senha?
                </Link>
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full bg-blue-700 hover:bg-blue-800" size="lg">
                Entrar
              </Button>
            </form>

            {/* Divider */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Ou</span>
                </div>
              </div>
            </div>

            {/* Sign Up Link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Ainda não tem uma conta?{' '}
                <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
                  Cadastre-se aqui
                </Link>
              </p>
            </div>

            {/* Demo Access */}
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <p className="text-xs text-blue-700 text-center mb-2">
                <strong>Acesso Demo:</strong>
              </p>
              <p className="text-xs text-blue-600 text-center">
                Email: demo@escritacomciencia.com<br />
                Senha: demo123
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Support Link */}
        <div className="text-center">
          <p className="text-blue-100 text-sm">
            Problemas para acessar?{' '}
            <Link to="/contato" className="text-white hover:text-blue-200 underline">
              Entre em contato
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

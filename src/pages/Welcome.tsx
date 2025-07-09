
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, BookOpen, Users, Award, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';

const Welcome = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  const benefits = [
    {
      icon: <BookOpen className="h-8 w-8 text-blue-600" />,
      title: "Acesso a Todos os Cursos",
      description: "Tenha acesso completo à nossa biblioteca de cursos especializados em escrita científica."
    },
    {
      icon: <Users className="h-8 w-8 text-green-600" />,
      title: "Comunidade Exclusiva",
      description: "Conecte-se com outros pesquisadores e compartilhe experiências em nossa comunidade."
    },
    {
      icon: <Award className="h-8 w-8 text-purple-600" />,
      title: "Certificados Reconhecidos",
      description: "Receba certificados de conclusão reconhecidos no meio acadêmico."
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mx-auto mb-4"></div>
          <p>Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Welcome Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Bem-vindo à Escrita com Ciência!
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Parabéns! Você agora faz parte da nossa comunidade de pesquisadores e acadêmicos.
            Estamos felizes em tê-lo conosco nesta jornada de aprendizado.
          </p>
        </div>

        {/* User Info Card */}
        {user && (
          <Card className="mb-12 bg-blue-50 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {user.user_metadata?.full_name?.charAt(0) || user.email?.charAt(0) || 'U'}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {user.user_metadata?.full_name || 'Usuário'}
                  </h3>
                  <p className="text-gray-600">{user.email}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {benefits.map((benefit, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  {benefit.icon}
                </div>
                <CardTitle className="text-xl">{benefit.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Next Steps */}
        <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Próximos Passos</h2>
            <p className="text-blue-100 mb-6 text-lg">
              Complete seu perfil e comece a explorar nossos cursos especializados
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => navigate('/profile-setup')}
                size="lg" 
                variant="secondary"
                className="bg-white text-blue-700 hover:bg-gray-100"
              >
                <Users className="h-5 w-5 mr-2" />
                Completar Perfil
              </Button>
              <Button 
                onClick={() => navigate('/cursos')}
                size="lg" 
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-700"
              >
                Ver Cursos
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Support Section */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Precisa de ajuda para começar?
          </p>
          <Button 
            onClick={() => navigate('/faq')}
            variant="outline"
          >
            Ver Perguntas Frequentes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;

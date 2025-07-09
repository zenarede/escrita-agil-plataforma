
import { useState } from 'react';
import { Clock, Users, Star, BookOpen, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Courses = () => {
  const { user, signInWithGoogle } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const courses = [
    {
      id: 1,
      title: 'TCC em 30 Dias - Método Ágil',
      instructor: 'Dr. Ana Silva',
      description: 'Aprenda a escrever seu TCC de forma organizada e eficiente em apenas 30 dias usando nossa metodologia comprovada.',
      price: 'R$ 297,00',
      originalPrice: 'R$ 497,00',
      duration: '4 semanas',
      students: 2847,
      rating: 4.9,
      level: 'Intermediário',
      category: 'TCC',
      image: '/placeholder.svg'
    },
    {
      id: 2,
      title: 'Método RAC - Escrita Científica',
      instructor: 'Prof. Carlos Santos',
      description: 'Domine a técnica RAC (Resumir, Analisar, Criticar) para escrever textos científicos de qualidade.',
      price: 'R$ 197,00',
      originalPrice: 'R$ 347,00',
      duration: '2 semanas',
      students: 1523,
      rating: 4.8,
      level: 'Básico',
      category: 'Metodologia',
      image: '/placeholder.svg'
    },
    {
      id: 3,
      title: 'Preparação para Mestrado',
      instructor: 'Dra. Maria Oliveira',
      description: 'Prepare-se completamente para ingressar no mestrado: projeto de pesquisa, seleção e muito mais.',
      price: 'R$ 397,00',
      originalPrice: 'R$ 597,00',
      duration: '6 semanas',
      students: 987,
      rating: 4.9,
      level: 'Avançado',
      category: 'Pós-graduação',
      image: '/placeholder.svg'
    },
    {
      id: 4,
      title: 'Artigos Científicos de Impacto',
      instructor: 'Dr. Roberto Lima',
      description: 'Aprenda a escrever e publicar artigos científicos em revistas de alto impacto.',
      price: 'R$ 347,00',
      originalPrice: 'R$ 497,00',
      duration: '5 semanas',
      students: 756,
      rating: 4.7,
      level: 'Avançado',
      category: 'Publicação',
      image: '/placeholder.svg'
    }
  ];

  const handleEnrollClick = async () => {
    if (user) {
      toast({
        title: "Você já está logado!",
        description: "Redirecionando para a área do aluno...",
      });
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 1500);
      return;
    }

    setLoading(true);
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Error during Google sign in:', error);
      toast({
        title: "Erro no login",
        description: "Ocorreu um erro ao tentar fazer login. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Nossos Cursos
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Cursos práticos e eficazes para acelerar sua jornada acadêmica e científica
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {courses.map((course) => (
            <Card key={course.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="aspect-video bg-gradient-to-br from-blue-600 to-blue-800 relative">
                <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                  <Play className="h-16 w-16 text-white" />
                </div>
                <Badge className="absolute top-4 left-4 bg-yellow-500 text-yellow-900">
                  {course.category}
                </Badge>
              </div>
              
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-xl line-clamp-2">{course.title}</CardTitle>
                  <Badge variant="outline">{course.level}</Badge>
                </div>
                <p className="text-sm text-gray-600">{course.instructor}</p>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-gray-700 text-sm line-clamp-3">
                  {course.description}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{course.students} alunos</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>{course.rating}</span>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-2xl font-bold text-blue-700">{course.price}</span>
                      <span className="text-sm text-gray-500 line-through ml-2">{course.originalPrice}</span>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={handleEnrollClick}
                    className="w-full bg-blue-700 hover:bg-blue-800"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Conectando...</span>
                      </div>
                    ) : (
                      <>
                        <BookOpen className="h-4 w-4 mr-2" />
                        {user ? 'Acessar Curso' : 'Inscrever-se'}
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center bg-blue-700 rounded-2xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">
            Não encontrou o que procurava?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Entre em contato conosco e descubra como podemos ajudar você
          </p>
          <Button size="lg" variant="secondary" className="bg-white text-blue-700 hover:bg-gray-100">
            Falar com Especialista
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Courses;

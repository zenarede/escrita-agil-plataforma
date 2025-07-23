
import { useState, useEffect } from 'react';
import { BookOpen, Play, Calendar, Download, Award, Clock, TrendingUp, Users, CheckCircle, ShoppingCart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { useUserAccess } from '@/hooks/useUserAccess';
import { supabase } from '@/integrations/supabase/client';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();
  const { data: userProfile } = useUserAccess();
  const [availableCourses, setAvailableCourses] = useState<any[]>([]);

  useEffect(() => {
    const fetchAvailableCourses = async () => {
      // Buscar cursos únicos da tabela course_videos
      const { data: courses, error } = await supabase
        .from('course_videos')
        .select('course_slug')
        .order('course_slug');

      if (!error && courses) {
        // Remover duplicatas e criar lista de cursos únicos
        const uniqueCourses = courses.reduce((acc: any[], current) => {
          const existing = acc.find(course => course.course_slug === current.course_slug);
          if (!existing) {
            acc.push({
              course_slug: current.course_slug,
              title: getCourseTitleFromSlug(current.course_slug),
              hasAccess: userProfile?.cursos_liberados?.includes(current.course_slug) || 
                         userProfile?.status === 'admin' || false
            });
          }
          return acc;
        }, []);
        
        setAvailableCourses(uniqueCourses);
      }
    };

    if (userProfile) {
      fetchAvailableCourses();
    }
  }, [userProfile]);

  const getCourseTitleFromSlug = (slug: string) => {
    const titles: { [key: string]: string } = {
      'tcc-em-30-dias-metodo-agil': 'TCC em 30 Dias - Método Ágil',
      'metodo-rac-escrita-cientifica': 'Método RAC - Escrita Científica',
      'preparacao-para-mestrado': 'Preparação para Mestrado',
      'artigos-cientificos-de-impacto': 'Artigos Científicos de Impacto'
    };
    return titles[slug] || slug;
  };

  const enrolledCourses = availableCourses.filter(course => course.hasAccess);
  const availableForPurchase = availableCourses.filter(course => !course.hasAccess);

  const stats = [
    { label: 'Cursos Liberados', value: enrolledCourses.length.toString(), icon: CheckCircle, color: 'text-green-600' },
    { label: 'Status', value: userProfile?.status || 'gratuito', icon: Award, color: 'text-blue-600' },
    { label: 'Cursos Disponíveis', value: availableForPurchase.length.toString(), icon: BookOpen, color: 'text-purple-600' },
    { label: 'Perfil Completo', value: userProfile?.cpf ? 'Sim' : 'Não', icon: Users, color: 'text-orange-600' }
  ];

  if (!user || !userProfile) {
    return (
      <div className="min-h-screen pt-20 bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando dados do usuário...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Olá, {userProfile.full_name || user.email}! 👋
              </h1>
              <p className="text-gray-600 mt-1">
                Continue sua jornada de aprendizado
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Status da conta</p>
                <Badge variant={userProfile.status === 'ativo' ? 'default' : 'secondary'}>
                  {userProfile.status || 'gratuito'}
                </Badge>
              </div>
              <div className="w-12 h-12 bg-blue-700 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">
                  {(userProfile.full_name || user.email || '').charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="courses" className="space-y-8">
          <TabsList className="grid w-full lg:w-auto grid-cols-3">
            <TabsTrigger value="courses">Meus Cursos</TabsTrigger>
            <TabsTrigger value="available">Cursos Disponíveis</TabsTrigger>
            <TabsTrigger value="profile">Meu Perfil</TabsTrigger>
          </TabsList>

          {/* My Courses Tab */}
          <TabsContent value="courses" className="space-y-6">
            {enrolledCourses.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {enrolledCourses.map((course) => (
                  <Card key={course.course_slug} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg">{course.title}</CardTitle>
                      <Badge variant="default">Liberado</Badge>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex gap-2">
                        <Link to={`/curso/${course.course_slug}`} className="flex-1">
                          <Button size="sm" className="w-full">
                            <Play className="h-4 w-4 mr-2" />
                            Acessar Curso
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-600 mb-2">Nenhum curso liberado</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Você ainda não tem acesso a nenhum curso. Adquira um curso para começar!
                  </p>
                  <Button onClick={() => {
                    const tab = document.querySelector('[data-value="available"]') as HTMLButtonElement;
                    tab?.click();
                  }}>
                    Ver Cursos Disponíveis
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Available Courses Tab */}
          <TabsContent value="available" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {availableForPurchase.map((course) => (
                <Card key={course.course_slug} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">{course.title}</CardTitle>
                    <Badge variant="outline">Disponível para compra</Badge>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-2">
                      <Link to={`/curso/${course.course_slug}`} className="flex-1">
                        <Button size="sm" variant="outline" className="w-full">
                          Ver Detalhes
                        </Button>
                      </Link>
                      <Link to={`/comprar/${course.course_slug}`}>
                        <Button size="sm">
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Comprar
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Dados do Perfil</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Nome Completo</label>
                    <p className="text-gray-900">{userProfile.full_name || 'Não informado'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Email</label>
                    <p className="text-gray-900">{userProfile.email || user.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">CPF</label>
                    <p className="text-gray-900">{userProfile.cpf || 'Não informado'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Telefone</label>
                    <p className="text-gray-900">{userProfile.phone || 'Não informado'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Interesses de Estudo</label>
                    <p className="text-gray-900">
                      {userProfile.study_interests?.join(', ') || 'Não informado'}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Qualificações</label>
                    <p className="text-gray-900">
                      {userProfile.qualifications?.join(', ') || 'Não informado'}
                    </p>
                  </div>
                </div>
                
                {(!userProfile.cpf || !userProfile.phone) && (
                  <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-yellow-800 text-sm">
                      ⚠️ Complete seu perfil para ter acesso completo à plataforma.
                    </p>
                    <Link to="/profile-setup">
                      <Button size="sm" className="mt-2">
                        Completar Perfil
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;



import { useState } from 'react';
import { BookOpen, Play, Calendar, Download, Award, Clock, TrendingUp, Users, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Dashboard = () => {
  const [user] = useState({
    name: 'Maria Silva',
    email: 'maria@example.com',
    joinDate: '15 de Janeiro, 2024',
    avatar: 'MS'
  });

  const enrolledCourses = [
    {
      id: 1,
      title: 'TCC em 30 Dias - Método Ágil',
      instructor: 'Dr. Ana Silva',
      progress: 75,
      totalLessons: 20,
      completedLessons: 15,
      nextLesson: 'Estruturação do Capítulo 3',
      category: 'Em Progresso'
    },
    {
      id: 2,
      title: 'Método RAC - Escrita Científica',
      instructor: 'Prof. Carlos Santos',
      progress: 100,
      totalLessons: 8,
      completedLessons: 8,
      nextLesson: 'Curso Concluído',
      category: 'Concluído'
    },
    {
      id: 3,
      title: 'Preparação para Mestrado',
      instructor: 'Dra. Maria Oliveira',
      progress: 30,
      totalLessons: 12,
      completedLessons: 4,
      nextLesson: 'Elaboração do Projeto de Pesquisa',
      category: 'Em Progresso'
    }
  ];

  const upcomingMentoring = [
    {
      id: 1,
      title: 'Mentoria em Grupo - TCC',
      date: '2024-01-25',
      time: '19:00',
      instructor: 'Dr. Ana Silva',
      participants: 8,
      type: 'Grupal'
    },
    {
      id: 2,
      title: 'Revisão de Textos',
      date: '2024-01-30',
      time: '20:00',
      instructor: 'Prof. Carlos Santos',
      participants: 12,
      type: 'Grupal'
    }
  ];

  const certificates = [
    {
      id: 1,
      course: 'Método RAC - Escrita Científica',
      issueDate: '2024-01-20',
      instructor: 'Prof. Carlos Santos'
    }
  ];

  const stats = [
    { label: 'Cursos Concluídos', value: '1', icon: CheckCircle, color: 'text-green-600' },
    { label: 'Horas de Estudo', value: '42', icon: Clock, color: 'text-blue-600' },
    { label: 'Mentorias Participadas', value: '5', icon: Users, color: 'text-purple-600' },
    { label: 'Progresso Geral', value: '68%', icon: TrendingUp, color: 'text-orange-600' }
  ];

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Olá, {user.name}! 👋
              </h1>
              <p className="text-gray-600 mt-1">
                Continue sua jornada de aprendizado
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Membro desde</p>
                <p className="font-medium text-gray-900">{user.joinDate}</p>
              </div>
              <div className="w-12 h-12 bg-blue-700 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">{user.avatar}</span>
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
          <TabsList className="grid w-full lg:w-auto grid-cols-4">
            <TabsTrigger value="courses">Meus Cursos</TabsTrigger>
            <TabsTrigger value="mentoring">Mentorias</TabsTrigger>
            <TabsTrigger value="materials">Materiais</TabsTrigger>
            <TabsTrigger value="certificates">Certificados</TabsTrigger>
          </TabsList>

          {/* Courses Tab */}
          <TabsContent value="courses" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {enrolledCourses.map((course) => (
                <Card key={course.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg">{course.title}</CardTitle>
                      <Badge variant={course.progress === 100 ? "default" : "secondary"}>
                        {course.category}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{course.instructor}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Progresso</span>
                        <span>{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>
                    
                    <div className="text-sm text-gray-600">
                      <p>{course.completedLessons} de {course.totalLessons} aulas concluídas</p>
                      <p className="mt-1"><strong>Próximo:</strong> {course.nextLesson}</p>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">
                        <Play className="h-4 w-4 mr-2" />
                        Continuar
                      </Button>
                      <Button size="sm" variant="outline">
                        Detalhes
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Mentoring Tab */}
          <TabsContent value="mentoring" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Próximas Mentorias
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingMentoring.map((session) => (
                    <div key={session.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{session.title}</h3>
                          <p className="text-sm text-gray-600">{session.instructor}</p>
                          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                            <span>📅 {new Date(session.date).toLocaleDateString('pt-BR')}</span>
                            <span>🕐 {session.time}</span>
                            <span>👥 {session.participants} participantes</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">{session.type}</Badge>
                          <Button size="sm">Participar</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Materials Tab */}
          <TabsContent value="materials" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <Download className="h-6 w-6 text-blue-700" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Templates TCC</h3>
                      <p className="text-sm text-gray-600">Modelos prontos para seu trabalho</p>
                    </div>
                  </div>
                  <Button className="w-full mt-4" variant="outline">
                    Baixar Arquivo
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="bg-green-100 p-3 rounded-lg">
                      <BookOpen className="h-6 w-6 text-green-700" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Guia Método RAC</h3>
                      <p className="text-sm text-gray-600">E-book completo da metodologia</p>
                    </div>
                  </div>
                  <Button className="w-full mt-4" variant="outline">
                    Baixar PDF
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="bg-purple-100 p-3 rounded-lg">
                      <Calendar className="h-6 w-6 text-purple-700" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Cronograma TCC</h3>
                      <p className="text-sm text-gray-600">Planejamento em 30 dias</p>
                    </div>
                  </div>
                  <Button className="w-full mt-4" variant="outline">
                    Baixar Planilha
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Certificates Tab */}
          <TabsContent value="certificates" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {certificates.map((cert) => (
                <Card key={cert.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-yellow-100 p-3 rounded-lg">
                        <Award className="h-6 w-6 text-yellow-700" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{cert.course}</h3>
                        <p className="text-sm text-gray-600 mt-1">{cert.instructor}</p>
                        <p className="text-sm text-gray-500">
                          Emitido em {new Date(cert.issueDate).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button size="sm" className="flex-1">
                        <Download className="h-4 w-4 mr-2" />
                        Baixar
                      </Button>
                      <Button size="sm" variant="outline">
                        Visualizar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {/* Placeholder for future certificates */}
              <Card className="border-dashed border-2 border-gray-300">
                <CardContent className="p-6 text-center">
                  <Award className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-600 mb-2">Mais certificados em breve</h3>
                  <p className="text-sm text-gray-500">
                    Complete seus cursos para ganhar novos certificados
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;

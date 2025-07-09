
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useCanAccessCourse } from '@/hooks/useUserAccess';
import { useCourseVideos } from '@/hooks/useCourseVideos';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Clock, Lock, ArrowLeft } from 'lucide-react';

const CourseDetails = () => {
  const { courseSlug } = useParams<{ courseSlug: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { canAccess, userStatus, isLoading: accessLoading } = useCanAccessCourse(courseSlug || '');
  const { data: videos, isLoading: videosLoading } = useCourseVideos(courseSlug);

  // Course data (in a real app, this would come from the database)
  const courseData = {
    'tcc-em-30-dias-metodo-agil': {
      title: 'TCC em 30 Dias - Método Ágil',
      description: 'Aprenda a escrever seu TCC de forma organizada e eficiente em apenas 30 dias usando nossa metodologia comprovada.',
      instructor: 'Dr. Ana Silva',
      category: 'TCC'
    },
    'metodo-rac-escrita-cientifica': {
      title: 'Método RAC - Escrita Científica',
      description: 'Domine a técnica RAC (Resumir, Analisar, Criticar) para escrever textos científicos de qualidade.',
      instructor: 'Prof. Carlos Santos',
      category: 'Metodologia'
    },
    'preparacao-para-mestrado': {
      title: 'Preparação para Mestrado',
      description: 'Prepare-se completamente para ingressar no mestrado: projeto de pesquisa, seleção e muito mais.',
      instructor: 'Dra. Maria Oliveira',
      category: 'Pós-graduação'
    },
    'artigos-cientificos-de-impacto': {
      title: 'Artigos Científicos de Impacto',
      description: 'Aprenda a escrever e publicar artigos científicos em revistas de alto impacto.',
      instructor: 'Dr. Roberto Lima',
      category: 'Publicação'
    }
  };

  const course = courseSlug ? courseData[courseSlug as keyof typeof courseData] : null;

  if (!courseSlug || !course) {
    return (
      <div className="min-h-screen pt-20 bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Curso não encontrado</h1>
          <Button onClick={() => navigate('/cursos')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar aos Cursos
          </Button>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen pt-20 bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="pt-6 text-center">
            <Lock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Acesso Restrito</h2>
            <p className="text-gray-600 mb-4">
              Você precisa fazer login para acessar este curso.
            </p>
            <Button onClick={() => navigate('/login')} className="w-full">
              Fazer Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (accessLoading || videosLoading) {
    return (
      <div className="min-h-screen pt-20 bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mx-auto mb-4"></div>
          <p>Carregando curso...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate('/cursos')}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar aos Cursos
        </Button>

        {/* Course Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Badge className="bg-blue-100 text-blue-800">{course.category}</Badge>
            {canAccess && (
              <Badge className="bg-green-100 text-green-800">Acesso Liberado</Badge>
            )}
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{course.title}</h1>
          <p className="text-lg text-gray-600 mb-2">{course.description}</p>
          <p className="text-sm text-gray-500">Instrutor: {course.instructor}</p>
        </div>

        {canAccess ? (
          // User has access - show videos
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">Conteúdo do Curso</h2>
            
            {videos && videos.length > 0 ? (
              <div className="space-y-4">
                {videos.map((video, index) => (
                  <Card key={video.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {index + 1}
                          </Badge>
                          {video.title}
                        </CardTitle>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Clock className="h-4 w-4" />
                          <span>{video.duration_minutes}min</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {video.description && (
                        <p className="text-gray-600 text-sm mb-4">{video.description}</p>
                      )}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-gray-500">
                          <span>Aula {index + 1} de {videos.length}</span>
                        </div>
                        <Button size="sm" className="bg-blue-700 hover:bg-blue-800">
                          <Play className="h-4 w-4 mr-2" />
                          Assistir
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600">Nenhum vídeo encontrado para este curso.</p>
              </div>
            )}
          </div>
        ) : (
          // User doesn't have access - show upgrade message
          <Card className="text-center py-12">
            <CardContent>
              <Lock className="h-16 w-16 text-gray-400 mx-auto mb-6" />
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Acesso Restrito
              </h2>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Você ainda não tem acesso a este curso. Faça sua assinatura ou compre o curso individual para começar a estudar.
              </p>
              <div className="space-y-3">
                <p className="text-sm text-gray-500">
                  Status atual: <Badge variant="outline">{userStatus}</Badge>
                </p>
                <div className="flex gap-4 justify-center">
                  <Button className="bg-blue-700 hover:bg-blue-800">
                    Comprar Curso
                  </Button>
                  <Button variant="outline">
                    Ver Planos
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CourseDetails;

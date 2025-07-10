
import React, { useState, useRef } from 'react';
import { Play, Clock, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useCourseVideos, CourseVideo } from '@/hooks/useCourseVideos';
import { useCanAccessCourse } from '@/hooks/useUserAccess';

interface CourseVideosProps {
  courseSlug: string;
  courseTitle: string;
}

// Hook para extrair ID do YouTube de uma URL
const getYouTubeVideoId = (url: string): string | null => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

// Componente do Player de Vídeo
interface VideoPlayerProps {
  videoUrl: string;
  videoTitle: string;
  onVideoEnd: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl, videoTitle, onVideoEnd }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  // Por enquanto, vamos simular que é YouTube e extrair o ID
  const videoId = getYouTubeVideoId(videoUrl) || 'dQw4w9WgXcQ'; // fallback video
  
  // Simular o fim do vídeo após 3 segundos (para testes)
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onVideoEnd();
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [onVideoEnd]);

  return (
    <div className="w-full">
      <div className="aspect-video w-full bg-gray-100 rounded-lg overflow-hidden">
        <iframe
          ref={iframeRef}
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1`}
          title={videoTitle}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        />
      </div>
    </div>
  );
};

const CourseVideos: React.FC<CourseVideosProps> = ({ courseSlug, courseTitle }) => {
  const { data: videos, isLoading, error } = useCourseVideos(courseSlug);
  const { canAccess } = useCanAccessCourse(courseSlug);
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const [completedVideos, setCompletedVideos] = useState<Set<string>>(new Set());
  const [videoEnded, setVideoEnded] = useState<Set<string>>(new Set());

  console.log('🎥 CourseVideos - Curso:', courseSlug);
  console.log('🔐 CourseVideos - Pode acessar:', canAccess);
  console.log('📹 CourseVideos - Total de vídeos:', videos?.length || 0);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-900">Conteúdo do Curso</h3>
        <div className="grid gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 rounded-lg h-24"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    console.error('Error loading course videos:', error);
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Erro ao carregar os vídeos do curso.</p>
      </div>
    );
  }

  if (!videos || videos.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Nenhum vídeo encontrado para este curso.</p>
      </div>
    );
  }

  const handleWatchClick = (videoId: string) => {
    if (!canAccess) {
      return; // Não permitir assistir se não tiver acesso
    }
    setActiveVideoId(activeVideoId === videoId ? null : videoId);
  };

  const handleVideoEnd = (videoId: string) => {
    setVideoEnded(prev => new Set([...prev, videoId]));
  };

  const handleMarkAsWatched = (videoId: string) => {
    setCompletedVideos(prev => new Set([...prev, videoId]));
    // Aqui futuramente vamos salvar no banco de dados
    console.log('Vídeo marcado como assistido:', videoId);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Conteúdo do Curso</h3>
        <p className="text-gray-600">{courseTitle}</p>
      </div>
      
      <div className="grid gap-4">
        {videos.map((video: CourseVideo, index: number) => {
          const isVideoActive = activeVideoId === video.id;
          const isCompleted = completedVideos.has(video.id);
          const hasVideoEnded = videoEnded.has(video.id);
          
          return (
            <Card key={video.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {index + 1}
                    </Badge>
                    {video.title}
                    {isCompleted && (
                      <Badge variant="default" className="bg-green-100 text-green-800 text-xs">
                        <Check className="h-3 w-3 mr-1" />
                        Concluído
                      </Badge>
                    )}
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
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <span>Aula {index + 1} de {videos.length}</span>
                  </div>
                  
                  {canAccess ? (
                    <Collapsible open={isVideoActive} onOpenChange={() => handleWatchClick(video.id)}>
                      <CollapsibleTrigger asChild>
                        <Button variant="ghost" className="flex items-center gap-2">
                          <Play className="h-4 w-4 text-blue-700" />
                          <span className="text-sm font-medium text-blue-700">
                            {isVideoActive ? 'Fechar' : 'Assistir'}
                          </span>
                          {isVideoActive ? (
                            <ChevronUp className="h-4 w-4 text-blue-700" />
                          ) : (
                            <ChevronDown className="h-4 w-4 text-blue-700" />
                          )}
                        </Button>
                      </CollapsibleTrigger>
                    </Collapsible>
                  ) : (
                    <div className="flex items-center gap-2 text-gray-400">
                      <Play className="h-4 w-4" />
                      <span className="text-sm">🔒 Acesso restrito</span>
                    </div>
                  )}
                </div>

                {canAccess && (
                  <Collapsible open={isVideoActive}>
                    <CollapsibleContent className="space-y-4">
                      <VideoPlayer
                        videoUrl={video.video_url}
                        videoTitle={video.title}
                        onVideoEnd={() => handleVideoEnd(video.id)}
                      />
                      
                      {hasVideoEnded && !isCompleted && (
                        <div className="flex justify-center">
                          <Button
                            onClick={() => handleMarkAsWatched(video.id)}
                            className="bg-green-600 hover:bg-green-700 text-white"
                          >
                            <Check className="h-4 w-4 mr-2" />
                            Marcar como assistido
                          </Button>
                        </div>
                      )}
                      
                      {isCompleted && (
                        <div className="flex justify-center">
                          <Badge variant="default" className="bg-green-100 text-green-800">
                            <Check className="h-4 w-4 mr-2" />
                            Aula concluída
                          </Badge>
                        </div>
                      )}
                    </CollapsibleContent>
                  </Collapsible>
                )}

                {!canAccess && (
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                    <p className="text-gray-600 text-sm mb-2">
                      🔒 Você precisa adquirir acesso a este curso para assistir os vídeos
                    </p>
                    <Button variant="outline" size="sm" className="mt-2">
                      Adquirir curso
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default CourseVideos;

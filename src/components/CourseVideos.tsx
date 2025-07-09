
import React from 'react';
import { Play, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCourseVideos, CourseVideo } from '@/hooks/useCourseVideos';

interface CourseVideosProps {
  courseSlug: string;
  courseTitle: string;
}

const CourseVideos: React.FC<CourseVideosProps> = ({ courseSlug, courseTitle }) => {
  const { data: videos, isLoading, error } = useCourseVideos(courseSlug);

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

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Conteúdo do Curso</h3>
        <p className="text-gray-600">{courseTitle}</p>
      </div>
      
      <div className="grid gap-4">
        {videos.map((video: CourseVideo, index: number) => (
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
                  <span>
                    Aula {index + 1} de {videos.length}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Play className="h-4 w-4 text-blue-700" />
                  <span className="text-sm font-medium text-blue-700">Assistir</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CourseVideos;

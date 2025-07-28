import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock } from "lucide-react";
import { CourseProgress as CourseProgressType } from "@/hooks/useUserProgress";

interface CourseProgressProps {
  courseProgress: CourseProgressType;
  showDetails?: boolean;
}

export const CourseProgress = ({ courseProgress, showDetails = true }: CourseProgressProps) => {
  const { curso_slug, total_videos, watched_videos, progress_percentage, completed } = courseProgress;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {completed ? (
            <CheckCircle2 className="h-4 w-4 text-primary" />
          ) : (
            <Clock className="h-4 w-4 text-muted-foreground" />
          )}
          <span className="text-sm font-medium">
            {progress_percentage}% concluído
          </span>
        </div>
        {showDetails && (
          <Badge variant={completed ? "default" : "secondary"}>
            {completed ? "Concluído" : "Em andamento"}
          </Badge>
        )}
      </div>
      
      <Progress value={progress_percentage} className="h-2" />
      
      {showDetails && (
        <p className="text-xs text-muted-foreground">
          {watched_videos} de {total_videos} vídeos assistidos
        </p>
      )}
    </div>
  );
};
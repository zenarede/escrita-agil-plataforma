import { Button } from "@/components/ui/button";
import { CheckCircle2, Circle } from "lucide-react";
import { useUserProgress } from "@/hooks/useUserProgress";

interface VideoProgressButtonProps {
  videoId: string;
  courseSlug: string;
  disabled?: boolean;
}

export const VideoProgressButton = ({ videoId, courseSlug, disabled = false }: VideoProgressButtonProps) => {
  const { isVideoWatched, markVideoAsWatched, markVideoAsUnwatched } = useUserProgress();
  
  const watched = isVideoWatched(videoId);

  const handleToggle = () => {
    if (watched) {
      markVideoAsUnwatched(videoId, courseSlug);
    } else {
      markVideoAsWatched(videoId, courseSlug);
    }
  };

  return (
    <Button
      variant={watched ? "default" : "outline"}
      size="sm"
      onClick={handleToggle}
      disabled={disabled}
      className="flex items-center gap-2"
    >
      {watched ? (
        <>
          <CheckCircle2 className="h-4 w-4" />
          Assistido
        </>
      ) : (
        <>
          <Circle className="h-4 w-4" />
          Marcar como assistido
        </>
      )}
    </Button>
  );
};
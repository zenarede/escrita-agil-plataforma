
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface CourseVideo {
  id: string;
  course_slug: string;
  title: string;
  description: string | null;
  video_url: string;
  duration_minutes: number | null;
  upload_date: string | null;
  order_index: number | null;
  created_at: string | null;
  preco: number | null;
}

export const useCourseVideos = (courseSlug?: string) => {
  return useQuery({
    queryKey: ['course-videos', courseSlug],
    queryFn: async () => {
      if (!courseSlug) {
        return [];
      }
      
      const { data, error } = await supabase
        .from('course_videos')
        .select('*')
        .eq('course_slug', courseSlug)
        .order('order_index', { ascending: true });
      
      if (error) {
        throw error;
      }
      
      return data as CourseVideo[];
    },
    enabled: !!courseSlug
  });
};

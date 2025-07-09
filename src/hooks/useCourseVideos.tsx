
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
}

export const useCourseVideos = (courseSlug?: string) => {
  return useQuery({
    queryKey: ['course-videos', courseSlug],
    queryFn: async () => {
      console.log('Fetching course videos for:', courseSlug);
      
      let query = supabase
        .from('course_videos')
        .select('*')
        .order('order_index', { ascending: true });
      
      if (courseSlug) {
        query = query.eq('course_slug', courseSlug);
      }
      
      const { data, error } = await query;
      
      if (error) {
        console.error('Error fetching course videos:', error);
        throw error;
      }
      
      console.log('Fetched course videos:', data);
      return data as CourseVideo[];
    },
    enabled: true
  });
};

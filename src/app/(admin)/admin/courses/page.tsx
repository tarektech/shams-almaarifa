import { CoursesManagement } from '@/components/admin/courses-management';
import { createClient } from '@/lib/server';

export const dynamic = 'force-dynamic';

export default async function CoursesPage() {
  const supabase = await createClient();

  const { data: courses, error } = await supabase
    .from('courses')
    .select(
      `
      id,
      title,
      description,
      teacher_name,
      image_url,
      file_url,
      created_at,
      updated_at
    `
    )
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching courses:', error);
  } else {
    console.log(
      'Successfully fetched courses:',
      courses?.length || 0,
      'courses'
    );
  }

  return <CoursesManagement courses={courses || []} error={error} />;
}

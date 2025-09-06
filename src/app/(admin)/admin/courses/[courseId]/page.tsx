import { createClient } from '@/lib/server';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

type CoursePageProps = {
  params: Promise<{ courseId: string }>;
};

export default async function CoursePageId({ params }: CoursePageProps) {
  const { courseId } = await params;

  // Convert courseId to number for comparison
  const courseIdNum = parseInt(courseId, 10);

  if (isNaN(courseIdNum)) {
    console.log('Invalid courseId:', courseId);
    return notFound();
  }

  // Create server-side Supabase client
  const supabase = await createClient();

  // Check if user is authenticated
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();
  console.log('Current user:', user);
  console.log('Auth error:', authError);

  console.log('Attempting to query course with ID:', courseIdNum);

  // First, let's try to fetch all courses to see what's available
  const { data: allCourses, error: allCoursesError } = await supabase
    .from('courses')
    .select('id, title')
    .order('id');

  console.log('All available courses:', allCourses);
  console.log('All courses error:', allCoursesError);

  // Try to query the specific course without .single() first
  const { data: courseArray, error: queryError } = await supabase
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
    .eq('id', courseIdNum);

  console.log('Course query result:', { courseArray, queryError });

  if (queryError) {
    console.error('Supabase query error:', queryError);
    return notFound();
  }

  if (!courseArray || courseArray.length === 0) {
    console.log('No course found with ID:', courseIdNum);
    console.log(
      'Available course IDs:',
      allCourses?.map((c) => c.id)
    );
    return notFound();
  }

  const course = courseArray[0];
  console.log('Found course:', course);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {course.image_url && (
            <div className="relative h-64 w-full">
              <Image
                src={course.image_url}
                alt={course.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          <div className="p-8">
            <div className="flex flex-col gap-6">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  {course.title}
                </h1>
                <p className="text-xl text-gray-600">
                  by {course.teacher_name}
                </p>
              </div>

              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  {course.description || 'No description available'}
                </p>
              </div>

              <div className="flex items-center justify-between pt-6 border-t">
                <div className="text-sm text-gray-500">
                  Created: {new Date(course.created_at).toLocaleDateString()}
                </div>
                <div className="text-sm text-gray-500">
                  Updated: {new Date(course.updated_at).toLocaleDateString()}
                </div>
              </div>

              {course.file_url && (
                <div className="pt-4">
                  <a
                    href={course.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
                  >
                    View Course Materials
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

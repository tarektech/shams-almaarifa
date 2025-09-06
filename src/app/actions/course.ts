'use server';

import { createClient } from '@/lib/server';
import { revalidatePath } from 'next/cache';

type CreateCourseData = {
  title: string;
  description: string;
  teacher_name: string;
  image_file: File | null;
  course_file: File | null;
};

export async function CreateCourse(formData: CreateCourseData) {
  const supabase = await createClient();

  // Get current user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) {
    throw new Error('User not authenticated');
  }

  let imageUrl: string | null = null;
  let fileUrl: string | null = null;

  try {
    // Upload image file if provided
    if (formData.image_file) {
      const imageFileName = `${Date.now()}-${formData.image_file.name}`;
      const { error: imageError } = await supabase.storage
        .from('courses')
        .upload(`images/${imageFileName}`, formData.image_file);

      if (imageError) {
        throw new Error(`Image upload failed: ${imageError.message}`);
      }

      // Get public URL for the uploaded image
      const { data: imageUrlData } = supabase.storage
        .from('courses')
        .getPublicUrl(`images/${imageFileName}`);

      imageUrl = imageUrlData.publicUrl;
    }

    // Upload course file if provided
    if (formData.course_file) {
      const courseFileName = `${Date.now()}-${formData.course_file.name}`;
      const { error: courseFileError } = await supabase.storage
        .from('courses')
        .upload(`files/${courseFileName}`, formData.course_file);

      if (courseFileError) {
        throw new Error(
          `Course file upload failed: ${courseFileError.message}`
        );
      }

      // Get public URL for the uploaded file
      const { data: fileUrlData } = supabase.storage
        .from('courses')
        .getPublicUrl(`files/${courseFileName}`);

      fileUrl = fileUrlData.publicUrl;
    }

    // Insert course data into database
    const { data: courseData, error: courseError } = await supabase
      .from('courses')
      .insert({
        title: formData.title,
        description: formData.description,
        teacher_name: formData.teacher_name,
        image_url: imageUrl,
        file_url: fileUrl,
        created_by: user.id,
      })
      .select()
      .single();

    if (courseError) {
      throw new Error(`Course creation failed: ${courseError.message}`);
    }

    // Revalidate the courses page to show the new course
    revalidatePath('/admin/courses');

    return { success: true, course: courseData };
  } catch (error) {
    // Clean up uploaded files if database insert fails
    if (imageUrl) {
      const imagePath = imageUrl.split('/').pop();
      if (imagePath) {
        await supabase.storage.from('courses').remove([`images/${imagePath}`]);
      }
    }
    if (fileUrl) {
      const filePath = fileUrl.split('/').pop();
      if (filePath) {
        await supabase.storage.from('courses').remove([`files/${filePath}`]);
      }
    }

    throw error;
  }
}

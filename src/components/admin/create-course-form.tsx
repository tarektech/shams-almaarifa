'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Upload, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { CreateCourse } from '@/app/actions/course';
import { toast } from 'sonner';

export function CreateCourseForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    teacher_name: '',
    image_file: null as File | null,
    course_file: null as File | null,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: 'image_file' | 'course_file'
  ) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, [fieldName]: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await CreateCourse(formData);

      if (result.success) {
        toast.success('Course created successfully!', {
          description: `"${result.course.title}" has been added to your courses.`,
        });
        console.log('Course created successfully:', result.course);
        router.push('/admin/courses');
      }
    } catch (error) {
      console.error('Error creating course:', error);
      toast.error('Failed to create course', {
        description:
          error instanceof Error
            ? error.message
            : 'An unexpected error occurred',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Link href="/admin/courses">
          <Button variant="ghost" className="cursor-pointer">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Courses
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Course Information</CardTitle>
          <CardDescription>
            Fill in the details for the new course
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Course Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter course title"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="teacher_name">Teacher Name</Label>
              <Input
                id="teacher_name"
                name="teacher_name"
                value={formData.teacher_name}
                onChange={handleInputChange}
                placeholder="Enter teacher name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter course description"
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image_file">Course Image</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                <div className="text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-4">
                    <label htmlFor="image_file" className="cursor-pointer">
                      <span className="mt-2 block text-sm font-medium text-gray-900">
                        Click to upload course image
                      </span>
                      <input
                        id="image_file"
                        name="image_file"
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        onChange={(e) => handleFileChange(e, 'image_file')}
                      />
                    </label>
                    <p className="mt-2 text-xs text-gray-500">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
                {formData.image_file && (
                  <div className="mt-4 text-sm text-gray-600">
                    Selected: {formData.image_file.name}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="course_file">Course Files (Optional)</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                <div className="text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-4">
                    <label htmlFor="course_file" className="cursor-pointer">
                      <span className="mt-2 block text-sm font-medium text-gray-900">
                        Click to upload course files
                      </span>
                      <input
                        id="course_file"
                        name="course_file"
                        type="file"
                        accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                        className="sr-only"
                        onChange={(e) => handleFileChange(e, 'course_file')}
                      />
                    </label>
                    <p className="mt-2 text-xs text-gray-500">
                      PDF, DOC, XLS, PPT up to 50MB
                    </p>
                  </div>
                </div>
                {formData.course_file && (
                  <div className="mt-4 text-sm text-gray-600">
                    Selected: {formData.course_file.name}
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                type="submit"
                disabled={isLoading}
                className="cursor-pointer"
              >
                {isLoading ? 'Creating...' : 'Create Course'}
              </Button>
              <Link href="/admin/courses">
                <Button
                  variant="outline"
                  type="button"
                  className="cursor-pointer"
                >
                  Cancel
                </Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

type CourseType = {
  id: number;
  title: string;
  teacher_name: string;
  description: string;
  image_url?: string;
  file_url?: string;
  created_at: string;
  updated_at: string;
};

export function CoursesManagement({
  courses,
  error,
}: {
  courses: CourseType[];
  error: unknown;
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.teacher_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (error) {
    return <div>Error: {error.toString()}</div>;
  }

  const coursePageHandler = (courseId: number) => {
    router.push(`/admin/courses/${courseId}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Courses</h1>
          <p className="text-gray-600">Manage all courses in your platform</p>
        </div>
        <Link href="/admin/courses/new">
          <Button className="cursor-pointer">
            <Plus className="h-4 w-4 mr-2" />
            Create Course
          </Button>
        </Link>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search courses or teachers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredCourses.map((course) => (
          <Card key={course.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <Link
                  href={`/admin/courses/${course.id}`}
                  className="flex-1 cursor-pointer"
                >
                  <div>
                    <CardTitle className="text-lg hover:text-blue-600 transition-colors">
                      {course.title}
                    </CardTitle>
                    <CardDescription className="mt-1">
                      by {course.teacher_name}
                    </CardDescription>
                  </div>
                </Link>
                <div className="flex space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      coursePageHandler(course.id);
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="cursor-pointer text-red-600 hover:text-red-700"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      // Add delete functionality here
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <Link
              href={`/admin/courses/${course.id}`}
              className="cursor-pointer"
            >
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  {course.description || 'No description available'}
                </p>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-4">
                    {course.image_url && (
                      <Badge variant="secondary">Has Image</Badge>
                    )}
                    {course.file_url && (
                      <Badge variant="outline">Has Files</Badge>
                    )}
                  </div>
                  <span className="text-gray-500">
                    {new Date(course.created_at).toLocaleDateString()}
                  </span>
                </div>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">
            No courses found matching your search.
          </p>
        </div>
      )}
    </div>
  );
}

'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ArrowLeft, FileX, Home } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CourseNotFound() {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <Card className="text-center">
          <CardHeader className="pb-4">
            <div className="flex justify-center mb-4">
              <FileX className="h-16 w-16 text-gray-400" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Course Not Found
            </CardTitle>
            <CardDescription className="text-lg">
              The course you're looking for doesn't exist or may have been
              removed.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">This could happen if:</p>
            <ul className="text-left text-gray-600 space-y-2 max-w-md mx-auto">
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                The course was deleted or is no longer available
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                You don't have permission to view this course
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                The course ID in the URL is incorrect
              </li>
            </ul>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-6">
              <Button
                onClick={handleGoBack}
                variant="outline"
                className="cursor-pointer"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Go Back
              </Button>

              <Link href="/admin/courses">
                <Button className="cursor-pointer w-full sm:w-auto">
                  <Home className="h-4 w-4 mr-2" />
                  All Courses
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

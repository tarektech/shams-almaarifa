'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ArrowLeft, Search, Home } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto">
        <Card className="text-center">
          <CardHeader className="pb-4">
            <div className="flex justify-center mb-4">
              <Search className="h-20 w-20 text-blue-500" />
            </div>
            <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
              404 - Page Not Found
            </CardTitle>
            <CardDescription className="text-xl">
              The page you're looking for doesn't exist.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-gray-600 text-lg">
              Don't worry, it happens to the best of us. Let's get you back on
              track.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto">
              <Link href="/">
                <Button variant="outline" className="cursor-pointer w-full">
                  <Home className="h-4 w-4 mr-2" />
                  Home Page
                </Button>
              </Link>

              <Button onClick={handleGoBack} className="cursor-pointer w-full">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Go Back
              </Button>
            </div>

            <div className="pt-4">
              <p className="text-sm text-gray-500">
                If you believe this is an error, please contact support.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

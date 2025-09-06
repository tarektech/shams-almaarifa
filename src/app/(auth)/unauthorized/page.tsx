import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import { ShieldX } from 'lucide-react';

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
            <ShieldX className="h-6 w-6 text-destructive" />
          </div>
          <CardTitle className="text-2xl">غير مصرح</CardTitle>
          <CardDescription>
            ليس لديك صلاحية للوصول إلى هذه الصفحة. يتطلب الوصول إلى منطقة
            الإدارة صلاحيات خاصة.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center text-sm text-muted-foreground">
            إذا كنت تعتقد أن هذا خطأ، يرجى التواصل مع المسؤول.
          </div>
          <div className="flex flex-col gap-2">
            <Button asChild className="w-full">
              <Link href="/">العودة للصفحة الرئيسية</Link>
            </Button>
            <Button variant="outline" asChild className="w-full cursor-pointer">
              <Link href="/login">تسجيل الدخول بحساب آخر</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

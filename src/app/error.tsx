'use client';

import Link from 'next/link';

export default function Error() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold"> Error 404</h1>
      <p className="text-2xl">لا يوجد صفحة</p>
      <Link href="/" className="text-blue-500">
        الرجوع للصفحة الرئيسية
      </Link>
    </div>
  );
}

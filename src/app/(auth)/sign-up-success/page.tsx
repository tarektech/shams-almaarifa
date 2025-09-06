'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function Page() {
  const router = useRouter()
  const [countdown, setCountdown] = useState(10)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          router.push('/admin')
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [router])

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">شكرا لك على التسجيل!</CardTitle>
              <CardDescription>يرجى التحقق من بريدك الإلكتروني لتأكيد حسابك</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                لقد تم تسجيلك بنجاح. يرجى التحقق من بريدك الإلكتروني لتأكيد حسابك
                قبل تسجيل الدخول.
              </p>
              <p className="text-sm text-muted-foreground mt-4">
                سيتم توجيهك إلى صفحة الإدارة خلال {countdown} ثانية...
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

import type { Metadata } from 'next';
import { Geist, Geist_Mono, Cairo, Amiri } from 'next/font/google';
import './globals.css';
import Header from '@/components/header';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const cairo = Cairo({
  variable: '--font-cairo',
  subsets: ['arabic', 'latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
});

const amiri = Amiri({
  variable: '--font-amiri',
  subsets: ['arabic', 'latin'],
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: 'شمس المعرفة - SHAMS ALMAARIFA',
  description:
    'نسعى لرفع سوية التعليم العلمية لتكون شمساً تشرق بالعلم والمعرفة، فتترك أثراً ونقشٍ بصمة.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${cairo.variable} ${amiri.variable} antialiased`}
      >
        <div className="text-sm">
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}

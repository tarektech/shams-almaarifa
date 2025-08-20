'use client';

import Image from 'next/image';
import { Button } from './ui/button';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Main Heading */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          شمس المعرفة تجمعنا
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-white/90 mb-4 leading-relaxed max-w-3xl mx-auto">
          نسعى لرفع سوية التعليم العلمية لتكون شمساً تشرق بالعلم والمعرفة،
        </p>

        <p className="text-lg md:text-xl text-white/80 mb-12 leading-relaxed max-w-2xl mx-auto">
          فتترك أثراً ونقشٍ بصمة.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-lg cursor-pointer min-w-[180px] motion-preset-slide-up motion-duration-700"
            style={{ animationDelay: '800ms' }}
          >
            الدورات
          </Button>

          <Button
            size="lg"
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-lg cursor-pointer min-w-[180px] motion-preset-slide-up motion-duration-700"
            style={{ animationDelay: '1000ms' }}
          >
            الاختبارات
          </Button>

          <Button
            size="lg"
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg font-semibold rounded-lg cursor-pointer min-w-[180px] motion-preset-slide-up motion-duration-700"
            style={{ animationDelay: '1200ms' }}
          >
            آخر الأخبار
          </Button>
        </div>

        {/* Logo Section */}
        <div className="flex justify-center items-center">
          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-2xl px-8 py-6 border border-white/20">
            <Image
              src="/images/logo.png"
              alt="شمس المعرفة"
              width={60}
              height={60}
              className="filter drop-shadow-lg animate-pulse"
            />
            <div className="text-center">
              <h2 className="text-2xl font-bold text-orange-400 mb-1">
                شمس المعرفة
              </h2>
              <p className="text-white/80 text-sm tracking-wide">
                SHAMS ALMAARIFA
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}

'use client';

import { useEffect, useRef, useState } from 'react';
import BackgroundHeroImage from './background-hero-image';
import Status from './status';

export default function WhoWeAreSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsVisible(true);
          setHasAnimated(true);
        }
      },
      {
        threshold: 0.2, // Trigger when 20% of the section is visible
        rootMargin: '0px 0px -100px 0px', // Start animation 100px before the section comes into view
      }
    );

    const currentSection = sectionRef.current;
    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, [hasAnimated]);

  return (
    <section ref={sectionRef} className="relative min-h-screen">
      {/* Fixed Background Image */}
      <div className="fixed inset-0 -z-10">
        <BackgroundHeroImage />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2
              className={`text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 ${
                isVisible
                  ? 'motion-preset-slide-up motion-duration-700'
                  : 'opacity-0 translate-y-8'
              }`}
            >
              من نحن
            </h2>
            <div
              className={`w-24 h-1 bg-orange-500 mx-auto mb-8 ${
                isVisible
                  ? 'motion-preset-slide-right motion-duration-1000 motion-delay-300'
                  : 'opacity-0 -translate-x-8'
              }`}
            ></div>
            <p
              className={`text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed ${
                isVisible
                  ? 'motion-preset-fade-in motion-duration-700 motion-delay-500'
                  : 'opacity-0'
              }`}
            >
              شمس المعرفة - منارة العلم والتعليم
            </p>
          </div>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Main Content */}
            <div className="space-y-8">
              <div
                className={`bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 ${
                  isVisible
                    ? 'motion-preset-slide-left motion-duration-700 motion-delay-700'
                    : 'opacity-0 translate-x-8'
                }`}
              >
                <h3
                  className={`text-2xl md:text-3xl font-bold text-orange-400 mb-6 ${
                    isVisible
                      ? 'motion-preset-fade-in motion-duration-500 motion-delay-900'
                      : 'opacity-0'
                  }`}
                >
                  رؤيتنا
                </h3>
                <p
                  className={`text-white/90 text-lg leading-relaxed mb-6 ${
                    isVisible
                      ? 'motion-preset-fade-in motion-duration-500 motion-delay-1100'
                      : 'opacity-0'
                  }`}
                >
                  نسعى لتكوين جيل متعلم ومثقف، قادر على مواجهة تحديات المستقبل
                  بالعلم والمعرفة. نؤمن بأن التعليم هو السبيل الوحيد لبناء مجتمع
                  متطور ومزدهر.
                </p>
                <p
                  className={`text-white/80 text-base leading-relaxed ${
                    isVisible
                      ? 'motion-preset-fade-in motion-duration-500 motion-delay-1300'
                      : 'opacity-0'
                  }`}
                >
                  من خلال برامجنا التعليمية المتنوعة، نهدف إلى غرس حب العلم في
                  نفوس الطلاب وتطوير قدراتهم الفكرية والإبداعية.
                </p>
              </div>

              <div
                className={`bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 ${
                  isVisible
                    ? 'motion-preset-slide-left motion-duration-700 motion-delay-1000'
                    : 'opacity-0 translate-x-8'
                }`}
              >
                <h3
                  className={`text-2xl md:text-3xl font-bold text-blue-400 mb-6 ${
                    isVisible
                      ? 'motion-preset-fade-in motion-duration-500 motion-delay-1200'
                      : 'opacity-0'
                  }`}
                >
                  رسالتنا
                </h3>
                <p
                  className={`text-white/90 text-lg leading-relaxed ${
                    isVisible
                      ? 'motion-preset-fade-in motion-duration-500 motion-delay-1400'
                      : 'opacity-0'
                  }`}
                >
                  تقديم تعليم عالي الجودة يلبي احتياجات الطلاب المختلفة، وإعداد
                  كوادر مؤهلة قادرة على المساهمة في التقدم العلمي والتكنولوجي
                  للمجتمع.
                </p>
              </div>
            </div>

            {/* Right Column - Stats & Features */}
            <div className="space-y-8">
              {/* Statistics */}
              <Status isVisible={isVisible} />

              {/* Core Values */}
              <div
                className={`bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 ${
                  isVisible
                    ? 'motion-preset-slide-right motion-duration-700 motion-delay-1200'
                    : 'opacity-0 -translate-x-8'
                }`}
              >
                <h3
                  className={`text-2xl md:text-3xl font-bold text-purple-400 mb-6 ${
                    isVisible
                      ? 'motion-preset-fade-in motion-duration-500 motion-delay-1400'
                      : 'opacity-0'
                  }`}
                >
                  قيمنا الأساسية
                </h3>
                <ul className="space-y-4">
                  <li
                    className={`flex items-center gap-3 text-white/90 ${
                      isVisible
                        ? 'motion-preset-slide-left motion-duration-500 motion-delay-1500'
                        : 'opacity-0 translate-x-8'
                    }`}
                  >
                    <div
                      className={`w-2 h-2 bg-orange-400 rounded-full ${
                        isVisible
                          ? 'motion-preset-bounce motion-duration-1000 motion-delay-1600'
                          : 'opacity-0'
                      }`}
                    ></div>
                    <span>التميز في التعليم والتدريب</span>
                  </li>
                  <li
                    className={`flex items-center gap-3 text-white/90 ${
                      isVisible
                        ? 'motion-preset-slide-left motion-duration-500 motion-delay-1600'
                        : 'opacity-0 translate-x-8'
                    }`}
                  >
                    <div
                      className={`w-2 h-2 bg-blue-400 rounded-full ${
                        isVisible
                          ? 'motion-preset-bounce motion-duration-1000 motion-delay-1700'
                          : 'opacity-0'
                      }`}
                    ></div>
                    <span>الابتكار في الأساليب التعليمية</span>
                  </li>
                  <li
                    className={`flex items-center gap-3 text-white/90 ${
                      isVisible
                        ? 'motion-preset-slide-left motion-duration-500 motion-delay-1700'
                        : 'opacity-0 translate-x-8'
                    }`}
                  >
                    <div
                      className={`w-2 h-2 bg-green-400 rounded-full ${
                        isVisible
                          ? 'motion-preset-bounce motion-duration-1000 motion-delay-1800'
                          : 'opacity-0'
                      }`}
                    ></div>
                    <span>الاهتمام بالجودة والنوعية</span>
                  </li>
                  <li
                    className={`flex items-center gap-3 text-white/90 ${
                      isVisible
                        ? 'motion-preset-slide-left motion-duration-500 motion-delay-1800'
                        : 'opacity-0 translate-x-8'
                    }`}
                  >
                    <div
                      className={`w-2 h-2 bg-purple-400 rounded-full ${
                        isVisible
                          ? 'motion-preset-bounce motion-duration-1000 motion-delay-1900'
                          : 'opacity-0'
                      }`}
                    ></div>
                    <span>بناء شراكات تعليمية قوية</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Call to Action */}
          <div className="text-center mt-16">
            <div
              className={`bg-gradient-to-r from-orange-500/20 to-blue-500/20 backdrop-blur-md rounded-2xl p-8 border border-white/20 ${
                isVisible
                  ? 'motion-preset-slide-up motion-duration-700 motion-delay-2000'
                  : 'opacity-0 translate-y-8'
              }`}
            >
              <h3
                className={`text-2xl md:text-3xl font-bold text-white mb-4 ${
                  isVisible
                    ? 'motion-preset-fade-in motion-duration-500 motion-delay-2200'
                    : 'opacity-0'
                }`}
              >
                انضم إلى رحلة التعلم معنا
              </h3>
              <p
                className={`text-white/80 text-lg mb-6 max-w-2xl mx-auto ${
                  isVisible
                    ? 'motion-preset-fade-in motion-duration-500 motion-delay-2400'
                    : 'opacity-0'
                }`}
              >
                اكتشف إمكانياتك وطور مهاراتك من خلال برامجنا التعليمية المتميزة
              </p>
              <button
                className={`bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                  isVisible
                    ? 'motion-preset-bounce motion-duration-1000 motion-delay-2600'
                    : 'opacity-0'
                }`}
              >
                ابدأ رحلتك التعليمية
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

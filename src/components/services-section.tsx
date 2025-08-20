'use client';

import Image from 'next/image';
import { Button } from './ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import { servicesData } from '@/lib/data';

export default function ServicesSection() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center py-8 mb-4 ">
          <div className="flex justify-evenly items-center gap-4 mb-6 ">
            <Image
              src="/images/services/services-logo.png"
              alt="خدماتنا"
              width={130}
              height={130}
              className="filter drop-shadow-lg motion-preset-bounce motion-duration-1000"
              loading="lazy"
            />
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
                خدماتنا
              </h2>
              <p className="text-lg text-gray-600">
                نقدم مجموعة متنوعة من الخدمات التعليمية المتميزة
              </p>
            </div>
          </div>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {servicesData.map((service) => (
            <Card
              key={service.id}
              className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white motion-preset-slide-up motion-duration-700"
              style={{ animationDelay: service.animationDelay }}
            >
              <CardHeader className="text-center p-8">
                <div className={`w-16 h-16 ${service.iconBgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  {service.icon}
                </div>
                <CardTitle className="text-2xl font-bold text-gray-800 mb-2">
                  {service.title}
                </CardTitle>
                <CardDescription className="text-gray-600 leading-relaxed">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8 pt-0">
                <ul className="space-y-2 mb-6 text-gray-600">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className={`w-2 h-2 ${service.bulletColor} rounded-full`}></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button className={`w-full ${service.buttonColor} text-white cursor-pointer`}>
                  عرض الدورات
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action Section with service-image.jpg */}
        <div className="relative overflow-hidden rounded-2xl">
          <div className="absolute inset-0">
            <Image
              src="/images/services/service-image.jpg"
              alt="انضم إلينا"
              fill
              className="object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/50"></div>
          </div>
          <div className="relative z-10 text-center py-20 px-8">
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
              حمل التطبيق الآن
            </h3>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
              حمل تطبيق مركز شمس المعرفة للأندرويد من خلال الضغط على الرابط
              التالي
            </p>
            <Button
              size="lg"
              className="bg-yellow-500 hover:bg-yellow-600 text-black px-12 py-4 text-lg font-bold rounded-full cursor-pointer"
            >
              تحميل
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

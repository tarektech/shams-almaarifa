// Services data array
export const servicesData = [
    {
      id: 1,
      title: 'دورات تدريبية',
      description: 'نقدم دورات متنوعة في مختلف المجالات العلمية والتقنية لتطوير مهاراتك وقدراتك',
      icon: (
        <svg
          className="w-8 h-8 text-blue-600 motion-preset-bounce motion-duration-1000"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      ),
      iconBgColor: 'bg-blue-100',
      iconColor: 'text-blue-600',
      bulletColor: 'bg-blue-600',
      buttonColor: 'bg-blue-600 hover:bg-blue-700',
      features: [
        'دورات في البرمجة والتكنولوجيا',
        'تطوير المهارات الشخصية',
        'شهادات معتمدة'
      ],
      animationDelay: '100ms'
    },
    {
      id: 2,
      title: 'دورات تعليمية',
      description: 'دورات أكاديمية شاملة في المناهج الدراسية مع أساتذة متخصصين',
      icon: (
        <svg
          className="w-8 h-8 text-purple-600 motion-preset-bounce motion-duration-1000"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      ),
      iconBgColor: 'bg-purple-100',
      iconColor: 'text-purple-600',
      bulletColor: 'bg-purple-600',
      buttonColor: 'bg-purple-600 hover:bg-purple-700',
      features: [
        'مناهج تعليمية متكاملة',
        'أساتذة متخصصين',
        'تقييم مستمر للطلاب'
      ],
      animationDelay: '200ms'
    },
    {
      id: 3,
      title: 'دورات الأطفال واليافعين',
      description: 'برامج تعليمية مخصصة للأطفال واليافعين لتنمية قدراتهم ومواهبهم',
      icon: (
        <svg
          className="w-8 h-8 text-orange-600 motion-preset-wobble motion-duration-1000"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
      iconBgColor: 'bg-orange-100',
      iconColor: 'text-orange-600',
      bulletColor: 'bg-orange-600',
      buttonColor: 'bg-orange-600 hover:bg-orange-700',
      features: [
        'أنشطة تفاعلية وترفيهية',
        'تنمية المهارات الإبداعية',
        'بيئة تعليمية آمنة'
      ],
      animationDelay: '400ms'
    }
  ];
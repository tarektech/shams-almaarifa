type Stats = {
  title: string;
  description: string;
  containerStyle: string;
  titleStyle: string;
  descriptionStyle: string;
  color: string;
  numericValue: number;
  suffix: string;
};

export const stats = (isVisible: boolean): Stats[] => {
  return [
    {
      title: '2004',
      description: 'سنة التأسيس',
      color: 'orange',
      numericValue: 2004,
      suffix: '',
      containerStyle: `text-center bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:motion-preset-bounce hover:motion-duration-500 cursor-pointer ${
        isVisible
          ? 'motion-preset-slide-right motion-duration-700 motion-delay-800'
          : 'opacity-0 -translate-x-8'
      }`,
      titleStyle: `text-3xl md:text-4xl font-bold text-orange-400 mb-2 ${
        isVisible
          ? 'motion-preset-fade-in motion-duration-500 motion-delay-1000'
          : 'opacity-0'
      }`,
      descriptionStyle: `text-white/80 text-sm ${
        isVisible
          ? 'motion-preset-fade-in motion-duration-500 motion-delay-1200'
          : 'opacity-0'
      }`,
    },
    {
      title: '500+',
      description: 'طالب وطالبة',
      color: 'blue',
      numericValue: 500,
      suffix: '+',
      containerStyle: `text-center bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:motion-preset-bounce hover:motion-duration-500 cursor-pointer ${
        isVisible
          ? 'motion-preset-slide-right motion-duration-700 motion-delay-900'
          : 'opacity-0 -translate-x-8'
      }`,
      titleStyle: `text-3xl md:text-4xl font-bold text-blue-400 mb-2 ${
        isVisible
          ? 'motion-preset-fade-in motion-duration-500 motion-delay-1100'
          : 'opacity-0'
      }`,
      descriptionStyle: `text-white/80 text-sm ${
        isVisible
          ? 'motion-preset-fade-in motion-duration-500 motion-delay-1300'
          : 'opacity-0'
      }`,
    },
    {
      title: '50+',
      description: 'مدرب ومدربة',
      color: 'green',
      numericValue: 50,
      suffix: '+',
      containerStyle: `text-center bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:motion-preset-bounce hover:motion-duration-500 cursor-pointer ${
        isVisible
          ? 'motion-preset-slide-right motion-duration-700 motion-delay-1000'
          : 'opacity-0 -translate-x-8'
      }`,
      titleStyle: `text-3xl md:text-4xl font-bold text-green-400 mb-2 ${
        isVisible
          ? 'motion-preset-fade-in motion-duration-500 motion-delay-1200'
          : 'opacity-0'
      }`,
      descriptionStyle: `text-white/80 text-sm ${
        isVisible
          ? 'motion-preset-fade-in motion-duration-500 motion-delay-1400'
          : 'opacity-0'
      }`,
    },
    {
      title: '100+',
      description: 'دورة تدريبية',
      color: 'purple',
      numericValue: 100,
      suffix: '+',
      containerStyle: `text-center bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:motion-preset-bounce hover:motion-duration-500 cursor-pointer ${
        isVisible
          ? 'motion-preset-slide-right motion-duration-700 motion-delay-1100'
          : 'opacity-0 -translate-x-8'
      }`,
      titleStyle: `text-3xl md:text-4xl font-bold text-purple-400 mb-2 ${
        isVisible
          ? 'motion-preset-fade-in motion-duration-500 motion-delay-1300'
          : 'opacity-0'
      }`,
      descriptionStyle: `text-white/80 text-sm ${
        isVisible
          ? 'motion-preset-fade-in motion-duration-500 motion-delay-1500'
          : 'opacity-0'
      }`,
    },
  ];
};

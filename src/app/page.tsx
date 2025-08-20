import BackgroundHeroImage from '@/components/background-hero-image';
import CommonQuestions from '@/components/common-questions';
import Footer from '@/components/footer';
import HeroSection from '@/components/hero-section';
import ServicesSection from '@/components/services-section';
import WhoWeAreSection from '@/components/who-we-are-section';
import { Metadata } from 'next';


export const metadata: Metadata = {
  title: {
    template: '%s | SHAMS ALMAARIFA',
    default: 'SHAMS ALMAARIFA',
  },
  description:
    'We strive to raise the educational scientific tide to become a sun that shines with knowledge and wisdom, leaving a mark and a trace.',
  icons: {
    icon: '/favicon.ico',
    apple: '/logo.png',
  },
};

export default function Home() {
  return (
    <main>
      <BackgroundHeroImage />
      <HeroSection />
      <ServicesSection />
      <WhoWeAreSection />
      <CommonQuestions />
      <Footer />
    </main>
  );
}

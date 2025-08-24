'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Menu, X } from 'lucide-react';

const links = [
  {
    id: 1,
    title: 'الرئيسية',
    href: '/',
  },
  {
    id: 2,
    title: 'الدورات',
    href: '/courses',
  },
  {
    id: 3,
    title: 'الاختبارات',
    href: '/tests',
  },
  {
    id: 4,
    title: 'معرض الصور',
    href: '/gallery',
  },
  {
    id: 5,
    title: 'تواصل معنا',
    href: '/contact',
  },
  {
    id: 6,
    title: 'لوحة التحكم',
    href: '/dashboard',
  },
];

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!hasMounted) return;

    let timeoutId: NodeJS.Timeout;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Clear previous timeout
      clearTimeout(timeoutId);

      // Delay the background change by 150ms
      timeoutId = setTimeout(() => {
        setIsScrolled(currentScrollY > 600);
      }, 0);
    };

    // Set initial scroll state
    handleScroll();

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, [hasMounted]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Prevent hydration mismatch by not applying scroll-based styles until mounted
  const headerClassName = `fixed top-0 left-0 right-0 z-50 max-w-6xl mx-auto transition-all duration-500 ease-out rounded-b-lg ${
    hasMounted && isScrolled
      ? 'backdrop-blur-md bg-black/80 border-b border-white/20 shadow-lg'
      : 'bg-transparent border-b border-white/10'
  }`;

  return (
    <header className={headerClassName}>
      <div className="px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 sm:gap-3 cursor-pointer flex-shrink-0 transition-transform duration-300 hover:scale-105"
          >
            <div className="flex flex-col select-none">
              <span className="text-sm sm:text-lg font-bold text-amber-400 transition-colors duration-300">
                شمس المعرفة
              </span>
              <span className="text-xs text-amber-400/80 hidden sm:block transition-colors duration-300">
                SHAMS ALMAARIFA
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-6">
            {links.map((link, index) => (
              <Link
                key={link.id}
                href={link.href}
                className={`cursor-pointer transition-all duration-300 hover:scale-105 font-medium text-sm relative group ${
                  pathname === link.href
                    ? 'text-amber-400 drop-shadow-md'
                    : 'text-white/80 hover:text-white'
                }`}
                style={{
                  animationDelay: `${index * 100}ms`,
                  animationFillMode: 'both',
                }}
              >
                {link.title}
                <span
                  className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-400 transition-all duration-300 group-hover:w-full ${
                    pathname === link.href ? 'w-full' : ''
                  }`}
                />
              </Link>
            ))}
          </nav>

          {/* Desktop Register Button */}
          <div className="hidden lg:flex items-center gap-4">
            <Button className="bg-amber-500 hover:bg-amber-600 text-white px-3 sm:px-4 py-2 rounded-lg cursor-pointer text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-amber-500/25">
              تسجيل دخول
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            onClick={toggleMobileMenu}
            className="lg:hidden bg-transparent hover:bg-white/10 text-white p-2 cursor-pointer transition-all duration-300 hover:scale-110"
            aria-label="Toggle mobile menu"
          >
            <div className="relative w-6 h-6">
              <Menu
                className={`absolute inset-0 h-6 w-6 transition-all duration-300 ease-in-out ${
                  isMobileMenuOpen
                    ? 'opacity-0 rotate-90 scale-75'
                    : 'opacity-100 rotate-0 scale-100'
                }`}
              />
              <X
                className={`absolute inset-0 h-6 w-6 transition-all duration-300 ease-in-out ${
                  isMobileMenuOpen
                    ? 'opacity-100 rotate-0 scale-100'
                    : 'opacity-0 -rotate-90 scale-75'
                }`}
              />
            </div>
          </Button>
        </div>

        {/* Mobile Navigation */}
        {hasMounted && isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pt-4 border-t border-white/10 bg-black/95 backdrop-blur-md rounded-lg shadow-xl">
            <nav className="flex flex-col space-y-3 px-4 pb-4">
              {links.map((link, index) => (
                <Link
                  key={link.id}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`cursor-pointer transition-all duration-300 font-medium text-base py-3 px-4 rounded-lg ${
                    pathname === link.href
                      ? 'text-amber-400 bg-amber-500/20 border border-amber-500/30'
                      : 'text-white hover:text-amber-400 hover:bg-white/10'
                  }`}
                  style={{
                    animationDelay: `${index * 50}ms`,
                    animationFillMode: 'both',
                  }}
                >
                  {link.title}
                </Link>
              ))}

              {/* Mobile Register Button */}
              <Button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                }}
                className="bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-lg cursor-pointer mt-4 w-full transition-all duration-300 hover:scale-105 shadow-lg"
                style={{
                  animationDelay: `${links.length * 50}ms`,
                  animationFillMode: 'both',
                }}
              >
                تسجيل دخول
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

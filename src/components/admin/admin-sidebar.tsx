'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import {
  BookOpen,
  Users,
  FileText,
  ClipboardCheck,
  LayoutDashboard,
  GraduationCap,
  User,
} from 'lucide-react';
import { LogoutButton } from '@/components/supabase-components/logout-button';
import { createClient } from '@/lib/client';

const sidebarItems = [
  {
    title: 'Dashboard',
    href: '/admin',
    icon: LayoutDashboard,
  },
  {
    title: 'Courses',
    href: '/admin/courses',
    icon: BookOpen,
  },
  {
    title: 'Lessons',
    href: '/admin/lessons',
    icon: FileText,
  },
  {
    title: 'Exams',
    href: '/admin/exams',
    icon: ClipboardCheck,
  },
  {
    title: 'Students',
    href: '/admin/students',
    icon: Users,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [adminName, setAdminName] = useState<string>('Admin');

  useEffect(() => {
    const getAdminProfile = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('full_name, email')
          .eq('id', user.id)
          .single();

        if (profile?.full_name) {
          setAdminName(profile.full_name);
        } else if (user.email) {
          setAdminName(user.email.split('@')[0]);
        }
      }
    };

    getAdminProfile();
  }, []);

  return (
    <div className="w-64 bg-white shadow-lg border-r">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <GraduationCap className="h-8 w-8 text-blue-600" />
          <h2 className="text-xl font-bold text-gray-900">Education Admin</h2>
        </div>
        <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
          <User className="h-5 w-5 text-gray-600" />
          <div>
            <p className="text-sm font-medium text-gray-900">{adminName}</p>
            <p className="text-xs text-gray-500">Administrator</p>
          </div>
        </div>
      </div>

      <nav className="px-4 pb-4">
        <ul className="space-y-2">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer',
                    isActive
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="absolute bottom-4 left-4 right-4">
        <LogoutButton />
      </div>
    </div>
  );
}

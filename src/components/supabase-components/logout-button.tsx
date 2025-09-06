'use client';

import { createClient } from '@/lib/client';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export function LogoutButton() {
  const router = useRouter();

  const logout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/');
  };

  return (
    <Button onClick={logout} className="cursor-pointer">
      Logout
    </Button>
  );
}

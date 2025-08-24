

import { LogoutButton } from '@/components/supabase-components/logout-button';
import { createClient } from '@/lib/server';

export default async function ProtectedPage() {
  const supabase = await createClient();

  const { data } = await supabase.auth.getClaims();
  // if (error || !data?.claims) {
  //   redirect('/auth/login');
  // }


  return (
    <div className="flex h-svh w-full items-center justify-center gap-2">
      <p>
        Hello <span>{data?.claims?.email}</span>
      </p>
      <LogoutButton />
    </div>
  );
}

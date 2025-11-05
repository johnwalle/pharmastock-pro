'use client';

import { usePathname } from 'next/navigation';
import Navbar from './navbar';
import useAuthManager from '@/hooks/useAuthManager'; // Adjust path if needed

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  useAuthManager(); // <-- Manage auth tokens & idle logout globally here

  const pathname = usePathname();
  const isDashboard = pathname?.startsWith('/dashboard');

  return (
    <div className={isDashboard ? 'flex' : ''}>
      {!isDashboard && <Navbar />}
      <main className="flex-1">{children}</main>
    </div>
  );
}

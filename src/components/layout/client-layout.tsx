'use client';

import { usePathname } from 'next/navigation';
import Navbar from './navbar';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith('/dashboard');

  return (
    <div className={isDashboard ? 'flex' : ''}>
      {!isDashboard && <Navbar />}
      <main className="flex-1">{children}</main>
    </div>
  );
}

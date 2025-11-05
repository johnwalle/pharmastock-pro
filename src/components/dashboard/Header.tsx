'use client';

import { User } from 'lucide-react';
import authStore from '@/store/authStore';

export default function Header() {
  const userData = authStore((state) => state.userData);
  const userName = userData ? userData.user.fullName : 'Admin';
  const userEmail = userData ? userData.user.email : 'admin@pharmacy.com';

  return (
    <header className="flex items-center justify-between px-4 py-3 md:px-8 border-b border-gray-200 bg-white shadow-sm">
      {/* Left - Title */}
      <div className="flex items-center gap-2">
        <h1 className="text-sm md:text-lg font-semibold text-gray-800">
          Yenewub Pharmacy Dashboard
        </h1>
      </div>

      {/* Right - Profile */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3 p-1 rounded-lg hover:bg-gray-100 transition cursor-pointer">
          <div className="bg-gray-100 rounded-full p-2">
            <User className="h-5 w-5 text-gray-600" />
          </div>
          <div className="hidden sm:flex flex-col text-right">
            <span className="text-sm font-medium text-gray-800">{userName}</span>
            <span className="text-xs text-gray-500">{userEmail}</span>
          </div>
        </div>
      </div>
    </header>
  );
}

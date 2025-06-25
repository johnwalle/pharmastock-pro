'use client';

import { Menu, User } from 'lucide-react';

export default function Header() {
  return (
    <header className="flex items-center justify-between px-4 py-4 md:px-8 border-b border-gray-200 bg-white shadow-sm">
      {/* Left - Logo or Title */}
      <div className="flex items-center gap-2">
        {/* <Menu className="h-5 w-5 text-gray-500 md:hidden" /> */}
        <h1 className="text-sm lg:text-lg font-semibold text-gray-800  md:block">
          Pharmacy Admin Dashboard
        </h1>
      </div>

      {/* Right - Profile */}
      <div className="flex items-center gap-4">
        <div className="text-right hidden sm:block">
          <p className="text-sm font-medium text-gray-700">Admin</p>
          <p className="text-xs text-gray-500">admin@pharmacy.com</p>
        </div>
        <div className="relative">
          <img
            src="https://i.pravatar.cc/300?img=11"
            alt="Admin Profile"
            className="h-10 w-10 rounded-full border border-gray-300 object-cover"
          />
        </div>
      </div>
    </header>
  );
}

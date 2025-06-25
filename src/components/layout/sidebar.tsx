"use client";

import React, { useState } from 'react';
import {
  Home,
  Pill,
  Package,
  Search,
  FileText,
  ImageIcon,
  BarChart2,
  Users,
  Truck,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface SidebarProps {
  userRole: 'admin' | 'pharmacist' | 'manager';
  onSelectComponent: (component: string) => void;
  activeComponent: string;
}

const Sidebar: React.FC<SidebarProps> = ({ userRole, onSelectComponent, activeComponent }) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  const menuItems = [
    { name: 'Dashboard', component: 'Dashboard', icon: Home, visible: true },
    {
      name: 'Medication Management',
      component: 'MedicineManagement',
      icon: Pill,
      visible: ['admin', 'pharmacist'].includes(userRole),
    },
    {
      name: 'Stock Monitoring',
      component: 'StockMonitoring',
      icon: Package,
      visible: true,
    },
    {
      name: 'Search & Filter',
      component: 'SearchFilter',
      icon: Search,
      visible: true,
    },
    {
      name: 'Reports',
      component: 'Reports',
      icon: BarChart2,
      visible: true,
    },
    {
      name: 'Image Gallery',
      component: 'ImageGallery',
      icon: ImageIcon,
      visible: true,
    },
    {
      name: 'Audit Log',
      component: 'AuditLog',
      icon: FileText,
      visible: userRole === 'admin',
    },
    {
      name: 'User Management',
      component: 'UserManagement',
      icon: Users,
      visible: userRole === 'admin',
    },
    {
      name: 'Suppliers',
      component: 'Suppliers',
      icon: Truck,
      visible: ['admin', 'pharmacist'].includes(userRole),
    },
    {
      name: 'Settings',
      component: 'Settings',
      icon: Settings,
      visible: userRole === 'admin',
    },
  ];

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  return (
    <aside
      className={`bg-white shadow-lg h-screen sticky top-0 transition-all duration-300 ease-in-out ${
        isCollapsed ? 'w-16' : 'w-64'
      } flex flex-col z-50`}
    >
      {/* Logo Section */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <img src="/logo.png" alt="Pharmacy Logo" className="h-8 w-8" />
            <span className="text-xl font-bold text-blue-900">PharmaStock</span>
          </div>
        )}
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
          aria-label={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {isCollapsed ? (
            <ChevronRight className="h-6 w-6 text-blue-900" />
          ) : (
            <ChevronLeft className="h-6 w-6 text-blue-900" />
          )}
        </button>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-1 p-2">
          {menuItems
            .filter((item) => item.visible)
            .map((item) => (
              <li key={item.name}>
                <button
                  onClick={() => onSelectComponent(item.component)}
                  className={`flex items-center p-3 rounded-lg w-full text-left ${
                    activeComponent === item.component
                      ? 'bg-green-50 text-green-600'
                      : 'text-gray-700 hover:bg-green-50 hover:text-green-600'
                  } transition-colors duration-200 ${
                    isCollapsed ? 'justify-center' : 'space-x-3'
                  }`}
                  aria-label={item.name}
                >
                  <item.icon className={`h-6 w-6 ${isCollapsed ? 'mx-auto' : ''}`} />
                  {!isCollapsed && (
                    <span className="text-sm font-medium">{item.name}</span>
                  )}
                </button>
              </li>
            ))}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="p-2 border-t border-gray-200">
        <button
          onClick={() => onSelectComponent('Logout')}
          className={`flex items-center p-3 rounded-lg w-full text-left text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-200 ${
            isCollapsed ? 'justify-center' : 'space-x-3'
          }`}
          aria-label="Logout"
        >
          <LogOut className={`h-6 w-6 ${isCollapsed ? 'mx-auto' : ''}`} />
          {!isCollapsed && <span className="text-sm font-medium">Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
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
      className={`bg-blue-900 text-white h-screen sticky top-0 transition-all duration-300 ease-in-out ${isCollapsed ? 'w-16' : 'w-64'
        } flex flex-col z-50 shadow-xl font-sans`}
    >
      {/* Logo Section */}
      <div className="flex items-center justify-between p-4 border-b border-blue-700">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <img src="/logo.png" alt="Pharmacy Logo" className="h-8 w-8" />
            <span className="text-lg font-semibold tracking-wide">PharmaStock</span>
          </div>
        )}
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-full hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-white"
          aria-label={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {isCollapsed ? (
            <ChevronRight className="h-5 w-5 text-white" />
          ) : (
            <ChevronLeft className="h-5 w-5 text-white" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-1 p-2">
          {menuItems
            .filter((item) => item.visible)
            .map((item) => (
              <li key={item.name}>
                <button
                  onClick={() => onSelectComponent(item.component)}
                  className={`flex items-center p-3 rounded-lg w-full text-left ${activeComponent === item.component
                      ? 'bg-white/10 text-white font-medium'
                      : 'text-white/80 hover:bg-white/10 hover:text-white'
                    } transition-all duration-200 ${isCollapsed ? 'justify-center' : 'space-x-3'
                    }`}
                  aria-label={item.name}
                >
                  <item.icon className={`h-5 w-5 ${isCollapsed ? 'mx-auto' : ''}`} />
                  {!isCollapsed && (
                    <span className="text-sm tracking-wide">{item.name}</span>
                  )}
                </button>
              </li>
            ))}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-2 border-t border-blue-700">
        <button
          onClick={() => onSelectComponent('Logout')}
          className={`flex items-center p-3 rounded-lg w-full text-left text-white/80 hover:bg-red-500 hover:text-white transition-colors duration-200 ${isCollapsed ? 'justify-center' : 'space-x-3'
            }`}
          aria-label="Logout"
        >
          <LogOut className={`h-5 w-5 ${isCollapsed ? 'mx-auto' : ''}`} />
          {!isCollapsed && <span className="text-sm tracking-wide">Logout</span>}
        </button>
      </div>
    </aside>

  );
};

export default Sidebar;
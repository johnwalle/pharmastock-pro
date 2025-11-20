"use client";

import React, { useState } from "react";
import authStore from "@/store/authStore";
import { useRouter } from "next/navigation"; 
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
} from "lucide-react";

interface SidebarProps {
  userRole: "admin" | "pharmacist" | "manager";
  onSelectComponent: (component: string) => void;
  activeComponent: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  userRole,
  onSelectComponent,
  activeComponent,
}) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const clearUserData = authStore((state) => state.clearUserData);
  const router = useRouter();

  const logoutHandler = () => {
    clearUserData();
    router.push("/auth/signup");
  };

  const menuItems = [
    { name: "Dashboard", component: "Dashboard", icon: Home, visible: true },

    {
      name: "Medication Management",
      component: "MedicineManagement",
      icon: Pill,
      visible: ["admin", "pharmacist"].includes(userRole),
    },

    // ⭐ NEW MENU ITEM — SELL STATION
    {
      name: "Sell Station",
      component: "SellStation",
      icon: Package,
      visible: ["admin", "pharmacist"].includes(userRole),
    },

    {
      name: "Search & Filter",
      component: "SearchFilter",
      icon: Search,
      visible: true,
    },
    {
      name: "Reports",
      component: "Reports",
      icon: BarChart2,
      visible: true,
    },
    {
      name: "Image Gallery",
      component: "ImageGallery",
      icon: ImageIcon,
      visible: true,
    },
    {
      name: "Audit Log",
      component: "AuditLog",
      icon: FileText,
      visible: userRole === "admin",
    },
    {
      name: "User Management",
      component: "UserManagement",
      icon: Users,
      visible: userRole === "admin",
    },
    {
      name: "Suppliers",
      component: "Suppliers",
      icon: Truck,
      visible: ["admin", "pharmacist"].includes(userRole),
    },
    {
      name: "Settings",
      component: "Settings",
      icon: Settings,
      visible: userRole === "admin",
    },
  ];

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  return (
    <aside
      className={`bg-blue-900 text-white h-screen sticky top-0 transition-all duration-300 ease-in-out ${
        isCollapsed ? "w-16" : "w-64"
      } flex flex-col z-50 shadow-xl font-sans`}
    >
      {/* Logo Section */}
      <div className="flex items-center justify-between p-4 border-b border-blue-700">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <span className="p-1 rounded bg-[#0052CC] text-white font-semibold">
              🏥
            </span>
            <span className="text-lg font-semibold tracking-wide text-gray-300">
              Yenewub
            </span>
          </div>
        )}
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-full hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-white"
          aria-label={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {isCollapsed ? (
            <ChevronRight className="h-5 w-5 cursor-pointer text-white" />
          ) : (
            <ChevronLeft className="h-5 w-5 cursor-pointer text-white" />
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
                  className={`flex items-center p-3 rounded-lg w-full text-left ${
                    activeComponent === item.component
                      ? "bg-white/10 text-white font-medium"
                      : "text-white/80 hover:bg-white/10 hover:text-white"
                  } transition-all duration-200 ${
                    isCollapsed ? "justify-center" : "space-x-3"
                  }`}
                  aria-label={item.name}
                >
                  <item.icon
                    className={`h-5 w-5 ${isCollapsed ? "mx-auto" : ""}`}
                  />
                  {!isCollapsed && (
                    <span className="text-sm tracking-wide">{item.name}</span>
                  )}
                </button>
              </li>
            ))}
        </ul>
      </nav>

      {/* Logout */}
      <div className="px-4 pt-2 border-t border-blue-800/50">
        <button
          onClick={logoutHandler}
          className={`group cursor-pointer flex items-center w-full gap-3 rounded-xl px-4 py-3 transition duration-200 
          bg-transparent text-white/80 hover:bg-red-600 hover:text-white
          ${isCollapsed ? "justify-center px-3" : ""}`}
          aria-label="Logout"
        >
          <LogOut
            className={`h-5 w-5 transition-transform duration-200 group-hover:scale-110 ${
              isCollapsed ? "mx-auto" : ""
            }`}
          />
          {!isCollapsed && (
            <span className="text-sm font-medium tracking-wide">Logout</span>
          )}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

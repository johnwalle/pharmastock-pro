"use client";

import React, { useState, useEffect, ComponentType } from "react";
import Sidebar from "@/components/layout/sidebar";
import Dashboard from "@/components/dashboard/dashboard";
import SearchFilter from "@/components/searchAndFilter/searchAndFilter";
import MedicineManagement from "@/components/medicines/medicineManagemenet";
import Reports from "@/components/report/report";
import ImageGallery from "@/components/gallery/gallery";
import AuditLog from "@/components/auditLog/auditLog";
import UserManagement from "@/components/user-management/userManagement";
import SellStation from "@/components/SellStation/sellManagement"; 
import NotificationCenter from "@/components/notifications/notificationCenter";

// Placeholder components
const Suppliers: ComponentType = () => (
  <div className="p-4 sm:p-6">
    <h1 className="text-xl sm:text-2xl font-bold">Suppliers</h1>
    <p>Manage supplier details.</p>
  </div>
);
const Settings: ComponentType = () => (
  <div className="p-4 sm:p-6">
    <h1 className="text-xl sm:text-2xl font-bold">Settings</h1>
    <p>Configure system settings.</p>
  </div>
);
const Logout: ComponentType = () => (
  <div className="p-4 sm:p-6">
    <h1 className="text-xl sm:text-2xl font-bold">Logged Out</h1>
    <p>You have been logged out.</p>
  </div>
);

// Map all components
const componentMap: Record<string, ComponentType<any>> = {
  Dashboard,
  MedicineManagement,
  SearchFilter,
  Reports,
  ImageGallery,
  AuditLog,
  NotificationCenter,
  UserManagement,
  Suppliers,
  Settings,
  Logout,
  SellStation, // Added Sell Station
};

const MainLayout: React.FC = () => {
  const [selectedComponent, setSelectedComponent] = useState("Dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSelectComponent = (component: string) => {
    setSelectedComponent(component);
    // Close sidebar on mobile/tablet after selecting a component
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const ActiveComponent = componentMap[selectedComponent] || Dashboard;

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:static lg:translate-x-0`}
      >
        <Sidebar
          userRole="admin" // Example role
          onSelectComponent={handleSelectComponent}
          activeComponent={selectedComponent}
        />
      </div>

      {/* Mobile/Tablet Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col w-full">
        {/* Menu Bar */}
        <header className="bg-white shadow-sm p-4 flex items-center justify-between lg:hidden z-30">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
            aria-label="Toggle Sidebar"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
          <span className="text-lg font-bold text-blue-900">PharmaStock</span>
        </header>

        {/* Main Content */}
        <main
          className={`flex-1 p-4 sm:p-6 transition-all duration-300 ease-in-out ${
            isSidebarOpen ? "lg:ml-0" : "lg:ml-16"
          }`}
        >
          <ActiveComponent />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;

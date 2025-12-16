"use client";

import React, { useState, useEffect } from "react";
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
const Suppliers = () => (
  <div className="p-4 sm:p-6">
    <h1 className="text-xl sm:text-2xl font-bold">Suppliers</h1>
    <p>Manage supplier details.</p>
  </div>
);

const Settings = () => (
  <div className="p-4 sm:p-6">
    <h1 className="text-xl sm:text-2xl font-bold">Settings</h1>
    <p>Configure system settings.</p>
  </div>
);

const Logout = () => (
  <div className="p-4 sm:p-6">
    <h1 className="text-xl sm:text-2xl font-bold">Logged Out</h1>
    <p>You have been logged out.</p>
  </div>
);

const MainLayout: React.FC = () => {
  const [selectedComponent, setSelectedComponent] = useState<string>("Dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const handleSelectComponent = (component: string) => {
    setSelectedComponent(component);
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const renderActiveComponent = () => {
    switch (selectedComponent) {
      case "Dashboard":
        return <Dashboard />;
      case "MedicineManagement":
        return <MedicineManagement />;
      case "SearchFilter":
        return <SearchFilter />;
      case "Reports":
        return <Reports />;
      case "ImageGallery":
        return <ImageGallery />;
      case "AuditLog":
        return <AuditLog />;
      case "NotificationCenter":
        return <NotificationCenter />;
      case "UserManagement":
        return <UserManagement />;
      case "SellStation":
        return <SellStation />;
      case "Suppliers":
        return <Suppliers />;
      case "Settings":
        return <Settings />;
      case "Logout":
        return <Logout />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:static lg:translate-x-0`}
      >
        <Sidebar
          userRole="admin"
          onSelectComponent={handleSelectComponent}
          activeComponent={selectedComponent}
        />
      </div>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col w-full">
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
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <span className="text-lg font-bold text-blue-900">PharmaStock</span>
        </header>

        <main className="flex-1 p-4 sm:p-6">
          {renderActiveComponent()}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;

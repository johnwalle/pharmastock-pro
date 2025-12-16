import React from "react";
import Image from "next/image";
import {
  FiActivity,
  FiAlertTriangle,
  FiDollarSign,
  FiMonitor,
  FiLayers,
  FiBarChart2,
  FiSettings,
  FiUsers,
  FiPackage,
} from "react-icons/fi";

export const metadata = {
  title: "Yenewub | Pharmacy Stock Management",
  description:
    "Internal platform for Yenewub Pharmacy employees to manage stock, track inventory, and monitor pharmacy operations efficiently.",
  keywords: "pharmacy stock management, medicine inventory, stock tracking, healthcare management",
  openGraph: {
    title: "Yenewub Pharmacy",
    description:
      "Internal platform for efficient pharmacy stock management.",
    url: "https://yenewub.com",
    siteName: "Yenewub Pharmacy",
    images: [
      {
        url: "https://img.freepik.com/free-photo/drugstore-employee-looking-at-drugs-packages-while-working-at-pills-inventory-in-pharmacy-pharmacists-is-trained-in-pharmacology-and-is-able-to-fill-and-dispense-prescription-medication-accurately_482257-63544.jpg",
        width: 1200,
        height: 630,
        alt: "Yenewub Pharmacy Landing Page",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

const Hero = () => (
  <div className="flex flex-col lg:flex-row items-center justify-between px-8 lg:px-20 py-24 bg-gradient-to-r from-[#f5faff] to-[#e0f7ff] space-y-12 lg:space-y-0">
    {/* Left Section */}
    <div className="max-w-xl">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
        Welcome to <span className="text-[#0052CC]">Yenewub</span> <br />
        Pharmacy Stock Management
      </h1>
      <p className="mt-6 text-gray-600 text-lg">
        Efficiently monitor medicine inventory, track stock levels, and manage pharmacy operations — built exclusively for Yenewub employees.
      </p>
      <div className="mt-8 grid grid-cols-2 gap-4">
        <div className="flex items-center gap-2 bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
          <FiPackage className="text-[#00BFA6] text-2xl" />
          <span className="text-gray-700 font-medium">Stock Management</span>
        </div>
        <div className="flex items-center gap-2 bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
          <FiAlertTriangle className="text-yellow-400 text-2xl" />
          <span className="text-gray-700 font-medium">Low Stock Alerts</span>
        </div>
        <div className="flex items-center gap-2 bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
          <FiBarChart2 className="text-[#0052CC] text-2xl" />
          <span className="text-gray-700 font-medium">Analytics & Reports</span>
        </div>
        <div className="flex items-center gap-2 bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
          <FiUsers className="text-purple-500 text-2xl" />
          <span className="text-gray-700 font-medium">Employee Management</span>
        </div>
      </div>
    </div>

    {/* Right Section */}
    <div className="relative w-full max-w-lg">
      <div className="relative">
        <Image
          src="https://img.freepik.com/free-vector/tiny-pharmacist-with-pills-vitamins-flat-vector-illustration-doctors-writing-prescriptions-antibiotics-working-together-helping-patients-cure-pharmacy-business-drugstore-concept_74855-23225.jpg?t=st=1763110768~exp=1763114368~hmac=1dee888533816e1556690a72901c30611dacf979d274c4bdb16cc45f46e3a9fa&w=1060"
          alt="Pharmacy Illustration"
          className="w-full rounded-xl shadow-lg"
        />
        <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#00BFA6] rounded-full opacity-20"></div>
        <div className="absolute -top-6 -left-6 w-24 h-24 bg-[#0052CC] rounded-full opacity-20"></div>
      </div>
    </div>
  </div>
);

const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center">
    <div className="flex justify-center mb-4 text-3xl text-[#00BFA6]">{icon}</div>
    <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600 text-sm">{description}</p>
  </div>
);


const FeaturesSection = () => (
  <section className="px-8 lg:px-20 py-20 bg-[#f5faff]">
    <div className="max-w-6xl mx-auto text-center mb-16">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
        Core Features for Employees
      </h2>
      <p className="mt-4 text-gray-600 text-lg md:text-xl">
        Everything you need to manage your pharmacy efficiently with modern tools.
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
      <FeatureCard
        icon={<FiMonitor />}
        title="Dashboard Overview"
        description="Real-time insights with key metrics, sales analytics, and stock status at a glance."
      />
      <FeatureCard
        icon={<FiPackage />}
        title="Medicine Management"
        description="Add, edit, and organize medicines with image upload, search, and advanced filtering."
      />
      <FeatureCard
        icon={<FiLayers />}
        title="Stock Monitoring"
        description="Real-time stock tracking with color-coded alerts and automated reorder notifications."
      />
      <FeatureCard
        icon={<FiBarChart2 />}
        title="Analytics & Reports"
        description="Customizable reports with detailed analytics for informed business decisions."
      />
      <FeatureCard
        icon={<FiUsers />}
        title="User Management"
        description="Role-based access control with secure employee management and permissions."
      />
      <FeatureCard
        icon={<FiSettings />}
        title="Settings & Config"
        description="Flexible configuration options to customize the system for your pharmacy needs."
      />
    </div>
  </section>
);

interface DashboardCardProps {
  icon: React.ReactNode; // React element for the icon
  title: string;
  value: string | number;
  change?: string | number; // optional
  color?: string;           // optional, for bg color
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  icon,
  title,
  value,
  change,
  color,
}) => {
  return (
    <div className={`p-4 rounded-lg shadow ${color || 'bg-white'}`}>
      <div className="flex items-center space-x-4">
        {/* Icon */}
        <div className="text-2xl text-gray-500">{icon}</div>

        {/* Content */}
        <div>
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <p className="text-xl font-bold">{value}</p>
          {change && <p className="text-sm text-gray-400">{change}</p>}
        </div>
      </div>
    </div>
  );
};


const DashboardSection = () => (
  <section className="bg-[#f0f8ff] px-8 lg:px-20 py-20 text-center">
    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
      Dashboard & Alerts
    </h2>
    <p className="mt-3 text-gray-600 text-lg md:text-xl">
      Quickly monitor inventory and stock levels for day-to-day operations.
    </p>

    <div className="max-w-6xl mx-auto mt-12 rounded-2xl overflow-hidden">
      {/* Dashboard Header */}
      <div className="bg-[#0052CC] text-white px-6 py-4 flex items-center justify-between rounded-t-2xl">
        <div className="flex items-center gap-2 text-sm md:text-base font-semibold">
          <span className="w-3 h-3 rounded-full bg-blue-400 inline-block" />
          Yenewub Dashboard
        </div>
        <div className="flex gap-2">
          <span className="w-3 h-3 bg-red-400 rounded-full" />
          <span className="w-3 h-3 bg-yellow-400 rounded-full" />
          <span className="w-3 h-3 bg-green-400 rounded-full" />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-6 py-8">
        <DashboardCard
          icon={<FiActivity />}
          title="Total Medicines"
          value="2,847"
          change="+12%"
          color="border-[#0052CC]"
        />
        <DashboardCard
          icon={<FiAlertTriangle />}
          title="Low Stock Items"
          value="23"
          change="-5%"
          color="border-[#00BFA6]"
        />
        <DashboardCard
          icon={<FiDollarSign />}
          title="Monthly Revenue"
          value="$45,692"
          change="+8%"
          color="border-yellow-400"
        />
        <DashboardCard
          icon={<FiUsers />}
          title="Active Employees"
          value="12"
          change="+3%"
          color="border-purple-400"
        />
      </div>

      {/* Alerts & Activity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6 pb-8">
        {/* Stock Alerts */}
        <div className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition">
          <h4 className="font-semibold text-gray-800 mb-4 text-lg">Stock Alerts</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center bg-red-50 text-red-700 px-4 py-2 rounded-lg">
              <span>Amoxicillin 500mg</span>
              <span className="font-bold">5 left</span>
            </div>
            <div className="flex justify-between items-center bg-yellow-50 text-yellow-700 px-4 py-2 rounded-lg">
              <span>Ibuprofen 200mg</span>
              <span className="font-bold">15 left</span>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition">
          <h4 className="font-semibold text-gray-800 mb-4 text-lg">Recent Activity</h4>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Image
                src="https://randomuser.me/api/portraits/women/65.jpg"
                alt="Sarah"
                className="w-10 h-10 rounded-full border border-gray-200"
              />
              <p className="text-gray-700 text-sm md:text-base">
                <span className="font-medium">Sarah</span> added new medicine
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Image
                src="https://randomuser.me/api/portraits/men/42.jpg"
                alt="John"
                className="w-10 h-10 rounded-full border border-gray-200"
              />
              <p className="text-gray-700 text-sm md:text-base">
                <span className="font-medium">John</span> updated stock levels
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);



const Footer = () => (
  <footer className="bg-[#0052CC] text-white py-12 px-6 text-center">
    <div className="max-w-7xl mx-auto">
      <h4 className="text-lg font-semibold mb-2">Yenewub Pharmacy</h4>
      <p className="text-sm text-gray-100">
        Internal platform for employees. Manage stock, monitor inventory, and track pharmacy operations efficiently.
      </p>
      <div className="mt-6 text-xs text-gray-200">
        © 2025 Yenewub Pharmacy. All rights reserved.
      </div>
    </div>
  </footer>
);

const Page: React.FC = () => (
  <div className="min-h-screen flex flex-col">
    <main className="flex-1">
      <Hero />
      <FeaturesSection />
      <DashboardSection />
      <Footer />
    </main>
  </div>
);

export default Page;

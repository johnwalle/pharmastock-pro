import React from 'react';
import { FiActivity, FiAlertTriangle, FiDollarSign, FiMonitor, FiLayers, FiBarChart2, FiSettings, FiUsers, FiPackage } from "react-icons/fi";


export const metadata = {
  title: 'PharmStock Pro | Modern Pharmacy Stock Management',
  description: 'Streamline your pharmacy with PharmStock Pro. Intelligent stock monitoring, real-time alerts, and comprehensive analytics for modern pharmacies.',
  keywords: 'pharmacy stock management, medicine inventory, stock tracking, pharmacy software, healthcare management',
  openGraph: {
    title: 'PharmStock Pro',
    description: 'Efficient pharmacy stock management with real-time insights.',
    url: 'https://pharmstockpro.com',
    siteName: 'PharmStock Pro',
    images: [
      {
        url: 'https://img.freepik.com/free-photo/drugstore-employee-looking-at-drugs-packages-while-working-at-pills-inventory-in-pharmacy-pharmacists-is-trained-in-pharmacology-and-is-able-to-fill-and-dispense-prescription-medication-accurately_482257-63544.jpg',
        width: 1200,
        height: 630,
        alt: 'PharmStock Pro Landing Page',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};


const Hero = () => (
  <div className="flex flex-col lg:flex-row items-center justify-between px-6 py-28 bg-[#f7fafd] space-y-10 lg:space-y-0">
    <div className="max-w-xl">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
        Modern Pharmacy <span className="text-blue-600">Stock</span><br />
        <span className="text-blue-600">Management</span> System
      </h1>
      <p className="mt-6 text-gray-600 text-lg">
        Streamline your pharmacy operations with intelligent stock monitoring, real-time alerts, and comprehensive analytics. Built for modern pharmacies.
      </p>
      <div className="mt-8 flex gap-4">
        <button className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition">
          Start Free Trial
        </button>
        <button className="border border-gray-300 text-gray-800 font-medium py-3 px-6 rounded-lg hover:bg-gray-100 transition">
          View Demo
        </button>
      </div>
    </div>

    <div className="relative w-full max-w-md">
      <div className="w-full h-64 bg-white rounded-xl shadow-lg transform rotate-3 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 17l6-6 4 4 8-8"
          />
        </svg>

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
  <div className="bg-[#f7fafd] p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
    <div className="flex justify-center mb-4 text-3xl text-blue-600">{icon}</div>
    <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">{title}</h3>
    <p className="text-gray-600 text-sm text-center">{description}</p>
  </div>
);

const FeaturesSection = () => {
  return (
    <section className="px-6 py-16 bg-white">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          Comprehensive Pharmacy Management
        </h2>
        <p className="mt-4 text-gray-600">
          Everything you need to manage your pharmacy efficiently with modern tools
          and intuitive design.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
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
          description="Role-based access control with secure user management and permissions."
        />
        <FeatureCard
          icon={<FiSettings />}
          title="Settings & Config"
          description="Flexible configuration options to customize the system for your pharmacy needs."
        />
      </div>
    </section>
  );
};

const DashboardCard = ({ icon, title, value, change, color }: any) => (
  <div className={`flex flex-col bg-white rounded-lg p-4 shadow-sm border-t-4 ${color}`}>
    <div className="flex justify-between items-center">
      <div className="text-2xl text-gray-500">{icon}</div>
      <div className="text-sm text-green-600 font-semibold">{change}</div>
    </div>
    <p className="mt-4 text-gray-600 text-sm">{title}</p>
    <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
  </div>
);

const DashboardSection = () => {
  return (
    <section className="bg-[#f7fafd] px-6 py-16 text-center">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Intuitive Dashboard Design</h2>
      <p className="mt-2 text-gray-600">
        Clean, modern interface designed for efficiency and ease of use.
      </p>

      <div className="max-w-5xl mx-auto mt-12 bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-[#1e293b] text-white px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <span className="w-3 h-3 rounded-full bg-blue-500 inline-block" />
            PharmStock Pro Dashboard
          </div>
          <div className="flex gap-2">
            <span className="w-3 h-3 bg-red-400 rounded-full" />
            <span className="w-3 h-3 bg-yellow-400 rounded-full" />
            <span className="w-3 h-3 bg-green-400 rounded-full" />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-6 py-6">
          <DashboardCard
            icon={<FiActivity />}
            title="Total Medicines"
            value="2,847"
            change="+12%"
            color="border-blue-400"
          />
          <DashboardCard
            icon={<FiAlertTriangle />}
            title="Low Stock Items"
            value="23"
            change="-5%"
            color="border-teal-300"
          />
          <DashboardCard
            icon={<FiDollarSign />}
            title="Monthly Revenue"
            value="$45,692"
            change="+8%"
            color="border-green-400"
          />
          <DashboardCard
            icon={<FiUsers />}
            title="Active Users"
            value="12"
            change="+3%"
            color="border-purple-400"
          />
        </div>

        {/* Alerts & Activity */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6 pb-6">
          {/* Stock Alerts */}
          <div className="bg-gray-50 rounded-lg p-4 shadow-sm">
            <h4 className="font-semibold text-gray-800 mb-4">Stock Alerts</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center bg-red-100 text-red-700 px-4 py-2 rounded">
                <span>Amoxicillin 500mg</span>
                <span className="font-bold">5 left</span>
              </div>
              <div className="flex justify-between items-center bg-yellow-100 text-yellow-700 px-4 py-2 rounded">
                <span>Ibuprofen 200mg</span>
                <span className="font-bold">15 left</span>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-gray-50 rounded-lg p-4 shadow-sm">
            <h4 className="font-semibold text-gray-800 mb-4">Recent Activity</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <img
                  src="https://randomuser.me/api/portraits/women/65.jpg"
                  alt="Sarah"
                  className="w-8 h-8 rounded-full"
                />
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Sarah</span> added new medicine
                </p>
              </div>
              <div className="flex items-center gap-3">
                <img
                  src="https://randomuser.me/api/portraits/men/42.jpg"
                  alt="John"
                  className="w-8 h-8 rounded-full"
                />
                <p className="text-sm text-gray-700">
                  <span className="font-medium">John</span> updated stock levels
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FooterCTA = () => (
  <footer className="bg-primary text-white">
    {/* CTA Section */}
    <section className="py-16 px-4 sm:px-6 lg:px-8 text-center">
      <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Pharmacy?</h2>
      <p className="text-lg mb-8 max-w-xl mx-auto">
        Join hundreds of pharmacies already using PharmStock Pro to streamline their operations.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
        <a
          href="/auth/trial"
          className="bg-white text-primary text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3 rounded-md hover:bg-gray-100 transition duration-300 text-center"
        >
          Start Free Trial
        </a>
        <a
          href="/demo"
          className="border border-white text-white text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3 rounded-md hover:bg-white hover:text-primary transition duration-300 text-center"
        >
          Schedule Demo
        </a>
      </div>

    </section>

    {/* Footer Section */}
    <div className="bg-gray-900 text-gray-400 py-12 px-6 lg:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo & Tagline */}
        <div>
          <div className="flex items-center gap-2 text-white mb-2">
            <div className="bg-blue-600 p-2 rounded-md">
              {/* Icon placeholder */}
              <span className="text-xl font-bold">🔗</span>
            </div>
            <span className="font-semibold text-lg">PharmStock Pro</span>
          </div>
          <p className="text-sm">Modern pharmacy management for the digital age.</p>
        </div>

        {/* Product Links */}
        <div>
          <h4 className="text-white font-semibold mb-2">Product</h4>
          <ul className="space-y-1 text-sm">
            <li><a href="#" className="hover:underline">Features</a></li>
            <li><a href="#" className="hover:underline">Pricing</a></li>
            <li><a href="#" className="hover:underline">Demo</a></li>
          </ul>
        </div>

        {/* Support Links */}
        <div>
          <h4 className="text-white font-semibold mb-2">Support</h4>
          <ul className="space-y-1 text-sm">
            <li><a href="#" className="hover:underline">Documentation</a></li>
            <li><a href="#" className="hover:underline">Help Center</a></li>
            <li><a href="#" className="hover:underline">Contact</a></li>
          </ul>
        </div>

        {/* Company Links */}
        <div>
          <h4 className="text-white font-semibold mb-2">Company</h4>
          <ul className="space-y-1 text-sm">
            <li><a href="#" className="hover:underline">About</a></li>
            <li><a href="#" className="hover:underline">Privacy</a></li>
            <li><a href="#" className="hover:underline">Terms</a></li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-10 border-t border-gray-700 pt-6 text-center text-xs text-gray-500">
        © 2024 PharmStock Pro. All rights reserved.
      </div>
    </div>
  </footer>
);


const Page: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <Hero />
        <FeaturesSection />
        <DashboardSection />
        <FooterCTA />
      </main>
    </div>
  );
};

export default Page;
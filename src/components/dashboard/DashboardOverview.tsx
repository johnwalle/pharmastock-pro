'use client';

import { Package, AlertCircle, CalendarClock, XCircle } from 'lucide-react';
import React from 'react';

type StatCardProps = {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
  variant?: 'default' | 'warning' | 'danger';
  badge?: string;
};

const getVariantColor = (variant: StatCardProps['variant']) => {
  switch (variant) {
    case 'danger':
      return 'text-red-600';
    case 'warning':
      return 'text-orange-500';
    default:
      return 'text-gray-800';
  }
};

const StatCard = ({
  title,
  value,
  icon,
  description,
  variant = 'default',
  badge,
}: StatCardProps) => {
  return (
    <div
      className={`
        relative flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white 
        p-6 shadow-sm transform transition-all duration-300 hover:shadow-lg hover:scale-[1.03]
      `}
    >
      {badge && (
        <span className="absolute top-3 right-3 rounded-full bg-red-500 text-white text-xs px-2 py-0.5 font-semibold shadow-md">
          {badge}
        </span>
      )}

      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-500">{title}</span>
        <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-xl text-gray-600">
          {icon}
        </div>
      </div>

      <span className={`text-2xl md:text-3xl font-bold tracking-tight ${getVariantColor(variant)}`}>
        {value}
      </span>

      {description && (
        <span className={`text-xs md:text-sm font-medium text-gray-500`}>
          {description}
        </span>
      )}
    </div>
  );
};

type Props = {
  overview: {
    totalMedicines: number;
    lowStockAlerts: number;
    expiredMedicines: number;
    outOfStockMedicines: number;
  };
};

const DashboardOverview = ({ overview }: Props) => {
  return (
    <section className="py-8 md:py-12 px-6 md:px-12 bg-[#f5faff] rounded-xl">
      <div className="mb-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Dashboard Overview</h2>
        <p className="text-sm md:text-base text-gray-500 mt-1">
          Monitor your pharmacy inventory at a glance
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Medicines"
          value={overview.totalMedicines}
          icon={<Package className="w-5 h-5" />}
          description="Total items in stock"
        />
        <StatCard
          title="Low-Stock Alerts"
          value={overview.lowStockAlerts}
          icon={<AlertCircle className="w-5 h-5 text-red-500" />}
          description="Requires attention"
          variant="danger"
          badge={overview.lowStockAlerts > 0 ? `${overview.lowStockAlerts}` : undefined}
        />
        <StatCard
          title="Expired Medicines"
          value={overview.expiredMedicines}
          icon={<CalendarClock className="w-5 h-5 text-orange-500" />}
          description="Past expiry date"
          variant="warning"
          badge={overview.expiredMedicines > 0 ? `${overview.expiredMedicines}` : undefined}
        />
        <StatCard
          title="Out of Stock"
          value={overview.outOfStockMedicines}
          icon={<XCircle className="w-5 h-5 text-gray-500" />}
          description="Unavailable items"
          variant="danger"
          badge={overview.outOfStockMedicines > 0 ? `${overview.outOfStockMedicines}` : undefined}
        />
      </div>
    </section>
  );
};

export default DashboardOverview;

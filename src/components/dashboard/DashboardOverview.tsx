'use client';

import { Package, AlertCircle, CalendarClock } from 'lucide-react';
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
        relative flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white 
        p-6 shadow-sm w-full transform transition-all duration-300 ease-in-out 
        hover:shadow-md hover:scale-[1.02] hover:border-primary/30 focus-within:ring-2 focus-within:ring-blue-100
      `}
    >
      {badge && (
        <span className="absolute top-2 right-2 rounded-full bg-red-500 text-white text-[10px] px-2 py-0.5 font-medium shadow-md">
          {badge}
        </span>
      )}
      <span className="text-sm font-medium text-gray-500">{title}</span>
      <div className="flex items-center justify-between">
        <span className={`text-3xl font-bold tracking-tight ${getVariantColor(variant)}`}>
          {value}
        </span>
        <div className="rounded-xl bg-gray-100 p-3 text-gray-600">
          {icon}
        </div>
      </div>
      {description && (
        <span className={`text-xs font-medium ${getVariantColor(variant)}`}>
          {description}
        </span>
      )}
    </div>
  );
};

export default function DashboardOverview() {
  return (
    <section className="py-6 md:px-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
        <p className="text-sm text-gray-500 mt-1">
          Monitor your pharmacy inventory at a glance
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Total Medicines"
          value="2,847"
          icon={<Package className="w-5 h-5" />}
          description="+12% from last month"
        />
        <StatCard
          title="Low-Stock Alerts"
          value={23}
          icon={<AlertCircle className="w-5 h-5 text-red-500" />}
          description="Requires attention"
          variant="danger"
          badge="23"
        />
        <StatCard
          title="Near Expiry Items"
          value={156}
          icon={<CalendarClock className="w-5 h-5 text-orange-500" />}
          description="Next 30 days"
          variant="warning"
        />
      </div>
    </section>
  );
}

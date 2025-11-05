'use client';

import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FilterPanelProps {
  onFilter: (filters: {
    expiry: string;
    status: string;
    stock: string;
    sortBy: string;
    order: 'asc' | 'desc';
  }) => void;
  currentStatus: string;
  currentSort: string;
  currentOrder: 'asc' | 'desc';
}

export default function FilterPanel({
  onFilter,
  currentStatus,
  currentSort,
  currentOrder,
}: FilterPanelProps) {
  const [filters, setFilters] = useState({
    expiry: '',
    status: currentStatus,
    stock: '',
    sortBy: currentSort,
    order: currentOrder,
  });

  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      status: currentStatus,
      sortBy: currentSort,
      order: currentOrder,
    }));
  }, [currentStatus, currentSort, currentOrder]);

  const handleChange = (field: string, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleClear = () => {
    const cleared = {
      expiry: '',
      status: '',
      stock: '',
      sortBy: 'expiryDate',
      order: 'asc' as const,
    };
    setFilters(cleared);
    onFilter(cleared);
  };

  const handleApply = () => {
    onFilter(filters);
  };

  const Select = ({
    label,
    value,
    options,
    onChange,
  }: {
    label: string;
    value: string;
    options: { label: string; value: string }[];
    onChange: (val: string) => void;
  }) => (
    <div className="flex flex-col text-sm">
      <label className="mb-1 text-gray-600 font-medium">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="appearance-none w-full border rounded-lg px-4 py-2 pr-10 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
      </div>
    </div>
  );

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-200 mb-6 shadow-md">
      <h2 className="text-base font-semibold text-gray-800 mb-5">📦 Filter & Sort Inventory</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Select
          label="Expiring"
          value={filters.expiry}
          onChange={(val) => handleChange('expiry', val)}
          options={[
            { label: 'All Expiry Dates', value: '' },
            { label: 'Next 30 Days', value: '30days' },
            { label: 'Next 6 Months', value: '6months' },
          ]}
        />

        <Select
          label="Stock Status"
          value={filters.status}
          onChange={(val) => handleChange('status', val)}
          options={[
            { label: 'All Status', value: '' },
            { label: 'Available', value: 'Available' },
            { label: 'Low Stock', value: 'Low Stock' },
            { label: 'Out of Stock', value: 'Out of Stock' },
          ]}
        />

        <Select
          label="Stock Level"
          value={filters.stock}
          onChange={(val) => handleChange('stock', val)}
          options={[
            { label: 'All Levels', value: '' },
            { label: 'High', value: 'high' },
            { label: 'Low', value: 'low' },
          ]}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
        <Select
          label="Sort By"
          value={filters.sortBy}
          onChange={(val) => handleChange('sortBy', val)}
          options={[
            { label: 'Expiry Date', value: 'expiryDate' },
            { label: 'Brand Name', value: 'brandName' },
            { label: 'Stock Level', value: 'currentStockLevel' },
          ]}
        />

        <Select
          label="Order"
          value={filters.order}
          onChange={(val) => handleChange('order', val)}
          options={[
            { label: 'Ascending', value: 'asc' },
            { label: 'Descending', value: 'desc' },
          ]}
        />
      </div>

      <div className="mt-6 flex gap-4">
        <button
          onClick={handleClear}
          className="px-5 py-2.5 bg-gray-100 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-200 text-sm font-medium"
        >
          Reset
        </button>
        <button
          onClick={handleApply}
          className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
}

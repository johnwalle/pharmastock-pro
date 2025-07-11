'use client';

import { useState, useEffect } from 'react';
import MedicineGallery from './MedicineGallery';
import { useMedicineStore } from '@/store/medicineStore';

export default function MedicinesPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const {
    medicines,
    fetchMedicines,
    loading,
    error,
  } = useMedicineStore();

  // Map UI filter to backend query params
  const mapFilterToParams = (filter: string) => {
    switch (filter) {
      case 'Expired':
        return { expiry: '30days' };
      case 'Low Stock':
        return { status: 'active' }; // No backend stock param yet
      case 'In Stock':
        return { status: 'active', expiry: '6months' };
      default:
        return {};
    }
  };

  useEffect(() => {
    const { status, expiry } = mapFilterToParams(filter);

    fetchMedicines({
      search,
      status: status || '',
      expiry: expiry || '',
      sortBy: 'brandName',
      order: 'asc',
      page: 1,
      limit: 100,
    });
  }, [search, filter]);

  return (
    <main className="p-6 max-w-7xl mx-auto">
      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Medicine Inventory</h1>
        <p className="text-gray-500 mt-1">Browse, search and filter medicines visually</p>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        {/* Search */}
        <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 w-full md:w-1/2 bg-white shadow-sm">
          <svg
            className="w-4 h-4 text-gray-500 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 3a7.5 7.5 0 006.15 13.65z"
            />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, generic or batch..."
            className="outline-none text-sm w-full"
          />
        </div>

        {/* Filter Dropdown */}
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-sm"
        >
          <option value="All">All Status</option>
          <option value="In Stock">In Stock (Next 6 months)</option>
          <option value="Low Stock">Low Stock</option>
          <option value="Expired">Expiring in 30 Days</option>
        </select>
      </div>

      {/* Display Content */}
      {loading ? (
        <div className="text-center text-gray-500 py-12">Loading medicines...</div>
      ) : error ? (
        <div className="text-center text-red-600 font-medium py-12">{error}</div>
      ) : medicines.length === 0 ? (
        <div className="text-center text-gray-400 py-12">
          <svg
            className="mx-auto w-12 h-12 mb-4 text-gray-300"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 8.25v-1.5a3 3 0 00-3-3h-3a3 3 0 00-3 3v1.5M3 8.25h18M4.5 8.25v9A2.25 2.25 0 006.75 19.5h10.5a2.25 2.25 0 002.25-2.25v-9"
            />
          </svg>
          <p className="text-lg font-medium">No medicines found</p>
          <p className="text-sm text-gray-500">Try adjusting your search or filters.</p>
        </div>
      ) : (
        <MedicineGallery medicines={medicines} />
      )}
    </main>
  );
}

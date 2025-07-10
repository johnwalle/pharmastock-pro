'use client';

import { useState } from 'react';
import MedicineTable from './medicineTable';
import AddStockModal from './addStockModal';

const statusOptions = [
  { label: 'All Statuses', value: '' },
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'inactive' },
  { label: 'Discontinued', value: 'discontinued' },
  { label: 'Out of Stock', value: 'out-of-stock' },
];

const sortOptions = [
  { label: 'Expiry Date', value: 'expiryDate' },
  { label: 'Stock Level', value: 'currentStockLevel' },
  { label: 'Name', value: 'brandName' },
  { label: 'Received Date', value: 'receivedDate' },
];

export default function MedicinesPage() {
  const [showModal, setShowModal] = useState(false);
  const [statusFilter, setStatusFilter] = useState('');
  const [sortBy, setSortBy] = useState('expiryDate');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);

  const handleClearFilters = () => {
    setStatusFilter('');
    setSortBy('expiryDate');
    setOrder('asc');
    setSearchQuery('');
    setPage(1);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Stock Monitoring</h1>
        <p className="text-sm text-gray-500">
          Track medicines by expiry, quantity, and prescription status
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex flex-wrap gap-3">
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
            className="border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {statusOptions.map(({ label, value }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value);
              setPage(1);
            }}
            className="border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {sortOptions.map(({ label, value }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>

          {/* Sort Order Toggle */}
          <button
            onClick={() => {
              setOrder(order === 'asc' ? 'desc' : 'asc');
              setPage(1);
            }}
            className="border border-gray-300 px-4 py-2 text-sm rounded-md hover:bg-gray-100"
          >
            {order === 'asc' ? '⬆ Asc' : '⬇ Desc'}
          </button>

          {/* Clear Filters */}
          <button
            onClick={handleClearFilters}
            className="cursor-pointer border border-gray-300 text-gray-600 hover:bg-gray-100 rounded-md px-4 py-2 text-sm"
          >
            ✕ Clear
          </button>
        </div>

        {/* Search + Add */}
        <div className="flex items-center gap-3">
          {/* Search Input */}
          <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
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
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPage(1);
              }}
              placeholder="Search by name or batch..."
              className="outline-none text-sm w-40"
            />
          </div>

          {/* Add Button */}
          <button
            onClick={() => setShowModal(true)}
            className="bg-green-600 cursor-pointer hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium"
          >
            + Add Medicine
          </button>
        </div>
      </div>

      {/* Table */}
      <MedicineTable
        statusFilter={statusFilter}
        sortBy={sortBy}
        order={order}
        searchQuery={searchQuery}
        page={page}
        setPage={setPage}
      />

      {/* Modal */}
      <AddStockModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import SearchBar from './SearchBar';
import FilterPanel from './FilterPanel';
import StockTable from './StockTable';
import { useMedicineStore } from '@/store/medicineStore';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [expiryFilter, setExpiryFilter] = useState('');
  const [stockFilter, setStockFilter] = useState('');
  const [sortBy, setSortBy] = useState('expiryDate');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [page, setPage] = useState(1);
  const limit = 6;

  const {
    medicines,
    total,
    loading,
    error,
    fetchMedicines,
  } = useMedicineStore();

  useEffect(() => {
    fetchMedicines({
      search: searchTerm,
      status: statusFilter,
      expiry: expiryFilter,
      stock: stockFilter,
      sortBy,
      order,
      page,
      limit,
    });
  }, [searchTerm, statusFilter, expiryFilter, stockFilter, sortBy, order, page, fetchMedicines]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setPage(1); // Reset to first page
  };

  const handleFilter = (filters: {
    expiry: string;
    status: string;
    stock: string;
    sortBy: string;
    order: 'asc' | 'desc';
  }) => {
    setStatusFilter(filters.status);
    setExpiryFilter(filters.expiry);
    setStockFilter(filters.stock);
    setSortBy(filters.sortBy);
    setOrder(filters.order);
    setPage(1);
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <SearchBar onSearch={handleSearch} initialValue={searchTerm} />
      <FilterPanel
        onFilter={handleFilter}
        currentStatus={statusFilter}
        currentSort={sortBy}
        currentOrder={order}
      />
      <StockTable
        data={medicines}
        loading={loading}
        error={error}
        total={total}
        page={page}
        perPage={limit}
        onPageChange={setPage}
      />
    </main>
  );
}

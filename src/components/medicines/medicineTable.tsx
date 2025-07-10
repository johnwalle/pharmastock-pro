'use client';

import { useEffect } from 'react';
import { Eye, Pencil } from 'lucide-react';
import StatusBadge from './statusBadge';
import Pagination from './pagination';
import { useMedicineStore } from '@/store/medicineStore';
import { Medicine } from '@/types/medicines';

interface MedicineTableProps {
  statusFilter: string;
  sortBy: string;
  order: 'asc' | 'desc';
  searchQuery: string;
  page: number;
  setPage: (page: number) => void;
}

export default function MedicineTable({
  statusFilter,
  sortBy,
  order,
  searchQuery,
  page,
  setPage,
}: MedicineTableProps) {
  const { medicines, loading, error, fetchMedicines, total } = useMedicineStore();
  const perPage = 5;

  useEffect(() => {
    const query = {
      search: searchQuery,
      status: statusFilter,
      sortBy,
      order,
      page,
      limit: perPage,
    };
    fetchMedicines(query);
  }, [searchQuery, statusFilter, sortBy, order, page, fetchMedicines]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center mt-10">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-600 border-solid"></div>
        <p className="mt-4 text-blue-700 font-medium text-sm sm:text-base">
          Loading medicines, please wait...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-6 text-center text-red-600 font-semibold">
        Failed to load medicines: {error}
      </div>
    );
  }

  return (
    <div className="mt-4 bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
      {medicines.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16">
          <svg
            className="w-24 h-24 text-gray-300 mb-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.75v14.5m7.25-7.25H4.75"
            />
          </svg>
          <p className="text-gray-600 text-sm sm:text-base font-medium">
            No medicines found for your search or filter.
          </p>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full text-xs sm:text-sm">
              <thead className="bg-blue-900 text-white text-left uppercase text-[10px] sm:text-xs">
                <tr>
                  <th className="px-2 sm:px-4 py-2 sm:py-3">Brand</th>
                  <th className="px-2 sm:px-4 py-2 sm:py-3 hidden sm:table-cell">Generic</th>
                  <th className="px-2 sm:px-4 py-2 sm:py-3">Batch</th>
                  <th className="px-2 sm:px-4 py-2 sm:py-3">Stock</th>
                  <th className="px-2 sm:px-4 py-2 sm:py-3">Expiry</th>
                  <th className="px-2 sm:px-4 py-2 sm:py-3 hidden md:table-cell">Price/Unit</th>
                  <th className="px-2 sm:px-4 py-2 sm:py-3">Status</th>
                  <th className="px-2 sm:px-4 py-2 sm:py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {medicines.map((med: Medicine) => (
                  <tr key={med._id ?? med.batchNumber} className="border-t hover:bg-gray-50">
                    <td className="px-2 sm:px-4 py-2 sm:py-3 font-medium text-gray-800">
                      {med.brandName}
                    </td>
                    <td className="px-2 sm:px-4 py-2 sm:py-3 text-gray-600 hidden sm:table-cell">
                      {med.genericName}
                    </td>
                    <td className="px-2 sm:px-4 py-2 sm:py-3">{med.batchNumber}</td>
                    <td className="px-2 sm:px-4 py-2 sm:py-3">{med.currentStockLevel} units</td>
                    <td className="px-2 sm:px-4 py-2 sm:py-3">
                      {new Date(med.expiryDate).toLocaleDateString()}
                    </td>
                    <td className="px-2 sm:px-4 py-2 sm:py-3 hidden md:table-cell">
                      ${med.pricePerUnit.toFixed(2)}
                    </td>
                    <td className="px-2 sm:px-4 py-2 sm:py-3">
                      <StatusBadge status={med.status} />
                    </td>
                    <td className="px-2 sm:px-4 py-2 sm:py-3 text-center space-x-3">
                      <button aria-label="Edit" className="hover:text-blue-600">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button aria-label="View" className="hover:text-gray-700">
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination (only if there are results) */}
          <Pagination
            total={total}
            page={page}
            perPage={perPage}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  );
}

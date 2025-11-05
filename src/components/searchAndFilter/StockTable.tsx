'use client';

import { Medicine } from '@/types/medicines';
import { Loader2 } from 'lucide-react';

const statusClasses: Record<string, string> = {
  active: 'bg-green-100 text-green-800',
  'out-of-stock': 'bg-red-100 text-red-800',
  discontinued: 'bg-gray-200 text-gray-600',
  inactive: 'bg-yellow-100 text-yellow-800',
};

interface StockTableProps {
  data: Medicine[];
  loading: boolean;
  error: string | null;
  total: number;
  page: number;
  perPage: number;
  onPageChange: (newPage: number) => void;
}

export default function StockTable({
  data,
  loading,
  error,
  total,
  page,
  perPage,
  onPageChange,
}: StockTableProps) {
  const totalPages = Math.ceil(total / perPage);

  return (
    <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
      <div className="p-4 border-b text-sm font-semibold text-gray-700">
        Inventory{' '}
        <span className="text-gray-500 font-normal">
          ({loading ? 'Loading...' : `${total} items found`})
        </span>
      </div>

      <div className="overflow-x-auto min-h-[200px]">
        {loading ? (
          <div className="flex justify-center items-center p-10 text-gray-500">
            <Loader2 className="animate-spin w-5 h-5 mr-2" />
            Loading medicines...
          </div>
        ) : error ? (
          <div className="p-6 text-center text-red-600 font-medium">{error}</div>
        ) : data.length === 0 ? (
          <div className="p-6 text-center text-gray-500 italic">No results found.</div>
        ) : (
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 text-left text-xs text-gray-600">
              <tr>
                <th className="p-3">Brand Name</th>
                <th className="p-3 hidden sm:table-cell">Generic</th>
                <th className="p-3">Batch</th>
                <th className="p-3">Stock</th>
                <th className="p-3">Expiry</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {data.map((item) => (
                <tr key={item._id ?? item.batchNumber}>
                  <td className="p-3 font-medium text-gray-800">{item.brandName}</td>
                  <td className="p-3 hidden sm:table-cell text-gray-600">{item.genericName}</td>
                  <td className="p-3">{item.batchNumber}</td>
                  <td className="p-3">{item.currentStockLevel} units</td>
                  <td className="p-3">
                    {new Date(item.expiryDate).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${statusClasses[item.status] || 'bg-gray-100 text-gray-700'
                        }`}
                    >
                      {item.status.replace(/-/g, ' ')}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && !loading && (
        <div className="flex justify-between items-center p-4 border-t bg-blue-50 text-sm">
          <span className="text-blue-700 font-medium">
            Page <strong>{page}</strong> of <strong>{totalPages}</strong>
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onPageChange(page - 1)}
              disabled={page === 1}
              className="px-4 py-1.5 rounded-lg border border-blue-300 text-blue-700 bg-white hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              ← Previous
            </button>

            <span className="text-blue-600 font-semibold">
              {page} / {totalPages}
            </span>

            <button
              onClick={() => onPageChange(page + 1)}
              disabled={page === totalPages}
              className="px-4 py-1.5 rounded-lg border border-blue-300 text-blue-700 bg-white hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Next →
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

'use client';

import { useState } from 'react';
import MedicineCard from './MedicineCard';
import MedicineModal from './MedicineModal';
import { Medicine } from '@/types/medicines';

interface Props {
  medicines: Medicine[];
}

const ITEMS_PER_PAGE = 6;

export default function MedicineGallery({ medicines }: Props) {
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(medicines.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedMedicines = medicines.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <>
      {/* Grid of Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {paginatedMedicines.map((medicine) => (
          <MedicineCard
            key={medicine._id}
            medicine={medicine}
            onClick={() => setSelectedMedicine(medicine)}
          />
        ))}
      </div>

      {/* Pagination Controls */}
      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center items-center gap-4 text-sm">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-blue-100 text-blue-700 rounded-md font-medium hover:bg-blue-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ◀ Prev
          </button>

          <span className="text-gray-700 font-medium">
            Page <span className="text-blue-600">{currentPage}</span> of <span className="text-blue-600">{totalPages}</span>
          </span>

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-blue-100 text-blue-700 rounded-md font-medium hover:bg-blue-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next ▶
          </button>
        </div>
      )}

      {/* Modal */}
      {selectedMedicine && (
        <MedicineModal
          medicine={selectedMedicine}
          onClose={() => setSelectedMedicine(null)}
        />
      )}
    </>
  );
}

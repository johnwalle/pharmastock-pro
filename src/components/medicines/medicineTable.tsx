'use client'

import { useEffect, useState } from 'react'
import { Pencil, Trash2, ArrowRightCircle } from 'lucide-react'

import StatusBadge from './statusBadge'
import Pagination from './pagination'
import DeleteModal from './deleteModal'
import EditMedicineModal from './editMedicineModal'
import MoveToDispenserModal from './MoveToDispenserModal'

import { useMedicineStore } from '@/store/medicineStore'
import { Medicine } from '@/types/medicines'

interface MedicineTableProps {
  statusFilter: string
  sortBy: string
  order: 'asc' | 'desc'
  searchQuery: string
  page: number
  setPage: (page: number) => void
}

export default function MedicineTable({
  statusFilter,
  sortBy,
  order,
  searchQuery,
  page,
  setPage,
}: MedicineTableProps) {
  const { medicines, loading, fetchMedicines, total } = useMedicineStore()

  const [selectedMedicineId, setSelectedMedicineId] = useState<string | null>(null)
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(null)
  const [selectedMoveMedicine, setSelectedMoveMedicine] = useState<Medicine | null>(null)

  const perPage = 5

  useEffect(() => {
    fetchMedicines({
      search: searchQuery,
      status: statusFilter,
      sortBy,
      order,
      page,
      limit: perPage,
    })
  }, [searchQuery, statusFilter, sortBy, order, page, fetchMedicines])

  return (
    <>
      <div className="mt-6 bg-white border border-gray-200 rounded-xl shadow-sm">
        {loading ? (
          <div className="py-12 text-center text-sm text-gray-500">
            Loading medicines...
          </div>
        ) : medicines.length === 0 ? (
          <div className="py-12 text-center text-sm text-gray-500">
            No medicines found.
          </div>
        ) : (
          <>
            {/* TABLE CONTAINER — NO PAGE SCROLL */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-blue-900 text-white text-xs uppercase">
                  <tr>
                    <th className="px-4 py-3">Brand</th>
                    <th className="px-4 py-3 hidden sm:table-cell">Generic</th>
                    <th className="px-4 py-3 hidden md:table-cell">Batch</th>
                    <th className="px-4 py-3">Store</th>
                    <th className="px-4 py-3 hidden sm:table-cell">Dispenser</th>
                    <th className="px-4 py-3 hidden md:table-cell">Expiry</th>
                    <th className="px-4 py-3 hidden lg:table-cell">Price</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-center">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y">
                  {medicines.map((med) => (
                    <tr key={med._id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium">
                        {med.brandName}
                      </td>

                      <td className="px-4 py-3 hidden sm:table-cell">
                        {med.genericName}
                      </td>

                      <td className="px-4 py-3 hidden md:table-cell">
                        {med.batchNumber}
                      </td>

                      <td className="px-4 py-3 font-semibold text-blue-700">
                        {med.unitQuantity}
                      </td>

                      <td className="px-4 py-3 hidden sm:table-cell font-semibold text-green-700">
                        {med.stockDispenser}
                      </td>

                      <td className="px-4 py-3 hidden md:table-cell">
                        {new Date(med.expiryDate).toLocaleDateString()}
                      </td>

                      <td className="px-4 py-3 hidden lg:table-cell">
                        ${med.sellingPrice?.toFixed(2)}
                      </td>

                      <td className="px-4 py-3">
                        <StatusBadge status={med.status} />
                      </td>

                      <td className="px-4 py-3">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => setSelectedMedicine(med)}
                            title="Edit"
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <Pencil size={16} />
                          </button>

                          <button
                            onClick={() => setSelectedMedicineId(med._id)}
                            title="Delete"
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 size={16} />
                          </button>

                          <button
                            onClick={() => setSelectedMoveMedicine(med)}
                            title="Move to Dispenser"
                            className="flex items-center gap-1 rounded-md bg-green-600 px-2 py-1 text-xs text-white hover:bg-green-700"
                          >
                            <ArrowRightCircle size={14} />
                            Move
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Pagination
              total={total}
              page={page}
              perPage={perPage}
              onPageChange={setPage}
            />
          </>
        )}
      </div>

      {/* MODALS */}
      {selectedMedicineId && (
        <DeleteModal
          medicineId={selectedMedicineId}
          onClose={() => setSelectedMedicineId(null)}
        />
      )}

      {selectedMedicine && (
        <EditMedicineModal
          medicine={selectedMedicine}
          open
          onClose={() => setSelectedMedicine(null)}
        />
      )}

      {selectedMoveMedicine && (
        <MoveToDispenserModal
          medicine={selectedMoveMedicine}
          open
          onClose={() => setSelectedMoveMedicine(null)}
        />
      )}
    </>
  )
}

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
  const { medicines, loading, error, fetchMedicines, total } = useMedicineStore()
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
  }, [searchQuery, statusFilter, sortBy, order, page])

  const handleDeleteClick = (id: string) => setSelectedMedicineId(id)
  const handleEditClick = (medicine: Medicine) => setSelectedMedicine(medicine)
  const handleMoveClick = (medicine: Medicine) => setSelectedMoveMedicine(medicine)

  return (
    <>
      <div className="mt-6 bg-white border border-gray-200 rounded-xl shadow-sm overflow-x-auto">
        {loading ? (
          <div className="text-center py-12 text-gray-500 text-sm">Loading medicines...</div>
        ) : medicines.length === 0 ? (
          <div className="text-center py-12 text-gray-500 text-sm">No medicines found.</div>
        ) : (
          <>
            <table className="w-full text-sm text-left min-w-[900px]">
              <thead className="bg-blue-900 text-white text-xs uppercase">
                <tr>
                  <th className="px-4 py-3">Brand</th>
                  <th className="px-4 py-3 hidden sm:table-cell">Generic</th>
                  <th className="px-4 py-3 hidden md:table-cell">Batch</th>
                  <th className="px-4 py-3">Stock Store</th>
                  <th className="px-4 py-3">Stock Dispenser</th>
                  <th className="px-4 py-3 hidden sm:table-cell">Expiry</th>
                  <th className="px-4 py-3 hidden lg:table-cell">Price/Unit</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y">
                {medicines.map((med) => (
                  <tr key={med._id} className="hover:bg-gray-50 transition-all">
                    <td className="px-4 py-3 font-medium">{med.brandName}</td>
                    <td className="px-4 py-3 hidden sm:table-cell">{med.genericName}</td>
                    <td className="px-4 py-3 hidden md:table-cell">{med.batchNumber}</td>
                    <td className="px-4 py-3 font-semibold text-blue-700">{med.unitQuantity}</td>
                    <td className="px-4 py-3 font-semibold text-green-700">{med.stockDispenser}</td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      {new Date(med.expiryDate).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      ${med.sellingPrice.toFixed(2)}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={med.status} />
                    </td>
                    <td className="px-4 py-3 text-center space-x-2 whitespace-nowrap">
                      <button
                        onClick={() => handleEditClick(med)}
                        title="Edit"
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(med._id)}
                        title="Delete"
                        className="text-red-600 hover:text-red-800 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                      <button
                        onClick={() => handleMoveClick(med)}
                        title="Move to Dispenser"
                        className="text-white bg-green-600 hover:bg-green-700 transition-colors px-3 py-1 rounded-md flex items-center gap-1 text-xs"
                      >
                        <ArrowRightCircle size={16} />
                        Move
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <Pagination total={total} page={page} perPage={perPage} onPageChange={setPage} />
          </>
        )}
      </div>

      {/* Modals */}
      {selectedMedicineId && (
        <DeleteModal medicineId={selectedMedicineId} onClose={() => setSelectedMedicineId(null)} />
      )}
      {selectedMedicine && (
        <EditMedicineModal medicine={selectedMedicine} open={!!selectedMedicine} onClose={() => setSelectedMedicine(null)} />
      )}
      {selectedMoveMedicine && (
        <MoveToDispenserModal medicine={selectedMoveMedicine} open={!!selectedMoveMedicine} onClose={() => setSelectedMoveMedicine(null)} />
      )}
    </>
  )
}

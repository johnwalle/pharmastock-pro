'use client'

import { useEffect, useState } from 'react'
import { Pencil, Trash2 } from 'lucide-react'

import StatusBadge from './statusBadge'
import Pagination from './pagination'
import DeleteModal from './deleteModal'
import EditMedicineModal from './editMedicineModal'

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

  const handleDeleteClick = (id: string) => {
    setSelectedMedicineId(id)
  }

  const handleEditClick = (medicine: Medicine) => {
    setSelectedMedicine(medicine)
  }

  return (
    <>
      {/* Table Card */}
      <div className="mt-6 bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        {medicines.length === 0 ? (
          <div className="text-center py-12 text-gray-500 text-sm">No medicines found.</div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-left">
                <thead className="bg-blue-900 text-white text-xs uppercase">
                  <tr>
                    <th className="px-4 py-3">Brand</th>
                    <th className="px-4 py-3 hidden sm:table-cell">Generic</th>
                    <th className="px-4 py-3">Batch</th>
                    <th className="px-4 py-3">Stock</th>
                    <th className="px-4 py-3">Expiry</th>
                    <th className="px-4 py-3 hidden md:table-cell">Price/Unit</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {medicines.map((med) => (
                    <tr key={med._id} className="border-t hover:bg-gray-50 transition-all">
                      <td className="px-4 py-3 font-medium">{med.brandName}</td>
                      <td className="px-4 py-3 hidden sm:table-cell">{med.genericName}</td>
                      <td className="px-4 py-3">{med.batchNumber}</td>
                      <td className="px-4 py-3">{med.currentStockLevel}</td>
                      <td className="px-4 py-3">
                        {new Date(med.expiryDate).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        ${med.pricePerUnit.toFixed(2)}
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge status={med.status} />
                      </td>
                      <td className="px-4 py-3 text-center space-x-2">
                        <button
                          onClick={() => handleEditClick(med)}
                          title="Edit"
                          className="text-blue-600 cursor-pointer hover:text-blue-800 transition"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(med._id)}
                          title="Delete"
                          className="text-red-600 cursor-pointer hover:text-red-800 transition"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <Pagination total={total} page={page} perPage={perPage} onPageChange={setPage} />
          </>
        )}
      </div>

      {/* Delete Modal */}
      {selectedMedicineId && (
        <DeleteModal
          medicineId={selectedMedicineId}
          onClose={() => setSelectedMedicineId(null)}
        />
      )}

      {/* Edit Modal */}
      {selectedMedicine && (
        <EditMedicineModal
          medicine={selectedMedicine}
          open={!!selectedMedicine}
          onClose={() => setSelectedMedicine(null)}
        />
      )}
    </>
  )
}

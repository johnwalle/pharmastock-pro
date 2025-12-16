'use client'

import { useState } from 'react'
import { X, ArrowRightCircle } from 'lucide-react'
import clsx from 'clsx'
import { Medicine } from '@/types/medicines'
import { useMedicineStore } from '@/store/medicineStore'

interface MoveToDispenserModalProps {
  medicine: Medicine
  open: boolean
  onClose: () => void
}

export default function MoveToDispenserModal({ medicine, open, onClose }: MoveToDispenserModalProps) {
  const { moveStockToDispenser } = useMedicineStore()
  const [quantity, setQuantity] = useState<number>(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  if (!open) return null

  const handleSubmit = async () => {
    setError('')
    if (quantity <= 0) {
      setError('Please enter a quantity greater than 0')
      return
    }
    if (quantity > medicine.unitQuantity) {
      setError('Cannot move more than available in store')
      return
    }

    try {
      setLoading(true)
      await moveStockToDispenser(medicine._id, quantity)
      setLoading(false)
      setQuantity(0)
      onClose()
    } catch (_) {
      setError('Failed to move stock. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 relative animate-fadeIn">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Move to Dispenser</h2>

        {/* Medicine Info */}
        <div className="mb-4 border-b border-gray-200 pb-4">
          <p className="text-lg font-medium text-gray-700">
            {medicine.brandName} ({medicine.strength})
          </p>
          <p className="text-sm text-gray-500">Batch: {medicine.batchNumber}</p>
          <div className="flex justify-between mt-2 text-sm">
            <span>
              Store: <span className="font-semibold text-blue-600">{medicine.unitQuantity}</span>
            </span>
            <span>
              Dispenser: <span className="font-semibold text-green-600">{medicine.stockDispenser}</span>
            </span>
          </div>
        </div>

        {/* Quantity Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Quantity to move *
          </label>
          <input
            type="number"
            min={1}
            max={medicine.unitQuantity}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          {error && <p className="text-red-600 text-xs mt-1">{error}</p>}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className={clsx(
              'px-4 py-2 rounded-md text-white bg-green-600 hover:bg-green-700 flex items-center gap-2 transition',
              loading && 'opacity-50 cursor-not-allowed'
            )}
          >
            <ArrowRightCircle size={16} />
            {loading ? 'Moving...' : 'Move'}
          </button>
        </div>
      </div>
    </div>
  )
}

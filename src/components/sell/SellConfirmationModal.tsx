'use client';

import { useState } from 'react';
import { Medicine } from '@/types/medicines';
import useSell from '@/hooks/useSell';

interface SellConfirmationModalProps {
  medicine: Medicine;
  open: boolean;
  onClose: () => void;
}

export default function SellConfirmationModal({
  medicine,
  open,
  onClose,
}: SellConfirmationModalProps) {
  const [quantity, setQuantity] = useState(1);
  const { sell, isLoading } = useSell();

  if (!open) return null;

  const handleSubmit = async () => {
    if (quantity <= 0 || quantity > medicine.currentStockLevel) {
      alert(`Quantity must be between 1 and ${medicine.currentStockLevel}`);
      return;
    }

    await sell({
      medicineId: medicine._id,
      quantity,
    });

    setQuantity(1);
    onClose(); // Close modal after selling
  };

  return (
    <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-white border border-gray-200 shadow-xl rounded-xl p-6 w-[90vw] max-w-md">
        <h2 className="text-xl font-semibold mb-2">Sell Medicine</h2>

        <p className="text-sm text-gray-600 mb-4">
          You’re about to sell <strong>{medicine.brandName}</strong> (Batch: {medicine.batchNumber}).
          <br />
          <span className="text-xs text-gray-500">
            Stock available: {medicine.currentStockLevel}
          </span>
        </p>

        <div className="mb-4">
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
            Quantity to Sell
          </label>
          <input
            id="quantity"
            type="number"
            min={1}
            max={medicine.currentStockLevel}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>

        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 disabled:opacity-70"
          >
            {isLoading ? 'Selling...' : 'Confirm Sell'}
          </button>
        </div>
      </div>
    </div>
  );
}

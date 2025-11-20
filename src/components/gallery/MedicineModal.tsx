'use client';

import Image from 'next/image';
import { Medicine } from '@/types/medicines';

interface Props {
  medicine: Medicine;
  onClose: () => void;
}

export default function MedicineModal({ medicine, onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="relative bg-white w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-xl shadow-xl border border-gray-200">

        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute cursor-pointer top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-black transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex flex-col md:flex-row gap-4 p-5">
          {/* Image */}
          <div className="md:w-[40%] w-full flex items-center justify-center bg-gray-50 rounded-lg p-4 border">
            <div className="relative w-full h-48">
              <Image
                src={medicine.imageURL || '/images/placeholder.png'}
                alt={medicine.brandName}
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Details */}
          <div className="md:w-[60%] w-full space-y-4">

            {/* Title */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{medicine.brandName}</h2>
              <p className="text-sm text-gray-500 italic">
                {medicine.genericName} ({medicine.strength}, {medicine.dosageForm})
              </p>
            </div>

            {/* Stock Section */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-100 p-3 rounded-lg border text-center">
                <div className="text-xs text-gray-600">Store Stock</div>
                <div className="text-lg font-semibold text-gray-800">{medicine.unitQuantity}</div>
              </div>

              <div className="bg-gray-100 p-3 rounded-lg border text-center">
                <div className="text-xs text-gray-600">Dispenser Stock</div>
                <div className="text-lg font-semibold text-gray-800">
                  {medicine.stockDispenser ?? 0}
                </div>
              </div>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">

              <div>
                <span className="font-medium text-gray-700">Batch #:</span>
                <div className="text-gray-800">{medicine.batchNumber}</div>
              </div>

              <div>
                <span className="font-medium text-gray-700">Unit Type:</span>
                <div className="text-gray-800">{medicine.unitType}</div>
              </div>

              {medicine.subUnitQuantity !== undefined && (
                <div>
                  <span className="font-medium text-gray-700">Sub-unit per unit:</span>
                  <div className="text-gray-800">{medicine.subUnitQuantity}</div>
                </div>
              )}

              <div>
                <span className="font-medium text-gray-700">Reorder Level:</span>
                <div className="text-gray-800">{medicine.reorderThreshold}</div>
              </div>

              <div>
                <span className="font-medium text-gray-700">Reorder Qty:</span>
                <div className="text-gray-800">{medicine.reorderQuantity}</div>
              </div>

              <div>
                <span className="font-medium text-gray-700">Selling Price:</span>
                <div className="text-gray-800">${medicine.sellingPrice.toFixed(2)}</div>
              </div>

              <div>
                <span className="font-medium text-gray-700">Received Date:</span>
                <div className="text-gray-800">{medicine.receivedDate}</div>
              </div>

              <div>
                <span className="font-medium text-gray-700">Expiry Date:</span>
                <div className="text-gray-800">{medicine.expiryDate}</div>
              </div>

              {medicine.storageConditions && (
                <div>
                  <span className="font-medium text-gray-700">Storage Conditions:</span>
                  <div className="text-gray-800">{medicine.storageConditions}</div>
                </div>
              )}

              {medicine.storageLocation && (
                <div>
                  <span className="font-medium text-gray-700">Location:</span>
                  <div className="text-gray-800">{medicine.storageLocation}</div>
                </div>
              )}

              {medicine.supplierInfo && (
                <div>
                  <span className="font-medium text-gray-700">Supplier:</span>
                  <div className="text-gray-800">{medicine.supplierInfo}</div>
                </div>
              )}

              <div>
                <span className="font-medium text-gray-700">Prescription:</span>
                <div className="text-gray-800">{medicine.prescriptionStatus}</div>
              </div>

              {medicine.status && (
                <div>
                  <span className="font-medium text-gray-700">Status:</span>
                  <div className="text-gray-800 capitalize">{medicine.status}</div>
                </div>
              )}
            </div>

            {/* Notes */}
            {medicine.notes && (
              <div className="mt-2 bg-gray-50 rounded-md p-3 border text-sm">
                <span className="font-medium text-gray-700">Notes:</span>{' '}
                <span className="text-gray-800">{medicine.notes}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

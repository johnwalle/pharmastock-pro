import Image from 'next/image';
import { Medicine } from '@/types/medicines';

interface Props {
  medicine: Medicine;
  onClose: () => void;
}

export default function MedicineModal({ medicine, onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="relative bg-white w-full max-w-3xl rounded-xl shadow-xl overflow-hidden">

        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute cursor-pointer top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-black shadow-sm transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="flex flex-col md:flex-row gap-4">
          {/* Image */}
          <div className="md:w-[45%] w-full bg-gray-50 flex items-center justify-center p-4 border-r md:border-r border-b md:border-b-0">
            <div className="relative w-full h-60">
              <Image
                src={medicine.imageURL || '/images/placeholder.png'}
                alt={medicine.brandName}
                fill
                className="object-contain rounded-md"
              />
            </div>
          </div>

          {/* Details */}
          <div className="md:w-[55%] w-full p-5">
            {/* Heading */}
            <h2 className="text-xl font-bold text-neutral-900 mb-1">
              {medicine.brandName}
            </h2>
            <p className="text-sm text-gray-500 italic mb-4">
              {medicine.genericName} ({medicine.strength}, {medicine.dosageForm})
            </p>

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <div>
                <span className="font-medium text-gray-700">Batch:</span>
                <div className="text-gray-800">{medicine.batchNumber}</div>
              </div>
              <div>
                <span className="font-medium text-gray-700">Quantity:</span>
                <div className="text-gray-800">{medicine.currentStockLevel} units</div>
              </div>
              <div>
                <span className="font-medium text-gray-700">Reorder Level:</span>
                <div className="text-gray-800">{medicine.reorderThreshold}</div>
              </div>
              <div>
                <span className="font-medium text-gray-700">Reorder Qty:</span>
                <div className="text-gray-800">{medicine.reorderQuantity}</div>
              </div>
              <div>
                <span className="font-medium text-gray-700">Unit Price:</span>
                <div className="text-gray-800">${medicine.pricePerUnit.toFixed(2)}</div>
              </div>
              <div>
                <span className="font-medium text-gray-700">Received:</span>
                <div className="text-gray-800">{medicine.receivedDate}</div>
              </div>
              <div>
                <span className="font-medium text-gray-700">Expiry:</span>
                <div className="text-gray-800">{medicine.expiryDate}</div>
              </div>
              <div>
                <span className="font-medium text-gray-700">Storage:</span>
                <div className="text-gray-800">{medicine.storageConditions}</div>
              </div>
              <div>
                <span className="font-medium text-gray-700">Location:</span>
                <div className="text-gray-800">{medicine.storageLocation}</div>
              </div>
              <div>
                <span className="font-medium text-gray-700">Supplier:</span>
                <div className="text-gray-800">{medicine.supplierInfo}</div>
              </div>
              <div>
                <span className="font-medium text-gray-700">Prescription:</span>
                <div className="text-gray-800">{medicine.prescriptionStatus}</div>
              </div>
              <div>
                <span className="font-medium text-gray-700">Status:</span>
                <div className="text-gray-800 capitalize">{medicine.status}</div>
              </div>
            </div>

            {/* Notes */}
            {medicine.notes && (
              <div className="mt-4 bg-gray-50 rounded-md p-3 border text-sm">
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

import Image from 'next/image';
import { Medicine } from '@/types/medicines';

interface Props {
  medicine: Medicine;
  onClick: () => void;
}

export default function MedicineCard({ medicine, onClick }: Props) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-700';
      case 'low-stock':
        return 'bg-yellow-100 text-yellow-800';
      case 'expired':
        return 'bg-gray-200 text-gray-600';
      case 'out-of-stock':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const formattedDate = new Date(medicine.expiryDate).toLocaleDateString();

  return (
    <div
      onClick={onClick}
      className="cursor-pointer rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-200 overflow-hidden bg-white group"
    >
      {/* Image Section */}
      <div className="relative w-full h-48 bg-gray-50">
        <Image
          src={medicine.imageURL || '/images/placeholder.png'}
          alt={medicine.brandName}
          fill
          className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Info Section */}
      <div className="p-4 space-y-2">
        <div className="flex justify-between items-start">
          <h2 className="text-lg font-semibold text-gray-800 truncate">
            {medicine.brandName}
          </h2>
          <span
            className={`text-xs font-semibold px-2 py-1 rounded-full ${getStatusColor(
              medicine.status
            )}`}
          >
            {medicine.status.replace('-', ' ')}
          </span>
        </div>

        <p className="text-sm text-gray-500 italic truncate">
          {medicine.genericName}
        </p>

        <div className="text-sm text-gray-600">
          <span className="font-medium">Batch:</span> {medicine.batchNumber}
        </div>

        <div className="flex items-center justify-between text-sm text-gray-700">
          <div>
            <span className="font-medium">Qty:</span> {medicine.currentStockLevel}
          </div>
          <div>
            <span className="font-medium">Exp:</span> {formattedDate}
          </div>
        </div>
      </div>
    </div>
  );
}

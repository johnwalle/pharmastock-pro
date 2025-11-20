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

  // Correct total stock
  const totalStock =
    (medicine.unitQuantity || 0) +
    (medicine.stockDispenser || 0);

  return (
    <div
      onClick={onClick}
      className="cursor-pointer rounded-xl border border-gray-200 hover:shadow-xl transition-all duration-300 overflow-hidden bg-white group hover:-translate-y-1"
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
      <div className="p-4 space-y-3">
        {/* Header Row */}
        <div className="flex justify-between items-start">
          <h2 className="text-lg font-bold text-gray-900 leading-tight truncate">
            {medicine.brandName}
          </h2>

          <span
            className={`text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm ${getStatusColor(
              medicine.status
            )}`}
          >
            {medicine.status.replace('-', ' ')}
          </span>
        </div>

        {/* Generic */}
        <p className="text-sm text-gray-500 italic truncate">
          {medicine.genericName}
        </p>

        {/* Batch + Price */}
        <div className="flex justify-between text-sm">
          <div className="text-gray-600">
            <span className="font-medium">Batch:</span> {medicine.batchNumber}
          </div>
          <div className="font-semibold text-gray-800">
            ${medicine.sellingPrice.toFixed(2)}
          </div>
        </div>

        {/* Stock Row */}
        <div className="flex justify-between items-center text-sm text-gray-700">
          <div>
            <span className="font-medium">Stock:</span> {totalStock} units
          </div>
          <div>
            <span className="font-medium">Exp:</span> {formattedDate}
          </div>
        </div>

        {/* Units */}
        <div className="text-xs text-gray-500 mt-1">
          {medicine.unitQuantity} {medicine.unitType}
          {medicine.subUnitQuantity
            ? ` • ${medicine.subUnitQuantity} sub-units`
            : ''}
        </div>
      </div>
    </div>
  );
}

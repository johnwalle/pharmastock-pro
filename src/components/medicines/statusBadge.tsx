// components/statusBadge.tsx

export type Status = 'available' | 'low-stock' | 'out-of-stock' | 'expired';

// Validation to check if a string is a valid Status
export const isValidStatus = (value: string): value is Status =>
  ['available', 'low-stock', 'out-of-stock', 'expired'].includes(value);

export const normalizeStatus = (value: string): Status =>
  isValidStatus(value) ? value : 'low-stock'; // fallback to 'low-stock'

// Styling classes for each status
const statusStyles: Record<Status, string> = {
  'available': 'bg-green-100 text-green-800',
  'low-stock': 'bg-yellow-100 text-yellow-800',
  'out-of-stock': 'bg-red-100 text-red-800',
  'expired': 'bg-gray-200 text-gray-800',
};

const dotColors: Record<Status, string> = {
  'available': 'bg-green-500',
  'low-stock': 'bg-yellow-500',
  'out-of-stock': 'bg-red-500',
  'expired': 'bg-gray-500',
};

interface StatusBadgeProps {
  status: Status;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold
        ${statusStyles[status]} shadow-sm
        transition-all duration-200
      `}
    >
      {/* Colored Dot */}
      <span className={`w-2 h-2 rounded-full ${dotColors[status]}`} />
      {/* Status Text */}
      {status.replace('-', ' ')}
    </span>
  )
}

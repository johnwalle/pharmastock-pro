// components/statusBadge.tsx

export type Status = 'available' | 'low-stock' | 'out-of-stock';


// Validation to check if a string is a valid Status
export const isValidStatus = (value: string): value is Status =>
    ['available', 'low-stock', 'out-of-stock'].includes(value);

export const normalizeStatus = (value: string): Status =>
    isValidStatus(value) ? value : 'low-stock'; // fallback to 'low-stock'

// Styling classes for each status
const statusStyles: Record<Status, string> = {
    "available": 'bg-green-100 text-green-800',
    'low-stock': 'bg-yellow-100 text-yellow-800',
    'out-of-stock': 'bg-red-100 text-red-800',
};

export default function StatusBadge({ status }: { status: Status }) {
    return (
        <span
            className={`px-2 py-1 text-xs font-medium rounded-full ${statusStyles[status]}`}
        >
            {status.replace('-', ' ').toLowerCase()}
        </span>
    );
}

// components/statusBadge.tsx

export type Status = 'active' | 'inactive' | 'discontinued' | 'out-of-stock';

// Validation to check if a string is a valid Status
export const isValidStatus = (value: string): value is Status =>
    ['active', 'inactive', 'discontinued', 'out-of-stock'].includes(value);

export const normalizeStatus = (value: string): Status =>
    isValidStatus(value) ? value : 'active'; // fallback to 'active'

// Styling classes for each status
const statusStyles: Record<Status, string> = {
    active: 'bg-green-100 text-green-800',
    inactive: 'bg-gray-100 text-gray-700',
    discontinued: 'bg-red-100 text-red-800',
    'out-of-stock': 'bg-yellow-100 text-yellow-800',
};

export default function StatusBadge({ status }: { status: Status }) {
    return (
        <span
            className={`px-2 py-1 text-xs font-medium rounded-full ${statusStyles[status]}`}
        >
            {status.replace('-', ' ').toUpperCase()}
        </span>
    );
}

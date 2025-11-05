import Image from 'next/image';
import { AuditLogEntry } from '@/types/auditLog';

interface Props {
  entries: AuditLogEntry[];
}

const actionColors: Record<string, string> = {
  Add: 'bg-green-100 text-green-800',
  Edit: 'bg-blue-100 text-blue-800',
  Delete: 'bg-red-100 text-red-800',
  Sell: 'bg-purple-100 text-purple-800',
};

export const AuditLogTable = ({ entries }: Props) => {
  return (
    <table className="w-full border text-sm">
      <thead className="bg-blue-900 text-white">
        <tr>
          <th className="text-left px-4 py-2">User</th>
          <th className="text-left px-4 py-2">Action Type</th>
          <th className="text-left px-4 py-2">Timestamp</th>
          <th className="text-left px-4 py-2">Details</th>
        </tr>
      </thead>
      <tbody>
        {entries.map((log) => (
          <tr key={log._id} className="border-b">
            <td className="px-4 py-2 flex items-center gap-2">
              {log.userName}
            </td>
            <td className="px-4 py-2">
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${actionColors[log.action]}`}>
                {log.action}
              </span>
            </td>
            <td className="px-4 py-2">{log.timestamp}</td>
            <td className="px-4 py-2">{log.details}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

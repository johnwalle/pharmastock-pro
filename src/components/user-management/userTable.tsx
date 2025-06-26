'use client';

import Image from 'next/image';
import { User } from '@/types/user';
import { Pencil, UserX } from 'lucide-react';

interface Props {
  users: User[];
  onEdit: (user: User) => void;
  onDeactivate: (user: User) => void;
}

export const UserTable = ({ users, onEdit, onDeactivate }: Props) => {
  const roleColor = {
    Admin: 'bg-blue-100 text-blue-800',
    Pharmacist: 'bg-purple-100 text-purple-800',
  };

  return (
    <div className="overflow-hidden border rounded-lg">
      <table className="w-full text-sm">
        <thead className="bg-blue-900 text-white">
          <tr>
            <th className="text-left px-4 py-2">Name</th>
            <th className="text-left px-4 py-2">Email</th>
            <th className="text-left px-4 py-2">Role</th>
            <th className="text-left px-4 py-2">Status</th>
            <th className="text-left px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-t">
              <td className="flex items-center gap-2 px-4 py-2">
                <Image src={u.avatar} width={32} height={32} alt={u.name} className="rounded-full" />
                {u.name}
              </td>
              <td className="px-4 py-2">{u.email}</td>
              <td className="px-4 py-2">
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${roleColor[u.role]}`}>
                  {u.role}
                </span>
              </td>
              <td className="px-4 py-2">
                <span className="text-green-600 bg-green-100 px-2 py-1 rounded-full text-xs">
                  {u.status}
                </span>
              </td>
              <td className="px-4 py-2 flex gap-3">
                <button onClick={() => onEdit(u)} title="Edit user">
                  <Pencil className="w-4 h-4 text-blue-600" />
                </button>
                <button onClick={() => onDeactivate(u)} title="Deactivate user">
                  <UserX className="w-4 h-4 text-red-600" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

'use client';

import { useState } from 'react';
import { User } from '@/types/user';
import { UserTable } from './userTable';
import { AddUserModal } from './addUserModal';
import { EditUserModal } from './editUserModal';
import { ConfirmDeactivateModal } from './confirmDeactivateModal';

export default function UserManagementPage() {
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@pharma.com',
      role: 'Admin',
      status: 'Active',
      avatar: '/avatar1.png',
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.j@pharma.com',
      role: 'Pharmacist',
      status: 'Active',
      avatar: '/avatar2.png',
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deactivatingUser, setDeactivatingUser] = useState<User | null>(null);

  const handleAddUser = (name: string, email: string) => {
    setUsers((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        name,
        email,
        role: 'Pharmacist',
        status: 'Active',
        avatar: '/default.png',
      },
    ]);
  };

  const handleEditUser = (updated: User) => {
    setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
    setEditingUser(null);
  };

  const handleDeactivateUser = () => {
    if (deactivatingUser) {
      setUsers((prev) =>
        prev.map((u) =>
          u.id === deactivatingUser.id ? { ...u, status: 'Inactive' } : u
        )
      );
      setDeactivatingUser(null);
    }
  };

  return (
    <main className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">User Management</h1>
          <p className="text-gray-600">Manage system users and their permissions</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          + Add User
        </button>
      </div>

      <UserTable
        users={users}
        onEdit={(user) => setEditingUser(user)}
        onDeactivate={(user) => setDeactivatingUser(user)}
      />

      {/* Add Modal */}
      <AddUserModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={handleAddUser}
      />

      {/* Edit Modal */}
      <EditUserModal
        user={editingUser}
        isOpen={!!editingUser}
        onClose={() => setEditingUser(null)}
        onSave={handleEditUser}
      />

      {/* Confirm Deactivate Modal */}
      <ConfirmDeactivateModal
        user={deactivatingUser}
        isOpen={!!deactivatingUser}
        onClose={() => setDeactivatingUser(null)}
        onConfirm={handleDeactivateUser}
      />
    </main>
  );
}

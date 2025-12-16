'use client';

import { useEffect, useState } from 'react';
import { User } from '@/types/user';
import { UserTable } from './userTable';
import { AddUserModal } from './addUserModal';
import { EditUserModal } from './editUserModal';
import { ConfirmDeactivateModal } from './confirmDeactivateModal';
import useUserManagement from '@/hooks/useUserManagement';
import authStore from '@/store/authStore';
import toast from 'react-hot-toast';

type Role = 'admin' | 'pharmacist' | 'manager';
const allowedRoles: Role[] = ['admin', 'pharmacist', 'manager'];

export default function UserManagementPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deactivatingUser, setDeactivatingUser] = useState<User | null>(null);
  const [refresh, setRefresh] = useState(false);

  const {
    updateUserByAdmin,
    deleteUserByAdmin,
    isLoading,
  } = useUserManagement();

  const fetchUsers = async () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const { userData } = authStore.getState();
    const token = userData?.tokens?.access?.token;

    if (!apiUrl || !token) {
      toast.error('Missing API URL or authorization token');
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setUsers(data?.data || []);
      } else {
        toast.error(data?.message || 'Failed to fetch users');
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to load users';
      toast.error(message);
    }

  };

  useEffect(() => {
    fetchUsers();
  }, [refresh]);

  const handleEditUser = (updatedUser: User) => {
    const { _id, fullName, email, role } = updatedUser;
    // Ensure role is valid
    const safeRole: Role = allowedRoles.includes(role as Role)
      ? (role as Role)
      : 'pharmacist'; // default fallback

    updateUserByAdmin(
      _id,
      { fullName, email, role: safeRole },
      () => {
        setEditingUser(null);
        setRefresh((prev) => !prev);
      }
    );
  };

  const handleDeactivateUser = () => {
    if (!deactivatingUser) return;

    deleteUserByAdmin(deactivatingUser._id, () => {
      setDeactivatingUser(null);
      setRefresh((prev) => !prev);
    });
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
          className="bg-green-600 cursor-pointer text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          + Add User
        </button>
      </div>

      {isLoading && <p className="text-blue-600 mb-4">Loading...</p>}
      {/* {error && <p className="text-red-600 mb-4">Error: {error}</p>} */}

      <UserTable
        users={users}
        onEdit={(user) => setEditingUser(user)}
        onDeactivate={(user) => setDeactivatingUser(user)}
      />

      {/* Add User Modal */}

      <AddUserModal
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          setRefresh((prev) => !prev);
        }}
      />

      {/* Edit User Modal */}
      <EditUserModal
        user={editingUser}
        isOpen={!!editingUser}
        onClose={() => setEditingUser(null)}
        onSave={handleEditUser}
      />

      {/* Confirm Deactivation Modal */}
      <ConfirmDeactivateModal
        user={deactivatingUser}
        isOpen={!!deactivatingUser}
        onClose={() => setDeactivatingUser(null)}
        onConfirm={handleDeactivateUser}
      />
    </main>
  );
}

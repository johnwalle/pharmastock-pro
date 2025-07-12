'use client';

import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import { z } from 'zod';
import toast from 'react-hot-toast';
import useUserManagement from '@/hooks/useUserManagement';

const AddUserSchema = z.object({
  fullName: z
    .string()
    .min(1, 'Full name is required')
    .refine((val) => val.trim().split(/\s+/).length >= 2, {
      message: 'Full name must include both first and last name',
    }),
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .refine((val) => /[A-Z]/.test(val), {
      message: 'Password must contain at least one uppercase letter',
    })
    .refine((val) => /[a-z]/.test(val), {
      message: 'Password must contain at least one lowercase letter',
    })
    .refine((val) => /\d/.test(val), {
      message: 'Password must contain at least one number',
    })
    .refine((val) => /[!@#$%^&*(),.?":{}|<>]/.test(val), {
      message: 'Password must contain at least one special character',
    }),
  role: z.enum(['admin', 'pharmacist', 'manager'], {
    errorMap: () => ({ message: 'Invalid role selected' }),
  }),
});

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const AddUserModal = ({ isOpen, onClose }: Props) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'admin' | 'pharmacist' | 'manager'>('pharmacist');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { createUserByAdmin, isLoading } = useUserManagement();

  useEffect(() => {
    if (!isOpen) {
      setFullName('');
      setEmail('');
      setRole('pharmacist');
      setPassword('');
      setErrors({});
    }
  }, [isOpen]);

  const handleSubmit = async () => {
    const result = AddUserSchema.safeParse({ fullName, email, role, password });

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0];
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    try {
      await createUserByAdmin({ fullName, email, role, password });
      onClose(); // Trigger refresh from parent
    } catch (err: any) {
      toast.error(err?.message || 'Failed to create user');
    }
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* 🔥 Removed background overlay for full transparency */}

        <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
          <Dialog.Panel className="pointer-events-auto bg-white rounded-lg p-6 w-full max-w-md shadow-xl border">
            <Dialog.Title className="text-xl font-bold mb-4">Add New User</Dialog.Title>

            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full border p-2 rounded"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
                {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full border p-2 rounded"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>

              <div>
                <select
                  className="w-full border p-2 rounded"
                  value={role}
                  onChange={(e) =>
                    setRole(e.target.value as 'admin' | 'pharmacist' | 'manager')
                  }
                >
                  <option value="admin">Admin</option>
                  <option value="pharmacist">Pharmacist</option>
                  <option value="manager">Manager</option>
                </select>
                {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}
              </div>

              <div>
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full border p-2 rounded"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
              </div>
            </div>

            <div className="flex justify-end mt-6 gap-2">
              <button
                onClick={onClose}
                className="px-4 cursor-pointer py-2 border rounded disabled:opacity-50"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 cursor-pointer bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
                disabled={isLoading}
              >
                {isLoading ? 'Saving...' : 'Save'}
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition>
  );
};

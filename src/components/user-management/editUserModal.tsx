'use client';

import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import { User } from '@/types/user';
import { z } from 'zod';

const EditUserSchema = z.object({
  fullName: z
    .string()
    .min(1, 'Full name is required')
    .refine((val) => val.trim().split(/\s+/).length >= 2, {
      message: 'Full name must include both first and last name',
    }),
  email: z.string().email('Invalid email address'),
  role: z.enum(['admin', 'pharmacist', 'manager'], {
    errorMap: () => ({ message: 'Invalid role selected' }),
  }),
});

interface Props {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedUser: User) => void;
}

export const EditUserModal = ({ user, isOpen, onClose, onSave }: Props) => {
  console.log("EditUserModal opened for user:", user);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'admin' | 'pharmacist' | 'manager'>('pharmacist');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // When modal opens, populate fields from user
  useEffect(() => {
    if (isOpen && user) {
      setFullName(user.fullName || '');
      setEmail(user.email || '');
      setRole((user.role as 'admin' | 'pharmacist' | 'manager') || 'pharmacist');
      setErrors({});
    }
  }, [isOpen, user]);

  if (!user) return null;

  const handleSubmit = () => {
    console.log("Submitting user data:", { fullName, email, role });
    const trimmedData = {
      fullName: fullName.trim(),
      email: email.trim(),
      role,
    };

    const result = EditUserSchema.safeParse(trimmedData);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0];
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    onSave({
      ...user,
      ...trimmedData,
    });

    onClose();
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          {/* Subtle dark overlay */}
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center px-4">
          <Dialog.Panel className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg border">
            <Dialog.Title className="text-xl font-bold mb-4">Edit User</Dialog.Title>

            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full border p-2 rounded"
                  placeholder="Full Name"
                />
                {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
              </div>

              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border p-2 rounded"
                  placeholder="Email"
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
            </div>

            <div className="flex justify-end mt-6 gap-2">
              <button onClick={onClose} className="px-4 cursor-pointer py-2 border rounded">
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 cursor-pointer py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition>
  );
};

'use client';

import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import { User } from '@/types/user';

interface Props {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedUser: User) => void;
}

export const EditUserModal = ({ user, isOpen, onClose, onSave }: Props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  if (!user) return null;

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0" enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100" leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-30" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center">
          <Dialog.Panel className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <Dialog.Title className="text-xl font-bold mb-4">Edit User</Dialog.Title>

            <div className="space-y-4">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border p-2 rounded"
                placeholder="Name"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border p-2 rounded"
                placeholder="Email"
              />
            </div>

            <div className="flex justify-end mt-6 gap-2">
              <button onClick={onClose} className="px-4 py-2 border rounded">Cancel</button>
              <button
                onClick={() => {
                  onSave({ ...user, name, email });
                  onClose();
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded"
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

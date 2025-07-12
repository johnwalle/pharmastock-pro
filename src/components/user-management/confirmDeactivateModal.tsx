'use client';

import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { User } from '@/types/user';

interface Props {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const ConfirmDeactivateModal = ({ user, isOpen, onClose, onConfirm }: Props) => {
  if (!user) return null;
console.log("ConfirmDeactivateModal opened for user:", user);
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
          {/* Transparent or lightly blurred background */}
          <div className="fixed inset-0 bg-transparent" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center">
          <Dialog.Panel className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <Dialog.Title className="text-lg font-semibold text-gray-900 mb-4">
              Deactivate User
            </Dialog.Title>
            <p className="text-gray-700">
              Are you sure you want to deactivate <strong>{user.fullName}</strong>?
            </p>
            <div className="flex justify-end mt-6 gap-2">
              <button onClick={onClose} className="cursor-pointer px-4 py-2 border rounded">
                Cancel
              </button>
              <button
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
                className="px-4 cursor-pointer py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Deactivate
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition>
  );
};

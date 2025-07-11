import { useMedicineStore } from '@/store/medicineStore';

interface DeleteModalProps {
  medicineId: string;
  onClose: () => void;
}

export default function DeleteModal({ medicineId, onClose }: DeleteModalProps) {
  const { deleteMedicine } = useMedicineStore();

  const handleConfirm = async () => {
    await deleteMedicine(medicineId);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-sm shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete this medicine?
        </p>
        <div className="flex justify-end space-x-3">
          <button onClick={onClose} className="cursor-pointer px-4 py-2 text-sm text-gray-600 hover:underline">
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="cursor-pointer px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

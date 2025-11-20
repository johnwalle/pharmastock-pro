'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import EditMedicineForm from './editMedicineForm';
import useUpdateMedicine from '@/hooks/useUpdateMedicine';
import { Medicine } from '@/types/medicines';

interface EditMedicineModalProps {
  open: boolean;
  onClose: () => void;
  medicine: Medicine;
}

export default function EditMedicineModal({ open, onClose, medicine }: EditMedicineModalProps) {
  const { updateMedicine, isLoading } = useUpdateMedicine();

  const handleFormSubmit = async (formData: FormData) => {
    console.log('the update butttton has been clickedddddd')
    await updateMedicine(medicine._id, formData, onClose);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Medicine</DialogTitle>
        </DialogHeader>

        <EditMedicineForm
          medicine={medicine}
          onClose={onClose}
          onSubmitForm={handleFormSubmit}
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  );
}

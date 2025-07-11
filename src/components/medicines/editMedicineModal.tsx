// components/EditMedicineModal.tsx
'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import EditMedicineForm from "./editMedicineForm"
import { UpdateMedicineFormValues } from "@/validators/medicineSchema"

interface EditMedicineModalProps {
  open: boolean
  onClose: () => void
  medicine: UpdateMedicineFormValues & { _id: string; image?: string }
}

export default function EditMedicineModal({ open, onClose, medicine }: EditMedicineModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Medicine</DialogTitle>
        </DialogHeader>
        <EditMedicineForm medicine={medicine} onClose={onClose} />
      </DialogContent>
    </Dialog>
  )
}

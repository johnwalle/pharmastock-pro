// validators/medicineSchema.ts
import { z } from 'zod';

// Schema for creating a medicine (image is required)
export const createMedicineSchema = z.object({
  brandName: z.string().min(1, 'Brand name is required'),
  genericName: z.string().min(1, 'Generic name is required'),
  dosageForm: z.string().min(1, 'Dosage form is required'),
  strength: z.string().min(1, 'Strength is required'),
  currentStockLevel: z.coerce.number().min(0),
  reorderThreshold: z.coerce.number().min(0),
  reorderQuantity: z.coerce.number().min(0),
  expiryDate: z.string().min(1),
  receivedDate: z.string().min(1),
  batchNumber: z.string().min(1),
  pricePerUnit: z.coerce.number().min(0),
  prescriptionStatus: z.string().min(1),
  storageConditions: z.string().optional(),
  supplierInfo: z.string().optional(),
  storageLocation: z.string().optional(),
  notes: z.string().optional(),

  // 👇 Required image for create
  image: z
    .instanceof(File, { message: 'Image must be a file' })
    .refine((file) => file.size > 0, { message: 'Image is required' }),
});

export const updateMedicineSchema = createMedicineSchema.extend({
  // 👇 Make image optional for update
  image: z
    .instanceof(File, { message: 'Image must be a file' })
    .refine((file) => file.size > 0, { message: 'Image is required' })
    .optional(),
});

// Types
export type CreateMedicineFormValues = z.infer<typeof createMedicineSchema>;
export type UpdateMedicineFormValues = z.infer<typeof updateMedicineSchema>;

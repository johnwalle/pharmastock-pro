import { z } from 'zod';

export const predefinedUnitTypes = [
  'strip', 'pack', 'bottle', 'vial', 'ampoule', 'tube', 'tin', 'sachet', 'each',
] as const;

export const predefinedUnitTypesList = predefinedUnitTypes;

// Base schema without superRefine
const baseMedicineSchema = z.object({
  brandName: z.string().min(1, 'Brand name is required'),
  genericName: z.string().min(1, 'Generic name is required'),
  dosageForm: z.string().min(1, 'Dosage form is required'),
  strength: z.string().min(1, 'Strength is required'),
  batchNumber: z.string().min(1, 'Batch number is required'),

  unitType: z.string().min(1, 'Unit type is required'),
  customUnitType: z.string().optional(),
  unitQuantity: z.coerce.number().min(1, 'Unit quantity must be at least 1'),
  subUnitQuantity: z.coerce.number().min(1).optional(),

  purchaseCost: z.coerce.number().min(0, 'Purchase cost must be ≥ 0'),
  sellingPrice: z.coerce.number().min(0, 'Selling price must be ≥ 0'),
  stockStore: z.coerce.number().min(0, 'Stock in store must be ≥ 0'),
  reorderThreshold: z.coerce.number().min(0, 'Reorder threshold must be ≥ 0'),
  reorderQuantity: z.coerce.number().min(0, 'Reorder quantity must be ≥ 0'),

  receivedDate: z.string().min(1, 'Received date is required'),
  expiryDate: z.string().min(1, 'Expiry date is required'),

  prescriptionStatus: z.string().min(1, 'Prescription status is required'),

  storageConditions: z.string().optional(),
  supplierInfo: z.string().optional(),
  storageLocation: z.string().optional(),
  notes: z.string().optional(),

  image: z.instanceof(File, { message: 'Medicine image is required' })
    .refine((file) => file.size > 0, { message: 'Medicine image is required' }),
});

// Create schema
export const createMedicineSchema = baseMedicineSchema.superRefine((data, ctx) => {
  if (data.unitType === 'other' && (!data.customUnitType || data.customUnitType.trim() === '')) {
    ctx.addIssue({
      path: ['customUnitType'],
      code: z.ZodIssueCode.custom,
      message: 'Custom unit type is required when "Other" is selected',
    });
  }

  const validStatuses = ['Prescription', 'OTC', 'Controlled'];
  if (!validStatuses.includes(data.prescriptionStatus)) {
    ctx.addIssue({
      path: ['prescriptionStatus'],
      code: z.ZodIssueCode.custom,
      message: 'Invalid prescription status',
    });
  }
});

// Update schema: make image optional
export const updateMedicineSchema = baseMedicineSchema
  .extend({
    image: z.instanceof(File, { message: 'Image must be a file' })
      .refine((file) => file.size > 0, { message: 'Image is required' })
      .optional(),
  })
  .superRefine((data, ctx) => {
    if (data.unitType === 'other' && (!data.customUnitType || data.customUnitType.trim() === '')) {
      ctx.addIssue({
        path: ['customUnitType'],
        code: z.ZodIssueCode.custom,
        message: 'Custom unit type is required when "Other" is selected',
      });
    }

    const validStatuses = ['Prescription', 'OTC', 'Controlled'];
    if (!validStatuses.includes(data.prescriptionStatus)) {
      ctx.addIssue({
        path: ['prescriptionStatus'],
        code: z.ZodIssueCode.custom,
        message: 'Invalid prescription status',
      });
    }
  });

// Types
export type CreateMedicineFormValues = z.infer<typeof createMedicineSchema>;
export type UpdateMedicineFormValues = z.infer<typeof updateMedicineSchema>;

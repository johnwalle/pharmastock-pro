'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  updateMedicineSchema,
  UpdateMedicineFormValues,
} from '@/validators/medicineSchema';
import { UploadDropzone } from './uploadDropzone';
import { Lock, AlertCircle } from 'lucide-react';
import useUpdateMedicine from '@/hooks/useUpdateMedicine';
import clsx from 'clsx';
import { urlToFile } from '@/lib/urlToFile';

interface EditMedicineFormProps {
  medicine: UpdateMedicineFormValues & { _id: string; image?: string };
  onClose: () => void;
}

export default function EditMedicineForm({
  medicine,
  onClose,
}: EditMedicineFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<UpdateMedicineFormValues>({
    resolver: zodResolver(updateMedicineSchema),
    defaultValues: medicine,
  });

  const selectedImage = watch('image') as File | undefined;
  const { updateMedicine, isLoading, error } = useUpdateMedicine();

  // 🔄 Load image URL as File
  useEffect(() => {
    reset(medicine);

    if (medicine.image && typeof medicine.image === 'string') {
      const filename =
        medicine.brandName.replace(/\s+/g, '_') + '_image.jpg';

      urlToFile(medicine.image, filename).then((file) => {
        setValue('image', file, { shouldValidate: true });
      });
    }
  }, [medicine, reset, setValue]);

  const onSubmit = async (data: UpdateMedicineFormValues) => {
    try {
      const formData = new FormData();

      for (const [key, value] of Object.entries(data)) {
        if (key === 'image' && value instanceof File) {
          formData.append(key, value);
        } else {
          formData.append(key, String(value ?? ''));
        }
      }

      await updateMedicine(medicine._id, formData, () => {
        onClose();
      });
    } catch (err) {
      console.error('Update error:', err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 bg-white p-6 rounded-xl border border-gray-200"
      >
        <p className="text-sm text-gray-500">Update medicine details.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Text Inputs */}
          {[
            { name: 'brandName', label: 'Brand Name *', placeholder: 'Enter brand name' },
            { name: 'genericName', label: 'Generic Name *', placeholder: 'Enter generic name' },
            { name: 'strength', label: 'Strength *', placeholder: 'e.g., 500 mg' },
            { name: 'batchNumber', label: 'Batch Number *', placeholder: 'e.g., BAT001' },
            { name: 'supplierInfo', label: 'Supplier Info', placeholder: 'Supplier name and contact' },
            { name: 'storageConditions', label: 'Storage Conditions', placeholder: 'e.g., Store at 15-25°C' },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
              <input
                {...register(field.name as keyof UpdateMedicineFormValues)}
                placeholder={field.placeholder}
                className={clsx(
                  'w-full border rounded-md px-3 py-2 text-sm focus:ring focus:ring-blue-200',
                  errors[field.name as keyof UpdateMedicineFormValues] && 'border-red-500'
                )}
              />
              {errors[field.name as keyof UpdateMedicineFormValues] && (
                <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors[field.name as keyof UpdateMedicineFormValues]?.message as string}
                </p>
              )}
            </div>
          ))}

          {/* Number Inputs */}
          {[
            { name: 'currentStockLevel', label: 'Current Stock Level *' },
            { name: 'reorderThreshold', label: 'Reorder Threshold' },
            { name: 'reorderQuantity', label: 'Reorder Quantity' },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
              <input
                type="number"
                min={0}
                {...register(field.name as keyof UpdateMedicineFormValues)}
                className={clsx(
                  'w-full border rounded-md px-3 py-2 text-sm focus:ring focus:ring-blue-200',
                  errors[field.name as keyof UpdateMedicineFormValues] && 'border-red-500'
                )}
              />
              {errors[field.name as keyof UpdateMedicineFormValues] && (
                <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors[field.name as keyof UpdateMedicineFormValues]?.message as string}
                </p>
              )}
            </div>
          ))}

          {/* Dosage Form */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Dosage Form *</label>
            <select
              {...register('dosageForm')}
              className={clsx(
                'w-full border rounded-md px-3 py-2 text-sm text-gray-600 focus:ring focus:ring-blue-200',
                errors.dosageForm && 'border-red-500'
              )}
            >
              <option value="">Select dosage form</option>
              {['Tablet', 'Capsule', 'Syrup', 'Injection', 'Cream', 'Inhaler'].map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            {errors.dosageForm && (
              <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.dosageForm.message}
              </p>
            )}
          </div>

          {/* Prescription Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Prescription Status *</label>
            <select
              {...register('prescriptionStatus')}
              className={clsx(
                'w-full border rounded-md px-3 py-2 text-sm text-gray-600 focus:ring focus:ring-blue-200',
                errors.prescriptionStatus && 'border-red-500'
              )}
            >
              <option value="">Select status</option>
              <option value="Prescription">Prescription</option>
              <option value="OTC">Over-the-Counter</option>
              <option value="Controlled">Controlled Substance</option>
            </select>
            {errors.prescriptionStatus && (
              <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.prescriptionStatus.message}
              </p>
            )}
          </div>

          {/* Date Fields */}
          {['receivedDate', 'expiryDate'].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field === 'receivedDate' ? 'Received Date *' : 'Expiry Date *'}
              </label>
              <input
                type="date"
                {...register(field as keyof UpdateMedicineFormValues)}
                className={clsx(
                  'w-full border rounded-md px-3 py-2 text-sm text-gray-600 focus:ring focus:ring-blue-200',
                  errors[field as keyof UpdateMedicineFormValues] && 'border-red-500'
                )}
              />
              {errors[field as keyof UpdateMedicineFormValues] && (
                <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors[field as keyof UpdateMedicineFormValues]?.message as string}
                </p>
              )}
            </div>
          ))}

          {/* Price Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price per Unit *</label>
            <div className="flex items-center border rounded-md px-3 py-2 text-sm">
              <span className="text-gray-500 pr-1">$</span>
              <input
                type="number"
                step="0.01"
                {...register('pricePerUnit')}
                className="w-full outline-none"
              />
            </div>
            {errors.pricePerUnit && (
              <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.pricePerUnit.message}
              </p>
            )}
          </div>

          {/* Storage Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Storage Location</label>
            <select
              {...register('storageLocation')}
              className="w-full border rounded-md px-3 py-2 text-sm text-gray-600 focus:ring focus:ring-blue-200"
            >
              <option value="">Select location</option>
              {['Pharmacy Shelf A', 'Pharmacy Shelf B', 'Refrigerator', 'Controlled Storage'].map((opt) => (
                <option key={opt}>{opt}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Upload Section */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Medicine Image</label>
          <UploadDropzone
            onFileSelect={(file) => {
              if (file) setValue('image', file, { shouldValidate: true });
            }}
            error={errors.image?.message}
          />
          {selectedImage && (
            <p className="text-xs text-green-600 mt-1">Selected: {selectedImage.name}</p>
          )}
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
          <textarea
            rows={3}
            {...register('notes')}
            placeholder="Additional notes or special instructions"
            className="w-full border rounded-md px-3 py-2 text-sm focus:ring focus:ring-blue-200"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-between items-center pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 cursor-pointer text-white px-6 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2 disabled:opacity-50"
          >
            <Lock size={16} />
            {isLoading ? 'Saving...' : 'Update Medicine'}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="border border-gray-300 px-6 py-2 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

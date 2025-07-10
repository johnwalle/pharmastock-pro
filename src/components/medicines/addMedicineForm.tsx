'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { medicineSchema, MedicineFormValues } from '@/validators/medicineSchema';
import { UploadDropzone } from './uploadDropzone';
import { Lock, AlertCircle } from 'lucide-react';
import useCreateMedicine from '@/hooks/useCreateMedicine';
import clsx from 'clsx';

export default function AddMedicineForm() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<MedicineFormValues>({
    resolver: zodResolver(medicineSchema),
    defaultValues: {
      brandName: '',
      genericName: '',
      dosageForm: '',
      strength: '',
      currentStockLevel: 0,
      reorderThreshold: 10,
      reorderQuantity: 50,
      expiryDate: '',
      batchNumber: '',
      storageConditions: '',
      supplierInfo: '',
      storageLocation: '',
      prescriptionStatus: '',
      pricePerUnit: 0,
      receivedDate: '',
      notes: '',
      image: undefined,
    },
  });

  const selectedImage = watch('image') as File | undefined;
  const { createMedicine, isLoading, error } = useCreateMedicine();

  const onSubmit = async (data: MedicineFormValues) => {
    try {
      if (!data.image) {
        throw new Error('Image is required.');
      }

      const formData = new FormData();

      // Append all fields to FormData
      formData.append('brandName', data.brandName);
      formData.append('genericName', data.genericName);
      formData.append('dosageForm', data.dosageForm);
      formData.append('strength', data.strength);
      formData.append('currentStockLevel', data.currentStockLevel.toString());
      formData.append('reorderThreshold', data.reorderThreshold.toString());
      formData.append('reorderQuantity', data.reorderQuantity.toString());
      formData.append('expiryDate', data.expiryDate);
      formData.append('batchNumber', data.batchNumber);
      formData.append('storageConditions', data.storageConditions || '');
      formData.append('supplierInfo', data.supplierInfo || '');
      formData.append('storageLocation', data.storageLocation || '');
      formData.append('prescriptionStatus', data.prescriptionStatus);
      formData.append('pricePerUnit', data.pricePerUnit.toString());
      formData.append('receivedDate', data.receivedDate);
      formData.append('notes', data.notes || '');
      formData.append('image', data.image); // ✅ Actual File object

      console.log('Submitting form data:', Object.fromEntries(formData.entries()));
      await createMedicine(formData, () => {
        reset(); // Reset form on success
      });
    } catch (err: any) {
      console.error('Form submission error:', err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 bg-white p-6 rounded-xl border border-gray-200"
      >
        <p className="text-sm text-gray-500">
          Fill in the details to add a new medicine to inventory.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Text fields */}
          {[
            { name: 'brandName', label: 'Brand Name *', placeholder: 'Enter brand name' },
            { name: 'genericName', label: 'Generic Name *', placeholder: 'Enter generic name' },
            { name: 'strength', label: 'Strength *', placeholder: 'e.g., 500 mg' },
            { name: 'batchNumber', label: 'Batch Number *', placeholder: 'e.g., BAT001' },
            { name: 'supplierInfo', label: 'Supplier Info', placeholder: 'Supplier name and contact' },
            { name: 'storageConditions', label: 'Storage Conditions', placeholder: 'e.g., Store at 15-25°C' },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.label}
              </label>
              <input
                {...register(field.name as keyof MedicineFormValues)}
                placeholder={field.placeholder}
                className={clsx(
                  'w-full border rounded-md px-3 py-2 text-sm focus:ring focus:ring-blue-200',
                  errors[field.name as keyof MedicineFormValues] && 'border-red-500'
                )}
              />
              {errors[field.name as keyof MedicineFormValues] && (
                <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors[field.name as keyof MedicineFormValues]?.message as string}
                </p>
              )}
            </div>
          ))}

          {/* Number fields */}
          {[
            { name: 'currentStockLevel', label: 'Current Stock Level *' },
            { name: 'reorderThreshold', label: 'Reorder Threshold' },
            { name: 'reorderQuantity', label: 'Reorder Quantity' },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.label}
              </label>
              <input
                type="number"
                min={0}
                {...register(field.name as keyof MedicineFormValues)}
                className={clsx(
                  'w-full border rounded-md px-3 py-2 text-sm focus:ring focus:ring-blue-200',
                  errors[field.name as keyof MedicineFormValues] && 'border-red-500'
                )}
              />
              {errors[field.name as keyof MedicineFormValues] && (
                <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors[field.name as keyof MedicineFormValues]?.message as string}
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
                <option key={opt}>{opt}</option>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Prescription Status *
            </label>
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

          {/* Dates */}
          {['receivedDate', 'expiryDate'].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field === 'receivedDate' ? 'Received Date *' : 'Expiry Date *'}
              </label>
              <input
                type="date"
                {...register(field as keyof MedicineFormValues)}
                className={clsx(
                  'w-full border rounded-md px-3 py-2 text-sm text-gray-600 focus:ring focus:ring-blue-200',
                  errors[field as keyof MedicineFormValues] && 'border-red-500'
                )}
              />
              {errors[field as keyof MedicineFormValues] && (
                <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors[field as keyof MedicineFormValues]?.message as string}
                </p>
              )}
            </div>
          ))}

          {/* Price per Unit */}
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
              {['Pharmacy Shelf A', 'Pharmacy Shelf B', 'Refrigerator', 'Controlled Storage'].map(
                (opt) => (
                  <option key={opt}>{opt}</option>
                )
              )}
            </select>
          </div>
        </div>

        {/* Upload Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Medicine Image *</label>
          <UploadDropzone
            onFileSelect={(file) => {
              if (file) {
                setValue('image', file, { shouldValidate: true });
              }
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
            className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 flex items-center gap-2 disabled:opacity-50"
          >
            <Lock size={16} />
            {isLoading ? 'Saving...' : 'Save Medicine'}
          </button>
          <button
            type="button"
            onClick={() => reset()}
            className="border border-gray-300 px-6 py-2 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import { AlertCircle, Lock } from 'lucide-react';

import { createMedicineSchema, CreateMedicineFormValues, predefinedUnitTypesList } from '@/validators/medicineSchema';
import { UploadDropzone } from './uploadDropzone';
import useCreateMedicine from '@/hooks/useCreateMedicine';

export default function AddMedicineForm() {
  const [customUnit, setCustomUnit] = useState('');

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateMedicineFormValues>({
    resolver: zodResolver(createMedicineSchema),
    defaultValues: {
      brandName: '',
      genericName: '',
      dosageForm: '',
      strength: '',
      batchNumber: '',
      unitType: '',
      customUnitType: '',
      unitQuantity: 1,
      subUnitQuantity: undefined,
      purchaseCost: 0,
      sellingPrice: 0,
      stockStore: 0,
      reorderThreshold: 10,
      reorderQuantity: 50,
      receivedDate: '',
      expiryDate: '',
      prescriptionStatus: '',
      storageConditions: '',
      supplierInfo: '',
      storageLocation: '',
      notes: '',
      image: undefined,
    },
  });

  const selectedImage = watch('image') as File | undefined;
  const selectedUnitType = watch('unitType');

  const { createMedicine, isLoading } = useCreateMedicine();

  const onSubmit = async (data: CreateMedicineFormValues) => {
    try {
      const finalUnitType = data.unitType === 'other' ? data.customUnitType?.trim() : data.unitType;

      const formData = new FormData();

      // Append all values to FormData
      const fields: Array<keyof CreateMedicineFormValues> = [
        'brandName',
        'genericName',
        'dosageForm',
        'strength',
        'batchNumber',
        'unitQuantity',
        'subUnitQuantity',
        'purchaseCost',
        'sellingPrice',
        'stockStore',
        'reorderThreshold',
        'reorderQuantity',
        'receivedDate',
        'expiryDate',
        'prescriptionStatus',
        'storageConditions',
        'supplierInfo',
        'storageLocation',
        'notes',
      ];

      fields.forEach((key) => {
        const value = data[key];
        if (value !== undefined && value !== null) {
          formData.append(key, String(value));
        }
      });

      // Unit type & custom unit
      formData.append('unitType', finalUnitType || '');
      if (data.unitType === 'other') {
        formData.append('customUnitType', data.customUnitType || '');
      }

      // Image file
      if (data.image instanceof File) {
        formData.append('image', data.image);
      }

      // Submit API
      await createMedicine(formData, () => reset());
    } catch (err) {
      console.error('Form submission error:', err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 rounded-xl border border-gray-200">
        <p className="text-sm text-gray-500">
          Fill in the details to add a new medicine to inventory (store only).
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Text Inputs */}
          {[
            { name: 'brandName', label: 'Brand Name *', placeholder: 'Enter brand name' },
            { name: 'genericName', label: 'Generic Name *', placeholder: 'Enter generic name' },
            { name: 'strength', label: 'Strength *', placeholder: '500 mg, 5 ml, etc.' },
            { name: 'batchNumber', label: 'Batch Number *', placeholder: 'e.g., BAT001' },
            { name: 'supplierInfo', label: 'Supplier Info', placeholder: 'Supplier name/contact' },
            { name: 'storageConditions', label: 'Storage Conditions', placeholder: '15-25°C' },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
              <input
                {...register(field.name as keyof CreateMedicineFormValues)}
                placeholder={field.placeholder}
                className={clsx(
                  'w-full border rounded-md px-3 py-2 text-sm',
                  errors[field.name as keyof CreateMedicineFormValues] && 'border-red-500'
                )}
              />
              {errors[field.name as keyof CreateMedicineFormValues] && (
                <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {String(errors[field.name as keyof CreateMedicineFormValues]?.message)}
                </p>
              )}
            </div>
          ))}

          {/* Number Inputs */}
          {[
            { name: 'unitQuantity', label: 'Unit Quantity *' },
            { name: 'subUnitQuantity', label: 'Sub-unit Quantity' },
            { name: 'purchaseCost', label: 'Purchase Cost' },
            { name: 'sellingPrice', label: 'Selling Price *' },
            { name: 'stockStore', label: 'Stock in Store *' },
            { name: 'reorderThreshold', label: 'Reorder Threshold' },
            { name: 'reorderQuantity', label: 'Reorder Quantity' },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
              <input
                type="number"
                min={0}
                step={field.name.includes('Price') || field.name.includes('Cost') ? 0.01 : 1}
                {...register(field.name as keyof CreateMedicineFormValues)}
                className={clsx(
                  'w-full border rounded-md px-3 py-2 text-sm',
                  errors[field.name as keyof CreateMedicineFormValues] && 'border-red-500'
                )}
              />
              {errors[field.name as keyof CreateMedicineFormValues] && (
                <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {String(errors[field.name as keyof CreateMedicineFormValues]?.message)}
                </p>
              )}
            </div>
          ))}

          {/* Dosage Form */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Dosage Form *</label>
            <select
              {...register('dosageForm')}
              className={clsx('w-full border rounded-md px-3 py-2 text-sm', errors.dosageForm && 'border-red-500')}
            >
              <option value="">Select dosage form</option>
              {['Tablet','Capsule','Syrup','Injection','Cream','Inhaler','Other'].map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          {/* Unit Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Unit Type *</label>
            <select
              {...register('unitType')}
              className={clsx('w-full border rounded-md px-3 py-2 text-sm', errors.unitType && 'border-red-500')}
              onChange={(e) => {
                setValue('unitType', e.target.value);
                if (e.target.value !== 'other') setCustomUnit('');
              }}
            >
              <option value="">Select unit type</option>
              {predefinedUnitTypesList.map(unit => (
                <option key={unit} value={unit}>{unit}</option>
              ))}
              <option value="other">Other</option>
            </select>

            {selectedUnitType === 'other' && (
              <input
                type="text"
                {...register('customUnitType')}
                value={customUnit}
                onChange={(e) => {
                  setCustomUnit(e.target.value);
                  setValue('customUnitType', e.target.value);
                }}
                placeholder="Enter custom unit type"
                className="mt-2 w-full border rounded-md px-3 py-2 text-sm"
              />
            )}

            {errors.customUnitType && (
              <p className="text-red-600 text-xs mt-1">{errors.customUnitType.message}</p>
            )}
          </div>

          {/* Prescription Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Prescription Status *</label>
            <select
              {...register('prescriptionStatus')}
              className={clsx('w-full border rounded-md px-3 py-2 text-sm', errors.prescriptionStatus && 'border-red-500')}
            >
              <option value="">Select status</option>
              <option value="Prescription">Prescription</option>
              <option value="OTC">OTC</option>
              <option value="Controlled">Controlled</option>
            </select>
          </div>

          {/* Dates */}
          {['receivedDate', 'expiryDate'].map(field => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field === 'receivedDate' ? 'Received Date *' : 'Expiry Date *'}
              </label>
              <input
                type="date"
                {...register(field as keyof CreateMedicineFormValues)}
                className={clsx('w-full border rounded-md px-3 py-2 text-sm', errors[field as keyof CreateMedicineFormValues] && 'border-red-500')}
              />
            </div>
          ))}

          {/* Image */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Medicine Image *</label>
            <UploadDropzone
              onFileSelect={(file) => file && setValue('image', file, { shouldValidate: true })}
              error={errors.image?.message}
            />
            {selectedImage && <p className="text-xs text-green-600 mt-1">Selected: {selectedImage.name}</p>}
          </div>

          {/* Notes */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <textarea
              rows={3}
              {...register('notes')}
              placeholder="Additional notes or instructions"
              className="w-full border rounded-md px-3 py-2 text-sm"
            />
          </div>
        </div>

        <div className="flex justify-between items-center pt-4">
          <button
            type="submit"
            disabled={isSubmitting || isLoading}
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

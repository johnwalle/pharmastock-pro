'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import { AlertCircle, Lock } from 'lucide-react';

import {
  updateMedicineSchema,
  UpdateMedicineFormValues,
  predefinedUnitTypesList,
} from '@/validators/medicineSchema';
import { Medicine } from '@/types/medicines';
import { UploadDropzone } from './uploadDropzone';
import { urlToFile } from '@/lib/urlToFile';

interface EditMedicineFormProps {
  medicine: Medicine;
  onClose: () => void;
  onSubmitForm: (formData: FormData) => Promise<void>;
  isLoading?: boolean;
}

export default function EditMedicineForm({
  medicine,
  onClose,
  onSubmitForm,
  isLoading = false,
}: EditMedicineFormProps) {
  const [selectedImage, setSelectedImage] = useState<File | undefined>(undefined);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UpdateMedicineFormValues>({
    resolver: zodResolver(updateMedicineSchema),
    defaultValues: {
      ...medicine,
      unitType: predefinedUnitTypesList.includes(medicine.unitType)
        ? medicine.unitType
        : 'other',
      customUnitType: medicine.customUnitType ?? '',
    },
  });

  const selectedUnitType = watch('unitType');

  // Load initial data and image
  useEffect(() => {
    reset({
      ...medicine,
      unitType: predefinedUnitTypesList.includes(medicine.unitType)
        ? medicine.unitType
        : 'other',
      customUnitType: medicine.customUnitType ?? '',
    });

    if (medicine.imageURL) {
      const filename = `${medicine.brandName.replace(/\s+/g, '_')}_image.jpg`;
      urlToFile(medicine.imageURL, filename).then((file) => {
        setValue('image', file, { shouldValidate: true });
        setSelectedImage(file);
      });
    }
  }, [medicine, reset, setValue]);

  const onSubmit = async (data: UpdateMedicineFormValues) => {
    try {
      const resolvedUnitType =
        data.unitType === 'other'
          ? data.customUnitType?.trim()
          : data.unitType;

      if (!resolvedUnitType) {
        throw new Error('Unit type is required');
      }

      const formData = new FormData();

      // Strings
      formData.append('brandName', data.brandName);
      formData.append('genericName', data.genericName);
      formData.append('strength', data.strength);
      formData.append('batchNumber', data.batchNumber);
      formData.append('supplierInfo', data.supplierInfo ?? '');
      formData.append('storageConditions', data.storageConditions ?? '');
      formData.append('notes', data.notes ?? '');

      // Numbers
      formData.append('unitQuantity', String(data.unitQuantity));
      formData.append('subUnitQuantity', String(data.subUnitQuantity ?? ''));
      formData.append('purchaseCost', String(data.purchaseCost));
      formData.append('sellingPrice', String(data.sellingPrice));
      formData.append('reorderThreshold', String(data.reorderThreshold));
      formData.append('reorderQuantity', String(data.reorderQuantity));

      // Selects
      formData.append('dosageForm', data.dosageForm);
      formData.append('unitType', resolvedUnitType);
      formData.append('prescriptionStatus', data.prescriptionStatus);

      // Dates
      formData.append('receivedDate', data.receivedDate);
      formData.append('expiryDate', data.expiryDate);

      // Image
      if (data.image instanceof File) {
        formData.append('image', data.image);
      }

      await onSubmitForm(formData);
    } catch (error) {
      console.error('Form submission error:', error);
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
            'brandName',
            'genericName',
            'strength',
            'batchNumber',
            'supplierInfo',
            'storageConditions',
          ].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field}
              </label>
              <input
                {...register(field as keyof UpdateMedicineFormValues)}
                className={clsx(
                  'w-full border rounded-md px-3 py-2 text-sm focus:ring focus:ring-blue-200',
                  errors[field as keyof UpdateMedicineFormValues] &&
                    'border-red-500'
                )}
              />
              {errors[field as keyof UpdateMedicineFormValues] && (
                <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {String(
                    errors[field as keyof UpdateMedicineFormValues]?.message
                  )}
                </p>
              )}
            </div>
          ))}

          {/* Unit Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Unit Type *
            </label>
            <select
              {...register('unitType')}
              className={clsx(
                'w-full border rounded-md px-3 py-2 text-sm',
                errors.unitType && 'border-red-500'
              )}
            >
              <option value="">Select unit type</option>
              {predefinedUnitTypesList.map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
              <option value="other">Other</option>
            </select>

            {selectedUnitType === 'other' && (
              <input
                type="text"
                {...register('customUnitType')}
                placeholder="Enter custom unit type"
                className="mt-2 w-full border rounded-md px-3 py-2 text-sm"
              />
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between items-center pt-4">
          <button
            type="submit"
            disabled={isSubmitting || isLoading}
            className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 flex items-center gap-2 disabled:opacity-50"
          >
            <Lock size={16} />
            {isLoading ? 'Updating...' : 'Update Medicine'}
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

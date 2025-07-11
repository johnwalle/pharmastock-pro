'use client';

import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import authStore from '@/store/authStore';
import { useMedicineStore } from '@/store/medicineStore'

const useUpdateMedicine = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const { fetchMedicines } = useMedicineStore()

  const updateMedicine = async (
    medicineId: string,
    formData: FormData,
    onSuccess?: () => void
  ): Promise<void> => {
    if (!apiUrl) {
      const errMsg = 'API URL is not defined.';
      setError(errMsg);
      toast.error(errMsg);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { userData } = authStore.getState();
      const token = userData?.tokens.access.token;

      if (!token) {
        const errMsg = 'No access token available.';
        setError(errMsg);
        toast.error(errMsg);
        return;
      }

      const response = await axios.put(`${apiUrl}/medicines/update/${medicineId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        fetchMedicines(); // Refresh the medicine list after update
        toast.success('Medicine updated successfully!');
        if (onSuccess) onSuccess();
      } else {
        const errMsg = `Unexpected status code: ${response.status}`;
        setError(errMsg);
        toast.error(errMsg);
      }
    } catch (err) {
      const axiosError = err as AxiosError<{ message: string }>;
      const errorMessage =
        axiosError.response?.data?.message || axiosError.message || 'Failed to update medicine';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    updateMedicine,
    error,
    isLoading,
  };
};

export default useUpdateMedicine;

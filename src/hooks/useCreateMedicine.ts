'use client';

import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import authStore from '@/store/authStore';

const useCreateMedicine = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const createMedicine = async (
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
      console.log('the token is', token);

      if (!token) {
        const errMsg = 'No access token available.';
        setError(errMsg);
        toast.error(errMsg);
        return;
      }

      const response = await axios.post(`${apiUrl}/medicines/create`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        toast.success('Medicine added successfully!');
        if (onSuccess) onSuccess();
      } else {
        const errMsg = `Unexpected status code: ${response.status}`;
        setError(errMsg);
        toast.error(errMsg);
      }
    } catch (err) {
      const axiosError = err as AxiosError<{ message: string }>;
      const errorMessage =
        axiosError.response?.data?.message || axiosError.message || 'Failed to add medicine';
      setError(errorMessage);
      toast.error(errorMessage); // ✅ Show toast error
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createMedicine,
    error,
    isLoading,
  };
};

export default useCreateMedicine;

'use client';

import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import authStore from '../store/authStore';
import { useMedicineStore } from '@/store/medicineStore'

interface SellData {
  medicineId: string;
  quantity: number;
}

const useSell = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { fetchMedicines } = useMedicineStore();

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const sell = async ({ medicineId, quantity }: SellData): Promise<void> => {
    if (!apiUrl) {
      setError('API URL is not defined.');
      toast.error('API URL is not defined.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const getHeaders = () => {
        const token = authStore.getState().userData?.tokens.access.token;
        return {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        };
      };

      const response = await axios.post(
        `${apiUrl}/sell`,
        { medicineId, quantity },
        { headers: getHeaders() }
      );

      if (response.status === 200) {
        fetchMedicines();
        toast.success('Medicine sold successfully!');

      } else {
        setError(`Unexpected response status: ${response.status}`);
        toast.error(`Unexpected response status: ${response.status}`);
      }
    } catch (err) {
      const axiosError = err as AxiosError<{ message: string }>;
      const errorMessage =
        axiosError.response?.data?.message || axiosError.message || 'Sale failed';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    sell,
    error,
    isLoading,
  };
};

export default useSell;
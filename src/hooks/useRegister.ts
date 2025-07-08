// hooks/useRegister.ts
'use client';

import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast'; // Ensure you have react-hot-toast installed


interface RegisterData {
  fullName: string;
  email: string;
  password: string;
}

const useRegister = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const register = async (
    { fullName, email, password }: RegisterData,
    onSuccess?: () => void // <-- accept optional callback
  ): Promise<void> => {
    if (!apiUrl) {
      setError('API URL is not defined.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${apiUrl}/users/register`, {
        fullName,
        email,
        password,
      });

      if (response.status === 201) {
        // Call the callback to switch to login tab
        if (onSuccess) onSuccess();
        toast.success('Registration successful! You can now log in.');
      } else {
        setError(`Unexpected status code: ${response.status}`);
      }
    } catch (err) {
      const axiosError = err as AxiosError<{ message: string }>;
      const errorMessage =
        axiosError.response?.data?.message || axiosError.message || 'Registration failed';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    register,
    error,
    isLoading,
  };
};

export default useRegister;

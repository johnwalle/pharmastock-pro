'use client';

import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation'; // ✅ App Router
import { toast } from 'react-hot-toast';

interface ForgotPasswordResult {
  success: boolean;
  message: string;
}

export const useForgotPassword = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const sendResetLink = async (email: string): Promise<ForgotPasswordResult> => {
    if (!apiUrl) {
      const msg = 'API URL is not defined.';
      setError(msg);
      toast.error(msg);
      return { success: false, message: msg };
    }

    try {
      setIsLoading(true);
      setError(null);

      const response = await axios.post(`${apiUrl}/auth/forgot-password`, { email });

      if (response.status === 200) {
        toast.success('Password reset link has been sent to your email.');
        return { success: true, message: 'Reset link sent' };
      } else {
        const msg = `Unexpected status code: ${response.status}`;
        toast.error(msg);
        return { success: false, message: msg };
      }
    } catch (err) {
      const axiosError = err as AxiosError<{ message?: string }>;
      const errorMsg =
        axiosError.response?.data?.message || axiosError.message || 'Failed to send reset link';
      setError(errorMsg);
      toast.error(errorMsg);
      return { success: false, message: errorMsg };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    sendResetLink,
    isLoading,
    error,
  };
};

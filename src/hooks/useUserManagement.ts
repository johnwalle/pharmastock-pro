'use client';

import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { User } from '@/types/user';
import authStore from '@/store/authStore';

const useUserManagement = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  // Get the token of the logged-in user
  const getAuthHeaders = () => {
    const { userData } = authStore.getState();
    const token = userData?.tokens?.access?.token;

    if (!token) {
      throw new Error('Authentication token not found');
    }

    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  // CREATE
  const createUserByAdmin = async (
    userData: {
      fullName: string;
      email: string;
      role: string;
      password: string;
    },
    onSuccess?: () => void
  ): Promise<void> => {
    if (!apiUrl) {
      setError('API URL is not defined.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      console.log("Creating user with data:", userData);
      const config = getAuthHeaders();
      const response = await axios.post(`${apiUrl}/users/create-user`, userData, config);

      if (response.status === 201) {
        toast.success('User created successfully!');
        onSuccess?.();
      } else {
        setError(`Unexpected status code: ${response.status}`);
      }
    } catch (err) {
      const axiosError = err as AxiosError<{ message: string }>;
      const errorMessage =
        axiosError.response?.data?.message || axiosError.message || 'User creation failed';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // UPDATE
  const updateUserByAdmin = async (
    userId: string,
    updatedData: {
      fullName?: string;
      email?: string;
      role?: 'admin' | 'pharmacist' | 'manager';
    },
    onSuccess?: () => void
  ): Promise<void> => {
    if (!apiUrl) {
      setError('API URL is not defined.');
      toast.error('Missing API configuration.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const config = getAuthHeaders();
      const response = await axios.put(
        `${apiUrl}/users/update/${userId}`,
        updatedData,
        config
      );

      if (response.status === 200) {
        toast.success('User updated successfully!');
        onSuccess?.();
      } else {
        setError(`Unexpected status code: ${response.status}`);
        toast.error(`Update failed: ${response.status}`);
      }
    } catch (err) {
      const axiosError = err as AxiosError<{ message?: string }>;
      const message =
        axiosError.response?.data?.message ||
        axiosError.message ||
        'An unknown error occurred during update.';
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  // DELETE
  const deleteUserByAdmin = async (
    userId: string,
    onSuccess?: () => void
  ): Promise<void> => {
    if (!apiUrl) {
      setError('API URL is not defined.');
      return;
    }

    console.log("Deleting user with ID:", userId);
    setIsLoading(true);
    setError(null);

    try {
      const config = getAuthHeaders();
      const response = await axios.delete(`${apiUrl}/users/delete-user/${userId}`, config);

      if (response.status === 200) {
        toast.success('User deleted successfully!');
        onSuccess?.();
      } else {
        setError(`Unexpected status code: ${response.status}`);
      }
    } catch (err) {
      const axiosError = err as AxiosError<{ message: string }>;
      const errorMessage =
        axiosError.response?.data?.message || axiosError.message || 'User deletion failed';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    error,
    isLoading,
    createUserByAdmin,
    updateUserByAdmin,
    deleteUserByAdmin,
  };
};

export default useUserManagement;

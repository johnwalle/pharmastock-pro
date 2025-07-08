'use client';

import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import authStore from '@/store/authStore';
import { useRouter } from 'next/navigation'; 
import toast from 'react-hot-toast'

interface LoginData {
    email: string;
    password: string;
}

const useLogin = () => {
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const setUserData = authStore((state) => state.setUserData);
    const router = useRouter(); // Use Next.js router for navigation

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const login = async ({ email, password }: LoginData): Promise<void> => {
        if (!apiUrl) {
            setError('API URL is not defined.');
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.post(`${apiUrl}/auth/login`, {
                email,
                password,
            });

            const userData = response.data;

            if (response.status === 200) {
                setUserData(userData);
                // Optionally, you can redirect the user or show a success message
                toast.success('Login successful!'); // Ensure you have react-hot-toast installed
                router.push('/dashboard'); // Assuming you have a router instance available
            } else {
                setError(`Unexpected response status: ${response.status}`);
            }
        } catch (err) {
            const axiosError = err as AxiosError<{ message: string }>;

            if (axiosError.response?.status === 429) {
                setError('Too many requests. Please try again later.');
            } else {
                const errorMessage =
                    axiosError.response?.data?.message || axiosError.message || 'Login failed';
                setError(errorMessage);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return {
        login,
        error,
        isLoading,
    };
};

export default useLogin;

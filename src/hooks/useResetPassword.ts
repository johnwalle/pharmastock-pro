// hooks/useResetPassword.ts
import { useState } from 'react';
import axios from 'axios';

interface ResetPasswordResponse {
    success: boolean;
    message: string;
}

export const useResetPassword = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const resetPassword = async (
        token: string,
        newPassword: string
    ): Promise<ResetPasswordResponse> => {
        try {
            setLoading(true);
            setError(null);


            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            if (!apiUrl) throw new Error('API URL is not defined.');

            const response = await axios.post(`${apiUrl}/auth/reset-password/${token}`, {
                password: newPassword,
            });




            return {
                success: true,
                message: response.data?.message || 'Password reset successful!',
            };
        } catch (err: unknown) {
            let message = 'Something went wrong.';

            // Narrow err to an Axios error
            if (axios.isAxiosError(err)) {
                message = err.response?.data?.message || err.message || message;
            } else if (err instanceof Error) {
                message = err.message;
            }

            setError(message);
            return { success: false, message };
        }
        finally {
            setLoading(false);
        }
    };

    return { resetPassword, loading, error };
};

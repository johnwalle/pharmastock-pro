'use client';

import React from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { HiExclamationCircle } from 'react-icons/hi';
import { FiLock, FiArrowLeft } from 'react-icons/fi';
import toast from "react-hot-toast"

import { resetPasswordSchema, ResetPasswordValues } from '@/validators/authSchema';
import { useResetPassword } from '@/hooks/useResetPassword';

const ResetPasswordPage = () => {
    const router = useRouter();
    const params = useParams();
    const token = params.token as string;

    const { resetPassword, loading, error } = useResetPassword();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<ResetPasswordValues>({
        resolver: zodResolver(resetPasswordSchema),
    });



    const onSubmit = async (data: ResetPasswordValues) => {
        const result = await resetPassword(token, data.password);
        if (result.success) {
            toast.success("Password reset successful! You can now log in with your new password.");
            router.push('/auth/signup');
        } else {
            setError('root', { message: result.message });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 font-sans">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
                <div className="flex justify-center mb-4">
                    <div className="bg-cyan-100 text-cyan-600 p-3 rounded-full">
                        <FiLock className="text-2xl" />
                    </div>
                </div>

                <h2 className="text-center text-2xl font-semibold text-gray-800 mb-2">
                    Reset Your Password
                </h2>
                <p className="text-center text-gray-600 text-sm mb-6">
                    Enter and confirm your new password to secure your account.
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Password */}
                    <div className="relative">
                        <FiLock className="absolute top-3.5 left-3 text-gray-400" />
                        <input
                            type="password"
                            placeholder="New Password"
                            {...register('password')}
                            className="pl-10 w-full py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600"
                        />
                        {errors.password && (
                            <div className="mt-1 flex items-start text-sm text-red-600 bg-red-50 border border-red-300 px-3 py-2 rounded-md">
                                <HiExclamationCircle className="mt-0.5 mr-1 text-red-500" />
                                <span>{errors.password.message}</span>
                            </div>
                        )}
                    </div>

                    {/* Confirm Password */}
                    <div className="relative">
                        <FiLock className="absolute top-3.5 left-3 text-gray-400" />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            {...register('confirmPassword')}
                            className="pl-10 w-full py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600"
                        />
                        {errors.confirmPassword && (
                            <div className="mt-1 flex items-start text-sm text-red-600 bg-red-50 border border-red-300 px-3 py-2 rounded-md">
                                <HiExclamationCircle className="mt-0.5 mr-1 text-red-500" />
                                <span>{errors.confirmPassword.message}</span>
                            </div>
                        )}
                    </div>

                    {/* Root error (token / API) */}
                    {(errors.root?.message || error) && (
                        <div className="mt-1 flex items-start text-sm text-red-600 bg-red-50 border border-red-300 px-3 py-2 rounded-md">
                            <HiExclamationCircle className="mt-0.5 mr-1 text-red-500" />
                            <span>{errors.root?.message || error}</span>
                        </div>
                    )}

                    {/* Submit button */}
                    <button
                        type="submit"
                        className="w-full py-2 bg-primary text-white rounded-md font-semibold hover:bg-cyan-700 transition"
                        disabled={loading}
                    >
                        {loading ? 'Resetting...' : 'Reset Password'}
                    </button>
                </form>

                {/* Back to login */}
                <div className="mt-6 flex justify-center">
                    <Link
                        href="/auth/signup"
                        className="flex items-center text-sm text-cyan-700 hover:underline"
                    >
                        <FiArrowLeft className="mr-1" /> Back to Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordPage;

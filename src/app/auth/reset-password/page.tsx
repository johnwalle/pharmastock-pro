'use client';

import { useState } from 'react';
import { FiLock, FiArrowLeft } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ResetPassword() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        // TODO: Call API to reset the password
        alert('Password reset successfully!');
        router.push('/login');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 font-sans">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
                {/* Icon */}
                <div className="flex justify-center mb-4">
                    <div className="bg-cyan-100 text-cyan-600 p-3 rounded-full">
                        <FiLock className="text-2xl" />
                    </div>
                </div>

                {/* Title */}
                <h2 className="text-center text-2xl font-semibold text-gray-800 mb-2">
                    Reset Your Password
                </h2>
                <p className="text-center text-gray-600 text-sm mb-6">
                    Enter a new password to secure your account.
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            New Password
                        </label>
                        <input
                            type="password"
                            placeholder="Enter new password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-white"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            placeholder="Confirm new password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-white"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full cursor-pointer bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 rounded-lg transition"
                    >
                        Reset Password
                    </button>
                </form>

                {/* Back link */}
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
}

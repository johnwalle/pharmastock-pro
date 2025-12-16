'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForgotPassword } from '@/hooks/useForgotPassword';
import Link from 'next/link';
import { FaKey, FaPaperPlane } from 'react-icons/fa';
import { IoArrowBack } from 'react-icons/io5';
import toast from 'react-hot-toast';

// Validation schema
const forgotPasswordSchema = z.object({
  email: z.string().nonempty('Email is required').email('Please enter a valid email address'),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const { isLoading, sendResetLink } = useForgotPassword();

  const onSubmit = async (data: ForgotPasswordFormData) => {
    const toastId = toast.loading('Sending reset link...');
    const result = await sendResetLink(data.email);
    toast.dismiss(toastId);

    if (!result.success) {
      toast.error(result.message || 'Something went wrong');
    }
  };

  return (
    <div className="min-h-screen mt-12 flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <div className="flex justify-center mb-6">
          <div className="bg-cyan-100 p-4 rounded-full">
            <FaKey className="text-cyan-600 text-2xl" />
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-2">
          Forgot Your Password?
        </h2>
        <p className="text-center text-gray-600 mb-6 text-sm">
          Enter your email address and we&apos;ll send you a link to reset your password.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              {...register('email')}
              placeholder="Enter your email address"
              className={`w-full px-4 py-2 border ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-600`}
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting || isLoading}
            className="w-full cursor-pointer bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 rounded-lg flex justify-center items-center gap-2 transition disabled:opacity-60"
          >
            <FaPaperPlane className="text-white" />
            {isSubmitting || isLoading ? 'Sending...' : 'Send Reset Link'}
          </button>

          <div className="flex justify-start mt-4">
            <Link
              href="/auth/signup"
              className="flex items-center justify-center gap-2 text-sm text-gray-600 hover:text-cyan-600 transition"
            >
              <IoArrowBack />
              Back to Login
            </Link>
          </div>
        </form>

        <div className="mt-8 bg-gray-100 p-4 rounded-lg text-center text-sm text-gray-700">
          <div className="flex justify-center items-center gap-1 mb-1 font-medium">
            <span className="text-gray-500">❓</span>
            Need Help?
          </div>
          <p className="text-xs text-gray-500">
            If you don’t receive an email within 5 minutes, check your spam folder or contact support.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

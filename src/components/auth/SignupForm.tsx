'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema, SignupFormValues } from '@/validators/authSchema';
import useRegister from '@/hooks/useRegister';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import { HiExclamationCircle } from 'react-icons/hi';

interface SignupFormProps {
  onSuccess: () => void; // <-- passed from AuthPage
}

const SignupForm: React.FC<SignupFormProps> = ({ onSuccess }) => {
  const { register: doRegister, isLoading, error } = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormValues) => {
    await doRegister(data, onSuccess); // <- pass onSuccess to switch to login tab
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Full Name */}
      <div className="relative">
        <FaUser className="absolute top-3.5 left-3 text-gray-400" />
        <input
          type="text"
          placeholder="Full Name"
          {...register('fullName')}
          className="pl-10 w-full py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600"
        />
        {errors.fullName && (
          <div className="mt-1 flex items-start text-sm text-red-600 bg-red-50 border border-red-300 px-3 py-2 rounded-md">
            <HiExclamationCircle className="mt-0.5 mr-1 text-red-500" />
            <span>{errors.fullName.message}</span>
          </div>
        )}
      </div>

      {/* Email */}
      <div className="relative">
        <FaEnvelope className="absolute top-3.5 left-3 text-gray-400" />
        <input
          type="email"
          placeholder="Email address"
          {...register('email')}
          className="pl-10 w-full py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600"
        />
        {errors.email && (
          <div className="mt-1 flex items-start text-sm text-red-600 bg-red-50 border border-red-300 px-3 py-2 rounded-md">
            <HiExclamationCircle className="mt-0.5 mr-1 text-red-500" />
            <span>{errors.email.message}</span>
          </div>
        )}
      </div>

      {/* Password */}
      <div className="relative">
        <FaLock className="absolute top-3.5 left-3 text-gray-400" />
        <input
          type="password"
          placeholder="Create password"
          {...register('password')}
          className="pl-10 w-full py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600"
        />
        {errors.password && Array.isArray(errors.password.message) ? (
          <div className="mt-1 flex items-start text-sm text-red-600 bg-red-50 border border-red-300 px-3 py-2 rounded-md">
            <HiExclamationCircle className="mt-0.5 mr-1 text-red-500" />
            <ul className="list-disc pl-4 space-y-1">
              {errors.password.message.map((msg, idx) => (
                <li key={idx}>{msg}</li>
              ))}
            </ul>
          </div>
        ) : errors.password ? (
          <div className="mt-1 flex items-start text-sm text-red-600 bg-red-50 border border-red-300 px-3 py-2 rounded-md">
            <HiExclamationCircle className="mt-0.5 mr-1 text-red-500" />
            <span>{errors.password.message}</span>
          </div>
        ) : null}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-2 bg-primary text-white rounded-md font-semibold hover:bg-cyan-700 transition"
        disabled={isLoading}
      >
        {isLoading ? 'Registering...' : 'Register'}
      </button>

      {/* Hook-based error (API or toast) */}
      {error && (
        <div className="mt-2 flex items-start text-sm text-red-600 bg-red-50 border border-red-300 px-3 py-2 rounded-md">
          <HiExclamationCircle className="mt-0.5 mr-1 text-red-500" />
          <span>{error}</span>
        </div>
      )}

      {/* Divider */}
      <div className="text-center text-sm text-gray-500 mt-4">Or continue with</div>

      {/* Google Sign-in */}
      <button
        type="button"
        onClick={() => (window.location.href = '/api/auth/google')}
        className="w-full mt-2 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 flex justify-center items-center"
      >
        <img src="/google.png" alt="Google" className="w-4 h-4 mr-2" />
        Sign up with Google
      </button>
    </form>
  );
};

export default SignupForm;

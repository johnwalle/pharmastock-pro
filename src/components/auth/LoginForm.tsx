"use client";

import React from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useAuth } from "@/hooks/useAuth";
import toast from "react-hot-toast";
import { HiExclamationCircle } from "react-icons/hi";
import { useRouter } from "next/navigation";

const LoginForm: React.FC = () => {
    const { login, loading, error } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget as HTMLFormElement);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        try {
            const status = await login({ email, password });
            if (status === 200) {
                router.push("/dashboard"); // Redirect to dashboard or home page
                toast.success("Login successful!");
            } else {
                toast.error("Login failed. Please check your credentials.");
            }
        } catch (err) {
            console.error("Login error:", err);
            toast.error("Something went wrong. Please try again.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
                <FaEnvelope className="absolute top-3.5 left-3 text-gray-400" />
                <input
                    type="email"
                    name="email"
                    placeholder="Email address"
                    className="pl-10 w-full py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600"
                    required
                />
            </div>

            <div className="relative">
                <FaLock className="absolute top-3.5 left-3 text-gray-400" />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="pl-10 w-full py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600"
                    required
                />
            </div>

            <div className="flex items-center justify-between text-sm text-gray-600">
                <label className="flex items-center">
                    <input type="checkbox" className="mr-2" /> Remember me
                </label>
                <a href="/auth/forgot-password" className="hover:underline">
                    Forgot password?
                </a>
            </div>

            <button
                type="submit"
                className="w-full cursor-pointer py-2 bg-primary text-white rounded-md font-semibold hover:bg-cyan-700 transition"
                disabled={loading}
            >
                {loading ? "Signing in..." : "Sign In"}
            </button>

            {error && (
                <div className="mt-2 flex items-start space-x-2 text-sm text-red-600 bg-red-50 border border-red-300 px-3 py-2 rounded-md">
                    <HiExclamationCircle className="mt-0.5 text-red-500" />
                    <span>{error}</span>
                </div>
            )}

            <div className="text-center text-sm text-gray-500 mt-4">Or continue with</div>

            <button
                type="button"
                className="w-full mt-2 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 flex justify-center items-center"
                onClick={() => (window.location.href = "/api/auth/google")}
            >
                <img src="/google.png" alt="Google" className="w-4 h-4 mr-2" />
                Sign in with Google
            </button>
        </form>
    );
};

export default LoginForm;

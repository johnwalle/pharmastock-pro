import React from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";

const LoginForm: React.FC = () => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Login submitted");
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
                <FaEnvelope className="absolute top-3.5 left-3 text-gray-400" />
                <input
                    type="email"
                    placeholder="Email address"
                    className="pl-10 w-full py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600"
                    required
                />
            </div>

            <div className="relative">
                <FaLock className="absolute top-3.5 left-3 text-gray-400" />
                <input
                    type="password"
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
                className="w-full py-2 bg-primary text-white rounded-md font-semibold hover:bg-cyan-700 transition"
            >
                Sign In
            </button>

            <div className="text-center text-sm text-gray-500 mt-4">Or continue with</div>

            <button
                type="button"
                className="w-full mt-2 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 flex justify-center items-center"
            >
                <img src="/google.png" alt="Google" className="w-4 h-4 mr-2" />
                Sign in with Google
            </button>
        </form>
    );
};

export default LoginForm;

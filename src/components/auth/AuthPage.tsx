"use client";
import React, { useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

const AuthPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<"login" | "signup">("login");

    return (
        <div
            className="min-h-screen mt-12 bg-cover bg-center flex items-center justify-center px-4"
            style={{
                backgroundImage: "url('/images/pharmacy-bg.jpg')",
            }}
        >
            <div className="bg-white/90 backdrop-blur-md shadow-2xl rounded-2xl p-10 w-full max-w-md border border-gray-200">
                <div className="text-center mb-6">
                    <div className="w-12 h-12 bg-gray-300 rounded-full mx-auto mb-2"></div>
                    <h1 className="text-3xl font-bold text-gray-800">PharmStock</h1>
                    <p className="text-gray-600 text-sm">Pharmacy Stock Management System</p>
                </div>

                <div className="flex mb-6 rounded-md overflow-hidden border border-gray-300">
                    <button
                        className={`w-1/2 py-2 font-medium ${activeTab === "login"
                                ? "bg-primary text-white"
                                : "bg-white text-cyan-600 hover:bg-cyan-50"
                            }`}
                        onClick={() => setActiveTab("login")}
                    >
                        Login
                    </button>
                    <button
                        className={`w-1/2 py-2 font-medium ${activeTab === "signup"
                                ? "bg-primary text-white"
                                : "bg-white text-cyan-600 hover:bg-cyan-50"
                            }`}
                        onClick={() => setActiveTab("signup")}
                    >
                        Sign Up
                    </button>
                </div>

                {activeTab === "login" ? (
                    <LoginForm />
                ) : (
                    <SignupForm onSuccess={() => setActiveTab("login")} />
                )}
            </div>
        </div>
    );
};

export default AuthPage;

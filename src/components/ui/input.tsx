"use client";
import React from "react";
import { FcGoogle } from "react-icons/fc";

const SignInCard: React.FC = () => {
  const handleGoogleSignIn = () => {
    // Add actual sign-in logic here (e.g., NextAuth or Firebase)
    console.log("Google Sign In clicked");
  };

  return (
    <div className="relative flex w-full max-w-md flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
      {/* Header */}
      <div className="relative mx-4 -mt-6 mb-4 grid h-28 place-items-center overflow-hidden rounded-xl bg-gradient-to-tr from-cyan-600 to-cyan-400 bg-clip-border text-white shadow-lg shadow-cyan-500/40">
        <h3 className="block text-3xl font-semibold leading-snug tracking-normal text-white">
          Sign In
        </h3>
      </div>

      {/* Form Inputs */}
      <div className="flex flex-col gap-4 px-6 pb-2">
        {/* Email */}
        <div className="relative h-11 w-full min-w-[200px]">
          <input
            required
            type="email"
            placeholder=""
            className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 text-sm text-blue-gray-700 outline-none transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-cyan-500 focus:border-t-transparent"
          />
          <label className="absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-cyan-500">
            Email
          </label>
        </div>

        {/* Password */}
        <div className="relative h-11 w-full min-w-[200px]">
          <input
            required
            type="password"
            placeholder=""
            className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 text-sm text-blue-gray-700 outline-none transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-cyan-500 focus:border-t-transparent"
          />
          <label className="absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-cyan-500">
            Password
          </label>
        </div>

        {/* Remember Me */}
        <div className="-ml-2.5">
          <label className="flex items-center cursor-pointer p-3 rounded-full">
            <input
              type="checkbox"
              className="peer relative h-5 w-5 appearance-none rounded-md border border-blue-gray-200 checked:bg-cyan-500 checked:border-cyan-500 transition-all"
            />
            <span className="ml-2 text-sm text-gray-700">Remember Me</span>
          </label>
        </div>
      </div>

      {/* Buttons */}
      <div className="px-6 pb-6">
        <button
          type="submit"
          className="mb-4 w-full rounded-lg bg-gradient-to-tr from-cyan-600 to-cyan-400 py-3 px-6 text-center text-xs font-bold uppercase text-white shadow-md shadow-cyan-500/20 transition-all hover:shadow-lg hover:shadow-cyan-500/40"
        >
          Sign In
        </button>

        <button
          onClick={handleGoogleSignIn}
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 py-3 px-6 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
        >
          <FcGoogle className="text-xl" />
          Sign in with Google
        </button>

        <p className="mt-6 flex justify-center text-sm font-light text-gray-600">
          Don't have an account?
          <a
            className="ml-1 font-bold text-cyan-500 hover:underline"
            href="#signup"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignInCard;

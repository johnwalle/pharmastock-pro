'use client';

export default function SignInCard() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4 pt-20">
      <div className="relative w-full max-w-sm md:max-w-md flex flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
        <div className="relative mx-4 -mt-6 mb-4 grid h-28 place-items-center overflow-hidden rounded-xl bg-gradient-to-tr from-cyan-600 to-cyan-400 bg-clip-border text-white shadow-lg shadow-cyan-500/40">
          <h3 className="block font-sans text-3xl font-semibold leading-snug tracking-normal text-white antialiased">
            Sign In
          </h3>
        </div>

        <div className="flex flex-col gap-4 p-6">
          {/* Email Input */}
          <div className="relative h-11 w-full min-w-[200px]">
            <input
              placeholder=""
              className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline-none transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-cyan-500 focus:border-t-transparent"
            />
            <label
              className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:text-cyan-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-cyan-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-cyan-500"
            >
              Email
            </label>
          </div>

          {/* Password Input */}
          <div className="relative h-11 w-full min-w-[200px]">
            <input
              placeholder=""
              className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline-none transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-cyan-500 focus:border-t-transparent"
              type="password"
            />
            <label
              className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:text-cyan-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-cyan-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-cyan-500"
            >
              Password
            </label>
          </div>

          {/* Remember Me */}
          <div className="-ml-2.5">
            <div className="inline-flex items-center">
              <label className="relative flex cursor-pointer items-center rounded-full p-3">
                <input
                  id="checkbox"
                  className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 checked:border-cyan-500 checked:bg-cyan-500 transition"
                  type="checkbox"
                />
                <span className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                  <svg
                    className="h-3.5 w-3.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </label>
              <label
                htmlFor="checkbox"
                className="mt-px cursor-pointer select-none font-light text-gray-700"
              >
                Remember Me
              </label>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="p-6 pt-0">
          <button
            type="button"
            className="block w-full cursor-pointer rounded-lg bg-gradient-to-tr from-cyan-600 to-cyan-400 py-3 px-6 text-center text-xs font-bold uppercase text-white shadow-md hover:shadow-lg transition"
          >
            Sign In
          </button>
          <button
            type="button"
            className="mt-4 block w-full cursor-pointer rounded-lg border border-cyan-500 text-cyan-500 py-2 text-sm font-semibold hover:bg-cyan-50 transition"
          >
            Continue with Google
          </button>
          <p className="mt-6 flex justify-center text-sm font-light text-gray-700">
            Don't have an account?
            <a href="#signup" className="ml-1 font-bold text-cyan-500">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

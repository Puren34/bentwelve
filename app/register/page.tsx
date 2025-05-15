import { FaUser, FaEnvelope, FaLock, FaGoogle } from "react-icons/fa";
import Link from 'next/link';

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen bg-[#AF5475] items-center justify-center">
      {/* Container */}
      <div className="flex w-[90%] max-w-4xl rounded-[60px] overflow-hidden bg-pink-100 shadow-lg">

        {/* Left Side - Logo */}
        <div className="w-1/2 bg-[#D3628B] text-pink-100 flex items-center justify-center text-4xl font-bold rounded-tr-[60px] rounded-br-[60px]">
          <img src="icons/fs.png" alt="Logo" className="w-80 h-auto" />
        </div>

        {/* Right Side - Register Form */}
        <div className="w-1/2 p-10 flex flex-col justify-center items-center text-center">
          <h2 className="text-2xl font-bold text-black mb-6">Registration</h2>

          {/* Form */}
          <form className="w-full max-w-sm space-y-4">
            {/* Username */}
            <div className="relative">
              <input
                type="text"
                placeholder="Username"
                className="w-full px-4 py-2 pr-10 rounded shadow border border-gray-300 focus:outline-none"
              />
              <FaUser className="absolute right-3 top-2.5 text-gray-500" />
            </div>

            {/* Email */}
            <div className="relative">
              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-4 py-2 pr-10 rounded shadow border border-gray-300 focus:outline-none"
              />
              <FaEnvelope className="absolute right-3 top-2.5 text-gray-500" />
            </div>

            {/* Password */}
            <div className="relative">
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 pr-10 rounded shadow border border-gray-300 focus:outline-none"
              />
              <FaLock className="absolute right-3 top-2.5 text-gray-500" />
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="w-full py-2 bg-[#C4587B] text-white font-semibold rounded hover:bg-[#b74c77] transition"
            >
              Register
            </button>

            {/* Google Button */}
            <button
              type="button"
              className="w-full py-2 bg-white border shadow text-black rounded flex items-center justify-center gap-2 hover:bg-gray-100 transition"
            >
              <img src="/google-icon.png" alt="Google" className="w-5 h-5" />
              Sign in with Google
            </button>

            {/* Login Link */}
            <p className="text-sm text-gray-700">
              Already have an account?{" "}
              <Link href="/" className="text-pink-600 hover:underline font-semibold">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

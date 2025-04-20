import { FaUser, FaEnvelope, FaLock, FaGoogle } from "react-icons/fa";

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen bg-rose-400">
      {/* Left Section */}
      <div className="flex-1 flex items-center justify-center text-pink-100 font-bold text-4xl">
        FlowerScotch
      </div>

      {/* Right Section */}
      <div className="flex-1 flex items-center justify-center bg-pink-100 rounded-l-[80px] shadow-lg">
        <div className="w-full max-w-sm px-6 py-10">
          <h2 className="text-2xl font-bold text-center text-black mb-8">Registration</h2>

          {/* Username */}
          <div className="mb-4">
            <div className="flex items-center bg-white shadow px-4 py-2 rounded">
              <input
                type="text"
                placeholder="Username"
                className="flex-1 outline-none bg-transparent"
              />
              <FaUser className="text-gray-500" />
            </div>
          </div>

          {/* Email */}
          <div className="mb-4">
            <div className="flex items-center bg-white shadow px-4 py-2 rounded">
              <input
                type="email"
                placeholder="Email Address"
                className="flex-1 outline-none bg-transparent"
              />
              <FaEnvelope className="text-gray-500" />
            </div>
          </div>

          {/* Password */}
          <div className="mb-4">
            <div className="flex items-center bg-white shadow px-4 py-2 rounded">
              <input
                type="password"
                placeholder="Password"
                className="flex-1 outline-none bg-transparent"
              />
              <FaLock className="text-gray-500" />
            </div>
          </div>

          {/* Register Button */}
          <button className="w-full bg-rose-400 hover:bg-rose-500 text-white font-bold py-2 rounded shadow mb-4">
            Register
          </button>

          {/* Google Button */}
          <button className="w-full bg-white border py-2 rounded shadow flex items-center justify-center gap-2">
            <FaGoogle className="text-red-500" />
            <span>Sign in with Google</span>
          </button>

          {/* Login Link */}
          <p className="text-center mt-4 text-sm text-gray-700">
            Already have an account?{" "}
            <a href="/login" className="text-pink-500 hover:underline font-medium">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

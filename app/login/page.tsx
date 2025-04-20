import { FaUser, FaLock, FaGoogle } from "react-icons/fa";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen bg-rose-400">
      {/* Left Section */}
      <div className="flex-1 flex items-center justify-center text-pink-100 font-bold text-4xl">
        FlowerScotch
      </div>

      {/* Right Section */}
      <div className="flex-1 flex items-center justify-center bg-pink-100 rounded-l-[80px] shadow-lg">
        <div className="w-full max-w-sm px-6 py-10">
          <h2 className="text-2xl font-bold text-center text-black mb-8">Login</h2>

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

          {/* Password */}
          <div className="mb-2">
            <div className="flex items-center bg-white shadow px-4 py-2 rounded">
              <input
                type="password"
                placeholder="Password"
                className="flex-1 outline-none bg-transparent"
              />
              <FaLock className="text-gray-500" />
            </div>
          </div>

          {/* Forgot Password */}
          <div className="text-right text-sm mb-4">
            <a href="#" className="text-pink-500 hover:underline font-medium">
              Forgot Password?
            </a>
          </div>

          {/* Login Button */}
          <button className="w-full bg-rose-400 hover:bg-rose-500 text-white font-bold py-2 rounded shadow mb-4">
            Login
          </button>

          {/* Google Button */}
          <button className="w-full bg-white border py-2 rounded shadow flex items-center justify-center gap-2">
            <FaGoogle className="text-red-500" />
            <span>Sign in with Google</span>
          </button>

          {/* Signup Link */}
          <p className="text-center mt-4 text-sm text-gray-700">
            Don’t have an account?{" "}
            <a href="#" className="text-pink-500 hover:underline font-medium">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

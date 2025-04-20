import { FaEnvelope } from "react-icons/fa";

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-screen bg-rose-400">
      {/* Left side */}
      <div className="flex-1 flex items-center justify-center text-pink-100 font-bold text-4xl">
        FlowerScotch
      </div>

      {/* Right side */}
      <div className="flex-1 flex items-center justify-center bg-pink-100 rounded-l-[80px] shadow-lg">
        <div className="w-full max-w-sm px-6 py-10">
          <h2 className="text-2xl font-bold text-center text-black mb-4">
            Forgot Password
          </h2>
          <p className="text-center text-gray-700 mb-6">
            Enter your email address
          </p>

          {/* Email Input */}
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

          {/* Continue Button */}
          <button className="w-full bg-rose-400 hover:bg-rose-500 text-white font-bold py-2 rounded shadow">
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

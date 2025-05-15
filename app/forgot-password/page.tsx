import { FaEnvelope } from "react-icons/fa";

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-screen bg-[#AF5475] items-center justify-center">
      {/* Container */}
      <div className="flex w-[90%] max-w-4xl min-h-[415px] rounded-[60px] overflow-hidden bg-pink-100 shadow-lg">
        
        {/* Left Side - Logo */}
        <div className="w-1/2 bg-[#D3628B] text-pink-100 flex items-center justify-center text-4xl font-bold rounded-tr-[60px] rounded-br-[60px]">
          <img src="icons/fs.png" alt="Logo" className="w-80 h-auto" />
        </div>

        {/* Right Side - Forgot Password Form */}
        <div className="w-1/2 p-10 flex flex-col justify-center items-center text-center">
          <h2 className="text-2xl font-bold text-black mb-2">
            Forgot Password
          </h2>
          <p className="text-gray-700 mb-6">Enter your email address</p>

          <form className="w-full max-w-sm space-y-4">
            {/* Email Input */}
            <div className="relative">
              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-4 py-2 pr-10 rounded shadow border border-gray-300 focus:outline-none"
              />
              <FaEnvelope className="absolute right-3 top-2.5 text-gray-500" />
            </div>

            {/* Continue Button */}
            <button
              type="submit"
              className="w-full py-2 bg-[#cc5c82] text-white font-semibold rounded hover:bg-[#bb4f75] transition"
            >
              Continue
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

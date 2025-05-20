'use client';

export default function ProfileSummary() {
  return (
    <div className="flex items-center gap-4 p-4 bg-white text-black rounded-2xl shadow-lg w-64 z-50">
      <img
        src="/Kucing.png"
        alt="User Profile"
        className="w-12 h-12 rounded-full border-4 border-green-500"
      />
      <div className="text-right flex-1">
        <p className="font-semibold text-base">Welcome, Monkey</p>
        <p className="text-sm text-gray-500">monkey@gmail.com</p>
      </div>
    </div>
  );
}
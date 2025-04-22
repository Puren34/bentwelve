'use client';

export default function ProfileSummary() {
  return (
    <div className="fixed top-6 right-4 flex items-center gap-4 p-6 bg-white text-black rounded-2xl shadow-lg w-80">
      <img
        src="/Kucing.png"
        alt="User Profile"
        className="w-16 h-16 rounded-full border-4 border-green-500"
      />
      <div className="text-right flex-1">
        <p className="font-bold text-lg">Welcome, Monkey</p>
        <p className="text-md text-gray-500">monkey@gmail.com</p>
      </div>
    </div>
  );
}

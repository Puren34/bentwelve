export default function ContactPage() {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/customers/your-flower-image.jpg')" }}
    >
      {/* Container Form */}
      <div className="w-full min-h-screen flex justify-center items-center py-12 px-4">
        <div className="bg-white bg-opacity-50 max-w-3xl w-full p-6 rounded-lg shadow-md">
          {/* Judul */}
          <div className="text-center mb-6">
            <h1 className="romanesco text-[60px] font-bold mb-1">Get In Touch</h1>
            <p className="text-sm">
              If you had a question, feel free to leave a message to us!
            </p>
          </div>

          {/* Form */}
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Full Name *</label>
              <input
                type="text"
                placeholder="Your name"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email *</label>
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Please select a topic</label>
              <select className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-pink-400">
                <option value="">Select a topic</option>
                <option value="flowers">Flowers</option>
                <option value="delivery">Delivery</option>
                <option value="others">Others</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">I'd like to know about...</label>
              <textarea
                rows={4}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
                placeholder="Write your message here..."
              ></textarea>
            </div>

            {/* Tombol Submit */}
            <div className="text-right mt-4">
              <button
                type="submit"
                className="bg-pink-400 text-white px-6 py-2 rounded-md hover:bg-pink-500 transition"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

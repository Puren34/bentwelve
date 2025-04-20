export default function ContactPage() {
  return (
    <div className="min-h-screen bg-pink-100">
      {/* Header */}
      <div className="bg-pink-300 text-center py-6">
        <h1 className="text-3xl font-bold mb-1">Get In Touch</h1>
        <p className="text-sm">
          If you had a question, feel free to leave a message to us!
        </p>
      </div>

      {/* Full-Width Background Section */}
      <div
        className="w-full bg-cover bg-center py-12 px-4"
        style={{ backgroundImage: "url('/your-flower-image.jpg')" }}
      >
        {/* Semi-transparent Form Container */}
        <div className="bg-white bg-opacity-80 max-w-3xl mx-auto p-6 rounded-lg shadow-md">
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
          </form>

          {/* Tombol di kanan bawah */}
          <div className="text-right mt-4">
            <button
              type="submit"
              className="bg-pink-400 text-white px-6 py-2 rounded-md hover:bg-pink-500 transition"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

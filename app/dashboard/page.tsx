export default function DashboardContent() {
    return (
      <main className="flex-1 p-8 bg-[#FDEBEB] min-h-screen">
        {/* Judul */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
  
        {/* Kartu Ringkasan */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <SummaryCard title="Collected" value="Rp 15.000.000" note="5% Selesai" color="text-green-500" />
          <SummaryCard title="Pending" value="Rp 1.400.000" note="1 Tertunda" color="text-purple-500" />
          <SummaryCard title="Total Invoice" value="132" note="28 Selesai" color="text-blue-500" />
          <SummaryCard title="Total Customer" value="12" note="1 Baru" color="text-red-500" />
        </div>
  
        {/* Grafik + Komentar */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Grafik Placeholder */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Statistik Penjualan</h2>
            <div className="h-40 bg-gradient-to-t from-blue-300 to-blue-600 rounded-lg" />
          </div>
  
          {/* Komentar Terbaru */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Komentar Terbaru</h2>
            <ul className="text-sm space-y-3">
              <li><strong>Monkey 1:</strong> ga bunganya cantik betul</li>
              <li><strong>Monkey 2:</strong> jelek kulit pual</li>
              <li><strong>Monkey 3:</strong> wanginyoooooo</li>
              <li><strong>Monkey 4:</strong> welehhhhhh</li>
            </ul>
          </div>
        </div>
  
        {/* Daftar Produk Stok Rendah */}
        <div className="mt-8 bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Produk Hampir Habis</h2>
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="text-gray-500 border-b">
                <th className="pb-2">Produk</th>
                <th className="pb-2">Stok</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2">Buket Mawar</td>
                <td className="py-2">3</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">Lilin Vanilla</td>
                <td className="py-2">2</td>
              </tr>
              <tr>
                <td className="py-2">Buket Kering</td>
                <td className="py-2">1</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    );
  }
  
  function SummaryCard({
    title,
    value,
    note,
    color,
  }: {
    title: string;
    value: string;
    note: string;
    color: string;
  }) {
    return (
      <div className="bg-white rounded-xl shadow p-4">
        <div className="text-sm text-gray-500">{title}</div>
        <div className="text-xl font-bold text-gray-800">{value}</div>
        <div className={`text-xs mt-1 ${color}`}>{note}</div>
      </div>
    );
  }
  
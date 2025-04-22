'use client';

import Image from 'next/image';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  Tick,
  Scale,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function DashboardContent() {
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Sales (Rp)',
        data: [5000000, 7000000, 3000000, 6000000, 8000000, 4000000],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          font: {
            size: 12,
          },
        },
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Month',
          font: {
            size: 12,
          },
        },
        grid: {
          display: false,
        },
      },
      y: {
        title: {
          display: true,
          text: 'Sales (Rp)',
          font: {
            size: 12,
          },
        },
        beginAtZero: true,
        ticks: {
          callback: function (
            this: Scale,
            tickValue: string | number,
            index: number,
            ticks: Tick[]
          ): string {
            const value = typeof tickValue === 'number' ? tickValue : parseFloat(tickValue);
            return `${(value / 1000000).toFixed(1)}M`;
          },
        },
      },
    },
  };

  return (
    <main className="flex-1 bg-[#FDEBEB]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <div className="flex items-center gap-4 p-4 bg-white text-black rounded-2xl shadow-lg w-64 mt-4 md:mt-0">
          <Image
            src="/Kucing.png"
            alt="User Profile"
            width={48}
            height={48}
            className="w-12 h-12 rounded-full border-4 border-green-500"
          />
          <div className="text-right flex-1">
            <p className="font-semibold text-base">Welcome, Monkey</p>
            <p className="text-sm text-gray-500 truncate">monkey@gmail.com</p>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <SummaryCard title="Collected" value="Rp 15.000.000" note="5% Selesai" color="text-green-500" />
        <SummaryCard title="Pending" value="Rp 1.400.000" note="1 Tertunda" color="text-purple-500" />
        <SummaryCard title="Total Invoice" value="132" note="28 Selesai" color="text-blue-500" />
        <SummaryCard title="Total Customer" value="12" note="1 Baru" color="text-red-500" />
      </div>

      {/* Chart + Comments */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Statistik Penjualan</h2>
          <div className="h-64">
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>

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

      {/* Produk Hampir Habis */}
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

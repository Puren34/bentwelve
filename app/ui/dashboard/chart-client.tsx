'use client';

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
} from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface ChartClientProps {
  monthlySales: { month: string; sales: number }[];
  totalProducts: number;
  totalRevenue: number;
  mostSoldProduct: { id_produk: string; nama_produk: string; total_sold: number } | null;
}

export default function ChartClient({ monthlySales, totalProducts, totalRevenue, mostSoldProduct }: ChartClientProps) {
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Sales (Rp)',
        data: Array(6).fill(0),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  monthlySales.forEach((sale) => {
    const monthIndex = chartData.labels.indexOf(sale.month);
    if (monthIndex !== -1) {
      chartData.datasets[0].data[monthIndex] = sale.sales;
    }
  });

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
          callback: (value: number | string, index: number, ticks: Tick[]): string => {
            const numericValue = typeof value === 'number' ? value : parseFloat(value);
            if (isNaN(numericValue)) return '';
            return `${(numericValue / 1000000).toFixed(1)}M`;
          },
        },
      },
    },
  };

  const formatCurrency = (value: number): string => {
    return `Rp ${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Statistik Penjualan</h2>
      <div className="h-64">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}
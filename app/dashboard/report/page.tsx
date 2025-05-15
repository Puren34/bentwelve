import { neon } from '@neondatabase/serverless';
import Image from 'next/image';

// Interface for transactions (matches the database schema)
interface Transaction {
  id: string;
  date: string; // Will be formatted in the UI
  name: string;
  price: string;
  quantity: number;
  category: string;
}

export default async function ReportPage() {
  // Validate environment variable
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is not set');
  }
  const sql = neon(process.env.DATABASE_URL);

  // Fetch transactions from the database
  let transactions: Transaction[] = [];
  try {
    transactions = (await sql`
      SELECT id, date, name, price, quantity, category
      FROM public.transactions
      ORDER BY date DESC
    `) as Transaction[];
    console.log('Fetched transactions:', transactions); // Debug log
  } catch (error) {
    console.error('Error fetching transactions:', error);
    transactions = []; // Fallback to empty array
  }

  return (
    <div className="p-6 md:p-8 mt-6 min-h-screen">
      {/* Header with Transaction Reports and ProfileSummary */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 relative">
        <h1 className="text-3xl font-bold text-gray-800">Transaction Reports</h1>
        <div className="fixed top-6 right-4 flex items-center gap-4 p-4 bg-white text-black rounded-2xl shadow-lg w-64 z-50 mt-4 md:mt-0">
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

      <div className="flex justify-end mb-6">
        <button className="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600 transition-colors">
          Filter
        </button>
      </div>
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full text-sm text-left border-separate border-spacing-0">
          <thead className="bg-gray-100 text-gray-700 font-semibold">
            <tr>
              <th className="border-t border-b border-l border-gray-200 px-4 py-3 first:rounded-tl-lg">NO</th>
              <th className="border-t border-b border-gray-200 px-4 py-3">ID_TRANSACTION</th>
              <th className="border-t border-b border-gray-200 px-4 py-3">DATE TIME</th>
              <th className="border-t border-b border-gray-200 px-4 py-3">NAME</th>
              <th className="border-t border-b border-gray-200 px-4 py-3">PRICE</th>
              <th className="border-t border-b border-gray-200 px-4 py-3">QUANTITY</th>
              <th className="border-t border-b border-r border-gray-200 px-4 py-3 last:rounded-tr-lg">CATEGORY</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length === 0 ? (
              <tr>
                <td colSpan={7} className="border-t border-b border-x border-gray-200 px-4 py-3 text-center text-gray-500">
                  No transactions found.
                </td>
              </tr>
            ) : (
              transactions.map((r, idx) => (
                <tr key={r.id} className={idx % 2 === 0 ? "bg-white" : "bg-pink-50"}>
                  <td className="border-t border-b border-l border-gray-200 px-4 py-3 text-center">{String(idx + 1).padStart(2, '0')}</td>
                  <td className="border-t border-b border-gray-200 px-4 py-3">{r.id}</td>
                  <td className="border-t border-b border-gray-200 px-4 py-3">{new Date(r.date).toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}</td>
                  <td className="border-t border-b border-gray-200 px-4 py-3">{r.name}</td>
                  <td className="border-t border-b border-gray-200 px-4 py-3">{r.price}</td>
                  <td className="border-t border-b border-gray-200 px-4 py-3 text-center">{r.quantity}</td>
                  <td className="border-t border-b border-r border-gray-200 px-4 py-3">{r.category}</td>
                </tr>
              ))
            )}
          </tbody>
          {transactions.length > 0 && (
            <tfoot>
              <tr>
                <td colSpan={7} className="border-b border-x border-gray-200 first:rounded-bl-lg last:rounded-br-lg"></td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>
    </div>
  );
}
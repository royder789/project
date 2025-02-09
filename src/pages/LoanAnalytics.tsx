import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { AlertTriangle, ArrowDown, ArrowUp, Clock, CreditCard, IndianRupee, Percent, Users } from 'lucide-react';
import { clsx } from 'clsx';

const performanceData = [
  { month: 'Jan', onTime: 85, late: 10, missed: 5 },
  { month: 'Feb', onTime: 82, late: 12, missed: 6 },
  { month: 'Mar', onTime: 88, late: 8, missed: 4 },
  { month: 'Apr', onTime: 86, late: 9, missed: 5 },
  { month: 'May', onTime: 84, late: 11, missed: 5 },
  { month: 'Jun', onTime: 89, late: 7, missed: 4 },
];

const riskData = [
  { id: 'L001', name: 'John Doe', type: 'Personal', overdueDays: 45, riskScore: 75 },
  { id: 'L002', name: 'Jane Smith', type: 'Business', overdueDays: 15, riskScore: 45 },
  { id: 'L003', name: 'Mike Johnson', type: 'Home', overdueDays: 60, riskScore: 85 },
];

const StatCard = ({ title, value, icon: Icon, trend, color }: any) => (
  <div className="bg-white p-6 rounded-xl shadow-lg">
    <div className="flex items-center justify-between mb-4">
      <div className={clsx("p-3 rounded-full", color)}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      {trend && (
        <div className={clsx("flex items-center", 
          trend > 0 ? "text-green-500" : "text-red-500"
        )}>
          {trend > 0 ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
          <span className="ml-1">{Math.abs(trend)}%</span>
        </div>
      )}
    </div>
    <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
    <p className="text-2xl font-bold mt-2">{value}</p>
  </div>
);

const RiskTable = ({ data }: { data: any[] }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          {['Loan ID', 'Borrower Name', 'Loan Type', 'Overdue Days', 'Risk Score', 'Action'].map((header) => (
            <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {data.map((row) => (
          <tr key={row.id}>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{row.id}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.name}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.type}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.overdueDays}</td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className={clsx(
                "px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full",
                row.riskScore >= 70 ? "bg-red-100 text-red-800" :
                row.riskScore >= 40 ? "bg-yellow-100 text-yellow-800" :
                "bg-green-100 text-green-800"
              )}>
                {row.riskScore}%
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              <button className="text-indigo-600 hover:text-indigo-900">
                View Details
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default function LoanAnalytics() {
  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Loan Lifecycle Analytics</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard title="Total Loans Disbursed" value="₹245.8 Cr" icon={IndianRupee} trend={12} color="bg-blue-500" />
          <StatCard title="Active Loans" value="1,234" icon={Users} trend={-3} color="bg-green-500" />
          <StatCard title="On-Time Payments" value="85%" icon={Clock} trend={5} color="bg-purple-500" />
          <StatCard title="Portfolio at Risk" value="₹12.4 Cr" icon={AlertTriangle} trend={8} color="bg-red-500" />
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-6">Repayment Behavior Trends</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="onTime" fill="#10B981" name="On Time" />
                <Bar dataKey="late" fill="#F59E0B" name="Late" />
                <Bar dataKey="missed" fill="#EF4444" name="Missed" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-6">Risk Analysis & Default Detection</h2>
          <RiskTable data={riskData} />
        </div>
      </div>
    </div>
  );
}

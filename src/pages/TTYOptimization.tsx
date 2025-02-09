import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import {
  Clock,
  Users,
  AlertTriangle,
  Notebook as Robot,
  ArrowUpRight,
  ArrowDownRight,
  FileCheck,
} from 'lucide-react';
import { clsx } from 'clsx';

const metrics = [
  { label: 'Average TTY', value: '24 hours', trend: 'down', change: '12%' },
  { label: 'Fastest Approval', value: '4 hours', trend: 'up', change: '25%' },
  { label: 'Active Applications', value: '3,500+', trend: 'up', change: '8%' },
  { label: 'Drop-Off Rate', value: '18%', trend: 'down', change: '5%' },
];

const loanTypes = [
  { type: 'Personal Loan', avgTTY: '12 hrs', fastest: '2 hrs', slowest: '2 days', volume: 1200 },
  { type: 'Home Loan', avgTTY: '48 hrs', fastest: '12 hrs', slowest: '7 days', volume: 800 },
  { type: 'Car Loan', avgTTY: '18 hrs', fastest: '4 hrs', slowest: '3 days', volume: 950 },
  { type: 'Business Loan', avgTTY: '72 hrs', fastest: '24 hrs', slowest: '10 days', volume: 550 },
];

const bottlenecks = [
  {
    title: 'Risk Assessment Delays',
    duration: '24 hrs',
    solution: 'AI-driven risk scoring',
    impact: 'Reduce by 60%',
    icon: AlertTriangle,
  },
  {
    title: 'Manual KYC Processing',
    duration: '16 hrs',
    solution: 'OCR & NLP verification',
    impact: 'Cut time by 75%',
    icon: FileCheck,
  },
  {
    title: 'High Underwriter Load',
    duration: '12 hrs',
    solution: 'Smart workload distribution',
    impact: 'Improve efficiency by 40%',
    icon: Users,
  },
];

const StatCard = ({ title, value, trend, change }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg transition duration-300 transform hover:-translate-y-1 hover:shadow-xl">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
      <span
        className={clsx('flex items-center text-sm', {
          'text-green-500': trend === 'up',
          'text-red-500': trend === 'down',
        })}
      >
        {trend === 'up' ? (
          <ArrowUpRight className="w-4 h-4" />
        ) : (
          <ArrowDownRight className="w-4 h-4" />
        )}
        <span className="ml-1">{change}</span>
      </span>
    </div>
    <p className="text-2xl font-bold text-gray-900">{value}</p>
  </div>
);

const LoanPerformanceTable = () => (
  <div className="overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          {['Loan Type', 'Avg. TTY', 'Fastest', 'Slowest', 'Volume'].map((header) => (
            <th
              key={header}
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {loanTypes.map((loan, index) => (
          <tr key={index}>
            <td className="px-6 py-4 text-sm font-medium text-gray-900">{loan.type}</td>
            <td className="px-6 py-4 text-sm text-gray-500">{loan.avgTTY}</td>
            <td className="px-6 py-4 text-sm text-green-600">{loan.fastest}</td>
            <td className="px-6 py-4 text-sm text-red-600">{loan.slowest}</td>
            <td className="px-6 py-4 text-sm text-gray-500">{loan.volume}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default function TTYOptimization() {
  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">TTY Optimization Suite</h1>
          {/* Dark mode toggle removed for a consistent light mode experience */}
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <StatCard
              key={index}
              title={metric.label}
              value={metric.value}
              trend={metric.trend}
              change={metric.change}
            />
          ))}
        </div>

        {/* Loan Performance Table */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 transition duration-300 transform hover:-translate-y-1 hover:shadow-xl">
          <h2 className="text-xl font-bold mb-6 text-gray-900">Loan Type Performance</h2>
          <LoanPerformanceTable />
        </div>

        {/* Bottlenecks Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {bottlenecks.map((bottleneck, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg transition duration-300 transform hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex items-center mb-4">
                <bottleneck.icon className="h-5 w-5 text-red-600" />
                <h3 className="ml-2 text-lg font-medium text-gray-900">{bottleneck.title}</h3>
              </div>
              <p className="text-sm text-gray-500">Current Delay: {bottleneck.duration}</p>
              <p className="text-sm text-gray-500">Solution: {bottleneck.solution}</p>
              <p className="text-sm font-medium text-green-600">{bottleneck.impact}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

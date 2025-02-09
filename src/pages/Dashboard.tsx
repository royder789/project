import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { MetricCard } from '../components/ui/MetricCard';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Area,
  AreaChart,
} from 'recharts';
import {
  Clock,
  TrendingUp,
  Users,
  AlertTriangle,
  Shield,
  FileCheck2,
  DollarSign,
  Activity,
} from 'lucide-react';

const performanceData = [
  { month: 'Jan', approved: 65, rejected: 35, pending: 20 },
  { month: 'Feb', approved: 75, rejected: 25, pending: 15 },
  { month: 'Mar', approved: 70, rejected: 30, pending: 25 },
  { month: 'Apr', approved: 85, rejected: 15, pending: 10 },
  { month: 'May', approved: 90, rejected: 10, pending: 8 },
  { month: 'Jun', approved: 88, rejected: 12, pending: 15 },
];

const ttyData = [
  { day: 'Mon', tty: 24, volume: 45 },
  { day: 'Tue', tty: 22, volume: 50 },
  { day: 'Wed', tty: 20, volume: 55 },
  { day: 'Thu', tty: 18, volume: 48 },
  { day: 'Fri', tty: 16, volume: 52 },
  { day: 'Sat', tty: 15, volume: 40 },
  { day: 'Sun', tty: 14, volume: 35 },
];

const riskDistribution = [
  { score: '0-20', count: 50 },
  { score: '21-40', count: 120 },
  { score: '41-60', count: 250 },
  { score: '61-80', count: 180 },
  { score: '81-100', count: 90 },
];

export default function Dashboard() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('week');

  const timeframeOptions = [
    { value: 'day', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' },
  ];

  return (
    <div className="space-y-6">
      {/* Timeframe Selector */}
      <div className="flex justify-end space-x-2 animate-fade-in">
        {timeframeOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => setSelectedTimeframe(option.value)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              selectedTimeframe === option.value
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Metrics Overview */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Time to Yes (TTY)"
          value="18.5 hrs"
          change={-12}
          icon={<Clock className="w-6 h-6 text-white" />}
          gradient="blue"
        />
        <MetricCard
          title="Approval Rate"
          value="85%"
          change={5}
          icon={<TrendingUp className="w-6 h-6 text-white" />}
          gradient="green"
        />
        <MetricCard
          title="Active Applications"
          value="1,284"
          change={8}
          icon={<Users className="w-6 h-6 text-white" />}
          gradient="purple"
        />
        <MetricCard
          title="Risk Alerts"
          value="23"
          change={-15}
          icon={<AlertTriangle className="w-6 h-6 text-white" />}
          gradient="orange"
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4 animate-slide-in">
        {[
          { title: 'Pending Reviews', count: 28, icon: FileCheck2, color: 'bg-yellow-500' },
          { title: 'KYC Verifications', count: 15, icon: Shield, color: 'bg-green-500' },
          { title: 'High-Value Loans', count: 7, icon: DollarSign, color: 'bg-purple-500' },
          { title: 'Risk Assessments', count: 12, icon: Activity, color: 'bg-red-500' },
        ].map((action, idx) => (
          <button
            key={idx}
            className="p-4 bg-white rounded-lg shadow hover-scale flex items-center space-x-3"
            style={{ animationDelay: `${idx * 100}ms` }}
          >
            <div className={`p-2 rounded-lg ${action.color}`}>
              <action.icon className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <p className="text-sm font-medium text-gray-600">{action.title}</p>
              <p className="text-lg font-semibold text-gray-900">{action.count}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card title="Loan Performance" className="hover-scale">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: '8px',
                    border: 'none',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Bar dataKey="approved" fill="#3B82F6" name="Approved" radius={[4, 4, 0, 0]} />
                <Bar dataKey="rejected" fill="#EF4444" name="Rejected" radius={[4, 4, 0, 0]} />
                <Bar dataKey="pending" fill="#F59E0B" name="Pending" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Time-to-Yes Trend" className="hover-scale">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={ttyData}>
                <defs>
                  <linearGradient id="ttyGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: '8px',
                    border: 'none',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="tty"
                  stroke="#3B82F6"
                  fill="url(#ttyGradient)"
                  name="Hours"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Recent Applications */}
      <Card title="Recent Applications" className="hover-scale">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Applicant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Risk Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[
                {
                  name: 'Mihir Kuamr Roy',
                  amount: 'Rs.50,000',
                  riskScore: 85,
                  status: 'Approved',
                },
                {
                  name: 'Aashish Gupta',
                  amount: 'Rs75,000',
                  riskScore: 92,
                  status: 'Pending',
                },
                {
                  name: 'Deshdeepak Verma',
                  amount: 'Rs25,000',
                  riskScore: 78,
                  status: 'Under Review',
                },
                {
                  name: 'Mayank Kashyap',
                  amount: 'Rs100,000',
                  riskScore: 95,
                  status: 'Pending',
                },
                {
                  name: 'Raghuraj',
                  amount: 'Rs30,000',
                  riskScore: 82,
                  status: 'Approved',
                },
              ].map((application, idx) => (
                <tr 
                  key={idx}
                  className="hover:bg-gray-50 transition-colors duration-150"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {application.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {application.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center">
                      <div
                        className="h-2 w-24 bg-gray-200 rounded-full overflow-hidden"
                        role="progressbar"
                        aria-valuenow={application.riskScore}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      >
                        <div
                          className="h-full transition-all duration-500"
                          style={{
                            width: `${application.riskScore}%`,
                            backgroundColor: application.riskScore >= 90
                              ? '#10B981'
                              : application.riskScore >= 70
                              ? '#3B82F6'
                              : '#F59E0B'
                          }}
                        />
                      </div>
                      <span className="ml-2 text-gray-600">{application.riskScore}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        application.status === 'Approved'
                          ? 'bg-green-100 text-green-800'
                          : application.status === 'Pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {application.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-blue-600 hover:text-blue-800 font-medium">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Risk Distribution */}
      <Card title="Risk Score Distribution" className="hover-scale">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={riskDistribution}>
              <defs>
                <linearGradient id="riskGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="score" />
              <YAxis />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  borderRadius: '8px',
                  border: 'none',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Area
                type="monotone"
                dataKey="count"
                stroke="#6366F1"
                fill="url(#riskGradient)"
                name="Applications"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
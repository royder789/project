import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { MetricCard } from '../components/ui/MetricCard';
import {
  FileText,
  AlertCircle,
  Clock,
  Search,
  Filter,
  ChevronDown,
  Eye,
  CheckCircle2,
  XCircle,
  Calendar,
  Briefcase,
  CreditCard,
  Building2,
  BadgeIndianRupee,
} from 'lucide-react';

const riskLevels = {
  LOW: { color: 'bg-green-500', text: 'text-green-700', bg: 'bg-green-50' },
  MEDIUM: { color: 'bg-yellow-500', text: 'text-yellow-700', bg: 'bg-yellow-50' },
  HIGH: { color: 'bg-red-500', text: 'text-red-700', bg: 'bg-red-50' },
};

const applications = [
  {
    id: 'APP001',
    name: 'Rahul Sharma',
    amount: '₹25,00,000',
    riskScore: 2,
    status: 'Pending',
    date: '2024-03-15',
    employment: 'Software Engineer',
    company: 'Tech Solutions Ltd',
    income: '₹18,00,000',
    loanType: 'Home Loan',
    duration: '20 years',
    emi: '₹21,000',
  },
  {
    id: 'APP002',
    name: 'Priya Patel',
    amount: '₹8,00,000',
    riskScore: 5,
    status: 'Under Review',
    date: '2024-03-14',
    employment: 'Business Owner',
    company: 'Patel Enterprises',
    income: '₹24,00,000',
    loanType: 'Business Loan',
    duration: '5 years',
    emi: '₹18,500',
  },
  {
    id: 'APP003',
    name: 'Amit Kumar',
    amount: '₹12,00,000',
    riskScore: 8,
    status: 'Flagged',
    date: '2024-03-13',
    employment: 'Marketing Manager',
    company: 'Global Marketing Inc',
    income: '₹15,00,000',
    loanType: 'Personal Loan',
    duration: '3 years',
    emi: '₹42,000',
  },
];

export default function Underwriting() {
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState('7days');

  const getRiskColor = (score) => {
    if (score <= 3) return riskLevels.LOW;
    if (score <= 6) return riskLevels.MEDIUM;
    return riskLevels.HIGH;
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">Underwriting Dashboard</h1>
          <div className="flex space-x-2">
            <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-lg border hover:bg-gray-50">
              Export
            </button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
              New Application
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search applications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="relative">
            <select
              className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg appearance-none focus:ring-blue-500 focus:border-blue-500"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            >
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
              <option value="90days">Last 90 Days</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <ChevronDown className="h-5 w-5 text-gray-400" />
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter className="h-5 w-5 text-gray-400" />
            </div>
            <select
              className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg appearance-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Loan Types</option>
              <option value="home">Home Loan</option>
              <option value="personal">Personal Loan</option>
              <option value="business">Business Loan</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <ChevronDown className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <MetricCard
          title="Total Applications"
          value="1,284"
          change={8}
          icon={<FileText className="w-6 h-6 text-white" />}
          gradient="blue"
        />
        <MetricCard
          title="Pending Approvals"
          value="45"
          change={-12}
          icon={<Clock className="w-6 h-6 text-white" />}
          gradient="orange"
        />
        <MetricCard
          title="Average Risk Score"
          value="3.2"
          change={-5}
          icon={<AlertCircle className="w-6 h-6 text-white" />}
          gradient="green"
        />
      </div>

      {/* Applications Table */}
      <Card title="Recent Applications" className="hover-scale">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Application ID
                </th>
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
              {applications.map((application, idx) => (
                <tr 
                  key={idx}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {application.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {application.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {application.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center">
                      <div
                        className={`h-2.5 w-2.5 rounded-full mr-2 ${getRiskColor(application.riskScore).color}`}
                      />
                      <span>{application.riskScore}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        application.status === 'Approved'
                          ? 'bg-green-100 text-green-800'
                          : application.status === 'Pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {application.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-3">
                      <button
                        onClick={() => setSelectedApplication(application)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Eye className="h-5 w-5" />
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        <CheckCircle2 className="h-5 w-5" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <XCircle className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Application Details Modal */}
      {selectedApplication && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-4xl shadow-lg rounded-lg bg-white animate-slide-in">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-900">
                Application Details
              </h3>
              <button
                onClick={() => setSelectedApplication(null)}
                className="text-gray-400 hover:text-gray-500"
              >
                <XCircle className="h-6 w-6" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Personal Information</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    <span className="text-sm text-gray-600">Application Date:</span>
                    <span className="text-sm font-medium">{selectedApplication.date}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Briefcase className="h-5 w-5 text-gray-400" />
                    <span className="text-sm text-gray-600">Employment:</span>
                    <span className="text-sm font-medium">{selectedApplication.employment}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Building2 className="h-5 w-5 text-gray-400" />
                    <span className="text-sm text-gray-600">Company:</span>
                    <span className="text-sm font-medium">{selectedApplication.company}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <BadgeIndianRupee className="h-5 w-5 text-gray-400" />
                    <span className="text-sm text-gray-600">Annual Income:</span>
                    <span className="text-sm font-medium">{selectedApplication.income}</span>
                  </div>
                </div>
              </div>

              {/* Loan Details */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Loan Details</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <CreditCard className="h-5 w-5 text-gray-400" />
                    <span className="text-sm text-gray-600">Loan Type:</span>
                    <span className="text-sm font-medium">{selectedApplication.loanType}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-gray-400" />
                    <span className="text-sm text-gray-600">Duration:</span>
                    <span className="text-sm font-medium">{selectedApplication.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <BadgeIndianRupee className="h-5 w-5 text-gray-400" />
                    <span className="text-sm text-gray-600">Monthly EMI:</span>
                    <span className="text-sm font-medium">{selectedApplication.emi}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Risk Analysis */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-4">Risk Analysis</h4>
              <div className="flex items-center justify-center mb-4">
                <div className={`text-center p-4 rounded-full ${getRiskColor(selectedApplication.riskScore).bg}`}>
                  <span className="text-3xl font-bold">{selectedApplication.riskScore}</span>
                  <span className="block text-sm mt-1">Risk Score</span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-3 bg-white rounded-lg shadow-sm">
                  <div className="text-sm font-medium text-gray-500">Credit History</div>
                  <div className="mt-1 text-lg font-semibold">Good</div>
                </div>
                <div className="p-3 bg-white rounded-lg shadow-sm">
                  <div className="text-sm font-medium text-gray-500">Income Stability</div>
                  <div className="mt-1 text-lg font-semibold">High</div>
                </div>
                <div className="p-3 bg-white rounded-lg shadow-sm">
                  <div className="text-sm font-medium text-gray-500">Debt Ratio</div>
                  <div className="mt-1 text-lg font-semibold">32%</div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setSelectedApplication(null)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Close
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700">
                Reject
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700">
                Approve
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { MetricCard } from '../components/ui/MetricCard';
import {
  Shield,
  AlertTriangle,
  Clock,
  Search,
  Filter,
  ChevronDown,
  Eye,
  CheckCircle2,
  XCircle,
  UserCheck,
  AlertOctagon,
  FileWarning,
  Building2,
  MapPin,
  Calendar,
  BadgeIndianRupee,
} from 'lucide-react';

const riskLevels = {
  LOW: { color: 'bg-green-500', text: 'text-green-700', bg: 'bg-green-50' },
  MEDIUM: { color: 'bg-yellow-500', text: 'text-yellow-700', bg: 'bg-yellow-50' },
  HIGH: { color: 'bg-red-500', text: 'text-red-700', bg: 'bg-red-50' },
};

const kycApplications = [
  {
    id: 'KYC001',
    name: 'Vikram Singh',
    aadhaar: 'XXXX-XXXX-1234',
    pan: 'ABCDE1234F',
    riskLevel: 'LOW',
    watchlistMatch: false,
    lastVerified: '2024-03-15',
    status: 'Pending',
    address: 'Mumbai, Maharashtra',
    dob: '1985-06-15',
    occupation: 'Business Owner',
    income: '₹35,00,000',
    sanctions: [],
    negativeNews: [],
  },
  {
    id: 'KYC002',
    name: 'Meera Reddy',
    aadhaar: 'XXXX-XXXX-5678',
    pan: 'FGHIJ5678K',
    riskLevel: 'MEDIUM',
    watchlistMatch: true,
    lastVerified: '2024-03-14',
    status: 'Under Review',
    address: 'Bangalore, Karnataka',
    dob: '1990-03-22',
    occupation: 'IT Professional',
    income: '₹28,00,000',
    sanctions: [
      {
        type: 'Partial Match',
        list: 'Local Database',
        reason: 'Similar name found in previous fraud case',
      },
    ],
    negativeNews: [],
  },
  {
    id: 'KYC003',
    name: 'Abdul Rahman',
    aadhaar: 'XXXX-XXXX-9012',
    pan: 'LMNOP9012Q',
    riskLevel: 'HIGH',
    watchlistMatch: true,
    lastVerified: '2024-03-13',
    status: 'Flagged',
    address: 'Delhi, NCR',
    dob: '1978-11-30',
    occupation: 'Import/Export',
    income: '₹45,00,000',
    sanctions: [
      {
        type: 'Direct Match',
        list: 'International Watchlist',
        reason: 'Suspected money laundering activities',
      },
    ],
    negativeNews: [
      {
        date: '2023-12-15',
        source: 'Local News',
        headline: 'Business investigated for tax evasion',
      },
    ],
  },
];

export default function KycAml() {
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [riskFilter, setRiskFilter] = useState('all');

  const getRiskStyle = (level) => {
    return riskLevels[level] || riskLevels.LOW;
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">KYC & AML Compliance</h1>
          <div className="flex space-x-2">
            <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-lg border hover:bg-gray-50">
              Export Report
            </button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
              Bulk Verify
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
              placeholder="Search by name, Aadhaar, or PAN..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <AlertTriangle className="h-5 w-5 text-gray-400" />
            </div>
            <select
              className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg appearance-none focus:ring-blue-500 focus:border-blue-500"
              value={riskFilter}
              onChange={(e) => setRiskFilter(e.target.value)}
            >
              <option value="all">All Risk Levels</option>
              <option value="LOW">Low Risk</option>
              <option value="MEDIUM">Medium Risk</option>
              <option value="HIGH">High Risk</option>
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
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="verified">Verified</option>
              <option value="flagged">Flagged</option>
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
          title="Total KYC Checks"
          value="2,547"
          change={15}
          icon={<UserCheck className="w-6 h-6 text-white" />}
          gradient="blue"
        />
        <MetricCard
          title="Flagged Applications"
          value="23"
          change={-8}
          icon={<AlertOctagon className="w-6 h-6 text-white" />}
          gradient="red"
        />
        <MetricCard
          title="Pending Verifications"
          value="45"
          change={12}
          icon={<FileWarning className="w-6 h-6 text-white" />}
          gradient="orange"
        />
      </div>

      {/* KYC Applications Table */}
      <Card title="KYC Applications" className="hover-scale">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Applicant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Risk Level
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Watchlist Match
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Verified
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
              {kycApplications.map((application, idx) => (
                <tr 
                  key={idx}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {application.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      <div className="text-sm font-medium text-gray-900">{application.name}</div>
                      <div className="text-sm text-gray-500">PAN: {application.pan}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        getRiskStyle(application.riskLevel).bg
                      } ${getRiskStyle(application.riskLevel).text}`}
                    >
                      {application.riskLevel}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {application.watchlistMatch ? (
                      <span className="inline-flex items-center text-red-600">
                        <AlertOctagon className="h-4 w-4 mr-1" />
                        Match Found
                      </span>
                    ) : (
                      <span className="inline-flex items-center text-green-600">
                        <CheckCircle2 className="h-4 w-4 mr-1" />
                        No Match
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {application.lastVerified}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        application.status === 'Verified'
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

      {/* KYC Details Modal */}
      {selectedApplication && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-4xl shadow-lg rounded-lg bg-white animate-slide-in">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-900">
                KYC Details - {selectedApplication.name}
              </h3>
              <button
                onClick={() => setSelectedApplication(null)}
                className="text-gray-400 hover:text-gray-500"
              >
                <XCircle className="h-6 w-6" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Basic Information</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <UserCheck className="h-5 w-5 text-gray-400" />
                    <span className="text-sm text-gray-600">Aadhaar:</span>
                    <span className="text-sm font-medium">{selectedApplication.aadhaar}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    <span className="text-sm text-gray-600">Date of Birth:</span>
                    <span className="text-sm font-medium">{selectedApplication.dob}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5 text-gray-400" />
                    <span className="text-sm text-gray-600">Address:</span>
                    <span className="text-sm font-medium">{selectedApplication.address}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Building2 className="h-5 w-5 text-gray-400" />
                    <span className="text-sm text-gray-600">Occupation:</span>
                    <span className="text-sm font-medium">{selectedApplication.occupation}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <BadgeIndianRupee className="h-5 w-5 text-gray-400" />
                    <span className="text-sm text-gray-600">Annual Income:</span>
                    <span className="text-sm font-medium">{selectedApplication.income}</span>
                  </div>
                </div>
              </div>

              {/* Risk Analysis */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Risk Analysis</h4>
                <div className="p-4 rounded-lg bg-gray-50">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-gray-600">Risk Level</span>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        getRiskStyle(selectedApplication.riskLevel).bg
                      } ${getRiskStyle(selectedApplication.riskLevel).text}`}
                    >
                      {selectedApplication.riskLevel}
                    </span>
                  </div>
                  
                  {selectedApplication.sanctions.length > 0 && (
                    <div className="mb-4">
                      <h5 className="text-sm font-medium text-gray-900 mb-2">Sanctions List Matches</h5>
                      {selectedApplication.sanctions.map((sanction, idx) => (
                        <div key={idx} className="bg-white p-3 rounded-lg mb-2">
                          <div className="flex items-center text-red-600 mb-1">
                            <AlertOctagon className="h-4 w-4 mr-2" />
                            <span className="text-sm font-medium">{sanction.type}</span>
                          </div>
                          <p className="text-sm text-gray-600">{sanction.reason}</p>
                          <p className="text-xs text-gray-500 mt-1">Source: {sanction.list}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {selectedApplication.negativeNews.length > 0 && (
                    <div>
                      <h5 className="text-sm font-medium text-gray-900 mb-2">Negative News</h5>
                      {selectedApplication.negativeNews.map((news, idx) => (
                        <div key={idx} className="bg-white p-3 rounded-lg mb-2">
                          <p className="text-sm text-gray-900">{news.headline}</p>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-xs text-gray-500">{news.source}</span>
                            <span className="text-xs text-gray-500">{news.date}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
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
              <button className="px-4 py-2 text-sm font-medium text-yellow-700 bg-yellow-100 rounded-lg hover:bg-yellow-200">
                Request More Info
              </button>
              <button className="px-4 py-2 text-sm font-medium text-red-700 bg-red-100 rounded-lg hover:bg-red-200">
                Flag for Review
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
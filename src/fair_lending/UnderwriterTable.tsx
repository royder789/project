import React from 'react';
import { UnderwriterData } from '../types';
import { AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

interface UnderwriterTableProps {
  data: UnderwriterData[];
}

export const UnderwriterTable: React.FC<UnderwriterTableProps> = ({ data }) => {
  const getBiasIcon = (status: UnderwriterData['biasAlert']) => {
    switch (status) {
      case 'no-bias':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'possible-bias':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'high-bias':
        return <XCircle className="w-5 h-5 text-red-500" />;
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Underwriter
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Applications
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Approval Rate
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Bias Alert
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {row.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {row.applicationsReviewed}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {row.approvalRate}%
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  {getBiasIcon(row.biasAlert)}
                  <span>{row.biasDetails}</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
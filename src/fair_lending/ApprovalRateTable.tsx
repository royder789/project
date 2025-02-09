import React from 'react';
import { ApprovalRate } from '../types';
import { AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

interface ApprovalRateTableProps {
  data: ApprovalRate[];
}

export const ApprovalRateTable: React.FC<ApprovalRateTableProps> = ({ data }) => {
  const getBiasIcon = (status: ApprovalRate['biasStatus']) => {
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
              Borrower Type
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Approval Rate
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Bias Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {row.borrowerType}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {row.approvalRate}%
                {row.difference && (
                  <span className="ml-2 text-red-500">{row.difference}</span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  {getBiasIcon(row.biasStatus)}
                  <span>
                    {row.biasStatus === 'no-bias'
                      ? 'No Bias Detected'
                      : row.biasStatus === 'possible-bias'
                      ? 'Possible Bias'
                      : 'High Bias Detected'}
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
import React from 'react';
import { ComplianceScore as ComplianceScoreType } from '../types';
import { AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

interface ComplianceScoreProps {
  data: ComplianceScoreType;
}

export const ComplianceScore: React.FC<ComplianceScoreProps> = ({ data }) => {
  const getScoreColor = () => {
    switch (data.status) {
      case 'high':
        return 'text-green-500';
      case 'moderate':
        return 'text-yellow-500';
      case 'low':
        return 'text-red-500';
    }
  };

  const getScoreIcon = () => {
    switch (data.status) {
      case 'high':
        return <CheckCircle className="w-8 h-8 text-green-500" />;
      case 'moderate':
        return <AlertTriangle className="w-8 h-8 text-yellow-500" />;
      case 'low':
        return <XCircle className="w-8 h-8 text-red-500" />;
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Compliance Score</h3>
        {getScoreIcon()}
      </div>
      <div className="text-4xl font-bold mb-4 flex items-center gap-2">
        <span className={getScoreColor()}>{data.score}%</span>
      </div>
      <div className="space-y-4">
        <h4 className="font-medium">Suggested Actions:</h4>
        <ul className="space-y-2">
          {data.suggestions.map((suggestion, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="text-gray-600">•</span>
              <span className="text-sm text-gray-600">{suggestion}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
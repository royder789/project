import React from 'react';
import { clsx } from 'clsx';

interface DashboardCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  className?: string;
}

export const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  className,
}) => {
  return (
    <div className={clsx('bg-white rounded-lg p-6 shadow-md', className)}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900">{value}</p>
          {subtitle && (
            <p className="mt-1 text-sm text-gray-600">{subtitle}</p>
          )}
        </div>
        {icon && (
          <div className="text-gray-400">{icon}</div>
        )}
      </div>
    </div>
  );
}
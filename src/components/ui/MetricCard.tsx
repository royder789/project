import React from 'react';
import { Card } from './Card';
import { ArrowDown, ArrowUp } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon?: React.ReactNode;
  gradient?: 'blue' | 'green' | 'purple' | 'orange';
}

export function MetricCard({ title, value, change, icon, gradient = 'blue' }: MetricCardProps) {
  const isPositive = change && change > 0;

  const gradientClasses = {
    blue: 'bg-gradient-blue',
    green: 'bg-gradient-green',
    purple: 'bg-gradient-purple',
    orange: 'bg-gradient-orange',
  };

  return (
    <Card 
      className={`relative overflow-hidden hover-scale ${gradientClasses[gradient]} text-white animate-slide-in`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-white/80">{title}</p>
          <p className="mt-1 text-3xl font-semibold">{value}</p>
        </div>
        {icon && (
          <div className="p-3 glass-effect rounded-lg">
            {icon}
          </div>
        )}
      </div>
      {typeof change !== 'undefined' && (
        <div className="mt-4 flex items-center text-sm">
          {isPositive ? (
            <ArrowUp className="w-4 h-4 text-green-300" />
          ) : (
            <ArrowDown className="w-4 h-4 text-red-300" />
          )}
          <span className={`ml-1 ${isPositive ? 'text-green-300' : 'text-red-300'}`}>
            {Math.abs(change)}%
          </span>
          <span className="ml-2 text-white/80">from last month</span>
        </div>
      )}
    </Card>
  );
}
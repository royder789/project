import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const data = [
  {
    name: 'Gender',
    male: 68,
    female: 52,
  },
  {
    name: 'Location',
    urban: 70,
    rural: 40,
  },
  {
    name: 'Income',
    high: 75,
    low: 45,
  },
];

export const BiasChart: React.FC = () => {
  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="male" fill="#3B82F6" name="Group A" />
          <Bar dataKey="female" fill="#EF4444" name="Group B" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
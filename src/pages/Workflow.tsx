import React from 'react';
import { TrendingUp, AlertTriangle, Clock, Search } from 'lucide-react';

const WorkflowDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 p-4 flex justify-between items-center">
        
       
        <div className="relative">
          <Search className="absolute left-3 top-2 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 rounded-md bg-gray-700 text-white"
          />
        </div>
      </header>

      {/* Metrics Section */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6">
        <div className="bg-gray-800 p-6 rounded-md text-center">
          <p className="text-gray-400">Total Loans Processed</p>
          <h2 className="text-3xl font-bold">2,847</h2>
          <p className="text-green-400 text-sm">▲ +12.5%</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-md text-center">
          <p className="text-gray-400">Approval Rate</p>
          <h2 className="text-3xl font-bold">78.3%</h2>
          <p className="text-green-400 text-sm">▲ +5.2%</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-md text-center">
          <p className="text-gray-400">SLA Breaches</p>
          <h2 className="text-3xl font-bold">4.2%</h2>
          <p className="text-red-400 text-sm">▼ -2.1%</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-md text-center">
          <p className="text-gray-400">Avg. Processing Time</p>
          <h2 className="text-3xl font-bold">2.1 days</h2>
          <p className="text-red-400 text-sm">▼ -8.3%</p>
        </div>
      </section>

      {/* Alerts Section */}
      <div className="p-6">
        <div className="bg-yellow-700 p-4 rounded-md flex items-center">
          <AlertTriangle className="text-yellow-300 mr-3" />
          Home Loan Approval Delay Detected – AI is Reallocating Cases
        </div>
        <div className="bg-red-700 p-4 rounded-md flex items-center mt-3">
          <AlertTriangle className="text-red-300 mr-3" />
          High SLA Breach in Business Loans – Immediate Action Required!
        </div>
      </div>

      {/* Task Allocation & Performance */}
      <div className="p-6">
        <h3 className="text-xl font-bold">Task Allocation & Performance</h3>
        <table className="w-full mt-4 text-left">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="pb-2">Loan Officer</th>
              <th className="pb-2">Pending Cases</th>
              <th className="pb-2">Avg. Time</th>
              <th className="pb-2">Workload</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-700">
              <td>John Smith</td>
              <td>45</td>
              <td>2.3 days</td>
              <td><span className="text-orange-400">High</span></td>
            </tr>
            <tr className="border-b border-gray-700">
              <td>Sarah Johnson</td>
              <td>28</td>
              <td>1.8 days</td>
              <td><span className="text-yellow-400">Medium</span></td>
            </tr>
            <tr className="border-b border-gray-700">
              <td>Mike Wilson</td>
              <td>32</td>
              <td>2.1 days</td>
              <td><span className="text-yellow-400">Medium</span></td>
            </tr>
            <tr>
              <td>Emma Davis</td>
              <td>52</td>
              <td>2.7 days</td>
              <td><span className="text-red-400">Critical</span></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Notifications */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
        <div className="bg-gray-800 p-6 rounded-md">
          <h4 className="text-lg font-semibold">Automated Reassignment</h4>
          <p className="text-gray-400 mt-1">20 cases redistributed based on workload analysis</p>
          <p className="text-gray-500 text-sm mt-2">2 minutes ago</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-md">
          <h4 className="text-lg font-semibold">SLA Warning</h4>
          <p className="text-gray-400 mt-1">3 high-priority cases approaching breach threshold</p>
          <p className="text-gray-500 text-sm mt-2">5 minutes ago</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-md">
          <h4 className="text-lg font-semibold">Performance Alert</h4>
          <p className="text-gray-400 mt-1">Team efficiency increased by 15% after AI optimization</p>
          <p className="text-gray-500 text-sm mt-2">10 minutes ago</p>
        </div>
      </div>
    </div>
  );
};

export default WorkflowDashboard;

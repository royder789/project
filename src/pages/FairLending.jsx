import React from 'react';
import { DashboardCard } from '../fair_lending/DashboardCard';
import { ApprovalRateTable } from '../fair_lending/ApprovalRateTable';
import { BiasChart } from '../fair_lending/BiasChart';
import { UnderwriterTable } from '../fair_lending/UnderwriterTable';
import { ComplianceScore } from '../fair_lending/ComplianceScore';
import { Users, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';

const approvalRateData = [
  { borrowerType: 'Male Applicants', approvalRate: 68, biasStatus: 'no-bias' },
  { borrowerType: 'Female Applicants', approvalRate: 52, biasStatus: 'possible-bias', difference: '-16%' },
  { borrowerType: 'Urban Borrowers', approvalRate: 70, biasStatus: 'no-bias' },
  { borrowerType: 'Rural Borrowers', approvalRate: 40, biasStatus: 'high-bias' },
];

const underwriterData = [
  { name: 'Amit Kumar', applicationsReviewed: 500, approvalRate: 72, biasAlert: 'no-bias', biasDetails: 'No Bias Detected' },
  { name: 'Priya Sharma', applicationsReviewed: 600, approvalRate: 55, biasAlert: 'possible-bias', biasDetails: 'Female Borrowers Rejected 40% More' },
  { name: 'Ravi Patel', applicationsReviewed: 450, approvalRate: 38, biasAlert: 'high-bias', biasDetails: 'High Bias in Rural Applications' },
];

function FairLending() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Cognitive Bias Checker Dashboard</h1>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <DashboardCard title="Total Applications" value="10,000" icon={<Users className="w-8 h-8" />} />
          <DashboardCard title="Approved Loans" value="6,500" subtitle="65% Approval Rate" icon={<CheckCircle2 className="w-8 h-8 text-green-500" />} />
          <DashboardCard title="Rejected Loans" value="3,500" subtitle="35% Rejection Rate" icon={<XCircle className="w-8 h-8 text-red-500" />} />
          <DashboardCard title="Possible Biased Rejections" value="1,200" subtitle="AI-Detected" icon={<AlertTriangle className="w-8 h-8 text-yellow-500" />} />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h2 className="text-xl font-semibold mb-4">Approval Rates by Demographics</h2>
              <ApprovalRateTable data={approvalRateData} />
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md">
              <h2 className="text-xl font-semibold mb-4">Bias Analysis Trends</h2>
              <BiasChart />
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md">
              <h2 className="text-xl font-semibold mb-4">Underwriter Decision Review</h2>
              <UnderwriterTable data={underwriterData} />
            </div>
          </div>

          {/* Compliance Score */}
          <div className="lg:col-span-1">
            <ComplianceScore
              data={{
                score: 75,
                status: 'moderate',
                suggestions: [
                  'Review gender-based approval disparities',
                  'Implement alternative credit scoring for rural applicants',
                  'Schedule bias training for identified loan officers',
                  'Update policy documentation for consistent decision-making',
                ],
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FairLending;

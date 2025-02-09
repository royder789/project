import React, { useState } from 'react';
import { AlertTriangle, ArrowDown, ArrowUp, DollarSign, Users, TrendingUp, ChevronDown } from 'lucide-react';
import { clsx } from 'clsx';

const applicantData = {
  name: "Rahul Sharma",
  jobTitle: "Software Engineer, Infosys",
  profilePic: "https://english.cdn.zeenews.com/sites/default/files/2017/11/17/639329-indian-men.jpg",
  monthlyIncome: "₹80,000",
  creditScore: 750,
  financialBreakdown: {
    grossIncome: "₹80,000",
    currentEMIs: "₹12,000",
    disposableIncome: "₹68,000",
  }
};

const industryData = [
  { sector: "IT Sector Growth", growth: "12%", trend: "up" },
  { sector: "Banking Sector", growth: "9%", trend: "up" },
  { sector: "Manufacturing", growth: "4%", trend: "up" },
  { sector: "Gig Economy", growth: "Unstable", trend: "down" },
];

const recommendedLoanTerms = [
  { label: "Recommended Interest Rate", value: "6.5%", color: "green" },
  { label: "Suggested Loan Amount", value: "₹50,00,000", color: "blue" },
  { label: "Recommended Tenure", value: "20 Years", color: "purple" },
];

export default function IncomeStability() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isProfileExpanded, setIsProfileExpanded] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={clsx("min-h-screen p-6", isDarkMode ? 'dark bg-gray-900' : 'bg-gray-100')}>
      <div className="max-w-7xl mx-auto">
        
        {/* Header and Dark Mode Toggle */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold dark:text-white">Income Stability Analysis</h1>
          <button
            onClick={toggleDarkMode}
            className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
          >
            {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>

        {/* Applicant Profile Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-4">
              <img src={applicantData.profilePic} alt="Applicant" className="h-16 w-16 object-cover rounded-full" />
              <div>
                <h2 className="text-xl font-semibold dark:text-white">{applicantData.name}</h2>
                <p className="text-gray-500">{applicantData.jobTitle}</p>
              </div>
            </div>
            <button
              onClick={() => setIsProfileExpanded(!isProfileExpanded)}
              className="text-blue-600 hover:text-blue-800"
            >
              <ChevronDown className={`h-6 w-6 transform ${isProfileExpanded ? 'rotate-180' : ''}`} />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Monthly Income</span>
                <DollarSign className="h-5 w-5 text-green-500" />
              </div>
              <p className="text-2xl font-bold">{applicantData.monthlyIncome}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Credit Score</span>
                <TrendingUp className="h-5 w-5 text-green-500" />
              </div>
              <p className="text-2xl font-bold">{applicantData.creditScore}</p>
            </div>
          </div>

          {isProfileExpanded && (
            <div className="border-t pt-4">
              <h3 className="font-medium mb-2 dark:text-white">Detailed Financial Breakdown</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">Gross Income</span>
                  <span>{applicantData.financialBreakdown.grossIncome}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Current EMIs</span>
                  <span>{applicantData.financialBreakdown.currentEMIs}</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span>Disposable Income</span>
                  <span className="text-green-600">{applicantData.financialBreakdown.disposableIncome}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Industry Analysis */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4 dark:text-white">Industry & Market Analysis</h3>
          <div className="space-y-4">
            {industryData.map((data, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className='text-white'>{data.sector}</span>
                <div className={`flex items-center ${data.trend === "up" ? "text-green-500" : "text-red-500"}`}>
                  {data.trend === "up" ? <ArrowUp className="h-4 w-4 mr-1" /> : <ArrowDown className="h-4 w-4 mr-1" />}
                  <span>{data.growth}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI-Generated Loan Terms */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4 dark:text-white">AI-Generated Loan Terms</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recommendedLoanTerms.map((term, index) => (
              <div key={index} className={`bg-${term.color}-50 p-4 rounded-lg`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{term.label}</span>
                  <span className={`text-${term.color}-600 font-bold`}>{term.value}</span>
                </div>
                <p className="text-sm text-gray-600">Based on predictive income stability</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import {
  Building2,
  DollarSign,
  Leaf,
  Users,
  Scale,
  Sun,
  Moon,
  Search,
  ChevronDown,
  AlertTriangle,
  Info,
  Download
} from 'lucide-react';

const companies = [
  { id: 1, name: 'Tech Solutions Corp', sector: 'Technology', loanAmount: '5M', esgScore: 75 },
  { id: 2, name: 'Green Energy Ltd', sector: 'Energy', loanAmount: '10M', esgScore: 85 },
  { id: 3, name: 'Global Manufacturing Inc', sector: 'Manufacturing', loanAmount: '7.5M', esgScore: 65 },
  { id: 4, name: 'Sustainable Foods Co', sector: 'Consumer Goods', loanAmount: '3M', esgScore: 80 },
  { id: 5, name: 'Digital Finance Group', sector: 'Finance', loanAmount: '15M', esgScore: 70 },
];

const ESG = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(companies[0]);
  
  const getRiskClassification = (score) => {
    if (score >= 80) return { text: 'Low Risk', color: 'text-green-500' };
    if (score >= 60) return { text: 'Moderate Risk', color: 'text-yellow-500' };
    return { text: 'High Risk', color: 'text-red-500' };
  };
  
  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-100'}`}> 
      {/* Header */}
      <header className="bg-gray-900 p-4 flex justify-between items-center text-white">
        <h1 className="text-xl font-bold">ESG Scoring Dashboard</h1>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-2 text-gray-400" />
            <input
              type="text"
              placeholder="Search companies or sectors..."
              className="pl-10 pr-4 py-2 rounded-md bg-gray-800 text-white"
            />
          </div>
          <select
            onChange={(e) => setSelectedCompany(companies.find(c => c.id === parseInt(e.target.value)))}
            className="bg-gray-800 text-white px-3 py-2 rounded-md"
          >
            {companies.map(company => (
              <option key={company.id} value={company.id}>{company.name}</option>
            ))}
          </select>
          <button onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <Sun /> : <Moon />}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto py-8 px-6 grid gap-6">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-md shadow-md flex items-center">
            <Building2 className="text-blue-500 w-8 h-8" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold">{selectedCompany.name}</h3>
              <p className="text-sm text-gray-500">{selectedCompany.sector}</p>
              <p className="text-green-500 font-bold">Loan Amount: ${selectedCompany.loanAmount}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-md shadow-md flex flex-col items-center">
            <h3 className="text-lg font-semibold">Overall ESG Score</h3>
            <div className="w-24 h-24 flex items-center justify-center rounded-full bg-yellow-500 text-white text-3xl font-bold">
              {selectedCompany.esgScore}
            </div>
          </div>
          <div className="bg-white p-6 rounded-md shadow-md">
            <h3 className="text-lg font-semibold">Risk Classification</h3>
            <p className={`mt-2 text-xl ${getRiskClassification(selectedCompany.esgScore).color}`}>{getRiskClassification(selectedCompany.esgScore).text}</p>
          </div>
        </div>

        {/* ESG Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-md shadow-md">
            <div className="flex items-center gap-2">
              <Leaf className="text-green-500" />
              <h3 className="text-lg font-semibold">Environmental</h3>
            </div>
            <p className="mt-2 text-gray-500">Carbon Footprint</p>
            <div className="bg-gray-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full w-3/4"></div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-md shadow-md">
            <div className="flex items-center gap-2">
              <Users className="text-blue-500" />
              <h3 className="text-lg font-semibold">Social</h3>
            </div>
            <p className="mt-2 text-gray-500">Workforce Diversity</p>
            <div className="bg-gray-200 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full w-4/5"></div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-md shadow-md">
            <div className="flex items-center gap-2">
              <Scale className="text-purple-500" />
              <h3 className="text-lg font-semibold">Governance</h3>
            </div>
            <p className="mt-2 text-gray-500">Board Independence</p>
            <div className="bg-gray-200 rounded-full h-2">
              <div className="bg-purple-500 h-2 rounded-full w-3/4"></div>
            </div>
          </div>
        </div>

        {/* Actions & Export */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-md shadow-md">
            <h3 className="text-lg font-semibold">Actions</h3>
            <button className="w-full bg-green-600 text-white p-2 mt-2 rounded-md">Approve with Standard Terms</button>
            <button className="w-full bg-yellow-600 text-white p-2 mt-2 rounded-md">Request Additional Documentation</button>
          </div>
          <div className="bg-white p-6 rounded-md shadow-md flex justify-center items-center">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2">
              <Download /> Export Report
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ESG;

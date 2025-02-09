import React from 'react';
import {
  AlertTriangle,
  Smartphone,
  Globe,
  Shield,
  Users,
  AlertOctagon,
  CheckCircle,
  XCircle,
  Mail,
  Phone,
} from 'lucide-react';

const riskCategories = [
  {
    title: 'Mobile Emulators',
    risk: '85%',
    details: [
      'Multiple device IDs',
      'Inconsistent OS signals',
      'Virtual environment markers',
    ],
    color: 'bg-red-100 text-red-800',
  },
  {
    title: 'VPN/Proxy Usage',
    risk: '75%',
    details: ['IP hopping', 'Known VPN endpoints', 'Geolocation mismatch'],
    color: 'bg-yellow-100 text-yellow-800',
  },
  {
    title: 'Browser Manipulation',
    risk: '70%',
    details: [
      'Modified user agents',
      'Canvas fingerprint anomalies',
      'JavaScript inconsistencies',
    ],
    color: 'bg-yellow-100 text-yellow-800',
  },
];

const fraudCases = [
  {
    id: 'FRD-2024-001',
    applicant: 'John Smith',
    fraudType: 'Synthetic ID',
    riskScores: [89, 85, 92],
    status: 'Under Review',
    velocity: '2 devices/24h',
    actions: ['Review', 'Block'],
  },
  {
    id: 'FRD-2024-002',
    applicant: 'Sarah Johnson',
    fraudType: 'Document Tampering',
    riskScores: [95, 78, 88],
    status: 'Escalated',
    velocity: '1 devices/24h',
    actions: ['Review', 'Block'],
  },
  {
    id: 'FRD-2024-003',
    applicant: 'Michael Brown',
    fraudType: 'Device Spoofing',
    riskScores: [78, 65, 72],
    status: 'Blocked',
    velocity: '3 devices/24h',
    actions: ['Review', 'Block'],
  },
];

const Fraud = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen space-y-6">
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Device Risk Analysis</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {riskCategories.map((risk, index) => (
            <div key={index} className="p-4 border rounded-lg bg-gray-50">
              <div className="flex justify-between">
                <h3 className="font-medium">{risk.title}</h3>
                <span className={`px-2 py-1 text-sm font-semibold rounded ${risk.color}`}>
                  Risk: {risk.risk}
                </span>
              </div>
              <ul className="mt-2 text-sm text-gray-600 list-disc pl-5">
                {risk.details.map((detail, idx) => (
                  <li key={idx}>{detail}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

     
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-semibold">Recent Fraud Cases</h2>
          <div className="space-x-2">
            <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg">Filter</button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg">Export</button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Case ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Applicant</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Risk Scores</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Velocity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {fraudCases.map((fraud, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-6 py-4">{fraud.id}</td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{fraud.applicant}</div>
                    <div className="text-sm text-gray-500">{fraud.fraudType}</div>
                  </td>
                  <td className="px-6 py-4 flex space-x-2">
                    {fraud.riskScores.map((score, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 text-xs font-semibold rounded bg-yellow-100 text-yellow-800"
                      >
                        {score}%
                      </span>
                    ))}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{fraud.status}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{fraud.velocity}</td>
                  <td className="px-6 py-4 space-x-2">
                    {fraud.actions.map((action, i) => (
                      <button
                        key={i}
                        className={`px-4 py-2 text-sm font-medium rounded-lg ${
                          action === 'Block' ? 'bg-red-600 text-white' : 'bg-purple-500 text-white'
                        }`}
                      >
                        {action}
                      </button>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Fraud;

/*import React, { useEffect, useState } from "react";
import { db, collection, getDocs } from "../../firebase"; // Firestore import

const Fraud = () => {
  const [fraudCases, setFraudCases] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
              
  // Fetch Fraud Cases from Firestore
  useEffect(() => {
    console.log("fdgfd")
    const fetchApplications = async () => {
      try {
        const appCollection = collection(db, "applications"); // Firestore collection
        const snapshot = await getDocs(appCollection);
        const appData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        
        // Filter only cases where risk_level is "High"
        console.log(appData);
        console.log("appData");
        const fraudData = appData.filter((app) => app.incomeStability?.risk_level === "High");

        setFraudCases(fraudData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching fraud cases:", error);
        setError("Failed to load fraud cases.");
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen space-y-6">
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-semibold">Fraudulent Applications</h2>
        </div>

        {loading ? (
          <p>Loading fraud cases...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : fraudCases.length === 0 ? (
          <p className="text-gray-600">No fraudulent applications found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Applicant</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Loan Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Risk Level</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Documents</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {fraudCases.map((fraud, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      {fraud.personal?.firstName || "Unknown"} {fraud.personal?.lastName || ""}
                    </td>
                    <td className="px-6 py-4">{fraud.personal?.phone || "N/A"}</td>
                    <td className="px-6 py-4">{fraud.personal?.email || "N/A"}</td>
                    <td className="px-6 py-4">₹{fraud.loan?.loanAmount || "N/A"}</td>
                    <td className="px-6 py-4 text-red-500 font-semibold">High</td>
                    <td className="px-6 py-4">{fraud.status || "N/A"}</td>
                    <td className="px-6 py-4 space-y-1">
                      {fraud.documents?.idProof && (
                        <a
                          href={fraud.documents.idProof}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 underline"
                        >
                          ID Proof
                        </a>
                      )}
                      {fraud.documents?.addressProof && (
                        <a
                          href={fraud.documents.addressProof}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 underline"
                        >
                          Address Proof
                        </a>
                      )}
                      {fraud.documents?.incomeProof && (
                        <a
                          href={fraud.documents.incomeProof}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 underline"
                        >
                          Income Proof
                        </a>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Fraud;
*/


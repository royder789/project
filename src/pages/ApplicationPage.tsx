import React, { useState, useEffect } from 'react';
import { Card } from '../components/ui/Card';
import { MetricCard } from '../components/ui/MetricCard';
// Import Firestore methods and your db instance
import { addDoc, collection, getDocs, db } from "../../firebase";
import { updateDoc, doc } from "firebase/firestore";
import {
  Eye,
  XCircle,
  Shield,
  UserCheck,
  Building2,
  Calendar,
  BadgeIndianRupee,
  AlertTriangle,
  Clock,
  CheckCircle2,
  AlertOctagon,
  FileText,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';

const keyFigures = {
  totalApplications: 1284,
  flaggedApplications: 23,
  pendingVerifications: 45,
  averageRiskScore: 3.2,
};

// Dummy data used as the initial state (with the original structure)
const dummyApplications = [
  {
    id: 'APP001',
    name: 'Rahul Sharma',
    amount: '₹25,00,000',
    status: 'Pending',
    kycStatus: 'Verified',
    riskScore: 2,
    creditScore: 750,
    underwritingStatus: 'Under Review',
    employment: {
      type: 'Software Engineer',
      company: 'Tech Solutions Ltd',
      income: '₹18,00,000',
      experience: '5 years',
      sector: 'Information Technology',
      employmentType: 'Permanent',
    },
    loan: {
      type: 'Home Loan',
      duration: '20 years',
      emi: '₹21,000',
      interestRate: '8.5%',
      processingFee: '₹50,000',
      securityType: 'Property Mortgage',
    },
    kyc: {
      aadhaar: 'XXXX-XXXX-1234',
      pan: 'ABCDE1234F',
      address: 'Mumbai, Maharashtra',
      dob: '15-05-1990',
      gender: 'Male',
      nationality: 'Indian',
      watchlistMatch: false,
      verificationStatus: 'Completed',
      lastVerified: '2024-03-15',
    },
    bankDetails: {
      accountNumber: 'XXXX-XXXX-4567',
      bankName: 'HDFC Bank',
      ifscCode: 'HDFC0001234',
      accountType: 'Savings',
    },
    incomeStability: 'High',
    debtToIncomeRatio: '32%',
    monthlyObligations: '₹35,000',
    videoUrl: 'https://example.com/applicant-video.mp4',
    documents: [
      { name: 'Salary Slips', status: 'Verified' },
      { name: 'Bank Statements', status: 'Pending' },
      { name: 'Address Proof', status: 'Verified' },
      { name: 'PAN Card', status: 'Verified' },
    ],
  },
];

const ApplicationPage = () => {
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  // Initially load dummy applications; later replaced by Firebase data.
  const [applications, setApplications] = useState(dummyApplications);

  // Simple helpers for styling
  const getRiskColor = (score) => {
    if (score <= 3) return 'text-green-600';
    if (score <= 6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStatusBadge = (status) => {
    const colors = {
      Verified: 'bg-green-100 text-green-800',
      Pending: 'bg-yellow-100 text-yellow-800',
      'Under Review': 'bg-blue-100 text-blue-800',
      Completed: 'bg-green-100 text-green-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  // Fetch data from Firebase when the component mounts
  useEffect(() => {
    async function fetchFirebaseData() {
      try {
        const querySnapshot = await getDocs(collection(db, "loanApplications"));
        const firebaseApps = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("Firebase Applications: ", firebaseApps);
        setApplications(firebaseApps);
      } catch (error) {
        console.error("Error fetching Firebase data: ", error);
      }
    }
    fetchFirebaseData();
  }, []);

  // Handler to update the Firestore document as approved
  const handleApprove = async () => {
    try {
      const docRef = doc(db, "loanApplications", selectedApplication.id);
      await updateDoc(docRef, {
        isApproved: true,
        isRejected: false,
        isVideoVerificationRequested: false,
        status: "Approved",
      });
      setApplications(prevApps =>
        prevApps.map(app =>
          app.id === selectedApplication.id
            ? { ...app, status: "Approved", isApproved: true }
            : app
        )
      );
      setSelectedApplication(null);
    } catch (error) {
      console.error("Error approving application: ", error);
    }
  };

  // Handler to update the Firestore document as rejected
  const handleReject = async () => {
    try {
      const docRef = doc(db, "loanApplications", selectedApplication.id);
      await updateDoc(docRef, {
        isApproved: false,
        isRejected: true,
        isVideoVerificationRequested: false,
        status: "Rejected",
      });
      setApplications(prevApps =>
        prevApps.map(app =>
          app.id === selectedApplication.id
            ? { ...app, status: "Rejected", isRejected: true }
            : app
        )
      );
      setSelectedApplication(null);
    } catch (error) {
      console.error("Error rejecting application: ", error);
    }
  };

  // Handler to update the Firestore document with a video verification request
  const handleRequestVideoVerification = async () => {
    try {
      const docRef = doc(db, "loanApplications", selectedApplication.id);
      await updateDoc(docRef, {
        isApproved: false,
        isRejected: false,
        isVideoVerificationRequested: true,
        status: "Video Verification Requested",
      });
      setApplications(prevApps =>
        prevApps.map(app =>
          app.id === selectedApplication.id
            ? { ...app, status: "Video Verification Requested", isVideoVerificationRequested: true }
            : app
        )
      );
      setSelectedApplication(null);
    } catch (error) {
      console.error("Error requesting video verification: ", error);
    }
  };

  return (
    <div className="space-y-6 p-6 bg-gray-100 rounded-xl shadow-lg">
      {/* Top Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard 
          title="Total Applications" 
          value={applications.length} 
          icon={<FileText className="w-6 h-6 text-white" />}
          gradient="blue" 
        />
       
        <MetricCard 
          title="Pending Verifications" 
          value={applications.filter((e)=>e.status==null).length} 
          icon={<Clock className="w-6 h-6 text-white" />}
          gradient="purple" 
        />
        <MetricCard 
          title="Avg. Risk Score" 
          value={keyFigures.averageRiskScore} 
          icon={<AlertOctagon className="w-6 h-6 text-white" />}
          gradient="green" 
        />
      </div>

      {/* Applications Table */}
      <Card title="Pending Applications" className="bg-white shadow-lg rounded-lg p-4">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Application ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Applicant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {applications.map((app, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition duration-200">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {app.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      <div className="text-sm font-medium text-gray-900">
                        {app.personal
                          ? `${app.personal.firstName} ${app.personal.lastName}`
                          : app.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {app.personal
                          ? `Email: ${app.personal.email}`
                          : `PAN: ${app.kyc?.pan || 'N/A'}`}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {app.loan
                      ? `₹${app.loan.loanAmount}`
                      : app.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(app.status || "Pending")}`}>
                      {app.status || "Pending"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
            <div className="flex space-x-4">
              <button
                onClick={() => setSelectedApplication(app)}
                className="text-blue-600 hover:text-blue-900 flex items-center space-x-2"
              >
                <Eye className="h-5 w-5" />
                <span>View Details</span>
              </button>
              <button
                onClick={() => setIncomeStabilityView(app)}
                className="text-green-600 hover:text-green-900 flex items-center space-x-2"
              >
                <Shield className="h-5 w-5" />
                <span>Income Stability</span>
              </button>
            </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Details Modal */}
      {selectedApplication && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-start overflow-y-auto z-50">
          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-7xl my-8 mx-4">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Application Details
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Application ID: {selectedApplication.id}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedApplication(null)}
                  className="text-gray-400 hover:text-gray-500 transition-colors"
                >
                  <XCircle className="h-6 w-6" />
                </button>
              </div>

              {/* Quick Stats */}
              <div className="mt-4 grid grid-cols-4 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <UserCheck className="h-5 w-5 text-blue-500 mr-2" />
                      <span className="text-sm font-medium text-gray-500">KYC Status</span>
                    </div>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(selectedApplication.kyc?.verificationStatus || "Pending")}`}>
                      {selectedApplication.kyc?.verificationStatus || "Pending"}
                    </span>
                  </div>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <AlertTriangle className="h-5 w-5 text-green-500 mr-2" />
                      <span className="text-sm font-medium text-gray-500">Risk Score</span>
                    </div>
                    <span className={`font-semibold ${getRiskColor(selectedApplication.riskScore || 5)}`}>
                      {selectedApplication.riskScore || 5}
                    </span>
                  </div>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <BadgeIndianRupee className="h-5 w-5 text-purple-500 mr-2" />
                    <span className="text-sm font-medium text-gray-500">Loan Amount</span>
                    <span className="font-semibold text-gray-900">
                      {selectedApplication.loan ? `₹${selectedApplication.loan.loanAmount}` : selectedApplication.amount}
                    </span>
                  </div>
                </div>
                <div className="bg-orange-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <Clock className="h-5 w-5 text-orange-500 mr-2" />
                    <span className="text-sm font-medium text-gray-500">Status</span>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(selectedApplication.status || "Pending")}`}>
                      {selectedApplication.status || "Pending"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200">
              <nav className="px-6 -mb-px flex space-x-8">
                {['overview', 'kyc', 'income', 'loan', 'documents'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="grid grid-cols-3 gap-6">
                  {/* Personal Information */}
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center space-x-2 mb-4">
                      <UserCheck className="h-5 w-5 text-blue-500" />
                      <h3 className="text-lg font-medium text-gray-900">Personal Information</h3>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Name</span>
                        <span className="font-medium">
                          {selectedApplication.personal
                            ? `${selectedApplication.personal.firstName} ${selectedApplication.personal.lastName}`
                            : selectedApplication.name}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Date of Birth</span>
                        <span className="font-medium">
                          {selectedApplication.personal?.dob || selectedApplication.kyc?.dob || "N/A"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Email</span>
                        <span className="font-medium">
                          {selectedApplication.personal?.email || "N/A"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Phone</span>
                        <span className="font-medium">
                          {selectedApplication.personal?.phone || "N/A"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Address</span>
                        <span className="font-medium">
                          {selectedApplication.personal?.address || selectedApplication.kyc?.address || "N/A"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Employment Details */}
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center space-x-2 mb-4">
                      <Building2 className="h-5 w-5 text-purple-500" />
                      <h3 className="text-lg font-medium text-gray-900">Employment</h3>
                    </div>
                    <div className="space-y-4">
                      {selectedApplication.financial ? (
                        <>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Employment Type</span>
                            <span className="font-medium">{selectedApplication.financial.employmentType}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Employer</span>
                            <span className="font-medium">{selectedApplication.financial.employer}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Work Experience (years)</span>
                            <span className="font-medium">{selectedApplication.financial.workExperience}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Monthly Income</span>
                            <span className="font-medium">{selectedApplication.financial.monthlyIncome}</span>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Occupation</span>
                            <span className="font-medium">{selectedApplication.employment?.type}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Company</span>
                            <span className="font-medium">{selectedApplication.employment?.company}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Experience</span>
                            <span className="font-medium">{selectedApplication.employment?.experience}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Income</span>
                            <span className="font-medium">{selectedApplication.employment?.income}</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Loan Information */}
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center space-x-2 mb-4">
                      <BadgeIndianRupee className="h-5 w-5 text-green-500" />
                      <h3 className="text-lg font-medium text-gray-900">Loan Details</h3>
                    </div>
                    <div className="space-y-4">
                      {selectedApplication.loan ? (
                        <>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Purpose</span>
                            <span className="font-medium">{selectedApplication.loan.loanPurpose}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Amount</span>
                            <span className="font-medium">₹{selectedApplication.loan.loanAmount}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Tenure</span>
                            <span className="font-medium">{selectedApplication.loan.loanTenure} months</span>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Type</span>
                            <span className="font-medium">{selectedApplication.loan?.type}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Amount</span>
                            <span className="font-medium">{selectedApplication.amount}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Duration</span>
                            <span className="font-medium">{selectedApplication.loan?.duration}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">EMI</span>
                            <span className="font-medium">{selectedApplication.loan?.emi}</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* KYC Tab */}
              {activeTab === 'kyc' && (
                <div className="space-y-6">
                  {selectedApplication.kyc && Object.keys(selectedApplication.kyc).length > 0 ? (
                    <div className="grid grid-cols-3 gap-6">
                      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">KYC Details</h3>
                        <pre className="text-sm text-gray-700">
                          {JSON.stringify(selectedApplication.kyc, null, 2)}
                        </pre>
                      </div>
                    </div>
                  ) : (
                    <div className="text-gray-600">No KYC data available.</div>
                  )}
                </div>
              )}

              {/* Income Tab */}
              {activeTab === 'income' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Income Details</h3>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Monthly Income</span>
                        <span className="font-medium">
                          {selectedApplication.financial?.monthlyIncome || "N/A"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Work Experience</span>
                        <span className="font-medium">
                          {selectedApplication.financial?.workExperience || "N/A"}
                        </span>
                      </div>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Bank Details</h3>
                      <div className="text-gray-500">No bank details available.</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Loan Tab */}
              {activeTab === 'loan' && (
                <div className="space-y-6">
                  {selectedApplication.loan ? (
                    <div className="grid grid-cols-2 gap-6">
                      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Loan Information</h3>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Purpose</span>
                          <span className="font-medium">{selectedApplication.loan.loanPurpose}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Amount</span>
                          <span className="font-medium">₹{selectedApplication.loan.loanAmount}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Tenure</span>
                          <span className="font-medium">{selectedApplication.loan.loanTenure} months</span>
                        </div>
                      </div>
                      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Details</h3>
                        <div className="text-gray-500">No additional payment details available.</div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-gray-600">No loan data available.</div>
                  )}
                </div>
              )}
              

              {/* Documents Tab */}
              {activeTab === 'documents' && (
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Required Documents</h3>
                    <div className="grid grid-cols-3 gap-4">
                      {selectedApplication.documents && typeof selectedApplication.documents === "object" ? (
                        Object.entries(selectedApplication.documents).map(([docName, docValue], idx) => (
                          <div key={idx} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center space-x-2">
                                <FileText className="h-5 w-5 text-gray-400" />
                                <span className="text-sm font-medium text-gray-900">{docName}</span>
                              </div>
                            </div>
                            <div className="mt-2 flex justify-end">
                              <a
                                href={docValue}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                              >
                                View Document
                              </a>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-gray-600">No document data available.</div>
                      )}
                    </div>
                    <div>
                      {selectedApplication.videoUrl && <video width="500" controls>
            <source src={selectedApplication.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>}
                    </div>
                    
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setSelectedApplication(null)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Close
              </button>
              <button
                onClick={handleRequestVideoVerification}
                className="px-4 py-2 text-sm font-medium text-yellow-700 bg-yellow-100 rounded-lg hover:bg-yellow-200"
              >
                Request Video Verification
              </button>
              <button
                onClick={handleReject}
                className="px-4 py-2 text-sm font-medium text-red-700 bg-red-100 rounded-lg hover:bg-red-200"
              >
                Reject
              </button>
              <button
                onClick={handleApprove}
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700"
              >
                Approve
              </button>
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
};

export default ApplicationPage;

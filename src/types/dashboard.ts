export interface LoanApplication {
  id: string;
  applicantName: string;
  requestedAmount: number;
  riskScore: number;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
}

export interface KYCAlert {
  id: string;
  applicantName: string;
  reason: string;
  severity: 'low' | 'medium' | 'high';
  status: 'pending' | 'resolved';
}

export interface PerformanceMetric {
  date: string;
  value: number;
  category: string;
}

export interface ESGScore {
  id: string;
  companyName: string;
  environmental: number;
  social: number;
  governance: number;
  overallScore: number;
}

export interface DocumentValidation {
  id: string;
  documentType: string;
  status: 'success' | 'pending' | 'failed';
  extractedFields: Record<string, string>;
  confidence: number;
}
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayout from './components/layout/DashboardLayout';
import Dashboard from './pages/Dashboard';
import KycAml from './pages/KycAml';
import Underwriting from './pages/Underwriting';
import LoanAnalytics from './pages/LoanAnalytics';
import FairLending from './pages/FairLending';
import TTYOptimization from './pages/TTYOptimization';
import IncomeStability from './pages/incomesta';
import ESG from './pages/EGS';
import FraudDashboard from './pages/FraudDashboard';
import WorkflowDashboard from './pages/Workflow';
import Applications from './pages/ApplicationPage';
import Fraud from './pages/FraudDashboard';
import Login from './pages/login';
import SignIn from './pages/signin';




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="application" element={<Applications />} /> 
          <Route path="underwriting" element={<Underwriting />} /> 
          <Route path="analytics" element={<LoanAnalytics />} /> 
          <Route path="fair-lending" element={<FairLending/>} /> 
          <Route path="tty" element={<TTYOptimization/>} />
          <Route path="income-stability" element={<IncomeStability/>} />
          <Route path="esg" element={<ESG/>} /> 
          <Route path="fraud-detection" element={<FraudDashboard/>} /> 
          <Route path="workflow" element={<WorkflowDashboard/>} />
          <Route path="fraud-detection" element={<Fraud/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signin" element={<SignIn />} />
          

          
         

        
          
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
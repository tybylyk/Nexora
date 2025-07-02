import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginForm from './components/Auth/LoginForm';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import DashboardOverview from './components/Dashboard/DashboardOverview';
import CandidateManagement from './components/HR/CandidateManagement';
import CVManagement from './components/HR/CVManagement';
import InterviewScheduler from './components/HR/InterviewScheduler';
import EmployeeManagement from './components/HR/EmployeeManagement';
import PayrollManagement from './components/HR/PayrollManagement';
import HRSettings from './components/HR/HRSettings';
import CallInterface from './components/CallCenter/CallInterface';
import ClientInbox from './components/CallCenter/ClientInbox';
import AnalyticsDashboard from './components/Analytics/AnalyticsDashboard';
import SettingsPanel from './components/Settings/SettingsPanel';
import NotificationCenter from './components/Notifications/NotificationCenter';
import TimeTracker from './components/TimeTracking/TimeTracker';
import ConversationMonitor from './components/CallCenter/ConversationMonitor';
import UserManagement from './components/Admin/UserManagement';
import TeamManagement from './components/Admin/TeamManagement';
import TeammatesChat from './components/Teammates/TeammatesChat';
import NotesCenter from './components/Notes/NotesCenter';
import ClientsManagement from './components/CRM/ClientsManagement';
import DealsManagement from './components/CRM/DealsManagement';
import ContactsManagement from './components/CRM/ContactsManagement';
import TicketsManagement from './components/Helpdesk/TicketsManagement';
import KnowledgeBase from './components/Helpdesk/KnowledgeBase';
import DepartmentsManagement from './components/HR/DepartmentsManagement';
import WorkdayRequests from './components/WorkdayRequests/WorkdayRequests';

function AppContent() {
  const { user, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginForm />;
  }

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardOverview />;
      
      // Admin
      case 'users':
        return <UserManagement />;
      case 'team':
        return <TeamManagement />;
      
      // HR Management
      case 'employees':
        return <EmployeeManagement />;
      case 'departments':
        return <DepartmentsManagement />;
      case 'payroll':
        return <PayrollManagement />;
      case 'candidates':
        return <CandidateManagement />;
      case 'cv-management':
        return <CVManagement />;
      case 'interviews':
        return <InterviewScheduler />;
      case 'hr-settings':
        return <HRSettings />;
      
      // CRM
      case 'clients':
        return <ClientsManagement />;
      case 'deals':
        return <DealsManagement />;
      case 'contacts':
        return <ContactsManagement />;
      
      // Helpdesk
      case 'tickets':
        return <TicketsManagement />;
      case 'calls':
        return <CallInterface />;
      case 'messages':
        return <ClientInbox />;
      case 'call-monitoring':
        return <ConversationMonitor />;
      case 'knowledge-base':
        return <KnowledgeBase />;
      
      // General
      case 'teammates':
        return <TeammatesChat />;
      case 'notes':
        return <NotesCenter />;
      case 'time-tracking':
        return <TimeTracker />;
      case 'analytics':
        return <AnalyticsDashboard />;
      case 'notifications':
        return <NotificationCenter />;
      case 'workdayrequests':
        return <WorkdayRequests />;
      case 'settings':
        return <SettingsPanel />;
      
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        isCollapsed={isSidebarCollapsed}
        toggleCollapse={toggleSidebar}
      />
      <Header 
        isSidebarCollapsed={isSidebarCollapsed}
        toggleSidebar={toggleSidebar}
      />
      <main className={`pt-16 transition-all duration-300 ${
        isSidebarCollapsed ? 'ml-16' : 'ml-64'
      }`}>
        {renderContent()}
      </main>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
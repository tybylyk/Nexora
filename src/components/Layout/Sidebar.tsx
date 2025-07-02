import React from 'react';
import { 
  Users, 
  Phone, 
  UserCheck, 
  BarChart3, 
  Settings, 
  Clock,
  MessageSquare,
  FileText,
  Target,
  Headphones,
  Bell,
  StickyNote,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Shield,
  UserPlus,
  Building,
  DollarSign,
  Upload,
  Ticket,
  Database,
  Smartphone,
  PenLine
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isCollapsed: boolean;
  toggleCollapse: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, isCollapsed, toggleCollapse }) => {
  const { user } = useAuth();

  const getMenuItems = () => {
    const baseItems = [
      { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    ];

    const adminItems = [
      { id: 'users', label: 'User Management', icon: Shield },
      { id: 'team', label: 'Team Management', icon: Users },
      { id: 'settings', label: 'Settings', icon: Settings },
    ];

    const hrItems = [
      { id: 'employees', label: 'Employees', icon: Users },
      { id: 'departments', label: 'Departments', icon: Building },
      { id: 'payroll', label: 'Payroll', icon: DollarSign },
      { id: 'candidates', label: 'Candidates', icon: UserCheck },
      { id: 'cv-management', label: 'CV Management', icon: FileText },
      { id: 'interviews', label: 'Interviews', icon: Calendar },
      { id: 'hr-settings', label: 'HR Settings', icon: Settings },
    ];

    const crmItems = [
      { id: 'clients', label: 'Clients', icon: Users },
      { id: 'deals', label: 'Deals', icon: Target },
      { id: 'contacts', label: 'Contacts', icon: UserPlus },
    ];

    const helpdeskItems = [
      { id: 'tickets', label: 'Tickets', icon: Ticket },
      { id: 'calls', label: 'Call Center', icon: Phone },
      { id: 'messages', label: 'Client Inbox', icon: MessageSquare },
      { id: 'call-monitoring', label: 'Call Monitoring', icon: Headphones },
      { id: 'knowledge-base', label: 'Knowledge Base', icon: BookOpen },
    ];

    const generalItems = [
      { id: 'teammates', label: 'Team Chat', icon: UserPlus },
      { id: 'notes', label: 'Call Center Notes', icon: StickyNote },
      { id: 'time-tracking', label: 'Time Tracking', icon: Clock },
      { id: 'analytics', label: 'Analytics & KPIs', icon: Target },
      { id: 'notifications', label: 'Notifications', icon: Bell },
      { id: 'workdayrequests', label: 'Workday Requests', icon: PenLine },
    ];

    const menuSections = [];

    // Add base items
    menuSections.push({ title: '', items: baseItems });

    // Add role-specific sections
    switch (user?.role) {
      case 'admin':
        menuSections.push(
          { title: 'Admin', items: adminItems },
          { title: 'HR Management', items: hrItems },
          { title: 'CRM', items: crmItems },
          { title: 'Helpdesk', items: helpdeskItems },
          { title: 'General', items: generalItems }
        );
        break;
      case 'manager':
        menuSections.push(
          { title: 'Admin', items: [adminItems[1], adminItems[2]] }, // Team Management and Settings
          { title: 'HR Management', items: hrItems },
          { title: 'CRM', items: crmItems },
          { title: 'Helpdesk', items: helpdeskItems },
          { title: 'General', items: generalItems }
        );
        break;
      case 'team_leader':
        menuSections.push(
          { title: 'Team', items: [adminItems[1]] },
          { title: 'Helpdesk', items: helpdeskItems },
          { title: 'General', items: generalItems.filter(item => 
            ['teammates', 'notes', 'time-tracking', 'notifications'].includes(item.id)
          )}
        );
        break;
      case 'hr':
        menuSections.push(
          { title: 'HR Management', items: hrItems },
          { title: 'General', items: generalItems.filter(item => 
            ['teammates', 'notifications'].includes(item.id)
          )}
        );
        break;
      case 'call_center':
        menuSections.push(
          { title: 'Helpdesk', items: helpdeskItems.filter(item => 
            ['tickets', 'calls', 'messages', 'knowledge-base'].includes(item.id)
          )},
          { title: 'General', items: generalItems.filter(item => 
            ['teammates', 'notes', 'time-tracking', 'notifications'].includes(item.id)
          )}
        );
        break;
      case 'intern':
        menuSections.push(
          { title: 'General', items: generalItems.filter(item => 
            ['teammates', 'notes', 'notifications'].includes(item.id)
          )}
        );
        break;
      default:
        menuSections.push({ title: 'General', items: generalItems });
    }

    return menuSections;
  };

  const menuSections = getMenuItems();

  return (
    <div className={`bg-white shadow-lg h-full fixed left-0 top-0 z-30 transform transition-all duration-300 ease-in-out ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      <div className="flex items-center justify-center h-16 bg-gradient-to-r from-purple-600 to-blue-600 relative">
        {!isCollapsed && <h1 className="text-white text-xl font-bold">Syurix</h1>}
        {isCollapsed && <h1 className="text-white text-xl font-bold">C</h1>}
        
        <button
          onClick={toggleCollapse}
          className="absolute -right-3 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-1 shadow-md hover:shadow-lg transition-shadow"
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4 text-gray-600" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          )}
        </button>
      </div>
      
      <nav className="mt-8 max-h-[calc(100vh-8rem)] overflow-y-auto">
        {menuSections.map((section, sectionIndex) => (
          <div key={sectionIndex} className={sectionIndex > 0 ? 'mt-6' : ''}>
            {section.title && !isCollapsed && (
              <div className="px-6 py-2">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                  {section.title}
                </h3>
              </div>
            )}
            {section.items.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center px-6 py-3 text-left transition-colors duration-200 ${
                    activeTab === item.id
                      ? 'bg-gradient-to-r from-purple-50 to-blue-50 text-purple-700 border-r-4 border-purple-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-purple-600'
                  } ${isCollapsed ? 'justify-center px-4' : ''}`}
                  title={isCollapsed ? item.label : ''}
                >
                  <Icon className={`w-5 h-5 ${isCollapsed ? '' : 'mr-3'}`} />
                  {!isCollapsed && <span>{item.label}</span>}
                </button>
              );
            })}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
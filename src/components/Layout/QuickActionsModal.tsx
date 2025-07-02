import React from 'react';
import { 
  X, 
  Phone, 
  MessageSquare, 
  Users, 
  Calendar, 
  FileText, 
  BarChart3,
  Settings,
  UserPlus,
  Clock,
  Headphones,
  Upload
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface QuickActionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const QuickActionsModal: React.FC<QuickActionsModalProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();

  if (!isOpen) return null;

  const getQuickActions = () => {
    const baseActions = [
      { id: 'search', title: 'Global Search', description: 'Search across all data', icon: FileText, category: 'general' },
      { id: 'notifications', title: 'View Notifications', description: 'Check all notifications', icon: MessageSquare, category: 'general' },
    ];

    switch (user?.role) {
      case 'admin':
        return [
          ...baseActions,
          { id: 'add-user', title: 'Add New User', description: 'Create a new team member', icon: UserPlus, category: 'admin' },
          { id: 'system-settings', title: 'System Settings', description: 'Configure system preferences', icon: Settings, category: 'admin' },
          { id: 'analytics', title: 'View Analytics', description: 'Check performance metrics', icon: BarChart3, category: 'admin' },
          { id: 'monitor-calls', title: 'Monitor Calls', description: 'Listen to live conversations', icon: Headphones, category: 'admin' },
          { id: 'bulk-upload', title: 'Bulk Upload CVs', description: 'Upload multiple CVs at once', icon: Upload, category: 'admin' },
        ];
      case 'manager':
        return [
          ...baseActions,
          { id: 'team-performance', title: 'Team Performance', description: 'View team metrics', icon: BarChart3, category: 'admin' },
          { id: 'schedule-meeting', title: 'Schedule Meeting', description: 'Plan team meetings', icon: Calendar, category: 'admin' },
          { id: 'monitor-calls', title: 'Monitor Calls', description: 'Listen to team calls', icon: Headphones, category: 'admin' },
          { id: 'manage-team', title: 'Manage Team', description: 'View and manage team members', icon: Users, category: 'admin' },
        ];
      case 'team_leader':
        return [
          ...baseActions,
          { id: 'team-status', title: 'Team Status', description: 'Check team availability', icon: Users, category: 'admin' },
          { id: 'monitor-calls', title: 'Monitor Calls', description: 'Listen to team calls', icon: Headphones, category: 'admin' },
          { id: 'schedule-break', title: 'Schedule Break', description: 'Plan team breaks', icon: Clock, category: 'general' },
        ];
      case 'hr':
        return [
          ...baseActions,
          { id: 'add-candidate', title: 'Add Candidate', description: 'Register new candidate', icon: UserPlus, category: 'hr' },
          { id: 'schedule-interview', title: 'Schedule Interview', description: 'Plan candidate interviews', icon: Calendar, category: 'hr' },
          { id: 'upload-cv', title: 'Upload CV', description: 'Add candidate resume', icon: Upload, category: 'hr' },
          { id: 'view-candidates', title: 'View Candidates', description: 'Browse all candidates', icon: Users, category: 'hr' },
        ];
      case 'call_center':
        return [
          ...baseActions,
          { id: 'make-call', title: 'Make Call', description: 'Start a new call', icon: Phone, category: 'call' },
          { id: 'send-message', title: 'Send Message', description: 'Send customer message', icon: MessageSquare, category: 'call' },
          { id: 'time-tracking', title: 'Time Tracking', description: 'Track work hours', icon: Clock, category: 'call' },
          { id: 'customer-notes', title: 'Customer Notes', description: 'Add customer notes', icon: FileText, category: 'call' },
        ];
      case 'intern':
        return [
          ...baseActions,
          { id: 'add-notes', title: 'Add Notes', description: 'Take observation notes', icon: FileText, category: 'general' },
          { id: 'view-training', title: 'Training Materials', description: 'Access learning resources', icon: FileText, category: 'general' },
        ];
      default:
        return baseActions;
    }
  };

  const quickActions = getQuickActions();

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'call': return 'bg-blue-50 border-blue-200 hover:bg-blue-100';
      case 'hr': return 'bg-green-50 border-green-200 hover:bg-green-100';
      case 'admin': return 'bg-purple-50 border-purple-200 hover:bg-purple-100';
      default: return 'bg-gray-50 border-gray-200 hover:bg-gray-100';
    }
  };

  const getIconColor = (category: string) => {
    switch (category) {
      case 'call': return 'text-blue-600';
      case 'hr': return 'text-green-600';
      case 'admin': return 'text-purple-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full mx-4 max-h-[80vh] overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Quick Actions</h2>
              <p className="text-gray-600 mt-1">Perform common tasks quickly</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.id}
                  onClick={() => {
                    // Handle action click
                    console.log(`Executing action: ${action.id}`);
                    onClose();
                  }}
                  className={`p-4 border-2 rounded-lg transition-all duration-200 text-left ${getCategoryColor(action.category)}`}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg bg-white ${getIconColor(action.category)}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{action.title}</h3>
                      <p className="text-sm text-gray-600">{action.description}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Tip: Use <kbd className="px-2 py-1 bg-gray-200 rounded text-xs">Ctrl + K</kbd> to open quick actions
            </p>
            <button
              onClick={onClose}
              className="text-sm text-purple-600 hover:text-purple-700 font-medium"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActionsModal;
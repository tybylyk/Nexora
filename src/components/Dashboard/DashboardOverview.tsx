import React, {useState} from 'react';
import { 
  Users, 
  Phone, 
  Clock, 
  TrendingUp, 
  MessageSquare, 
  CheckCircle,
  AlertCircle,
  PhoneCall,Building, DollarSign, UserCheck, Shield, Settings, FileText,
  Calendar, Ticket, BookOpen, Plus, X
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const DashboardOverview: React.FC = () => {
  const { user } = useAuth();

  const getStatsForRole = () => {
    switch (user?.role) {
      case 'admin':
        return [
          { label: 'Total Users', value: '248', icon: Users, color: 'purple', trend: '+12%' },
          { label: 'Active Calls', value: '47', icon: Phone, color: 'blue', trend: '+8%' },
          { label: 'Avg Call Time', value: '4m 32s', icon: Clock, color: 'green', trend: '-5%' },
          { label: 'Customer Satisfaction', value: '94%', icon: TrendingUp, color: 'purple', trend: '+2%' },
        ];
      case 'manager':
        return [
          { label: 'Team Members', value: '24', icon: Users, color: 'purple', trend: '+2' },
          { label: 'Team Calls', value: '156', icon: Phone, color: 'blue', trend: '+15%' },
          { label: 'Team Performance', value: '92%', icon: TrendingUp, color: 'green', trend: '+3%' },
          { label: 'Resolved Issues', value: '89', icon: CheckCircle, color: 'purple', trend: '+12%' },
        ];
      case 'team_leader':
        return [
          { label: 'Team Size', value: '8', icon: Users, color: 'purple', trend: 'Stable' },
          { label: 'Today\'s Calls', value: '42', icon: Phone, color: 'blue', trend: '+18%' },
          { label: 'Avg Response', value: '2m 15s', icon: Clock, color: 'green', trend: '-8%' },
          { label: 'Team Rating', value: '4.8', icon: TrendingUp, color: 'purple', trend: '+0.2' },
        ];
      case 'hr':
        return [
          { label: 'Active Candidates', value: '67', icon: Users, color: 'purple', trend: '+23' },
          { label: 'Interviews Today', value: '8', icon: MessageSquare, color: 'blue', trend: '+2' },
          { label: 'Pending Reviews', value: '15', icon: AlertCircle, color: 'orange', trend: '+5' },
          { label: 'Hired This Month', value: '12', icon: CheckCircle, color: 'green', trend: '+4' },
        ];
      case 'call_center':
        return [
          { label: 'My Calls Today', value: '18', icon: PhoneCall, color: 'purple', trend: '+6' },
          { label: 'Avg Call Duration', value: '3m 45s', icon: Clock, color: 'blue', trend: '-12s' },
          { label: 'Customer Rating', value: '4.9', icon: TrendingUp, color: 'green', trend: '+0.1' },
          { label: 'Messages Pending', value: '7', icon: MessageSquare, color: 'orange', trend: '-3' },
        ];
      default:
        return [];
    }
  };

  const stats = getStatsForRole();

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'purple':
        return 'bg-purple-100 text-purple-600';
      case 'blue':
        return 'bg-blue-100 text-blue-600';
      case 'green':
        return 'bg-green-100 text-green-600';
      case 'orange':
        return 'bg-orange-100 text-orange-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
        <p className="text-gray-600 mt-2">Here's what's happening with your {user?.role?.replace('_', ' ')} dashboard today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <p className="text-sm text-green-600 mt-1">{stat.trend}</p>
                </div>
                <div className={`p-3 rounded-lg ${getColorClasses(stat.color)}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[
              { action: 'New call received', time: '2 minutes ago', type: 'call' },
              { action: 'Interview scheduled', time: '15 minutes ago', type: 'interview' },
              { action: 'Customer message replied', time: '32 minutes ago', type: 'message' },
              { action: 'Team meeting completed', time: '1 hour ago', type: 'meeting' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            {user?.role === 'call_center' && (
              <>
                <button className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200 hover:from-purple-100 hover:to-blue-100 transition-colors duration-200">
                  <Phone className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                  <span className="text-sm font-medium text-gray-900">Make Call</span>
                </button>
                <button className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200 hover:from-purple-100 hover:to-blue-100 transition-colors duration-200">
                  <MessageSquare className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                  <span className="text-sm font-medium text-gray-900">Messages</span>
                </button>
              </>
            )}
            {user?.role === 'hr' && (
              <>
                <button className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200 hover:from-purple-100 hover:to-blue-100 transition-colors duration-200">
                  <Users className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                  <span className="text-sm font-medium text-gray-900">Add Candidate</span>
                </button>
                <button className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200 hover:from-purple-100 hover:to-blue-100 transition-colors duration-200">
                  <MessageSquare className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                  <span className="text-sm font-medium text-gray-900">Schedule Interview</span>
                </button>
              </>
            )}
            {(user?.role === 'admin' || user?.role === 'manager') && (
              <>
                <button className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200 hover:from-purple-100 hover:to-blue-100 transition-colors duration-200">
                  <TrendingUp className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                  <span className="text-sm font-medium text-gray-900">View Analytics</span>
                </button>
                <button className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200 hover:from-purple-100 hover:to-blue-100 transition-colors duration-200">
                  <Users className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                  <span className="text-sm font-medium text-gray-900">Manage Team</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
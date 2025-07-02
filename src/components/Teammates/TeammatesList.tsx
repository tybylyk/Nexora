import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  MessageSquare, 
  Phone, 
  Video, 
  Mail,
  Crown,
  Shield,
  Award,
  UserCheck,
  Circle,
  Filter,
  Clock
} from 'lucide-react';
import { User } from '../../types';
import { useAuth } from '../../contexts/AuthContext';

const TeammatesList: React.FC = () => {
  const { user: currentUser } = useAuth();
  const [teammates] = useState<User[]>([
    {
      id: '1',
      name: 'John Admin',
      email: 'admin@crm.com',
      role: 'admin',
      department: 'Management',
      isActive: true,
      createdAt: '2024-01-01',
      status: 'online',
      teamId: 'team-1'
    },
    {
      id: '2',
      name: 'Sarah Manager',
      email: 'manager@crm.com',
      role: 'manager',
      department: 'Sales',
      isActive: true,
      createdAt: '2024-01-01',
      status: 'online',
      teamId: 'team-1'
    },
    {
      id: '3',
      name: 'Mike Leader',
      email: 'leader@crm.com',
      role: 'team_leader',
      department: 'Support',
      isActive: true,
      createdAt: '2024-01-01',
      status: 'busy',
      teamId: 'team-2'
    },
    {
      id: '4',
      name: 'Lisa HR',
      email: 'hr@crm.com',
      role: 'hr',
      department: 'Human Resources',
      isActive: true,
      createdAt: '2024-01-01',
      status: 'online',
      teamId: 'team-3'
    },
    {
      id: '5',
      name: 'Alex Agent',
      email: 'agent@crm.com',
      role: 'call_center',
      department: 'Support',
      isActive: true,
      createdAt: '2024-01-01',
      status: 'away',
      teamId: 'team-2'
    },
    {
      id: '6',
      name: 'Emma Wilson',
      email: 'emma@crm.com',
      role: 'call_center',
      department: 'Support',
      isActive: true,
      createdAt: '2024-01-15',
      status: 'online',
      teamId: 'team-2'
    },
    {
      id: '7',
      name: 'David Chen',
      email: 'david@crm.com',
      role: 'team_leader',
      department: 'Sales',
      isActive: true,
      createdAt: '2024-01-16',
      status: 'offline',
      teamId: 'team-1'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [selectedTeammate, setSelectedTeammate] = useState<User | null>(null);

  const getRoleIcon = (role: User['role']) => {
    switch (role) {
      case 'admin': return <Crown className="w-4 h-4 text-purple-600" />;
      case 'manager': return <Shield className="w-4 h-4 text-blue-600" />;
      case 'team_leader': return <Award className="w-4 h-4 text-green-600" />;
      case 'hr': return <UserCheck className="w-4 h-4 text-orange-600" />;
      case 'call_center': return <Phone className="w-4 h-4 text-indigo-600" />;
      case 'intern': return <Users className="w-4 h-4 text-gray-600" />;
      default: return <Users className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-green-600';
      case 'busy': return 'text-red-600';
      case 'away': return 'text-yellow-600';
      case 'offline': return 'text-gray-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusDot = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'busy': return 'bg-red-500';
      case 'away': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  const filteredTeammates = teammates
    .filter(teammate => teammate.id !== currentUser?.id) // Exclude current user
    .filter(teammate => {
      const matchesSearch = teammate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           teammate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           teammate.department?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || teammate.status === statusFilter;
      const matchesDepartment = departmentFilter === 'all' || teammate.department === departmentFilter;
      return matchesSearch && matchesStatus && matchesDepartment;
    });

  const departments = Array.from(new Set(teammates.map(t => t.department).filter(Boolean)));

  const startDirectMessage = (teammate: User) => {
    // This would integrate with the message center
    console.log('Starting direct message with:', teammate.name);
    // Navigate to message center with this user selected
  };

  const startCall = (teammate: User) => {
    console.log('Starting call with:', teammate.name);
    // Integrate with call system
  };

  const startVideoCall = (teammate: User) => {
    console.log('Starting video call with:', teammate.name);
    // Integrate with video call system
  };

  const getLastSeen = (status: string) => {
    if (status === 'online') return 'Online now';
    if (status === 'busy') return 'Busy';
    if (status === 'away') return 'Away';
    return 'Last seen 2h ago'; // Mock data
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Teammates</h2>
        
        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search teammates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
          />
        </div>

        {/* Filters */}
        <div className="grid grid-cols-2 gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="online">Online</option>
            <option value="busy">Busy</option>
            <option value="away">Away</option>
            <option value="offline">Offline</option>
          </select>
          
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="text-xs border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="all">All Departments</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Teammates List */}
      <div className="flex-1 overflow-y-auto">
        {filteredTeammates.length === 0 ? (
          <div className="p-6 text-center">
            <Users className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-600 text-sm">No teammates found</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredTeammates.map((teammate) => (
              <div
                key={teammate.id}
                className="p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => setSelectedTeammate(teammate)}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium text-sm">
                        {teammate.name.charAt(0)}
                      </span>
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-3 h-3 ${getStatusDot(teammate.status || 'offline')} rounded-full border-2 border-white`}></div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <p className="font-medium text-gray-900 text-sm truncate">{teammate.name}</p>
                      {getRoleIcon(teammate.role)}
                    </div>
                    <p className="text-xs text-gray-600 truncate">{teammate.department}</p>
                    <div className="flex items-center space-x-1">
                      <Circle className={`w-2 h-2 fill-current ${getStatusColor(teammate.status || 'offline')}`} />
                      <span className={`text-xs ${getStatusColor(teammate.status || 'offline')}`}>
                        {getLastSeen(teammate.status || 'offline')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="p-4 border-t border-gray-200">
        <div className="text-xs text-gray-500 mb-2">Quick Actions</div>
        <div className="grid grid-cols-3 gap-2">
          <button className="p-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors flex flex-col items-center space-y-1">
            <MessageSquare className="w-4 h-4" />
            <span className="text-xs">Message</span>
          </button>
          <button className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors flex flex-col items-center space-y-1">
            <Phone className="w-4 h-4" />
            <span className="text-xs">Call</span>
          </button>
          <button className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors flex flex-col items-center space-y-1">
            <Video className="w-4 h-4" />
            <span className="text-xs">Video</span>
          </button>
        </div>
      </div>

      {/* Teammate Detail Modal */}
      {selectedTeammate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4">
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-white font-bold text-2xl">
                      {selectedTeammate.name.charAt(0)}
                    </span>
                  </div>
                  <div className={`absolute -bottom-1 -right-1 w-5 h-5 ${getStatusDot(selectedTeammate.status || 'offline')} rounded-full border-3 border-white`}></div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{selectedTeammate.name}</h3>
                <div className="flex items-center justify-center space-x-2 mt-1">
                  {getRoleIcon(selectedTeammate.role)}
                  <span className="text-purple-600 font-medium capitalize">{selectedTeammate.role.replace('_', ' ')}</span>
                </div>
                <p className="text-gray-600">{selectedTeammate.department}</p>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3 text-sm">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">{selectedTeammate.email}</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <Circle className={`w-4 h-4 fill-current ${getStatusColor(selectedTeammate.status || 'offline')}`} />
                  <span className={getStatusColor(selectedTeammate.status || 'offline')}>
                    {getLastSeen(selectedTeammate.status || 'offline')}
                  </span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">
                    Joined {new Date(selectedTeammate.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-6">
                <button
                  onClick={() => startDirectMessage(selectedTeammate)}
                  className="p-3 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors flex flex-col items-center space-y-1"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span className="text-xs font-medium">Message</span>
                </button>
                <button
                  onClick={() => startCall(selectedTeammate)}
                  className="p-3 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors flex flex-col items-center space-y-1"
                >
                  <Phone className="w-5 h-5" />
                  <span className="text-xs font-medium">Call</span>
                </button>
                <button
                  onClick={() => startVideoCall(selectedTeammate)}
                  className="p-3 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors flex flex-col items-center space-y-1"
                >
                  <Video className="w-5 h-5" />
                  <span className="text-xs font-medium">Video</span>
                </button>
              </div>

              <button
                onClick={() => setSelectedTeammate(null)}
                className="w-full text-center text-gray-600 hover:text-gray-800 font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeammatesList;
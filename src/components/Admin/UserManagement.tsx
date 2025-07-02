import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  Search, 
  Filter, 
  Edit3, 
  Trash2, 
  Shield, 
  UserCheck, 
  UserX,
  Crown,
  Settings,
  Mail,
  Phone,
  Calendar,
  Award,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { User, Candidate } from '../../types';
import { useAuth } from '../../contexts/AuthContext';

const UserManagement: React.FC = () => {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'John Admin',
      email: 'admin@crm.com',
      role: 'admin',
      department: 'Management',
      isActive: true,
      createdAt: '2024-01-01',
      permissions: ['all'],
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
      permissions: ['team_management', 'call_monitoring', 'analytics'],
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
      permissions: ['team_view', 'call_monitoring'],
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
      permissions: ['candidate_management', 'interviews'],
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
      permissions: ['calls', 'messages', 'time_tracking'],
      status: 'away',
      teamId: 'team-2'
    }
  ]);

  const [hiredCandidates] = useState<Candidate[]>([
    {
      id: '10',
      name: 'Emma Wilson',
      email: 'emma.wilson@email.com',
      phone: '+1 (555) 111-2222',
      position: 'Customer Support Agent',
      status: 'hired',
      score: 88,
      notes: 'Excellent communication skills, ready to start',
      createdAt: '2024-01-10T08:00:00Z',
      assignedTo: 'hr@crm.com'
    },
    {
      id: '11',
      name: 'David Chen',
      email: 'david.chen@email.com',
      phone: '+1 (555) 333-4444',
      position: 'Team Leader',
      status: 'hired',
      score: 95,
      notes: 'Strong leadership experience, perfect for team lead role',
      createdAt: '2024-01-12T09:30:00Z',
      assignedTo: 'hr@crm.com'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showHiredCandidates, setShowHiredCandidates] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'call_center' as User['role'],
    department: '',
    teamId: ''
  });

  const roleHierarchy = {
    admin: ['admin', 'manager', 'team_leader', 'hr', 'call_center', 'intern'],
    manager: ['team_leader', 'call_center', 'intern'],
    team_leader: ['call_center', 'intern'],
    hr: ['intern'],
    call_center: [],
    intern: []
  };

  const canManageRole = (targetRole: User['role']) => {
    if (!currentUser) return false;
    return roleHierarchy[currentUser.role]?.includes(targetRole) || false;
  };

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
      case 'online': return 'bg-green-100 text-green-800';
      case 'busy': return 'bg-red-100 text-red-800';
      case 'away': return 'bg-yellow-100 text-yellow-800';
      case 'offline': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online': return <CheckCircle className="w-3 h-3" />;
      case 'busy': return <AlertCircle className="w-3 h-3" />;
      case 'away': return <AlertCircle className="w-3 h-3" />;
      default: return <UserX className="w-3 h-3" />;
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.department?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const createUserFromCandidate = (candidate: Candidate) => {
    const newUser: User = {
      id: Date.now().toString(),
      name: candidate.name,
      email: candidate.email,
      role: 'call_center',
      department: 'Support',
      isActive: true,
      createdAt: new Date().toISOString(),
      permissions: ['calls', 'messages', 'time_tracking'],
      status: 'offline'
    };

    setUsers(prev => [...prev, newUser]);
    setShowHiredCandidates(false);
  };

  const addUser = () => {
    if (!newUser.name || !newUser.email) return;

    const user: User = {
      id: Date.now().toString(),
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      department: newUser.department,
      isActive: true,
      createdAt: new Date().toISOString(),
      permissions: getDefaultPermissions(newUser.role),
      status: 'offline',
      teamId: newUser.teamId || undefined
    };

    setUsers(prev => [...prev, user]);
    setShowAddModal(false);
    setNewUser({
      name: '',
      email: '',
      role: 'call_center',
      department: '',
      teamId: ''
    });
  };

  const getDefaultPermissions = (role: User['role']): string[] => {
    switch (role) {
      case 'admin': return ['all'];
      case 'manager': return ['team_management', 'call_monitoring', 'analytics'];
      case 'team_leader': return ['team_view', 'call_monitoring'];
      case 'hr': return ['candidate_management', 'interviews'];
      case 'call_center': return ['calls', 'messages', 'time_tracking'];
      case 'intern': return ['notes_only'];
      default: return [];
    }
  };

  const updateUserRole = (userId: string, newRole: User['role']) => {
    if (!canManageRole(newRole)) return;

    setUsers(prev => prev.map(user => 
      user.id === userId 
        ? { 
            ...user, 
            role: newRole, 
            permissions: getDefaultPermissions(newRole) 
          }
        : user
    ));
  };

  const toggleUserStatus = (userId: string) => {
    setUsers(prev => prev.map(user => 
      user.id === userId 
        ? { ...user, isActive: !user.isActive }
        : user
    ));
  };

  const deleteUser = (userId: string) => {
    if (userId === currentUser?.id) return; // Can't delete self
    setUsers(prev => prev.filter(user => user.id !== userId));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600 mt-1">Manage team members, roles, and permissions</p>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setShowHiredCandidates(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
          >
            <UserCheck className="w-4 h-4" />
            <span>Add from Hired</span>
          </button>
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add User</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="team_leader">Team Leader</option>
              <option value="hr">HR</option>
              <option value="call_center">Call Center</option>
              <option value="intern">Intern</option>
            </select>
          </div>

          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
            >
              <option value="all">All Status</option>
              <option value="online">Online</option>
              <option value="busy">Busy</option>
              <option value="away">Away</option>
              <option value="offline">Offline</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Total Users:</span>
            <span className="font-semibold text-purple-600">{users.length}</span>
          </div>
        </div>
      </div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredUsers.map((user) => (
          <div key={user.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium text-lg">
                    {user.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{user.name}</h3>
                  <p className="text-sm text-gray-600">{user.department}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(user.status || 'offline')}`}>
                  {getStatusIcon(user.status || 'offline')}
                  <span className="capitalize">{user.status || 'offline'}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <Mail className="w-4 h-4 mr-2" />
                {user.email}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                {getRoleIcon(user.role)}
                <span className="ml-2 capitalize">{user.role.replace('_', ' ')}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="w-4 h-4 mr-2" />
                Joined {new Date(user.createdAt).toLocaleDateString()}
              </div>
            </div>

            {/* Permissions */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Permissions</h4>
              <div className="flex flex-wrap gap-1">
                {user.permissions?.slice(0, 3).map((permission, index) => (
                  <span key={index} className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                    {permission === 'all' ? 'All Access' : permission.replace('_', ' ')}
                  </span>
                ))}
                {user.permissions && user.permissions.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                    +{user.permissions.length - 3} more
                  </span>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between">
              <div className="flex space-x-2">
                <button
                  onClick={() => setSelectedUser(user)}
                  className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors duration-200"
                  title="Edit user"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => toggleUserStatus(user.id)}
                  className={`p-2 rounded-lg transition-colors duration-200 ${
                    user.isActive 
                      ? 'text-red-600 hover:bg-red-50' 
                      : 'text-green-600 hover:bg-green-50'
                  }`}
                  title={user.isActive ? 'Deactivate user' : 'Activate user'}
                >
                  {user.isActive ? <UserX className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
                </button>
                {user.id !== currentUser?.id && (
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                    title="Delete user"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              <select
                value={user.role}
                onChange={(e) => updateUserRole(user.id, e.target.value as User['role'])}
                disabled={!canManageRole(user.role) || user.id === currentUser?.id}
                className="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {roleHierarchy[currentUser?.role || 'intern']?.map(role => (
                  <option key={role} value={role}>
                    {role.charAt(0).toUpperCase() + role.slice(1).replace('_', ' ')}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}
      </div>

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New User</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter email address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                  <select
                    value={newUser.role}
                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value as User['role'] })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    {roleHierarchy[currentUser?.role || 'intern']?.map(role => (
                      <option key={role} value={role}>
                        {role.charAt(0).toUpperCase() + role.slice(1).replace('_', ' ')}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                  <input
                    type="text"
                    value={newUser.department}
                    onChange={(e) => setNewUser({ ...newUser, department: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter department"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={addUser}
                  disabled={!newUser.name || !newUser.email}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add User
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hired Candidates Modal */}
      {showHiredCandidates && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Add Users from Hired Candidates</h3>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              {hiredCandidates.length === 0 ? (
                <div className="text-center py-8">
                  <UserCheck className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No hired candidates</h3>
                  <p className="text-gray-600">Hire candidates from HR management first</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {hiredCandidates.map((candidate) => (
                    <div key={candidate.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-gray-900">{candidate.name}</h4>
                          <p className="text-purple-600 font-medium">{candidate.position}</p>
                          <p className="text-sm text-gray-600">{candidate.email}</p>
                          <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                            <span>Score: {candidate.score}/100</span>
                            <span>Hired: {new Date(candidate.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => createUserFromCandidate(candidate)}
                          className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200"
                        >
                          Add as User
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-4 border-t border-gray-200">
              <button
                onClick={() => setShowHiredCandidates(false)}
                className="w-full text-center text-purple-600 hover:text-purple-700 font-medium"
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

export default UserManagement;
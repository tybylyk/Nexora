import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  UserPlus, 
  UserMinus,
  Crown,
  Shield,
  Award,
  Phone,
  Settings,
  Target,
  BarChart3,
  Clock
} from 'lucide-react';
import { User } from '../../types';
import { useAuth } from '../../contexts/AuthContext';

interface Team {
  id: string;
  name: string;
  description: string;
  leaderId: string;
  leaderName: string;
  members: User[];
  department: string;
  createdAt: string;
  isActive: boolean;
  targets?: {
    calls: number;
    satisfaction: number;
    resolution: number;
  };
  performance?: {
    calls: number;
    satisfaction: number;
    resolution: number;
  };
}

const TeamManagement: React.FC = () => {
  const { user: currentUser } = useAuth();
  const [teams, setTeams] = useState<Team[]>([
    {
      id: 'team-1',
      name: 'Management Team',
      description: 'Executive and administrative leadership',
      leaderId: '1',
      leaderName: 'John Admin',
      members: [
        {
          id: '1',
          name: 'John Admin',
          email: 'admin@crm.com',
          role: 'admin',
          department: 'Management',
          isActive: true,
          createdAt: '2024-01-01',
          status: 'online'
        },
        {
          id: '2',
          name: 'Sarah Manager',
          email: 'manager@crm.com',
          role: 'manager',
          department: 'Sales',
          isActive: true,
          createdAt: '2024-01-01',
          status: 'online'
        }
      ],
      department: 'Management',
      createdAt: '2024-01-01',
      isActive: true,
      targets: { calls: 100, satisfaction: 95, resolution: 90 },
      performance: { calls: 105, satisfaction: 97, resolution: 92 }
    },
    {
      id: 'team-2',
      name: 'Support Team Alpha',
      description: 'Primary customer support team',
      leaderId: '3',
      leaderName: 'Mike Leader',
      members: [
        {
          id: '3',
          name: 'Mike Leader',
          email: 'leader@crm.com',
          role: 'team_leader',
          department: 'Support',
          isActive: true,
          createdAt: '2024-01-01',
          status: 'busy'
        },
        {
          id: '5',
          name: 'Alex Agent',
          email: 'agent@crm.com',
          role: 'call_center',
          department: 'Support',
          isActive: true,
          createdAt: '2024-01-01',
          status: 'away'
        }
      ],
      department: 'Support',
      createdAt: '2024-01-01',
      isActive: true,
      targets: { calls: 200, satisfaction: 90, resolution: 85 },
      performance: { calls: 185, satisfaction: 88, resolution: 87 }
    },
    {
      id: 'team-3',
      name: 'HR Team',
      description: 'Human resources and recruitment',
      leaderId: '4',
      leaderName: 'Lisa HR',
      members: [
        {
          id: '4',
          name: 'Lisa HR',
          email: 'hr@crm.com',
          role: 'hr',
          department: 'Human Resources',
          isActive: true,
          createdAt: '2024-01-01',
          status: 'online'
        }
      ],
      department: 'Human Resources',
      createdAt: '2024-01-01',
      isActive: true
    }
  ]);

  const [availableUsers] = useState<User[]>([
    {
      id: '6',
      name: 'Emma Wilson',
      email: 'emma@crm.com',
      role: 'call_center',
      department: 'Support',
      isActive: true,
      createdAt: '2024-01-15',
      status: 'offline'
    },
    {
      id: '7',
      name: 'David Chen',
      email: 'david@crm.com',
      role: 'team_leader',
      department: 'Sales',
      isActive: true,
      createdAt: '2024-01-16',
      status: 'offline'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [showMembersModal, setShowMembersModal] = useState(false);
  const [newTeam, setNewTeam] = useState({
    name: '',
    description: '',
    leaderId: '',
    department: ''
  });

  const getRoleIcon = (role: User['role']) => {
    switch (role) {
      case 'admin': return <Crown className="w-4 h-4 text-purple-600" />;
      case 'manager': return <Shield className="w-4 h-4 text-blue-600" />;
      case 'team_leader': return <Award className="w-4 h-4 text-green-600" />;
      case 'hr': return <Users className="w-4 h-4 text-orange-600" />;
      case 'call_center': return <Phone className="w-4 h-4 text-indigo-600" />;
      default: return <Users className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-100 text-green-800';
      case 'busy': return 'bg-red-100 text-red-800';
      case 'away': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredTeams = teams.filter(team =>
    team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.leaderName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addTeam = () => {
    if (!newTeam.name || !newTeam.leaderId) return;

    const leader = availableUsers.find(u => u.id === newTeam.leaderId);
    if (!leader) return;

    const team: Team = {
      id: Date.now().toString(),
      name: newTeam.name,
      description: newTeam.description,
      leaderId: newTeam.leaderId,
      leaderName: leader.name,
      members: [leader],
      department: newTeam.department,
      createdAt: new Date().toISOString(),
      isActive: true
    };

    setTeams(prev => [...prev, team]);
    setShowAddModal(false);
    setNewTeam({ name: '', description: '', leaderId: '', department: '' });
  };

  const addMemberToTeam = (teamId: string, userId: string) => {
    const user = availableUsers.find(u => u.id === userId);
    if (!user) return;

    setTeams(prev => prev.map(team => 
      team.id === teamId 
        ? { ...team, members: [...team.members, user] }
        : team
    ));
  };

  const removeMemberFromTeam = (teamId: string, userId: string) => {
    setTeams(prev => prev.map(team => 
      team.id === teamId 
        ? { ...team, members: team.members.filter(m => m.id !== userId) }
        : team
    ));
  };

  const deleteTeam = (teamId: string) => {
    setTeams(prev => prev.filter(team => team.id !== teamId));
  };

  const getPerformanceColor = (actual: number, target: number) => {
    const percentage = (actual / target) * 100;
    if (percentage >= 100) return 'text-green-600';
    if (percentage >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Team Management</h1>
          <p className="text-gray-600 mt-1">Organize and manage your teams</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Create Team</span>
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search teams..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Teams Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredTeams.map((team) => (
          <div key={team.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{team.name}</h3>
                <p className="text-sm text-gray-600">{team.description}</p>
                <p className="text-sm text-purple-600 font-medium">{team.department}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {
                    setSelectedTeam(team);
                    setShowMembersModal(true);
                  }}
                  className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                  title="Manage members"
                >
                  <Settings className="w-4 h-4" />
                </button>
                <button
                  onClick={() => deleteTeam(team.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete team"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Team Leader */}
            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <Award className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-gray-700">Team Leader</span>
              </div>
              <p className="text-sm text-gray-900 mt-1">{team.leaderName}</p>
            </div>

            {/* Members */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Members</span>
                <span className="text-sm text-purple-600">{team.members.length}</span>
              </div>
              <div className="flex -space-x-2">
                {team.members.slice(0, 5).map((member) => (
                  <div
                    key={member.id}
                    className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center border-2 border-white"
                    title={member.name}
                  >
                    <span className="text-white text-xs font-medium">
                      {member.name.charAt(0)}
                    </span>
                  </div>
                ))}
                {team.members.length > 5 && (
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center border-2 border-white">
                    <span className="text-gray-600 text-xs font-medium">
                      +{team.members.length - 5}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Performance Metrics */}
            {team.performance && team.targets && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-700">Performance</h4>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="text-center">
                    <div className={`font-semibold ${getPerformanceColor(team.performance.calls, team.targets.calls)}`}>
                      {team.performance.calls}
                    </div>
                    <div className="text-gray-500">Calls</div>
                    <div className="text-gray-400">/{team.targets.calls}</div>
                  </div>
                  <div className="text-center">
                    <div className={`font-semibold ${getPerformanceColor(team.performance.satisfaction, team.targets.satisfaction)}`}>
                      {team.performance.satisfaction}%
                    </div>
                    <div className="text-gray-500">Satisfaction</div>
                    <div className="text-gray-400">/{team.targets.satisfaction}%</div>
                  </div>
                  <div className="text-center">
                    <div className={`font-semibold ${getPerformanceColor(team.performance.resolution, team.targets.resolution)}`}>
                      {team.performance.resolution}%
                    </div>
                    <div className="text-gray-500">Resolution</div>
                    <div className="text-gray-400">/{team.targets.resolution}%</div>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Created {new Date(team.createdAt).toLocaleDateString()}</span>
                <div className={`px-2 py-1 rounded-full ${team.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {team.isActive ? 'Active' : 'Inactive'}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Team Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Team</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Team Name</label>
                  <input
                    type="text"
                    value={newTeam.name}
                    onChange={(e) => setNewTeam({ ...newTeam, name: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter team name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={newTeam.description}
                    onChange={(e) => setNewTeam({ ...newTeam, description: e.target.value })}
                    rows={3}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter team description"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Team Leader</label>
                  <select
                    value={newTeam.leaderId}
                    onChange={(e) => setNewTeam({ ...newTeam, leaderId: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">Select team leader</option>
                    {availableUsers.filter(u => u.role === 'team_leader' || u.role === 'manager').map(user => (
                      <option key={user.id} value={user.id}>
                        {user.name} - {user.role.replace('_', ' ')}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                  <input
                    type="text"
                    value={newTeam.department}
                    onChange={(e) => setNewTeam({ ...newTeam, department: e.target.value })}
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
                  onClick={addTeam}
                  disabled={!newTeam.name || !newTeam.leaderId}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Create Team
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Manage Members Modal */}
      {showMembersModal && selectedTeam && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Manage Team Members - {selectedTeam.name}</h3>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Current Members */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Current Members ({selectedTeam.members.length})</h4>
                  <div className="space-y-2">
                    {selectedTeam.members.map((member) => (
                      <div key={member.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-medium">
                              {member.name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{member.name}</p>
                            <div className="flex items-center space-x-2">
                              {getRoleIcon(member.role)}
                              <span className="text-sm text-gray-600 capitalize">{member.role.replace('_', ' ')}</span>
                            </div>
                          </div>
                        </div>
                        {member.id !== selectedTeam.leaderId && (
                          <button
                            onClick={() => removeMemberFromTeam(selectedTeam.id, member.id)}
                            className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                            title="Remove from team"
                          >
                            <UserMinus className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Available Users */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Available Users</h4>
                  <div className="space-y-2">
                    {availableUsers.filter(user => 
                      !selectedTeam.members.some(member => member.id === user.id)
                    ).map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-medium">
                              {user.name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{user.name}</p>
                            <div className="flex items-center space-x-2">
                              {getRoleIcon(user.role)}
                              <span className="text-sm text-gray-600 capitalize">{user.role.replace('_', ' ')}</span>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => addMemberToTeam(selectedTeam.id, user.id)}
                          className="p-1 text-green-600 hover:bg-green-50 rounded transition-colors"
                          title="Add to team"
                        >
                          <UserPlus className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-gray-200">
              <button
                onClick={() => setShowMembersModal(false)}
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

export default TeamManagement;
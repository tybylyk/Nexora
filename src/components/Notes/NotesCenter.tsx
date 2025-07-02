import React, { useState } from 'react';
import { 
  StickyNote, 
  Search, 
  Filter, 
  Plus, 
  User, 
  Clock, 
  Tag, 
  MessageSquare, 
  Phone, 
  AlertCircle,
  CheckCircle,
  Star,
  Eye,
  Edit3,
  Trash2,
  Calendar,
  Grid,
  List
} from 'lucide-react';

interface CallCenterNote {
  id: string;
  agentId: string;
  agentName: string;
  clientId: string;
  clientName: string;
  clientCompany?: string;
  content: string;
  type: 'call_summary' | 'follow_up' | 'escalation' | 'resolution' | 'observation' | 'training';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in_progress' | 'completed' | 'archived';
  tags: string[];
  createdAt: string;
  updatedAt?: string;
  callId?: string;
  conversationId?: string;
  isPrivate: boolean;
  mentions?: string[];
  attachments?: string[];
}

const NotesCenter: React.FC = () => {
  const [notes] = useState<CallCenterNote[]>([
    {
      id: '1',
      agentId: 'agent1',
      agentName: 'Alex Agent',
      clientId: 'client1',
      clientName: 'John Customer',
      clientCompany: 'Tech Corp',
      content: 'Customer called regarding order #12345. Package was delivered to wrong address. Contacted logistics team and arranged redelivery for tomorrow. Customer satisfied with resolution.',
      type: 'call_summary',
      priority: 'high',
      status: 'completed',
      tags: ['delivery-issue', 'logistics', 'resolved'],
      createdAt: '2024-01-15T14:30:00Z',
      callId: 'call-123',
      isPrivate: false,
      mentions: ['logistics-team']
    },
    {
      id: '2',
      agentId: 'agent2',
      agentName: 'Sarah Support',
      clientId: 'client2',
      clientName: 'Emma Wilson',
      clientCompany: 'Marketing Plus',
      content: 'Customer requesting new features for API integration. Logged feature request FR-456. Need to follow up with development team for timeline.',
      type: 'follow_up',
      priority: 'medium',
      status: 'in_progress',
      tags: ['feature-request', 'api', 'development'],
      createdAt: '2024-01-15T13:45:00Z',
      conversationId: 'conv-789',
      isPrivate: false,
      mentions: ['dev-team']
    },
    {
      id: '3',
      agentId: 'agent3',
      agentName: 'Mike Helper',
      clientId: 'client3',
      clientName: 'David Chen',
      clientCompany: 'StartupXYZ',
      content: 'Escalated technical issue to Level 2 support. Customer experiencing 500 errors on API calls. Urgent priority due to production impact.',
      type: 'escalation',
      priority: 'urgent',
      status: 'open',
      tags: ['technical', 'api-error', 'production', 'escalated'],
      createdAt: '2024-01-15T15:20:00Z',
      callId: 'call-456',
      isPrivate: false,
      mentions: ['level2-support', 'tech-lead']
    },
    {
      id: '4',
      agentId: 'agent1',
      agentName: 'Alex Agent',
      clientId: 'client4',
      clientName: 'Lisa Manager',
      clientCompany: 'Enterprise Co',
      content: 'Customer training session completed successfully. Covered new dashboard features and reporting tools. Customer very satisfied and requested additional training for their team.',
      type: 'training',
      priority: 'low',
      status: 'completed',
      tags: ['training', 'dashboard', 'reporting', 'success'],
      createdAt: '2024-01-15T11:00:00Z',
      isPrivate: false
    },
    {
      id: '5',
      agentId: 'agent2',
      agentName: 'Sarah Support',
      clientId: 'client5',
      clientName: 'Robert Smith',
      content: 'Observed unusual call pattern - customer seems frustrated with multiple transfers. Recommend process improvement to reduce transfer rate.',
      type: 'observation',
      priority: 'medium',
      status: 'open',
      tags: ['process-improvement', 'customer-experience', 'transfers'],
      createdAt: '2024-01-15T16:15:00Z',
      isPrivate: true,
      mentions: ['team-lead', 'quality-assurance']
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [agentFilter, setAgentFilter] = useState('all');
  const [showPrivateNotes, setShowPrivateNotes] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'call_summary': return <Phone className="w-4 h-4" />;
      case 'follow_up': return <Clock className="w-4 h-4" />;
      case 'escalation': return <AlertCircle className="w-4 h-4" />;
      case 'resolution': return <CheckCircle className="w-4 h-4" />;
      case 'observation': return <Eye className="w-4 h-4" />;
      case 'training': return <Star className="w-4 h-4" />;
      default: return <StickyNote className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'call_summary': return 'bg-blue-100 text-blue-800';
      case 'follow_up': return 'bg-yellow-100 text-yellow-800';
      case 'escalation': return 'bg-red-100 text-red-800';
      case 'resolution': return 'bg-green-100 text-green-800';
      case 'observation': return 'bg-purple-100 text-purple-800';
      case 'training': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'text-red-600 bg-red-50 border-red-200';
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      return `${Math.floor(diffInHours * 60)}m ago`;
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.agentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesType = typeFilter === 'all' || note.type === typeFilter;
    const matchesPriority = priorityFilter === 'all' || note.priority === priorityFilter;
    const matchesStatus = statusFilter === 'all' || note.status === statusFilter;
    const matchesAgent = agentFilter === 'all' || note.agentName === agentFilter;
    const matchesPrivacy = showPrivateNotes || !note.isPrivate;
    
    return matchesSearch && matchesType && matchesPriority && matchesStatus && matchesAgent && matchesPrivacy;
  });

  const uniqueAgents = Array.from(new Set(notes.map(note => note.agentName)));

  const renderGridView = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {filteredNotes.map((note) => (
        <div key={note.id} className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200 ${note.isPrivate ? 'ring-2 ring-yellow-200' : ''}`}>
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className={`p-2 rounded-lg ${getTypeColor(note.type)}`}>
                {getTypeIcon(note.type)}
              </div>
              <div>
                <span className={`text-xs px-2 py-1 rounded-full ${getTypeColor(note.type)}`}>
                  {note.type.replace('_', ' ')}
                </span>
                {note.isPrivate && (
                  <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                    Private
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <button className="p-1 text-gray-400 hover:text-purple-600 transition-colors">
                <Edit3 className="w-3 h-3" />
              </button>
              <button className="p-1 text-gray-400 hover:text-red-600 transition-colors">
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-gray-900">{note.clientName}</h3>
              <span className={`text-xs px-2 py-1 rounded-full border ${getPriorityColor(note.priority)}`}>
                {note.priority}
              </span>
            </div>
            {note.clientCompany && (
              <p className="text-sm text-purple-600 mb-2">{note.clientCompany}</p>
            )}
            <p className="text-sm text-gray-700 line-clamp-3">{note.content}</p>
          </div>

          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {note.tags.slice(0, 3).map((tag, index) => (
                <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                  {tag}
                </span>
              ))}
              {note.tags.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                  +{note.tags.length - 3} more
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-medium">
                  {note.agentName.charAt(0)}
                </span>
              </div>
              <span>{note.agentName}</span>
            </div>
            <span>{formatTime(note.createdAt)}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(note.status)}`}>
              {note.status.replace('_', ' ')}
            </span>
            <div className="flex items-center space-x-2">
              {note.callId && (
                <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                  Call: {note.callId}
                </span>
              )}
              {note.mentions && note.mentions.length > 0 && (
                <span className="text-xs text-purple-600 bg-purple-50 px-2 py-1 rounded">
                  @{note.mentions.length}
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderListView = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Note</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Agent</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredNotes.map((note) => (
              <tr key={note.id} className={`hover:bg-gray-50 ${note.isPrivate ? 'bg-yellow-50' : ''}`}>
                <td className="px-6 py-4">
                  <div className="max-w-xs">
                    <p className="text-sm text-gray-900 truncate">{note.content}</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {note.tags.slice(0, 2).map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{note.clientName}</div>
                    {note.clientCompany && (
                      <div className="text-sm text-purple-600">{note.clientCompany}</div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mr-2">
                      <span className="text-white text-xs font-medium">
                        {note.agentName.charAt(0)}
                      </span>
                    </div>
                    <span className="text-sm text-gray-900">{note.agentName}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(note.type)}`}>
                    {getTypeIcon(note.type)}
                    <span>{note.type.replace('_', ' ')}</span>
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(note.priority)}`}>
                    {note.priority}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(note.status)}`}>
                    {note.status.replace('_', ' ')}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatTime(note.createdAt)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center space-x-2">
                    <button className="text-purple-600 hover:text-purple-900">
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Call Center Notes</h1>
          <p className="text-gray-600 mt-1">All notes and observations from call center agents</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'grid' ? 'bg-white text-purple-600 shadow-sm' : 'text-gray-600'
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'list' ? 'bg-white text-purple-600 shadow-sm' : 'text-gray-600'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
          <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Add Note</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="all">All Types</option>
            <option value="call_summary">Call Summary</option>
            <option value="follow_up">Follow Up</option>
            <option value="escalation">Escalation</option>
            <option value="resolution">Resolution</option>
            <option value="observation">Observation</option>
            <option value="training">Training</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="all">All Priorities</option>
            <option value="urgent">Urgent</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="archived">Archived</option>
          </select>

          <select
            value={agentFilter}
            onChange={(e) => setAgentFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="all">All Agents</option>
            {uniqueAgents.map(agent => (
              <option key={agent} value={agent}>{agent}</option>
            ))}
          </select>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={showPrivateNotes}
              onChange={(e) => setShowPrivateNotes(e.target.checked)}
              className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
            />
            <span className="text-sm text-gray-700">Show Private</span>
          </label>
        </div>
      </div>

      {/* Notes Display */}
      {filteredNotes.length === 0 ? (
        <div className="text-center py-12">
          <StickyNote className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No notes found</h3>
          <p className="text-gray-600">Try adjusting your search or filters</p>
        </div>
      ) : (
        viewMode === 'grid' ? renderGridView() : renderListView()
      )}
    </div>
  );
};

export default NotesCenter;
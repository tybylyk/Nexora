import React, { useState } from 'react';
import { 
  Headphones, 
  Eye, 
  MessageSquare, 
  Phone, 
  Users, 
  Volume2, 
  VolumeX,
  Mic,
  MicOff,
  Play,
  Pause,
  Square,
  Filter,
  Search
} from 'lucide-react';
import { CallRecord, Customer, LiveSession } from '../../types';
import { useAuth } from '../../contexts/AuthContext';

const ConversationMonitor: React.FC = () => {
  const { user } = useAuth();
  const [activeMonitoring, setActiveMonitoring] = useState<LiveSession | null>(null);
  const [monitoringType, setMonitoringType] = useState<'monitor' | 'whisper' | 'barge_in'>('monitor');
  const [isMuted, setIsMuted] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock data for active calls
  const [activeCalls] = useState<(CallRecord & { customer: Customer; agent: any })[]>([
    {
      id: '1',
      customerId: '1',
      agentId: 'agent1',
      type: 'inbound',
      channel: 'phone',
      duration: 180,
      status: 'active',
      notes: '',
      startTime: '2024-01-15T14:30:00Z',
      isLive: true,
      customer: {
        id: '1',
        name: 'John Customer',
        email: 'john@customer.com',
        phone: '+1 (555) 123-4567',
        company: 'Tech Corp',
        status: 'active',
        lastContact: '2024-01-15T14:30:00Z',
        totalCalls: 12,
        averageRating: 4.5,
        assignedAgent: 'agent1'
      },
      agent: {
        id: 'agent1',
        name: 'Alex Agent',
        email: 'alex@crm.com',
        status: 'on_call'
      }
    },
    {
      id: '2',
      customerId: '2',
      agentId: 'agent2',
      type: 'outbound',
      channel: 'whatsapp',
      duration: 95,
      status: 'active',
      notes: '',
      startTime: '2024-01-15T14:45:00Z',
      isLive: true,
      customer: {
        id: '2',
        name: 'Sarah Business',
        email: 'sarah@business.com',
        phone: '+1 (555) 987-6543',
        company: 'Marketing Plus',
        status: 'active',
        lastContact: '2024-01-15T14:45:00Z',
        totalCalls: 8,
        averageRating: 4.8,
        assignedAgent: 'agent2'
      },
      agent: {
        id: 'agent2',
        name: 'Maria Rodriguez',
        email: 'maria@crm.com',
        status: 'on_call'
      }
    }
  ]);

  const canMonitor = user?.role === 'admin' || user?.role === 'manager' || user?.role === 'team_leader';

  const startMonitoring = (callId: string, type: 'monitor' | 'whisper' | 'barge_in') => {
    if (!canMonitor) return;

    const session: LiveSession = {
      id: Date.now().toString(),
      agentId: activeCalls.find(call => call.id === callId)?.agentId || '',
      supervisorId: user?.id || '',
      type,
      startTime: new Date().toISOString(),
      isActive: true
    };

    setActiveMonitoring(session);
    setMonitoringType(type);
  };

  const stopMonitoring = () => {
    if (activeMonitoring) {
      setActiveMonitoring({
        ...activeMonitoring,
        endTime: new Date().toISOString(),
        isActive: false
      });
    }
    setActiveMonitoring(null);
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'phone': return <Phone className="w-4 h-4" />;
      case 'whatsapp': return <MessageSquare className="w-4 h-4" />;
      default: return <MessageSquare className="w-4 h-4" />;
    }
  };

  const filteredCalls = activeCalls.filter(call => {
    const matchesSearch = call.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         call.agent.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || call.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (!canMonitor) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <Headphones className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Access Restricted</h3>
          <p className="text-gray-600">You don't have permission to monitor conversations</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Conversation Monitor</h1>
          <p className="text-gray-600 mt-1">Monitor live calls and conversations</p>
        </div>
        {activeMonitoring && (
          <div className="flex items-center space-x-3">
            <div className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-2">
              <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
              <span>Live Monitoring</span>
            </div>
            <button
              onClick={stopMonitoring}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center space-x-2"
            >
              <Square className="w-4 h-4" />
              <span>Stop</span>
            </button>
          </div>
        )}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search calls..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
            >
              <option value="all">All Calls</option>
              <option value="active">Active</option>
              <option value="on-hold">On Hold</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Active Calls:</span>
            <span className="font-semibold text-purple-600">{activeCalls.length}</span>
          </div>
        </div>
      </div>

      {/* Active Monitoring Panel */}
      {activeMonitoring && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Active Monitoring Session</h3>
            <div className="flex items-center space-x-2">
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                monitoringType === 'monitor' ? 'bg-blue-100 text-blue-800' :
                monitoringType === 'whisper' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {monitoringType === 'monitor' ? 'Listen Only' :
                 monitoringType === 'whisper' ? 'Whisper Mode' :
                 'Barge In'}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Call Information</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium">05:23</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Channel:</span>
                  <span className="font-medium capitalize">Phone</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Quality:</span>
                  <span className="font-medium text-green-600">Excellent</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-3">Monitor Controls</h4>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className={`p-2 rounded-lg transition-colors ${
                    isMuted ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                
                {monitoringType !== 'monitor' && (
                  <button className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
                    <Mic className="w-4 h-4" />
                  </button>
                )}
                
                <button className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
                  <Play className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Active Calls List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Active Calls</h3>
        </div>
        <div className="p-6">
          {filteredCalls.length === 0 ? (
            <div className="text-center py-8">
              <Phone className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No active calls</h3>
              <p className="text-gray-600">All agents are currently available</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredCalls.map((call) => (
                <div key={call.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{call.customer.name}</h4>
                        <p className="text-sm text-gray-600">{call.customer.company}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">{formatDuration(call.duration)}</div>
                      <div className="flex items-center space-x-1 text-xs text-gray-500">
                        {getChannelIcon(call.channel)}
                        <span className="capitalize">{call.channel}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>Agent: {call.agent.name}</span>
                      <span>•</span>
                      <span className="capitalize">{call.type}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => startMonitoring(call.id, 'monitor')}
                        disabled={!!activeMonitoring}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1"
                      >
                        <Eye className="w-3 h-3" />
                        <span>Monitor</span>
                      </button>
                      
                      <button
                        onClick={() => startMonitoring(call.id, 'whisper')}
                        disabled={!!activeMonitoring}
                        className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1"
                      >
                        <Headphones className="w-3 h-3" />
                        <span>Whisper</span>
                      </button>
                      
                      <button
                        onClick={() => startMonitoring(call.id, 'barge_in')}
                        disabled={!!activeMonitoring}
                        className="px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1"
                      >
                        <Mic className="w-3 h-3" />
                        <span>Barge In</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConversationMonitor;
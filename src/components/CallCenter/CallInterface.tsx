import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  PhoneCall, 
  PhoneOff, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX,
  MessageSquare,
  Clock,
  User,
  Settings,
  Plus,
  Pause,
  Play,
  Users,
  Headphones,
  AlertCircle,
  CheckCircle,
  Timer
} from 'lucide-react';
import { CallRecord, Customer } from '../../types';

interface ActiveCall {
  id: string;
  customerName: string;
  agentName: string;
  duration: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'active' | 'on-hold' | 'transferring';
}

interface QueuedCall {
  id: string;
  customerName: string;
  waitTime: string;
  priority: 'low' | 'medium' | 'high';
}

interface Agent {
  id: string;
  name: string;
  initials: string;
  status: 'available' | 'on-call' | 'break' | 'unavailable';
  calls: number;
  avgTime: string;
  currentTicket?: string;
}

const CallInterface: React.FC = () => {
  const [activeCalls] = useState<ActiveCall[]>([
    {
      id: '1',
      customerName: 'Alice Johnson',
      agentName: 'Sarah Support',
      duration: '2:15',
      priority: 'high',
      status: 'active'
    },
    {
      id: '2',
      customerName: 'Bob Smith',
      agentName: 'Mike Helper',
      duration: '0:45',
      priority: 'medium',
      status: 'active'
    },
    {
      id: '3',
      customerName: 'Carol Davis',
      agentName: 'John Agent',
      duration: '5:30',
      priority: 'urgent',
      status: 'active'
    }
  ]);

  const [queuedCalls] = useState<QueuedCall[]>([
    {
      id: '1',
      customerName: 'Dave Wilson',
      waitTime: '1:30',
      priority: 'low'
    },
    {
      id: '2',
      customerName: 'Emma Brown',
      waitTime: '0:45',
      priority: 'high'
    },
    {
      id: '3',
      customerName: 'Frank Miller',
      waitTime: '2:15',
      priority: 'medium'
    }
  ]);

  const [agents] = useState<Agent[]>([
    {
      id: '1',
      name: 'John Agent',
      initials: 'JA',
      status: 'available',
      calls: 15,
      avgTime: '4:30'
    },
    {
      id: '2',
      name: 'Sarah Support',
      initials: 'SS',
      status: 'on-call',
      calls: 12,
      avgTime: '3:45',
      currentTicket: 'TK-001'
    },
    {
      id: '3',
      name: 'Mike Helper',
      initials: 'MH',
      status: 'break',
      calls: 8,
      avgTime: '5:15'
    },
    {
      id: '4',
      name: 'Lisa Tech',
      initials: 'LT',
      status: 'available',
      calls: 0,
      avgTime: '0:00'
    }
  ]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'on-call': return 'bg-blue-100 text-blue-800';
      case 'break': return 'bg-yellow-100 text-yellow-800';
      case 'unavailable': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const answerCall = (callId: string) => {
    console.log('Answering call:', callId);
  };

  const monitorCall = (callId: string) => {
    console.log('Monitoring call:', callId);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Call Center</h1>
            <p className="text-gray-600 mt-1">Monitor and manage all voice communications</p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="p-2 text-gray-600 hover:text-purple-600 transition-colors">
              <Settings className="w-5 h-5" />
            </button>
            <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200">
              Reports
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Calls</p>
                <p className="text-3xl font-bold text-blue-600 mt-2">3</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Phone className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Queue</p>
                <p className="text-3xl font-bold text-orange-600 mt-2">3</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-lg">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Available Agents</p>
                <p className="text-3xl font-bold text-green-600 mt-2">2</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <Users className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Wait Time</p>
                <p className="text-3xl font-bold text-purple-600 mt-2">1:23</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <Timer className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Active Calls */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <Phone className="w-5 h-5 text-gray-600" />
                <h3 className="text-lg font-semibold text-gray-900">Active Calls</h3>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {activeCalls.map((call) => (
                  <div key={call.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">{call.customerName}</h4>
                        <p className="text-sm text-gray-600">{call.agentName}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(call.priority)}`}>
                        {call.priority}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-gray-900">Duration: {call.duration}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => monitorCall(call.id)}
                          className="p-1 text-purple-600 hover:bg-purple-50 rounded transition-colors"
                          title="Monitor call"
                        >
                          <Play className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => monitorCall(call.id)}
                          className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                          title="Listen"
                        >
                          <Headphones className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Call Queue */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-gray-600" />
                <h3 className="text-lg font-semibold text-gray-900">Call Queue</h3>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {queuedCalls.map((call) => (
                  <div key={call.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">{call.customerName}</h4>
                        <p className="text-sm text-gray-600">Wait: {call.waitTime}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(call.priority)}`}>
                        {call.priority}
                      </span>
                    </div>
                    <div className="flex justify-end">
                      <button
                        onClick={() => answerCall(call.id)}
                        className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-1 text-sm"
                      >
                        <Phone className="w-3 h-3" />
                        <span>Answer</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Agent Status */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-gray-600" />
                <h3 className="text-lg font-semibold text-gray-900">Agent Status</h3>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {agents.map((agent) => (
                  <div key={agent.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-medium text-sm">{agent.initials}</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{agent.name}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(agent.status)}`}>
                            {agent.status}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                      <div>
                        <span className="font-medium">Calls: {agent.calls}</span>
                      </div>
                      <div>
                        <span className="font-medium">Avg: {agent.avgTime}</span>
                      </div>
                      {agent.currentTicket && (
                        <div className="col-span-2">
                          <span className="font-medium text-purple-600">Current: {agent.currentTicket}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallInterface;
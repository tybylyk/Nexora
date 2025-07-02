import React, { useState } from 'react';
import { 
  MessageSquare, 
  Send, 
  Paperclip, 
  Phone, 
  Video,
  Search,
  Filter,
  Clock,
  CheckCircle,
  Circle,
  Star,
  Archive,
  Trash2,
  MoreVertical,
  User,
  StickyNote,
  Plus,
  Tag,
  AlertCircle
} from 'lucide-react';

interface ClientMessage {
  id: string;
  clientId: string;
  clientName: string;
  clientCompany?: string;
  channel: 'whatsapp' | 'facebook' | 'instagram' | 'sms' | 'email';
  content: string;
  timestamp: string;
  isRead: boolean;
  isFromClient: boolean;
  priority: 'low' | 'medium' | 'high';
  status: 'active' | 'resolved' | 'pending';
  assignedTo?: string;
  tags?: string[];
}

interface ClientNote {
  id: string;
  clientId: string;
  agentId: string;
  agentName: string;
  content: string;
  type: 'follow_up' | 'status_update' | 'escalation' | 'resolution' | 'general';
  priority: 'low' | 'medium' | 'high';
  timestamp: string;
  isPrivate: boolean;
  tags?: string[];
}

const ClientInbox: React.FC = () => {
  const [messages] = useState<ClientMessage[]>([
    {
      id: '1',
      clientId: '1',
      clientName: 'John Customer',
      clientCompany: 'Tech Corp',
      channel: 'whatsapp',
      content: 'Hi, I need help with my recent order. The tracking shows it was delivered but I haven\'t received it.',
      timestamp: '2024-01-15T14:30:00Z',
      isRead: false,
      isFromClient: true,
      priority: 'high',
      status: 'active',
      assignedTo: 'agent@crm.com',
      tags: ['order-issue', 'delivery']
    },
    {
      id: '2',
      clientId: '1',
      clientName: 'John Customer',
      clientCompany: 'Tech Corp',
      channel: 'whatsapp',
      content: 'Hello! I\'d be happy to help you with your order. Can you please provide your order number so I can track it for you?',
      timestamp: '2024-01-15T14:32:00Z',
      isRead: true,
      isFromClient: false,
      priority: 'high',
      status: 'active',
      assignedTo: 'agent@crm.com',
      tags: ['order-issue', 'delivery']
    },
    {
      id: '3',
      clientId: '2',
      clientName: 'Sarah Business',
      clientCompany: 'Marketing Plus',
      channel: 'facebook',
      content: 'When will the new features be available? Our team is waiting for the integration updates.',
      timestamp: '2024-01-15T13:45:00Z',
      isRead: false,
      isFromClient: true,
      priority: 'medium',
      status: 'pending',
      tags: ['feature-request', 'integration']
    },
    {
      id: '4',
      clientId: '3',
      clientName: 'Mike Davis',
      clientCompany: 'StartupXYZ',
      channel: 'instagram',
      content: 'Love your latest product update! The new dashboard is amazing. 🎉',
      timestamp: '2024-01-15T12:20:00Z',
      isRead: true,
      isFromClient: true,
      priority: 'low',
      status: 'resolved',
      tags: ['feedback', 'positive']
    },
    {
      id: '5',
      clientId: '4',
      clientName: 'Lisa Wilson',
      clientCompany: 'Enterprise Co',
      channel: 'email',
      content: 'We\'re experiencing issues with the API integration. Getting 500 errors consistently.',
      timestamp: '2024-01-15T11:15:00Z',
      isRead: false,
      isFromClient: true,
      priority: 'high',
      status: 'active',
      assignedTo: 'tech@crm.com',
      tags: ['technical', 'api', 'urgent']
    }
  ]);

  const [clientNotes, setClientNotes] = useState<ClientNote[]>([
    {
      id: '1',
      clientId: '1',
      agentId: 'agent@crm.com',
      agentName: 'Alex Agent',
      content: 'Customer provided order #12345. Checked with logistics - package was delivered to wrong address. Arranging redelivery.',
      type: 'follow_up',
      priority: 'high',
      timestamp: '2024-01-15T14:35:00Z',
      isPrivate: false,
      tags: ['delivery-issue', 'redelivery']
    },
    {
      id: '2',
      clientId: '1',
      agentId: 'manager@crm.com',
      agentName: 'Sarah Manager',
      content: 'Escalated to logistics team. Customer should receive package by tomorrow. Offering 10% discount for inconvenience.',
      type: 'escalation',
      priority: 'high',
      timestamp: '2024-01-15T15:00:00Z',
      isPrivate: true,
      tags: ['escalation', 'compensation']
    },
    {
      id: '3',
      clientId: '2',
      agentId: 'agent@crm.com',
      agentName: 'Alex Agent',
      content: 'Feature request logged in development backlog. ETA for integration updates is Q2 2024.',
      type: 'status_update',
      priority: 'medium',
      timestamp: '2024-01-15T14:00:00Z',
      isPrivate: false,
      tags: ['feature-request', 'development']
    }
  ]);

  const [selectedClient, setSelectedClient] = useState<string | null>('1');
  const [newMessage, setNewMessage] = useState('');
  const [newNote, setNewNote] = useState('');
  const [noteType, setNoteType] = useState<ClientNote['type']>('general');
  const [notePriority, setNotePriority] = useState<ClientNote['priority']>('medium');
  const [isNotePrivate, setIsNotePrivate] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [channelFilter, setChannelFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  const getChannelColor = (channel: string) => {
    switch (channel) {
      case 'whatsapp': return 'bg-green-100 text-green-800';
      case 'facebook': return 'bg-blue-100 text-blue-800';
      case 'instagram': return 'bg-pink-100 text-pink-800';
      case 'sms': return 'bg-purple-100 text-purple-800';
      case 'email': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getNoteTypeColor = (type: string) => {
    switch (type) {
      case 'follow_up': return 'bg-blue-100 text-blue-800';
      case 'status_update': return 'bg-purple-100 text-purple-800';
      case 'escalation': return 'bg-red-100 text-red-800';
      case 'resolution': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getChannelIcon = (channel: string) => {
    return <MessageSquare className="w-3 h-3" />;
  };

  const clients = Array.from(new Set(messages.map(m => m.clientId)))
    .map(id => {
      const clientMessages = messages.filter(m => m.clientId === id);
      const lastMessage = clientMessages[clientMessages.length - 1];
      const unreadCount = clientMessages.filter(m => m.isFromClient && !m.isRead).length;
      
      return {
        id,
        name: lastMessage.clientName,
        company: lastMessage.clientCompany,
        lastMessage: lastMessage.content,
        lastMessageTime: lastMessage.timestamp,
        channel: lastMessage.channel,
        unreadCount,
        priority: lastMessage.priority,
        status: lastMessage.status,
        tags: lastMessage.tags || []
      };
    })
    .filter(client => {
      const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (client.company && client.company.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesChannel = channelFilter === 'all' || client.channel === channelFilter;
      const matchesStatus = statusFilter === 'all' || client.status === statusFilter;
      const matchesPriority = priorityFilter === 'all' || client.priority === priorityFilter;
      return matchesSearch && matchesChannel && matchesStatus && matchesPriority;
    });

  const clientMessages = selectedClient 
    ? messages.filter(m => m.clientId === selectedClient)
    : [];

  const selectedClientInfo = clients.find(c => c.id === selectedClient);

  const selectedClientNotes = selectedClient
    ? clientNotes.filter(n => n.clientId === selectedClient)
    : [];

  const sendMessage = () => {
    if (newMessage.trim() && selectedClient) {
      // In a real app, this would send the message via API
      setNewMessage('');
    }
  };

  const addNote = () => {
    if (!newNote.trim() || !selectedClient) return;

    const note: ClientNote = {
      id: Date.now().toString(),
      clientId: selectedClient,
      agentId: 'current-agent',
      agentName: 'Current Agent',
      content: newNote,
      type: noteType,
      priority: notePriority,
      timestamp: new Date().toISOString(),
      isPrivate: isNotePrivate,
      tags: []
    };

    setClientNotes(prev => [note, ...prev]);
    setNewNote('');
    setNoteType('general');
    setNotePriority('medium');
    setIsNotePrivate(false);
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

  return (
    <div className="h-[calc(100vh-4rem)] flex">
      {/* Client List */}
      <div className="w-80 border-r border-gray-200 flex flex-col bg-white">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Client Inbox</h2>
          
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-2 mb-3">
            <select
              value={channelFilter}
              onChange={(e) => setChannelFilter(e.target.value)}
              className="text-xs border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">All Channels</option>
              <option value="whatsapp">WhatsApp</option>
              <option value="facebook">Facebook</option>
              <option value="instagram">Instagram</option>
              <option value="sms">SMS</option>
              <option value="email">Email</option>
            </select>
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-xs border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>
          
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="w-full text-xs border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="all">All Priorities</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>
        </div>

        <div className="flex-1 overflow-y-auto">
          {clients.map((client) => (
            <div
              key={client.id}
              onClick={() => setSelectedClient(client.id)}
              className={`p-4 cursor-pointer hover:bg-gray-50 border-b border-gray-100 ${
                selectedClient === client.id ? 'bg-purple-50 border-purple-200' : ''
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2 flex-1">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    {client.unreadCount > 0 && (
                      <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {client.unreadCount}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium text-gray-900 truncate">{client.name}</h4>
                      <Star className={`w-3 h-3 ${client.priority === 'high' ? 'text-red-500 fill-current' : 'text-gray-300'}`} />
                    </div>
                    {client.company && (
                      <p className="text-xs text-purple-600 truncate">{client.company}</p>
                    )}
                    <div className="flex items-center space-x-2 mt-1">
                      <div className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getChannelColor(client.channel)}`}>
                        {getChannelIcon(client.channel)}
                        <span className="capitalize">{client.channel}</span>
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(client.status)}`}>
                        {client.status}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600 truncate mb-1">{client.lastMessage}</p>
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-500">{formatTime(client.lastMessageTime)}</p>
                <div className="flex items-center space-x-1">
                  {client.tags.slice(0, 2).map((tag, index) => (
                    <span key={index} className="px-1 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedClient ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 bg-white flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{selectedClientInfo?.name}</h3>
                  {selectedClientInfo?.company && (
                    <p className="text-sm text-purple-600">{selectedClientInfo.company}</p>
                  )}
                  <div className="flex items-center space-x-2 mt-1">
                    <div className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getChannelColor(selectedClientInfo?.channel || '')}`}>
                      {getChannelIcon(selectedClientInfo?.channel || '')}
                      <span className="capitalize">{selectedClientInfo?.channel}</span>
                    </div>
                    <div className="flex items-center text-xs text-green-600">
                      <Circle className="w-2 h-2 fill-current mr-1" />
                      Online
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-600 hover:text-purple-600 rounded-lg hover:bg-gray-100 transition-colors">
                  <Phone className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-600 hover:text-purple-600 rounded-lg hover:bg-gray-100 transition-colors">
                  <Video className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-600 hover:text-purple-600 rounded-lg hover:bg-gray-100 transition-colors">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {clientMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isFromClient ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.isFromClient
                        ? 'bg-white text-gray-900 border border-gray-200'
                        : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <div className="flex items-center justify-between mt-1">
                      <p className={`text-xs ${message.isFromClient ? 'text-gray-500' : 'text-purple-100'}`}>
                        {formatTime(message.timestamp)}
                      </p>
                      {!message.isFromClient && (
                        <CheckCircle className="w-3 h-3 text-purple-100" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-600 hover:text-purple-600 rounded-lg hover:bg-gray-100 transition-colors">
                  <Paperclip className="w-4 h-4" />
                </button>
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <button
                  onClick={sendMessage}
                  disabled={!newMessage.trim()}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-2 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Select a client</h3>
              <p className="text-gray-600">Choose a client from the list to start messaging</p>
            </div>
          </div>
        )}
      </div>

      {/* Notes Panel */}
      <div className="w-96 border-l border-gray-200 bg-white flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Client Notes</h3>
          
          {selectedClient && (
            <div className="space-y-3">
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Add a note about this client..."
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm resize-none"
              />
              
              <div className="grid grid-cols-2 gap-2">
                <select
                  value={noteType}
                  onChange={(e) => setNoteType(e.target.value as ClientNote['type'])}
                  className="text-xs border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="general">General</option>
                  <option value="follow_up">Follow Up</option>
                  <option value="status_update">Status Update</option>
                  <option value="escalation">Escalation</option>
                  <option value="resolution">Resolution</option>
                </select>
                
                <select
                  value={notePriority}
                  onChange={(e) => setNotePriority(e.target.value as ClientNote['priority'])}
                  className="text-xs border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              
              <div className="flex items-center justify-between">
                <label className="flex items-center text-xs text-gray-600">
                  <input
                    type="checkbox"
                    checked={isNotePrivate}
                    onChange={(e) => setIsNotePrivate(e.target.checked)}
                    className="rounded border-gray-300 text-purple-600 focus:ring-purple-500 mr-2"
                  />
                  Private note
                </label>
                
                <button
                  onClick={addNote}
                  disabled={!newNote.trim()}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 py-1 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1 text-xs"
                >
                  <Plus className="w-3 h-3" />
                  <span>Add Note</span>
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {selectedClient ? (
            selectedClientNotes.length === 0 ? (
              <div className="text-center py-8">
                <StickyNote className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600 text-sm">No notes yet</p>
                <p className="text-gray-500 text-xs mt-1">Add your first note about this client</p>
              </div>
            ) : (
              <div className="space-y-4">
                {selectedClientNotes.map((note) => (
                  <div key={note.id} className="border border-gray-200 rounded-lg p-3">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-medium">
                            {note.agentName.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-900">{note.agentName}</span>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className={`text-xs px-2 py-1 rounded-full ${getNoteTypeColor(note.type)}`}>
                              {note.type.replace('_', ' ')}
                            </span>
                            <span className={`text-xs font-medium ${getPriorityColor(note.priority)}`}>
                              {note.priority}
                            </span>
                            {note.isPrivate && (
                              <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                                Private
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-700 mb-2">{note.content}</p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{formatTime(note.timestamp)}</span>
                      {note.tags && note.tags.length > 0 && (
                        <div className="flex items-center space-x-1">
                          <Tag className="w-3 h-3" />
                          <span>{note.tags.join(', ')}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : (
            <div className="text-center py-8">
              <StickyNote className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600 text-sm">Select a client</p>
              <p className="text-gray-500 text-xs mt-1">Choose a client to view and add notes</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientInbox;
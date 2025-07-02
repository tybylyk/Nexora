import React, { useState } from 'react';
import { 
  MessageSquare, 
  Send, 
  Phone, 
  Video, 
  Search, 
  Circle, 
  User, 
  Crown,
  Shield,
  Award,
  UserCheck,
  Clock,
  Paperclip,
  Smile,
  MoreVertical,
  Plus,
  Hash,
  Lock,
  Users,
  Settings,
  Edit3,
  Trash2,
  UserPlus,
  UserMinus,
  Calendar
} from 'lucide-react';
import { User as UserType } from '../../types';
import { useAuth } from '../../contexts/AuthContext';

interface Channel {
  id: string;
  name: string;
  description: string;
  type: 'text' | 'voice' | 'private';
  members: string[];
  createdBy: string;
  createdAt: string;
  isPrivate: boolean;
}

interface InternalMessage {
  id: string;
  senderId: string;
  senderName: string;
  channelId: string;
  content: string;
  timestamp: string;
  isRead: boolean;
  type: 'text' | 'file' | 'call_request' | 'video_request';
}

interface Meeting {
  id: string;
  title: string;
  participants: string[];
  startTime: string;
  duration: number;
  type: 'video' | 'audio';
  status: 'scheduled' | 'active' | 'ended';
  createdBy: string;
}

const TeammatesChat: React.FC = () => {
  const { user: currentUser } = useAuth();
  const [teammates] = useState<UserType[]>([
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
    },
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
      id: '4',
      name: 'Lisa HR',
      email: 'hr@crm.com',
      role: 'hr',
      department: 'Human Resources',
      isActive: true,
      createdAt: '2024-01-01',
      status: 'online'
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
  ]);

  const [channels, setChannels] = useState<Channel[]>([
    {
      id: 'general',
      name: 'general',
      description: 'General team discussions',
      type: 'text',
      members: teammates.map(t => t.id),
      createdBy: '1',
      createdAt: '2024-01-01',
      isPrivate: false
    },
    {
      id: 'support',
      name: 'support-team',
      description: 'Support team coordination',
      type: 'text',
      members: ['3', '5'],
      createdBy: '3',
      createdAt: '2024-01-01',
      isPrivate: false
    },
    {
      id: 'management',
      name: 'management',
      description: 'Management discussions',
      type: 'private',
      members: ['1', '2'],
      createdBy: '1',
      createdAt: '2024-01-01',
      isPrivate: true
    },
    {
      id: 'hr-private',
      name: 'hr-confidential',
      description: 'HR confidential matters',
      type: 'private',
      members: ['1', '4'],
      createdBy: '4',
      createdAt: '2024-01-01',
      isPrivate: true
    }
  ]);

  const [messages] = useState<InternalMessage[]>([
    {
      id: '1',
      senderId: '2',
      senderName: 'Sarah Manager',
      channelId: 'general',
      content: 'Good morning team! Don\'t forget about the quarterly review meeting at 2 PM.',
      timestamp: '2024-01-15T09:00:00Z',
      isRead: false,
      type: 'text'
    },
    {
      id: '2',
      senderId: '3',
      senderName: 'Mike Leader',
      channelId: 'support',
      content: 'We have a high priority ticket from TechCorp. Alex, can you take a look?',
      timestamp: '2024-01-15T10:30:00Z',
      isRead: false,
      type: 'text'
    },
    {
      id: '3',
      senderId: '5',
      senderName: 'Alex Agent',
      channelId: 'support',
      content: 'On it! I\'ll handle the TechCorp issue right away.',
      timestamp: '2024-01-15T10:32:00Z',
      isRead: true,
      type: 'text'
    }
  ]);

  const [selectedChannel, setSelectedChannel] = useState<string>('general');
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateChannel, setShowCreateChannel] = useState(false);
  const [showMeetingModal, setShowMeetingModal] = useState(false);
  const [showChannelSettings, setShowChannelSettings] = useState<string | null>(null);
  
  const [newChannel, setNewChannel] = useState({
    name: '',
    description: '',
    type: 'text' as Channel['type'],
    isPrivate: false,
    members: [] as string[]
  });

  const [newMeeting, setNewMeeting] = useState({
    title: '',
    participants: [] as string[],
    startTime: '',
    duration: 60,
    type: 'video' as Meeting['type']
  });

  const canManageChannels = currentUser?.role === 'admin' || currentUser?.role === 'manager' || currentUser?.role === 'team_leader';

  const getRoleIcon = (role: UserType['role']) => {
    switch (role) {
      case 'admin': return <Crown className="w-3 h-3 text-purple-600" />;
      case 'manager': return <Shield className="w-3 h-3 text-blue-600" />;
      case 'team_leader': return <Award className="w-3 h-3 text-green-600" />;
      case 'hr': return <UserCheck className="w-3 h-3 text-orange-600" />;
      case 'call_center': return <Phone className="w-3 h-3 text-indigo-600" />;
      default: return <User className="w-3 h-3 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'busy': return 'bg-red-500';
      case 'away': return 'bg-yellow-500';
      default: return 'bg-gray-400';
    }
  };

  const getChannelIcon = (channel: Channel) => {
    if (channel.isPrivate) return <Lock className="w-4 h-4 text-gray-500" />;
    if (channel.type === 'voice') return <Phone className="w-4 h-4 text-gray-500" />;
    return <Hash className="w-4 h-4 text-gray-500" />;
  };

  const filteredChannels = channels.filter(channel => 
    channel.members.includes(currentUser?.id || '') &&
    channel.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getChannelMessages = (channelId: string) => {
    return messages.filter(msg => msg.channelId === channelId);
  };

  const getUnreadCount = (channelId: string) => {
    return messages.filter(msg => 
      msg.channelId === channelId && 
      msg.senderId !== currentUser?.id && 
      !msg.isRead
    ).length;
  };

  const sendMessage = () => {
    if (!newMessage.trim() || !selectedChannel) return;
    
    console.log('Sending message to channel:', selectedChannel, newMessage);
    setNewMessage('');
  };

  const createChannel = () => {
    if (!newChannel.name.trim()) return;

    const channel: Channel = {
      id: Date.now().toString(),
      name: newChannel.name.toLowerCase().replace(/\s+/g, '-'),
      description: newChannel.description,
      type: newChannel.type,
      members: newChannel.isPrivate ? newChannel.members : teammates.map(t => t.id),
      createdBy: currentUser?.id || '',
      createdAt: new Date().toISOString(),
      isPrivate: newChannel.isPrivate
    };

    setChannels(prev => [...prev, channel]);
    setShowCreateChannel(false);
    setNewChannel({
      name: '',
      description: '',
      type: 'text',
      isPrivate: false,
      members: []
    });
  };

  const scheduleMeeting = () => {
    if (!newMeeting.title.trim() || newMeeting.participants.length === 0) return;

    const meeting: Meeting = {
      id: Date.now().toString(),
      title: newMeeting.title,
      participants: [...newMeeting.participants, currentUser?.id || ''],
      startTime: newMeeting.startTime,
      duration: newMeeting.duration,
      type: newMeeting.type,
      status: 'scheduled',
      createdBy: currentUser?.id || ''
    };

    console.log('Meeting scheduled:', meeting);
    setShowMeetingModal(false);
    setNewMeeting({
      title: '',
      participants: [],
      startTime: '',
      duration: 60,
      type: 'video'
    });
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const selectedChannelInfo = channels.find(c => c.id === selectedChannel);
  const channelMessages = selectedChannel ? getChannelMessages(selectedChannel) : [];

  return (
    <div className="h-[calc(100vh-4rem)] flex">
      {/* Channels Sidebar */}
      <div className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-4 border-b border-gray-700">
          <h2 className="text-lg font-semibold mb-4">Team Chat</h2>
          
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search channels..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm text-white placeholder-gray-400"
            />
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowMeetingModal(true)}
              className="flex-1 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-1 text-sm"
            >
              <Video className="w-4 h-4" />
              <span>Meeting</span>
            </button>
            {canManageChannels && (
              <button
                onClick={() => setShowCreateChannel(true)}
                className="bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700 transition-colors"
                title="Create Channel"
              >
                <Plus className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Channels List */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-2">
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2 px-2">
              Channels
            </div>
            {filteredChannels.map((channel) => {
              const unreadCount = getUnreadCount(channel.id);
              return (
                <div
                  key={channel.id}
                  onClick={() => setSelectedChannel(channel.id)}
                  className={`flex items-center justify-between p-2 rounded-lg cursor-pointer hover:bg-gray-800 transition-colors group ${
                    selectedChannel === channel.id ? 'bg-gray-700' : ''
                  }`}
                >
                  <div className="flex items-center space-x-2 flex-1">
                    {getChannelIcon(channel)}
                    <span className="text-sm truncate">{channel.name}</span>
                    {unreadCount > 0 && (
                      <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {unreadCount}
                      </span>
                    )}
                  </div>
                  {canManageChannels && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowChannelSettings(channel.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-600 rounded transition-all"
                    >
                      <Settings className="w-3 h-3" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {/* Online Members */}
          <div className="p-2 border-t border-gray-700">
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2 px-2">
              Online — {teammates.filter(t => t.status === 'online').length}
            </div>
            {teammates.filter(t => t.status === 'online' && t.id !== currentUser?.id).map((teammate) => (
              <div key={teammate.id} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-800 cursor-pointer">
                <div className="relative">
                  <div className="w-6 h-6 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-medium">
                      {teammate.name.charAt(0)}
                    </span>
                  </div>
                  <div className={`absolute -bottom-1 -right-1 w-3 h-3 ${getStatusColor(teammate.status || 'offline')} rounded-full border-2 border-gray-900`}></div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-1">
                    <span className="text-sm text-white truncate">{teammate.name}</span>
                    {getRoleIcon(teammate.role)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedChannel && selectedChannelInfo ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 bg-white flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {getChannelIcon(selectedChannelInfo)}
                <div>
                  <h3 className="font-medium text-gray-900">{selectedChannelInfo.name}</h3>
                  <p className="text-sm text-gray-600">{selectedChannelInfo.description}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">
                  {selectedChannelInfo.members.length} members
                </span>
                <button className="p-2 text-gray-600 hover:text-gray-800 rounded-lg hover:bg-gray-100 transition-colors">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {channelMessages.map((message) => (
                <div key={message.id} className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-medium">
                      {message.senderName.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium text-gray-900 text-sm">{message.senderName}</span>
                      <span className="text-xs text-gray-500">{formatTime(message.timestamp)}</span>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-gray-200">
                      <p className="text-sm text-gray-700">{message.content}</p>
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
                  placeholder={`Message #${selectedChannelInfo.name}`}
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <button className="p-2 text-gray-600 hover:text-purple-600 rounded-lg hover:bg-gray-100 transition-colors">
                  <Smile className="w-4 h-4" />
                </button>
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
              <h3 className="text-lg font-medium text-gray-900 mb-2">Select a channel</h3>
              <p className="text-gray-600">Choose a channel from the sidebar to start chatting</p>
            </div>
          </div>
        )}
      </div>

      {/* Create Channel Modal */}
      {showCreateChannel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Create Channel</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Channel Name</label>
                  <input
                    type="text"
                    value={newChannel.name}
                    onChange={(e) => setNewChannel({ ...newChannel, name: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="e.g. project-alpha"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={newChannel.description}
                    onChange={(e) => setNewChannel({ ...newChannel, description: e.target.value })}
                    rows={3}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="What's this channel about?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Channel Type</label>
                  <select
                    value={newChannel.type}
                    onChange={(e) => setNewChannel({ ...newChannel, type: e.target.value as Channel['type'] })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="text">Text Channel</option>
                    <option value="voice">Voice Channel</option>
                  </select>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="private-channel"
                    checked={newChannel.isPrivate}
                    onChange={(e) => setNewChannel({ ...newChannel, isPrivate: e.target.checked })}
                    className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  />
                  <label htmlFor="private-channel" className="text-sm text-gray-700">
                    Make this channel private
                  </label>
                </div>

                {newChannel.isPrivate && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Add Members</label>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {teammates.filter(t => t.id !== currentUser?.id).map(teammate => (
                        <label key={teammate.id} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={newChannel.members.includes(teammate.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setNewChannel({
                                  ...newChannel,
                                  members: [...newChannel.members, teammate.id]
                                });
                              } else {
                                setNewChannel({
                                  ...newChannel,
                                  members: newChannel.members.filter(id => id !== teammate.id)
                                });
                              }
                            }}
                            className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                          />
                          <span className="text-sm text-gray-700">{teammate.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowCreateChannel(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={createChannel}
                  disabled={!newChannel.name.trim()}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Create Channel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Meeting Modal */}
      {showMeetingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Schedule Meeting</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Meeting Title</label>
                  <input
                    type="text"
                    value={newMeeting.title}
                    onChange={(e) => setNewMeeting({ ...newMeeting, title: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Team standup"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                    <input
                      type="datetime-local"
                      value={newMeeting.startTime}
                      onChange={(e) => setNewMeeting({ ...newMeeting, startTime: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Duration (min)</label>
                    <input
                      type="number"
                      value={newMeeting.duration}
                      onChange={(e) => setNewMeeting({ ...newMeeting, duration: parseInt(e.target.value) })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Meeting Type</label>
                  <select
                    value={newMeeting.type}
                    onChange={(e) => setNewMeeting({ ...newMeeting, type: e.target.value as Meeting['type'] })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="video">Video Call</option>
                    <option value="audio">Audio Only</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Participants</label>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {teammates.filter(t => t.id !== currentUser?.id).map(teammate => (
                      <label key={teammate.id} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={newMeeting.participants.includes(teammate.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setNewMeeting({
                                ...newMeeting,
                                participants: [...newMeeting.participants, teammate.id]
                              });
                            } else {
                              setNewMeeting({
                                ...newMeeting,
                                participants: newMeeting.participants.filter(id => id !== teammate.id)
                              });
                            }
                          }}
                          className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                        />
                        <span className="text-sm text-gray-700">{teammate.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowMeetingModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={scheduleMeeting}
                  disabled={!newMeeting.title.trim() || newMeeting.participants.length === 0}
                  className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-green-700 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Schedule</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Channel Settings Modal */}
      {showChannelSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Channel Settings</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Manage Members</span>
                  <button className="text-purple-600 hover:text-purple-700 text-sm">
                    View All
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Channel Permissions</span>
                  <button className="text-purple-600 hover:text-purple-700 text-sm">
                    Edit
                  </button>
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  <button className="w-full text-left text-red-600 hover:text-red-700 text-sm font-medium">
                    Delete Channel
                  </button>
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setShowChannelSettings(null)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeammatesChat;
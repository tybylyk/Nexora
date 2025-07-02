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
  Circle
} from 'lucide-react';

interface Message {
  id: string;
  customerId: string;
  customerName: string;
  channel: 'whatsapp' | 'facebook' | 'instagram' | 'sms';
  content: string;
  timestamp: string;
  isRead: boolean;
  isFromCustomer: boolean;
}

const MessageCenter: React.FC = () => {
  const [messages] = useState<Message[]>([
    {
      id: '1',
      customerId: '1',
      customerName: 'John Customer',
      channel: 'whatsapp',
      content: 'Hi, I need help with my recent order',
      timestamp: '2024-01-15T14:30:00Z',
      isRead: false,
      isFromCustomer: true
    },
    {
      id: '2',
      customerId: '1',
      customerName: 'John Customer',
      channel: 'whatsapp',
      content: 'Hello! I\'d be happy to help you with your order. Can you please provide your order number?',
      timestamp: '2024-01-15T14:32:00Z',
      isRead: true,
      isFromCustomer: false
    },
    {
      id: '3',
      customerId: '2',
      customerName: 'Sarah Business',
      channel: 'facebook',
      content: 'When will the new features be available?',
      timestamp: '2024-01-15T13:45:00Z',
      isRead: false,
      isFromCustomer: true
    },
    {
      id: '4',
      customerId: '3',
      customerName: 'Mike Davis',
      channel: 'instagram',
      content: 'Love your latest product update! 🎉',
      timestamp: '2024-01-15T12:20:00Z',
      isRead: true,
      isFromCustomer: true
    }
  ]);

  const [selectedCustomer, setSelectedCustomer] = useState<string | null>('1');
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [channelFilter, setChannelFilter] = useState('all');

  const getChannelColor = (channel: string) => {
    switch (channel) {
      case 'whatsapp': return 'bg-green-100 text-green-800';
      case 'facebook': return 'bg-blue-100 text-blue-800';
      case 'instagram': return 'bg-pink-100 text-pink-800';
      case 'sms': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getChannelIcon = (channel: string) => {
    return <MessageSquare className="w-3 h-3" />;
  };

  const customers = Array.from(new Set(messages.map(m => m.customerId)))
    .map(id => {
      const customerMessages = messages.filter(m => m.customerId === id);
      const lastMessage = customerMessages[customerMessages.length - 1];
      const unreadCount = customerMessages.filter(m => m.isFromCustomer && !m.isRead).length;
      
      return {
        id,
        name: lastMessage.customerName,
        lastMessage: lastMessage.content,
        lastMessageTime: lastMessage.timestamp,
        channel: lastMessage.channel,
        unreadCount
      };
    })
    .filter(customer => {
      const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesChannel = channelFilter === 'all' || customer.channel === channelFilter;
      return matchesSearch && matchesChannel;
    });

  const customerMessages = selectedCustomer 
    ? messages.filter(m => m.customerId === selectedCustomer)
    : [];

  const selectedCustomerInfo = customers.find(c => c.id === selectedCustomer);

  const sendMessage = () => {
    if (newMessage.trim() && selectedCustomer) {
      // In a real app, this would send the message via API
      setNewMessage('');
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

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Message Center</h1>
          <p className="text-gray-600 mt-1">Manage customer communications across all channels</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-[700px] flex">
        {/* Customer List */}
        <div className="w-1/3 border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <select
              value={channelFilter}
              onChange={(e) => setChannelFilter(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">All Channels</option>
              <option value="whatsapp">WhatsApp</option>
              <option value="facebook">Facebook</option>
              <option value="instagram">Instagram</option>
              <option value="sms">SMS</option>
            </select>
          </div>

          <div className="flex-1 overflow-y-auto">
            {customers.map((customer) => (
              <div
                key={customer.id}
                onClick={() => setSelectedCustomer(customer.id)}
                className={`p-4 cursor-pointer hover:bg-gray-50 border-b border-gray-100 ${
                  selectedCustomer === customer.id ? 'bg-purple-50 border-purple-200' : ''
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium text-gray-900">{customer.name}</h4>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getChannelColor(customer.channel)}`}>
                      {getChannelIcon(customer.channel)}
                      <span className="capitalize">{customer.channel}</span>
                    </div>
                  </div>
                  {customer.unreadCount > 0 && (
                    <div className="bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {customer.unreadCount}
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-600 truncate">{customer.lastMessage}</p>
                <p className="text-xs text-gray-500 mt-1">{formatTime(customer.lastMessageTime)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {selectedCustomer ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium">
                      {selectedCustomerInfo?.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{selectedCustomerInfo?.name}</h3>
                    <div className="flex items-center space-x-2">
                      <div className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getChannelColor(selectedCustomerInfo?.channel || '')}`}>
                        {getChannelIcon(selectedCustomerInfo?.channel || '')}
                        <span className="capitalize">{selectedCustomerInfo?.channel}</span>
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
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {customerMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isFromCustomer ? 'justify-start' : 'justify-end'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.isFromCustomer
                          ? 'bg-gray-100 text-gray-900'
                          : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <div className="flex items-center justify-between mt-1">
                        <p className={`text-xs ${message.isFromCustomer ? 'text-gray-500' : 'text-purple-100'}`}>
                          {formatTime(message.timestamp)}
                        </p>
                        {!message.isFromCustomer && (
                          <CheckCircle className="w-3 h-3 text-purple-100" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-200">
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
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select a conversation</h3>
                <p className="text-gray-600">Choose a customer from the list to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageCenter;
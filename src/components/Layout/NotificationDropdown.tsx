import React, { useState } from 'react';
import { 
  Bell, 
  Phone, 
  MessageSquare, 
  AlertTriangle, 
  CheckCircle, 
  X, 
  Calendar,
  AtSign,
  ExternalLink
} from 'lucide-react';
import { Notification } from '../../types';

interface NotificationDropdownProps {
  onClose: () => void;
}

const NotificationDropdown: React.FC<NotificationDropdownProps> = ({ onClose }) => {
  const [notifications] = useState<Notification[]>([
    {
      id: '1',
      userId: 'current-user',
      type: 'call',
      title: 'Missed Call',
      message: 'You missed a call from John Customer (+1 555-123-4567)',
      isRead: false,
      createdAt: '2024-01-15T14:30:00Z',
      priority: 'high',
      actionUrl: '/calls'
    },
    {
      id: '2',
      userId: 'current-user',
      type: 'mention',
      title: 'You were mentioned',
      message: '@sarah mentioned you in a note about customer feedback',
      isRead: false,
      createdAt: '2024-01-15T14:25:00Z',
      priority: 'medium',
      mentionedBy: 'Sarah Manager'
    },
    {
      id: '3',
      userId: 'current-user',
      type: 'interview',
      title: 'Interview Reminder',
      message: 'Interview with John Smith scheduled in 30 minutes',
      isRead: false,
      createdAt: '2024-01-15T14:00:00Z',
      priority: 'high',
      actionUrl: '/interviews'
    },
    {
      id: '4',
      userId: 'current-user',
      type: 'message',
      title: 'New WhatsApp Message',
      message: 'Sarah Business: "When will the new features be available?"',
      isRead: true,
      createdAt: '2024-01-15T13:45:00Z',
      priority: 'medium',
      actionUrl: '/messages'
    }
  ]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'call': return <Phone className="w-4 h-4 text-blue-600" />;
      case 'message': return <MessageSquare className="w-4 h-4 text-green-600" />;
      case 'alert': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'interview': return <Calendar className="w-4 h-4 text-purple-600" />;
      case 'mention': return <AtSign className="w-4 h-4 text-orange-600" />;
      default: return <Bell className="w-4 h-4 text-gray-600" />;
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        {unreadCount > 0 && (
          <p className="text-sm text-gray-600 mt-1">{unreadCount} unread notifications</p>
        )}
      </div>

      <div className="max-h-96 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-6 text-center">
            <Bell className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-600 text-sm">No notifications</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer ${
                  !notification.isRead ? 'bg-purple-50' : ''
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <p className={`text-sm font-medium ${!notification.isRead ? 'text-gray-900' : 'text-gray-700'}`}>
                        {notification.title}
                      </p>
                      {!notification.isRead && (
                        <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">{notification.message}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-gray-500">{formatTime(notification.createdAt)}</span>
                      {notification.actionUrl && (
                        <button className="text-xs text-purple-600 hover:text-purple-700 flex items-center space-x-1">
                          <span>View</span>
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="p-3 border-t border-gray-200">
        <button className="w-full text-center text-sm text-purple-600 hover:text-purple-700 font-medium">
          View All Notifications
        </button>
      </div>
    </div>
  );
};

export default NotificationDropdown;
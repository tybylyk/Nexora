export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'team_leader' | 'hr' | 'call_center' | 'intern';
  avatar?: string;
  department?: string;
  isActive: boolean;
  createdAt: string;
  permissions?: string[];
  teamId?: string;
  status?: 'online' | 'offline' | 'busy' | 'away';
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  cvUrl?: string;
  status: 'applied' | 'screening' | 'interview' | 'technical' | 'offer' | 'hired' | 'rejected';
  score: number;
  notes: string;
  interviewDate?: string;
  createdAt: string;
  assignedTo?: string;
  skills?: string[];
  experience?: number;
  education?: string;
  cvContent?: string;
}

export interface Interview {
  id: string;
  candidateId: string;
  candidateName: string;
  interviewerId: string;
  interviewerName: string;
  type: 'phone' | 'video' | 'in_person' | 'technical';
  status: 'scheduled' | 'completed' | 'cancelled' | 'rescheduled';
  scheduledDate: string;
  duration: number;
  notes?: string;
  score?: number;
  feedback?: string;
  meetingLink?: string;
  location?: string;
}

export interface CallRecord {
  id: string;
  customerId: string;
  agentId: string;
  type: 'inbound' | 'outbound';
  channel: 'phone' | 'whatsapp' | 'instagram' | 'facebook' | 'sms';
  duration: number;
  status: 'active' | 'completed' | 'missed' | 'transferred';
  notes: string;
  recordingUrl?: string;
  startTime: string;
  endTime?: string;
  isLive?: boolean;
  supervisorNotes?: string;
  quality?: number;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  status: 'active' | 'inactive' | 'prospect';
  lastContact: string;
  totalCalls: number;
  averageRating: number;
  assignedAgent?: string;
}

export interface TimeEntry {
  id: string;
  userId: string;
  type: 'call' | 'break' | 'training' | 'admin' | 'available' | 'unavailable';
  startTime: string;
  endTime?: string;
  duration?: number;
  description?: string;
  callId?: string;
  customerId?: string;
  isActive?: boolean;
}

export interface KPI {
  id: string;
  name: string;
  value: number;
  target: number;
  trend: 'up' | 'down' | 'stable';
  period: 'daily' | 'weekly' | 'monthly';
}

export interface Notification {
  id: string;
  userId: string;
  type: 'call' | 'message' | 'system' | 'alert' | 'interview' | 'mention';
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  priority: 'low' | 'medium' | 'high';
  actionUrl?: string;
  relatedId?: string;
  mentionedBy?: string;
}

export interface Settings {
  id: string;
  userId?: string;
  category: 'general' | 'integrations' | 'notifications' | 'security' | 'team';
  key: string;
  value: any;
  isGlobal: boolean;
}

export interface Integration {
  id: string;
  platform: 'facebook' | 'instagram' | 'whatsapp' | 'sms';
  isEnabled: boolean;
  credentials: {
    appId?: string;
    appSecret?: string;
    accessToken?: string;
    webhookUrl?: string;
    phoneNumber?: string;
  };
  settings: {
    autoReply?: boolean;
    businessHours?: boolean;
    assignmentRule?: 'round_robin' | 'manual' | 'skill_based';
  };
}

export interface ConversationNote {
  id: string;
  conversationId: string;
  userId: string;
  userName: string;
  content: string;
  type: 'internal' | 'customer_visible';
  createdAt: string;
  isPrivate: boolean;
  mentions?: string[];
  tags?: string[];
}

export interface LiveSession {
  id: string;
  agentId: string;
  supervisorId: string;
  type: 'monitor' | 'whisper' | 'barge_in';
  startTime: string;
  endTime?: string;
  isActive: boolean;
}

export interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: string;
  action: () => void;
  roles: string[];
  category: 'call' | 'hr' | 'admin' | 'general';
}

export interface CVDocument {
  id: string;
  candidateId: string;
  fileName: string;
  fileSize: number;
  uploadDate: string;
  extractedText?: string;
  skills?: string[];
  experience?: string[];
  education?: string[];
  languages?: string[];
  parsedData?: any;
}
import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  FileText,
  HelpCircle,
  PenLine,
  Plus,
  Send,
  UserPlus,
  X,
  Clock,
  CheckCircle,
  AlertCircle,
  MessageSquare,
  Paperclip,
  User,
  ArrowUp,
  ArrowDown,
  Trash2,
  Edit,
  Play,
  Pause,
  Square
} from 'lucide-react';

const EmployeeRequests: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'workday' | 'helpdesk' | 'esign'>('workday');
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [showPTOModal, setShowPTOModal] = useState(false);
  const [showESignModal, setShowESignModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<number | null>(null);
  
  // Workday State
  const [currentDate, setCurrentDate] = useState(new Date());
  const [ptoRequests, setPtoRequests] = useState([
    { id: 1, startDate: '2025-07-15', endDate: '2025-07-17', type: 'Vacation', status: 'pending', reason: 'Family trip' },
    { id: 2, startDate: '2025-07-22', endDate: '2025-07-22', type: 'Sick', status: 'approved', reason: 'Doctor appointment' }
  ]);
  
  // PTO Form State
  const [ptoForm, setPtoForm] = useState({
    type: 'Vacation',
    startDate: '',
    endDate: '',
    reason: ''
  });

  // Helpdesk State
  const [tickets, setTickets] = useState([
    { 
      id: 1, 
      subject: 'Computer not starting', 
      description: 'My laptop won\'t boot up this morning',
      status: 'open',
      priority: 'high',
      created: '2025-07-01 09:00',
      messages: [
        { id: 1, sender: 'employee', message: 'My laptop won\'t boot up this morning', time: '09:00', files: [] },
        { id: 2, sender: 'helpdesk', message: 'Have you tried holding the power button for 10 seconds?', time: '09:15', files: [] },
        { id: 3, sender: 'employee', message: 'Yes, still not working. Here\'s a photo of the screen.', time: '09:30', files: ['error-screen.jpg'] }
      ]
    },
    {
      id: 2,
      subject: 'Need access to shared folder',
      description: 'Cannot access the marketing shared folder',
      status: 'resolved',
      priority: 'medium',
      created: '2025-06-28 14:30',
      messages: [
        { id: 1, sender: 'employee', message: 'Cannot access the marketing shared folder', time: '14:30', files: [] },
        { id: 2, sender: 'helpdesk', message: 'Access has been granted. Please try again.', time: '15:00', files: [] }
      ]
    }
  ]);
  
  // Ticket Form State
  const [ticketForm, setTicketForm] = useState({
    priority: 'medium',
    subject: '',
    description: '',
    files: []
  });
  
  const [newMessage, setNewMessage] = useState('');

  // eSign State
  const [eSignDocuments, setESignDocuments] = useState([
    { 
      id: 1, 
      title: 'NDA Agreement', 
      signers: ['John Doe', 'Jane Smith'], 
      status: 'pending', 
      created: '2025-07-01', 
      dueDate: '2025-07-15',
      documentPath: '/documents/nda-agreement.pdf'
    },
    { 
      id: 2, 
      title: 'Contract Amendment', 
      signers: ['Mike Johnson'], 
      status: 'completed', 
      created: '2025-06-25', 
      dueDate: '2025-07-10',
      documentPath: '/documents/contract-amendment.pdf'
    }
  ]);
  
  const [newESignDoc, setNewESignDoc] = useState({
    title: '',
    signers: [''],
    dueDate: '',
    document: null
  });

  const [showPDFViewer, setShowPDFViewer] = useState(false);
  const [selectedPDF, setSelectedPDF] = useState<string | null>(null);

  // Calendar helpers
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const isDateInRange = (date: string, startDate: string, endDate: string) => {
    return date >= startDate && date <= endDate;
  };

  const getPTOForDate = (date: string) => {
    return ptoRequests.find(pto => isDateInRange(date, pto.startDate, pto.endDate));
  };

  // Ticket functions
  const submitTicket = () => {
    if (!ticketForm.subject.trim() || !ticketForm.description.trim()) return;
    
    const newTicket = {
      id: tickets.length + 1,
      subject: ticketForm.subject,
      description: ticketForm.description,
      priority: ticketForm.priority,
      status: 'open',
      created: new Date().toLocaleString(),
      messages: [
        { 
          id: 1, 
          sender: 'employee', 
          message: ticketForm.description, 
          time: new Date().toLocaleTimeString(), 
          files: ticketForm.files 
        }
      ]
    };
    
    setTickets([newTicket, ...tickets]);
    setTicketForm({
      priority: 'medium',
      subject: '',
      description: '',
      files: []
    });
    setShowTicketModal(false);
  };

  const submitPTORequest = () => {
    if (!ptoForm.startDate || !ptoForm.endDate) return;
    
    const newPTO = {
      id: ptoRequests.length + 1,
      type: ptoForm.type,
      startDate: ptoForm.startDate,
      endDate: ptoForm.endDate,
      reason: ptoForm.reason,
      status: 'pending'
    };
    
    setPtoRequests([...ptoRequests, newPTO]);
    setPtoForm({
      type: 'Vacation',
      startDate: '',
      endDate: '',
      reason: ''
    });
    setShowPTOModal(false);
  };

  const viewPDF = (documentPath: string) => {
    setSelectedPDF(documentPath);
    setShowPDFViewer(true);
  };

  const sendMessage = (ticketId: number) => {
    if (!newMessage.trim()) return;
    
    setTickets(tickets.map(ticket => 
      ticket.id === ticketId 
        ? {
            ...ticket,
            messages: [...ticket.messages, {
              id: ticket.messages.length + 1,
              sender: 'employee',
              message: newMessage,
              time: new Date().toLocaleTimeString(),
              files: []
            }]
          }
        : ticket
    ));
    setNewMessage('');
  };

  // eSign functions
  const addSigner = () => {
    setNewESignDoc({
      ...newESignDoc,
      signers: [...newESignDoc.signers, '']
    });
  };

  const updateSigner = (index: number, value: string) => {
    const updatedSigners = [...newESignDoc.signers];
    updatedSigners[index] = value;
    setNewESignDoc({ ...newESignDoc, signers: updatedSigners });
  };

  const removeSigner = (index: number) => {
    setNewESignDoc({
      ...newESignDoc,
      signers: newESignDoc.signers.filter((_, i) => i !== index)
    });
  };

  const moveSigner = (index: number, direction: 'up' | 'down') => {
    const signers = [...newESignDoc.signers];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex >= 0 && newIndex < signers.length) {
      [signers[index], signers[newIndex]] = [signers[newIndex], signers[index]];
      setNewESignDoc({ ...newESignDoc, signers });
    }
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];
    
    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 border border-gray-200"></div>);
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dateStr = formatDate(date);
      const pto = getPTOForDate(dateStr);
      const isToday = dateStr === formatDate(new Date());
      
      days.push(
        <div key={day} className={`h-24 border border-gray-200 p-1 ${isToday ? 'bg-blue-50 border-blue-300' : ''}`}>
          <div className="font-medium text-sm">{day}</div>
          {pto && (
            <div className={`text-xs px-1 py-0.5 rounded mt-1 ${
              pto.status === 'approved' ? 'bg-green-100 text-green-800' : 
              pto.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
              'bg-red-100 text-red-800'
            }`}>
              {pto.type}
            </div>
          )}
        </div>
      );
    }
    
    return (
      <div className="grid grid-cols-7 gap-0 border border-gray-200 rounded-lg overflow-hidden">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="bg-gray-50 p-2 text-center font-medium text-sm border-b border-gray-200">
            {day}
          </div>
        ))}
        {days}
      </div>
    );
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Workday Requests</h1>
          <p className="text-gray-600 mt-1">Manage your workdays, open helpdesk tickets or sign documents via eSign</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-8 border-b mb-8">
        {[
          { key: 'workday', label: 'Workday & PTO', icon: CalendarIcon },
          { key: 'helpdesk', label: 'Helpdesk Tickets', icon: HelpCircle },
          { key: 'esign', label: 'eSign Documents', icon: PenLine }
        ].map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key as any)}
            className={`pb-4 px-2 text-sm font-medium flex items-center space-x-2 border-b-2 transition-all duration-200 ${
              activeTab === key 
                ? 'border-purple-600 text-purple-700' 
                : 'border-transparent text-gray-500 hover:text-purple-600 hover:border-purple-300'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span>{label}</span>
          </button>
        ))}
      </div>

      {/* Workday Tab */}
      {activeTab === 'workday' && (
        <div className="space-y-6">

          {/* Calendar Card */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold flex items-center space-x-2">
                <CalendarIcon className="w-5 h-5 text-purple-600" />
                <span>Work Calendar</span>
              </h2>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  ←
                </button>
                <span className="font-medium text-lg">
                  {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </span>
                <button
                  onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  →
                </button>
                <button
                  onClick={() => setShowPTOModal(true)}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Request Time Off</span>
                </button>
              </div>
            </div>
            {renderCalendar()}
          </div>

          {/* PTO Requests */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h3 className="text-lg font-semibold mb-4">PTO Requests</h3>
            <div className="space-y-3">
              {ptoRequests.map(request => (
                <div key={request.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium">{request.type} - {request.startDate} to {request.endDate}</div>
                    <div className="text-sm text-gray-600">{request.reason}</div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                    request.status === 'approved' ? 'bg-green-100 text-green-800' :
                    request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {request.status}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Helpdesk Tab */}
      {activeTab === 'helpdesk' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold flex items-center space-x-2">
              <HelpCircle className="w-5 h-5 text-purple-600" />
              <span>Support Tickets</span>
            </h2>
            <button
              onClick={() => setShowTicketModal(true)}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>New Ticket</span>
            </button>
          </div>

          {/* Tickets List */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {tickets.map(ticket => (
              <div key={ticket.id} className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-lg">{ticket.subject}</h3>
                    <p className="text-sm text-gray-600">Created: {ticket.created}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      ticket.priority === 'high' ? 'bg-red-100 text-red-800' :
                      ticket.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {ticket.priority}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      ticket.status === 'open' ? 'bg-blue-100 text-blue-800' :
                      ticket.status === 'resolved' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {ticket.status}
                    </span>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">{ticket.description}</p>
                <button
                  onClick={() => setSelectedTicket(selectedTicket === ticket.id ? null : ticket.id)}
                  className="text-purple-600 hover:text-purple-800 flex items-center space-x-1"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>View Chat ({ticket.messages.length})</span>
                </button>

                {/* Chat Messages */}
                {selectedTicket === ticket.id && (
                  <div className="mt-4 border-t pt-4">
                    <div className="max-h-60 overflow-y-auto space-y-3 mb-4">
                      {ticket.messages.map(message => (
                        <div key={message.id} className={`flex ${message.sender === 'employee' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                            message.sender === 'employee' 
                              ? 'bg-purple-600 text-white' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            <p className="text-sm">{message.message}</p>
                            <p className="text-xs opacity-75 mt-1">{message.time}</p>
                            {message.files.length > 0 && (
                              <div className="mt-2">
                                {message.files.map((file, idx) => (
                                  <div key={idx} className="flex items-center space-x-1 text-xs">
                                    <Paperclip className="w-3 h-3" />
                                    <span>{file}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm"
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage(ticket.id)}
                      />
                      <button
                        onClick={() => sendMessage(ticket.id)}
                        className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* eSign Tab */}
      {activeTab === 'esign' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold flex items-center space-x-2">
              <PenLine className="w-5 h-5 text-purple-600" />
              <span>eSign Documents</span>
            </h2>
            <button
              onClick={() => setShowESignModal(true)}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>New Document</span>
            </button>
          </div>

          {/* Documents List */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {eSignDocuments.map(doc => (
              <div key={doc.id} className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-lg">{doc.title}</h3>
                    <p className="text-sm text-gray-600">Created: {doc.created}</p>
                    <p className="text-sm text-gray-600">Due: {doc.dueDate}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    doc.status === 'completed' ? 'bg-green-100 text-green-800' :
                    doc.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {doc.status}
                  </span>
                </div>
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Signers:</p>
                  <div className="space-y-1">
                    {doc.signers.map((signer, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-sm">
                        <User className="w-4 h-4 text-gray-400" />
                        <span>{signer}</span>
                        {doc.status === 'completed' && <CheckCircle className="w-4 h-4 text-green-500" />}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => viewPDF(doc.documentPath)}
                    className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 flex items-center justify-center space-x-2"
                  >
                    <FileText className="w-4 h-4" />
                    <span>View Document</span>
                  </button>
                  {doc.status === 'pending' && (
                    <button className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700">
                      Remind
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PTO Request Modal */}
      {showPTOModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Request Time Off</h3>
              <button onClick={() => setShowPTOModal(false)} className="text-gray-400 hover:text-red-500">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Request Type</label>
                <select 
                  value={ptoForm.type}
                  onChange={(e) => setPtoForm({ ...ptoForm, type: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                >
                  <option value="Vacation">Vacation</option>
                  <option value="Sick">Sick Leave</option>
                  <option value="Personal">Personal Day</option>
                  <option value="Bereavement">Bereavement</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input 
                    type="date" 
                    value={ptoForm.startDate}
                    onChange={(e) => setPtoForm({ ...ptoForm, startDate: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <input 
                    type="date" 
                    value={ptoForm.endDate}
                    onChange={(e) => setPtoForm({ ...ptoForm, endDate: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2" 
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
                <textarea 
                  value={ptoForm.reason}
                  onChange={(e) => setPtoForm({ ...ptoForm, reason: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2" 
                  rows={3} 
                  placeholder="Optional reason for your request..." 
                />
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowPTOModal(false)}
                  className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button 
                  onClick={submitPTORequest}
                  disabled={!ptoForm.startDate || !ptoForm.endDate}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Submit Request
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Ticket Modal */}
      {showTicketModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Submit New Ticket</h3>
              <button onClick={() => setShowTicketModal(false)} className="text-gray-400 hover:text-red-500">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                <select 
                  value={ticketForm.priority}
                  onChange={(e) => setTicketForm({ ...ticketForm, priority: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Issue Subject</label>
                <input 
                  type="text" 
                  value={ticketForm.subject}
                  onChange={(e) => setTicketForm({ ...ticketForm, subject: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2" 
                  placeholder="Short issue summary" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea 
                  value={ticketForm.description}
                  onChange={(e) => setTicketForm({ ...ticketForm, description: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2" 
                  rows={4} 
                  placeholder="Describe the issue in detail..." 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Attach Files</label>
                <input 
                  type="file" 
                  multiple 
                  onChange={(e) => setTicketForm({ ...ticketForm, files: Array.from(e.target.files || []).map(f => f.name) })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2" 
                />
                {ticketForm.files.length > 0 && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-600">Selected files:</p>
                    <ul className="text-sm text-gray-500">
                      {ticketForm.files.map((file, idx) => (
                        <li key={idx} className="flex items-center space-x-1">
                          <Paperclip className="w-3 h-3" />
                          <span>{file}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowTicketModal(false)}
                  className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button 
                  onClick={submitTicket}
                  disabled={!ticketForm.subject.trim() || !ticketForm.description.trim()}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Submit Ticket
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* eSign Modal */}
      {showESignModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Create eSign Document</h3>
              <button onClick={() => setShowESignModal(false)} className="text-gray-400 hover:text-red-500">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Document Title</label>
                <input
                  type="text"
                  value={newESignDoc.title}
                  onChange={(e) => setNewESignDoc({ ...newESignDoc, title: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  placeholder="e.g., NDA Agreement, Employment Contract"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Upload Document</label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => setNewESignDoc({ ...newESignDoc, document: e.target.files?.[0] || null })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                />
                <p className="text-xs text-gray-500 mt-1">Supported formats: PDF, DOC, DOCX</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
                <input
                  type="date"
                  value={newESignDoc.dueDate}
                  onChange={(e) => setNewESignDoc({ ...newESignDoc, dueDate: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="block text-sm font-medium text-gray-700">Signers</label>
                  <button
                    onClick={addSigner}
                    className="bg-green-500 text-white px-3 py-1 rounded-lg text-sm flex items-center space-x-1 hover:bg-green-600"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>Add Signer</span>
                  </button>
                </div>
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {newESignDoc.signers.map((signer, index) => (
                    <div key={index} className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full font-medium">
                          {index + 1}
                        </span>
                        <User className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        value={signer}
                        onChange={(e) => updateSigner(index, e.target.value)}
                        placeholder="Enter signer name or email"
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
                      />
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => moveSigner(index, 'up')}
                          disabled={index === 0}
                          className={`p-1 rounded ${index === 0 ? 'text-gray-300' : 'text-gray-600 hover:bg-gray-200'}`}
                        >
                          <ArrowUp className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => moveSigner(index, 'down')}
                          disabled={index === newESignDoc.signers.length - 1}
                          className={`p-1 rounded ${index === newESignDoc.signers.length - 1 ? 'text-gray-300' : 'text-gray-600 hover:bg-gray-200'}`}
                        >
                          <ArrowDown className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => removeSigner(index)}
                          disabled={newESignDoc.signers.length === 1}
                          className={`p-1 rounded ${newESignDoc.signers.length === 1 ? 'text-gray-300' : 'text-red-600 hover:bg-red-100'}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Signers will receive the document in the order listed above. Use the arrows to reorder.
                </p>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Signing Process Preview</h4>
                <div className="space-y-2">
                  {newESignDoc.signers.map((signer, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm">
                      <div className="w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-medium">
                        {index + 1}
                      </div>
                      <span className="text-gray-700">
                        {signer || `Signer ${index + 1}`} will sign {index === 0 ? 'first' : `after ${newESignDoc.signers[index - 1] || `Signer ${index}`}`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex space-x-3 pt-4 border-t">
                <button
                  onClick={() => setShowESignModal(false)}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // In a real app, this would send the document for signing
                    const documentPath = newESignDoc.document ? `/documents/${newESignDoc.document.name}` : '/documents/untitled.pdf';
                    const newDoc = {
                      id: eSignDocuments.length + 1,
                      title: newESignDoc.title,
                      signers: newESignDoc.signers.filter(s => s.trim()),
                      status: 'pending',
                      created: new Date().toISOString().split('T')[0],
                      dueDate: newESignDoc.dueDate,
                      documentPath: documentPath
                    };
                    setESignDocuments([newDoc, ...eSignDocuments]);
                    setNewESignDoc({ title: '', signers: [''], dueDate: '', document: null });
                    setShowESignModal(false);
                  }}
                  disabled={!newESignDoc.title || !newESignDoc.document || newESignDoc.signers.every(s => !s.trim())}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:from-purple-700 hover:to-blue-700 font-medium flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send for Signature</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PDF Viewer Modal */}
      {showPDFViewer && selectedPDF && (
        <div className="fixed inset-0 bg-black/75 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl h-5/6 flex flex-col">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-semibold">Document Viewer</h3>
              <button 
                onClick={() => setShowPDFViewer(false)} 
                className="text-gray-400 hover:text-red-500"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex-1 p-4 bg-gray-100 flex items-center justify-center">
              <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
                <FileText className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-gray-900 mb-2">PDF Document</h4>
                <p className="text-gray-600 mb-4">
                  Document path: <code className="bg-gray-100 px-2 py-1 rounded text-sm">{selectedPDF}</code>
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  In a real application, this would display the actual PDF content using a PDF viewer library like react-pdf or pdf.js.
                </p>
                <div className="flex space-x-3 justify-center">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center space-x-2">
                    <FileText className="w-4 h-4" />
                    <span>Download PDF</span>
                  </button>
                  <button className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600">
                    Print
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeRequests;
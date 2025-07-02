import React, { useState } from 'react';
import { 
  StickyNote, 
  Plus, 
  Edit3, 
  Trash2, 
  Save, 
  X,
  Lock,
  Unlock,
  MessageSquare,
  Phone,
  User,
  AtSign,
  Send,
  Clock,
  Tag
} from 'lucide-react';
import { ConversationNote } from '../../types';
import { useAuth } from '../../contexts/AuthContext';

interface ConversationNotesProps {
  conversationId: string;
  conversationType: 'call' | 'message';
  isVisible: boolean;
  onClose: () => void;
}

const ConversationNotes: React.FC<ConversationNotesProps> = ({ 
  conversationId, 
  conversationType, 
  isVisible, 
  onClose 
}) => {
  const { user } = useAuth();
  const [notes, setNotes] = useState<ConversationNote[]>([
    {
      id: '1',
      conversationId,
      userId: user?.id || '',
      userName: user?.name || '',
      content: 'Customer mentioned they are interested in upgrading their plan. Follow up needed within 24 hours.',
      type: 'internal',
      createdAt: '2024-01-15T14:30:00Z',
      isPrivate: false,
      mentions: []
    },
    {
      id: '2',
      conversationId,
      userId: 'supervisor-id',
      userName: 'Sarah Manager',
      content: 'Good handling of the customer concern. Consider offering the premium package with 20% discount. @alex please review this case and prepare the proposal.',
      type: 'internal',
      createdAt: '2024-01-15T14:35:00Z',
      isPrivate: true,
      mentions: ['alex']
    },
    {
      id: '3',
      conversationId,
      userId: user?.id || '',
      userName: user?.name || '',
      content: 'Customer confirmed they want to proceed with the upgrade. Scheduling follow-up call for tomorrow.',
      type: 'customer_visible',
      createdAt: '2024-01-15T15:00:00Z',
      isPrivate: false,
      mentions: []
    }
  ]);

  const [newNote, setNewNote] = useState('');
  const [noteType, setNoteType] = useState<'internal' | 'customer_visible'>('internal');
  const [isPrivate, setIsPrivate] = useState(false);
  const [editingNote, setEditingNote] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  const [showMentionSuggestions, setShowMentionSuggestions] = useState(false);
  const [mentionQuery, setMentionQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Mock team members for mentions
  const teamMembers = [
    { id: 'alex', name: 'Alex Agent', role: 'Agent' },
    { id: 'sarah', name: 'Sarah Manager', role: 'Manager' },
    { id: 'mike', name: 'Mike Leader', role: 'Team Leader' },
    { id: 'lisa', name: 'Lisa HR', role: 'HR' }
  ];

  // Predefined tags
  const availableTags = [
    'follow-up', 'urgent', 'escalation', 'resolved', 'pending',
    'technical', 'billing', 'feature-request', 'complaint', 'compliment'
  ];

  const addNote = () => {
    if (!newNote.trim()) return;

    // Extract mentions from note content
    const mentions = extractMentions(newNote);

    const note: ConversationNote = {
      id: Date.now().toString(),
      conversationId,
      userId: user?.id || '',
      userName: user?.name || '',
      content: newNote,
      type: noteType,
      createdAt: new Date().toISOString(),
      isPrivate,
      mentions,
      tags: selectedTags
    };

    setNotes(prev => [note, ...prev]);
    setNewNote('');
    setNoteType('internal');
    setIsPrivate(false);
    setSelectedTags([]);
  };

  const extractMentions = (content: string): string[] => {
    const mentionRegex = /@(\w+)/g;
    const mentions = [];
    let match;
    while ((match = mentionRegex.exec(content)) !== null) {
      mentions.push(match[1]);
    }
    return mentions;
  };

  const handleNoteChange = (value: string) => {
    setNewNote(value);
    
    // Check for @ mentions
    const lastAtIndex = value.lastIndexOf('@');
    if (lastAtIndex !== -1) {
      const afterAt = value.substring(lastAtIndex + 1);
      if (!afterAt.includes(' ')) {
        setMentionQuery(afterAt);
        setShowMentionSuggestions(true);
      } else {
        setShowMentionSuggestions(false);
      }
    } else {
      setShowMentionSuggestions(false);
    }
  };

  const insertMention = (username: string) => {
    const lastAtIndex = newNote.lastIndexOf('@');
    const beforeAt = newNote.substring(0, lastAtIndex);
    const afterMention = newNote.substring(lastAtIndex + 1 + mentionQuery.length);
    setNewNote(`${beforeAt}@${username} ${afterMention}`);
    setShowMentionSuggestions(false);
  };

  const startEditing = (note: ConversationNote) => {
    if (note.userId !== user?.id && user?.role !== 'admin' && user?.role !== 'manager') return;
    
    setEditingNote(note.id);
    setEditContent(note.content);
  };

  const saveEdit = () => {
    if (!editContent.trim() || !editingNote) return;

    const mentions = extractMentions(editContent);

    setNotes(prev => prev.map(note => 
      note.id === editingNote 
        ? { ...note, content: editContent, mentions }
        : note
    ));
    
    setEditingNote(null);
    setEditContent('');
  };

  const cancelEdit = () => {
    setEditingNote(null);
    setEditContent('');
  };

  const deleteNote = (noteId: string) => {
    const note = notes.find(n => n.id === noteId);
    if (!note) return;
    
    if (note.userId !== user?.id && user?.role !== 'admin' && user?.role !== 'manager') return;
    
    setNotes(prev => prev.filter(n => n.id !== noteId));
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const canViewPrivateNotes = user?.role === 'admin' || user?.role === 'manager' || user?.role === 'team_leader';

  const visibleNotes = notes.filter(note => 
    !note.isPrivate || note.userId === user?.id || canViewPrivateNotes
  );

  const renderNoteContent = (content: string) => {
    // Replace @mentions with styled spans
    return content.replace(/@(\w+)/g, '<span class="bg-purple-100 text-purple-800 px-1 rounded">@$1</span>');
  };

  const filteredTeamMembers = teamMembers.filter(member =>
    member.name.toLowerCase().includes(mentionQuery.toLowerCase()) ||
    member.id.toLowerCase().includes(mentionQuery.toLowerCase())
  );

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  if (!isVisible) return null;

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <StickyNote className="w-5 h-5 text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-900">Conversation Notes</h3>
            <div className="flex items-center space-x-1 text-sm text-gray-500">
              {conversationType === 'call' ? <Phone className="w-3 h-3" /> : <MessageSquare className="w-3 h-3" />}
              <span className="capitalize">{conversationType}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Add Note Form */}
      <div className="p-4 border-b border-gray-200">
        <div className="space-y-3 relative">
          <div className="relative">
            <textarea
              value={newNote}
              onChange={(e) => handleNoteChange(e.target.value)}
              placeholder="Add a note... Use @username to mention teammates"
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none text-sm"
            />
            
            {/* Mention Suggestions */}
            {showMentionSuggestions && filteredTeamMembers.length > 0 && (
              <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-32 overflow-y-auto">
                {filteredTeamMembers.map(member => (
                  <button
                    key={member.id}
                    onClick={() => insertMention(member.id)}
                    className="w-full text-left px-3 py-2 hover:bg-purple-50 flex items-center space-x-2 text-sm"
                  >
                    <AtSign className="w-3 h-3 text-purple-600" />
                    <span className="font-medium">{member.name}</span>
                    <span className="text-xs text-gray-500">({member.role})</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Tags */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Tags</label>
            <div className="flex flex-wrap gap-1">
              {availableTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-2 py-1 text-xs rounded-full transition-colors ${
                    selectedTags.includes(tag)
                      ? 'bg-purple-100 text-purple-800 border border-purple-200'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <select
                value={noteType}
                onChange={(e) => setNoteType(e.target.value as 'internal' | 'customer_visible')}
                className="text-xs border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="internal">Internal</option>
                <option value="customer_visible">Customer Visible</option>
              </select>
              
              <label className="flex items-center space-x-1 text-xs text-gray-600">
                <input
                  type="checkbox"
                  checked={isPrivate}
                  onChange={(e) => setIsPrivate(e.target.checked)}
                  className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <span>Private</span>
                {isPrivate ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
              </label>
            </div>
            
            <button
              onClick={addNote}
              disabled={!newNote.trim()}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 py-1 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1 text-sm"
            >
              <Send className="w-3 h-3" />
              <span>Add</span>
            </button>
          </div>
        </div>
      </div>

      {/* Notes List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {visibleNotes.length === 0 ? (
          <div className="text-center py-8">
            <StickyNote className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-600 text-sm">No notes yet</p>
            <p className="text-gray-500 text-xs mt-1">Add your first note to get started</p>
          </div>
        ) : (
          visibleNotes.map((note) => (
            <div
              key={note.id}
              className={`border rounded-lg p-3 text-sm ${
                note.type === 'customer_visible' 
                  ? 'border-blue-200 bg-blue-50' 
                  : 'border-gray-200 bg-white'
              } ${note.isPrivate ? 'ring-2 ring-yellow-200' : ''}`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                    <User className="w-3 h-3 text-white" />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-900">{note.userName}</span>
                    <div className="flex items-center space-x-1 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      <span>{formatTime(note.createdAt)}</span>
                      {note.isPrivate && <Lock className="w-3 h-3 text-yellow-600" />}
                      {note.mentions && note.mentions.length > 0 && (
                        <AtSign className="w-3 h-3 text-purple-600" />
                      )}
                    </div>
                  </div>
                </div>
                
                {(note.userId === user?.id || user?.role === 'admin' || user?.role === 'manager') && (
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => startEditing(note)}
                      className="p-1 text-gray-400 hover:text-purple-600 transition-colors"
                    >
                      <Edit3 className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => deleteNote(note.id)}
                      className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
              
              {editingNote === note.id ? (
                <div className="space-y-2">
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    rows={3}
                    className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                  />
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={saveEdit}
                      className="bg-green-500 text-white px-2 py-1 rounded text-xs hover:bg-green-600 transition-colors flex items-center space-x-1"
                    >
                      <Save className="w-3 h-3" />
                      <span>Save</span>
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="bg-gray-500 text-white px-2 py-1 rounded text-xs hover:bg-gray-600 transition-colors flex items-center space-x-1"
                    >
                      <X className="w-3 h-3" />
                      <span>Cancel</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div 
                  className="text-sm text-gray-700 mb-2"
                  dangerouslySetInnerHTML={{ __html: renderNoteContent(note.content) }}
                />
              )}
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    note.type === 'customer_visible' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {note.type === 'customer_visible' ? 'Customer Visible' : 'Internal'}
                  </span>
                  {note.mentions && note.mentions.length > 0 && (
                    <div className="flex items-center space-x-1">
                      <AtSign className="w-3 h-3 text-purple-600" />
                      <span className="text-xs text-purple-600">
                        {note.mentions.length} mention{note.mentions.length > 1 ? 's' : ''}
                      </span>
                    </div>
                  )}
                </div>
                {note.tags && note.tags.length > 0 && (
                  <div className="flex items-center space-x-1">
                    <Tag className="w-3 h-3 text-gray-400" />
                    <div className="flex space-x-1">
                      {note.tags.slice(0, 2).map((tag, index) => (
                        <span key={index} className="text-xs px-1 py-0.5 bg-gray-100 text-gray-600 rounded">
                          {tag}
                        </span>
                      ))}
                      {note.tags.length > 2 && (
                        <span className="text-xs text-gray-500">+{note.tags.length - 2}</span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ConversationNotes;
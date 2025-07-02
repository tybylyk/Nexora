// ...imports
import React, { useState } from 'react';
import {
  Settings,
  FileText,
  Calendar,
  DollarSign,
  Users,
  Save,
  Pencil,
  X,
  Plus
} from 'lucide-react';

const employeeCategories = ['Worker', 'Engineer', 'Manager', 'HR'];

const placeholderLegend = [
  '[Candidate]',
  '[Position]',
  '[Company]',
  '[Start Date]',
  '[End Date]',
  '[Reason]',
  '[Employee]'
];

const defaultCategories = [
  'hiring', 'contracts', 'leave', 'exit', 'discipline', 'training', 'performance'
];

const placeholderTags = [
  '[Candidate]', '[Position]', '[Start Date]', '[End Date]', '[Employee]', '[Reason]', '[Company]'
];

type Template = {
  id: string;
  title: string;
  content: string;
  category: string;
  status: 'draft' | 'published';
};

const HRSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'general' | 'templates'>('general');
  const [payday, setPayday] = useState<number>(10);
  const [coDays, setCoDays] = useState<number>(21);
  const [hourlyRates, setHourlyRates] = useState<Record<string, number>>({
    Worker: 10,
    Engineer: 20,
    Manager: 35,
    HR: 25,
  });

  const predefinedTemplates: Template[] = [
    { id: '1', title: 'Job Offer Letter', category: 'hiring', status: 'published', content: 'Dear [Candidate], we are pleased to offer you the role of [Position] at [Company]...' },
    { id: '2', title: 'Interview Invitation', category: 'hiring', status: 'published', content: 'Dear [Candidate], we would like to invite you for an interview at [Company]...' },
    { id: '3', title: 'Rejection Letter', category: 'hiring', status: 'published', content: 'Dear [Candidate], we regret to inform you that you were not selected...' },
    { id: '4', title: 'Employment Agreement', category: 'contracts', status: 'published', content: 'This agreement is between [Candidate] and [Company]...' },
    { id: '5', title: 'NDA / Confidentiality Agreement', category: 'contracts', status: 'published', content: 'This NDA is made between [Candidate] and [Company]...' },
    { id: '6', title: 'PTO Request Approval', category: 'leave', status: 'published', content: 'Your PTO from [Start Date] to [End Date] is approved.' },
    { id: '7', title: 'PTO Request Denial', category: 'leave', status: 'published', content: 'Unfortunately, your PTO request from [Start Date] to [End Date] is not approved.' },
    { id: '8', title: 'Warning Notice', category: 'discipline', status: 'published', content: 'This letter serves as a formal warning regarding your conduct.' },
    { id: '9', title: 'Resignation Acceptance', category: 'exit', status: 'published', content: 'We acknowledge your resignation effective from [End Date].' },
    { id: '10', title: 'Termination Letter', category: 'exit', status: 'published', content: 'Your employment with [Company] will be terminated effective [End Date].' },
    { id: '11', title: 'Onboarding Welcome', category: 'training', status: 'published', content: 'Welcome to [Company], [Candidate]!' },
    { id: '12', title: 'Training Completion Certificate', category: 'training', status: 'published', content: 'This certifies that [Candidate] has completed the training on [End Date].' },
    { id: '13', title: 'Performance Improvement Plan (PIP)', category: 'performance', status: 'published', content: 'This document outlines your PIP starting from [Start Date].' }
  ];

  const [templates, setTemplates] = useState<Template[]>(predefinedTemplates);

  const [editing, setEditing] = useState<Template | null>(null);
  const [creating, setCreating] = useState(false);

  const [newTemplate, setNewTemplate] = useState<Partial<Template>>({
    title: '',
    category: '',
    content: '',
    status: 'draft'
  });

  const openEditor = (template: Template) => {
    setEditing(template);
  };

  const saveEditor = () => {
    if (editing) {
      setTemplates(prev =>
        prev.map(t => (t.id === editing.id ? editing : t))
      );
      setEditing(null);
    }
  };

  const handleAddTemplate = (status: 'draft' | 'published') => {
    if (!newTemplate.title || !newTemplate.category || !newTemplate.content) return;
    const newEntry: Template = {
      id: Date.now().toString(),
      title: newTemplate.title!,
      category: newTemplate.category!,
      content: newTemplate.content!,
      status
    };
    setTemplates(prev => [...prev, newEntry]);
    setNewTemplate({ title: '', category: '', content: '', status: 'draft' });
    setCreating(false);
  };

  const handleRateChange = (role: string, value: number) => {
    setHourlyRates(prev => ({ ...prev, [role]: value }));
  };

  const saveSettings = () => {
    console.log({ payday, coDays, hourlyRates, templates });
    alert("Settings saved. Check console for data.");
  };

  return (
    <div className="p-6 relative">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">HR Settings</h1>
          <p className="text-gray-600 mt-1">HR manager general settings</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 border-b mb-6">
        {['general', 'templates'].map(tab => (
          <button
            key={tab}
            className={`pb-2 px-4 text-sm font-medium capitalize ${
              activeTab === tab ? 'border-b-2 border-purple-600 text-purple-700' : 'text-gray-500 hover:text-purple-600'
            }`}
            onClick={() => setActiveTab(tab as any)}
          >
            {tab === 'general' ? 'General Settings' : 'Document Templates'}
          </button>
        ))}
      </div>

      {/* GENERAL SETTINGS */}
      {activeTab === 'general' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <div className="flex items-center space-x-2 mb-4">
                <Calendar className="text-purple-600 w-5 h-5" />
                <h2 className="font-semibold text-gray-800">Payday of Month</h2>
              </div>
              <input
                type="number"
                min={1}
                max={31}
                value={payday}
                onChange={e => setPayday(parseInt(e.target.value))}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <div className="flex items-center space-x-2 mb-4">
                <Calendar className="text-purple-600 w-5 h-5" />
                <h2 className="font-semibold text-gray-800">PTO Days / Year</h2>
              </div>
              <input
                type="number"
                min={0}
                value={coDays}
                onChange={e => setCoDays(parseInt(e.target.value))}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border mt-6">
            <div className="flex items-center space-x-2 mb-4">
              <DollarSign className="text-purple-600 w-5 h-5" />
              <h2 className="font-semibold text-gray-800">General Hourly Rates per Category</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {employeeCategories.map(role => (
                <div key={role}>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">{role}</label>
                  <input
                    type="number"
                    value={hourlyRates[role]}
                    onChange={e => handleRateChange(role, parseFloat(e.target.value))}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* DOCUMENT TEMPLATE EDITOR */}
      {activeTab === 'templates' && (
        <>
          {/* Add Template Button */}
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setCreating(true)}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-blue-700 flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Template</span>
            </button>
          </div>

          {/* Templates Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map(t => (
              <div
                key={t.id}
                onClick={() => openEditor(t)}
                className="bg-white border border-gray-200 hover:shadow-md transition cursor-pointer rounded-xl p-5 group"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <FileText className="w-5 h-5 text-purple-600" />
                    <h3 className="font-semibold text-gray-800">{t.title}</h3>
                  </div>
                  <Pencil className="w-4 h-4 text-gray-400 group-hover:text-purple-600" />
                </div>
                <p className="text-sm text-gray-500 line-clamp-4 whitespace-pre-wrap">
                  {t.content}
                </p>
                <div className="mt-2 text-xs text-gray-400">{t.category} • {t.status}</div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full p-6 relative">
            <button onClick={() => setEditing(null)} className="absolute top-3 right-3 text-gray-400 hover:text-red-500">
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-semibold mb-4">Edit Template: {editing.title}</h2>
            <textarea
              rows={10}
              value={editing.content}
              onChange={e => setEditing({ ...editing, content: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 font-mono text-sm focus:ring-2 focus:ring-purple-500"
            />
            <div className="mt-4 flex justify-between items-start">
              <div className="mt-4 text-sm text-gray-500">
                <span className="font-semibold text-gray-700">Placeholders:</span>
                <ul className="mt-1 flex flex-wrap gap-2">
                    {placeholderTags.map(tag => (
                    <li
                        key={tag}
                        onClick={() => {
                        if (editing) {
                            setEditing(prev => ({ ...prev!, content: prev!.content + ` ${tag}` }));
                        } else if (creating) {
                            setNewTemplate(prev => ({ ...prev, content: (prev.content || '') + ` ${tag}` }));
                        }
                        }}
                        className="bg-gray-100 cursor-pointer hover:bg-purple-100 px-2 py-1 text-xs font-mono rounded text-gray-600"
                    >
                        {tag}
                    </li>
                    ))}
                </ul>
              </div>
            </div>
            <div className="mt-4 flex justify-end gap-3">
                <button
                    onClick={saveEditor}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg"
                >
                    Save Changes
                </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Template Modal */}
      {creating && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full p-6 relative">
            <button onClick={() => setCreating(false)} className="absolute top-3 right-3 text-gray-400 hover:text-red-500">
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-semibold mb-4">Add New Template</h2>

            <input
              placeholder="Title"
              value={newTemplate.title || ''}
              onChange={e => setNewTemplate({ ...newTemplate, title: e.target.value })}
              className="mb-3 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500"
            />

            <select
              value={newTemplate.category || ''}
              onChange={e => setNewTemplate({ ...newTemplate, category: e.target.value })}
              className="mb-3 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Select Category</option>
              {defaultCategories.map(cat => (
                <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
              ))}
            </select>

            <textarea
              rows={8}
              value={newTemplate.content || ''}
              onChange={e => setNewTemplate({ ...newTemplate, content: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 font-mono text-sm focus:ring-2 focus:ring-purple-500"
              placeholder="Write template using placeholders like [Candidate], [Start Date]..."
            />
            <div className="mt-4 text-sm text-gray-500">
                <span className="font-semibold text-gray-700">Placeholders:</span>
                <ul className="mt-1 flex flex-wrap gap-2">
                    {placeholderTags.map(tag => (
                    <li
                        key={tag}
                        onClick={() => {
                        if (editing) {
                            setEditing(prev => ({ ...prev!, content: prev!.content + ` ${tag}` }));
                        } else if (creating) {
                            setNewTemplate(prev => ({ ...prev, content: (prev.content || '') + ` ${tag}` }));
                        }
                        }}
                        className="bg-gray-100 cursor-pointer hover:bg-purple-100 px-2 py-1 text-xs font-mono rounded text-gray-600"
                    >
                        {tag}
                    </li>
                    ))}
                </ul>
            </div>

            <div className="mt-4 flex justify-end gap-3">
              <button
                onClick={() => handleAddTemplate('draft')}
                className="px-4 py-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200"
              >
                Save as Draft
              </button>
              <button
                onClick={() => handleAddTemplate('published')}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg"
              >
                Save & Publish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HRSettings;

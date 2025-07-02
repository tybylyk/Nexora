import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  Users, 
  Bell, 
  Shield, 
  Smartphone,
  Facebook,
  Instagram,
  MessageCircle,
  Phone,
  Save,
  Eye,
  EyeOff,
  TestTube,
  CheckCircle,
  AlertCircle,
  Building,
  Mail,
  Globe,
  DollarSign,
  UserCheck,
  Clock,
  Database,
  Server,
  Key,
  Lock,
  Zap
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const SettingsPanel: React.FC = () => {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState('general');
  const [settings, setSettings] = useState({
    general: {
      companyName: 'Syurix SRL',
      companyEmail: 'info@syurix.com',
      address: 'Brasov Romania, Bvl Garii 34',
      phone: '+40 720023534',
      website: 'https://syurix.com',
      timezone: 'UTC-5',
      language: 'en',
      dateFormat: 'MM/DD/YYYY',
      workingHours: { start: '09:00', end: '17:00' },
    },
    integrations: {
      facebook: {
        enabled: false,
        appId: '',
        appSecret: '',
        pageAccessToken: '',
        webhookUrl: '',
        autoReply: true,
        businessHours: true
      },
      instagram: {
        enabled: false,
        appId: '',
        appSecret: '',
        accessToken: '',
        webhookUrl: '',
        autoReply: true,
        businessHours: true
      },
      whatsapp: {
        enabled: false,
        phoneNumber: '',
        accessToken: '',
        webhookUrl: '',
        autoReply: true,
        businessHours: true
      },
      sms: {
        enabled: false,
        provider: 'twilio',
        accountSid: '',
        authToken: '',
        phoneNumber: ''
      },
      email: {
        enabled: true,
        provider: 'smtp',
        host: 'smtp.syurix.com',
        port: 587,
        username: '',
        password: '',
        encryption: 'tls'
      }
    },
    payroll: {
      currency: 'RON',
      payPeriod: 'monthly',
      taxRate: 42.5,
      overtimeRate: 200,
      autoCalculate: true,
      approvalRequired: true,
      bankingIntegration: false
    },
    roles: {
      defaultRole: 'call_center',
      autoAssignment: 'round_robin',
      permissions: {
        admin: ['all'],
        manager: ['team_management', 'call_monitoring', 'analytics', 'reports'],
        team_leader: ['team_view', 'call_monitoring', 'notes'],
        hr: ['candidate_management', 'interviews', 'employees', 'payroll'],
        call_center: ['calls', 'messages', 'time_tracking', 'notes'],
        intern: ['notes_only', 'time_tracking']
      }
    },
    notifications: {
      emailNotifications: true,
      pushNotifications: true,
      smsNotifications: false,
      callAlerts: true,
      messageAlerts: true,
      systemAlerts: true,
      escalationAlerts: true,
      performanceAlerts: false
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: 30,
      passwordPolicy: 'medium',
      ipWhitelist: '',
      auditLog: true,
      encryptionEnabled: true,
      backupFrequency: 'daily'
    },
    platform: {
      autoAssignTickets: true,
      emailNotifications: true,
      callRecording: false,
      qualityScoring: true,
      performanceTracking: true,
      breakReminders: true,
      maxConcurrentCalls: 5
    }
  });

  const [showSecrets, setShowSecrets] = useState<{[key: string]: boolean}>({});
  const [testResults, setTestResults] = useState<{[key: string]: 'success' | 'error' | null}>({});

  const sections = [
    { id: 'general', label: 'General', icon: SettingsIcon },
    { id: 'integrations', label: 'Integrations', icon: Smartphone },
    { id: 'payroll', label: 'Payroll', icon: DollarSign },
    { id: 'roles', label: 'Roles', icon: UserCheck },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
  ];

  const handleSave = () => {
    // In a real app, this would save to backend
    console.log('Settings saved:', settings);
  };

  const testIntegration = async (platform: string) => {
    setTestResults({ ...testResults, [platform]: null });
    
    // Simulate API test
    setTimeout(() => {
      const success = Math.random() > 0.3; // 70% success rate for demo
      setTestResults({ ...testResults, [platform]: success ? 'success' : 'error' });
    }, 2000);
  };

  const toggleSecret = (key: string) => {
    setShowSecrets({ ...showSecrets, [key]: !showSecrets[key] });
  };

  const renderGeneralSettings = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Company Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
            <input
              type="text"
              value={settings.general.companyName}
              onChange={(e) => setSettings({
                ...settings,
                general: { ...settings.general, companyName: e.target.value }
              })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Company Email</label>
            <input
              type="email"
              value={settings.general.companyEmail}
              onChange={(e) => setSettings({
                ...settings,
                general: { ...settings.general, companyEmail: e.target.value }
              })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
            <input
              type="text"
              value={settings.general.address}
              onChange={(e) => setSettings({
                ...settings,
                general: { ...settings.general, address: e.target.value }
              })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
            <input
              type="tel"
              value={settings.general.phone}
              onChange={(e) => setSettings({
                ...settings,
                general: { ...settings.general, phone: e.target.value }
              })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
            <input
              type="url"
              value={settings.general.website}
              onChange={(e) => setSettings({
                ...settings,
                general: { ...settings.general, website: e.target.value }
              })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">Auto-assign tickets</h4>
              <p className="text-sm text-gray-600">Automatically assign new tickets to available agents</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.platform.autoAssignTickets}
                onChange={(e) => setSettings({
                  ...settings,
                  platform: { ...settings.platform, autoAssignTickets: e.target.checked }
                })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">Email notifications</h4>
              <p className="text-sm text-gray-600">Send email notifications for important events</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.platform.emailNotifications}
                onChange={(e) => setSettings({
                  ...settings,
                  platform: { ...settings.platform, emailNotifications: e.target.checked }
                })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">Call recording</h4>
              <p className="text-sm text-gray-600">Record all customer calls for quality assurance</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.platform.callRecording}
                onChange={(e) => setSettings({
                  ...settings,
                  platform: { ...settings.platform, callRecording: e.target.checked }
                })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderIntegrationCard = (platform: string, icon: React.ReactNode, title: string) => {
    const config = settings.integrations[platform as keyof typeof settings.integrations];
    
    return (
      <div className="border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            {icon}
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          </div>
          <div className="flex items-center space-x-2">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={config.enabled}
                onChange={(e) => setSettings({
                  ...settings,
                  integrations: {
                    ...settings.integrations,
                    [platform]: { ...config, enabled: e.target.checked }
                  }
                })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>
        </div>

        {config.enabled && (
          <div className="space-y-4">
            {platform === 'facebook' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">App ID</label>
                  <input
                    type="text"
                    value={config.appId}
                    onChange={(e) => setSettings({
                      ...settings,
                      integrations: {
                        ...settings.integrations,
                        [platform]: { ...config, appId: e.target.value }
                      }
                    })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter Facebook App ID"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">App Secret</label>
                  <div className="relative">
                    <input
                      type={showSecrets[`${platform}_secret`] ? 'text' : 'password'}
                      value={config.appSecret}
                      onChange={(e) => setSettings({
                        ...settings,
                        integrations: {
                          ...settings.integrations,
                          [platform]: { ...config, appSecret: e.target.value }
                        }
                      })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-10 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Enter App Secret"
                    />
                    <button
                      type="button"
                      onClick={() => toggleSecret(`${platform}_secret`)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showSecrets[`${platform}_secret`] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Page Access Token</label>
                  <div className="relative">
                    <input
                      type={showSecrets[`${platform}_token`] ? 'text' : 'password'}
                      value={config.pageAccessToken}
                      onChange={(e) => setSettings({
                        ...settings,
                        integrations: {
                          ...settings.integrations,
                          [platform]: { ...config, pageAccessToken: e.target.value }
                        }
                      })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-10 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Enter Page Access Token"
                    />
                    <button
                      type="button"
                      onClick={() => toggleSecret(`${platform}_token`)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showSecrets[`${platform}_token`] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </>
            )}

            {platform === 'whatsapp' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={config.phoneNumber}
                    onChange={(e) => setSettings({
                      ...settings,
                      integrations: {
                        ...settings.integrations,
                        [platform]: { ...config, phoneNumber: e.target.value }
                      }
                    })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="+1234567890"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Access Token</label>
                  <div className="relative">
                    <input
                      type={showSecrets[`${platform}_token`] ? 'text' : 'password'}
                      value={config.accessToken}
                      onChange={(e) => setSettings({
                        ...settings,
                        integrations: {
                          ...settings.integrations,
                          [platform]: { ...config, accessToken: e.target.value }
                        }
                      })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-10 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Enter WhatsApp Access Token"
                    />
                    <button
                      type="button"
                      onClick={() => toggleSecret(`${platform}_token`)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showSecrets[`${platform}_token`] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={config.autoReply}
                    onChange={(e) => setSettings({
                      ...settings,
                      integrations: {
                        ...settings.integrations,
                        [platform]: { ...config, autoReply: e.target.checked }
                      }
                    })}
                    className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Auto Reply</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={config.businessHours}
                    onChange={(e) => setSettings({
                      ...settings,
                      integrations: {
                        ...settings.integrations,
                        [platform]: { ...config, businessHours: e.target.checked }
                      }
                    })}
                    className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Business Hours Only</span>
                </label>
              </div>
              <button
                onClick={() => testIntegration(platform)}
                disabled={testResults[platform] === null && testResults[platform] !== undefined}
                className="flex items-center space-x-2 px-3 py-1 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors disabled:opacity-50"
              >
                <TestTube className="w-4 h-4" />
                <span>Test</span>
                {testResults[platform] === 'success' && <CheckCircle className="w-4 h-4 text-green-600" />}
                {testResults[platform] === 'error' && <AlertCircle className="w-4 h-4 text-red-600" />}
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderIntegrationsSettings = () => (
    <div className="space-y-6">
      {renderIntegrationCard('facebook', <Facebook className="w-6 h-6 text-blue-600" />, 'Facebook Messenger')}
      {renderIntegrationCard('instagram', <Instagram className="w-6 h-6 text-pink-600" />, 'Instagram Direct')}
      {renderIntegrationCard('whatsapp', <MessageCircle className="w-6 h-6 text-green-600" />, 'WhatsApp Business')}
      {renderIntegrationCard('sms', <Phone className="w-6 h-6 text-purple-600" />, 'SMS/Text Messages')}
      
      <div className="border border-gray-200 rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Mail className="w-6 h-6 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">Email Integration</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">SMTP Host</label>
            <input
              type="text"
              value={settings.integrations.email.host}
              onChange={(e) => setSettings({
                ...settings,
                integrations: {
                  ...settings.integrations,
                  email: { ...settings.integrations.email, host: e.target.value }
                }
              })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Port</label>
            <input
              type="number"
              value={settings.integrations.email.port}
              onChange={(e) => setSettings({
                ...settings,
                integrations: {
                  ...settings.integrations,
                  email: { ...settings.integrations.email, port: parseInt(e.target.value) }
                }
              })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderPayrollSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
          <select
            value={settings.payroll.currency}
            onChange={(e) => setSettings({
              ...settings,
              payroll: { ...settings.payroll, currency: e.target.value }
            })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="RON">RON - Romanian Leu</option>
            <option value="USD">USD - US Dollar</option>
            <option value="EUR">EUR - Euro</option>
            <option value="GBP">GBP - British Pound</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Pay Period</label>
          <select
            value={settings.payroll.payPeriod}
            onChange={(e) => setSettings({
              ...settings,
              payroll: { ...settings.payroll, payPeriod: e.target.value }
            })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="weekly">Weekly</option>
            <option value="bi-weekly">Bi-weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tax Rate (%)</label>
          <input
            type="number"
            min="0"
            max="100"
            value={settings.payroll.taxRate}
            onChange={(e) => setSettings({
              ...settings,
              payroll: { ...settings.payroll, taxRate: parseInt(e.target.value) }
            })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Overtime Rate</label>
          <input
            type="number"
            min="1"
            step="0.1"
            value={settings.payroll.overtimeRate}
            onChange={(e) => setSettings({
              ...settings,
              payroll: { ...settings.payroll, overtimeRate: parseFloat(e.target.value) }
            })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
          <div>
            <h4 className="font-medium text-gray-900">Auto Calculate</h4>
            <p className="text-sm text-gray-600">Automatically calculate payroll based on time entries</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.payroll.autoCalculate}
              onChange={(e) => setSettings({
                ...settings,
                payroll: { ...settings.payroll, autoCalculate: e.target.checked }
              })}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
          <div>
            <h4 className="font-medium text-gray-900">Approval Required</h4>
            <p className="text-sm text-gray-600">Require manager approval before processing payroll</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.payroll.approvalRequired}
              onChange={(e) => setSettings({
                ...settings,
                payroll: { ...settings.payroll, approvalRequired: e.target.checked }
              })}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
          </label>
        </div>
      </div>
    </div>
  );

  const renderRolesSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Default Role</label>
          <select
            value={settings.roles.defaultRole}
            onChange={(e) => setSettings({
              ...settings,
              roles: { ...settings.roles, defaultRole: e.target.value }
            })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="intern">Intern</option>
            <option value="call_center">Call Center Agent</option>
            <option value="team_leader">Team Leader</option>
            <option value="hr">HR</option>
            <option value="manager">Manager</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Auto Assignment</label>
          <select
            value={settings.roles.autoAssignment}
            onChange={(e) => setSettings({
              ...settings,
              roles: { ...settings.roles, autoAssignment: e.target.value }
            })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="round_robin">Round Robin</option>
            <option value="manual">Manual Assignment</option>
            <option value="skill_based">Skill Based</option>
          </select>
        </div>
      </div>

      <div>
        <h4 className="font-medium text-gray-900 mb-4">Role Permissions</h4>
        <div className="space-y-4">
          {Object.entries(settings.roles.permissions).map(([role, permissions]) => (
            <div key={role} className="border border-gray-200 rounded-lg p-4">
              <h5 className="font-medium text-gray-900 capitalize mb-2">{role.replace('_', ' ')}</h5>
              <div className="flex flex-wrap gap-2">
                {permissions.map((permission, index) => (
                  <span key={index} className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">
                    {permission === 'all' ? 'All Permissions' : permission.replace('_', ' ')}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(settings.notifications).map(([key, value]) => (
          <label key={key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <div className="font-medium text-gray-900 capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </div>
              <div className="text-sm text-gray-500">
                {key === 'emailNotifications' && 'Receive notifications via email'}
                {key === 'pushNotifications' && 'Browser push notifications'}
                {key === 'smsNotifications' && 'SMS notifications for urgent alerts'}
                {key === 'callAlerts' && 'Alerts for incoming calls'}
                {key === 'messageAlerts' && 'New message notifications'}
                {key === 'systemAlerts' && 'System maintenance and updates'}
                {key === 'escalationAlerts' && 'Escalation notifications'}
                {key === 'performanceAlerts' && 'Performance threshold alerts'}
              </div>
            </div>
            <input
              type="checkbox"
              checked={value}
              onChange={(e) => setSettings({
                ...settings,
                notifications: { ...settings.notifications, [key]: e.target.checked }
              })}
              className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
            />
          </label>
        ))}
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
          <input
            type="number"
            min="5"
            max="480"
            value={settings.security.sessionTimeout}
            onChange={(e) => setSettings({
              ...settings,
              security: { ...settings.security, sessionTimeout: parseInt(e.target.value) }
            })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Password Policy</label>
          <select
            value={settings.security.passwordPolicy}
            onChange={(e) => setSettings({
              ...settings,
              security: { ...settings.security, passwordPolicy: e.target.value }
            })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="low">Low (6+ characters)</option>
            <option value="medium">Medium (8+ chars, mixed case)</option>
            <option value="high">High (12+ chars, symbols)</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">IP Whitelist</label>
        <textarea
          value={settings.security.ipWhitelist}
          onChange={(e) => setSettings({
            ...settings,
            security: { ...settings.security, ipWhitelist: e.target.value }
          })}
          rows={3}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="Enter IP addresses, one per line"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(settings.security).filter(([key, value]) => typeof value === 'boolean').map(([key, value]) => (
          <label key={key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <div className="font-medium text-gray-900 capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </div>
              <div className="text-sm text-gray-500">
                {key === 'twoFactorAuth' && 'Require 2FA for all users'}
                {key === 'auditLog' && 'Track all user actions'}
                {key === 'encryptionEnabled' && 'Encrypt sensitive data'}
              </div>
            </div>
            <input
              type="checkbox"
              checked={value as boolean}
              onChange={(e) => setSettings({
                ...settings,
                security: { ...settings.security, [key]: e.target.checked }
              })}
              className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
            />
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-1">Manage your platform configuration and integrations</p>
        </div>
        <button
          onClick={handleSave}
          className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 flex items-center space-x-2"
        >
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Settings Navigation */}
        <div className="lg:w-64">
          <nav className="space-y-1">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center px-3 py-2 text-left rounded-lg transition-colors duration-200 ${
                    activeSection === section.id
                      ? 'bg-gradient-to-r from-purple-50 to-blue-50 text-purple-700 border border-purple-200'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-purple-600'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {section.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Settings Content */}
        <div className="flex-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            {activeSection === 'general' && renderGeneralSettings()}
            {activeSection === 'integrations' && renderIntegrationsSettings()}
            {activeSection === 'payroll' && renderPayrollSettings()}
            {activeSection === 'roles' && renderRolesSettings()}
            {activeSection === 'notifications' && renderNotificationSettings()}
            {activeSection === 'security' && renderSecuritySettings()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
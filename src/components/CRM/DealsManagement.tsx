import React, { useState } from 'react';
import { 
  Target, 
  Plus, 
  Search, 
  Filter, 
  DollarSign,
  Calendar,
  User,
  Building,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface Deal {
  id: string;
  title: string;
  client: string;
  company: string;
  value: number;
  stage: 'lead' | 'qualified' | 'proposal' | 'negotiation' | 'closed_won' | 'closed_lost';
  probability: number;
  expectedCloseDate: string;
  assignedTo: string;
  createdAt: string;
  lastActivity: string;
  notes: string;
}

const DealsManagement: React.FC = () => {
  const [deals] = useState<Deal[]>([
    {
      id: '1',
      title: 'Enterprise Software License',
      client: 'John Smith',
      company: 'TechCorp Solutions',
      value: 125000,
      stage: 'negotiation',
      probability: 80,
      expectedCloseDate: '2024-02-15',
      assignedTo: 'Sarah Manager',
      createdAt: '2024-01-01',
      lastActivity: '2024-01-15T10:30:00Z',
      notes: 'Client is very interested, waiting for final approval from board'
    },
    {
      id: '2',
      title: 'Cloud Migration Services',
      client: 'Maria Garcia',
      company: 'Global Industries',
      value: 75000,
      stage: 'proposal',
      probability: 60,
      expectedCloseDate: '2024-02-28',
      assignedTo: 'Mike Leader',
      createdAt: '2024-01-05',
      lastActivity: '2024-01-14T14:20:00Z',
      notes: 'Proposal submitted, awaiting feedback'
    },
    {
      id: '3',
      title: 'Custom Development Project',
      client: 'Robert Lee',
      company: 'Innovation Labs',
      value: 200000,
      stage: 'qualified',
      probability: 40,
      expectedCloseDate: '2024-03-15',
      assignedTo: 'Alex Agent',
      createdAt: '2024-01-10',
      lastActivity: '2024-01-13T09:15:00Z',
      notes: 'Requirements gathering in progress'
    },
    {
      id: '4',
      title: 'Support Contract Renewal',
      client: 'Lisa Chen',
      company: 'StartupXYZ',
      value: 25000,
      stage: 'closed_won',
      probability: 100,
      expectedCloseDate: '2024-01-20',
      assignedTo: 'Sarah Manager',
      createdAt: '2023-12-15',
      lastActivity: '2024-01-12T16:45:00Z',
      notes: 'Contract signed and executed'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [stageFilter, setStageFilter] = useState('all');
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'lead': return 'bg-gray-100 text-gray-800';
      case 'qualified': return 'bg-blue-100 text-blue-800';
      case 'proposal': return 'bg-yellow-100 text-yellow-800';
      case 'negotiation': return 'bg-orange-100 text-orange-800';
      case 'closed_won': return 'bg-green-100 text-green-800';
      case 'closed_lost': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStageIcon = (stage: string) => {
    switch (stage) {
      case 'closed_won': return <CheckCircle className="w-4 h-4" />;
      case 'closed_lost': return <AlertCircle className="w-4 h-4" />;
      case 'negotiation': return <TrendingUp className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const filteredDeals = deals.filter(deal => {
    const matchesSearch = deal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         deal.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         deal.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStage = stageFilter === 'all' || deal.stage === stageFilter;
    return matchesSearch && matchesStage;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const totalPipelineValue = deals.reduce((sum, deal) => sum + deal.value, 0);
  const weightedPipelineValue = deals.reduce((sum, deal) => sum + (deal.value * deal.probability / 100), 0);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Deals</h1>
          <p className="text-gray-600 mt-1">Manage your sales pipeline and opportunities</p>
        </div>
        <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Add Deal</span>
        </button>
      </div>

      {/* Pipeline Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Pipeline</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{formatCurrency(totalPipelineValue)}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Target className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Weighted Pipeline</p>
              <p className="text-2xl font-bold text-green-600 mt-2">{formatCurrency(weightedPipelineValue)}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Deals</p>
              <p className="text-2xl font-bold text-blue-600 mt-2">{deals.filter(d => !['closed_won', 'closed_lost'].includes(d.stage)).length}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search deals..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <select
              value={stageFilter}
              onChange={(e) => setStageFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
            >
              <option value="all">All Stages</option>
              <option value="lead">Lead</option>
              <option value="qualified">Qualified</option>
              <option value="proposal">Proposal</option>
              <option value="negotiation">Negotiation</option>
              <option value="closed_won">Closed Won</option>
              <option value="closed_lost">Closed Lost</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Total Deals:</span>
            <span className="font-semibold text-purple-600">{filteredDeals.length}</span>
          </div>
        </div>
      </div>

      {/* Deals List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Sales Pipeline</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {filteredDeals.map((deal) => (
              <div key={deal.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{deal.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStageColor(deal.stage)}`}>
                        {getStageIcon(deal.stage)}
                        <span className="capitalize">{deal.stage.replace('_', ' ')}</span>
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Building className="w-4 h-4" />
                        <span>{deal.company}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span>{deal.client}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>Close: {formatDate(deal.expectedCloseDate)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">{formatCurrency(deal.value)}</div>
                    <div className="text-sm text-gray-600">{deal.probability}% probability</div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                    <span>Progress</span>
                    <span>{deal.probability}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${deal.probability}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    <span>Assigned to: {deal.assignedTo}</span>
                    <span className="mx-2">•</span>
                    <span>Last activity: {formatDate(deal.lastActivity)}</span>
                  </div>
                  <button
                    onClick={() => setSelectedDeal(deal)}
                    className="bg-purple-100 text-purple-700 px-3 py-1 rounded-lg hover:bg-purple-200 transition-colors text-sm"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Deal Details Modal */}
      {selectedDeal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{selectedDeal.title}</h2>
                  <p className="text-purple-600">{selectedDeal.company}</p>
                </div>
                <button
                  onClick={() => setSelectedDeal(null)}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  ×
                </button>
              </div>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[70vh]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Deal Information</h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-gray-600">Value:</span>
                      <span className="ml-2 font-bold text-green-600">{formatCurrency(selectedDeal.value)}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Stage:</span>
                      <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getStageColor(selectedDeal.stage)}`}>
                        {selectedDeal.stage.replace('_', ' ')}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Probability:</span>
                      <span className="ml-2 font-medium">{selectedDeal.probability}%</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Expected Close:</span>
                      <span className="ml-2 font-medium">{formatDate(selectedDeal.expectedCloseDate)}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Contact Information</h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-gray-600">Client:</span>
                      <span className="ml-2 font-medium">{selectedDeal.client}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Company:</span>
                      <span className="ml-2 font-medium">{selectedDeal.company}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Assigned to:</span>
                      <span className="ml-2 font-medium">{selectedDeal.assignedTo}</span>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <h3 className="font-semibold text-gray-900 mb-3">Notes</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-700">{selectedDeal.notes}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200">
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setSelectedDeal(null)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Close
                </button>
                <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200">
                  Edit Deal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DealsManagement;
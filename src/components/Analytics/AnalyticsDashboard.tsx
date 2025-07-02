import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Phone, 
  Clock, 
  Target,
  Award,
  Calendar
} from 'lucide-react';
import { KPI } from '../../types';

const AnalyticsDashboard: React.FC = () => {
  const kpis: KPI[] = [
    { id: '1', name: 'Total Calls', value: 1247, target: 1200, trend: 'up', period: 'monthly' },
    { id: '2', name: 'Avg Call Duration', value: 4.2, target: 4.0, trend: 'up', period: 'monthly' },
    { id: '3', name: 'Customer Satisfaction', value: 94, target: 90, trend: 'up', period: 'monthly' },
    { id: '4', name: 'First Call Resolution', value: 87, target: 85, trend: 'up', period: 'monthly' },
    { id: '5', name: 'Agent Productivity', value: 92, target: 90, trend: 'stable', period: 'weekly' },
    { id: '6', name: 'Response Time', value: 1.8, target: 2.0, trend: 'down', period: 'daily' },
  ];

  const callVolumeData = [
    { day: 'Mon', calls: 85, duration: 4.2 },
    { day: 'Tue', calls: 92, duration: 3.8 },
    { day: 'Wed', calls: 78, duration: 4.5 },
    { day: 'Thu', calls: 96, duration: 4.1 },
    { day: 'Fri', calls: 103, duration: 3.9 },
    { day: 'Sat', calls: 67, duration: 4.8 },
    { day: 'Sun', calls: 54, duration: 5.2 },
  ];

  const topAgents = [
    { name: 'Alex Agent', calls: 87, rating: 4.9, efficiency: 96 },
    { name: 'Maria Rodriguez', calls: 82, rating: 4.8, efficiency: 94 },
    { name: 'John Smith', calls: 79, rating: 4.7, efficiency: 92 },
    { name: 'Sarah Johnson', calls: 76, rating: 4.6, efficiency: 90 },
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-600" />;
      default:
        return <div className="w-4 h-4 bg-gray-400 rounded-full" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up':
        return 'text-green-600';
      case 'down':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics & KPIs</h1>
          <p className="text-gray-600 mt-1">Monitor performance and track key metrics</p>
        </div>
        <div className="flex items-center space-x-3">
          <select className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent">
            <option>Last 30 days</option>
            <option>Last 7 days</option>
            <option>Last 90 days</option>
          </select>
          <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200">
            Export Report
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {kpis.map((kpi) => (
          <div key={kpi.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">{kpi.name}</h3>
              {getTrendIcon(kpi.trend)}
            </div>
            <div className="flex items-end justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {typeof kpi.value === 'number' && kpi.value < 10 ? 
                    `${kpi.value.toFixed(1)}${kpi.name.includes('Duration') ? 'min' : kpi.name.includes('Time') ? 'min' : ''}` :
                    kpi.value.toLocaleString()
                  }
                  {kpi.name.includes('Satisfaction') || kpi.name.includes('Resolution') || kpi.name.includes('Productivity') ? '%' : ''}
                </div>
                <div className={`text-sm ${getTrendColor(kpi.trend)}`}>
                  Target: {kpi.target.toLocaleString()}
                  {kpi.name.includes('Satisfaction') || kpi.name.includes('Resolution') || kpi.name.includes('Productivity') ? '%' : ''}
                </div>
              </div>
              <div className="text-right">
                <div className={`text-sm font-medium ${getTrendColor(kpi.trend)}`}>
                  {((kpi.value / kpi.target - 1) * 100).toFixed(1)}%
                </div>
                <div className="text-xs text-gray-500 capitalize">{kpi.period}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Call Volume Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Weekly Call Volume</h3>
            <Calendar className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {callVolumeData.map((day, index) => (
              <div key={day.day} className="flex items-center">
                <div className="w-12 text-sm font-medium text-gray-600">{day.day}</div>
                <div className="flex-1 mx-4">
                  <div className="bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(day.calls / 120) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="w-12 text-sm font-medium text-gray-900">{day.calls}</div>
                <div className="w-16 text-sm text-gray-600 text-right">{day.duration}min</div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Agents */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Top Performing Agents</h3>
            <Award className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {topAgents.map((agent, index) => (
              <div key={agent.name} className="flex items-center space-x-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  index === 0 ? 'bg-yellow-100 text-yellow-800' :
                  index === 1 ? 'bg-gray-100 text-gray-800' :
                  index === 2 ? 'bg-orange-100 text-orange-800' :
                  'bg-purple-100 text-purple-800'
                }`}>
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{agent.name}</div>
                  <div className="text-sm text-gray-600">{agent.calls} calls • ★ {agent.rating}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">{agent.efficiency}%</div>
                  <div className="text-xs text-gray-500">Efficiency</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Performance Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Phone className="w-6 h-6 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">1,247</div>
            <div className="text-sm text-gray-600">Total Calls</div>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">4.2m</div>
            <div className="text-sm text-gray-600">Avg Duration</div>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Target className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">94%</div>
            <div className="text-sm text-gray-600">Satisfaction</div>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Users className="w-6 h-6 text-orange-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">248</div>
            <div className="text-sm text-gray-600">Active Agents</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
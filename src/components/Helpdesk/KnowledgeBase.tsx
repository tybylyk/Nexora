import React, { useState } from 'react';
import { 
  BookOpen, 
  Plus, 
  Search, 
  Filter, 
  Eye,
  Edit3,
  Trash2,
  Tag,
  Calendar,
  User,
  ThumbsUp,
  ThumbsDown,
  Star,
  FileText,
  Video,
  Image,
  Link
} from 'lucide-react';

interface Article {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  author: string;
  createdAt: string;
  updatedAt: string;
  views: number;
  likes: number;
  dislikes: number;
  rating: number;
  status: 'draft' | 'published' | 'archived';
  type: 'article' | 'video' | 'faq' | 'tutorial';
}

const KnowledgeBase: React.FC = () => {
  const [articles] = useState<Article[]>([
    {
      id: '1',
      title: 'How to Reset Your Password',
      content: 'Step-by-step guide to reset your account password...',
      category: 'Account Management',
      tags: ['password', 'security', 'account'],
      author: 'Sarah Support',
      createdAt: '2024-01-15T10:30:00Z',
      updatedAt: '2024-01-15T14:20:00Z',
      views: 1250,
      likes: 45,
      dislikes: 2,
      rating: 4.8,
      status: 'published',
      type: 'article'
    },
    {
      id: '2',
      title: 'Getting Started with Our Platform',
      content: 'Complete tutorial for new users to get started...',
      category: 'Getting Started',
      tags: ['tutorial', 'beginner', 'setup'],
      author: 'Mike Helper',
      createdAt: '2024-01-14T09:15:00Z',
      updatedAt: '2024-01-14T16:30:00Z',
      views: 2100,
      likes: 78,
      dislikes: 5,
      rating: 4.6,
      status: 'published',
      type: 'tutorial'
    },
    {
      id: '3',
      title: 'Troubleshooting Common Issues',
      content: 'Solutions to frequently encountered problems...',
      category: 'Troubleshooting',
      tags: ['troubleshooting', 'issues', 'solutions'],
      author: 'Alex Agent',
      createdAt: '2024-01-13T14:45:00Z',
      updatedAt: '2024-01-13T18:20:00Z',
      views: 890,
      likes: 32,
      dislikes: 1,
      rating: 4.9,
      status: 'published',
      type: 'faq'
    },
    {
      id: '4',
      title: 'API Integration Guide',
      content: 'Comprehensive guide for API integration...',
      category: 'Development',
      tags: ['api', 'integration', 'development'],
      author: 'Lisa Tech',
      createdAt: '2024-01-12T11:20:00Z',
      updatedAt: '2024-01-12T15:45:00Z',
      views: 567,
      likes: 23,
      dislikes: 0,
      rating: 5.0,
      status: 'draft',
      type: 'article'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="w-4 h-4" />;
      case 'tutorial': return <BookOpen className="w-4 h-4" />;
      case 'faq': return <FileText className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'video': return 'bg-red-100 text-red-800';
      case 'tutorial': return 'bg-blue-100 text-blue-800';
      case 'faq': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = categoryFilter === 'all' || article.category === categoryFilter;
    const matchesType = typeFilter === 'all' || article.type === typeFilter;
    return matchesSearch && matchesCategory && matchesType;
  });

  const categories = Array.from(new Set(articles.map(article => article.category)));

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Knowledge Base</h1>
          <p className="text-gray-600 mt-1">Manage help articles and documentation</p>
        </div>
        <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Create Article</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div className="relative">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
            >
              <option value="all">All Types</option>
              <option value="article">Article</option>
              <option value="tutorial">Tutorial</option>
              <option value="faq">FAQ</option>
              <option value="video">Video</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Total Articles:</span>
            <span className="font-semibold text-purple-600">{filteredArticles.length}</span>
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredArticles.map((article) => (
          <div key={article.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getTypeColor(article.type)}`}>
                  {getTypeIcon(article.type)}
                  <span className="capitalize">{article.type}</span>
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(article.status)}`}>
                  {article.status}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <button className="p-1 text-gray-400 hover:text-purple-600 transition-colors">
                  <Edit3 className="w-4 h-4" />
                </button>
                <button className="p-1 text-gray-400 hover:text-red-600 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{article.title}</h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">{article.content}</p>

            <div className="mb-4">
              <span className="text-xs font-medium text-purple-600">{article.category}</span>
            </div>

            <div className="flex flex-wrap gap-1 mb-4">
              {article.tags.slice(0, 3).map((tag, index) => (
                <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                  {tag}
                </span>
              ))}
              {article.tags.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                  +{article.tags.length - 3} more
                </span>
              )}
            </div>

            <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
              <div className="flex items-center space-x-1">
                <User className="w-4 h-4" />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Eye className="w-4 h-4" />
                <span>{article.views}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1">
                  <ThumbsUp className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-600">{article.likes}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <ThumbsDown className="w-4 h-4 text-red-600" />
                  <span className="text-sm text-gray-600">{article.dislikes}</span>
                </div>
                <div className="flex space-x-1">
                  {renderStars(article.rating)}
                </div>
              </div>
              <button
                onClick={() => setSelectedArticle(article)}
                className="bg-purple-100 text-purple-700 px-3 py-1 rounded-lg hover:bg-purple-200 transition-colors text-sm"
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Article Details Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getTypeColor(selectedArticle.type)}`}>
                      {getTypeIcon(selectedArticle.type)}
                      <span className="capitalize">{selectedArticle.type}</span>
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedArticle.status)}`}>
                      {selectedArticle.status}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">{selectedArticle.title}</h2>
                  <p className="text-purple-600">{selectedArticle.category}</p>
                </div>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  ×
                </button>
              </div>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[70vh]">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <h3 className="font-semibold text-gray-900 mb-3">Content</h3>
                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <p className="text-gray-700">{selectedArticle.content}</p>
                  </div>

                  <h3 className="font-semibold text-gray-900 mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedArticle.tags.map((tag, index) => (
                      <span key={index} className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Article Information</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="text-gray-600">Author:</span>
                      <div className="font-medium">{selectedArticle.author}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Created:</span>
                      <div className="font-medium">{formatDate(selectedArticle.createdAt)}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Last Updated:</span>
                      <div className="font-medium">{formatDate(selectedArticle.updatedAt)}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Views:</span>
                      <div className="font-medium">{selectedArticle.views.toLocaleString()}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Rating:</span>
                      <div className="flex items-center space-x-2">
                        <div className="flex space-x-1">
                          {renderStars(selectedArticle.rating)}
                        </div>
                        <span className="font-medium">{selectedArticle.rating}</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-600">Feedback:</span>
                      <div className="flex items-center space-x-3 mt-1">
                        <div className="flex items-center space-x-1">
                          <ThumbsUp className="w-4 h-4 text-green-600" />
                          <span className="font-medium">{selectedArticle.likes}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <ThumbsDown className="w-4 h-4 text-red-600" />
                          <span className="font-medium">{selectedArticle.dislikes}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200">
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Close
                </button>
                <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200">
                  Edit Article
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KnowledgeBase;
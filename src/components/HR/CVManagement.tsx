import React, { useState } from 'react';
import { 
  Upload, 
  FileText, 
  Download, 
  Eye, 
  Trash2, 
  Search, 
  Filter,
  Star,
  User,
  Calendar,
  CheckCircle,
  XCircle,
  AlertCircle,
  Zap
} from 'lucide-react';
import { CVDocument, Candidate } from '../../types';

const CVManagement: React.FC = () => {
  const [cvDocuments, setCvDocuments] = useState<CVDocument[]>([
    {
      id: '1',
      candidateId: '1',
      fileName: 'john_smith_cv.pdf',
      fileSize: 245760,
      uploadDate: '2024-01-15T10:00:00Z',
      extractedText: 'Senior Frontend Developer with 5+ years experience...',
      skills: ['React', 'TypeScript', 'Node.js', 'AWS'],
      experience: ['Frontend Developer at TechCorp (2019-2024)', 'Junior Developer at StartupXYZ (2018-2019)'],
      education: ['BS Computer Science - MIT (2018)'],
      languages: ['English (Native)', 'Spanish (Fluent)']
    },
    {
      id: '2',
      candidateId: '2',
      fileName: 'sarah_johnson_resume.pdf',
      fileSize: 189440,
      uploadDate: '2024-01-14T14:30:00Z',
      extractedText: 'Full-stack developer with expertise in modern web technologies...',
      skills: ['Python', 'Django', 'React', 'PostgreSQL', 'Docker'],
      experience: ['Senior Developer at WebSolutions (2020-2024)', 'Developer at DataCorp (2018-2020)'],
      education: ['MS Software Engineering - Stanford (2018)', 'BS Computer Science - UC Berkeley (2016)'],
      languages: ['English (Native)', 'French (Intermediate)']
    }
  ]);

  const [candidates] = useState<Candidate[]>([
    {
      id: '1',
      name: 'John Smith',
      email: 'john.smith@email.com',
      phone: '+1 (555) 123-4567',
      position: 'Frontend Developer',
      status: 'interview',
      score: 85,
      notes: 'Strong technical skills, good communication',
      interviewDate: '2024-01-15T10:00:00Z',
      createdAt: '2024-01-10T08:00:00Z',
      assignedTo: 'hr@crm.com',
      cvUrl: '/cv/john-smith.pdf'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      phone: '+1 (555) 987-6543',
      position: 'Backend Developer',
      status: 'technical',
      score: 92,
      notes: 'Excellent coding skills, team player',
      interviewDate: '2024-01-16T14:00:00Z',
      createdAt: '2024-01-12T09:30:00Z',
      assignedTo: 'hr@crm.com'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [skillFilter, setSkillFilter] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedCV, setSelectedCV] = useState<CVDocument | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getCandidateInfo = (candidateId: string) => {
    return candidates.find(c => c.id === candidateId);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'interview': return 'bg-purple-100 text-purple-800';
      case 'technical': return 'bg-orange-100 text-orange-800';
      case 'hired': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'hired': return <CheckCircle className="w-3 h-3" />;
      case 'rejected': return <XCircle className="w-3 h-3" />;
      case 'interview':
      case 'technical': return <AlertCircle className="w-3 h-3" />;
      default: return null;
    }
  };

  const filteredCVs = cvDocuments.filter(cv => {
    const candidate = getCandidateInfo(cv.candidateId);
    const matchesSearch = cv.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate?.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSkill = !skillFilter || cv.skills?.some(skill => 
      skill.toLowerCase().includes(skillFilter.toLowerCase())
    );
    return matchesSearch && matchesSkill;
  });

  const allSkills = Array.from(new Set(cvDocuments.flatMap(cv => cv.skills || [])));

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return;
    
    Array.from(files).forEach(file => {
      if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
        // Simulate CV processing
        const newCV: CVDocument = {
          id: Date.now().toString(),
          candidateId: 'new-candidate',
          fileName: file.name,
          fileSize: file.size,
          uploadDate: new Date().toISOString(),
          extractedText: 'Processing...',
          skills: [],
          experience: [],
          education: [],
          languages: []
        };
        setCvDocuments(prev => [newCV, ...prev]);
      }
    });
    setShowUploadModal(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFileUpload(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const deleteCV = (cvId: string) => {
    setCvDocuments(prev => prev.filter(cv => cv.id !== cvId));
  };

  const parseCV = (cvId: string) => {
    // Simulate AI parsing
    setCvDocuments(prev => prev.map(cv => 
      cv.id === cvId 
        ? {
            ...cv,
            extractedText: 'Experienced software developer with strong background in web technologies...',
            skills: ['React', 'TypeScript', 'Python', 'AWS', 'Docker'],
            experience: ['Senior Developer at TechCorp (2020-2024)', 'Developer at StartupXYZ (2018-2020)'],
            education: ['BS Computer Science - University (2018)'],
            languages: ['English (Native)', 'Spanish (Intermediate)']
          }
        : cv
    ));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">CV Management</h1>
          <p className="text-gray-600 mt-1">Manage candidate resumes and extract insights</p>
        </div>
        <button 
          onClick={() => setShowUploadModal(true)}
          className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 flex items-center space-x-2"
        >
          <Upload className="w-4 h-4" />
          <span>Upload CV</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search CVs, candidates, positions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <select
              value={skillFilter}
              onChange={(e) => setSkillFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
            >
              <option value="">All Skills</option>
              {allSkills.map(skill => (
                <option key={skill} value={skill}>{skill}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Total CVs:</span>
            <span className="font-semibold text-purple-600">{cvDocuments.length}</span>
          </div>
        </div>
      </div>

      {/* CV Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredCVs.map((cv) => {
          const candidate = getCandidateInfo(cv.candidateId);
          return (
            <div key={cv.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 truncate">{cv.fileName}</h3>
                    <p className="text-sm text-gray-500">{formatFileSize(cv.fileSize)}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => setSelectedCV(cv)}
                    className="p-1 text-gray-400 hover:text-purple-600 transition-colors"
                    title="View CV"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => parseCV(cv.id)}
                    className="p-1 text-gray-400 hover:text-orange-600 transition-colors"
                    title="Parse with AI"
                  >
                    <Zap className="w-4 h-4" />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors" title="Download">
                    <Download className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteCV(cv.id)}
                    className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {candidate && (
                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-gray-600" />
                      <span className="font-medium text-gray-900">{candidate.name}</span>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(candidate.status)}`}>
                      {getStatusIcon(candidate.status)}
                      <span className="capitalize">{candidate.status}</span>
                    </div>
                  </div>
                  <p className="text-sm text-purple-600 font-medium">{candidate.position}</p>
                  <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                    <span>Score: {candidate.score}/100</span>
                    <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-3 h-3 ${
                            star * 20 <= candidate.score
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-1">Skills</h4>
                  <div className="flex flex-wrap gap-1">
                    {cv.skills?.slice(0, 4).map((skill, index) => (
                      <span key={index} className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                        {skill}
                      </span>
                    ))}
                    {cv.skills && cv.skills.length > 4 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        +{cv.skills.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-1">Latest Experience</h4>
                  <p className="text-xs text-gray-600 line-clamp-2">
                    {cv.experience?.[0] || 'No experience data'}
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>Uploaded {formatDate(cv.uploadDate)}</span>
                  </div>
                  {cv.extractedText === 'Processing...' && (
                    <span className="text-orange-600 font-medium">Processing...</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredCVs.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No CVs found</h3>
          <p className="text-gray-600">Try adjusting your search or upload new CVs</p>
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload CV</h3>
              
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragOver ? 'border-purple-500 bg-purple-50' : 'border-gray-300'
                }`}
              >
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">Drag and drop CV files here</p>
                <p className="text-sm text-gray-500 mb-4">or</p>
                <input
                  type="file"
                  multiple
                  accept=".pdf"
                  onChange={(e) => handleFileUpload(e.target.files)}
                  className="hidden"
                  id="cv-upload"
                />
                <label
                  htmlFor="cv-upload"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 cursor-pointer inline-block"
                >
                  Choose Files
                </label>
                <p className="text-xs text-gray-500 mt-2">PDF files only, max 10MB each</p>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CV Viewer Modal */}
      {selectedCV && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">{selectedCV.fileName}</h3>
                <button
                  onClick={() => setSelectedCV(null)}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[70vh]">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Extracted Text</h4>
                  <div className="bg-gray-50 rounded-lg p-4 max-h-64 overflow-y-auto">
                    <p className="text-sm text-gray-700">{selectedCV.extractedText}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCV.skills?.map((skill, index) => (
                        <span key={index} className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Experience</h4>
                    <ul className="space-y-1">
                      {selectedCV.experience?.map((exp, index) => (
                        <li key={index} className="text-sm text-gray-700">• {exp}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Education</h4>
                    <ul className="space-y-1">
                      {selectedCV.education?.map((edu, index) => (
                        <li key={index} className="text-sm text-gray-700">• {edu}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Languages</h4>
                    <ul className="space-y-1">
                      {selectedCV.languages?.map((lang, index) => (
                        <li key={index} className="text-sm text-gray-700">• {lang}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CVManagement;
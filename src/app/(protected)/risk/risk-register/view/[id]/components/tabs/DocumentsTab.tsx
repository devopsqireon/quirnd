// File: /app/risk/risk-register/view/[id]/components/tabs/DocumentsTab.tsx

'use client'

import React, { useState } from 'react';
import { 
    FileText, 
    Download, 
    Eye, 
    Trash2, 
    Upload, 
    Plus,
    Search,
    Filter,
    Calendar,
    User,
    File,
    Image,
    FileSpreadsheet,
    FileVideo,
    Archive
} from 'lucide-react';
import { Risk, RiskDocument } from '../../types';

// Add the missing FilePdf component - this was causing an error
const FilePdf = ({ className }: { className: string }) => (
    <FileText className={className} />
);

interface DocumentsTabProps {
    risk: Risk;
    onUploadDocument: (document: Omit<RiskDocument, 'id'>) => void;
    onDeleteDocument: (documentId: string) => void;
}

export const DocumentsTab: React.FC<DocumentsTabProps> = ({ 
    risk, 
    onUploadDocument, 
    onDeleteDocument 
}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [typeFilter, setTypeFilter] = useState<string>('all');
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [selectedDocument, setSelectedDocument] = useState<string | null>(null);

    const getFileIcon = (type: string) => {
        switch (type.toLowerCase()) {
            case 'pdf': return <FilePdf className="w-5 h-5 text-red-500" />;
            case 'doc':
            case 'docx': return <FileText className="w-5 h-5 text-blue-500" />;
            case 'xls':
            case 'xlsx': return <FileSpreadsheet className="w-5 h-5 text-green-500" />;
            case 'jpg':
            case 'jpeg':
            case 'png':
            case 'gif': return <Image className="w-5 h-5 text-purple-500" />;
            case 'mp4':
            case 'avi':
            case 'mov': return <FileVideo className="w-5 h-5 text-pink-500" />;
            case 'zip':
            case 'rar': return <Archive className="w-5 h-5 text-orange-500" />;
            default: return <File className="w-5 h-5 text-gray-500" />;
        }
    };

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const documentTypes = [
        { value: 'all', label: 'All Types' },
        { value: 'evidence', label: 'Evidence' },
        { value: 'policy', label: 'Policy' },
        { value: 'procedure', label: 'Procedure' },
        { value: 'assessment', label: 'Assessment' },
        { value: 'control', label: 'Control Documentation' },
        { value: 'incident', label: 'Incident Report' },
        { value: 'other', label: 'Other' }
    ];

    const sampleDocuments: RiskDocument[] = [
        {
            id: '1',
            name: 'Security Assessment Report Q1 2024',
            type: 'assessment',
            fileType: 'pdf',
            size: 2048576,
            uploadedBy: 'John Doe',
            uploadedAt: '2024-01-15T10:30:00Z',
            description: 'Comprehensive security assessment covering identified vulnerabilities and recommended controls',
            tags: ['security', 'assessment', 'quarterly'],
            url: '/documents/security-assessment-q1-2024.pdf'
        },
        {
            id: '2',
            name: 'Data Protection Policy v2.1',
            type: 'policy',
            fileType: 'docx',
            size: 512000,
            uploadedBy: 'Sarah Johnson',
            uploadedAt: '2024-01-20T14:45:00Z',
            description: 'Updated data protection policy including new compliance requirements',
            tags: ['policy', 'data-protection', 'compliance'],
            url: '/documents/data-protection-policy-v2.1.docx'
        },
        {
            id: '3',
            name: 'Incident Response Procedure',
            type: 'procedure',
            fileType: 'pdf',
            size: 1024000,
            uploadedBy: 'Mike Brown',
            uploadedAt: '2024-01-25T09:15:00Z',
            description: 'Step-by-step incident response procedures for security breaches',
            tags: ['procedure', 'incident-response', 'security'],
            url: '/documents/incident-response-procedure.pdf'
        },
        {
            id: '4',
            name: 'Network Architecture Diagram',
            type: 'evidence',
            fileType: 'png',
            size: 3072000,
            uploadedBy: 'Lisa Wilson',
            uploadedAt: '2024-02-01T11:20:00Z',
            description: 'Current network architecture showing security controls and access points',
            tags: ['diagram', 'architecture', 'network'],
            url: '/documents/network-architecture.png'
        },
        {
            id: '5',
            name: 'Control Testing Results',
            type: 'control',
            fileType: 'xlsx',
            size: 768000,
            uploadedBy: 'Tom Davis',
            uploadedAt: '2024-02-05T16:30:00Z',
            description: 'Results from quarterly control testing including effectiveness ratings',
            tags: ['controls', 'testing', 'effectiveness'],
            url: '/documents/control-testing-results.xlsx'
        }
    ];

    const filteredDocuments = sampleDocuments.filter(doc => {
        const matchesSearch = searchQuery === '' || 
            doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
        
        const matchesType = typeFilter === 'all' || doc.type === typeFilter;
        
        return matchesSearch && matchesType;
    });

    return (
        <div className="max-w-7xl mx-auto px-8 py-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-3 space-y-6">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900">Documents</h2>
                            <p className="text-slate-600">Supporting documents and evidence for this risk</p>
                        </div>
                        <button
                            onClick={() => setShowUploadModal(true)}
                            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            <Upload className="w-4 h-4 mr-2" />
                            Upload Document
                        </button>
                    </div>

                    {/* Search and Filter */}
                    <div className="bg-white rounded-lg border border-slate-200 p-4">
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex-1">
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Search className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Search documents by name, description, or tags..."
                                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="sm:w-48">
                                <select
                                    value={typeFilter}
                                    onChange={(e) => setTypeFilter(e.target.value)}
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    {documentTypes.map(type => (
                                        <option key={type.value} value={type.value}>
                                            {type.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Documents List */}
                    <div className="space-y-4">
                        {filteredDocuments.length > 0 ? (
                            filteredDocuments.map((document) => (
                                <div 
                                    key={document.id} 
                                    className={`bg-white rounded-lg border-2 p-6 cursor-pointer transition-all duration-200 hover:shadow-md ${
                                        selectedDocument === document.id 
                                            ? 'border-blue-300 shadow-md' 
                                            : 'border-slate-200'
                                    }`}
                                    onClick={() => setSelectedDocument(
                                        selectedDocument === document.id ? null : document.id
                                    )}
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-start gap-4 flex-1">
                                            <div className="flex-shrink-0">
                                                {getFileIcon(document.fileType)}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-lg font-semibold text-slate-900 mb-1">
                                                    {document.name}
                                                </h3>
                                                <p className="text-slate-600 mb-3">
                                                    {document.description}
                                                </p>
                                                
                                                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mb-3">
                                                    <div className="flex items-center gap-1">
                                                        <File className="w-4 h-4" />
                                                        {document.fileType.toUpperCase()}
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Archive className="w-4 h-4" />
                                                        {formatFileSize(document.size)}
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <User className="w-4 h-4" />
                                                        {document.uploadedBy}
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Calendar className="w-4 h-4" />
                                                        {formatDate(document.uploadedAt)}
                                                    </div>
                                                </div>

                                                {/* Tags */}
                                                {document.tags && document.tags.length > 0 && (
                                                    <div className="flex flex-wrap gap-2 mb-3">
                                                        {document.tags.map((tag, index) => (
                                                            <span 
                                                                key={index}
                                                                className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                                                            >
                                                                {tag}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}

                                                {/* Document Type Badge */}
                                                <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800 capitalize">
                                                    {document.type}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex items-center gap-2 ml-4">
                                            <button 
                                                className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    window.open(document.url, '_blank');
                                                }}
                                            >
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            <button 
                                                className="p-2 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-md"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    // Download logic here
                                                }}
                                            >
                                                <Download className="w-4 h-4" />
                                            </button>
                                            <button 
                                                className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onDeleteDocument(document.id);
                                                }}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Expanded Details */}
                                    {selectedDocument === document.id && (
                                        <div className="mt-6 pt-6 border-t border-slate-200">
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                <div>
                                                    <h4 className="font-semibold text-slate-900 mb-2">Document Details</h4>
                                                    <div className="space-y-2 text-sm">
                                                        <div>
                                                            <span className="text-slate-500">File Type:</span>
                                                            <span className="ml-2 text-slate-900">{document.fileType.toUpperCase()}</span>
                                                        </div>
                                                        <div>
                                                            <span className="text-slate-500">Size:</span>
                                                            <span className="ml-2 text-slate-900">{formatFileSize(document.size)}</span>
                                                        </div>
                                                        <div>
                                                            <span className="text-slate-500">Category:</span>
                                                            <span className="ml-2 text-slate-900 capitalize">{document.type}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-slate-900 mb-2">Upload Information</h4>
                                                    <div className="space-y-2 text-sm">
                                                        <div>
                                                            <span className="text-slate-500">Uploaded by:</span>
                                                            <span className="ml-2 text-slate-900">{document.uploadedBy}</span>
                                                        </div>
                                                        <div>
                                                            <span className="text-slate-500">Upload date:</span>
                                                            <span className="ml-2 text-slate-900">{formatDate(document.uploadedAt)}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-slate-900 mb-2">Quick Actions</h4>
                                                    <div className="space-y-2">
                                                        <button className="w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-md flex items-center gap-2">
                                                            <Eye className="w-4 h-4" />
                                                            Preview Document
                                                        </button>
                                                        <button className="w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-md flex items-center gap-2">
                                                            <Download className="w-4 h-4" />
                                                            Download
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-12 bg-white rounded-lg border border-slate-200">
                                <FileText className="w-12 h-12 mx-auto mb-4 text-slate-400" />
                                <h3 className="text-lg font-medium text-slate-900 mb-2">
                                    {searchQuery || typeFilter !== 'all' ? 'No documents found' : 'No Documents'}
                                </h3>
                                <p className="text-slate-600 mb-6">
                                    {searchQuery || typeFilter !== 'all' 
                                        ? 'Try adjusting your search or filter criteria'
                                        : 'Upload supporting documents and evidence for this risk'
                                    }
                                </p>
                                <button
                                    onClick={() => setShowUploadModal(true)}
                                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                                >
                                    <Upload className="w-4 h-4 mr-2" />
                                    Upload Document
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar - Rest of the component remains the same */}
                <div className="space-y-6">
                    {/* Documents Summary */}
                    <div className="bg-white rounded-lg border border-slate-200 p-4">
                        <h3 className="font-semibold text-slate-900 mb-4">Documents Summary</h3>
                        <div className="space-y-4">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-blue-600">
                                    {sampleDocuments.length}
                                </div>
                                <div className="text-sm text-slate-600">Total Documents</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-green-600">
                                    {formatFileSize(sampleDocuments.reduce((sum, doc) => sum + doc.size, 0))}
                                </div>
                                <div className="text-sm text-slate-600">Total Size</div>
                            </div>
                        </div>
                    </div>

                    {/* Document Types */}
                    <div className="bg-white rounded-lg border border-slate-200 p-4">
                        <h3 className="font-semibold text-slate-900 mb-4">Document Types</h3>
                        <div className="space-y-2">
                            {documentTypes.slice(1).map(type => {
                                const count = sampleDocuments.filter(doc => doc.type === type.value).length;
                                return (
                                    <div key={type.value} className="flex justify-between items-center">
                                        <span className="text-sm text-slate-600">{type.label}</span>
                                        <span className="text-sm font-medium text-slate-900">{count}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Recent Uploads */}
                    <div className="bg-white rounded-lg border border-slate-200 p-4">
                        <h3 className="font-semibold text-slate-900 mb-4">Recent Uploads</h3>
                        <div className="space-y-3">
                            {sampleDocuments
                                .sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime())
                                .slice(0, 3)
                                .map(doc => (
                                    <div key={doc.id} className="flex items-start gap-3">
                                        {getFileIcon(doc.fileType)}
                                        <div className="flex-1 min-w-0">
                                            <div className="text-sm font-medium text-slate-900 truncate">
                                                {doc.name}
                                            </div>
                                            <div className="text-xs text-slate-500">
                                                {formatDate(doc.uploadedAt)} • {doc.uploadedBy}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>

                    {/* File Types Distribution */}
                    <div className="bg-white rounded-lg border border-slate-200 p-4">
                        <h3 className="font-semibold text-slate-900 mb-4">File Types</h3>
                        <div className="space-y-2">
                            {['pdf', 'docx', 'xlsx', 'png', 'other'].map(fileType => {
                                const count = sampleDocuments.filter(doc => 
                                    fileType === 'other' 
                                        ? !['pdf', 'docx', 'xlsx', 'png'].includes(doc.fileType)
                                        : doc.fileType === fileType
                                ).length;
                                const percentage = sampleDocuments.length > 0 
                                    ? Math.round((count / sampleDocuments.length) * 100) 
                                    : 0;
                                
                                return (
                                    <div key={fileType}>
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-sm text-slate-600 uppercase">{fileType}</span>
                                            <span className="text-sm font-medium text-slate-900">{count}</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div 
                                                className="bg-blue-500 h-2 rounded-full" 
                                                style={{ width: `${percentage}%` }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white rounded-lg border border-slate-200 p-4">
                        <h3 className="font-semibold text-slate-900 mb-4">Quick Actions</h3>
                        <div className="space-y-2">
                            <button 
                                onClick={() => setShowUploadModal(true)}
                                className="w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-md flex items-center gap-2"
                            >
                                <Upload className="w-4 h-4" />
                                Upload Document
                            </button>
                            <button className="w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-md flex items-center gap-2">
                                <Download className="w-4 h-4" />
                                Download All
                            </button>
                            <button className="w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-md flex items-center gap-2">
                                <Archive className="w-4 h-4" />
                                Create Archive
                            </button>
                        </div>
                    </div>

                    {/* Storage Info */}
                    <div className="bg-white rounded-lg border border-slate-200 p-4">
                        <h3 className="font-semibold text-slate-900 mb-4">Storage Information</h3>
                        <div className="space-y-3">
                            <div>
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-sm text-slate-600">Used Storage</span>
                                    <span className="text-sm font-medium text-slate-900">
                                        {formatFileSize(sampleDocuments.reduce((sum, doc) => sum + doc.size, 0))}
                                    </span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '25%' }}></div>
                                </div>
                                <div className="text-xs text-slate-500 mt-1">25% of 50MB limit</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
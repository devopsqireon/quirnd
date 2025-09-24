// src/components/report-incident/evidence-upload.tsx
"use client";

import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CloudUpload, FolderOpen, FileText, Image, Check, X, TriangleAlert } from 'lucide-react';

interface EvidenceUploadProps {
  formData: any;
  updateFormData: (field: string, value: any) => void;
}

const mockUploadedFiles = [
  {
    id: '1',
    name: 'security_log_20240115.pdf',
    size: '2.3 MB',
    status: 'uploaded',
    type: 'pdf'
  },
  {
    id: '2',
    name: 'screenshot_error.png',
    size: '1.8 MB',
    status: 'uploading',
    progress: 75,
    type: 'image'
  }
];

export function EvidenceUpload({ formData, updateFormData }: EvidenceUploadProps) {
  const handleFileUpload = () => {
    // Handle file upload logic
    console.log('File upload triggered');
  };

  const removeFile = (fileId: string) => {
    // Handle file removal
    console.log('Removing file:', fileId);
  };

  return (
    <section className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
          <span className="text-blue-600 font-semibold text-sm">4</span>
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Evidence & Documentation</h2>
        <div className="flex-1 h-px bg-gray-200"></div>
      </div>
      
      <div className="space-y-6">
        <div 
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer"
          onClick={handleFileUpload}
        >
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
              <CloudUpload className="text-gray-400 h-8 w-8" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">Upload Evidence Files</h3>
              <p className="text-sm text-gray-500 mt-1">Drag and drop files here, or click to browse</p>
              <p className="text-xs text-gray-400 mt-2">
                Supports: PDF, DOC, PNG, JPG, TXT, LOG files (max 50MB each)
              </p>
            </div>
            <Button type="button" onClick={handleFileUpload}>
              <FolderOpen className="mr-2 h-4 w-4" />
              Choose Files
            </Button>
          </div>
        </div>
        
        <div className="space-y-3">
          {mockUploadedFiles.map((file) => (
            <div 
              key={file.id}
              className={`flex items-center justify-between p-4 rounded-lg border ${
                file.status === 'uploaded' 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-blue-50 border-blue-200'
              }`}
            >
              <div className="flex items-center space-x-3">
                {file.type === 'pdf' ? (
                  <FileText className="text-red-500 h-5 w-5" />
                ) : (
                  <Image className="text-blue-500 h-5 w-5" />
                )}
                <div>
                  <p className="text-sm font-medium text-gray-900">{file.name}</p>
                  <p className="text-xs text-gray-500">
                    {file.size} • {file.status === 'uploaded' ? 'Uploaded' : 'Uploading...'}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {file.status === 'uploaded' ? (
                  <Check className="text-green-500 h-5 w-5" />
                ) : (
                  <div className="flex items-center space-x-2">
                    <div className="w-16">
                      <Progress value={file.progress} className="h-2" />
                    </div>
                    <span className="text-xs text-gray-500">{file.progress}%</span>
                  </div>
                )}
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFile(file.id)}
                  className="text-gray-400 hover:text-red-500"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <TriangleAlert className="text-yellow-600 h-5 w-5 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-yellow-800">File Upload Guidelines</p>
              <ul className="text-xs text-yellow-700 mt-2 space-y-1">
                <li>• Remove or redact any sensitive personal information</li>
                <li>• Include log files, screenshots, or documentation that support your report</li>
                <li>• Files are encrypted in transit and at rest</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
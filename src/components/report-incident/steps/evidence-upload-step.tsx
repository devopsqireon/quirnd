// src/components/report-incident/steps/evidence-upload-step.tsx
"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  CloudUpload, 
  FolderOpen, 
  FileText, 
  Image, 
  Check, 
  X, 
  TriangleAlert,
  Upload,
  Shield,
  HelpCircle
} from 'lucide-react';

interface EvidenceUploadStepProps {
  formData: any;
  updateFormData: (field: string, value: any) => void;
}

const mockUploadedFiles = [
  {
    id: '1',
    name: 'security_log_20240115.pdf',
    size: '2.3 MB',
    status: 'uploaded',
    type: 'pdf',
    uploadedAt: '2 minutes ago'
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

export function EvidenceUploadStep({ formData, updateFormData }: EvidenceUploadStepProps) {
  const [dragActive, setDragActive] = useState(false);

  const handleFileUpload = () => {
    console.log('File upload triggered');
  };

  const removeFile = (fileId: string) => {
    console.log('Removing file:', fileId);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // Handle file drop
      console.log('Files dropped:', e.dataTransfer.files);
    }
  };

  return (
    <div className="space-y-8">
      {/* Step Introduction */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-start space-x-3">
            <Upload className="text-blue-600 h-5 w-5 mt-1" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">Supporting evidence (Optional)</h3>
              <p className="text-sm text-blue-800">
                Upload any files that help document the incident - screenshots, log files, 
                error messages, or other relevant documentation.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* File Upload Zone */}
      <div className="space-y-6">
        <div 
          className={`
            border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 cursor-pointer
            ${dragActive 
              ? 'border-blue-400 bg-blue-50' 
              : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
            }
          `}
          onClick={handleFileUpload}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center space-y-4">
            <div className={`
              w-16 h-16 rounded-full flex items-center justify-center transition-colors
              ${dragActive ? 'bg-blue-100' : 'bg-gray-100'}
            `}>
              <CloudUpload className={`h-8 w-8 ${dragActive ? 'text-blue-600' : 'text-gray-400'}`} />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {dragActive ? 'Drop files here' : 'Upload Evidence Files'}
              </h3>
              <p className="text-sm text-gray-600 mb-1">
                Drag and drop files here, or click to browse
              </p>
              <p className="text-xs text-gray-500">
                Supports: PDF, DOC, PNG, JPG, TXT, LOG files (max 50MB each)
              </p>
            </div>
            <Button type="button" onClick={handleFileUpload}>
              <FolderOpen className="mr-2 h-4 w-4" />
              Choose Files
            </Button>
          </div>
        </div>

        {/* File Type Guidelines */}
        <Card className="bg-gray-50 border-gray-200">
          <CardContent className="p-4">
            <h4 className="font-medium text-gray-900 mb-3 flex items-center space-x-2">
              <HelpCircle className="h-4 w-4 text-gray-600" />
              <span>What files are helpful?</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h5 className="font-medium text-gray-800 mb-2">Screenshots & Images:</h5>
                <ul className="text-gray-600 space-y-1">
                  <li>• Error messages or alerts</li>
                  <li>• Suspicious emails or websites</li>
                  <li>• System monitoring dashboards</li>
                  <li>• Network activity graphs</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-gray-800 mb-2">Log Files & Documents:</h5>
                <ul className="text-gray-600 space-y-1">
                  <li>• System or application logs</li>
                  <li>• Network traffic captures</li>
                  <li>• Email headers or source</li>
                  <li>• Incident timeline documents</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Uploaded Files List */}
      {mockUploadedFiles.length > 0 && (
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900">Uploaded Files ({mockUploadedFiles.length})</h4>
          <div className="space-y-3">
            {mockUploadedFiles.map((file) => (
              <Card key={file.id} className={`${
                file.status === 'uploaded' 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-blue-50 border-blue-200'
              }`}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {file.type === 'pdf' ? (
                        <FileText className="text-red-500 h-6 w-6" />
                      ) : (
                        <Image className="text-blue-500 h-6 w-6" />
                      )}
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{file.name}</p>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <span>{file.size}</span>
                          <span>•</span>
                          <span>
                            {file.status === 'uploaded' ? 'Uploaded' : 'Uploading...'}
                            {file.uploadedAt && ` ${file.uploadedAt}`}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      {file.status === 'uploaded' ? (
                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            <Check className="mr-1 h-3 w-3" />
                            Complete
                          </Badge>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-3 min-w-[120px]">
                          <Progress value={file.progress} className="h-2 flex-1" />
                          <span className="text-sm text-gray-500 w-10">{file.progress}%</span>
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
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Security & Privacy Notice */}
      <Card className="bg-yellow-50 border-yellow-200">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <TriangleAlert className="text-yellow-600 h-5 w-5 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-yellow-800 mb-2">File Upload Security Guidelines</h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Remove or redact any sensitive personal information before uploading</li>
                <li>• All files are encrypted during transfer and storage</li>
                <li>• Only authorized security team members can access uploaded files</li>
                <li>• Files are automatically scanned for malware</li>
                <li>• Maximum file size: 50MB per file</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Optional Skip Message */}
      <Card className="bg-gray-50 border-gray-200">
        <CardContent className="p-4 text-center">
          <Shield className="h-8 w-8 text-gray-400 mx-auto mb-2" />
          <h4 className="font-medium text-gray-900 mb-1">No files to upload?</h4>
          <p className="text-sm text-gray-600">
            That's perfectly fine. You can continue without uploading any files, 
            or add them later if needed.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
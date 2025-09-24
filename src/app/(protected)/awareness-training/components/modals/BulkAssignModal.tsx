// /app/awareness-training/components/modals/BulkAssignModal.tsx
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Upload, Download, FileText, AlertCircle, CheckCircle, X, Users } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
// Removed Alert import - using custom styled divs instead
import { sampleTrainingPrograms, sampleUsers } from '../../data/sample-data';
import { PRIORITY_LEVELS, DEPARTMENTS } from '../../utils/constants';
import { useToast } from '../../utils/hooks';

interface BulkAssignModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

interface CSVUploadResult {
  successful: number;
  failed: number;
  errors: string[];
  preview: any[];
}

const BulkAssignModal: React.FC<BulkAssignModalProps> = ({
  isOpen,
  onClose,
  onSubmit
}) => {
  const [assignmentMethod, setAssignmentMethod] = useState<'departments' | 'upload'>('departments');
  const [formData, setFormData] = useState({
    trainingId: '',
    departments: [] as string[],
    dueDate: '',
    priority: 'medium' as keyof typeof PRIORITY_LEVELS,
    notes: '',
    sendNotification: true,
    sendManagerNotification: false
  });

  // CSV Upload state
  const [uploadStep, setUploadStep] = useState<'select' | 'preview' | 'processing' | 'complete'>('select');
  const [uploadResult, setUploadResult] = useState<CSVUploadResult | null>(null);
  const [csvData, setCsvData] = useState<any[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { success, error: showError } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (assignmentMethod === 'departments' && formData.departments.length === 0) {
      showError('Please select at least one department');
      return;
    }

    if (assignmentMethod === 'upload' && csvData.length === 0) {
      showError('Please upload a valid CSV file');
      return;
    }

    const submissionData = {
      ...formData,
      assignmentMethod,
      csvData: assignmentMethod === 'upload' ? csvData : undefined,
      totalAssignees: assignmentMethod === 'departments' 
        ? getEstimatedEmployees() 
        : csvData.length
    };

    onSubmit(submissionData);
  };

  const toggleDepartment = (department: string) => {
    setFormData(prev => ({
      ...prev,
      departments: prev.departments.includes(department)
        ? prev.departments.filter(d => d !== department)
        : [...prev.departments, department]
    }));
  };

  const getEstimatedEmployees = () => {
    // Mock calculation - in real app, this would come from API
    const deptEmployeeCounts: Record<string, number> = {
      'Engineering': 25,
      'Marketing': 12,
      'Sales': 18,
      'HR': 8,
      'Finance': 10,
      'Operations': 14,
      'Legal': 6,
      'IT Support': 15,
      'Product': 20,
      'Customer Success': 9
    };

    return formData.departments.reduce((total, dept) => {
      return total + (deptEmployeeCounts[dept] || 0);
    }, 0);
  };

  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  // CSV Upload Functions
  const handleFileUpload = (file: File) => {
    if (!file.name.endsWith('.csv')) {
      showError('Please upload a CSV file');
      return;
    }

    setUploadStep('processing');
    setUploadProgress(0);

    // Simulate file processing
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const lines = text.split('\n').filter(line => line.trim());
        const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
        
        // Validate required headers
        const requiredHeaders = ['name', 'email', 'department'];
        const missingHeaders = requiredHeaders.filter(h => !headers.includes(h));
        
        if (missingHeaders.length > 0) {
          showError(`Missing required columns: ${missingHeaders.join(', ')}`);
          setUploadStep('select');
          return;
        }

        // Process data
        const processedData = [];
        const errors = [];
        
        for (let i = 1; i < lines.length; i++) {
          const values = lines[i].split(',').map(v => v.trim());
          if (values.length !== headers.length) {
            errors.push(`Row ${i + 1}: Incorrect number of columns`);
            continue;
          }

          const rowData: any = {};
          headers.forEach((header, index) => {
            rowData[header] = values[index];
          });

          // Validate email format
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(rowData.email)) {
            errors.push(`Row ${i + 1}: Invalid email format`);
            continue;
          }

          // Add generated ID
          rowData.id = `bulk-${Date.now()}-${i}`;
          processedData.push(rowData);
          
          // Update progress
          setUploadProgress((i / (lines.length - 1)) * 100);
        }

        setTimeout(() => {
          setCsvData(processedData);
          setUploadResult({
            successful: processedData.length,
            failed: errors.length,
            errors: errors.slice(0, 5), // Show first 5 errors
            preview: processedData.slice(0, 5) // Show first 5 rows for preview
          });
          setUploadStep('preview');
          setUploadProgress(100);
        }, 1500); // Simulate processing time

      } catch (error) {
        showError('Error processing CSV file');
        setUploadStep('select');
      }
    };

    reader.readAsText(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const downloadTemplate = () => {
    const csvContent = 'name,email,department,role\nJohn Doe,john.doe@company.com,Engineering,Developer\nJane Smith,jane.smith@company.com,Marketing,Manager';
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'bulk-assignment-template.csv';
    link.click();
    URL.revokeObjectURL(url);
    success('Template downloaded successfully');
  };

  const resetUpload = () => {
    setUploadStep('select');
    setCsvData([]);
    setUploadResult(null);
    setUploadProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const confirmUpload = () => {
    setUploadStep('complete');
    success(`${csvData.length} employees ready for assignment`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Bulk Assign Training
          </DialogTitle>
          <DialogDescription>
            Assign training to multiple employees at once using departments or CSV upload.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Training Selection */}
          <div>
            <Label htmlFor="training">Select Training Program *</Label>
            <select
              id="training"
              value={formData.trainingId}
              onChange={(e) => setFormData(prev => ({ ...prev, trainingId: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Choose training program</option>
              {sampleTrainingPrograms.filter(p => p.isActive).map((program) => (
                <option key={program.id} value={program.id}>
                  {program.title} ({program.duration}min)
                </option>
              ))}
            </select>
          </div>

          {/* Assignment Method */}
          <div>
            <Label className="text-base font-medium">Assignment Method</Label>
            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div 
                className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                  assignmentMethod === 'departments' 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setAssignmentMethod('departments')}
              >
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    id="departments"
                    name="method"
                    value="departments"
                    checked={assignmentMethod === 'departments'}
                    onChange={(e) => setAssignmentMethod(e.target.value as 'departments')}
                    className="w-4 h-4"
                  />
                  <div>
                    <Label htmlFor="departments" className="font-medium cursor-pointer">
                      Select by Departments
                    </Label>
                    <p className="text-sm text-gray-500">Choose entire departments for assignment</p>
                  </div>
                </div>
              </div>

              <div 
                className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                  assignmentMethod === 'upload' 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setAssignmentMethod('upload')}
              >
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    id="upload"
                    name="method"
                    value="upload"
                    checked={assignmentMethod === 'upload'}
                    onChange={(e) => setAssignmentMethod(e.target.value as 'upload')}
                    className="w-4 h-4"
                  />
                  <div>
                    <Label htmlFor="upload" className="font-medium cursor-pointer">
                      Upload CSV File
                    </Label>
                    <p className="text-sm text-gray-500">Upload a list of specific employees</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Department Selection */}
          {assignmentMethod === 'departments' && (
            <div className="space-y-4">
              <div>
                <Label className="text-base font-medium">Select Departments *</Label>
                <div className="mt-3 grid grid-cols-2 md:grid-cols-3 gap-3">
                  {DEPARTMENTS.map((department) => (
                    <div 
                      key={department} 
                      className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                        formData.departments.includes(department)
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => toggleDepartment(department)}
                    >
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          checked={formData.departments.includes(department)}
                          onChange={() => toggleDepartment(department)}
                        />
                        <Label className="text-sm font-medium cursor-pointer">{department}</Label>
                      </div>
                    </div>
                  ))}
                </div>
                
                {formData.departments.length > 0 && (
                  <div className="mt-4 flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <Users className="h-4 w-4 text-blue-600 mt-0.5" />
                    <div className="text-sm text-blue-800">
                      <strong>{formData.departments.length}</strong> department(s) selected • 
                      Estimated <strong>{getEstimatedEmployees()}</strong> employees will be assigned
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* CSV Upload */}
          {assignmentMethod === 'upload' && (
            <div className="space-y-4">
              <Label className="text-base font-medium">Upload Employee List</Label>
              
              {uploadStep === 'select' && (
                <div className="space-y-4">
                  <div 
                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                      isDragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                    }`}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                  >
                    <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <div className="space-y-2">
                      <p className="text-lg font-medium">Drop your CSV file here</p>
                      <p className="text-gray-500">or</p>
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        Choose File
                      </Button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".csv"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleFileUpload(file);
                        }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-4">
                      CSV files only • Required columns: name, email, department
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-blue-500" />
                      <div>
                        <p className="font-medium">Need a template?</p>
                        <p className="text-sm text-gray-600">Download our CSV template to get started</p>
                      </div>
                    </div>
                    <Button type="button" variant="outline" size="sm" onClick={downloadTemplate}>
                      <Download className="w-4 h-4 mr-2" />
                      Download Template
                    </Button>
                  </div>
                </div>
              )}

              {uploadStep === 'processing' && (
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Upload className="w-8 h-8 text-blue-600 animate-pulse" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">Processing CSV file...</h3>
                    <p className="text-gray-600 mb-4">Validating employee data and checking for errors</p>
                    <Progress value={uploadProgress} className="w-full max-w-md mx-auto" />
                    <p className="text-sm text-gray-500 mt-2">{Math.round(uploadProgress)}% complete</p>
                  </div>
                </div>
              )}

              {uploadStep === 'preview' && uploadResult && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Upload Results</h3>
                    <Button type="button" variant="outline" size="sm" onClick={resetUpload}>
                      <X className="w-4 h-4 mr-2" />
                      Start Over
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                      <div className="text-sm text-green-800">
                        <strong>{uploadResult.successful}</strong> employees successfully processed
                      </div>
                    </div>
                    
                    {uploadResult.failed > 0 && (
                      <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <AlertCircle className="h-4 w-4 text-red-600 mt-0.5" />
                        <div className="text-sm text-red-800">
                          <strong>{uploadResult.failed}</strong> rows had errors
                        </div>
                      </div>
                    )}
                  </div>

                  {uploadResult.errors.length > 0 && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <h4 className="font-medium text-red-900 mb-2">Errors found:</h4>
                      <ul className="text-sm text-red-700 space-y-1">
                        {uploadResult.errors.map((error, index) => (
                          <li key={index}>• {error}</li>
                        ))}
                        {uploadResult.failed > 5 && (
                          <li className="italic">... and {uploadResult.failed - 5} more errors</li>
                        )}
                      </ul>
                    </div>
                  )}

                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium mb-3">Preview (first 5 employees):</h4>
                    <div className="space-y-2">
                      {uploadResult.preview.map((employee, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-white rounded border">
                          <div>
                            <span className="font-medium">{employee.name}</span>
                            <span className="text-gray-500 ml-2">({employee.email})</span>
                          </div>
                          <Badge variant="outline">{employee.department}</Badge>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button type="button" onClick={confirmUpload} className="flex-1">
                      Continue with {uploadResult.successful} employees
                    </Button>
                  </div>
                </div>
              )}

              {uploadStep === 'complete' && (
                <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                  <div className="text-sm text-green-800">
                    CSV uploaded successfully! <strong>{csvData.length}</strong> employees ready for assignment.
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Assignment Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="dueDate">Due Date *</Label>
              <Input
                id="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
                min={getMinDate()}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="priority">Priority</Label>
              <select
                id="priority"
                value={formData.priority}
                onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value as any }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {Object.entries(PRIORITY_LEVELS).map(([value, config]) => (
                  <option key={value} value={value}>{config.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Notes */}
          <div>
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="Add any additional instructions or context for this bulk assignment"
              rows={3}
            />
          </div>

          {/* Notification Options */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Notification Settings</Label>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="notification"
                  checked={formData.sendNotification}
                  onCheckedChange={(checked) => 
                    setFormData(prev => ({ ...prev, sendNotification: !!checked }))
                  }
                />
                <Label htmlFor="notification" className="text-sm">
                  Send email notification to all assignees
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="managerNotification"
                  checked={formData.sendManagerNotification}
                  onCheckedChange={(checked) => 
                    setFormData(prev => ({ ...prev, sendManagerNotification: !!checked }))
                  }
                />
                <Label htmlFor="managerNotification" className="text-sm">
                  Notify department managers about assignments
                </Label>
              </div>
            </div>
          </div>

          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button type="button" variant="outline" onClick={onClose} className="w-full sm:w-auto">
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto"
              disabled={
                !formData.trainingId || 
                !formData.dueDate ||
                (assignmentMethod === 'departments' && formData.departments.length === 0) ||
                (assignmentMethod === 'upload' && (uploadStep !== 'complete' || csvData.length === 0))
              }
            >
              {assignmentMethod === 'departments' 
                ? `Assign to ${getEstimatedEmployees()} Employees`
                : `Assign to ${csvData.length} Employees`
              }
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BulkAssignModal;
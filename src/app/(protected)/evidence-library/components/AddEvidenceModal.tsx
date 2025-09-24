// src/app/(protected)/evidence-library/components/AddEvidenceModal.tsx
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { CloudUpload } from "lucide-react";

interface AddEvidenceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddEvidenceModal({ isOpen, onClose }: AddEvidenceModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    description: "",
    control: "",
    risk: "",
    owner: "",
    expiryDate: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
    onClose();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add New Evidence</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label>Upload File</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors cursor-pointer">
              <CloudUpload className="mx-auto h-12 w-12 text-gray-400 mb-2" />
              <p className="text-sm text-gray-600 mb-2">
                Drag and drop files here, or click to browse
              </p>
              <p className="text-xs text-gray-500">
                Supported formats: PDF, DOC, DOCX, XLS, XLSX, PNG, JPG (Max 10MB)
              </p>
              <input type="file" className="hidden" multiple />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Evidence Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Enter evidence title"
              />
            </div>
            <div>
              <Label htmlFor="type">Evidence Type</Label>
              <Select onValueChange={(value) => handleInputChange("type", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="policy">Policy</SelectItem>
                  <SelectItem value="risk-treatment">Risk Treatment</SelectItem>
                  <SelectItem value="control">Control</SelectItem>
                  <SelectItem value="training-log">Training Log</SelectItem>
                  <SelectItem value="incident-record">Incident Record</SelectItem>
                  <SelectItem value="audit-finding">Audit Finding</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              rows={3}
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Brief description of the evidence..."
            />
          </div>
          
          <div>
            <Label>Linked Items</Label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Select onValueChange={(value) => handleInputChange("control", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Link to Control..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A.5.1.1">A.5.1.1 - Information Security Policies</SelectItem>
                    <SelectItem value="A.12.6.1">A.12.6.1 - Management of Technical Vulnerabilities</SelectItem>
                    <SelectItem value="A.16.1.4">A.16.1.4 - Assessment and Decision on Information Security Events</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select onValueChange={(value) => handleInputChange("risk", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Link to Risk..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="RISK-001">RISK-001 - Data Breach Risk</SelectItem>
                    <SelectItem value="RISK-002">RISK-002 - System Downtime Risk</SelectItem>
                    <SelectItem value="RISK-003">RISK-003 - Third Party Risk</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="owner">Owner</Label>
              <Select onValueChange={(value) => handleInputChange("owner", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Assign owner..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sarah">Sarah Johnson</SelectItem>
                  <SelectItem value="mike">Mike Chen</SelectItem>
                  <SelectItem value="lisa">Lisa Rodriguez</SelectItem>
                  <SelectItem value="tom">Tom Wilson</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="expiryDate">Expiry Date (Optional)</Label>
              <Input
                id="expiryDate"
                type="date"
                value={formData.expiryDate}
                onChange={(e) => handleInputChange("expiryDate", e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Upload Evidence
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
// src/components/internal-auditor/modals/nc-modal.tsx
import { X, CircleAlert } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

interface NCModalProps {
  isOpen: boolean
  onClose: () => void
}

export function NCModal({ isOpen, onClose }: NCModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center text-xl font-bold text-gray-900">
            <CircleAlert className="mr-2 w-5 h-5 text-red-600" />
            Raise Non-Conformity
          </DialogTitle>
        </DialogHeader>
        
        <form className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nc-title">Non-Conformity Title *</Label>
              <Input 
                id="nc-title"
                placeholder="Brief title describing the non-conformity"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nc-severity">Severity Level *</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="major">Major</SelectItem>
                  <SelectItem value="minor">Minor</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nc-department">Department *</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="it">IT Department</SelectItem>
                  <SelectItem value="hr">HR Department</SelectItem>
                  <SelectItem value="operations">Operations</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="marketing">Sales & Marketing</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="nc-category">Category *</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="access-control">Access Control</SelectItem>
                  <SelectItem value="data-protection">Data Protection</SelectItem>
                  <SelectItem value="incident-management">Incident Management</SelectItem>
                  <SelectItem value="risk-management">Risk Management</SelectItem>
                  <SelectItem value="business-continuity">Business Continuity</SelectItem>
                  <SelectItem value="physical-security">Physical Security</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="nc-description">Detailed Description *</Label>
            <Textarea 
              id="nc-description"
              placeholder="Provide detailed description of the non-conformity, including what was observed and why it constitutes a non-conformity..."
              rows={4}
              required
            />
          </div>

          {/* Evidence and Impact */}
          <div className="space-y-2">
            <Label htmlFor="nc-evidence">Evidence/Supporting Information</Label>
            <Textarea 
              id="nc-evidence"
              placeholder="Describe evidence found, screenshots taken, documents reviewed, etc..."
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nc-standard">Related Standard/Control</Label>
              <Input 
                id="nc-standard"
                placeholder="e.g., ISO 27001:2013 A.9.1.2"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nc-risk">Associated Risk</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select associated risk" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="r-2024-001">R-2024-001 - Data Breach via Phishing</SelectItem>
                  <SelectItem value="r-2024-002">R-2024-002 - Unauthorized Access</SelectItem>
                  <SelectItem value="r-2024-003">R-2024-003 - System Failure</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Impact Assessment */}
          <div className="space-y-2">
            <Label htmlFor="nc-impact">Potential Impact *</Label>
            <Textarea 
              id="nc-impact"
              placeholder="Describe the potential impact on information security, business operations, compliance, etc..."
              rows={3}
              required
            />
          </div>

          {/* Recommendations */}
          <div className="space-y-2">
            <Label htmlFor="nc-recommendations">Recommended Actions</Label>
            <Textarea 
              id="nc-recommendations"
              placeholder="Suggest corrective actions that should be taken to address this non-conformity..."
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nc-priority">Priority</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High - Immediate Action Required</SelectItem>
                  <SelectItem value="medium">Medium - Address within 30 days</SelectItem>
                  <SelectItem value="low">Low - Address within 90 days</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="nc-due-date">Suggested Due Date</Label>
              <Input 
                id="nc-due-date"
                type="date"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-red-600 hover:bg-red-700">
              <CircleAlert className="mr-2 w-4 h-4" />
              Raise Non-Conformity
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
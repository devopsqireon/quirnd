// src/components/internal-auditor/modals/ofi-modal.tsx
import { X, Lightbulb } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

interface OFIModalProps {
  isOpen: boolean
  onClose: () => void
}

export function OFIModal({ isOpen, onClose }: OFIModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center text-xl font-bold text-gray-900">
            <Lightbulb className="mr-2 w-5 h-5 text-yellow-600" />
            Raise Opportunity for Improvement (OFI)
          </DialogTitle>
        </DialogHeader>
        
        <form className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ofi-title">OFI Title *</Label>
              <Input 
                id="ofi-title"
                placeholder="Brief title describing the improvement opportunity"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ofi-priority">Priority Level *</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High - Significant Benefit</SelectItem>
                  <SelectItem value="medium">Medium - Moderate Benefit</SelectItem>
                  <SelectItem value="low">Low - Minor Enhancement</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ofi-department">Department *</Label>
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
              <Label htmlFor="ofi-category">Category *</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="process-improvement">Process Improvement</SelectItem>
                  <SelectItem value="efficiency">Efficiency Enhancement</SelectItem>
                  <SelectItem value="security-enhancement">Security Enhancement</SelectItem>
                  <SelectItem value="cost-reduction">Cost Reduction</SelectItem>
                  <SelectItem value="training">Training & Awareness</SelectItem>
                  <SelectItem value="automation">Automation</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Current Situation */}
          <div className="space-y-2">
            <Label htmlFor="ofi-current">Current Situation *</Label>
            <Textarea 
              id="ofi-current"
              placeholder="Describe the current state/process and how it's currently being handled..."
              rows={3}
              required
            />
          </div>

          {/* Improvement Opportunity */}
          <div className="space-y-2">
            <Label htmlFor="ofi-improvement">Improvement Opportunity *</Label>
            <Textarea 
              id="ofi-improvement"
              placeholder="Describe the specific improvement opportunity and what could be done better..."
              rows={4}
              required
            />
          </div>

          {/* Expected Benefits */}
          <div className="space-y-2">
            <Label htmlFor="ofi-benefits">Expected Benefits *</Label>
            <Textarea 
              id="ofi-benefits"
              placeholder="Describe the expected benefits including improved security, efficiency, cost savings, risk reduction, etc..."
              rows={3}
              required
            />
          </div>

          {/* Implementation Details */}
          <div className="space-y-2">
            <Label htmlFor="ofi-implementation">Suggested Implementation Approach</Label>
            <Textarea 
              id="ofi-implementation"
              placeholder="Provide suggestions on how this improvement could be implemented..."
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ofi-effort">Implementation Effort</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select effort level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low - Quick wins ( 1 month)</SelectItem>
                  <SelectItem value="medium">Medium - Project work (1-6 months)</SelectItem>
                  <SelectItem value="high">High - Major initiative (- 6 months)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="ofi-cost">Estimated Cost Impact</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select cost impact" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No Cost</SelectItem>
                  <SelectItem value="low">Low Cost (~ $5,000)</SelectItem>
                  <SelectItem value="medium">Medium Cost ($5,000 - $25,000)</SelectItem>
                  <SelectItem value="high">High Cost (~ $25,000)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Related Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ofi-standard">Related Standard/Best Practice</Label>
              <Input 
                id="ofi-standard"
                placeholder="e.g., ISO 27001:2013 A.12.6.1"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ofi-risk">Related Risk/Control</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select related item" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="r-2024-001">R-2024-001 - Data Breach via Phishing</SelectItem>
                  <SelectItem value="c-ac-001">C-AC-001 - Access Control Implementation</SelectItem>
                  <SelectItem value="c-net-001">C-NET-001 - Network Security Controls</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Additional Notes */}
          <div className="space-y-2">
            <Label htmlFor="ofi-notes">Additional Notes</Label>
            <Textarea 
              id="ofi-notes"
              placeholder="Any additional information, constraints, or considerations..."
              rows={2}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-yellow-600 hover:bg-yellow-700">
              <Lightbulb className="mr-2 w-4 h-4" />
              Submit OFI
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
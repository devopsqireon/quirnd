// src/app/(protected)/dashboard/external-dashboard/components/ofi-modal.tsx
'use client'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { useState } from 'react'

interface OFIModalProps {
  open: boolean
  onClose: () => void
}

export function OFIModal({ open, onClose }: OFIModalProps) {
  const [formData, setFormData] = useState({
    area: '',
    suggestion: '',
    priority: 'Low'
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('OFI Form submitted:', formData)
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Raise Opportunity for Improvement (OFI)</DialogTitle>
          <DialogDescription>
            Suggest an improvement that could enhance the organization's security posture
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="area">Area of Improvement</Label>
            <Select value={formData.area} onValueChange={(value) => setFormData({...formData, area: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select area" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="control">Control Implementation</SelectItem>
                <SelectItem value="policy">Policy Documentation</SelectItem>
                <SelectItem value="risk">Risk Management</SelectItem>
                <SelectItem value="training">Training & Awareness</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="suggestion">Suggestion</Label>
            <Textarea 
              id="suggestion"
              rows={4}
              placeholder="Describe your suggestion for improvement..."
              value={formData.suggestion}
              onChange={(e) => setFormData({...formData, suggestion: e.target.value})}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="priority">Priority</Label>
            <Select value={formData.priority} onValueChange={(value) => setFormData({...formData, priority: value})}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Low">Low</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="High">High</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-orange-600 hover:bg-orange-700"
            >
              Raise OFI
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
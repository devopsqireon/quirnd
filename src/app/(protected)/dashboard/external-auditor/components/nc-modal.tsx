// src/app/(protected)/dashboard/external-dashboard/components/nc-modal.tsx
'use client'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { useState } from 'react'

interface NCModalProps {
  open: boolean
  onClose: () => void
}

export function NCModal({ open, onClose }: NCModalProps) {
  const [formData, setFormData] = useState({
    reference: '',
    description: '',
    severity: 'Minor',
    owner: 'Compliance Officer',
    dueDate: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('NC Form submitted:', formData)
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Raise Non-Conformity (NC)</DialogTitle>
          <DialogDescription>
            Document a non-conformity found during the audit
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="reference">Reference (Control/Policy/ISO Clause)</Label>
            <Select value={formData.reference} onValueChange={(value) => setFormData({...formData, reference: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select control or policy" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="A.5.1">A.5.1 - Information security policies</SelectItem>
                <SelectItem value="A.6.1">A.6.1 - Screening</SelectItem>
                <SelectItem value="A.8.1">A.8.1 - User endpoint devices</SelectItem>
                <SelectItem value="A.12.1">A.12.1 - Operational procedures</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description"
              rows={4}
              placeholder="Describe the non-conformity in detail..."
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="severity">Severity</Label>
            <Select value={formData.severity} onValueChange={(value) => setFormData({...formData, severity: value})}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Minor">Minor</SelectItem>
                <SelectItem value="Major">Major</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="owner">Owner</Label>
            <Input 
              id="owner"
              value={formData.owner}
              readOnly
              className="bg-gray-50 text-gray-500"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="dueDate">Due Date</Label>
            <Input 
              id="dueDate"
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
            />
          </div>
          
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="destructive">
              Raise Non-Conformity
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
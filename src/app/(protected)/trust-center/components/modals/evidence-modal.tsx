// src/components/trust-center/modals/evidence-modal.tsx
import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { Info, AlertCircle, CheckCircle } from 'lucide-react'

interface EvidenceModalProps {
  isOpen: boolean
  onClose: () => void
  evidenceType: string
}

interface FormData {
  fullName: string
  organization: string
  email: string
  phone: string
  jobTitle: string
  purpose: string
  businessJustification: string
  additionalDetails: string
  agreementAccepted: boolean
  timeframe: string
}

export function EvidenceModal({ isOpen, onClose, evidenceType }: EvidenceModalProps) {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    organization: '',
    email: '',
    phone: '',
    jobTitle: '',
    purpose: '',
    businessJustification: '',
    additionalDetails: '',
    agreementAccepted: false,
    timeframe: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Partial<FormData>>({})

  const evidenceTypeNames: Record<string, string> = {
    'risk-assessment': 'Risk Assessment Documentation',
    'policies': 'Policy & Procedure Library',
    'audit-reports': 'Audit Reports & Findings',
    'technical-controls': 'Technical Security Controls'
  }

  const evidenceTypeDescriptions: Record<string, string> = {
    'risk-assessment': 'Comprehensive risk register, treatment plans, and assessment methodology documentation',
    'policies': 'Complete set of information security policies, procedures, and work instructions',
    'audit-reports': 'Internal and external audit reports, findings, and corrective action plans',
    'technical-controls': 'Network diagrams, security configurations, and technical control evidence'
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {}

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required'
    if (!formData.organization.trim()) newErrors.organization = 'Organization is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    if (!formData.jobTitle.trim()) newErrors.jobTitle = 'Job title is required'
    if (!formData.purpose) newErrors.purpose = 'Purpose is required'
    if (!formData.businessJustification.trim()) {
      newErrors.businessJustification = 'Business justification is required'
    }
    if (!formData.timeframe) newErrors.timeframe = 'Timeframe is required'
    if (!formData.agreementAccepted) {
      newErrors.agreementAccepted = 'You must accept the agreement to proceed'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }))
    }
  }

  const handleSubmit = async () => {
    if (!validateForm()) return

    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setSubmitted(true)
      
      // Auto-close after 3 seconds
      setTimeout(() => {
        handleClose()
      }, 3000)
    } catch (error) {
      console.error('Error submitting evidence request:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    setFormData({
      fullName: '',
      organization: '',
      email: '',
      phone: '',
      jobTitle: '',
      purpose: '',
      businessJustification: '',
      additionalDetails: '',
      agreementAccepted: false,
      timeframe: ''
    })
    setErrors({})
    setSubmitted(false)
    setIsSubmitting(false)
    onClose()
  }

  if (submitted) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="max-w-md">
          <div className="text-center py-6">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Request Submitted Successfully</h3>
            <p className="text-sm text-gray-600 mb-4">
              Your evidence request has been submitted for review. You will receive a confirmation email shortly.
            </p>
            <p className="text-xs text-gray-500">
              Expected response time: 1-2 business days
            </p>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <span>Request Evidence Access</span>
            {evidenceType && (
              <Badge variant="secondary" className="text-xs">
                {evidenceTypeNames[evidenceType] || evidenceType}
              </Badge>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Evidence Type Information */}
          {evidenceType && (
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                <strong>Requesting access to:</strong> {evidenceTypeDescriptions[evidenceType]}
              </AlertDescription>
            </Alert>
          )}

          {/* Form Fields */}
          <div className="space-y-4">
            {/* Personal Information */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Personal Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    className={errors.fullName ? 'border-red-300' : ''}
                  />
                  {errors.fullName && <p className="text-xs text-red-600 mt-1">{errors.fullName}</p>}
                </div>
                <div>
                  <Label htmlFor="jobTitle">Job Title *</Label>
                  <Input
                    id="jobTitle"
                    value={formData.jobTitle}
                    onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                    className={errors.jobTitle ? 'border-red-300' : ''}
                  />
                  {errors.jobTitle && <p className="text-xs text-red-600 mt-1">{errors.jobTitle}</p>}
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Contact Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={errors.email ? 'border-red-300' : ''}
                  />
                  {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number (Optional)</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Organization Information */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Organization Information</h4>
              <div>
                <Label htmlFor="organization">Organization *</Label>
                <Input
                  id="organization"
                  value={formData.organization}
                  onChange={(e) => handleInputChange('organization', e.target.value)}
                  className={errors.organization ? 'border-red-300' : ''}
                />
                {errors.organization && <p className="text-xs text-red-600 mt-1">{errors.organization}</p>}
              </div>
            </div>

            {/* Request Details */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Request Details</h4>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="purpose">Purpose of Request *</Label>
                    <Select value={formData.purpose} onValueChange={(value) => handleInputChange('purpose', value)}>
                      <SelectTrigger className={errors.purpose ? 'border-red-300' : ''}>
                        <SelectValue placeholder="Select purpose" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="due-diligence">Due Diligence Review</SelectItem>
                        <SelectItem value="vendor-assessment">Vendor Assessment</SelectItem>
                        <SelectItem value="regulatory-compliance">Regulatory Compliance</SelectItem>
                        <SelectItem value="internal-audit">Internal Audit</SelectItem>
                        <SelectItem value="risk-assessment">Risk Assessment</SelectItem>
                        <SelectItem value="customer-requirement">Customer Requirement</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.purpose && <p className="text-xs text-red-600 mt-1">{errors.purpose}</p>}
                  </div>
                  <div>
                    <Label htmlFor="timeframe">Required Timeframe *</Label>
                    <Select value={formData.timeframe} onValueChange={(value) => handleInputChange('timeframe', value)}>
                      <SelectTrigger className={errors.timeframe ? 'border-red-300' : ''}>
                        <SelectValue placeholder="Select timeframe" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="urgent">Urgent (Within 24 hours)</SelectItem>
                        <SelectItem value="standard">Standard (1-2 business days)</SelectItem>
                        <SelectItem value="flexible">Flexible (Within 1 week)</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.timeframe && <p className="text-xs text-red-600 mt-1">{errors.timeframe}</p>}
                  </div>
                </div>

                <div>
                  <Label htmlFor="businessJustification">Business Justification *</Label>
                  <Textarea
                    id="businessJustification"
                    rows={3}
                    value={formData.businessJustification}
                    onChange={(e) => handleInputChange('businessJustification', e.target.value)}
                    placeholder="Please provide a detailed business justification for accessing this evidence..."
                    className={errors.businessJustification ? 'border-red-300' : ''}
                  />
                  {errors.businessJustification && <p className="text-xs text-red-600 mt-1">{errors.businessJustification}</p>}
                </div>

                <div>
                  <Label htmlFor="additionalDetails">Additional Details (Optional)</Label>
                  <Textarea
                    id="additionalDetails"
                    rows={2}
                    value={formData.additionalDetails}
                    onChange={(e) => handleInputChange('additionalDetails', e.target.value)}
                    placeholder="Any additional context or specific requirements..."
                  />
                </div>
              </div>
            </div>

            {/* Agreement */}
            <div className="border-t pt-4">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="agreement"
                  checked={formData.agreementAccepted}
                  onCheckedChange={(checked) => handleInputChange('agreementAccepted', !!checked)}
                  className={errors.agreementAccepted ? 'border-red-300' : ''}
                />
                <div className="text-sm">
                  <label htmlFor="agreement" className="text-gray-700 cursor-pointer">
                    I acknowledge that the requested evidence contains confidential information and agree to:
                  </label>
                  <ul className="mt-2 text-xs text-gray-600 space-y-1 ml-4">
                    <li>• Use the information solely for the stated business purpose</li>
                    <li>• Maintain strict confidentiality and not disclose to unauthorized parties</li>
                    <li>• Return or destroy the information when no longer needed</li>
                    <li>• Comply with all applicable data protection regulations</li>
                  </ul>
                </div>
              </div>
              {errors.agreementAccepted && (
                <p className="text-xs text-red-600 mt-1 ml-6">{errors.agreementAccepted}</p>
              )}
            </div>

            {/* Warning */}
            <Alert className="border-yellow-200 bg-yellow-50">
              <AlertCircle className="h-4 w-4 text-yellow-600" />
              <AlertDescription className="text-yellow-800">
                <strong>Important:</strong> All evidence requests are reviewed by our compliance team. 
                Approval is subject to verification of legitimate business need and appropriate confidentiality measures.
              </AlertDescription>
            </Alert>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={handleClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit Request'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
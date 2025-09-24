// src/components/user-access/modals/invite-user-modal.tsx
import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { 
  X, 
  Info, 
  UserPlus, 
  Loader2, 
  CheckCircle, 
  Copy, 
  Shield,
  Smartphone,
  Bell,
  Key
} from 'lucide-react'

interface InviteUserModalProps {
  isOpen: boolean
  onClose: () => void
}

interface InviteFormData {
  email: string
  fullName: string
  department: string
  primaryRole: string
  additionalRoles: string[]
  inviteMessage: string
  inviteExpiry: string
  landingPage: string
  require2FA: boolean
  emailNotifications: boolean
  mobileAccess: boolean
  apiAccess: boolean
  multiRole: boolean
}

interface SuccessModalProps {
  isOpen: boolean
  onClose: () => void
  email: string
  inviteLink: string
  onInviteAnother: () => void
}

function SuccessModal({ isOpen, onClose, email, inviteLink, onInviteAnother }: SuccessModalProps) {
  const [copied, setCopied] = useState(false)

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy link:', error)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <div className="p-6 text-center">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="text-green-600 h-6 w-6" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Invitation Sent Successfully!</h3>
          <p className="text-sm text-gray-600 mb-6">
            An invitation has been sent to <span className="font-medium">{email}</span>
          </p>
          
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Invite Link:</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopyLink}
                className="text-primary hover:text-primary/80"
              >
                <Copy className="mr-1 h-4 w-4" />
                {copied ? 'Copied!' : 'Copy Link'}
              </Button>
            </div>
            <div className="text-xs text-gray-500 bg-white p-2 rounded border break-all">
              {inviteLink}
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Close
            </Button>
            <Button onClick={onInviteAnother} className="flex-1">
              Invite Another
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function InviteUserModal({ isOpen, onClose }: InviteUserModalProps) {
  const [formData, setFormData] = useState<InviteFormData>({
    email: '',
    fullName: '',
    department: '',
    primaryRole: '',
    additionalRoles: [],
    inviteMessage: '',
    inviteExpiry: '14',
    landingPage: 'compliance_dashboard',
    require2FA: false,
    emailNotifications: true,
    mobileAccess: true,
    apiAccess: false,
    multiRole: false
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [roleDescription, setRoleDescription] = useState('')

  const roleDescriptions = {
    org_admin: "Full access to all organizational settings and user management",
    compliance_officer: "Manages risks, policies, audits and compliance programs",
    auditor: "Conducts internal audits and compliance assessments",
    employee: "Basic access to assigned tasks and training materials",
    it_head: "Manages IT security, systems and technology compliance",
    hr_head: "Oversees HR policies, training and employee compliance",
    operations_head: "Manages operational processes and business continuity",
    finance_head: "Oversees financial controls and reporting compliance",
    legal_dpo: "Manages legal compliance and data protection",
    risk_owner: "Owns and manages specific risk categories",
    control_owner: "Implements and monitors control effectiveness",
    task_owner: "Responsible for completing compliance tasks",
    policy_owner: "Creates and maintains policy documentation",
    training_manager: "Manages compliance training programs",
    vendor_manager: "Manages third-party vendor compliance",
    bcp_coordinator: "Coordinates business continuity planning",
    integration_admin: "Manages system integrations and data flows",
    read_only_viewer: "View-only access to compliance dashboards"
  }

  const permissionSummaries = {
    org_admin: ["User Management", "System Configuration", "All Dashboards", "Audit Logs", "Role Assignment"],
    compliance_officer: ["Compliance Dashboard", "Risk Management", "Policy Management", "Audit Reports", "Training Management"],
    auditor: ["Audit Dashboard", "Compliance Reports", "Risk View", "Finding Management", "Evidence Review"],
    employee: ["Employee Dashboard", "Assigned Tasks", "Training Modules", "Policy View", "Basic Reporting"]
  }

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    if (field === 'primaryRole' && value) {
      setRoleDescription(roleDescriptions[value as keyof typeof roleDescriptions] || '')
    }
  }

  const handleAdditionalRoleChange = (roleId: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      additionalRoles: checked 
        ? [...prev.additionalRoles, roleId]
        : prev.additionalRoles.filter(r => r !== roleId)
    }))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.email) {
      newErrors.email = 'Email address is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    
    if (!formData.primaryRole) {
      newErrors.primaryRole = 'Primary role is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      setShowSuccess(true)
      setFormData({
        email: '',
        fullName: '',
        department: '',
        primaryRole: '',
        additionalRoles: [],
        inviteMessage: '',
        inviteExpiry: '14',
        landingPage: 'compliance_dashboard',
        require2FA: false,
        emailNotifications: true,
        mobileAccess: true,
        apiAccess: false,
        multiRole: false
      })
      setRoleDescription('')
    } catch (error) {
      console.error('Failed to send invitation:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleInviteAnother = () => {
    setShowSuccess(false)
    // Modal stays open for another invitation
  }

  const handleCloseSuccess = () => {
    setShowSuccess(false)
    onClose()
  }

  return (
    <>
      <Dialog open={isOpen && !showSuccess} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <div>
                <DialogTitle className="text-2xl font-semibold text-gray-900">
                  Invite User
                </DialogTitle>
                <p className="text-sm text-gray-600 mt-1">
                  Invite a new member to your organization and assign their role.
                </p>
              </div>
            </div>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* User Information Section */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 pb-2 border-b border-gray-200">
                <UserPlus className="h-5 w-5 text-gray-600" />
                <h3 className="text-lg font-medium text-gray-900">User Information</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="email">
                    Email Address <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateFormData('email', e.target.value)}
                    placeholder="john.smith@company.com"
                    className={errors.email ? 'border-red-500' : ''}
                  />
                  {errors.email && (
                    <p className="text-red-600 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => updateFormData('fullName', e.target.value)}
                    placeholder="John Smith"
                  />
                </div>

                <div>
                  <Label htmlFor="department">Department</Label>
                  <Select value={formData.department} onValueChange={(value) => updateFormData('department', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="IT">IT</SelectItem>
                      <SelectItem value="HR">HR</SelectItem>
                      <SelectItem value="Operations">Operations</SelectItem>
                      <SelectItem value="Finance">Finance</SelectItem>
                      <SelectItem value="Legal">Legal</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Role Selection Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-gray-200">
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-gray-600" />
                  <h3 className="text-lg font-medium text-gray-900">Role Selection</h3>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="multiRole"
                    checked={formData.multiRole}
                    onCheckedChange={(checked) => updateFormData('multiRole', checked)}
                  />
                  <Label htmlFor="multiRole" className="text-sm text-gray-600">
                    Allow multiple roles
                  </Label>
                </div>
              </div>

              <div>
                <Label htmlFor="primaryRole">
                  Primary Role <span className="text-red-500">*</span>
                </Label>
                <Select 
                  value={formData.primaryRole} 
                  onValueChange={(value) => updateFormData('primaryRole', value)}
                >
                  <SelectTrigger className={errors.primaryRole ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select Primary Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <div className="px-2 py-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      Core Roles
                    </div>
                    <SelectItem value="org_admin">Org Admin</SelectItem>
                    <SelectItem value="compliance_officer">Compliance Officer</SelectItem>
                    <SelectItem value="auditor">Auditor</SelectItem>
                    <SelectItem value="employee">Employee</SelectItem>
                    
                    <Separator className="my-2" />
                    <div className="px-2 py-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      Department Heads
                    </div>
                    <SelectItem value="it_head">IT Head</SelectItem>
                    <SelectItem value="hr_head">HR Head</SelectItem>
                    <SelectItem value="operations_head">Operations Head</SelectItem>
                    <SelectItem value="finance_head">Finance Head</SelectItem>
                    <SelectItem value="legal_dpo">Legal/DPO</SelectItem>

                    <Separator className="my-2" />
                    <div className="px-2 py-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      Specialized Roles
                    </div>
                    <SelectItem value="risk_owner">Risk Owner</SelectItem>
                    <SelectItem value="control_owner">Control Owner</SelectItem>
                    <SelectItem value="task_owner">Task Owner</SelectItem>
                    <SelectItem value="policy_owner">Policy Owner</SelectItem>
                    <SelectItem value="training_manager">Training Manager</SelectItem>
                    <SelectItem value="vendor_manager">Vendor Manager</SelectItem>
                    <SelectItem value="bcp_coordinator">BCP Coordinator</SelectItem>
                    <SelectItem value="integration_admin">Integration Admin</SelectItem>
                    <SelectItem value="read_only_viewer">Read-Only Viewer</SelectItem>
                  </SelectContent>
                </Select>
                {errors.primaryRole && (
                  <p className="text-red-600 text-sm mt-1">{errors.primaryRole}</p>
                )}
                {roleDescription && (
                  <p className="text-sm text-gray-600 mt-1 p-2 bg-blue-50 rounded border border-blue-200">
                    <Info className="h-4 w-4 inline mr-1" />
                    {roleDescription}
                  </p>
                )}
              </div>

              {formData.multiRole && (
                <div className="space-y-3">
                  <Label>Additional Roles</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {['risk_owner', 'control_owner', 'task_owner', 'policy_owner'].map((role) => (
                      <label key={role} className="flex items-center p-3 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer">
                        <Checkbox
                          checked={formData.additionalRoles.includes(role)}
                          onCheckedChange={(checked) => handleAdditionalRoleChange(role, checked as boolean)}
                          className="mr-3"
                        />
                        <span className="text-sm text-gray-700 capitalize">
                          {role.replace('_', ' ')}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Access Settings Section */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 pb-2 border-b border-gray-200">
                <Key className="h-5 w-5 text-gray-600" />
                <h3 className="text-lg font-medium text-gray-900">Access Settings</h3>
              </div>

              <div>
                <Label htmlFor="inviteMessage">Invite Message (Optional)</Label>
                <Textarea
                  id="inviteMessage"
                  value={formData.inviteMessage}
                  onChange={(e) => updateFormData('inviteMessage', e.target.value)}
                  placeholder="Welcome to our compliance team! We're excited to have you join us..."
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="inviteExpiry">Invite Link Validity</Label>
                  <Select value={formData.inviteExpiry} onValueChange={(value) => updateFormData('inviteExpiry', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7">7 days</SelectItem>
                      <SelectItem value="14">14 days</SelectItem>
                      <SelectItem value="30">30 days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="landingPage">Default Landing Page</Label>
                  <Select value={formData.landingPage} onValueChange={(value) => updateFormData('landingPage', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="compliance_dashboard">Compliance Dashboard</SelectItem>
                      <SelectItem value="employee_dashboard">Employee Dashboard</SelectItem>
                      <SelectItem value="risk_dashboard">Risk Dashboard</SelectItem>
                      <SelectItem value="audit_dashboard">Audit Dashboard</SelectItem>
                      <SelectItem value="training_portal">Training Portal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Advanced Settings Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">Advanced Settings</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Shield className="h-5 w-5 text-blue-600" />
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Require 2FA</h4>
                      <p className="text-xs text-gray-600">Force two-factor authentication setup</p>
                    </div>
                  </div>
                  <Checkbox
                    checked={formData.require2FA}
                    onCheckedChange={(checked) => updateFormData('require2FA', checked)}
                  />
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Bell className="h-5 w-5 text-green-600" />
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Email Notifications</h4>
                      <p className="text-xs text-gray-600">Enable compliance email alerts</p>
                    </div>
                  </div>
                  <Checkbox
                    checked={formData.emailNotifications}
                    onCheckedChange={(checked) => updateFormData('emailNotifications', checked)}
                  />
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Smartphone className="h-5 w-5 text-purple-600" />
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Mobile Access</h4>
                      <p className="text-xs text-gray-600">Allow mobile app access</p>
                    </div>
                  </div>
                  <Checkbox
                    checked={formData.mobileAccess}
                    onCheckedChange={(checked) => updateFormData('mobileAccess', checked)}
                  />
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Key className="h-5 w-5 text-orange-600" />
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">API Access</h4>
                      <p className="text-xs text-gray-600">Generate API credentials</p>
                    </div>
                  </div>
                  <Checkbox
                    checked={formData.apiAccess}
                    onCheckedChange={(checked) => updateFormData('apiAccess', checked)}
                  />
                </div>
              </div>
            </div>

            {/* Permission Preview Section */}
            {formData.primaryRole && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">Permission Preview</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">Selected role permissions:</p>
                  <div className="flex flex-wrap gap-2">
                    {(permissionSummaries[formData.primaryRole as keyof typeof permissionSummaries] || []).map((permission) => (
                      <Badge key={permission} variant="secondary">
                        {permission}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Modal Footer */}
            <div className="flex items-center justify-between pt-6 border-t border-gray-200">
              <div className="flex items-center text-sm text-gray-600">
                <Info className="mr-2 h-4 w-4" />
                <span>
                  Questions on user permissions?{' '}
                  <button type="button" className="text-primary hover:text-primary/80 underline">
                    Learn More
                  </button>
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <UserPlus className="mr-2 h-4 w-4" />
                      Send Invitation
                    </>
                  )}
                </Button>
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <SuccessModal
        isOpen={showSuccess}
        onClose={handleCloseSuccess}
        email={formData.email}
        inviteLink="https://compliancehub.com/invite/abc123def456ghi789"
        onInviteAnother={handleInviteAnother}
      />
    </>
  )
}
// src/app/(protected)/organization-structure/components/InviteUserModal.tsx
import { useState } from 'react'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'

interface InviteUserModalProps {
  isOpen: boolean
  onClose: () => void
}

export function InviteUserModal({ isOpen, onClose }: InviteUserModalProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    department: '',
    role: '',
    dashboardType: '',
    isExternalUser: false
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
    onClose()
  }

  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        onClick={onClose}
      >
        {/* Modal */}
        <div 
          className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4"
          onClick={e => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Invite New User</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>
          
          <form id="invite-form" onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </Label>
                <Input
                  id="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleChange('firstName', e.target.value)}
                  className="w-full"
                />
              </div>
              
              <div>
                <Label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleChange('lastName', e.target.value)}
                  className="w-full"
                />
              </div>
              
              <div className="md:col-span-2">
                <Label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="w-full"
                />
              </div>
              
              <div>
                <Label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-2">
                  Department
                </Label>
                <Select value={formData.department} onValueChange={(value) => handleChange('department', value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="it">IT</SelectItem>
                    <SelectItem value="hr">HR</SelectItem>
                    <SelectItem value="legal">Legal</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="operations">Operations</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                  Role
                </Label>
                <Select value={formData.role} onValueChange={(value) => handleChange('role', value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="compliance-officer">Compliance Officer</SelectItem>
                    <SelectItem value="risk-owner">Risk Owner</SelectItem>
                    <SelectItem value="auditor">Auditor</SelectItem>
                    <SelectItem value="employee">Employee</SelectItem>
                    <SelectItem value="ciso">CISO</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="md:col-span-2">
                <Label htmlFor="dashboardType" className="block text-sm font-medium text-gray-700 mb-2">
                  Dashboard Type
                </Label>
                <Select value={formData.dashboardType} onValueChange={(value) => handleChange('dashboardType', value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Dashboard Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin Dashboard</SelectItem>
                    <SelectItem value="compliance-officer">Compliance Officer Dashboard</SelectItem>
                    <SelectItem value="auditor">Auditor Dashboard</SelectItem>
                    <SelectItem value="member">Member Dashboard</SelectItem>
                    <SelectItem value="client">Client Dashboard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="md:col-span-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="external-user"
                    checked={formData.isExternalUser}
                    onCheckedChange={(checked) => handleChange('isExternalUser', checked as boolean)}
                  />
                  <Label htmlFor="external-user" className="text-sm text-gray-700">
                    External User (Auditor/Client)
                  </Label>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  External users will automatically be directed to appropriate dashboards
                </p>
              </div>
            </div>
          </form>

          <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" form="invite-form">
              Send Invitation
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
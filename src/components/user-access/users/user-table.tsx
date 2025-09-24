// src/components/user-access/users/user-table.tsx
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search, Filter, List, ChevronLeft, ChevronRight, Edit, MoreVertical, Send, Play } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Checkbox } from '@/components/ui/checkbox'

interface UserTableProps {
  onUserClick: (userId: string) => void
}

export function UserTable({ onUserClick }: UserTableProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')

  const users = [
    {
      id: 'sarah-johnson',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@company.com',
      department: 'Compliance Team',
      role: 'Org Admin',
      roleColor: 'bg-blue-100 text-blue-800',
      status: 'Active',
      statusColor: 'bg-green-100 text-green-800',
      lastLogin: '2 hours ago',
      avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg',
      actions: ['edit']
    },
    {
      id: 'michael-chen',
      name: 'Michael Chen',
      email: 'michael.chen@company.com',
      department: 'IT Department',
      role: 'Compliance Officer',
      roleColor: 'bg-purple-100 text-purple-800',
      status: 'Active',
      statusColor: 'bg-green-100 text-green-800',
      lastLogin: '1 day ago',
      avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg',
      actions: ['edit']
    },
    {
      id: 'emily-davis',
      name: 'Emily Davis',
      email: 'emily.davis@company.com',
      department: 'Legal Department',
      role: 'Auditor',
      roleColor: 'bg-orange-100 text-orange-800',
      status: 'Invited',
      statusColor: 'bg-yellow-100 text-yellow-800',
      lastLogin: 'Never',
      avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg',
      actions: ['resend']
    },
    {
      id: 'david-wilson',
      name: 'David Wilson',
      email: 'david.wilson@company.com',
      department: 'HR Department',
      role: 'Employee',
      roleColor: 'bg-gray-100 text-gray-800',
      status: 'Suspended',
      statusColor: 'bg-red-100 text-red-800',
      lastLogin: '3 weeks ago',
      avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg',
      actions: ['reactivate']
    },
    {
      id: 'lisa-martinez',
      name: 'Lisa Martinez',
      email: 'lisa.martinez@company.com',
      department: 'Finance Department',
      role: 'Employee',
      roleColor: 'bg-gray-100 text-gray-800',
      status: 'Active',
      statusColor: 'bg-green-100 text-green-800',
      lastLogin: '5 hours ago',
      avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-6.jpg',
      actions: ['edit']
    }
  ]

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'edit':
        return <Edit className="h-4 w-4" />
      case 'resend':
        return <Send className="h-4 w-4" />
      case 'reactivate':
        return <Play className="h-4 w-4" />
      default:
        return <Edit className="h-4 w-4" />
    }
  }

  const getActionColor = (action: string) => {
    switch (action) {
      case 'edit':
        return 'text-primary-600 hover:text-primary-900'
      case 'resend':
        return 'text-primary-600 hover:text-primary-900'
      case 'reactivate':
        return 'text-green-600 hover:text-green-900'
      default:
        return 'text-primary-600 hover:text-primary-900'
    }
  }

  return (
    <div className="bg-white rounded-lg shadow mb-6">
      {/* Table Controls */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex space-x-2">
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="All Roles" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="org-admin">Org Admin</SelectItem>
                  <SelectItem value="compliance-officer">Compliance Officer</SelectItem>
                  <SelectItem value="auditor">Auditor</SelectItem>
                  <SelectItem value="employee">Employee</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="invited">Invited</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
            <Button variant="outline" size="sm">
              <List className="mr-2 h-4 w-4" />
              Bulk Actions
            </Button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <Checkbox />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                <div className="flex items-center">
                  Name
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                <div className="flex items-center">
                  Email
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role(s)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                <div className="flex items-center">
                  Last Login
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr 
                key={user.id}
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => onUserClick(user.id)}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <Checkbox onClick={(e) => e.stopPropagation()} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.department}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge className={user.roleColor}>
                    {user.role}
                  </Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge className={user.statusColor}>
                    {user.status}
                  </Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.lastLogin}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center space-x-2">
                    <button 
                      className={getActionColor(user.actions[0])}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {getActionIcon(user.actions[0])}
                    </button>
                    <button 
                      className="text-gray-400 hover:text-gray-600"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
        <div className="flex-1 flex justify-between sm:hidden">
          <Button variant="outline" size="sm">Previous</Button>
          <Button variant="outline" size="sm">Next</Button>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
              <span className="font-medium">247</span> results
            </p>
          </div>
          <div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
              <Button variant="outline" size="sm" className="rounded-r-none">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" className="rounded-none bg-primary-50 border-primary-500 text-primary-600">
                1
              </Button>
              <Button variant="outline" size="sm" className="rounded-none">
                2
              </Button>
              <Button variant="outline" size="sm" className="rounded-none">
                3
              </Button>
              <Button variant="outline" size="sm" className="rounded-l-none">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
}
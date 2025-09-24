// src/app/(protected)/organization-structure/components/HierarchyView.tsx
import { Expand, FireExtinguisher, Download, Users, Shield, FileText, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface User {
  id: string
  name: string
  email: string
  role: string
  department: string
  status: 'active' | 'pending' | 'suspended'
  lastLogin: string
  avatar: string
}

interface HierarchyViewProps {
  onUserSelect: (user: User) => void
}

const departments = [
  {
    id: 'it',
    name: 'IT Department',
    head: {
      name: 'Lisa Park',
      role: 'CISO',
      avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-7.jpg',
      reports: 12,
      controls: 8
    },
    color: 'green',
    team: [
      {
        name: 'Michael Chen',
        role: 'Risk Owner',
        avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg'
      },
      {
        name: 'James Wilson',
        role: 'IT Manager',
        avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-8.jpg'
      }
    ]
  },
  {
    id: 'legal',
    name: 'Legal Department',
    head: {
      name: 'Sarah Wilson',
      role: 'Legal Counsel',
      avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg',
      reports: 5,
      policies: 15
    },
    color: 'purple',
    team: [
      {
        name: 'Anna Davis',
        role: 'Compliance Officer',
        avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg'
      }
    ]
  },
  {
    id: 'finance',
    name: 'Finance Department',
    head: {
      name: 'Emily Rodriguez',
      role: 'CFO',
      avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-6.jpg',
      reports: 8,
      audits: 3
    },
    color: 'orange',
    team: [
      {
        name: 'Tom Anderson',
        role: 'Financial Analyst',
        avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-9.jpg'
      }
    ]
  },
  {
    id: 'operations',
    name: 'Operations',
    head: {
      name: 'David Thompson',
      role: 'COO',
      avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg',
      reports: 15,
      risks: 4
    },
    color: 'blue',
    team: [
      {
        name: 'John Doe',
        role: 'Operations Manager',
        avatar: null
      }
    ]
  }
]

function getDepartmentColors(color: string) {
  switch (color) {
    case 'green':
      return 'border-green-200'
    case 'purple':
      return 'border-purple-200'
    case 'orange':
      return 'border-orange-200'
    case 'blue':
      return 'border-blue-200'
    default:
      return 'border-gray-200'
  }
}

export function HierarchyView({ onUserSelect }: HierarchyViewProps) {
  return (
    <section className="p-8">
      {/* Org Chart Controls */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Organization Chart</h3>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="flex items-center gap-2">
              <Expand className="w-4 h-4" />
              <span>Expand All</span>
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <FireExtinguisher className="w-4 h-4" />
              <span>Collapse All</span>
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              <span>Export Chart</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Organization Hierarchy */}
      <div className="bg-white rounded-lg border border-gray-200 p-8">
        {/* CEO Level */}
        <div className="flex flex-col items-center mb-12">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 shadow-lg mb-4 max-w-sm">
            <div className="flex items-center text-white">
              <img 
                src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg" 
                alt="CEO" 
                className="w-16 h-16 rounded-full border-4 border-white mr-4" 
              />
              <div>
                <h3 className="text-xl font-bold">Robert Johnson</h3>
                <p className="text-blue-100">Chief Executive Officer</p>
                <div className="flex items-center mt-2 text-sm text-blue-100">
                  <Users className="w-4 h-4 mr-1" />
                  <span>47 Direct Reports</span>
                </div>
              </div>
            </div>
          </div>
          <div className="w-px h-8 bg-gray-300"></div>
        </div>

        {/* Department Heads Level */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {departments.map((dept) => (
            <div key={dept.id} className="flex flex-col items-center">
              <div className={`bg-white border-2 ${getDepartmentColors(dept.color)} rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer`}>
                <div className="flex items-center mb-3">
                  <img 
                    src={dept.head.avatar} 
                    alt={dept.head.name} 
                    className="w-12 h-12 rounded-full mr-3" 
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{dept.head.name}</h4>
                    <p className="text-sm text-gray-600">{dept.head.role}</p>
                  </div>
                </div>
                <div className="text-xs text-gray-500 mb-2">{dept.name}</div>
                <div className="flex items-center justify-between text-xs text-gray-600">
                  <span className="flex items-center">
                    <Users className="w-3 h-3 mr-1" />
                    {dept.head.reports} Reports
                  </span>
                  <span className="flex items-center">
                    {dept.id === 'it' && (
                      <>
                        <Shield className="w-3 h-3 mr-1" />
                        {dept.head.controls} Controls
                      </>
                    )}
                    {dept.id === 'legal' && (
                      <>
                        <FileText className="w-3 h-3 mr-1" />
                        {dept.head.policies} Policies
                      </>
                    )}
                    {dept.id === 'finance' && (
                      <>
                        <FileText className="w-3 h-3 mr-1" />
                        {dept.head.audits} Audits
                      </>
                    )}
                    {dept.id === 'operations' && (
                      <>
                        <AlertTriangle className="w-3 h-3 mr-1" />
                        {dept.head.risks} Risks
                      </>
                    )}
                  </span>
                </div>
              </div>
              <div className="w-px h-6 bg-gray-300 mt-4"></div>
              
              {/* Team Members */}
              <div className="grid grid-cols-1 gap-3 mt-6">
                {dept.team.map((member, index) => (
                  <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-center">
                    <div className="flex items-center">
                      {member.avatar ? (
                        <img 
                          src={member.avatar} 
                          alt={member.name} 
                          className="w-8 h-8 rounded-full mr-2" 
                        />
                      ) : (
                        <div className="w-8 h-8 bg-gray-300 rounded-full mr-2 flex items-center justify-center">
                          <span className="text-xs text-gray-600">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                      )}
                      <div className="text-left">
                        <div className="text-sm font-medium text-gray-900">{member.name}</div>
                        <div className="text-xs text-gray-600">{member.role}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 
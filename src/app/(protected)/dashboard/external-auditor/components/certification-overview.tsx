// src/app/(protected)/dashboard/external-dashboard/components/certification-overview.tsx
'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ShieldCheck, ShieldUser, Eye } from 'lucide-react'

interface CertificationCardProps {
  name: string
  description: string
  validUntil: string
  nextAudit: string
  status: 'Active' | 'Inactive' | 'Pending'
  icon: React.ComponentType<{ className?: string }>
  iconBgColor: string
  iconTextColor: string
}

function CertificationCard({
  name,
  description,
  validUntil,
  nextAudit,
  status,
  icon: Icon,
  iconBgColor,
  iconTextColor
}: CertificationCardProps) {
  return (
    <Card className="border border-gray-100 hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className={`w-12 h-12 ${iconBgColor} rounded-lg flex items-center justify-center`}>
            <Icon className={`${iconTextColor} w-6 h-6`} />
          </div>
          <Badge 
            variant={status === 'Active' ? 'default' : status === 'Pending' ? 'secondary' : 'destructive'}
            className={
              status === 'Active' 
                ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                : status === 'Pending'
                ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                : 'bg-red-100 text-red-800 hover:bg-red-200'
            }
          >
            {status}
          </Badge>
        </div>
        
        <h3 className="font-semibold text-gray-900 mb-2 text-lg">{name}</h3>
        <p className="text-sm text-gray-600 mb-4">{description}</p>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500 font-medium">Valid until:</span>
            <span className="font-semibold text-gray-900">{validUntil}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500 font-medium">Next audit:</span>
            <span className="font-semibold text-gray-900">{nextAudit}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

const certifications = [
  {
    name: 'ISO 27001:2022',
    description: 'Information Security Management',
    validUntil: 'Dec 15, 2025',
    nextAudit: 'Mar 20, 2024',
    status: 'Active' as const,
    icon: ShieldCheck,
    iconBgColor: 'bg-green-100',
    iconTextColor: 'text-green-600'
  },
  {
    name: 'HIPAA Compliance',
    description: 'Healthcare Data Protection',
    validUntil: 'Jun 30, 2024',
    nextAudit: 'Apr 15, 2024',
    status: 'Active' as const,
    icon: ShieldUser,
    iconBgColor: 'bg-blue-100',
    iconTextColor: 'text-blue-600'
  },
  {
    name: 'SOC 2 Type II',
    description: 'Service Organization Controls',
    validUntil: 'Sep 10, 2024',
    nextAudit: 'May 25, 2024',
    status: 'Active' as const,
    icon: Eye,
    iconBgColor: 'bg-purple-100',
    iconTextColor: 'text-purple-600'
  }
]

export function CertificationOverview() {
  return (
    <section className="animate-fade-in">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Certification Overview
        </h2>
        <p className="text-gray-600 text-base">
          Current certification status and validity periods
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certifications.map((cert, index) => (
          <CertificationCard
            key={index}
            name={cert.name}
            description={cert.description}
            validUntil={cert.validUntil}
            nextAudit={cert.nextAudit}
            status={cert.status}
            icon={cert.icon}
            iconBgColor={cert.iconBgColor}
            iconTextColor={cert.iconTextColor}
          />
        ))}
      </div>
    </section>
  )
}
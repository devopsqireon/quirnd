// src/app/(protected)/dashboard/external-dashboard/components/evidence-packages.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { FileText, ClipboardList, Users, Bug, TrendingUp, Handshake, Download, Clock, AlertTriangle } from 'lucide-react'

const evidencePackages = [
  {
    id: 1,
    title: 'Security Policies Package',
    description: 'Information security, data protection, and access control policies',
    documents: 12,
    status: 'Complete',
    statusColor: 'green',
    icon: FileText,
    iconColor: 'blue'
  },
  {
    id: 2,
    title: 'Risk Assessment Reports',
    description: 'Risk identification, analysis, and treatment plans',
    documents: 8,
    status: 'Complete',
    statusColor: 'green',
    icon: ClipboardList,
    iconColor: 'purple'
  },
  {
    id: 3,
    title: 'Training Records',
    description: 'Security awareness and compliance training documentation',
    documents: 5,
    status: 'Pending',
    statusColor: 'yellow',
    icon: Users,
    iconColor: 'orange'
  },
  {
    id: 4,
    title: 'Vulnerability Assessments',
    description: 'Technical security testing and penetration test reports',
    documents: 6,
    status: 'Complete',
    statusColor: 'green',
    icon: Bug,
    iconColor: 'red'
  },
  {
    id: 5,
    title: 'Monitoring & Metrics',
    description: 'Security monitoring logs and performance metrics',
    documents: 15,
    status: 'Complete',
    statusColor: 'green',
    icon: TrendingUp,
    iconColor: 'green'
  },
  {
    id: 6,
    title: 'Vendor Agreements',
    description: 'Third-party security agreements and assessments',
    documents: 0,
    status: 'Missing',
    statusColor: 'red',
    icon: Handshake,
    iconColor: 'indigo'
  }
]

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'Complete':
      return null
    case 'Pending':
      return <Clock className="w-3 h-3 mr-1" />
    case 'Missing':
      return <AlertTriangle className="w-3 h-3 mr-1" />
    default:
      return null
  }
}

const getStatusVariant = (status: string) => {
  switch (status) {
    case 'Complete':
      return 'default'
    case 'Pending':
      return 'secondary'
    case 'Missing':
      return 'destructive'
    default:
      return 'outline'
  }
}

export function EvidencePackages() {
  return (
    <section className="mb-8">
      <Card className="border border-gray-100">
        <CardHeader className="border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Evidence Packages</CardTitle>
              <CardDescription>Available evidence documents and audit materials</CardDescription>
            </div>
            <Button>
              <Download className="w-4 h-4 mr-2" />
              Download Evidence Bundle
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {evidencePackages.map((pkg) => {
              const IconComponent = pkg.icon
              return (
                <Card key={pkg.id} className="border border-gray-200 hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className={`w-10 h-10 bg-${pkg.iconColor}-100 rounded-lg flex items-center justify-center`}>
                        <IconComponent className={`text-${pkg.iconColor}-600`} />
                      </div>
                      <Badge variant={getStatusVariant(pkg.status)}>
                        {getStatusIcon(pkg.status)}
                        {pkg.status}
                      </Badge>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{pkg.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{pkg.description}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">{pkg.documents} documents</span>
                      {pkg.status === 'Complete' ? (
                        <Button variant="link" className="p-0 h-auto font-medium">
                          <Download className="w-3 h-3 mr-1" />
                          Download
                        </Button>
                      ) : pkg.status === 'Pending' ? (
                        <Button variant="link" className="p-0 h-auto text-gray-400 cursor-not-allowed">
                          <Clock className="w-3 h-3 mr-1" />
                          Pending
                        </Button>
                      ) : (
                        <Button variant="link" className="p-0 h-auto text-red-400 cursor-not-allowed">
                          <AlertTriangle className="w-3 h-3 mr-1" />
                          Missing
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
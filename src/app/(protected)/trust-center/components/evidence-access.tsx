// src/components/trust-center/evidence-access.tsx
import { Lock, ArrowRight, Info } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface EvidenceAccessProps {
  onRequestAccess: (type: string) => void
}

export function EvidenceAccess({ onRequestAccess }: EvidenceAccessProps) {
  const evidencePackages = [
    {
      id: 'risk-assessment',
      title: 'Risk Assessment Documentation',
      description: 'Detailed risk register, treatment plans, and assessment methodology'
    },
    {
      id: 'policies',
      title: 'Policy & Procedure Library',
      description: 'Complete set of information security policies and procedures'
    },
    {
      id: 'audit-reports',
      title: 'Audit Reports & Findings',
      description: 'Internal and external audit reports with corrective actions'
    },
    {
      id: 'technical-controls',
      title: 'Technical Security Controls',
      description: 'Network diagrams, security configurations, and control evidence'
    }
  ]

  const requestSteps = [
    {
      step: 1,
      title: 'Submit Request',
      description: 'Complete the evidence request form with your details'
    },
    {
      step: 2,
      title: 'Review Process',
      description: 'Our team reviews and validates your request (1-2 business days)'
    },
    {
      step: 3,
      title: 'Secure Delivery',
      description: 'Approved evidence is delivered via secure encrypted channels'
    }
  ]

  return (
    <section className="mb-12">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Additional Evidence Access</h2>
        <p className="text-gray-600">Request access to detailed compliance documentation and evidence packages</p>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Evidence Packages</h3>
              <div className="space-y-4">
                {evidencePackages.map((pkg) => (
                  <div key={pkg.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{pkg.title}</h4>
                      <Lock className="text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{pkg.description}</p>
                    <Button 
                      variant="ghost" 
                      className="text-blue-600 hover:text-blue-700 p-0"
                      onClick={() => onRequestAccess(pkg.id)}
                    >
                      Request Access <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Request Process</h3>
              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <div className="flex items-start space-x-3">
                  <Info className="text-blue-600 mt-1" />
                  <div>
                    <p className="text-sm text-blue-800 font-medium">Controlled Access</p>
                    <p className="text-sm text-blue-700 mt-1">
                      Additional evidence is provided under controlled access to qualified parties only. 
                      All requests are reviewed by our compliance team.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                {requestSteps.map((item) => (
                  <div key={item.step} className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">
                      {item.step}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{item.title}</p>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
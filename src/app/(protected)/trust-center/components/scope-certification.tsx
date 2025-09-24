// src/components/trust-center/scope-certification.tsx
import { Building, Server, Home, CheckCircle } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

export function ScopeCertification() {
  const servicesInScope = [
    'Threat Detection Platform',
    'Security Information and Event Management (SIEM)',
    'Incident Response Services',
    'Compliance Management Dashboard',
    'Vulnerability Assessment Tools',
    '24/7 Security Operations Center (SOC)',
    'Customer Support Portal'
  ]

  return (
    <section className="mb-12">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Scope of Certification</h2>
        <p className="text-gray-600">Details of what is covered under our ISO 27001 certification</p>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Scope Statement</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700 leading-relaxed">
                  The design, development, implementation, operation and maintenance of cloud-based security solutions 
                  and managed security services for enterprise customers, including threat detection, incident response, 
                  and compliance management platforms.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Covered Locations</h4>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <Building className="text-blue-500 mt-1" />
                    <div>
                      <p className="font-medium text-gray-900">Headquarters</p>
                      <p className="text-sm text-gray-600">123 Security Boulevard, San Francisco, CA 94105</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Server className="text-green-500 mt-1" />
                    <div>
                      <p className="font-medium text-gray-900">Primary Data Center</p>
                      <p className="text-sm text-gray-600">AWS US-West-2 (Oregon)</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Server className="text-green-500 mt-1" />
                    <div>
                      <p className="font-medium text-gray-900">Secondary Data Center</p>
                      <p className="text-sm text-gray-600">AWS US-East-1 (Virginia)</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Home className="text-orange-500 mt-1" />
                    <div>
                      <p className="font-medium text-gray-900">Remote Workforce</p>
                      <p className="text-sm text-gray-600">Distributed team members (covered under policy)</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Services in Scope</h4>
                <div className="space-y-2">
                  {servicesInScope.map((service, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="text-green-500 h-4 w-4" />
                      <span className="text-gray-700">{service}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
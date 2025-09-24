// src/components/trust-center/certification-status.tsx
import { Award, CheckCircle } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

export function CertificationStatus() {
  return (
    <section className="mb-12">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Certification Status</h2>
        <p className="text-gray-600">Current ISO 27001 certification details and validity information</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Award className="text-green-600 text-xl" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">ISO 27001:2013</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <CheckCircle className="mr-1 h-3 w-3" />
                      Active
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-sm font-medium text-gray-500">Certificate ID</span>
                <span className="text-sm text-gray-900 font-mono">ISO-27001-2024-SV-001</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-sm font-medium text-gray-500">Certification Body</span>
                <span className="text-sm text-gray-900">BSI Group</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-sm font-medium text-gray-500">Issue Date</span>
                <span className="text-sm text-gray-900">March 15, 2024</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-sm font-medium text-gray-500">Expiry Date</span>
                <span className="text-sm text-gray-900">March 14, 2027</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Certificate Validity Timeline</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Certificate Issued</p>
                  <p className="text-xs text-gray-500">March 15, 2024</p>
                </div>
              </div>
              <div className="ml-1.5 border-l-2 border-gray-200 h-8"></div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">First Surveillance Audit</p>
                  <p className="text-xs text-gray-500">September 15, 2024</p>
                </div>
              </div>
              <div className="ml-1.5 border-l-2 border-gray-200 h-8"></div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Second Surveillance Audit</p>
                  <p className="text-xs text-gray-500">March 15, 2025</p>
                </div>
              </div>
              <div className="ml-1.5 border-l-2 border-gray-200 h-8"></div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Renewal Audit Due</p>
                  <p className="text-xs text-gray-500">March 14, 2027</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
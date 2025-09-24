// src/components/trust-center/certificate-download.tsx
import { FileText, Download, Eye, FileCheck, Badge } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface CertificateDownloadProps {
  onViewCertificate: () => void
}

export function CertificateDownload({ onViewCertificate }: CertificateDownloadProps) {
  return (
    <section className="mb-12">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Certificate Access</h2>
        <p className="text-gray-600">Download and view our current ISO 27001 certification documents</p>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-4">
                <FileText className="text-red-500 text-2xl" />
                <div>
                  <h4 className="font-medium text-gray-900">ISO 27001 Certificate</h4>
                  <p className="text-sm text-gray-500">Official certificate document</p>
                </div>
              </div>
              <div className="space-y-2">
                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700" 
                  onClick={onViewCertificate}
                >
                  <Eye className="mr-2 h-4 w-4" />
                  View Certificate
                </Button>
                <Button variant="outline" className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </Button>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-4">
                <FileCheck className="text-blue-500 text-2xl" />
                <div>
                  <h4 className="font-medium text-gray-900">Certificate Annex</h4>
                  <p className="text-sm text-gray-500">Scope details and locations</p>
                </div>
              </div>
              <div className="space-y-2">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <Eye className="mr-2 h-4 w-4" />
                  View Annex
                </Button>
                <Button variant="outline" className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </Button>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-4">
                <Badge className="text-purple-500 text-2xl" />
                <div>
                  <h4 className="font-medium text-gray-900">Verification Letter</h4>
                  <p className="text-sm text-gray-500">Third-party verification</p>
                </div>
              </div>
              <div className="space-y-2">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <Eye className="mr-2 h-4 w-4" />
                  View Letter
                </Button>
                <Button variant="outline" className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
// src/components/trust-center/info-banner.tsx
import { Info, Clock, Shield, CheckCircle } from 'lucide-react'

export function InfoBanner() {
  const lastUpdated = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })

  return (
    <section className="bg-blue-50 border-b border-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-start space-x-3">
          <Info className="text-blue-600 mt-0.5 flex-shrink-0" size={20} />
          <div className="flex-1">
            <p className="text-blue-800 text-sm leading-relaxed">
              This portal provides an overview of SecureVault Technologies' ISO 27001 certification status and compliance posture. 
              All information displayed here is current as of the last update and verified by our certification body.
            </p>
            
            <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-blue-700">
              <div className="flex items-center space-x-1">
                <Clock size={14} />
                <span>Last Updated: {lastUpdated}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Shield size={14} />
                <span>Verified by BSI Group</span>
              </div>
              <div className="flex items-center space-x-1">
                <CheckCircle size={14} />
                <span>Certificate Status: Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
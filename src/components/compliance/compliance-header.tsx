'use client'

import { Download, RefreshCw, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export function ComplianceHeader() {
  return (
    <section className="mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Compliance Dashboard</h1>
          <p className="text-lg text-gray-600 mb-4">Your organization's compliance health and readiness overview.</p>
          
          {/* Role Filter Banner */}
          <div className="inline-flex items-center px-4 py-2 bg-indigo-50 border border-indigo-200 rounded-lg">
            <Shield className="text-indigo-600 mr-2 h-4 w-4" />
            <span className="text-sm font-medium text-indigo-900">You are viewing: </span>
            <Select defaultValue="compliance-officer">
              <SelectTrigger className="ml-2 bg-transparent border-none text-sm font-semibold text-indigo-900 focus:outline-none">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="compliance-officer">Compliance Officer</SelectItem>
                <SelectItem value="it-head">IT Head</SelectItem>
                <SelectItem value="hr-head">HR Head</SelectItem>
                <SelectItem value="ops-head">Operations Head</SelectItem>
                <SelectItem value="finance-head">Finance Head</SelectItem>
                <SelectItem value="legal-head">Legal Head</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="mt-4 lg:mt-0 flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
          <Button size="sm">
            <RefreshCw className="mr-2 h-4 w-4" />
            Sync Data
          </Button>
        </div>
      </div>
    </section>
  )
}
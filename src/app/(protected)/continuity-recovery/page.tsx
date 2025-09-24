// src/app/(protected)/continuity-recovery/page.tsx
"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  FileText, 
  Clock, 
  AlertTriangle, 
  TrendingUp,
  Download,
  Plus
} from "lucide-react"
import { ComplianceOverview } from "@/components/continuity-recovery/compliance-overview"
import { QuickActions } from "@/components/continuity-recovery/quick-actions"
import { ContinuityPlans } from "@/components/continuity-recovery/continuity-plans"
import { ContinuityTests } from "@/components/continuity-recovery/continuity-tests"
import { CriticalProcesses } from "@/components/continuity-recovery/critical-processes"
import { DisasterRecoveryPlans } from "@/components/continuity-recovery/disaster-recovery-plans"
import { SystemRecoveryTests } from "@/components/continuity-recovery/system-recovery-tests"
import { BackupValidation } from "@/components/continuity-recovery/backup-validation"
import { ComplianceTimeline } from "@/components/continuity-recovery/compliance-timeline"
import { RiskIntegration } from "@/components/continuity-recovery/risk-integration"

export default function ContinuityRecoveryPage() {
  const [activeTab, setActiveTab] = useState("bcp")

  return (
    <div className="flex-1 overflow-y-auto">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Continuity & Recovery</h1>
            <p className="text-gray-600 mt-1">Maintain business operations and recover IT systems during disruptions</p>
            <div className="flex items-center mt-2 text-sm text-gray-500">
              <Badge variant="secondary" className="bg-primary-100 text-primary-700 mr-2">
                ISO 27001
              </Badge>
              <span>Annex A.17 - Information Security Aspects of Business Continuity Management</span>
            </div>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" className="flex items-center">
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
            <Button className="flex items-center">
              <Plus className="mr-2 h-4 w-4" />
              Quick Actions
            </Button>
          </div>
        </div>
      </div>

      {/* Compliance Overview Cards */}
      <div className="px-6 py-6">
        <ComplianceOverview />
      </div>

      {/* Tab Navigation */}
      <div className="px-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="bcp">Business Continuity (BCP)</TabsTrigger>
            <TabsTrigger value="drp">Disaster Recovery (DRP)</TabsTrigger>
          </TabsList>

          {/* BCP Tab Content */}
          <TabsContent value="bcp" className="space-y-8 py-6">
            <QuickActions />
            <ContinuityPlans />
            <ContinuityTests />
            <CriticalProcesses />
          </TabsContent>

          {/* DRP Tab Content */}
          <TabsContent value="drp" className="space-y-8 py-6">
            <DisasterRecoveryPlans />
            <SystemRecoveryTests />
            <BackupValidation />
          </TabsContent>
        </Tabs>
      </div>

      {/* Common Sections */}
      <div className="px-6 pb-8 space-y-8">
        <ComplianceTimeline />
        <RiskIntegration />
      </div>
    </div>
  )
}
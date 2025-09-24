// src/components/internal-auditor/dashboard-header.tsx
import { Eye, CircleAlert, Lightbulb, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface DashboardHeaderProps {
  onOpenNCModal: () => void
  onOpenOFIModal: () => void
}

export function DashboardHeader({ onOpenNCModal, onOpenOFIModal }: DashboardHeaderProps) {
  return (
    <div className="bg-white border-b border-gray-200 px-8 py-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Internal Auditor Dashboard</h1>
          <p className="text-lg text-gray-600 mt-1">
            Audit your organization's ISMS with findings and evidence tracking
          </p>
          <div className="mt-3">
            <Badge variant="secondary" className="inline-flex items-center px-3 py-1">
              <Eye className="mr-2 w-4 h-4" />
              Read-only mode. You may raise NCs and OFIs.
            </Badge>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button 
            variant="destructive"
            onClick={onOpenNCModal}
            className="flex items-center"
          >
            <CircleAlert className="mr-2 w-4 h-4" />
            Raise NC
            <Badge variant="secondary" className="ml-2 text-xs bg-red-500 hover:bg-red-500">
              N
            </Badge>
          </Button>
          
          <Button 
            onClick={onOpenOFIModal}
            className="bg-yellow-600 hover:bg-yellow-700 text-white flex items-center"
          >
            <Lightbulb className="mr-2 w-4 h-4" />
            Raise OFI
            <Badge variant="secondary" className="ml-2 text-xs bg-yellow-500 hover:bg-yellow-500">
              O
            </Badge>
          </Button>
          
          <Button 
            variant="default"
            className="bg-blue-600 hover:bg-blue-700 flex items-center"
          >
            <Download className="mr-2 w-4 h-4" />
            Export Report
          </Button>
        </div>
      </div>
    </div>
  )
}
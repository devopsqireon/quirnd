// src/components/internal-auditor/auditor-sidebar.tsx
import { 
    Shield, 
    ChartLine, 
    ClipboardCheck, 
    TriangleAlert, 
    Settings, 
    FileText, 
    GraduationCap, 
    Bug, 
    FolderOpen, 
    CircleAlert, 
    Lightbulb 
  } from "lucide-react"
  import { Button } from "@/components/ui/button"
  import { Badge } from "@/components/ui/badge"
  
  interface AuditorSidebarProps {
    onOpenNCModal: () => void
    onOpenOFIModal: () => void
  }
  
  export function AuditorSidebar({ onOpenNCModal, onOpenOFIModal }: AuditorSidebarProps) {
    return (
      <div className="fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 shadow-lg z-40">
        <div className="p-6">
          {/* Logo Section */}
          <div className="flex items-center mb-8">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Shield className="text-white w-6 h-6" />
            </div>
            <div className="ml-3">
              <h1 className="text-xl font-bold text-gray-900">AuditPro</h1>
              <p className="text-sm text-gray-500">Internal Auditor</p>
            </div>
          </div>
          
          <div className="space-y-6">
            {/* Audit Dashboard Section */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                  AUDIT DASHBOARD
                </h3>
              </div>
              <nav className="space-y-1">
                <span className="bg-blue-50 text-blue-700 group flex items-center px-3 py-2 text-sm font-medium rounded-md cursor-pointer">
                  <ChartLine className="mr-3 w-4 h-4 text-blue-500" />
                  Dashboard Overview
                </span>
                <span className="text-gray-700 hover:bg-gray-50 group flex items-center px-3 py-2 text-sm font-medium rounded-md cursor-pointer">
                  <ClipboardCheck className="mr-3 w-4 h-4 text-gray-400" />
                  Audit Findings
                </span>
              </nav>
            </div>
  
            {/* ISMS Visibility Section */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                  ISMS VISIBILITY
                </h3>
              </div>
              <nav className="space-y-1">
                <span className="text-gray-700 hover:bg-gray-50 group flex items-center px-3 py-2 text-sm font-medium rounded-md cursor-pointer">
                  <TriangleAlert className="mr-3 w-4 h-4 text-gray-400" />
                  Risks Register
                  <Badge variant="secondary" className="ml-auto text-xs">
                    Read-only
                  </Badge>
                </span>
                <span className="text-gray-700 hover:bg-gray-50 group flex items-center px-3 py-2 text-sm font-medium rounded-md cursor-pointer">
                  <Settings className="mr-3 w-4 h-4 text-gray-400" />
                  Controls Library
                  <Badge variant="secondary" className="ml-auto text-xs">
                    Read-only
                  </Badge>
                </span>
                <span className="text-gray-700 hover:bg-gray-50 group flex items-center px-3 py-2 text-sm font-medium rounded-md cursor-pointer">
                  <FileText className="mr-3 w-4 h-4 text-gray-400" />
                  Policies
                  <Badge variant="secondary" className="ml-auto text-xs">
                    Read-only
                  </Badge>
                </span>
                <span className="text-gray-700 hover:bg-gray-50 group flex items-center px-3 py-2 text-sm font-medium rounded-md cursor-pointer">
                  <GraduationCap className="mr-3 w-4 h-4 text-gray-400" />
                  Training Records
                  <Badge variant="secondary" className="ml-auto text-xs">
                    Read-only
                  </Badge>
                </span>
                <span className="text-gray-700 hover:bg-gray-50 group flex items-center px-3 py-2 text-sm font-medium rounded-md cursor-pointer">
                  <Bug className="mr-3 w-4 h-4 text-gray-400" />
                  Incidents
                  <Badge variant="secondary" className="ml-auto text-xs">
                    Read-only
                  </Badge>
                </span>
                <span className="text-gray-700 hover:bg-gray-50 group flex items-center px-3 py-2 text-sm font-medium rounded-md cursor-pointer">
                  <FolderOpen className="mr-3 w-4 h-4 text-gray-400" />
                  Evidence Library
                  <Badge variant="secondary" className="ml-auto text-xs">
                    Read-only
                  </Badge>
                </span>
              </nav>
            </div>
  
            {/* Audit Actions Section */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                  AUDIT ACTIONS
                </h3>
              </div>
              <nav className="space-y-1">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-gray-700 hover:bg-gray-50 px-3 py-2 text-sm font-medium"
                  onClick={onOpenNCModal}
                >
                  <CircleAlert className="mr-3 w-4 h-4 text-red-500" />
                  Raise Non-Conformity
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-gray-700 hover:bg-gray-50 px-3 py-2 text-sm font-medium"
                  onClick={onOpenOFIModal}
                >
                  <Lightbulb className="mr-3 w-4 h-4 text-yellow-500" />
                  Raise OFI
                </Button>
              </nav>
            </div>
          </div>
        </div>
  
        {/* User Profile Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="text-white text-sm font-medium">SW</span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">Sarah Wilson</p>
              <p className="text-xs text-gray-500">Internal Auditor</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
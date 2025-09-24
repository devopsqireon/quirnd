// src/app/(protected)/evidence-library/components/EvidenceLinkingPanel.tsx
import { Button } from "@/components/ui/button";
import { AlertTriangle, Shield, FileText, Bell, GraduationCap } from "lucide-react";

interface EvidenceLinkingPanelProps {
  selectedCount: number;
}

const linkingOptions = [
  {
    id: "risks",
    title: "Risks",
    icon: AlertTriangle,
    count: 23,
    color: "blue",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    iconColor: "text-blue-600",
    textColor: "text-blue-900",
    linkColor: "text-blue-600 hover:text-blue-800",
  },
  {
    id: "controls",
    title: "Controls",
    icon: Shield,
    count: 114,
    color: "green",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    iconColor: "text-green-600",
    textColor: "text-green-900",
    linkColor: "text-green-600 hover:text-green-800",
  },
  {
    id: "policies",
    title: "Policies",
    icon: FileText,
    count: 18,
    color: "purple",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    iconColor: "text-purple-600",
    textColor: "text-purple-900",
    linkColor: "text-purple-600 hover:text-purple-800",
  },
  {
    id: "incidents",
    title: "Incidents",
    icon: Bell,
    count: 7,
    color: "red",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    iconColor: "text-red-600",
    textColor: "text-red-900",
    linkColor: "text-red-600 hover:text-red-800",
  },
  {
    id: "training",
    title: "Training",
    icon: GraduationCap,
    count: 12,
    color: "orange",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    iconColor: "text-orange-600",
    textColor: "text-orange-900",
    linkColor: "text-orange-600 hover:text-orange-800",
  },
];

export function EvidenceLinkingPanel({ selectedCount }: EvidenceLinkingPanelProps) {
  return (
    <section className="bg-white px-8 py-6 border-t border-gray-200">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Quick Link Evidence
          {selectedCount > 0 && (
            <span className="ml-2 text-sm font-normal text-gray-600">
              ({selectedCount} selected)
            </span>
          )}
        </h3>
        <p className="text-sm text-gray-600">
          Link selected evidence to compliance items for better traceability
        </p>
      </div>
      
      <div className="grid grid-cols-5 gap-4">
        {linkingOptions.map((option) => (
          <div
            key={option.id}
            className={`${option.bgColor} rounded-lg p-4 border ${option.borderColor}`}
          >
            <div className="flex items-center mb-2">
              <option.icon className={`${option.iconColor} mr-2 h-4 w-4`} />
              <span className={`text-sm font-medium ${option.textColor}`}>
                {option.title}
              </span>
            </div>
            <div className={`text-xs ${option.iconColor}`}>
              {option.count} items available
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className={`mt-2 text-xs ${option.linkColor} p-0 h-auto`}
              disabled={selectedCount === 0}
            >
              Link to {option.title}
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
}
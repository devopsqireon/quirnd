// src/app/(protected)/evidence-library/components/EvidenceHeader.tsx
import { Button } from "@/components/ui/button";
import { Info, Download, Plus } from "lucide-react";

interface EvidenceHeaderProps {
  onAddEvidence: () => void;
}

export function EvidenceHeader({ onAddEvidence }: EvidenceHeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-8 py-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Evidence Library</h1>
          <p className="text-gray-600 mb-4">Central repository of compliance evidence for ISO 27001</p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 flex items-start">
            <Info className="text-blue-500 mr-3 mt-0.5 h-4 w-4" />
            <p className="text-blue-800 text-sm">
              Upload, organize, and export evidence linked to risks, controls, policies, and audits.
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export Bundle
          </Button>
          <Button onClick={onAddEvidence} size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add Evidence
          </Button>
        </div>
      </div>
    </header>
  );
}
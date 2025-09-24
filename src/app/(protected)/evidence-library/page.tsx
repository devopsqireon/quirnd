// src/app/(protected)/evidence-library/page.tsx
"use client";

import { useState } from "react";
import { EvidenceHeader } from "./components/EvidenceHeader";
import { FilterTabs } from "./components/FilterTabs";
import { SearchAndFilters } from "./components/SearchAndFilters";
import { EvidenceStatistics } from "./components/EvidenceStatistics";
import { EvidenceTable } from "./components/EvidenceTable";
import { EvidenceLinkingPanel } from "./components/EvidenceLinkingPanel";
import { ValidationWorkflow } from "./components/ValidationWorkflow";
import { ExportBundle } from "./components/ExportBundle";
import { RecentActivity } from "./components/RecentActivity";
import { AddEvidenceModal } from "./components/AddEvidenceModal";

export default function EvidenceLibraryPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedEvidence, setSelectedEvidence] = useState<string[]>([]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div>
        <EvidenceHeader onAddEvidence={() => setIsAddModalOpen(true)} />
        
        <FilterTabs activeTab={activeTab} onTabChange={setActiveTab} />
        
        <SearchAndFilters />
        
        <EvidenceStatistics />
        
        <EvidenceTable 
          selectedEvidence={selectedEvidence}
          onSelectionChange={setSelectedEvidence}
        />
        
        <EvidenceLinkingPanel selectedCount={selectedEvidence.length} />
        
        <ValidationWorkflow />
        
        <ExportBundle />
        
        <RecentActivity />
        
        <AddEvidenceModal 
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
        />
      </div>
    </div>
  );
}
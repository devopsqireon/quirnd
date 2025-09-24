// src/app/(protected)/evidence-library/components/FilterTabs.tsx
import { Button } from "@/components/ui/button";
import { Table, Grid3x3 } from "lucide-react";

interface FilterTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: "all", label: "All Evidence" },
  { id: "risk", label: "By Risk" },
  { id: "control", label: "By Control" },
  { id: "policy", label: "By Policy" },
  { id: "incident", label: "By Incident" },
  { id: "training", label: "By Training" },
];

export function FilterTabs({ activeTab, onTabChange }: FilterTabsProps) {
  return (
    <section className="bg-white border-b border-gray-200 px-8 py-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex space-x-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? "text-primary border-primary"
                  : "text-gray-500 hover:text-gray-700 border-transparent hover:border-gray-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <Button variant="ghost" size="sm" className="px-3 py-1 bg-white rounded-md shadow-sm">
              <Table className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="px-3 py-1 text-gray-500">
              <Grid3x3 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
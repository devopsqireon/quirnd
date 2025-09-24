// src/app/(protected)/evidence-library/components/ExportBundle.tsx
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Archive, FileText } from "lucide-react";

const exportOptions = [
  { id: "control", label: "By Control Framework" },
  { id: "risk", label: "By Risk Category" },
  { id: "date", label: "By Date Range" },
];

export function ExportBundle() {
  return (
    <section className="bg-white px-8 py-6 border-t border-gray-200">
      <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-6 border border-primary/20">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Export Evidence Bundle
            </h3>
            <p className="text-gray-600 mb-4">
              Generate audit-ready evidence packages with metadata reports
            </p>
            
            <div className="grid grid-cols-3 gap-4 mb-4">
              {exportOptions.map((option) => (
                <div 
                  key={option.id}
                  className="bg-white rounded-lg p-3 border border-gray-200"
                >
                  <label className="flex items-center cursor-pointer">
                    <Checkbox className="mr-2" />
                    <span className="text-sm">{option.label}</span>
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col space-y-2">
            <Button className="px-6 py-3 bg-primary hover:bg-primary/90">
              <Archive className="mr-2 h-4 w-4" />
              Generate ZIP Bundle
            </Button>
            <Button variant="outline" className="px-6 py-3">
              <FileText className="mr-2 h-4 w-4" />
              Generate PDF Report
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
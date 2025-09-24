// src/app/(protected)/evidence-library/components/ValidationWorkflow.tsx
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Check, X } from "lucide-react";

const pendingItems = [
  {
    id: "1",
    name: "Penetration Test Report Q4 2023",
    uploader: "Mike Chen",
    uploadDate: "3 days ago",
  },
  {
    id: "2",
    name: "Updated Access Control Matrix",
    uploader: "Lisa Rodriguez",
    uploadDate: "5 days ago",
  },
];

export function ValidationWorkflow() {
  return (
    <section className="bg-gray-50 px-8 py-6">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Evidence Validation Queue</h3>
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            23 Pending Review
          </Badge>
        </div>
        
        <div className="space-y-4">
          {pendingItems.map((item) => (
            <div 
              key={item.id}
              className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-200"
            >
              <div className="flex items-center">
                <Clock className="text-yellow-600 mr-3 h-5 w-5" />
                <div>
                  <p className="font-medium text-gray-900">{item.name}</p>
                  <p className="text-sm text-gray-600">
                    Uploaded by {item.uploader} • {item.uploadDate}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                  <Check className="mr-1 h-4 w-4" />
                  Validate
                </Button>
                <Button size="sm" variant="destructive">
                  <X className="mr-1 h-4 w-4" />
                  Reject
                </Button>
              </div>
            </div>
          ))}
          
          <div className="text-center">
            <Button variant="ghost" className="text-primary hover:text-primary/80 text-sm">
              View all pending items (21 more)
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
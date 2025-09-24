// src/app/(protected)/evidence-library/components/EvidenceTable.tsx
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  FileSpreadsheet, 
  FileImage, 
  Eye, 
  Download, 
  Edit, 
  Trash2, 
  Check, 
  Clock, 
  AlertTriangle,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

interface EvidenceTableProps {
  selectedEvidence: string[];
  onSelectionChange: (selected: string[]) => void;
}

const evidenceData = [
  {
    id: "1",
    name: "ISO 27001 Information Security Policy",
    description: "Comprehensive security policy document",
    type: "Policy",
    fileType: "pdf",
    linkedItems: ["A.5.1.1", "A.5.1.2", "+3 more"],
    owner: {
      name: "Sarah Johnson",
      avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg"
    },
    uploadDate: "Jan 15, 2024",
    status: "validated",
    expiryDate: "Dec 31, 2024"
  },
  {
    id: "2",
    name: "Penetration Test Report Q4 2023",
    description: "External security assessment results",
    type: "Risk Treatment",
    fileType: "xlsx",
    linkedItems: ["RISK-001", "A.12.6.1"],
    owner: {
      name: "Mike Chen",
      avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg"
    },
    uploadDate: "Dec 28, 2023",
    status: "pending",
    expiryDate: null
  },
  {
    id: "3",
    name: "Employee Security Training Certificate",
    description: "Annual security awareness completion",
    type: "Training Log",
    fileType: "docx",
    linkedItems: ["TR-001", "A.7.2.2"],
    owner: {
      name: "Lisa Rodriguez",
      avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg"
    },
    uploadDate: "Nov 20, 2023",
    status: "validated",
    expiryDate: "Nov 20, 2024"
  },
  {
    id: "4",
    name: "Data Breach Incident Report #2023-001",
    description: "Email phishing incident documentation",
    type: "Incident Record",
    fileType: "pdf",
    linkedItems: ["INC-001", "A.16.1.4"],
    owner: {
      name: "Sarah Johnson",
      avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg"
    },
    uploadDate: "Oct 15, 2023",
    status: "validated",
    expiryDate: null
  },
  {
    id: "5",
    name: "SSL Certificate - production.company.com",
    description: "TLS certificate for production environment",
    type: "Control",
    fileType: "image",
    linkedItems: ["A.13.1.1", "A.14.1.3"],
    owner: {
      name: "Tom Wilson",
      avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg"
    },
    uploadDate: "Sep 10, 2023",
    status: "expired",
    expiryDate: "Oct 10, 2023"
  }
];

const getFileIcon = (fileType: string) => {
  switch (fileType) {
    case "pdf":
      return <FileText className="text-red-500 mr-3 h-5 w-5" />;
    case "xlsx":
      return <FileSpreadsheet className="text-green-500 mr-3 h-5 w-5" />;
    case "docx":
      return <FileText className="text-blue-500 mr-3 h-5 w-5" />;
    case "image":
      return <FileImage className="text-purple-500 mr-3 h-5 w-5" />;
    default:
      return <FileText className="text-gray-500 mr-3 h-5 w-5" />;
  }
};

const getTypeBadge = (type: string) => {
  const variants: Record<string, string> = {
    "Policy": "bg-blue-100 text-blue-800",
    "Risk Treatment": "bg-purple-100 text-purple-800",
    "Training Log": "bg-orange-100 text-orange-800",
    "Incident Record": "bg-red-100 text-red-800",
    "Control": "bg-green-100 text-green-800"
  };
  
  return (
    <Badge className={`${variants[type] || "bg-gray-100 text-gray-800"} hover:bg-current`}>
      {type}
    </Badge>
  );
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case "validated":
      return (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
          <Check className="mr-1 h-3 w-3" />
          Validated
        </Badge>
      );
    case "pending":
      return (
        <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
          <Clock className="mr-1 h-3 w-3" />
          Pending
        </Badge>
      );
    case "expired":
      return (
        <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
          <AlertTriangle className="mr-1 h-3 w-3" />
          Expired
        </Badge>
      );
    default:
      return null;
  }
};

export function EvidenceTable({ selectedEvidence, onSelectionChange }: EvidenceTableProps) {
  const [allSelected, setAllSelected] = useState(false);

  const handleSelectAll = (checked: boolean) => {
    setAllSelected(checked);
    if (checked) {
      onSelectionChange(evidenceData.map(item => item.id));
    } else {
      onSelectionChange([]);
    }
  };

  const handleSelectItem = (id: string, checked: boolean) => {
    if (checked) {
      onSelectionChange([...selectedEvidence, id]);
    } else {
      onSelectionChange(selectedEvidence.filter(item => item !== id));
      setAllSelected(false);
    }
  };

  return (
    <section className="bg-white">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-8 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <Checkbox 
                  checked={allSelected}
                  onCheckedChange={handleSelectAll}
                />
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Evidence Name
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Linked Items
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Owner
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Upload Date
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Expiry Date
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {evidenceData.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-8 py-4 whitespace-nowrap">
                  <Checkbox 
                    checked={selectedEvidence.includes(item.id)}
                    onCheckedChange={(checked) => handleSelectItem(item.id, !!checked)}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {getFileIcon(item.fileType)}
                    <div>
                      <div className="text-sm font-medium text-gray-900">{item.name}</div>
                      <div className="text-sm text-gray-500">{item.description}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getTypeBadge(item.type)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-wrap gap-1">
                    {item.linkedItems.map((linkedItem, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded"
                      >
                        {linkedItem}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img 
                      src={item.owner.avatar} 
                      alt="Owner" 
                      className="w-6 h-6 rounded-full mr-2" 
                    />
                    <span className="text-sm text-gray-900">{item.owner.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.uploadDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(item.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.expiryDate || "-"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-600">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      <div className="px-8 py-4 bg-white border-t border-gray-200 flex items-center justify-between">
        <div className="flex items-center text-sm text-gray-500">
          <span>Showing 1 to 25 of 152 results</span>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" disabled>
            <ChevronLeft className="mr-1 h-4 w-4" />
            Previous
          </Button>
          <Button variant="default" size="sm">1</Button>
          <Button variant="outline" size="sm">2</Button>
          <Button variant="outline" size="sm">3</Button>
          <span className="px-3 py-1 text-sm text-gray-500">...</span>
          <Button variant="outline" size="sm">7</Button>
          <Button variant="outline" size="sm">
            Next
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
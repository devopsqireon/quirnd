// src/app/(protected)/evidence-library/utils/index.ts
import { EvidenceItem, EvidenceStatus, EvidenceType, FileType } from "../types";

export const getFileIcon = (fileType: FileType) => {
  const iconMap = {
    pdf: { color: "text-red-500", name: "FileText" },
    xlsx: { color: "text-green-500", name: "FileSpreadsheet" },
    docx: { color: "text-blue-500", name: "FileText" },
    image: { color: "text-purple-500", name: "FileImage" },
    other: { color: "text-gray-500", name: "FileText" },
  };
  return iconMap[fileType] || iconMap.other;
};

export const getTypeBadgeVariant = (type: EvidenceType): string => {
  const variants: Record<EvidenceType, string> = {
    "Policy": "bg-blue-100 text-blue-800",
    "Risk Treatment": "bg-purple-100 text-purple-800",
    "Training Log": "bg-orange-100 text-orange-800",
    "Incident Record": "bg-red-100 text-red-800",
    "Control": "bg-green-100 text-green-800",
    "Audit Finding": "bg-yellow-100 text-yellow-800",
    "Other": "bg-gray-100 text-gray-800"
  };
  return variants[type];
};

export const getStatusInfo = (status: EvidenceStatus) => {
  const statusMap = {
    validated: {
      icon: "Check",
      className: "bg-green-100 text-green-800",
      label: "Validated"
    },
    pending: {
      icon: "Clock",
      className: "bg-yellow-100 text-yellow-800",
      label: "Pending"
    },
    expired: {
      icon: "AlertTriangle",
      className: "bg-red-100 text-red-800",
      label: "Expired"
    },
    rejected: {
      icon: "X",
      className: "bg-gray-100 text-gray-800",
      label: "Rejected"
    }
  };
  return statusMap[status];
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
};

export const isExpiringSoon = (expiryDate: string, daysThreshold = 30): boolean => {
  if (!expiryDate) return false;
  const expiry = new Date(expiryDate);
  const today = new Date();
  const diffTime = expiry.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays <= daysThreshold && diffDays > 0;
};

export const isExpired = (expiryDate: string): boolean => {
  if (!expiryDate) return false;
  const expiry = new Date(expiryDate);
  const today = new Date();
  return expiry < today;
};

export const filterEvidence = (
  evidence: EvidenceItem[],
  filters: {
    search?: string;
    type?: string;
    status?: string;
    owner?: string;
  }
): EvidenceItem[] => {
  return evidence.filter(item => {
    if (filters.search && !item.name.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    if (filters.type && filters.type !== "all" && item.type !== filters.type) {
      return false;
    }
    if (filters.status && filters.status !== "all" && item.status !== filters.status) {
      return false;
    }
    if (filters.owner && filters.owner !== "all" && item.owner.name !== filters.owner) {
      return false;
    }
    return true;
  });
};

export const sortEvidence = (
  evidence: EvidenceItem[],
  sortBy: string,
  sortOrder: "asc" | "desc" = "asc"
): EvidenceItem[] => {
  return [...evidence].sort((a, b) => {
    let aValue: any, bValue: any;
    
    switch (sortBy) {
      case "name":
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
        break;
      case "type":
        aValue = a.type;
        bValue = b.type;
        break;
      case "status":
        aValue = a.status;
        bValue = b.status;
        break;
      case "uploadDate":
        aValue = new Date(a.uploadDate);
        bValue = new Date(b.uploadDate);
        break;
      case "owner":
        aValue = a.owner.name.toLowerCase();
        bValue = b.owner.name.toLowerCase();
        break;
      default:
        return 0;
    }
    
    if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
    if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });
};
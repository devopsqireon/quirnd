// src/app/(protected)/evidence-library/types/index.ts

export interface EvidenceItem {
    id: string;
    name: string;
    description: string;
    type: EvidenceType;
    fileType: FileType;
    linkedItems: string[];
    owner: {
      name: string;
      avatar: string;
    };
    uploadDate: string;
    status: EvidenceStatus;
    expiryDate?: string;
    size?: string;
    tags?: string[];
  }
  
  export type EvidenceType = 
    | "Policy"
    | "Risk Treatment" 
    | "Control"
    | "Training Log"
    | "Incident Record"
    | "Audit Finding"
    | "Other";
  
  export type FileType = "pdf" | "xlsx" | "docx" | "image" | "other";
  
  export type EvidenceStatus = "validated" | "pending" | "expired" | "rejected";
  
  export interface ValidationItem {
    id: string;
    name: string;
    uploader: string;
    uploadDate: string;
    type: EvidenceType;
    status: "pending";
  }
  
  export interface ActivityItem {
    id: string;
    type: "validation" | "upload" | "link" | "alert" | "export";
    action: string;
    item: string;
    user?: string;
    time: string;
  }
  
  export interface LinkingOption {
    id: string;
    title: string;
    count: number;
    color: string;
    bgColor: string;
    borderColor: string;
    iconColor: string;
    textColor: string;
    linkColor: string;
  }
  
  export interface FilterOptions {
    search: string;
    type: string;
    status: string;
    owner: string;
    sortBy: string;
    sortOrder: "asc" | "desc";
  }
  
  export interface PaginationInfo {
    currentPage: number;
    totalPages: number;
    itemsPerPage: number;
    totalItems: number;
  }
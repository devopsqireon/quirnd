// File: /app/risk/asset-register/add/utils/constants.ts
import { Field, Vendor, Owner } from '../types';

export const REQUIRED_FIELDS: Field[] = [
    { key: 'name', label: 'Asset Name' },
    { key: 'assetType', label: 'Asset Type' },
    { key: 'owner', label: 'Asset Owner' },
    { key: 'classification', label: 'Classification' }
];

export const OPTIONAL_FIELDS: Field[] = [
    { key: 'description', label: 'Description' },
    { key: 'department', label: 'Department' },
    { key: 'vendor', label: 'Vendor/Provider' },
    { key: 'acquisitionDate', label: 'Acquisition Date' },
    { key: 'confidentiality', label: 'Confidentiality (1-5)' },
    { key: 'integrity', label: 'Integrity (1-5)' },
    { key: 'availability', label: 'Availability (1-5)' },
    { key: 'location', label: 'Location' },
    { key: 'serialNumber', label: 'Serial Number' },
    { key: 'tags', label: 'Tags' }
];

export const ALL_FIELDS = [...REQUIRED_FIELDS, ...OPTIONAL_FIELDS];

export const ASSET_TYPES = ['Hardware', 'Software', 'Information', 'People', 'Services'];
export const CLASSIFICATIONS = ['Public', 'Internal', 'Confidential', 'Restricted'];
export const DEPARTMENTS = ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 'IT', 'Security', 'Operations'];

export const initialVendors: Vendor[] = [
    { id: '1', name: 'Microsoft Corporation', email: 'support@microsoft.com', category: 'Software' },
    { id: '2', name: 'Amazon Web Services', email: 'support@aws.amazon.com', category: 'Cloud Services' },
    { id: '3', name: 'Dell Technologies', email: 'support@dell.com', category: 'Hardware' },
    { id: '4', name: 'Cisco Systems', email: 'support@cisco.com', category: 'Networking' },
];

export const initialOwners: Owner[] = [
    { id: '1', name: 'John Smith', email: 'john.smith@company.com', department: 'Engineering', role: 'Senior Engineer' },
    { id: '2', name: 'Sarah Johnson', email: 'sarah.j@company.com', department: 'IT', role: 'System Administrator' },
    { id: '3', name: 'Mike Wilson', email: 'mike.w@company.com', department: 'Security', role: 'Security Analyst' },
    { id: '4', name: 'Lisa Chen', email: 'lisa.chen@company.com', department: 'Operations', role: 'Operations Manager' },
];
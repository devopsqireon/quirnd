import { CiaValue, Asset } from '@/types/asset';

export const ASSET_TYPES = ['Hardware', 'Software', 'Information/Data', 'People', 'Service', 'Facility'];
export const CLASSIFICATIONS = ['Confidential', 'Restricted', 'Internal', 'Public'];
export const CIA_RATINGS: CiaValue[] = [1, 2, 3, 4, 5];
export const CIA_RATING_LABELS: { [key in CiaValue]: string } = {
    1: '1 - Very Low',
    2: '2 - Low',
    3: '3 - Medium',
    4: '4 - High',
    5: '5 - Very High',
    0: ''
};
export const STATUSES = ['Active', 'In-Repair', 'Stored', 'Decommissioned', 'Disposed'];
export const MOCK_USERS = ['Priya Singh', 'Amit Sharma', 'Riya Gupta', 'Vikram Kumar'];

export const calculateAssetValue = (c: CiaValue, i: CiaValue, a: CiaValue): number => c + i + a;

export const initialAssets: Asset[] = [
    { id: 'ASSET-0001', name: 'Production Database Server', description: 'Main server hosting the production PostgreSQL database.', assetType: 'Hardware', classification: '', owner: 'Priya Singh', custodian: 'IT Infrastructure Team', location: 'AWS ap-south-1 (Mumbai)', acquisitionDate: '2023-01-15', disposalDate: '', status: 'Active', confidentiality: 5, integrity: 5, availability: 5, assetValue: 15 },
    { id: 'ASSET-0002', name: 'Customer PII Data', description: 'Encrypted database of all customer Personally Identifiable Information.', assetType: 'Information/Data', classification: 'Confidential', owner: 'Amit Sharma', custodian: 'Engineering Team', location: 'ASSET-0001', acquisitionDate: '2022-05-20', disposalDate: '', status: 'Active', confidentiality: 5, integrity: 5, availability: 4, assetValue: 14 },
    { id: 'ASSET-0003', name: 'Finance Team Laptop - Dell XPS 15', description: 'Laptop for the Head of Finance.', assetType: 'Hardware', classification: '', owner: 'Riya Gupta', custodian: 'Riya Gupta', location: 'Noida Office, 3rd Floor', acquisitionDate: '2024-03-10', disposalDate: '', status: 'In-Repair', confidentiality: 4, integrity: 4, availability: 2, assetValue: 10 },
    { id: 'ASSET-0004', name: 'Qireon SaaS Subscription', description: 'Subscription to the Qireon compliance platform.', assetType: 'Service', classification: '', owner: 'Priya Singh', custodian: 'Compliance Team', location: 'https://qireon.com', acquisitionDate: '2024-08-01', disposalDate: '', status: 'Active', confidentiality: 2, integrity: 3, availability: 5, assetValue: 10 },
    { id: 'ASSET-0005', name: 'Source Code Repository', description: 'GitLab instance holding all proprietary source code.', assetType: 'Information/Data', classification: 'Confidential', owner: 'Amit Sharma', custodian: 'Engineering Team', location: 'gitlab.com', acquisitionDate: '2021-01-01', disposalDate: '', status: 'Active', confidentiality: 5, integrity: 5, availability: 4, assetValue: 14 },
    { id: 'ASSET-0006', name: 'Office 365 Tenant', description: 'Company-wide Microsoft Office 365 subscription.', assetType: 'Service', classification: '', owner: 'Vikram Kumar', custodian: 'IT Helpdesk', location: 'cloud.microsoft.com', acquisitionDate: '2020-01-01', disposalDate: '', status: 'Active', confidentiality: 4, integrity: 4, availability: 5, assetValue: 13 },
    { id: 'ASSET-0007', name: 'HR Employee Records', description: 'Digital records of all employees.', assetType: 'Information/Data', classification: 'Confidential', owner: 'Riya Gupta', custodian: 'HR Team', location: 'SharePoint', acquisitionDate: '2020-01-01', disposalDate: '', status: 'Active', confidentiality: 5, integrity: 5, availability: 3, assetValue: 13 },
    { id: 'ASSET-0008', name: 'Main Office Firewall', description: 'Palo Alto firewall for the Noida office.', assetType: 'Hardware', classification: '', owner: 'Vikram Kumar', custodian: 'IT Infrastructure Team', location: 'Noida Office, Server Room', acquisitionDate: '2022-11-01', disposalDate: '', status: 'Active', confidentiality: 3, integrity: 4, availability: 5, assetValue: 12 },
    { id: 'ASSET-0009', name: 'Marketing Website', description: 'Public facing website.', assetType: 'Software', classification: 'Public', owner: 'Priya Singh', custodian: 'Marketing Team', location: 'Vercel', acquisitionDate: '2023-02-01', disposalDate: '', status: 'Active', confidentiality: 1, integrity: 3, availability: 5, assetValue: 9 },
    { id: 'ASSET-0010', name: 'CEO - Priya Singh', description: 'Top management role.', assetType: 'People', classification: '', owner: 'Priya Singh', custodian: 'Board', location: 'Noida Office', acquisitionDate: '2020-01-01', disposalDate: '', status: 'Active', confidentiality: 5, integrity: 5, availability: 5, assetValue: 15 },
    { id: 'ASSET-0011', name: 'Noida Office Facility', description: 'Main office building.', assetType: 'Facility', classification: '', owner: 'Vikram Kumar', custodian: 'Admin Team', location: 'Noida, Sector 62', acquisitionDate: '2019-01-01', disposalDate: '', status: 'Active', confidentiality: 2, integrity: 3, availability: 5, assetValue: 10 },
];

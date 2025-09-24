export type CiaValue = 1 | 2 | 3 | 4 | 5 | 0;

export type Asset = {
    id: string;
    name: string;
    description: string;
    assetType: 'Hardware' | 'Software' | 'Information/Data' | 'People' | 'Service' | 'Facility' | '';
    classification: 'Confidential' | 'Restricted' | 'Internal' | 'Public' | '';
    owner: string;
    custodian: string;
    location: string;
    acquisitionDate: string;
    disposalDate: string;
    status: 'Active' | 'In-Repair' | 'Stored' | 'Decommissioned' | 'Disposed' | '';
    confidentiality: CiaValue;
    integrity: CiaValue;
    availability: CiaValue;
    assetValue: number; // Will be calculated: C + I + A
    associatedRisks?: {
        id: string;
        title: string; // Added title for display
        status: 'Open' | 'Mitigated' | 'Closed';
      }[];
};

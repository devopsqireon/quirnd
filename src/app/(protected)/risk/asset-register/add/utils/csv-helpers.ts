// File: /app/risk/asset-register/add/utils/csv-helpers.ts
import { CSVColumn } from '../types';

export const getSmartSuggestion = (columnName: string): string | null => {
    const name = columnName.toLowerCase().trim();
    const patterns = {
        'name': ['name', 'asset_name', 'assetname', 'title', 'device_name', 'system_name'],
        'assetType': ['type', 'asset_type', 'assettype', 'category', 'kind'],
        'owner': ['owner', 'asset_owner', 'responsible', 'manager', 'contact'],
        'classification': ['classification', 'class', 'level', 'sensitivity'],
        'description': ['description', 'desc', 'details', 'notes'],
        'department': ['department', 'dept', 'business_unit', 'division'],
        'vendor': ['vendor', 'provider', 'supplier', 'manufacturer', 'company'],
        'acquisitionDate': ['acquisition_date', 'purchase_date', 'bought_date', 'date_purchased', 'acquired'],
        'location': ['location', 'site', 'datacenter', 'building', 'office'],
        'serialNumber': ['serial', 'serial_number', 'sn', 'serial_no'],
        'confidentiality': ['confidentiality', 'conf', 'c_rating'],
        'integrity': ['integrity', 'int', 'i_rating'],
        'availability': ['availability', 'avail', 'a_rating'],
        'tags': ['tags', 'labels', 'categories']
    };

    for (const [field, patternList] of Object.entries(patterns)) {
        if (patternList.some(pattern => name.includes(pattern))) {
            return field;
        }
    }
    return null;
};

export const downloadTemplate = () => {
    const headers = [
        'Asset Name',
        'Asset Type',
        'Asset Owner',
        'Classification',
        'Description',
        'Department',
        'Vendor/Provider',
        'Acquisition Date',
        'Confidentiality',
        'Integrity',
        'Availability',
        'Location',
        'Tags'
    ];
    
    const sampleData = [
        'Customer Database Server',
        'Hardware',
        'john.smith@company.com',
        'Confidential',
        'Primary customer data storage system',
        'Engineering',
        'Dell Technologies',
        '2024-01-15',
        '5',
        '4',
        '5',
        'Data Center A',
        'production, customer-facing, critical'
    ];
    
    const csvContent = [headers, sampleData].map(row => 
        row.map(field => `"${field}"`).join(',')
    ).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'asset-register-template.csv';
    a.click();
    window.URL.revokeObjectURL(url);
};
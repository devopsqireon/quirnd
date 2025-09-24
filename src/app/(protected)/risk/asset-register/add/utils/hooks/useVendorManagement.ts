// File: /app/risk/asset-register/add/utils/hooks/useVendorManagement.ts
import { useState, useCallback } from 'react';
import { Vendor } from '../../types';
import { initialVendors } from '../constants';

export const useVendorManagement = () => {
    const [vendors, setVendors] = useState<Vendor[]>(initialVendors);
    const [editingVendor, setEditingVendor] = useState<Vendor | null>(null);
    const [showVendorModal, setShowVendorModal] = useState(false);

    const handleSaveVendor = useCallback((vendor: Vendor) => {
        if (editingVendor) {
            setVendors(prev => prev.map(v => v.id === vendor.id ? vendor : v));
        } else {
            setVendors(prev => [...prev, vendor]);
        }
        setEditingVendor(null);
        setShowVendorModal(false);
        return vendor.id;
    }, [editingVendor]);

    const openAddVendorModal = useCallback(() => {
        setEditingVendor(null);
        setShowVendorModal(true);
    }, []);

    const openEditVendorModal = useCallback((vendor: Vendor) => {
        setEditingVendor(vendor);
        setShowVendorModal(true);
    }, []);

    const closeVendorModal = useCallback(() => {
        setShowVendorModal(false);
        setEditingVendor(null);
    }, []);

    return {
        vendors,
        editingVendor,
        showVendorModal,
        handleSaveVendor,
        openAddVendorModal,
        openEditVendorModal,
        closeVendorModal
    };
};
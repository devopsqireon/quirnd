// File: /app/risk/asset-register/add/utils/hooks/useOwnerManagement.ts
import { useState, useCallback } from 'react';
import { Owner } from '../../types';
import { initialOwners } from '../constants';

export const useOwnerManagement = () => {
    const [owners, setOwners] = useState<Owner[]>(initialOwners);
    const [editingOwner, setEditingOwner] = useState<Owner | null>(null);
    const [showOwnerModal, setShowOwnerModal] = useState(false);

    const handleSaveOwner = useCallback((owner: Owner) => {
        if (editingOwner) {
            setOwners(prev => prev.map(o => o.id === owner.id ? owner : o));
        } else {
            setOwners(prev => [...prev, owner]);
        }
        setEditingOwner(null);
        setShowOwnerModal(false);
        return owner.id;
    }, [editingOwner]);

    const openAddOwnerModal = useCallback(() => {
        setEditingOwner(null);
        setShowOwnerModal(true);
    }, []);

    const openEditOwnerModal = useCallback((owner: Owner) => {
        setEditingOwner(owner);
        setShowOwnerModal(true);
    }, []);

    const closeOwnerModal = useCallback(() => {
        setShowOwnerModal(false);
        setEditingOwner(null);
    }, []);

    return {
        owners,
        editingOwner,
        showOwnerModal,
        handleSaveOwner,
        openAddOwnerModal,
        openEditOwnerModal,
        closeOwnerModal
    };
};
'use client'

import React, { createContext, useState, useContext, ReactNode } from 'react'

// Define the shape of a single breadcrumb item
interface Breadcrumb {
    label: string;
    href?: string; // Optional link for parent crumbs
}

// Define the shape of the context's value
interface PageHeaderContextType {
    breadcrumbs: Breadcrumb[];
    setBreadcrumbs: (breadcrumbs: Breadcrumb[]) => void;
}

// Create the context with a default value
const PageHeaderContext = createContext<PageHeaderContextType | undefined>(undefined);

// Create a Provider component to wrap our app with
export const PageHeaderProvider = ({ children }: { children: ReactNode }) => {
    const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>([]);

    return (
        <PageHeaderContext.Provider value={{ breadcrumbs, setBreadcrumbs }}>
            {children}
        </PageHeaderContext.Provider>
    );
};

// Create a custom hook for easy access to the context
export const usePageHeader = () => {
    const context = useContext(PageHeaderContext);
    if (context === undefined) {
        throw new Error('usePageHeader must be used within a PageHeaderProvider');
    }
    return context;
};

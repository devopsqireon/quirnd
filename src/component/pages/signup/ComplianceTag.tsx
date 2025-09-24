import React from 'react';

interface ComplianceTagProps {
  children: React.ReactNode;
}

const ComplianceTag: React.FC<ComplianceTagProps> = ({ children }) => (
    <span className="bg-white/50 text-xs border-1 border-gray-300 font-medium px-3 py-1 rounded-full">
        {children}
    </span>
);

export default ComplianceTag;

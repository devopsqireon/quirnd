import React from 'react';

interface SecurityFeatureProps {
  icon: React.ReactNode;
  children: React.ReactNode;
}

const SecurityFeature: React.FC<SecurityFeatureProps> = ({ icon, children }) => (
    <div className="flex items-center bg-white/50 text-xs border-1 border-gray-300 text-xs font-medium px-3 py-1.5 rounded-md">
        {icon}
        <span className="ml-2">{children}</span>
    </div>
);

export default SecurityFeature;

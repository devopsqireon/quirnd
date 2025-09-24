import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface FeatureListItemProps {
  children: React.ReactNode;
}

const FeatureListItem: React.FC<FeatureListItemProps> = ({ children }) => (
    <li className="flex items-center">
        <CheckCircle2 size={22} className="mr-3 flex-shrink-0" />
        <span>{children}</span>
    </li>
);

export default FeatureListItem;

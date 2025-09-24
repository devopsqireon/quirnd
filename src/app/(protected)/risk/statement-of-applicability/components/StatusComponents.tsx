// Save as: /app/risk/statement-of-applicability/components/StatusComponents.tsx
'use client'

import React from 'react';
import { 
    CheckCircle, 
    XCircle, 
    MinusCircle, 
    Clock,
    Calendar,
    Eye,
    AlertTriangle,
    Target
} from 'lucide-react';

// Status Badge Component
interface StatusBadgeProps {
    status: string | null;
    isApplicable?: boolean | null;
    priority?: string | null;
    size?: 'sm' | 'md' | 'lg';
    showPriority?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ 
    status, 
    isApplicable, 
    priority, 
    size = 'md',
    showPriority = true
}) => {
    const getStatusConfig = (status: string | null, isApplicable?: boolean | null) => {
        if (isApplicable === false) {
            return {
                bg: 'bg-gray-100',
                text: 'text-gray-800',
                icon: MinusCircle,
                dot: 'bg-gray-500',
                label: 'Not Applicable'
            };
        }

        switch (status) {
            case 'Implemented':
                return {
                    bg: 'bg-green-100',
                    text: 'text-green-800',
                    icon: CheckCircle,
                    dot: 'bg-green-500',
                    label: 'Implemented'
                };
            case 'In Progress':
                return {
                    bg: 'bg-blue-100',
                    text: 'text-blue-800',
                    icon: Clock,
                    dot: 'bg-blue-500',
                    label: 'In Progress'
                };
            case 'Planned':
                return {
                    bg: 'bg-amber-100',
                    text: 'text-amber-800',
                    icon: Calendar,
                    dot: 'bg-amber-500',
                    label: 'Planned'
                };
            case 'Under Review':
                return {
                    bg: 'bg-purple-100',
                    text: 'text-purple-800',
                    icon: Eye,
                    dot: 'bg-purple-500',
                    label: 'Under Review'
                };
            case 'Not Implemented':
                return {
                    bg: 'bg-red-100',
                    text: 'text-red-800',
                    icon: XCircle,
                    dot: 'bg-red-500',
                    label: 'Not Implemented'
                };
            default:
                return {
                    bg: 'bg-gray-100',
                    text: 'text-gray-800',
                    icon: MinusCircle,
                    dot: 'bg-gray-500',
                    label: 'Not Set'
                };
        }
    };

    const config = getStatusConfig(status, isApplicable);
    const sizeClasses = {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-2.5 py-0.5 text-xs',
        lg: 'px-3 py-1 text-sm'
    };
    
    return (
        <div className="flex items-center gap-1">
            <span className={`inline-flex items-center rounded-full font-medium ${config.bg} ${config.text} ${sizeClasses[size]}`}>
                <span className={`w-2 h-2 rounded-full ${config.dot} mr-1.5`}></span>
                {config.label}
            </span>
            {showPriority && priority && (priority === 'Critical' || priority === 'High') && (
                <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium ${
                    priority === 'Critical' ? 'bg-red-100 text-red-800' : 'bg-orange-100 text-orange-800'
                }`}>
                    {priority}
                </span>
            )}
        </div>
    );
};

// Priority Selector Component
interface PrioritySelectorProps {
    value: string | null;
    onChange: (value: string | null) => void;
    size?: 'sm' | 'md';
    disabled?: boolean;
}

export const PrioritySelector: React.FC<PrioritySelectorProps> = ({ 
    value, 
    onChange, 
    size = 'md',
    disabled = false
}) => {
    const options = [
        { value: null, label: 'Not Set', color: 'text-gray-500' },
        { value: 'Low', label: 'Low', color: 'text-green-600' },
        { value: 'Medium', label: 'Medium', color: 'text-yellow-600' },
        { value: 'High', label: 'High', color: 'text-orange-600' },
        { value: 'Critical', label: 'Critical', color: 'text-red-600' }
    ];

    const sizeClass = size === 'sm' ? 'text-xs p-1' : 'text-sm p-2';

    return (
        <select
            value={value || ''}
            onChange={(e) => onChange(e.target.value || null)}
            disabled={disabled}
            className={`border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white ${sizeClass} ${
                disabled ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : ''
            }`}
        >
            {options.map((option) => (
                <option key={option.value || 'null'} value={option.value || ''}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};

// Implementation Status Selector Component
interface StatusSelectorProps {
    value: string | null;
    onChange: (value: string | null) => void;
    isApplicable: boolean | null;
    size?: 'sm' | 'md';
}

export const StatusSelector: React.FC<StatusSelectorProps> = ({ 
    value, 
    onChange, 
    isApplicable, 
    size = 'md'
}) => {
    const options = [
        { value: null, label: 'Not Set' },
        { value: 'Implemented', label: 'Implemented' },
        { value: 'In Progress', label: 'In Progress' },
        { value: 'Planned', label: 'Planned' },
        { value: 'Under Review', label: 'Under Review' },
        { value: 'Not Implemented', label: 'Not Implemented' }
    ];

    const sizeClass = size === 'sm' ? 'text-xs p-1' : 'text-sm p-2';
    const disabled = isApplicable === false;

    return (
        <select
            value={value || ''}
            onChange={(e) => onChange(e.target.value || null)}
            disabled={disabled}
            className={`border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white ${sizeClass} ${
                disabled ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : ''
            }`}
        >
            {options.map((option) => (
                <option key={option.value || 'null'} value={option.value || ''}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};

// Applicability Toggle Component
interface ApplicabilityToggleProps {
    value: boolean | null;
    onChange: (value: boolean | null) => void;
    size?: 'sm' | 'md';
}

export const ApplicabilityToggle: React.FC<ApplicabilityToggleProps> = ({ 
    value, 
    onChange, 
    size = 'md'
}) => {
    const options = [
        { value: null, label: 'To Be Determined', color: 'text-gray-600' },
        { value: true, label: 'Applicable', color: 'text-blue-600' },
        { value: false, label: 'Not Applicable', color: 'text-gray-600' }
    ];

    const sizeClass = size === 'sm' ? 'text-xs p-1' : 'text-sm p-2';

    return (
        <select
            value={value === null ? '' : value.toString()}
            onChange={(e) => {
                const val = e.target.value;
                onChange(val === '' ? null : val === 'true');
            }}
            className={`border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white ${sizeClass}`}
        >
            {options.map((option) => (
                <option key={option.value?.toString() || 'null'} value={option.value?.toString() || ''}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};

// Progress Indicator Component
interface ProgressIndicatorProps {
    current: number;
    total: number;
    label?: string;
    showPercentage?: boolean;
    size?: 'sm' | 'md' | 'lg';
    color?: 'blue' | 'green' | 'yellow' | 'red';
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
    current,
    total,
    label,
    showPercentage = true,
    size = 'md',
    color = 'blue'
}) => {
    const percentage = total > 0 ? Math.round((current / total) * 100) : 0;
    
    const sizeClasses = {
        sm: 'h-1',
        md: 'h-2',
        lg: 'h-3'
    };

    const colorClasses = {
        blue: 'bg-blue-600',
        green: 'bg-green-600',
        yellow: 'bg-yellow-600',
        red: 'bg-red-600'
    };

    return (
        <div className="space-y-1">
            {(label || showPercentage) && (
                <div className="flex justify-between items-center text-sm">
                    {label && <span className="text-slate-600">{label}</span>}
                    {showPercentage && (
                        <span className="text-slate-500 font-medium">
                            {current}/{total} ({percentage}%)
                        </span>
                    )}
                </div>
            )}
            <div className={`w-full bg-slate-200 rounded-full ${sizeClasses[size]}`}>
                <div 
                    className={`${colorClasses[color]} ${sizeClasses[size]} rounded-full transition-all duration-300`}
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
};

// Risk Level Indicator Component
interface RiskLevelIndicatorProps {
    level: 'Low' | 'Medium' | 'High' | 'Critical';
    size?: 'sm' | 'md';
    showLabel?: boolean;
}

export const RiskLevelIndicator: React.FC<RiskLevelIndicatorProps> = ({ 
    level, 
    size = 'md', 
    showLabel = true 
}) => {
    const configs = {
        Low: { color: 'bg-green-500', textColor: 'text-green-700' },
        Medium: { color: 'bg-yellow-500', textColor: 'text-yellow-700' },
        High: { color: 'bg-orange-500', textColor: 'text-orange-700' },
        Critical: { color: 'bg-red-500', textColor: 'text-red-700' }
    };

    const config = configs[level];
    const dotSize = size === 'sm' ? 'w-2 h-2' : 'w-3 h-3';

    return (
        <div className="flex items-center gap-2">
            <div className={`${dotSize} rounded-full ${config.color}`} />
            {showLabel && (
                <span className={`text-${size === 'sm' ? 'xs' : 'sm'} font-medium ${config.textColor}`}>
                    {level}
                </span>
            )}
        </div>
    );
};
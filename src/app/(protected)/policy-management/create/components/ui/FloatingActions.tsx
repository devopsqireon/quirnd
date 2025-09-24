// File: /app/policy-management/create/components/ui/FloatingActions.tsx

import { Eye, MessageCircleQuestionMark, Save } from 'lucide-react';
import React from 'react';

interface FloatingActionsProps {
    onSave: () => void;
    onPreview: () => void;
    onHelp: () => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({
    onSave,
    onPreview,
    onHelp
}) => {
    return (
        <div className="fixed bottom-6 right-6 space-y-3">
            <button 
                onClick={onSave}
                className="w-12 h-12 bg-green-600 hover:bg-qireon-700 text-white rounded-full shadow-lg flex items-center justify-center transition-colors group"
                title="Save Draft"
            >
               <Save />
            </button>
            
            <button 
                onClick={onPreview}
                className="w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center transition-colors group"
                title="Preview Policy"
            >
              <Eye />
            </button>
            
            <button 
                onClick={onHelp}
                className="w-12 h-12 bg-gray-600 hover:bg-green-700 text-white rounded-full shadow-lg flex items-center justify-center transition-colors group"
                title="Help & Support"
            >
                <MessageCircleQuestionMark />
            </button>
        </div>
    );
};
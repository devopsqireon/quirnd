// /app/risk/treatment-plans/create/components/shared/JustificationTextarea.tsx
import React from 'react';

interface JustificationTextareaProps {
  value: string;
  onChange: (value: string) => void;
}

export const JustificationTextarea: React.FC<JustificationTextareaProps> = ({
  value,
  onChange,
}) => {
  return (
    <div className="mt-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Justification for Selected Strategy
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        placeholder="Provide justification for why this treatment strategy is appropriate..."
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  );
};
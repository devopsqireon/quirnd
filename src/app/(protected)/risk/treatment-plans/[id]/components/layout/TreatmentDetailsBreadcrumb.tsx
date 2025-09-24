// /app/risk/treatment-plan/[id]/components/layout/TreatmentDetailsBreadcrumb.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRightIcon, HomeIcon } from 'lucide-react';
import { useTreatmentDetails } from '../../contexts/TreatmentDetailsContext';

export const TreatmentDetailsBreadcrumb: React.FC = () => {
  const { treatmentDetails } = useTreatmentDetails();

  return (
    <nav className="py-4">
      <ol className="flex items-center space-x-2 text-sm">
        <li>
          <Link href="/dashboard" className="text-gray-500 hover:text-gray-700 flex items-center">
            <HomeIcon className="w-4 h-4" />
          </Link>
        </li>
        <li>
          <ChevronRightIcon className="w-4 h-4 text-gray-400" />
        </li>
        <li>
          <Link href="/risk" className="text-gray-500 hover:text-gray-700">
            Risk Management
          </Link>
        </li>
        <li>
          <ChevronRightIcon className="w-4 h-4 text-gray-400" />
        </li>
        <li>
          <Link href="/risk/treatment-plan" className="text-gray-500 hover:text-gray-700">
            Treatment Plans
          </Link>
        </li>
        <li>
          <ChevronRightIcon className="w-4 h-4 text-gray-400" />
        </li>
        <li className="text-gray-900 font-medium truncate max-w-md">
          {treatmentDetails?.treatmentPlan.title || 'Treatment Plan Details'}
        </li>
      </ol>
    </nav>
  );
};
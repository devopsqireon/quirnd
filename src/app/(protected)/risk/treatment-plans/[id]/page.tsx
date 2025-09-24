// /app/risk/treatment-plan/[id]/page.tsx
'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { TreatmentDetailsProvider } from './contexts/TreatmentDetailsContext';
import { TreatmentDetailsLayout } from './components/layout/TreatmentDetailsLayout';
import { TreatmentDetailsContent } from './components/TreatmentDetailsContent';

export default function TreatmentDetailsPage() {
  const params = useParams();
  const treatmentId = params?.id as string;

  return (
    <TreatmentDetailsProvider treatmentId={treatmentId}>
      <TreatmentDetailsLayout>
        <TreatmentDetailsContent />
      </TreatmentDetailsLayout>
    </TreatmentDetailsProvider>
  );
}
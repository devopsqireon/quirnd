// /app/risk/treatment-plans/create/page.tsx
'use client';

import React from 'react';
import { TreatmentPlanWizard } from './components/wizard/TreatmentPlanWizard';
import { PageHeader } from './components/layout/PageHeader';
import { Breadcrumb } from './components/layout/Breadcrumb';

export default function CreateTreatmentPlanPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <Breadcrumb />
        <PageHeader />
        <TreatmentPlanWizard />
      </div>
    </div>
  );
}
// src/app/(protected)/incident-management/layout.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Incident Management | Qireon Compliance Suite',
  description: 'Report, track, and resolve information security incidents in compliance with ISO 27001 Clause 16.',
};

export default function IncidentManagementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="incident-management-layout">
      {children}
    </div>
  );
}
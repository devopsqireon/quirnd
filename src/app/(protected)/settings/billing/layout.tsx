// src/app/(protected)/settings/layout.tsx

"use client";

import { Toaster } from "@/components/ui/sonner";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50">
      {children}
      <Toaster />
    </div>
  );
}
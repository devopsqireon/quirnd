// src/components/dashboard/member/DashboardHeader.tsx
import React from 'react';

export default function DashboardHeader() {
  return (
    <section id="hero-section" className="mb-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">My Dashboard</h1>
        <p className="text-xl text-gray-600 mb-6">Your compliance tasks and progress in one place.</p>
      </div>
    </section>
  );
}
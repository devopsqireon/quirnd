// /app/risk/treatment-plans/create/components/layout/PageHeader.tsx
import React from 'react';
import { Shield, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const PageHeader = () => {
  const router = useRouter();

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </button>
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Shield className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Create Treatment Plan</h1>
              <p className="text-gray-600">Define comprehensive risk treatment strategies</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
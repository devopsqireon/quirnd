// File: /app/policy-management/view/components/ui/PolicyBreadcrumb.tsx

'use client'

import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';

interface PolicyBreadcrumbProps {
  policyTitle: string;
}

export function PolicyBreadcrumb({ policyTitle }: PolicyBreadcrumbProps) {
  const breadcrumbs = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Policy Management', href: '/policy-management' },
    { name: 'Policies', href: '/policy-management/policies' },
    { name: policyTitle, href: '#', current: true }
  ];

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-4 py-3">
          <ol className="flex items-center space-x-4">
            {breadcrumbs.map((item, index) => (
              <li key={item.name}>
                <div className="flex items-center">
                  {index === 0 && item.icon && (
                    <item.icon className="flex-shrink-0 h-5 w-5 text-gray-400 mr-2" />
                  )}
                  {index > 0 && (
                    <ChevronRight className="flex-shrink-0 h-5 w-5 text-gray-400 mr-4" />
                  )}
                  {item.current ? (
                    <span className="text-sm font-medium text-gray-900 truncate max-w-xs">
                      {item.name}
                    </span>
                  ) : (
                    <Link
                      href={item.href}
                      className="text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </nav>
  );
}

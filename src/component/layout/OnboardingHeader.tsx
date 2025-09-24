'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, Home } from 'lucide-react';
import QireonLogo from '@/component/logo';
import { Button } from '../ui/Button';

// Define the props for the component
// The 'variant' prop will control which button is displayed
interface OnboardingHeaderProps {
  variant?: 'logout' | 'home';
}

export default function OnboardingHeader({ variant = 'logout' }: OnboardingHeaderProps) {
  const router = useRouter();

  const handleLogout = () => {
    router.push('/logout');
  };

  const handleGoHome = () => {
    // This should point to your main marketing website URL
    router.push('/'); 
  };

  return (
    <header className="w-full bg-white py-4 border-b border-gray-300">
      <div className="flex max-w-3xl mx-auto justify-between items-center">
        <div className="mb-0">
          <a href="/" aria-label="Back to homepage">
            <QireonLogo variant="monochrome" />
          </a>
        </div>
        <div>
          {/* Conditionally render the button based on the variant prop */}
          {variant === 'logout' ? (
            <Button
              variant="outline"
              onClick={handleLogout}
              className="inline-block rounded-full font-medium text-sm transition-colors duration-200 border-2 border-red-400 text-red-500 hover:bg-red-600 hover:text-white"
            >
              <span className="flex items-center">
                <LogOut className="h-4 w-4 mr-1.5" /> Logout
              </span>
            </Button>
          ) : (
            <Button
              variant="outline"
              onClick={handleGoHome}
              className="inline-block rounded-full font-medium text-sm transition-colors duration-200 border-2 border-gray-400 text-gray-600 hover:bg-gray-600 hover:text-white"
            >
              <span className="flex items-center">
                <Home className="h-4 w-4 mr-1.5" /> Back to Home
              </span>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
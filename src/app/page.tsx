// src/app/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

// This is a placeholder for your actual auth check.
// It should be the same function you use in your main layout.
const checkUserAuthentication = (): boolean => {
  // In a real app, you'd check for a cookie.
  // For example: return document.cookie.includes('your_auth_token');
  return false; // Default to not authenticated
};

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    if (checkUserAuthentication()) {
      router.push('/dashboard');
    } else {
      router.push('/login');
    }
  }, [router]);

  // Display a loading indicator while the redirect is happening.
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#d4fff1] to-[#FFDFC0]">
      <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
    </div>
  );
}
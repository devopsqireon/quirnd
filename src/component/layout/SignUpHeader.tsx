import React from 'react';
import Link from 'next/link';
import QireonLogo from '@/component/logo'; // Adjust the import path as needed

/**
 * A header component specifically for the initial sign-up pages.
 * It includes the logo and a link back to the main marketing site.
 */
export default function SignUpHeader() {
  return (
    <header className="w-full bg-white py-4 border-b border-gray-300">
      <div className='max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2'>
      {/* Left side: Logo */}
      
      <div className="flex flex-col justify-center">
        <div className="mb-0">
          <Link href="/" aria-label="Back to homepage">
            <QireonLogo variant="monochrome" />
          </Link>
        </div>
      </div>
      
      {/* Right side: Link back to marketing site */}
      <div className="flex flex-col justify-center items-start lg:items-end">
        <p className="text-sm text-gray-600">
          Not ready to sign up?{' '}
          <Link href="/" className="font-semibold text-blue-600 hover:underline">
            See what we offer
          </Link>
        </p>
      </div>

      </div>


    </header>
  );
}

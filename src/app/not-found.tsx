'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Home, SearchX, ArrowLeft } from 'lucide-react';

// Assuming you have a generic layout, otherwise these are fine
import OnboardingFooter from '@/component/layout/OnboardingFooter';
import SignUpHeader from '@/component/layout/SignUpHeader';

// To maintain styling consistency, we can define button styles
const buttonStyles = {
    primary: "inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors",
    secondary: "inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
};

export default function NotFoundPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
            <SignUpHeader />

            <main className="flex-grow flex items-center justify-center text-center p-8">
                <div className="max-w-md w-full">
                                        <div className="flex justify-center text-blue-500 mb-6">
                        <SearchX className="w-20 h-20" strokeWidth={1.5} />
                    </div>
                    
                    <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 tracking-tight">
                        Page Not Found
                    </h1>
                    
                    <p className="mt-4 text-lg text-gray-600">
                        Oops! The page you were looking for doesn't exist. It might have been moved or deleted.
                    </p>

                    <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button
                            onClick={() => router.back()}
                            className={buttonStyles.secondary}
                        >
                            <ArrowLeft className="mr-2 h-5 w-5" />
                            Go Back
                        </button>
                        <Link href="/" className={buttonStyles.primary}>
                            <Home className="mr-2 h-5 w-5" />
                            Go to Homepage
                        </Link>
                    </div>
                </div>
            </main>

            <OnboardingFooter />
        </div>
    );
}
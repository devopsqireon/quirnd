import React from 'react';
import Link from 'next/link';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import QireonLogo from '@/component/logo';
import OnboardingFooter from '@/component/layout/OnboardingFooter';

/**
 * A confirmation page shown to the user after they have successfully logged out.
 */
export default function LogoutPage() {
    return (
        <div 
            className="min-h-screen flex flex-col items-center justify-center px-4 py-6 font-sans bg-gradient-to-br from-[#d4fff1] to-[#FFDFC0]"
        >
            <header className="w-full max-w-2xl mx-auto absolute top-0">
                <div className="flex py-8 justify-center">
                    <a href="/" aria-label="Back to homepage">
                        <QireonLogo variant='monochrome' />
                    </a>
                </div>
            </header>

            <main className="w-full max-w-md mx-auto flex-grow flex flex-col justify-center text-center">
                <div className="bg-white/80 backdrop-blur-sm p-8 md:p-12 rounded-lg shadow-lg">
                    <div className="inline-block bg-green-100 p-4 rounded-full border border-green-200 mb-6">
                        <CheckCircle2 className="h-10 w-10 text-green-600" />
                    </div>
                    
                    <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                        You have been successfully logged out.
                    </h1>
                    
                    <p className="text-sm text-gray-600 mb-8">
                        Thank you for using Qireon. Your session has been securely terminated.
                    </p>

                    <Link
                        href="/login"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-2"
                    >
                        <span>Log In Again</span>
                        <ArrowRight size={20} />
                    </Link>
                </div>
            </main>

            <div className="w-full">
                <OnboardingFooter />
            </div>
        </div>
    );
}

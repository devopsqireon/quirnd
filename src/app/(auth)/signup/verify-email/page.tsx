'use client';

import React from 'react';
import QireonLogo from '@/component/logo';
import FeatureListItem from '@/component/pages/signup/FeatureListItem';
import VerifyEmailForm from '@/component/forms/VerifyEmailForm';
import SignUpHeader from '@/component/layout/SignUpHeader';

export default function VerifyPage() {
    return (
        <div className="min-h-screen flex flex-col items-center font-sans bg-gradient-to-br from-[#d4fff1] to-[#FFDFC0]">
            <SignUpHeader/>
            <main className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 overflow-hidden py-8">
                {/* Left Side: Consistent Branding */}
                <div className="p-8 ps-0 flex-col justify-center hidden lg:flex">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-8">
                        Just a Quick Check for Your 
                            
                            Secure Workspace.
                        </h1>
                        
                        <ul className="space-y-4">
                            <FeatureListItem>Secure your account access</FeatureListItem>
                            <FeatureListItem>Confirm your ownership of the email</FeatureListItem>
                            <FeatureListItem>Unlock your compliance dashboard</FeatureListItem>
                        </ul>

                        <div className="mt-12 p-4 bg-white/50 border-l-4 border-cyan-400 rounded-r-lg">
                            <p className="text-sm italic">
                                Verifying your email is a crucial step in ensuring the integrity and security of your Qireon workspace.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Side: Verification Form */}
                <VerifyEmailForm />
            </main>

            <footer className="w-full max-w-6xl mx-auto mt-8 text-center text-black text-sm">
                 <div className="flex justify-center items-center space-x-4 mb-2">
                    <a href="#" className="hover:underline">Privacy Policy</a>
                    <a href="#" className="hover:underline">Terms of Use</a>
                    <a href="#" className="hover:underline">Support</a>
                    <a href="#" className="hover:underline">Contact us</a>
                </div>
                <p>&copy; 2025 Qireon Ltd. All rights reserved.</p>
            </footer>
        </div>
    );
}
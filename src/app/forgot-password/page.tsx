'use client';

import React, { useState } from 'react';
import QireonLogo from '@/component/logo';
import OnboardingFooter from '@/component/layout/OnboardingFooter';
import OnboardingHeader from '@/component/layout/OnboardingHeader';
import { RequestResetStep, CheckEmailStep } from '@/component/forms/forgot-password/Steps';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [isEmailSubmitted, setIsEmailSubmitted] = useState(false);

    const handleEmailSubmit = (submittedEmail: string) => {
        setEmail(submittedEmail);
        setIsEmailSubmitted(true);
        // Here you would trigger the backend API call to send the reset email
    };

    return (
        <div className="min-h-screen flex flex-col items-center font-sans bg-gradient-to-br from-[#d4fff1] to-[#FFDFC0]">
           
        <OnboardingHeader />

            <main className="w-full max-w-md mx-auto flex-grow flex flex-col justify-center">
                {!isEmailSubmitted ? (
                    <RequestResetStep onSubmit={handleEmailSubmit} />
                ) : (
                    <CheckEmailStep email={email} />
                )}
            </main>

            <div className="w-full">
                <OnboardingFooter />
            </div>
        </div>
    );
}

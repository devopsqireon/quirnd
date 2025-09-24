'use client';

import React, { useState } from 'react';
import QireonLogo from '@/component/logo';
import OnboardingFooter from '@/component/layout/OnboardingFooter';
import EmailStep from '@/component/forms/login/EmailStep';
import PasswordStep from '@/component/forms/login/PasswordStep';
import OtpStep from '@/component/forms/login/OtpStep';
import OnboardingHeader from '@/component/layout/OnboardingHeader';

export default function LoginPage() {
    const [step, setStep] = useState('email'); // Can be 'email', 'password', or 'otp'
    const [email, setEmail] = useState('');

    const handleEmailSubmit = (submittedEmail: string) => {
        setEmail(submittedEmail);
        setStep('password');
    };

    const handlePasswordSubmit = () => {
        setStep('otp');
    };

    const handleBack = () => {
        setStep('email');
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center font-sans bg-gradient-to-br from-[#d4fff1] to-[#FFDFC0]">

            <OnboardingHeader variant="home" />

            <main className="w-full max-w-3xl mx-auto flex-grow flex flex-col justify-center">
                {step === 'email' && <EmailStep onSubmit={handleEmailSubmit} />}
                {step === 'password' && <PasswordStep email={email} onBack={handleBack} onSubmit={handlePasswordSubmit} />}
                {step === 'otp' && <OtpStep email={email} />}
            </main>

            <div className="w-full">
                <OnboardingFooter />
            </div>
        </div>
    );
}
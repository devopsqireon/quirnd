import React from 'react';
import QireonLogo from '@/component/logo';
import OnboardingFooter from '@/component/layout/OnboardingFooter';
import OnboardingHeader from '@/component/layout/OnboardingHeader';
import ResetPasswordForm from '@/component/forms/forgot-password/ResetPasswordForm';

export default function ResetPasswordPage() {
    return (
        <div className="min-h-screen flex flex-col items-center font-sans bg-gradient-to-br from-[#d4fff1] to-[#FFDFC0]">
           
        <OnboardingHeader />

            <main className="w-full max-w-md mx-auto flex-grow flex flex-col justify-center">
                <ResetPasswordForm />
            </main>

            <div className="w-full">
                <OnboardingFooter />
            </div>
        </div>
    );
}

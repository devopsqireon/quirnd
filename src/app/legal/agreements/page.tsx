import React from 'react';
import QireonLogo from '@/component/logo';
import DpaForm from '@/component/forms/DpaForm';
import { Button } from '@/component/ui/Button';
import { LogOut } from 'lucide-react';
import Footer from '@/component/footer';
import OnboardingHeader from '@/component/layout/OnboardingHeader';
import OnboardingFooter from '@/component/layout/OnboardingFooter';
import OnboardingStepper from '@/component/ui/OnboardingStepper';

// This is the main page component for the DPA agreement.
// It uses a single-column layout for the central form content.
export default function AgreementsPage() {
    return (
        <div className="min-h-screen flex flex-col items-center font-sans bg-gradient-to-br from-[#d4fff1] to-[#FFDFC0]">
           
        <OnboardingHeader />

            <main className="w-full max-w-3xl mx-auto flex-grow flex flex-col justify-center pt-8">
                {/* The DPA form is the central focus of this page */}
                <OnboardingStepper currentStep="Agreement" />
                <DpaForm />
            </main>

            <OnboardingFooter/>
        </div>
    );
}
import React from 'react';
import QireonLogo from '@/component/logo';
import FeatureListItem from '@/component/pages/signup/FeatureListItem';
import OnboardingSummary from '@/component/forms/OnboardingSummary';
import { Button } from '@/component/ui/Button';
import { LogOut } from 'lucide-react';
import OnboardingHeader from '@/component/layout/OnboardingHeader';
import OnboardingStepper from '@/component/ui/OnboardingStepper';
import OnboardingFooter from '@/component/layout/OnboardingFooter';

// This is the main page component for the onboarding summary.
// It wraps the final summary in the consistent onboarding layout.
export default function OnboardingSummaryPage() {
    return (
        <div className="min-h-screen flex flex-col items-center font-sans bg-gradient-to-br from-[#d4fff1] to-[#FFDFC0]">
           
        <OnboardingHeader />
           
            <main className="w-full max-w-3xl mx-auto flex-grow flex flex-col justify-center">
                {/* Left Side: Branding and Context - Updated for completion */}
               
                <OnboardingStepper currentStep="Summary" />  
                <OnboardingSummary />
            </main>

            <OnboardingFooter />
        </div>
    );
}
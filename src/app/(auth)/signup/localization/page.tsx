import React from 'react';
import QireonLogo from '@/component/logo';
import FeatureListItem from '@/component/pages/signup/FeatureListItem';
import LocalizationForm from '@/component/forms/LocalizationForm';
import { Button } from '@/component/ui/Button';
import { LogOut } from 'lucide-react';
import OnboardingFooter from '@/component/layout/OnboardingFooter';
import OnboardingStepper from '@/component/ui/OnboardingStepper';
import OnboardingHeader from '@/component/layout/OnboardingHeader';

// This is the main page component for the localization setup.
// It wraps the final step in the consistent onboarding layout.
export default function LocalizationPage() {
    return (
        <div className="min-h-screen flex flex-col items-center font-sans bg-gradient-to-br from-[#d4fff1] to-[#FFDFC0]">
           
        <OnboardingHeader />
            

            <main className="w-full max-w-3xl mx-auto flex-grow flex flex-col justify-center">
               
           
            <OnboardingStepper currentStep="Region" />         
            <LocalizationForm />
            </main>
            <OnboardingFooter />
        </div>
    );
}
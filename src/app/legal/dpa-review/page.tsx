import React from 'react';
import QireonLogo from '@/component/logo';
import DpaReview from '@/component/forms/DpaReview';
import { Button } from '@/component/ui/Button';
import { LogOut } from 'lucide-react';
import Footer from '@/component/footer';
import OnboardingHeader from '@/component/layout/OnboardingHeader';
import OnboardingFooter from '@/component/layout/OnboardingFooter';
import OnboardingStepper from '@/component/ui/OnboardingStepper';

// This is the main page component for reviewing the generated DPA.
// It uses the same single-column layout as the previous step.
export default function DpaReviewPage() {
    return (
        <div className="min-h-screen flex flex-col items-center font-sans bg-gradient-to-br from-[#d4fff1] to-[#FFDFC0]">
           
        <OnboardingHeader />

            <main className="w-full max-w-3xl mx-auto flex-grow flex pt-8 flex-col justify-center">
                {/* The DPA review and download form */}
                <OnboardingStepper currentStep="Agreement" />
                <DpaReview />
            </main>
           
            <OnboardingFooter/>
        </div>
    );
}

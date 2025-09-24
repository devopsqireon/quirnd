import React from 'react';
import QireonLogo from '@/component/logo';
import FeatureListItem from '@/component/pages/signup/FeatureListItem';
import ProfileDetailsForm from '@/component/forms/ProfileDetailsForm';
import { Button } from '@/component/ui/Button';
import { LogOut } from 'lucide-react';
import OnboardingStepper from '@/component/ui/OnboardingStepper';
import OnboardingHeader from '@/component/layout/OnboardingHeader';
import OnboardingFooter from '@/component/layout/OnboardingFooter';

// This is the main page component for the user profile details step.
// It follows the same two-column layout as the NameWorkspacePage.
export default function ProfileDetailsPage() {
    return (
        <div className="min-h-screen flex flex-col items-center font-sans bg-gradient-to-br from-[#d4fff1] to-[#FFDFC0]">
           
        <OnboardingHeader />
            <main className="w-full max-w-3xl mx-auto flex-grow flex flex-col justify-center">
                
          
                   
                <OnboardingStepper currentStep="Profile" />
                    
                <ProfileDetailsForm />
            </main>

            <OnboardingFooter />
        </div>
    );
}
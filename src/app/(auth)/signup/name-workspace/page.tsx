import React from 'react';
import NameWorkspaceForm from '@/component/forms/NameWorkspaceForm';
import OnboardingStepper from '@/component/ui/OnboardingStepper';
import OnboardingHeader from '@/component/layout/OnboardingHeader';
import OnboardingFooter from '@/component/layout/OnboardingFooter';

export default function NameWorkspacePage() {
    return (
        <div className="min-h-screen flex flex-col items-center font-sans bg-gradient-to-br from-[#d4fff1] to-[#FFDFC0]">
           
           <OnboardingHeader />

            <main className="w-full max-w-3xl mx-auto flex-grow flex flex-col justify-center">
                    
                    <OnboardingStepper currentStep="Workspace" />
               
               
                <NameWorkspaceForm />
            </main>

            <OnboardingFooter />
        </div>
    );
}

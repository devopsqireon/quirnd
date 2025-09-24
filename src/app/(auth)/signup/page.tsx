'use client';

import React from 'react';
import { ShieldCheck, Server } from 'lucide-react';
import QireonLogo from '@/component/logo';
import FeatureListItem from '@/component/pages/signup/FeatureListItem';
import ComplianceTag from '@/component/pages/signup//ComplianceTag';
import SecurityFeature from '@/component/pages/signup/SecurityFeature';
import SignupForm from '@/component/forms/SignupForm';
import OnboardingFooter from '@/component/layout/OnboardingFooter';
import SignUpHeader from '@/component/layout/SignUpHeader';

export default function SignupPage() {
    return (
        <div className="min-h-screen flex flex-col items-center font-sans bg-gradient-to-br from-[#d4fff1] to-[#FFDFC0]">
            <SignUpHeader/>

            <main className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 overflow-hidden py-8">
                {/* Left Side: Branding and Features */}
                <div className="p-8 ps-0 flex flex-col justify-between">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-8">
                            Automate Compliance.
                            <br />
                            Eliminate Risk.
                        </h1>
                        
                        <ul className="space-y-4">
                            <FeatureListItem>Stay Audit-Ready 24/7 with real-time monitoring</FeatureListItem>
                            <FeatureListItem>Generate Reports in Minutes, Not Weeks</FeatureListItem>
                            <FeatureListItem>Integrate Seamlessly with Your Existing Stack</FeatureListItem>
                        </ul>
                    </div>

                    <div>
                        <p className="text-sm mb-3">Trusted Compliance Standards</p>
                        <div className="flex flex-wrap gap-2 mb-6">
                            <ComplianceTag>SOC 2</ComplianceTag>
                            <ComplianceTag>ISO 27001</ComplianceTag>
                            <ComplianceTag>GDPR</ComplianceTag>
                        </div>
                        
                        <p className="text-sm mb-3">Security You Can Trust</p>
                        <div className="flex flex-wrap gap-3">
                            <SecurityFeature icon={<ShieldCheck size={14} />}>AES-256 Encryption</SecurityFeature>
                            <SecurityFeature icon={<Server size={14} />}>AWS Hosted</SecurityFeature>
                        </div>

                        <div className="mt-8 p-4 bg-white/50 border-l-4 border-cyan-400 rounded-r-lg">
                            <p className="text-sm italic">
                                “Developed with security by design” — aligned with ISO 27001:2022 best practices from day one.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Side: Signup Form */}
                <SignupForm />
            </main>

           <OnboardingFooter/>
        </div>
    );
}   
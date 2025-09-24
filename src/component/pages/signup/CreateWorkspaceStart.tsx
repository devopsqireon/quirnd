'use client';

import React from 'react';
import { ShieldCheck, Server } from 'lucide-react';
import QireonLogo from '@/component/logo';
import FeatureListItem from './FeatureListItem';
import ComplianceTag from './ComplianceTag';
import SecurityFeature from './SecurityFeature';
import SignupForm from '@/component/forms/SignupForm';

export default function SignupPage() {
    return (
        <div 
            className="min-h-screen flex flex-col items-center justify-center px-4 py-6 font-sans bg-gradient-to-br from-[#d4fff1] to-[#FFDFC0]"
        >
            <header className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 overflow-hidden">
                <div className="flex py-8 flex-col justify-center">
                    <div className="mb-0">
                        <a href="/" aria-label="Back to homepage">
                            <QireonLogo variant='monochrome' />
                        </a>
                    </div>
                </div>
                <div className="flex flex-col py-8 justify-center">
                    <p className="text-sm text-end text-gray-600">
                        Not ready to sign up?{' '}
                        <a href="/" className="font-semibold text-blue-600 hover:underline">
                            See what we offer
                        </a>
                    </p>
                </div>
            </header>

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

            <footer className="w-full max-w-6xl mx-auto mt-8 text-center text-black text-sm">
                <div className="flex justify-center items-center space-x-4 mb-2">
                    <a href="#" className="hover:underline">Privacy Policy</a>
                    <a href="#" className="hover:underline">Terms of Use</a>
                    <a href="#" className="hover:underline">Support</a>
                    <a href="#" className="hover:underline">Contact us</a>
                </div>
                <p>&copy; 2025 Qireon Ltd. All rights reserved.</p>
            </footer>
        </div>
    );
}
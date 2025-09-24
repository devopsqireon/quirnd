import React from 'react';
import QireonLogo from '@/component/logo';
import FeatureListItem from '@/component/pages/signup/FeatureListItem';
import CreateWorkspaceForm from '@/component/forms/CreateWorkspaceForm';
import SignUpHeader from '@/component/layout/SignUpHeader';

export default function CreateWorkspacePage() {
    return (
        <div className="min-h-screen flex flex-col items-center font-sans bg-gradient-to-br from-[#d4fff1] to-[#FFDFC0]">
            <SignUpHeader/>

            <main className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 overflow-hidden py-8">
                {/* Left Side: Branding and Context */}
                <div className="p-8 ps-0 flex-col justify-center hidden lg:flex">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-8">
                            A Smarter Beginning
                            <br />
                            for Your Compliance.
                        </h1>
                        
                        <ul className="space-y-4">
                            <FeatureListItem>Automate audits and evidence collection</FeatureListItem>
                            <FeatureListItem>Track risks with intelligent insights</FeatureListItem>
                            <FeatureListItem>Move faster with an audit-ready foundation</FeatureListItem>
                        </ul>

                        <div className="mt-12 p-4 bg-white/50 border-l-4 border-cyan-400 rounded-r-lg">
                            <p className="text-sm italic">
                                No complexity. No noise. Just clear, secure control—starting now. Your workspace is one click away.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Side: The Form */}
                <CreateWorkspaceForm />
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
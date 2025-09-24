'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle2, Rocket, UserCircle, Pencil, Globe, Clock, Building, User, Loader2 } from 'lucide-react';
import { Button } from '../ui/Button';

// --- Onboarding Summary Component ---

export default function OnboardingSummary() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    // This data would typically come from a state management solution (Context, Zustand, etc.)
    const summaryData = {
        workspaceUrl: 'acme.qireon.com',
        profile: {
            name: 'Sofia Hernandez',
            company: 'Acme Inc.',
            role: 'Admin',
        },
        team: [
            { email: 'jane.doe@example.com', role: 'Admin' },
            { email: 'john.smith@example.com', role: 'Officer' },
        ],
        localization: {
            hosting: 'European Union (EU)',
            timezone: 'Europe/Berlin (GMT+2)',
        },
    };

    const handleLaunch = () => {
        setIsLoading(true);
        setTimeout(() => {
            router.push('/legal/agreements');
        }, 1500);
    };

    return (
        <div className="w-full bg-white/80 backdrop-blur-sm rounded-lg shadow-lg flex flex-col">
            <div className="text-center mb-6 pt-8">
                <div className="inline-block bg-green-100 rounded-full p-4">
                    <CheckCircle2 className="w-16 h-16 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold mt-4">Your Qireon Workspace is ready!</h2>
                <p className="text-blue-600 font-medium mt-1">{summaryData.workspaceUrl}</p>
            </div>
            
            <div className="p-8 space-y-6">      

                <h1 className="text-2xl font-semibold text-gray-900 mb-1">
                Review & Confirm Your Configuration
                    </h1>
                    <p className="text-sm text-gray-600">
                    If something doesn’t look right, you can edit before confirming.
                    </p>

                {/* Profile Details */}
                <div className="summary-section">
                    <div className="flex justify-between items-center mb-3">
                        <h4 className="font-semibold flex items-center"><Building size={16} className="mr-2 text-gray-400"/>Company & Profile</h4>
                        <a href="/signup/profile" className="edit-link flex items-center text-blue-500">
                            <Pencil size={12} className="mr-1"/>Edit
                        </a>
                    </div>
                    <div className="text-sm space-y-2 pl-6">
                        <p><strong className="font-medium text-gray-500">Full Name:</strong> {summaryData.profile.name}</p>
                        <p><strong className="font-medium text-gray-500">Company:</strong> {summaryData.profile.company}</p>
                        <p><strong className="font-medium text-gray-500">Your Role:</strong> {summaryData.profile.role}</p>
                    </div>
                </div>

                {/* Team Members Invited */}
                <div className="summary-section">
                    <div className="flex justify-between items-center mb-3">
                        <h4 className="font-semibold flex items-center"><User size={16} className="mr-2 text-gray-400"/>Team Members Invited</h4>
                        <a href="/signup/team-setup" className="edit-link flex items-center text-blue-500">
                            <Pencil size={12} className="mr-1"/>Edit
                        </a>
                    </div>
                    <div className="space-y-3 pl-6">
                        {summaryData.team.map(member => (
                            <div key={member.email} className="flex items-center">
                                <UserCircle className="w-8 h-8 text-gray-300 mr-3" />
                                <span className="text-sm mr-3">{member.email}</span>
                                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">{member.role}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Localization */}
                <div className="summary-section">
                     <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold flex justify-between items-center me-2"><Globe size={16} className="mr-2"/>Localization</h4>
                        <a href="/signup/localization" className="edit-link text-blue-500 flex items-center">
                            <Pencil size={12} className="mr-1"/>Edit
                        </a>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pl-6">
                        <div>
                            <h5 className="text-xs font-medium text-gray-500 mb-2">Hosting Preference</h5>
                            <span className="bg-gray-100 text-gray-800 text-sm px-4 py-2 rounded-full inline-block">
                                {summaryData.localization.hosting}
                            </span>
                        </div>
                        <div>
                            <h5 className="text-xs font-medium text-gray-500 mb-2">Time Zone</h5>
                            <span className="bg-gray-100 text-gray-800 text-sm px-4 py-2 rounded-full inline-block">
                                {summaryData.localization.timezone.replace(/_/g, ' ')}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex-row justify-center items-center gap-4 p-6 bg-gray-100 rounded-b-lg border-t border-gray-300">
          <div className='flex justify-center'>  
            
            <Button 
                onClick={handleLaunch}
                disabled={isLoading}
                className="w-auto"
            >
                {isLoading ? (
                    <>
                        <Loader2 className="animate-spin" size={20} />
                        <span>Launching...</span>
                    </>
                ) : (
                    <>
                        <Rocket className="w-5 h-5 me-4" />
                        Launch My Workspace
                    </>
                )}
            </Button>
            </div>
            <p className="mt-4 text-sm text-gray-500 text-center">You can revisit these settings anytime from your workspace admin panel.</p>

            {/* Simple CSS for reusable classes */}
            <style jsx>{`
                .summary-section {
                    border-bottom: 1px solid #e5e7eb;
                    padding-bottom: 1.5rem;
                }
                .summary-section:last-child {
                    border-bottom: none;
                    padding-bottom: 0;
                }
                .edit-link {
                    display: inline-flex;
                    align-items: center;
                    font-size: 0.875rem;
                    color: #3b82f6; /* text-blue-500 */
                    font-weight: 500;
                    transition: color 0.2s;
                }
                .edit-link:hover {
                    color: #1d4ed8; /* text-blue-700 */
                }
            `}</style>
            </div>
        </div>
    );
}

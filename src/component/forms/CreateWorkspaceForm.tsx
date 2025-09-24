'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/Button';
import { Rocket, Info } from 'lucide-react';

export default function CreateWorkspaceForm() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleCreateWorkspace = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate the workspace creation process
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Navigate to the next step after creation
        router.push('/signup/name-workspace');
    };

    return (
        <div className="w-full bg-white/80 backdrop-blur-sm p-8 rounded-lg shadow-lg flex flex-col justify-center">
            <div className="max-w-md mx-auto w-full">
                <div className="flex justify-start mb-4">
                    <div className="bg-cyan-100 p-3 rounded-full border border-cyan-200">
                        <Rocket className="h-6 w-6 text-cyan-700" />
                    </div>
                </div>

                <p className="text-left text-gray-600 mb-6">
                    Verified as:{' '}
                    <span className="font-medium text-gray-800">your-email@example.com</span>{' '}
                    
                </p>

                <div className="text-left mb-6">
                    <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                    Prepare to Launch Your Workspace
                    </h1>
                    <p className="text-sm text-gray-600">
                        From automated audits to intelligent risk tracking, everything is designed to help you move — faster, sharper, and audit-ready.
                    </p>
                </div>

                <form onSubmit={handleCreateWorkspace} className="w-full mx-auto">
                    <Button type="submit" className="w-full" isLoading={isLoading}>
                        {!isLoading && "Let's Create My Workspace"}
                    </Button>
                </form>

                <div className="mt-6 bg-blue-50/80 text-blue-900 text-xs rounded-lg p-4 flex items-start space-x-3 border border-blue-200">
                    <Info className="w-4 h-4 mt-0.5 text-blue-600 shrink-0" />
                    <p>
                        Your workspace will be ready in seconds. You can customize your subdomain and other settings in the next step.
                    </p>
                </div>
            </div>
        </div>
    );
}
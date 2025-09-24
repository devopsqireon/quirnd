'use client';

import React, { useState, forwardRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Check, ChevronDown, DollarSign, Euro, Link, Loader2, ArrowRight, Globe,ArrowLeft } from 'lucide-react';
import { Button } from '../ui/Button';

// --- Reusable Components ---

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}
const Select = forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>((props, ref) => {
    const commonSelectStyle = "w-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all text-black appearance-none";
    return (
        <div className="relative">
            <select ref={ref} {...props} className={`${commonSelectStyle} ${props.className}`}>{props.children}</select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
        </div>
    );
});
Select.displayName = 'Select';


// --- Localization Form Component ---

export default function LocalizationForm() {
    const router = useRouter();
    const [hostingRegion, setHostingRegion] = useState('EU');
    const [timezone, setTimezone] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Auto-detect timezone on component mount
    useEffect(() => {
        const detectedTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        setTimezone(detectedTimezone);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate final API call
        setTimeout(() => {
            // On success, route to the main application dashboard
            router.push('/signup/summary'); 
        }, 2000);
    };

    const activeRegionStyle = "ring-2 ring-blue-500 bg-blue-50 border-blue-400";
    const inactiveRegionStyle = "border-gray-200 hover:border-blue-400 hover:bg-gray-50";
// Handle back navigation
const handleBack = () => {
    router.back(); // Navigates to the previous page in the history stack
};
    return (
        <div className="w-full bg-white/80 backdrop-blur-sm rounded-lg shadow-lg flex flex-col justify-center">
            {/* Header */}
            <div className="mb-8 px-8 pt-8">
                 <p className="my-3 flex">
                        <span className="text-gray-500 items-center flex"><Link size={16} className="mr-1" />   Workspace URL:</span>{' '}
                            <span className="text-blue-600 font-medium ms-2">
                               acme.qireon.com
                            </span>
                        </p>
            </div>
       
            <div className='px-8'>
                <div className="mb-4 flex">
                    <div className="bg-cyan-100 p-3 rounded-full border border-cyan-200">
                      <Globe className="h-6 w-6 text-cyan-700" />
                    </div>
                </div>

                <div className="text-left mb-8">
                    <h1 className="text-2xl font-semibold text-gray-900 mb-1">
                    Choose Your Region & Timezone
                    </h1>
                    <p className="text-sm text-gray-600">
                    Selecting your region ensures your data is hosted in compliance with local regulations. Setting your timezone helps us keep reports, tasks, and notifications accurate.
                    </p>
                </div>

                </div>


            
            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Hosting Preference */}
                <div className='px-8'>
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">Your Data Hosting Preference</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* EU Option */}
                        <div onClick={() => setHostingRegion('EU')} className={`relative p-4 rounded-xl flex-1 border cursor-pointer transition-all ${hostingRegion === 'EU' ? activeRegionStyle : inactiveRegionStyle}`}>
                            {hostingRegion === 'EU' && (
                                <div className="absolute -top-2 -right-2 bg-blue-600 rounded-full p-1 shadow">
                                    <Check className="w-4 h-4 text-white" />
                                </div>
                            )}
                            <div className="flex items-center mb-2">
                                <h4 className="font-semibold text-gray-900">European Union (EU)</h4>
                            </div>
                            <p className="text-sm text-gray-600">
                                Hosted in Germany. Best for GDPR and EU-based clients.
                            </p>
                        </div>
                        {/* US Option */}
                        <div onClick={() => setHostingRegion('US')} className={`relative p-4 rounded-xl flex-1 border cursor-pointer transition-all ${hostingRegion === 'US' ? activeRegionStyle : inactiveRegionStyle}`}>
                             {hostingRegion === 'US' && (
                                <div className="absolute -top-2 -right-2 bg-blue-600 rounded-full p-1 shadow">
                                    <Check className="w-4 h-4 text-white" />
                                </div>
                            )}
                            <div className="flex items-center mb-2">
                                <h4 className="font-semibold text-gray-900">United States (US)</h4>
                            </div>
                            <p className="text-sm text-gray-600">
                                Ideal for North American operations. Fast access for the Americas.
                            </p>
                        </div>
                        {/* Asia Pacific Option */}
                        <div onClick={() => setHostingRegion('APAC')} className={`relative p-4 rounded-xl flex-1 border cursor-pointer transition-all ${hostingRegion === 'APAC' ? activeRegionStyle : inactiveRegionStyle}`}>
                             {hostingRegion === 'APAC' && (
                                <div className="absolute -top-2 -right-2 bg-blue-600 rounded-full p-1 shadow">
                                    <Check className="w-4 h-4 text-white" />
                                </div>
                            )}
                            <div className="flex items-center mb-2">
                                <h4 className="font-semibold text-gray-900">Asia Pacific (APAC)</h4>
                            </div>
                            <p className="text-sm text-gray-600">
                                Hosted in Singapore. Optimized for teams across Asia and Australia.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Timezone Settings */}
                <div className='px-8'>
                    <h3 className="text-lg font-semibold mb-3 text-gray-800">Timezone Settings</h3>
                    <Select value={timezone} onChange={(e) => setTimezone(e.target.value)}>
                        {/* A small subset of timezones for demonstration */}
                        <option value={timezone} disabled>Detected: {timezone.replace(/_/g, ' ')}</option>
                        <option value="Europe/London">Europe/London (GMT+1)</option>
                        <option value="Europe/Berlin">Europe/Berlin (GMT+2)</option>
                        <option value="America/New_York">America/New York (EDT)</option>
                        <option value="America/Chicago">America/Chicago (CDT)</option>
                        <option value="America/Los_Angeles">America/Los Angeles (PDT)</option>
                        <option value="Asia/Tokyo">Asia/Tokyo (GMT+9)</option>
                        <option value="Asia/Dubai">Asia/Dubai (GMT+4)</option>
                        <option value="Asia/Singapore">Asia/Singapore (GMT+8)</option>
                        <option value="Australia/Sydney">Australia/Sydney (AEST)</option>
                    </Select>
                </div>

                {/* Submit Button */}
                <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-4 p-6 bg-gray-100 rounded-b-lg border-t border-gray-300">

                <Button
                        type="button"
                        variant="link"
                        onClick={handleBack}
                        className="sm:w-auto flex items-center justify-center gap-2 text-gray-600 font-semibold py-3 px-4 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        <ArrowLeft size={20} />
                        Back
                    </Button>


                <div className="pt-4">
                    <Button type="submit" isLoading={isLoading}>
                    Next:  Setup Summary
                    </Button>
                </div>
                
                
                
                </div>
            </form>
        </div>
    );
}
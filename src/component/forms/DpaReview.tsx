'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check, Download, Maximize, Minus, Plus, Loader2, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

export default function DpaReview() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [agreementAccepted, setAgreementAccepted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!agreementAccepted) {
            alert("Please accept the agreement to continue.");
            return;
        }
        setIsLoading(true);
        // Final API call
        setTimeout(() => {
            router.push('/dashboard');
        }, 2000);
    };

    const isSubmitDisabled = !agreementAccepted || isLoading;

    return (
        <div className="w-full bg-white/90 backdrop-blur-sm rounded-lg shadow-lg">
            {/* Header */}
            <div className="p-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Data Processing Agreement (GDPR)</h1>
                <p className="text-gray-600">
                    As your Data Processor, we are committed to protecting your data. Please review and accept the terms of our DPA.
                </p>
            </div>
            <div className="px-8">
            {/* Commitment Section */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Our Commitment in Plain English</h2>
                <ul className="space-y-3">
                    {['We will only process your data as you instruct.', 'Your data will be kept secure and confidential at all times.', 'We will notify you in the event of any data breach.', 'You remain the sole owner of your data.'].map((item, index) => (
                        <li key={index} className="flex items-center text-gray-800">
                            <Check className="w-5 h-5 text-green-500 mr-3 shrink-0" />
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
            </div>
            <div className="px-8">
            {/* PDF Viewer Mockup */}
            <div className="border border-gray-300 rounded-lg overflow-hidden mb-8">
                <div className="bg-gray-800 text-white flex items-center justify-between px-4 py-2">
                    <span className="text-sm font-medium">Data Processing Agreement.pdf</span>
                    <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-400">1 / 12</span>
                        <Minus className="w-4 h-4 cursor-pointer hover:text-white text-gray-300" />
                        <span className="text-sm">100%</span>
                        <Plus className="w-4 h-4 cursor-pointer hover:text-white text-gray-300" />
                        <Maximize className="w-4 h-4 cursor-pointer hover:text-white text-gray-300" />
                        <Download className="w-4 h-4 cursor-pointer hover:text-white text-gray-300" />
                    </div>
                </div>
                <div className="p-6 bg-white text-gray-800 overflow-y-auto max-h-80 prose prose-sm">
                    <h3 className="text-lg font-bold">Data Processing Agreement</h3>
                    <p>This Data Processing Agreement ("DPA") forms part of the Agreement between the Organization ("Data Controller") and Qireon ("Data Processor") dated [Effective Date] (the "Agreement").</p>
                    <h4>1. Definitions</h4>
                    <p>For the purposes of this DPA, the terms "Controller," "Processor," "Data Subject," "Personal Data," "Processing," "Personal Data Breach" shall have the same meaning as in the GDPR.</p>
                    <h4>2. Processing of Personal Data</h4>
                    <p>2.1 The Data Processor shall process Personal Data only on documented instructions from the Data Controller, including with regard to transfers of Personal Data to a third country or an international organization, unless required to do so by Union or Member State law to which the Data Processor is subject; in such a case, the Data Processor shall inform the Data Controller of that legal requirement before processing, unless that law prohibits such information on important grounds of public interest.</p>
                    {/* More content would be here */}
                </div>
            </div>
            </div>
            
            <form onSubmit={handleSubmit}>
            <div className="px-8">
                {/* Final Confirmation Checkbox */}
                 <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-8">
                    <label htmlFor="agree" className="flex items-start cursor-pointer">
                        <input 
                            type="checkbox" 
                            id="agree" 
                            className="w-5 h-5 mt-1 mr-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 shrink-0"
                            checked={agreementAccepted}
                            onChange={(e) => setAgreementAccepted(e.target.checked)}
                        />
                        <span className="text-gray-800">
                            I have read, understood, and agree to the terms of the Qireon Data Processing Agreement and the Technical & Organizational Measures on behalf of my company.
                        </span>
                    </label>
                </div>

                {/* Conditionally Rendered Download Section */}
                {agreementAccepted && (
                    <div className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200 transition-all duration-500 ease-in-out">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Review and Download Your Documents</h2>
                        <p className="text-gray-600 mb-4">Please download the following documents for your records before proceeding.</p>
                        
                        <div className="space-y-4">
                            {/* DPA Download */}
                            <div className="bg-white border border-gray-200 rounded-lg p-4">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h3 className="text-md font-semibold text-gray-900">CONTRACT IN ACCORDANCE WITH ART. 28 OF THE GDPR</h3>
                                        <p className="text-sm text-gray-600">This document outlines the terms of data processing.</p>
                                    </div>
                                    <a href="#" className="text-blue-600 hover:underline flex items-center shrink-0 ml-4">
                                        <Download className="w-4 h-4 mr-1" />
                                        Download PDF
                                    </a>
                                </div>
                            </div>

                            {/* TOMs Download */}
                            <div className="bg-white border border-gray-200 rounded-lg p-4">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h3 className="text-md font-semibold text-gray-900">TECHNICAL AND ORGANIZATIONAL MEASURES (ART. 32 GDPR)</h3>
                                        <p className="text-sm text-gray-600">This document details our security measures to protect your data.</p>
                                    </div>
                                    <a href="#" className="text-blue-600 hover:underline flex items-center shrink-0 ml-4">
                                        <Download className="w-4 h-4 mr-1" />
                                        Download PDF
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                )}
                </div>
<div className="flex flex-col-reverse sm:flex-row justify-center items-center gap-4 p-6 bg-gray-100 rounded-b-lg border-t border-gray-300">

                {/* Submit Button */}
                <Button 
                    type="submit"
                    disabled={isSubmitDisabled}
                    className="w-auto"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="animate-spin" size={20} />
                            <span>Finalizing...</span>
                        </>
                    ) : (
                        <>
                            Submit & Launch Dashboard <ArrowRight size={20} />
                        </>
                    )}
                </Button>
</div>

            </form>
        </div>
    );
}

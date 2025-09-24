'use client';

import React, { useState, FormEvent, useEffect } from 'react';

// --- Icon Imports from Lucide ---
// Make sure to install: npm install lucide-react
import { ArrowRight, CreditCard, AlertTriangle, Loader2, CheckCircle2, X } from 'lucide-react';

// --- Helper function for the API call ---
// FIXED: This function now sends a flat payload with email, consentGiven, and marketingOptIn.
const requestVerificationCode = async (email: string, consentGiven: boolean, marketingOptIn: boolean) => {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.qireon.dev'}/api/iaums/onboarding/start`;

    // Construct the flat payload.
    const payload = {
        email,
        consentGiven,
        marketingOptIn,
    };

    try {
        console.log('Sending this data to API:', JSON.stringify(payload, null, 2));

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload), // Send the flat payload
        });

        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            const responseData = await response.json();
            if (!response.ok) {
                throw new Error(responseData.message || responseData.error || 'An unexpected API error occurred.');
            }
            return responseData;
        } else {
            const textResponse = await response.text();
            console.error("Received non-JSON response from server:", textResponse);
            throw new Error('The server returned an unexpected response. Please check server logs.');
        }

    } catch (error) {
        console.error('API Call Error:', error);
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('An unknown error occurred during the API call.');
    }
};


// --- Reusable Toast Notification Component (with Lucide Icon) ---
const Toast = ({ message, onClose }: { message: string | null, onClose: () => void }) => {
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                onClose();
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [message, onClose]);

    if (!message) return null;

    return (
        <div className="fixed bottom-5 right-5 z-50 animate-fade-in-up">
            <div className="max-w-sm mx-auto bg-red-100 border border-red-400 rounded-xl shadow-lg flex items-center space-x-4 p-4">
                <div className="flex-shrink-0">
                    <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
                <div>
                    <div className="text-sm font-bold text-red-800">An Error Occurred</div>
                    <p className="text-sm text-red-700">{message}</p>
                </div>
                <button onClick={onClose} className="ml-auto text-red-500 hover:text-red-700 focus:outline-none">
                    <X className="h-5 w-5" />
                </button>
            </div>
        </div>
    );
};


export default function SignupForm() {
    const [email, setEmail] = useState('');
    const [consentGiven, setConsentGiven] = useState(true);
    const [marketingOptIn, setMarketingOptIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState<string | null>(null);
    const [emailError, setEmailError] = useState<string | null>(null);

    const validateEmail = (value: string) => {
        if (!value) {
            setEmailError('Email address is required.');
        } else if (!/^\S+@\S+\.\S+$/.test(value)) {
            setEmailError('Please enter a valid work email address.');
        } else {
            setEmailError(null);
        }
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
        if (emailError) {
             validateEmail(newEmail);
        }
    };

    const handleEmailBlur = () => {
        validateEmail(email);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        
        validateEmail(email);
        if (emailError || !consentGiven) {
            if (!consentGiven) {
                setApiError('You must agree to the Terms of Service and Privacy Policy.');
            }
            return;
        }

        setIsLoading(true);
        setApiError(null);
        
        console.log('handleSubmit: Starting API call...');
        try {
            // FIXED: Pass all required data to the helper function.
            await requestVerificationCode(email, consentGiven, marketingOptIn);
            
            console.log('handleSubmit: API call successful, redirecting...');
            window.location.href = `/signup/verify-email?email=${encodeURIComponent(email)}`;

        } catch (error) {
            console.error('handleSubmit: Caught an error.', error);
            setApiError(error instanceof Error ? error.message : 'An unknown error occurred.');
        } finally {
            console.log('handleSubmit: Finalizing...');
            setIsLoading(false);
        }
    };

    return (
        <>
            <Toast message={apiError} onClose={() => setApiError(null)} />
            <div className="p-8 md:p-12 bg-white shadow-lg rounded-2xl font-sans">
                <div className="max-w-md mx-auto w-full">
                    <h2 className="text-4xl font-bold text-gray-900">Start Free. Start Secure.</h2>
                    <p className="text-lg text-gray-600 mt-2 mb-8">Simplifying ISO 27001:2022 Compliance.</p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                Begin with your work email address
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={handleEmailChange}
                                onBlur={handleEmailBlur}
                                placeholder="name@company.com"
                                required
                                className={`w-full px-4 py-3 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 transition duration-150 ease-in-out ${
                                    emailError 
                                        ? 'border-red-500 focus:ring-red-500' 
                                        : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                                }`}
                            />
                            {emailError && <p className="mt-2 text-sm text-red-600">{emailError}</p>}
                        </div>

                      
                        
                        <div>
                            <p className="text-sm font-semibold text-gray-800 mb-3">We&apos;ll use your email to:</p>
                            <ul className="space-y-2">
                                <li className="flex items-start">
                                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                                    <span className="text-sm text-gray-600">Set up your secure Qireon profile</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                                    <span className="text-sm text-gray-600">Create your initial compliance workspace</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                                    <span className="text-sm text-gray-600">Send a verification code to confirm access</span>
                                </li>
                            </ul>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-start">
                                <input id="consentGiven" name="consentGiven" type="checkbox" checked={consentGiven} onChange={(e) => setConsentGiven(e.target.checked)} className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-1"/>
                                <label htmlFor="consentGiven" className="ml-3 block text-xs text-gray-800">I agree to the <a href="/terms" className="font-medium text-blue-600 hover:underline">Terms of Service</a> and <a href="/privacy" className="font-medium text-blue-600 hover:underline">Privacy Policy</a>. (Required)</label>
                            </div>
                            <div className="flex items-start">
                                <input id="marketingOptIn" name="marketingOptIn" type="checkbox" checked={marketingOptIn} onChange={(e) => setMarketingOptIn(e.target.checked)} className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-1"/>
                                <label htmlFor="marketingOptIn" className="ml-3 block text-xs text-gray-800">I'd like to receive product updates and marketing emails.</label>
                            </div>
                        </div>

                        <button type="submit" disabled={!consentGiven || isLoading} className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors">
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                <>
                                    Continue
                                    <ArrowRight size={20} className="ml-2" />
                                </>
                            )}
                        </button>
                        
                        <div className="text-center text-sm text-gray-500 flex items-center justify-center">
                            <CreditCard size={16} className="mr-2" />
                            No credit card required
                        </div>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-sm text-gray-600">
                            Already have an account?{' '}
                            <a href="/login" className="font-semibold text-blue-600 hover:underline">
                                Login here
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}


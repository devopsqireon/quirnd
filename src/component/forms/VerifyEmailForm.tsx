'use client';

import { useState, ChangeEvent, KeyboardEvent, ClipboardEvent } from 'react';
import { useRouter } from 'next/navigation';
import { MdMarkEmailRead } from 'react-icons/md';
import { Button } from '../ui/Button';

export default function VerifyEmailForm() {
    const router = useRouter();
    const [code, setCode] = useState<string[]>(['', '', '', '', '', '']);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (index: number, value: string) => {
        if (!/^\d?$/.test(value)) return;

        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        // Auto-focus next input
        if (value && index < 5) {
            const nextInput = document.getElementById(`code-${index + 1}`);
            nextInput?.focus();
        }
    };

    const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
        // Auto-focus previous input on backspace
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            const prevInput = document.getElementById(`code-${index - 1}`);
            prevInput?.focus();
        }
    };

    // --- NEW FUNCTION TO HANDLE PASTING ---
    const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData('text').replace(/[^0-9]/g, '');
        if (pasteData.length === 6) {
            const newCode = pasteData.split('');
            setCode(newCode);
            // Focus the last input for a better user experience
            const lastInput = document.getElementById('code-5');
            lastInput?.focus();
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            const enteredCode = code.join('');
            console.log('Verifying code:', enteredCode);
            
            router.push('/signup/workspace-password');

        } catch (apiError) {
            setError("Verification failed. Please try again.");
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full bg-white/80 backdrop-blur-sm p-8 rounded-lg shadow-lg flex flex-col justify-center">
            <div className="max-w-md mx-auto w-full">
                <div className="flex justify-start mb-4">
                    <div className="bg-cyan-100 p-3 rounded-full border border-cyan-200">
                        <MdMarkEmailRead className="h-6 w-6 text-cyan-700" />
                    </div>
                </div>

                <div className="text-left mb-6">
                    <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                        Check Your Inbox to Continue
                    </h1>
                    <p className="text-sm text-gray-600">
                        We’ve sent a 6-digit verification code to:{' '}
                        <span className="font-medium text-gray-800">
                            your-email@example.com
                        </span>
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="w-full space-y-4">
                    <label className="text-sm font-medium text-gray-700">Enter 6-digit code</label>
                    <div className="flex justify-between space-x-2 pt-2">
                        {code.map((digit, index) => (
                            <input
                                key={index}
                                id={`code-${index}`}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                onPaste={handlePaste} // Add the paste handler to all inputs
                                className="w-12 h-12 text-center border border-gray-300 rounded-md 
                                focus:outline-none focus:ring-2 focus:ring-cyan-500 
                                focus:border-cyan-500 text-lg transition"
                                required
                                disabled={isLoading}
                            />
                        ))}
                    </div>
                    
                    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

                    <div className="text-xs text-gray-600 space-y-2 pt-2">
                        <p>Enter the code below to verify your email and activate your workspace journey. This helps us keep your account secure and personalized for you.</p>
                        <ul className="list-disc list-inside">
                            <li>
                                Didn’t get the email?{' '}
                                <Button
                                    type="button"
                                    variant="link"
                                    className="p-0 h-auto text-blue-600 hover:underline font-semibold"
                                >
                                    Resend Code
                                </Button>
                            </li>
                            <li>Make sure to check your spam folder.</li>
                            <li>Code expires in 10 minutes.</li>
                        </ul>
                    </div>

                    <Button type="submit" className="w-full" isLoading={isLoading}>
                        {!isLoading && (
                            <>
                                <span>Verify & Continue</span>
                                <span aria-hidden="true" className="ml-2">→</span>
                            </>
                        )}
                    </Button>
                </form>

                 <div className="text-center mt-4">
                    Entered the wrong email? 
                    <Button
                        variant="link"
                        onClick={() => router.back()}
                        className="text-blue-600 hover:underline font-semibold"
                    >
                        Update it here.
                    </Button>
                </div>

                <div className="mt-8 text-center space-y-4">
                    <p>
                        Already part of a workspace?{' '}
                        <a href="/login" className="font-semibold text-blue-600 hover:underline">
                            Login
                        </a>
                    </p>
                </div>

            </div>
        </div>
    );
}

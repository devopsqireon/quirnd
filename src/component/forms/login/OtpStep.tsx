'use client';

import React, { useState, useRef, ChangeEvent, KeyboardEvent, ClipboardEvent } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/component/ui/Button'; // Assuming a reusable Button component exists

interface OtpStepProps {
  email: string;
}

export default function OtpStep({ email }: OtpStepProps) {
  const router = useRouter();
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(''));
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    if (value.length > 1) return; // Only allow single digit

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Focus next input if a digit is entered
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    // Focus previous input on backspace if current input is empty
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // --- NEW FUNCTION TO HANDLE PASTING ---
  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').replace(/[^0-9]/g, '');
    if (pasteData.length === 6) {
      const newOtp = pasteData.split('');
      setOtp(newOtp);
      // Focus the last input box after pasting
      inputRefs.current[5]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const code = otp.join('');
    console.log('Verifying OTP:', code);
    // Add API call to verify OTP code here
    setTimeout(() => {
        router.push('/dashboard');
    }, 1500);
  };

  const isButtonDisabled = otp.join('').length < 6 || isLoading;

  return (
    <div className="bg-white/80 backdrop-blur-sm p-8 md:p-12 rounded-lg shadow-lg text-center">
      <h1 className="text-2xl font-semibold text-gray-900">Check your email</h1>
      <p className="text-sm text-gray-600 mt-2 mb-6">
        We sent a 6-digit verification code to <strong className="font-medium">{email}</strong>.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="otp-code" className="sr-only">Verification Code</label>
          <div className="flex justify-center gap-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                id={`otp-input-${index}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={index === 0 ? handlePaste : undefined} // Add paste handler only to the first input
                className="w-12 h-14 text-center text-2xl font-mono bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            ))}
          </div>
        </div>
        <Button
          type="submit"
          isLoading={isLoading}
          disabled={isButtonDisabled}
          className="w-auto"
        >
          {!isLoading && (
            <>
                <span>Verify & Sign In</span>
                <ArrowRight size={15} />
            </>
          )}
        </Button>
      </form>
      <div className="mt-4 text-sm text-gray-500">
        Didn't receive a code?{' '}
        <button className="font-medium text-blue-600 hover:underline">
          Resend
        </button>
      </div>
    </div>
  );
}

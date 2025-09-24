// components/forms/forgot-password/RequestResetStep.tsx
'use client';

import React, { useState } from 'react';
import { ArrowRight, Globe, Mail, RotateCcwKey } from 'lucide-react';

interface RequestResetStepProps {
  onSubmit: (email: string) => void;
}

export function RequestResetStep({ onSubmit }: RequestResetStepProps) {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email);
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg pt-8">
          <div className='px-8'>
          <div className="mb-4 flex">
                    <div className="bg-cyan-100 p-3 rounded-full border border-cyan-200">
                      <RotateCcwKey className="h-6 w-6 text-cyan-700" />
                    </div>
                </div>
      <div className="text-left mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Forgot your password?</h1>
        <p className="text-sm text-gray-600 mt-1">No problem. Enter your email address below and we'll send you a link to reset it.</p>
      </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-8 px-8">
          <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-700">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              id="email" type="email" value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com" required
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
        </div>
        
        
        <div className="flex flex-col-reverse sm:flex-row justify-center items-center gap-4 p-6 bg-gray-100 rounded-b-lg border-t border-gray-300">
        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-2"
        >
          <span>Send Reset Link</span>
          <ArrowRight size={20} />
        </Button>
        </div>


      </form>
    </div>
  );
}

// components/forms/forgot-password/CheckEmailStep.tsx
import { MailCheck } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/component/ui/Button';

interface CheckEmailStepProps {
  email: string;
}

export function CheckEmailStep({ email }: CheckEmailStepProps) {
  return (
    <div className="bg-white/80 backdrop-blur-sm p-8 md:p-12 rounded-lg shadow-lg text-center">
        <div className="inline-block bg-blue-100 p-4 rounded-full border border-blue-200 mb-6">
            <MailCheck className="h-10 w-10 text-blue-600" />
        </div>
        <h1 className="text-2xl font-semibold text-gray-900">Check your email</h1>
        <p className="text-sm text-gray-600 mt-2 mb-6">
            We've sent a password reset link to <strong className="font-medium">{email}</strong>. Please check your inbox and follow the instructions.
        </p>
        <Link href="/login" className="text-sm font-medium text-blue-600 hover:underline">
            ← Back to Login
        </Link>
    </div>
  );
}

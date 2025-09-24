'use client';

import React, { useState } from 'react';
import { ArrowRight, IdCardLanyard, Mail } from 'lucide-react';
import { Button } from '@/component/ui/Button';

interface EmailStepProps {
  onSubmit: (email: string) => void;
}

export default function EmailStep({ onSubmit }: EmailStepProps) {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add validation here if needed
    onSubmit(email);
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg pt-8 md:pt-12">
      
      <div className='px-8 md:px-12'>
      <div className="mb-4 flex">
                    <div className="bg-cyan-100 p-3 rounded-full border border-cyan-200">
                        <IdCardLanyard className="h-6 w-6 text-cyan-700" />
                    </div>
                </div>
                
      <div className="text-left mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Sign in to your Workspace</h1>
        <p className="text-sm text-gray-600 mt-1">Enter your email to continue.</p>
      </div>
      </div>

      <form onSubmit={handleSubmit}>
<div className='px-8 md:px-12'>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-700">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              required
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
        </div>
       
                <div className="py-4 space-y-4">
                            <p className="text-sm text-gray-600">
                            Want a new workspace? {' '}
                                <a href="/signup" className="font-semibold text-blue-600 hover:underline">
                                Create one here.
                                </a>
                            </p>
                          
                        </div>
                        </div>

                        <div className="flex flex-col-reverse sm:flex-row justify-center items-center gap-4 p-6 bg-gray-100 rounded-b-lg border-t border-gray-300">
        <Button
          type="submit"
          className="w-auto"
        >
          <span>Continue</span>
          <ArrowRight size={15} />
        </Button>
</div>

      </form>
    </div>
  );
}

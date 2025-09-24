'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Lock, ArrowLeft, KeyRound, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/component/ui/Button';

interface PasswordStepProps {
  email: string;
  onBack: () => void;
  onSubmit: () => void;
}

export default function PasswordStep({ email, onBack, onSubmit }: PasswordStepProps) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State for visibility

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg pt-8">
      <div className="text-left mb-6 px-8">
        <div className="mb-4 flex">
          <div className="bg-cyan-100 p-3 rounded-full border border-cyan-200">
            <KeyRound className="h-6 w-6 text-cyan-700" />
          </div>
        </div>
        <h1 className="text-2xl font-semibold text-gray-900">Enter your password</h1>
        <p className="text-sm text-gray-600 mt-1">
          You are signing in as <strong className="font-medium">{email}</strong>
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-6 px-8">
          <div className="flex justify-between items-center mb-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <Link href="/forgot-password" className="text-sm font-medium text-blue-600 hover:underline">
              Forgot Password?
            </Link>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              id="password"
              type={showPassword ? 'text' : 'password'} // Dynamically change type
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full pl-10 pr-10 py-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500" // Added pr-10 for icon space
            />
            {/* --- EYE ICON BUTTON ADDED HERE --- */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>
        
        <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-4 p-6 bg-gray-100 rounded-b-lg border-t border-gray-300">
          <Button variant="link" onClick={onBack} className="flex items-center text-sm text-gray-600 hover:text-gray-900">
            <ArrowLeft size={16} className="mr-1" />
            Back
          </Button>
          
          <Button type="submit" className="">
            <span>Sign In</span>
            <ArrowRight size={15} className="ml-2" />
          </Button>
        </div>
      </form>
    </div>
  );
}
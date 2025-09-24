'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowRight, KeyRound, Lock, CheckCircle2, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/component/ui/Button';

export default function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setError('');
    
    const token = searchParams.get('token');
    console.log("Resetting password with token:", token);
    
    // --- SIMULATE API CALL ---
    setIsSuccess(true); 
  };

  // --- SUCCESS VIEW ---
  if (isSuccess) {
    return (
        <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg text-center">
            <div className='p-8'>
            <div className="inline-block bg-green-100 p-3 rounded-full border border-green-200 mb-4">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-semibold text-gray-900">Password Reset!</h1>
            <p className="text-sm text-gray-600 mt-2 mb-6">
                Your password has been successfully updated. You can now log in with your new password.
            </p>
            </div>
            <div className="flex flex-col-reverse sm:flex-row justify-center items-center gap-4 p-6 bg-gray-100 rounded-b-lg border-t border-gray-300">
            <Button
              onClick={() => router.push('/login')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-2"
            >
              <span>Go to Login</span>
              <ArrowRight size={20} />
            </Button>
            </div>
        </div>
    );
  }

  // --- DEFAULT FORM VIEW ---
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg pt-8">
      <div className='px-8'>
        <div className="mb-4 flex">
          <div className="bg-cyan-100 p-3 rounded-full border border-cyan-200">
            <KeyRound className="h-6 w-6 text-cyan-700" />
          </div>
        </div>
        <div className="text-left mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Create a new password</h1>
          <p className="text-sm text-gray-600 mt-1">Your new password must be at least 8 characters long.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className='px-8 space-y-4 mb-8'>
          <div>
            <label htmlFor="password"className="block text-sm font-medium mb-2 text-gray-700">New Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                id="password" 
                type={showPassword ? 'text' : 'password'} 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" required
                className="w-full pl-10 pr-10 py-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)} 
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          <div>
            <label htmlFor="confirmPassword"className="block text-sm font-medium mb-2 text-gray-700">Confirm New Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                id="confirmPassword" 
                type={showPassword ? 'text' : 'password'} 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••" required
                className="w-full pl-10 pr-10 py-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
               <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)} 
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
        <div className="flex flex-col-reverse sm:flex-row justify-center items-center gap-4 p-6 bg-gray-100 rounded-b-lg border-t border-gray-300">
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-2"
          >
            <span>Set New Password</span>
            <ArrowRight size={20} />
          </Button>
        </div>
      </form>
    </div>
  );
}

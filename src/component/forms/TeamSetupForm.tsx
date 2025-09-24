'use client';

import React, { useState, forwardRef } from 'react';
import { useRouter } from 'next/navigation';
import { Users, UserPlus, UserCircle, ChevronDown, Link, Loader2, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '../ui/Button';
import { link } from 'fs';

// --- Reusable Components (can be moved to their own files) ---

const Input = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>((props, ref) => {
    const commonInputStyle = "w-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all text-black";
    return <input ref={ref} {...props} className={`${commonInputStyle} ${props.className}`} />;
});
Input.displayName = 'Input';

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

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

// --- Team Setup Form Component ---

interface TeamMember {
    email: string;
    role: string;
}

export default function TeamSetupForm() {
    const router = useRouter();
    const [members, setMembers] = useState<TeamMember[]>([
        { email: 'jane.doe@example.com', role: 'Admin' },
        { email: 'john.smith@example.com', role: 'Officer' },
    ]);
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('Admin');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleAddMember = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) {
            setError('Email address cannot be empty.');
            return;
        }
        if (!/^\S+@\S+\.\S+$/.test(email)) {
            setError('Please enter a valid email address.');
            return;
        }
        if (members.some(member => member.email === email)) {
            setError('This email has already been added.');
            return;
        }

        setMembers([...members, { email, role }]);
        setEmail('');
        setError('');
    };

    const handleSendInvites = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call to send invites
        setTimeout(() => {
            router.push('/signup/localization'); // Navigate to the final step
        }, 2000);
    };

    const skipStep = () => {
        router.push('/signup/localization'); // Navigate to the final step
    };
    
    // Handle back navigation
    const handleBack = () => {
        router.back(); // Navigates to the previous page in the history stack
    };
    
    return (
        <div className="w-full bg-white/80 backdrop-blur-sm rounded-lg shadow-lg flex flex-col justify-center">
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
                    <Users className="h-6 w-6 text-cyan-700" />
                    </div>
                </div>

                <div className="text-left mb-8">
                    <h1 className="text-2xl font-semibold text-gray-900 mb-1">
                    Invite Team Members
                    </h1>
                    <p className="text-sm text-gray-600">
                    Send invites to your colleagues and assign their roles. You can always manage team members later.
                    </p>
                </div>

                </div>


            {/* Add Member Form */}
            <form onSubmit={handleAddMember}>
            <div className='px-8 flex items-start gap-2 mb-4'>
                <div className="flex-grow">
                    <Input
                        type="email"
                        placeholder="colleague@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="rounded-r-none"
                    />
                </div>
                <div className="w-40">
                    <Select value={role} onChange={(e) => setRole(e.target.value)} className="rounded-none">
                        <option>Admin</option>
                        <option>Officer</option>
                        <option>Member</option>
                    </Select>
                </div>
                <button type="submit" className="bg-gray-800 text-white px-4 py-3 rounded-lg rounded-l-none flex items-center gap-2 hover:bg-gray-900 transition-colors">
                    <UserPlus size={16} /> Add
                </button>
                </div>
            </form>

            <div className='px-8'>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            {/* Invited Members List */}
            <div className="w-full mb-8">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Team Members Invited</h3>
                <ul className="space-y-3 max-h-48 overflow-y-auto pr-2">
                    {members.map((member, index) => (
                        <li key={index} className="flex items-center bg-gray-50 p-1 rounded-lg">
                            <UserCircle className="text-gray-400 mr-3" size={24} />
                            <span className="flex-grow text-gray-700">{member.email}</span>
                            <span className="text-sm font-medium text-gray-500 bg-gray-200 px-2 py-1 rounded">{member.role}</span>
                        </li>
                    ))}
                </ul>
            </div>
            </div>
            {/* Action Buttons */}
            <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-4 p-6 bg-gray-100 rounded-b-lg border-t border-gray-300">
                <Button
                    variant="link"
                    type="button"
                    onClick={handleBack}
                    className="sm:w-auto flex items-center justify-center gap-2 text-gray-600 font-semibold py-3 px-4 rounded-lg hover:bg-gray-100 transition-colors"
                >
                    <ArrowLeft size={20} />
                    Back
                </Button>
                
                {/* Group the right-side buttons together */}
                <div className="flex items-center gap-4">
                    <Button
                    variant="link"
                        type="button"
                        onClick={skipStep}
                        className="font-semibold text-gray-600 hover:text-gray-900 transition-colors"
                    >
                        Skip for now
                    </Button>
                    <Button onClick={handleSendInvites} isLoading={isLoading}>
                        Send Invites & Continue <span aria-hidden="true" className="ml-2">→</span>
                    </Button>
                </div>
            </div>
        </div>
    );
}
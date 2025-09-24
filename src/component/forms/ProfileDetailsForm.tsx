'use client';

import React, { useState, forwardRef } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter
import { Link, Building2, User, ArrowRight, ArrowLeft, Loader2,Users, IdCardLanyard } from 'lucide-react';
import OnboardingStepper from '../ui/OnboardingStepper';
import { Button } from '../ui/Button';

// Reusable Input Component
const Input = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>((props, ref) => {
    const commonInputStyle = "w-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all text-black";
    return <input ref={ref} {...props} className={`${commonInputStyle} ${props.className}`} />;
});
Input.displayName = 'Input';


// Reusable Select Component
const Select = forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>((props, ref) => {
    const commonSelectStyle = "w-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all text-black";
    return <select ref={ref} {...props} className={`${commonSelectStyle} ${props.className}`}>{props.children}</select>;
});
Select.displayName = 'Select';


// Reusable Button Component
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}


// This component contains the form for collecting user profile details.
export default function ProfileDetailsForm() {
    const router = useRouter();
    const [accountType, setAccountType] = useState('company');
    const [selectedRole, setSelectedRole] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const activeTabStyle = "bg-blue-600 text-white";
    const inactiveTabStyle = "bg-white text-gray-700";
    const activeRoleStyle = "ring-2 ring-blue-500 bg-blue-600 text-white";
    const inactiveRoleStyle = "bg-blue-500/20 hover:bg-blue-500/40 text-black";

    // Handle form submission
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);

        // Simulate an API call
        setTimeout(() => {
            // On success, route to the next page
            router.push('/signup/team-setup'); 
            setIsLoading(false);
        }, 1500);
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
                        <IdCardLanyard className="h-6 w-6 text-cyan-700" />
                    </div>
                </div>

                <div className="text-left mb-8">
                    <h1 className="text-2xl font-semibold text-gray-900 mb-1">
                    Tell Us About Yourself
                    </h1>
                    <p className="text-sm text-gray-600">
                    Provide a few details so we can customize your account and get you started quickly.
                    </p>
                </div>

                </div>

                <div className='px-8'>
            {/* Account Type Toggle */}
            <div className="grid grid-cols-2 gap-0 mb-6 bg-white p-1 rounded-lg shadow-inner">
                <button
                    onClick={() => setAccountType('company')}
                    className={`flex items-center justify-center gap-2 px-4 py-3 rounded-md transition-colors border border-gray-300 me-2 duration-300 ${accountType === 'company' ? activeTabStyle : inactiveTabStyle}`}
                >
                   <span className='flex items-center'> <Building2 className='me-2' size={20} />
                    For My Company</span>
                </button>
                <button
                    onClick={() => setAccountType('individual')}
                    className={`flex items-center justify-center gap-2 px-4 py-3 rounded-md transition-colors border border-gray-300 duration-300 ${accountType === 'individual' ? activeTabStyle : inactiveTabStyle}`}
                >
                    <span className='flex items-center'><User className='me-2' size={20} /> For Myself (Individual)</span>
                </button>
            </div>
            </div>
            
            <form className="space-y-6" onSubmit={handleSubmit}>
            <div className='px-8'>
                <div className='mb-4'>
                    <label htmlFor="fullName" className="block text-sm font-medium mb-2">Your Full Name</label>
                    <Input type="text" id="fullName" placeholder="e.g. Sofia Hernandez, Ahmed Raza" required />
                </div>

                {/* Conditional Fields for Company */}
                {accountType === 'company' && (
                    <>
                        <div className='mb-4'>
                            <label htmlFor="companyName" className="block text-sm font-medium mb-2">Company Name</label>
                            <Input type="text" id="companyName" placeholder="Acme Inc." required />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                            <div>
                                <label htmlFor="jobTitle" className="block text-sm font-medium mb-2">Your Job Title</label>
                                <Input type="text" id="jobTitle" placeholder="CEO, Manager, etc." required />
                            </div>
                            <div>
                                <label htmlFor="companySize" className="block text-sm font-medium mb-2">Company Size</label>
                                <Select id="companySize" required>
                                    <option value="">Select company size</option>
                                    <option value="1-10">1-10 employees</option>
                                    <option value="11-50">11-50 employees</option>
                                    <option value="51-200">51-200 employees</option>
                                    <option value="201-500">201-500 employees</option>
                                    <option value="500+">500+ employees</option>
                                </Select>
                            </div>
                        </div>
                    </>
                )}

                {/* Role Selection */}
                <div className='mb-4'>
                    <label className="block text-sm font-medium mb-3">Your Role</label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {['Admin', 'Officer (ISO/CISO)', 'Others'].map((role) => (
                            <button
                                key={role}
                                type="button"
                                onClick={() => setSelectedRole(role)}
                                className={`p-4 rounded-lg text-left transition-all duration-300 ${selectedRole === role ? activeRoleStyle : inactiveRoleStyle}`}
                            >
                                <h4 className="font-bold">{role}</h4>
                                <p className="text-xs mt-1 opacity-80">
                                    {role === 'Admin' && 'Overseeing all settings and compliance configurations.'}
                                    {role === 'Officer (ISO/CISO)' && 'Handling risk, compliance, and security management.'}
                                    {role === 'Others' && 'I have a different role or I will define it in the next step.'}
                                </p>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Agreement Checkbox */}
                <div className="flex items-start py-4">
                    <input id="terms" name="terms" type="checkbox" className="h-4 w-4 mt-1 text-cyan-500 border-gray-500 rounded focus:ring-cyan-400 bg-transparent" required />
                    <div className="ml-3 text-sm">
                        <label htmlFor="terms">
                            I agree to the <a href="#" className="font-medium text-blue-500 hover:underline">Qireon Terms of Service</a> and <a href="#" className="font-medium text-blue-500 hover:underline">Privacy Policy</a>.
                        </label>
                    </div>
                </div>

               
                </div>

 {/* Action Buttons */}
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



                    <div>

                   <Button type="submit" isLoading={isLoading} className="w-auto">
                   <span>Next: Team Setup</span>
                                       
                        
                    </Button>
                    </div>
                </div>

            </form>
            
        </div>
    );
}

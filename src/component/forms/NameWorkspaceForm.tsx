'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Info, Globe, Link, ArrowRight } from 'lucide-react';
// --- IMPORTS ADDED ---
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip'; // Adjust path as needed
import OnboardingStepper from '../ui/OnboardingStepper';

export default function NameWorkspaceForm() {
    const router = useRouter();
    const [subdomain, setSubdomain] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubdomainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '');
        setSubdomain(value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        if (subdomain.length < 3) {
            setError('Subdomain must be at least 3 characters.');
            setIsLoading(false);
            return;
        }
        
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        if (subdomain === 'admin' || subdomain === 'test') {
            setError('Oops! That name already taken. Try something unique.');
            setIsLoading(false);
            return;
        }

        router.push('/signup/profile');
    };

    return (

       
        <div className="w-full bg-white/80 backdrop-blur-sm rounded-lg shadow-lg flex flex-col justify-center">

            

            <div className="mx-auto w-full">
                <div className='p-8'>

                <div className="mb-4 flex">
                    <div className="bg-cyan-100 p-3 rounded-full border border-cyan-200">
                        <Globe className="h-6 w-6 text-cyan-700" />
                    </div>
                </div>

                <div className="text-left">
                    <h1 className="text-2xl font-semibold text-gray-900 mb-1">
                    Name Your Workspace
                    </h1>
                    <p className="text-sm text-gray-600">
                        This becomes your unique subdomain—the gateway for your team.
                    </p>
                </div>
                </div>

                <form onSubmit={handleSubmit} className="w-full space-y-4">
                    <div className='px-8'>
                        <div className="flex items-center mb-2">
                            <label htmlFor="subdomain" className="text-sm font-medium text-gray-700">
                                Set Your Company URL
                            </label>
                            
                            {/* --- MODIFIED SECTION FOR TOOLTIP --- */}
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Info className="h-4 w-4 ml-1.5 text-gray-400 cursor-pointer" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <ul className="list-disc p-4">
<li className='text-base/6'>Only letters, numbers, and hyphens allowed.</li>
<li className='text-base/6'>No spaces or special characters, please.</li>
<li className='text-base/6'>Subdomain can’t start or end with a hyphen.</li>
<li className='text-base/6'>Subdomain must be under 30 characters.</li>
</ul>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                             {/* --- END MODIFIED SECTION --- */}

                        </div>
                        
                        <div className="flex rounded-md shadow-sm">
                            <Input
                                type="text"
                                id="subdomain"
                                value={subdomain}
                                onChange={handleSubdomainChange}
                                placeholder="your-company"
                                className="rounded-r-none"
                                required
                            />
                            <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                                .qireon.com
                            </span>
                        </div>
                        <p className="my-8 flex">
                        <span className="text-gray-500 items-center flex"><Link size={16} className="mr-1" />   Workspace URL:</span>{' '}
                            <span className="text-blue-600 font-medium ms-2">
                                {subdomain || 'your-company'}.qireon.com
                            </span>
                        </p>
                   

                    {error && (
                        <p className="bg-red-50 text-red-700 text-sm p-3 rounded-md border border-red-200">
                            {error}
                        </p>
                    )}

</div>


<div className="flex sm:flex-row justify-end gap-4 p-6 bg-gray-100 rounded-b-lg border-t border-gray-300">

                    
<div>
                    <Button type="submit" className="w-full" isLoading={isLoading}>
                        {!isLoading && (
                            <>
                                <span>Next: Profile Setup</span>
                                
                            </>
                        )}
                    </Button>
                    </div>
</div>

                </form>
            </div>
        </div>
    );
}
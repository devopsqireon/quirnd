'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, KeyRound } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

export default function CreatePasswordForm() {
    const router = useRouter();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (password !== confirmPassword) {
            setError("Passwords do not match. Please try again.");
            return;
        }
        if (password.length < 8) {
            setError("Password must be at least 8 characters long.");
            return;
        }

        console.log('Setting password...');
        // On success, navigate to the next step in the registration flow
        router.push('/signup/create-workspace');
    };

    return (
        <div className="w-full bg-white/80 backdrop-blur-sm p-8 rounded-lg shadow-lg flex flex-col justify-center">
            <div className="max-w-md mx-auto w-full py-8">
                <div className="flex justify-start mb-4">
                    <div className="bg-cyan-100 p-3 rounded-full border border-cyan-200">
                        <KeyRound className="h-6 w-6 text-cyan-700" />
                    </div>
                </div>

                <div className="text-left mb-6">
                    <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                        Secure Your Account
                    </h1>
                    <p className="text-sm text-gray-600">
                        Set a strong password to protect your workspace. This helps keep your projects, files, and activity safe.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="w-full space-y-4">
                    {/* Password Input */}
                    <div className="space-y-1">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Enter Password
                        </label>
                        <div className="relative">
                            <Input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="pr-10" // Add padding for the icon
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    {/* Confirm Password Input */}
                    <div className="space-y-1">
                        <label
                            htmlFor="confirmPassword"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Confirm Password
                        </label>
                        <div className="relative">
                            <Input
                                type={showConfirmPassword ? 'text' : 'password'}
                                id="confirmPassword"
                                placeholder="••••••••"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="pr-10"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                            >
                                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>
                    
                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <div className="text-xs text-gray-600 space-y-1 pt-2">
                        <p className="font-medium">Password requirements:</p>
                        <ul className="list-disc list-inside">
                            <li>Minimum of 8 characters</li>
                            <li>Mix of letters, numbers, and symbols recommended</li>
                        </ul>
                    </div>

                    <Button type="submit" className="w-full">
                        Create Password & Continue
                    </Button>
                </form>
            </div>
        </div>
    );
}
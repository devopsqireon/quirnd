'use client'

import React, { useState } from 'react'
import { Bell, User, Search, Settings, BellRing, Building, Users, CreditCard, Puzzle, ListChecks, HelpCircle, Sparkles, LogOut, ChevronRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { usePageHeader } from '@/app/contexts/PageHeaderContext'
import Link from 'next/link'

export default function Navbar() {
    const [showNotifications, setShowNotifications] = useState(false)
    const [showProfile, setShowProfile] = useState(false)
    const router = useRouter()
    
    // Use the context hook to get dynamic header data
    const { breadcrumbs } = usePageHeader()

    // The last breadcrumb is the main page title, default to 'Dashboard'
    const pageTitle = breadcrumbs.length > 0 ? breadcrumbs[breadcrumbs.length - 1].label : 'Dashboard'
    // The rest of the items form the breadcrumb path
    const pathCrumbs = breadcrumbs.slice(0, -1)

    const DropdownMenuItem = ({ icon: Icon, text, isDanger = false, onClick }: { icon: React.ElementType, text: string, isDanger?: boolean, onClick?: () => void }) => (
        <button
            onClick={onClick}
            className={`flex items-center w-full space-x-3 px-4 py-2 rounded text-left ${isDanger ? 'text-red-600 hover:bg-red-50' : 'text-gray-700 hover:bg-gray-50'}`}
        >
            <Icon className={`w-4 h-4 ${isDanger ? 'text-red-500' : 'text-gray-500'}`} />
            <span>{text}</span>
        </button>
    );

    const handleLogout = () => {
        console.log('Logging out...');
        router.push('/logout');
    };

    return (
        <header
            className={`
                h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 
                sticky top-0 right-0 z-30 shadow-sm
            `}
        >
            {/* DYNAMIC HEADER SECTION */}
            <div className="">
            <h1 className="text-md font-bold text-slate-800 mb-1">{pageTitle}</h1>
                <nav className="hidden sm:flex items-center text-xs font-normal text-slate-500">
                    {pathCrumbs.map((crumb, index) => (
                        <React.Fragment key={index}>
                            <Link href={crumb.href || '#'} className="hover:text-blue-600">
                                {crumb.label}
                            </Link>
                            <ChevronRight className="w-3 h-3 mx-1" />
                            
                        </React.Fragment>
                    ))}
                    <span className="text-slate-700">{pageTitle}</span>
                </nav>
            </div>

            {/* RIGHT-SIDE CONTROLS SECTION */}
            <div className="flex items-center gap-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full max-w-xs"
                    />
                </div>

                <div className="relative">
                    <button
                        onClick={() => setShowNotifications(!showNotifications)}
                        className="relative p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors duration-200"
                    >
                        <Bell className="h-5 w-5" />
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                            3
                        </span>
                    </button>

                    {showNotifications && (
                        <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                            <div className="p-4 border-b border-gray-200">
                                <h3 className="font-semibold text-gray-800">Notifications</h3>
                            </div>
                            <div className="max-h-96 overflow-y-auto">
                                <div className="p-4 hover:bg-gray-50 border-b border-gray-100">
                                    <p className="text-sm text-gray-800">New user registered</p>
                                    <p className="text-xs text-gray-500 mt-1">5 minutes ago</p>
                                </div>
                            </div>
                            <div className="p-4 border-t border-gray-200">
                                <button className="text-sm text-blue-600 hover:text-blue-800">View all notifications</button>
                            </div>
                        </div>
                    )}
                </div>

                <div className="relative">
                    <button
                        onClick={() => setShowProfile(!showProfile)}
                        className="flex items-center gap-3 p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors duration-200"
                    >
                        <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg" alt="Priya Sharma" className="w-8 h-8 rounded-full" />
                        <div className="hidden md:block text-left">
                            <p className="text-sm font-medium text-gray-700">Priya Sharma</p>
                            <p className="text-xs text-gray-500">Administrator</p>
                        </div>
                    </button>

                    {showProfile && (
                        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 p-2 z-50">
                            <div className="px-4 py-3 border-b border-gray-100">
                                <div className="flex items-center space-x-3">
                                    <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg" alt="Priya Sharma" className="w-10 h-10 rounded-full" />
                                    <div>
                                        <div className="font-medium text-gray-900">Priya Sharma</div>
                                        <div className="text-sm text-gray-500">priya.sharma@abccorp.com</div>
                                        <div className="text-xs text-blue-600 font-medium">Administrator</div>
                                    </div>
                                </div>
                            </div>
                            <div className="py-2 border-b border-gray-100">
                                <DropdownMenuItem icon={User} text="Profile" />
                                <DropdownMenuItem icon={Settings} text="Account Settings" />
                                <DropdownMenuItem icon={BellRing} text="Notification Preferences" />
                            </div>
                            <div className="py-2 my-1 border-b border-gray-100 bg-blue-50 rounded-md relative">
                                <DropdownMenuItem icon={Building} text="Organization Settings" />
                                <DropdownMenuItem icon={Users} text="Manage Users" />
                                <DropdownMenuItem icon={CreditCard} text="Billing & Subscription" />
                                <DropdownMenuItem icon={Puzzle} text="Integrations" />
                                <DropdownMenuItem icon={ListChecks} text="Audit Log" />
                            </div>
                            <div className="py-2 border-b border-gray-100">
                                <DropdownMenuItem icon={HelpCircle} text="Help Center" />
                                <DropdownMenuItem icon={Sparkles} text="What's New" />
                            </div>
                            <div className="py-2">
                                <DropdownMenuItem icon={LogOut} text="Logout" isDanger={true} onClick={handleLogout} />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {(showNotifications || showProfile) && (
                <div className="fixed inset-0 z-40" onClick={() => { setShowNotifications(false); setShowProfile(false); }} />
            )}
        </header>
    )
}


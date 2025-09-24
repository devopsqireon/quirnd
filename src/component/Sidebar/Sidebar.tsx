'use client'

import { useState, useEffect, useRef } from 'react'
import {
    ChevronLeft,
    ChevronRight,
    LayoutDashboard,
    ShieldCheck,
    AlertTriangle,
    FileSearch,
    Settings,
    Columns4,
    BookText,
    ClipboardCheck,
    ShieldEllipsis,
    Proportions,
    GraduationCap,
} from 'lucide-react'
import SidebarItem from './SidebarItem'
import QireonLogo from '../logo'
import { usePathname } from 'next/navigation'

interface SidebarProps {
    isCollapsed: boolean
    onToggle: () => void
}

export default function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
    const pathname = usePathname()
    const [openMenu, setOpenMenu] = useState<string | null>(null)
    const sidebarRef = useRef<HTMLElement>(null) // Changed to HTMLElement for <aside>

    const menuConfig = [
        {
            label: 'Dashboard',
            path: '/dashboard/org-admin',
            icon: LayoutDashboard,
            description: 'High-level overview of compliance posture, tasks, and risks.',
            children: [
                { label: 'Compliance Dashboard', path: '/dashboard/compliance' },
                { label: 'Member Dashboard', path: '/dashboard/member' },
                { label: 'Internal Auditor Dashboard', path: '/dashboard/internal-auditor' },
                { label: 'External Auditor Dashboard', path: '/dashboard/external-auditor' },
            ],
        },
        {
            label: 'Risk Management',
            path: '/risk',
            icon: AlertTriangle,
            description: 'Dedicated section for the critical risk assessment and treatment process.',
            children: [
                { label: 'Asset Register', path: '/risk/asset-register' },
                { label: 'Risk Register', path: '/risk/risk-register' },
                { label: 'Risk Treatment Plan', path: '/risk/treatment-plans' },
                { label: 'Statement of Applicability', path: '/risk/statement-of-applicability' },
            ],
        },
        {
            label: 'Policy Management',
            path: '/policy-management',
            icon: Columns4,
        },
        {
            label: 'Awareness Training',
            path: '/awareness-training',
            icon: GraduationCap
        },
        {
            label: 'Tasks & Controls',
            path: '/tasks-controls',
            icon: ClipboardCheck,
        },
        {
            label: 'Audit & Monitoring',
            path: '/audit-monitoring',
            icon: ShieldEllipsis,
        },
        {
            label: 'Improvement Readiness',
            path: '/improvement-readiness',
            icon: Proportions,
        },
        {
            label: 'incident-management',
            path: '/incident-management',
            icon: Proportions,
        },
        {
            label: 'Evidence Library',
            path: '/evidence-library',
            icon: Proportions,
        },
        {
            label: 'Trust Center',
            path: '/trust-center',
            icon: Proportions,
        },
        {
            label: 'Org Structure',
            path: '/org-structure',
            icon: Proportions,
        },
        {
            label: 'Settings',
            path: '/settings',
            icon: Settings,
            description: 'Configure account, manage users, and connect to other services.',
            children: [
                { label: 'Organization Profile', path: '/settings/organization' },
                { label: 'User Management', path: '/settings/user-access-control' },
                { label: 'Subscription & Billing', path: '/settings/billing' },
                { label: 'Integrations', path: '/settings/integrations' },
                { label: 'Support & Knowledge Base', path: '/settings/help-support' },
                { label: 'Feedback & Roadmap', path: '/settings/feedback' },
            ],
        },
    ]

    const handleMenuToggle = (path: string) => {
        setOpenMenu(prevOpenMenu => (prevOpenMenu === path ? null : path))
    }

    // Effect to close the popover when the user navigates to a new page
    useEffect(() => {
        setOpenMenu(null)
    }, [pathname])

    // Effect to close the popover when clicking outside the sidebar
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
                setOpenMenu(null)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    return (
        <div className="fixed top-0 left-0 h-screen z-40">
            {!isCollapsed && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
                    onClick={onToggle}
                    aria-hidden="true"
                />
            )}
            
            <aside
                ref={sidebarRef}
                className={`
                    relative group
                    ${isCollapsed ? 'w-20' : 'w-64'}
                    bg-white border-r border-gray-200 h-full flex flex-col
                    transition-all duration-300 ease-in-out shadow-sm
                `}
                role="navigation"
                aria-label="Sidebar"
            >
                <div className="flex items-center justify-between py-3 px-2 border-b border-gray-200 bg-white">
                    {!isCollapsed ? (
                        <div className="flex items-center gap-2">
                            <QireonLogo variant="monochrome" className="h-10" />
                        </div>
                    ) : (
                        <div className="flex justify-center w-full">
                            <QireonLogo variant="graphicOnly" className="h-10" />
                        </div>
                    )}
                </div>

                <div className="flex-1 py-4 px-2">
                    <nav aria-label="Sidebar Navigation">
                        <ul className="space-y-1" role="menu">
                            {menuConfig.map(menu => (
                                <SidebarItem
                                    key={menu.path}
                                    item={menu}
                                    isCollapsed={isCollapsed}
                                    isActive={pathname.startsWith(menu.path)}
                                    isOpen={openMenu === menu.path}
                                    onToggleMenu={() => handleMenuToggle(menu.path)}
                                />
                            ))}
                        </ul>
                    </nav>
                </div>

                <button
                    onClick={onToggle}
                    className={`
                        absolute top-20 -translate-x-1/2 z-40
                        w-8 h-8 bg-white rounded-full border-2 border-gray-200 shadow-md
                        flex items-center justify-center text-gray-600 hover:border-gray-300 hover:text-gray-800
                        transition-all duration-300 ease-in-out
                        opacity-0 group-hover:opacity-100
                        ${isCollapsed ? 'left-20' : 'left-64'}
                    `}
                    title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                    aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                    aria-expanded={!isCollapsed}
                >
                    {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
                </button>
            </aside>
        </div>
    )
}
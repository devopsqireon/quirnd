'use client'

import Navbar from '@/component/Navbar/Navbar'
import Sidebar from '@/component/Sidebar/Sidebar'
import { useState, useEffect } from 'react'
import { PageHeaderProvider } from '../contexts/PageHeaderContext'
export default function ProtectedLayout({
    children,
}: {
    children: React.ReactNode
}) {
    // ... (all your existing state and functions for the sidebar remain the same)
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

    useEffect(() => {
        const saved = localStorage.getItem('sidebarCollapsed')
        if (saved !== null) {
            setSidebarCollapsed(JSON.parse(saved))
        }
    }, [])

    const toggleSidebar = () => {
        const newState = !sidebarCollapsed
        setSidebarCollapsed(newState)
        localStorage.setItem('sidebarCollapsed', JSON.stringify(newState))
    }

     useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1024) {
                setSidebarCollapsed(true)
            }
        }
        window.addEventListener('resize', handleResize)
        handleResize()
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <PageHeaderProvider>
            <div className="bg-gray-50">
                <Sidebar isCollapsed={sidebarCollapsed} onToggle={toggleSidebar} />
                <div
                    className={`
                        h-screen flex flex-col
                        transition-all duration-300 ease-in-out
                        ${sidebarCollapsed ? 'ml-20' : 'ml-64'}
                    `}
                >
                    <Navbar sidebarCollapsed={false} />
                    <main className="flex-1 overflow-y-auto">
                        <div className="max-w-full">{children}</div>
                        {/* ScrollToTop component can remain here if you wish */}
                    </main>
                </div>
            </div>
        </PageHeaderProvider>
    )
}


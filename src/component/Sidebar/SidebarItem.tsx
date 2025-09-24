'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface SidebarItemProps {
    item: {
        label: string
        path: string
        icon?: React.ComponentType<{ className?: string }>
        description?: string
        children?: { label: string; path: string }[]
    }
    isCollapsed: boolean
    isActive: boolean
    isOpen: boolean
    onToggleMenu: () => void
}

export default function SidebarItem({
    item,
    isCollapsed,
    isActive,
    isOpen,
    onToggleMenu,
}: SidebarItemProps) {
    const hasChildren = item.children && item.children.length > 0
    const pathname = usePathname()

    // Base classes for a consistent look on both links and buttons
    const baseClasses = 'flex items-center w-full gap-3 rounded-lg px-4 py-2.5 my-1 transition-colors duration-200'

    if (hasChildren) {
        return (
            <li className="relative" role="none">
                <button
                    onClick={onToggleMenu}
                    className={`
                        ${baseClasses}
                        ${isActive
                            ? 'bg-blue-50 text-blue-700 font-semibold' // --- Active State ---
                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 font-medium' // --- Inactive State ---
                        }
                        ${isCollapsed ? 'justify-center' : 'justify-between'}
                    `}
                    title={isCollapsed ? item.label : item.description || item.label}
                    aria-expanded={isOpen}
                >
                    <div className="flex items-center gap-3">
                        {item.icon && <item.icon className="w-5 h-5 flex-shrink-0" />}
                        {!isCollapsed && <span>{item.label}</span>}
                    </div>
                </button>

                {isOpen && (
                    <div className="absolute left-full top-0 ml-2 w-max bg-white rounded-2xl shadow-lg border border-gray-200 z-50">
                        <div className="p-3">
                            <div className="px-3 py-2">
                                <p className="font-semibold text-gray-800">{item.label}</p>
                                {item.description && <p className="text-sm text-gray-500 mt-1 max-w-xs">{item.description}</p>}
                            </div>
                            <hr className="my-2 border-gray-200" />
                            <ul role="menu">
                                {item.children?.map(child => (
                                    <li key={child.path} role="none">
                                        <Link
                                            href={child.path}
                                            className={`block w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                                                pathname === child.path
                                                    ? 'bg-blue-50 text-blue-700 font-medium' // Active sub-item
                                                    : 'text-gray-600 hover:bg-gray-100 hover:text-black' // Inactive sub-item
                                            }`}
                                            role="menuitem"
                                            title={child.label}
                                        >
                                            {child.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
            </li>
        )
    }

    return (
        <li className="relative" role="none">
            <Link
                href={item.path}
                className={`
                    ${baseClasses}
                    ${isActive
                        ? 'bg-blue-50 text-blue-700 font-semibold' // --- Active State ---
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 font-medium' // --- Inactive State ---
                    }
                    ${isCollapsed ? 'justify-center' : ''}
                `}
                title={isCollapsed ? item.label : item.description || item.label}
                role="menuitem"
            >
                {item.icon && <item.icon className="w-5 h-5 flex-shrink-0" />}
                {!isCollapsed && <span>{item.label}</span>}
            </Link>
        </li>
    )
}
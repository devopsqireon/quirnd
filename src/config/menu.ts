import { IconType } from 'react-icons'
import {
    FiHome,
    FiSettings,
    FiShield,
    FiAlertTriangle,
    FiUsers,
    FiBook,
    FiFileText,
} from 'react-icons/fi'

export type MenuItem = {
    label: string
    path: string
    icon?: IconType
    children?: MenuItem[]
}

export const menuConfig: MenuItem[] = [
    {
        label: 'Dashboard',
        path: '/dashboard',
        icon: FiHome,
    },
    {
        label: 'Compliance',
        path: '/compliance',
        icon: FiSettings,
    },
    {
        label: 'Risk Management',
        path: '/controls',
        icon: FiShield,
    },
    {
        label: 'Audits',
        path: '/risk',
        icon: FiAlertTriangle,
    },
    {
        label: 'Settings',
        path: '/incident',
        icon: FiUsers,
    },
    {
        label: 'Training & Awareness',
        path: '/training',
        icon: FiBook,
    },
    {
        label: 'Audit & Evidence',
        path: '/audit',
        icon: FiFileText,
    },
]

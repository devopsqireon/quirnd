'use client'
import React, { useState } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import {
    CheckCircle,
    Filter,
    SortAsc,
    Download,
    Play,
    ChevronRight,
    ChevronDown,
    User,
    Clock,
    FileText,
    BookOpen,
    Eye,
    Lightbulb,
    FileMinus,
    Library,
    List,
} from 'lucide-react'
import ISOMaturityChart from '../ui/ISOMaturityChart'
import { useRouter } from 'next/navigation'

type GapItem = {
    id: number
    title: string
    priority: 'High Priority' | 'Medium Priority' | 'Low Priority'
    responsibility: string
    reference: string
    estimatedTime: string
    status: string
    description: string
    why: string
}

const GapAssessmentReport = () => {
    const [expandedGaps, setExpandedGaps] = useState<Record<number, boolean>>(
        {},
    )
    const [filterOpen, setFilterOpen] = useState(false)
    const [sortOpen, setSortOpen] = useState(false)

    const router = useRouter()

    const handelSubmit = () => {
        router.push('/main-dashboard')
    }

    type Priority = 'High Priority' | 'Medium Priority' | 'Low Priority'
    const readinessData = [
        { name: 'Complete', value: 65, color: '#22c55e' },
        { name: 'Incomplete', value: 35, color: '#ef4444' },
    ]

    const strengthsData = [
        {
            category: 'Strong Physical Security Controls',
            status: 'Complete',
            code: 'A.11 - Physical and Environmental Security',
            count: 8,
            description:
                'Your access control systems are well-designed, with appropriate measures that ISO 27001 requirements. Continue maintaining these controls with regular reviews.',
            color: 'green',
        },
        {
            category: 'Effective Security Awareness',
            status: 'Complete',
            code: 'A.7.2.2 - Information Security Awareness',
            count: 6,
            description:
                'You identify awareness program provides regular training on information security responsibilities and procedures. Consider formalizing the program documentation.',
            color: 'green',
        },
        {
            category: 'Network Security Controls',
            status: 'Complete',
            code: 'A.13.1 - Network Security Management',
            count: 4,
            description:
                'Your network security measures including effectively protect your information assets from configurations update.',
            color: 'green',
        },
    ]

    const gapItems: GapItem[] = [
        {
            id: 1,
            title: 'Need to Formalize Access Control',
            priority: 'High Priority',
            responsibility: 'IT Manager',
            reference: 'A.9.1 - Access Control',
            estimatedTime: '4-6 weeks',
            status: 'Medium Risk',
            description:
                'While you have basic access controls in place, you need to formalize and document your access control policy and procedures as per ISO 27001 A.9.1 requirements.',
            why: 'Access control is fundamental to information security and is a mandatory requirement for ISO 27001 certification.',
        },
        {
            id: 2,
            title: 'Missing Information Security Policy',
            priority: 'High Priority',
            responsibility: 'CEO / Security Manager',
            reference: 'A.5 - Information Security Policies',
            estimatedTime: '2-3 weeks',
            status: 'High Risk',
            description:
                'You need to develop and implement a comprehensive information security policy that establishes management direction and support for information security.',
            why: 'An information security policy is the foundation of your ISMS and is required by ISO 27001 clause A.5.',
        },
        {
            id: 3,
            title: 'Incomplete Risk Assessment Process',
            priority: 'Medium Priority',
            responsibility: 'Risk Manager',
            reference: '6.1 - Actions to address risks',
            estimatedTime: '2-3 weeks',
            status: 'Medium Risk',
            description:
                'You need to develop and document a formal risk assessment methodology, conduct a comprehensive information security risk assessment, and implement a risk treatment plan.',
            why: 'Risk assessment is a core requirement of ISO 27001 and forms the basis for your information security controls.',
        },
        {
            id: 4,
            title: 'Inadequate Incident Response Plan',
            priority: 'Medium Priority',
            responsibility: 'Security Team',
            reference: 'A.16 - Information Security Incident Management',
            estimatedTime: '2-3 weeks',
            status: 'Medium Priority',
            description:
                'You need to develop a formal incident response plan with defined roles, responsibilities, and procedures for detecting, reporting, and responding to security incidents.',
            why: 'Incident response capabilities are critical for maintaining security and are required under ISO 27001 Annex A.16.',
        },
    ]

    const setupSteps = [
        { id: 1, label: 'Account Created', completed: true },
        { id: 2, label: 'Organization Setup', completed: true },
        { id: 3, label: 'Initial Self-Assessment', completed: true },
        { id: 4, label: 'GAP Analysis', completed: false, active: true },
        { id: 5, label: 'Dashboard', completed: false },
    ]

    const toggleGapExpansion = (gapId: number) => {
        setExpandedGaps((prev) => ({
            ...prev,
            [gapId]: !prev[gapId],
        }))
    }

    const getPriorityColor = (priority: Priority) => {
        switch (priority) {
            case 'High Priority':
                return 'text-red-600 bg-red-50 border-red-200'
            case 'Medium Priority':
                return 'text-orange-600 bg-orange-50 border-orange-200'
            default:
                return 'text-gray-600 bg-gray-50 border-gray-200'
        }
    }

    const getPriorityDot = (priority: Priority) => {
        switch (priority) {
            case 'High Priority':
                return 'bg-red-500'
            case 'Medium Priority':
                return 'bg-orange-500'
            default:
                return 'bg-gray-500'
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto p-6">
                <div className="mb-8">
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                        <span>Home</span>
                        <ChevronRight className="w-4 h-4 mx-2" />
                        <span>Onboarding</span>
                        <ChevronRight className="w-4 h-4 mx-2" />
                        <span>Organization Setup</span>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Compliance Environment Configuration
                    </h1>
                </div>

                <div className="flex gap-8">
                    <div className="w-64">
                        <h3 className="font-semibold mb-4">Setup Progress</h3>
                        <div className="space-y-3">
                            {setupSteps.map((step) => (
                                <div
                                    key={step.id}
                                    className="flex items-center gap-3"
                                >
                                    <div
                                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                                            step.completed
                                                ? 'bg-green-500 text-white'
                                                : step.active
                                                ? 'bg-blue-500 text-white'
                                                : 'bg-gray-200 text-gray-600'
                                        }`}
                                    >
                                        {step.completed ? (
                                            <CheckCircle className="w-4 h-4" />
                                        ) : (
                                            step.id
                                        )}
                                    </div>
                                    <span
                                        className={`text-sm ${
                                            step.active
                                                ? 'text-blue-600 font-medium'
                                                : 'text-gray-600'
                                        }`}
                                    >
                                        {step.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex-1">
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                                            <span className="text-white text-sm font-bold">
                                                AI
                                            </span>
                                        </div>
                                        <span className="text-sm font-medium text-blue-700">
                                            AI-Generated Report
                                        </span>
                                    </div>
                                    <h2 className="text-2xl font-bold text-blue-900 mb-3">
                                        Your ISO 27001 Gap Assessment Report
                                    </h2>
                                    <p className="text-blue-800 mb-4">
                                        AI Generated Summary: Based on your
                                        responses, your organization
                                        demonstrates strong physical security
                                        controls and documentation practices.
                                        However, there are significant gaps in
                                        formalized access management and risk
                                        assessment procedures that must be
                                        addressed to achieve ISO 27001
                                        compliance.
                                    </p>
                                    <div className="flex gap-3">
                                        <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 flex items-center gap-2">
                                            <Download className="w-4 h-4" />
                                            Download Full Report
                                        </button>
                                        <button className="bg-green-500 text-white px-4 py-2 rounded-md text-sm hover:bg-green-600 flex items-center gap-2">
                                            <Play className="w-4 h-4" />
                                            Start Your ISO 27001 Journey
                                        </button>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="relative w-32 h-32">
                                        <ResponsiveContainer
                                            width="100%"
                                            height="100%"
                                        >
                                            <PieChart>
                                                <Pie
                                                    data={readinessData}
                                                    cx="50%"
                                                    cy="50%"
                                                    innerRadius={40}
                                                    outerRadius={60}
                                                    paddingAngle={2}
                                                    dataKey="value"
                                                >
                                                    {readinessData.map(
                                                        (entry, index) => (
                                                            <Cell
                                                                key={`cell-${index}`}
                                                                fill={
                                                                    entry.color
                                                                }
                                                            />
                                                        ),
                                                    )}
                                                </Pie>
                                            </PieChart>
                                        </ResponsiveContainer>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="text-center">
                                                <div className="text-2xl font-bold text-gray-900">
                                                    65%
                                                </div>
                                                <div className="text-xs text-gray-600">
                                                    ISO 27001 Ready
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-2">
                                        <div className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded">
                                            Starting Level
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mb-8">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-semibold">
                                    Compliance Strengths
                                </h2>
                                <div className="flex items-center gap-2 text-sm text-blue-600">
                                    <span>Strengths Identified: 8</span>
                                    <CheckCircle className="w-4 h-4" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {strengthsData.map((strength, index) => (
                                    <div
                                        key={index}
                                        className="bg-white border border-green-200 rounded-lg p-6"
                                    >
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="flex items-center gap-2">
                                                <CheckCircle className="w-5 h-5 text-green-500" />
                                                <span className="text-sm font-medium text-green-600">
                                                    {strength.status}
                                                </span>
                                            </div>
                                        </div>

                                        <h3 className="font-semibold text-gray-900 mb-2">
                                            {strength.category}
                                        </h3>
                                        <div className="text-sm text-gray-600 mb-3">
                                            {strength.code}
                                        </div>
                                        <div className="text-sm font-medium text-gray-700 mb-3">
                                            {strength.count} Controls Covered
                                        </div>
                                        <p className="text-sm text-gray-600 mb-4">
                                            {strength.description}
                                        </p>

                                        <button className="text-sm text-blue-600 hover:underline flex items-center gap-1">
                                            View Details
                                            <ChevronRight className="w-3 h-3" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mb-8">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-semibold">
                                    Key ISO 27001 Gaps & Recommendations
                                </h2>
                                <div className="flex gap-2">
                                    <div className="relative">
                                        <button
                                            className="flex items-center gap-2 bg-white border border-gray-300 px-3 py-2 rounded-md text-sm hover:bg-gray-50"
                                            onClick={() =>
                                                setFilterOpen(!filterOpen)
                                            }
                                        >
                                            <Filter className="w-4 h-4" />
                                            Filter
                                        </button>
                                    </div>
                                    <div className="relative">
                                        <button
                                            className="flex items-center gap-2 bg-white border border-gray-300 px-3 py-2 rounded-md text-sm hover:bg-gray-50"
                                            onClick={() =>
                                                setSortOpen(!sortOpen)
                                            }
                                        >
                                            <SortAsc className="w-4 h-4" />
                                            Sort by
                                        </button>
                                    </div>
                                    <button className="flex items-center gap-2 bg-blue-500 text-white px-3 py-2 rounded-md text-sm hover:bg-blue-600">
                                        <Eye className="w-4 h-4" />
                                        Prioritize My Gaps
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-4 grid grid-cols-1 lg:grid-cols-2 gap-5">
                                {gapItems.map((gap) => (
                                    <div
                                        key={gap.id}
                                        className={`bg-white border rounded-lg p-6 ${getPriorityColor(
                                            gap.priority,
                                        )}`}
                                    >
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className={`w-3 h-3 rounded-full ${getPriorityDot(
                                                        gap.priority,
                                                    )}`}
                                                ></div>
                                                <div>
                                                    <span className="text-sm font-medium">
                                                        {gap.priority}
                                                    </span>
                                                    <div className="text-xs text-gray-600 mt-1">
                                                        {gap.reference}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <User className="w-4 h-4" />
                                                <span>
                                                    {gap.responsibility}
                                                </span>
                                                <Clock className="w-4 h-4 ml-2" />
                                                <span>{gap.estimatedTime}</span>
                                            </div>
                                        </div>
                                        <h3 className="font-semibold text-gray-900 mb-2">
                                            {gap.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm mb-4">
                                            {gap.description}
                                        </p>
                                        <div className="flex gap-2 mb-4">
                                            <button className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-600 flex items-center gap-2">
                                                <FileText className="w-4 h-4" />
                                                Create Task
                                            </button>
                                            <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm hover:bg-gray-50 flex items-center gap-2">
                                                <BookOpen className="w-4 h-4" />
                                                View Green Guide
                                            </button>
                                        </div>
                                        <button
                                            className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                                            onClick={() =>
                                                toggleGapExpansion(gap.id)
                                            }
                                        >
                                            Why is this important?
                                            {expandedGaps[gap.id] ? (
                                                <ChevronDown className="w-3 h-3" />
                                            ) : (
                                                <ChevronRight className="w-3 h-3" />
                                            )}
                                        </button>
                                        {expandedGaps[gap.id] && (
                                            <div className="mt-3 p-3 bg-gray-50 rounded text-sm text-gray-700">
                                                {gap.why}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <ISOMaturityChart />
                            <div className="bg-white p-6 rounded-xl shadow-lg font-sans max-w-4xl mx-auto mt-10">
                                <div className="mb-6">
                                    <h2 className="text-2xl font-bold text-gray-900">
                                        Next Steps & Getting Started
                                    </h2>
                                    <p className="text-gray-600">
                                        Your ISO 27001 Journey
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    <div className="md:col-span-2 space-y-8">
                                        <h3 className="text-xl font-semibold text-gray-800">
                                            What&apos;s Next?
                                        </h3>
                                        <div className="space-y-6">
                                            <div className="flex items-start gap-4">
                                                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white font-bold text-sm flex-shrink-0">
                                                    1
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-gray-900">
                                                        Review your personalized
                                                        gaps
                                                    </h4>
                                                    <p className="text-gray-600 text-sm">
                                                        Take time to understand
                                                        the identified gaps and
                                                        their implications for
                                                        your ISO 27001
                                                        compliance journey.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-4">
                                                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white font-bold text-sm flex-shrink-0">
                                                    2
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-gray-900">
                                                        Create tasks for your
                                                        team
                                                    </h4>
                                                    <p className="text-gray-600 text-sm">
                                                        Assign responsibilities
                                                        and create specific
                                                        tasks to address the
                                                        identified gaps,
                                                        starting with
                                                        high-priority items.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-4">
                                                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white font-bold text-sm flex-shrink-0">
                                                    3
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-gray-900">
                                                        Monitor progress
                                                    </h4>
                                                    <p className="text-gray-600 text-sm">
                                                        Use Qlison&apos;s
                                                        dashboard to track your
                                                        team&apos;s progress in
                                                        addressing gaps and
                                                        improving your ISO 27001
                                                        readiness.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-4 mt-6 text-sm text-blue-600">
                                            <a
                                                href="#"
                                                className="flex items-center gap-1 hover:underline"
                                            >
                                                <FileText className="w-4 h-4" />
                                                Getting Started Guide
                                            </a>
                                            <a
                                                href="#"
                                                className="flex items-center gap-1 hover:underline"
                                            >
                                                <List className="w-4 h-4" />
                                                My Tasks
                                            </a>
                                            <a
                                                href="#"
                                                className="flex items-center gap-1 hover:underline"
                                            >
                                                <Library className="w-4 h-4" />
                                                Policy Library
                                            </a>
                                            <a
                                                href="#"
                                                className="flex items-center gap-1 hover:underline"
                                            >
                                                <FileMinus className="w-4 h-4" />
                                                Risk Register
                                            </a>
                                        </div>

                                        <button
                                            onClick={handelSubmit}
                                            className="flex items-center justify-center w-full md:w-auto px-6 py-3 bg-blue-600 text-white rounded-md text-sm font-semibold hover:bg-blue-700 transition-colors mt-8"
                                        >
                                            <Play className="w-4 h-4 mr-2 fill-current" />
                                            Start Implementing Recommendations
                                        </button>
                                    </div>

                                    <div className="md:col-span-1 p-6 bg-blue-50 rounded-lg">
                                        <div className="flex items-center gap-2 mb-4">
                                            <Lightbulb className="w-5 h-5 text-blue-500 fill-blue-500" />
                                            <h3 className="font-bold text-blue-800">
                                                AI-Personalized Roadmap
                                            </h3>
                                        </div>
                                        <p className="text-gray-700 text-sm mb-4">
                                            Based on your assessment results, AI
                                            suggests this high-level roadmap to
                                            ISO 27001 certification:
                                        </p>
                                        <div className="space-y-4 text-gray-800 text-sm">
                                            <div className="flex items-start gap-3">
                                                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-200 text-blue-800 font-bold text-xs flex-shrink-0">
                                                    1
                                                </div>
                                                <div>
                                                    <p className="font-semibold">
                                                        Establish Access
                                                        Management (1-2 months)
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-200 text-blue-800 font-bold text-xs flex-shrink-0">
                                                    2
                                                </div>
                                                <div>
                                                    <p className="font-semibold">
                                                        Implement Risk
                                                        Assessment (2-3 months)
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-200 text-blue-800 font-bold text-xs flex-shrink-0">
                                                    3
                                                </div>
                                                <div>
                                                    <p className="font-semibold">
                                                        Develop Supplier
                                                        Controls (1-2 months)
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-200 text-blue-800 font-bold text-xs flex-shrink-0">
                                                    4
                                                </div>
                                                <div>
                                                    <p className="font-semibold">
                                                        Internal Audit (1 month)
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-200 text-blue-800 font-bold text-xs flex-shrink-0">
                                                    5
                                                </div>
                                                <div>
                                                    <p className="font-semibold">
                                                        Certification Audit (1-2
                                                        months)
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-6">
                                            Estimated time to certification:
                                            6-10 months
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GapAssessmentReport

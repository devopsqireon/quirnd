import React from 'react'
import {
    CheckCircle,
    Clock,
    FileText,
    HelpCircle,
    ArrowRight,
    Upload,
    Calendar,
    Users,
    Shield,
    AlertTriangle,
} from 'lucide-react'

const timelineData = [
    {
        id: 1,
        title: 'Setup',
        subtitle: 'Assessment and organizational setup completed',
        status: 'completed',
        icon: CheckCircle,
    },
    {
        id: 2,
        title: 'Gap Assessment',
        subtitle: 'Initial assessment completed on Jun 11, 2023',
        status: 'completed',
        icon: CheckCircle,
    },
    {
        id: 3,
        title: 'Risk Register',
        subtitle: 'Identify and document your risks',
        status: 'pending',
        icon: Clock,
    },
    {
        id: 4,
        title: 'Policy Upload',
        subtitle: 'Upload and organize control policies',
        status: 'pending',
        icon: Upload,
    },
    {
        id: 5,
        title: 'Training',
        subtitle: 'Complete organizational required training',
        status: 'pending',
        icon: Users,
    },
    {
        id: 6,
        title: 'Certification',
        subtitle: 'Final review and certification',
        status: 'pending',
        icon: Shield,
    },
]

const recommendations = [
    {
        type: 'policy',
        title: 'Define access control policy',
        category: 'Access - Engineering - Access',
        status: 'high',
        icon: '🔐',
    },
    {
        type: 'security',
        title: 'Upload HR security documentation',
        category: 'Clear Text',
        status: 'medium',
        icon: '📄',
    },
    {
        type: 'risk',
        title: 'Assign team member for risk assessment',
        category: 'Risk',
        status: 'high',
        icon: '⚠️',
    },
    {
        type: 'document',
        title: 'Document risk management processes',
        category: 'Risk - General, Policy',
        status: 'medium',
        icon: '📋',
    },
]

const todoItems = [
    { id: 1, text: 'Policy team onboarding', completed: false },
    { id: 2, text: 'Upload first policy', completed: false },
    { id: 3, text: 'Set up live register', completed: false },
    { id: 4, text: 'Assign training', completed: false },
    { id: 5, text: 'Begin evidence collection', completed: false },
    { id: 6, text: 'Begin evidence collection', completed: false },
]

const documents = [
    {
        name: 'Information Security Policy',
        status: 'uploaded',
        version: 'v1.2',
    },
    { name: 'Access Control Policy', status: 'uploaded', version: 'v1.1' },
    { name: 'Risk Assessment Methodology', status: 'pending', version: 'v1.0' },
    { name: 'Risk Assessment Methodology', status: 'pending', version: 'v1.0' },
    { name: 'Risk Assessment Methodology', status: 'pending', version: 'v1.0' },
    { name: 'Risk Assessment Methodology', status: 'pending', version: 'v1.0' },
]

const helpQuestions = [
    'How do I start uploading policies?',
    'What should I focus on first?',
    'How long until certification?',
]

// Custom Pie Chart Component
const GapAnalysisPieChart = () => {
    const totalDots = 12
    const completedDots = Math.round((18 / 114) * totalDots)

    const createDot = (index: number, isCompleted: boolean) => {
        const angle = (index * 360) / totalDots - 90
        const radian = (angle * Math.PI) / 180
        const radius = 45
        const x = 50 + radius * Math.cos(radian)
        const y = 50 + radius * Math.sin(radian)

        return (
            <circle
                key={index}
                cx={x}
                cy={y}
                r="3"
                fill={isCompleted ? '#06D6A0' : '#E5E7EB'}
                className="transition-colors duration-300"
            />
        )
    }

    return (
        <div className="bg-white rounded-lg border p-6">
            <div className="flex items-center gap-2 mb-6">
                <div className="w-4 h-4 bg-teal-400 rounded-full"></div>
                <h3 className="font-semibold text-gray-900">
                    Gap Analysis Summary
                </h3>
            </div>

            <div className="flex flex-col items-center">
                <div className="relative mb-4">
                    <svg width="100" height="100" className="mb-2">
                        {Array.from({ length: totalDots }, (_, i) =>
                            createDot(i, i < completedDots),
                        )}
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div className="text-2xl font-bold text-gray-900">
                            18
                        </div>
                        <div className="text-xs text-gray-400">of 114</div>
                    </div>
                </div>

                <div className="w-full space-y-3 mb-6">
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-700">
                            Controls Implemented
                        </span>
                        <span className="font-medium text-gray-900">
                            18 / 114
                        </span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-700">
                            High-Risk Controls
                        </span>
                        <span className="font-medium text-red-500">6</span>
                    </div>
                </div>

                <div className="w-full bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                    <div className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-red-700">
                            6 high-risk controls need immediate attention
                        </span>
                    </div>
                </div>
            </div>

            <button className="w-full text-blue-600 text-sm hover:underline flex items-center justify-center gap-1">
                Review Gap Summary <ArrowRight className="w-3 h-3" />
            </button>
        </div>
    )
}

// AI Recommendations Component
const AIRecommendations = () => {
    return (
        <div className="bg-white rounded-lg border p-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">
                    AI Recommendations
                </h3>
                <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                    Personalized
                </span>
            </div>

            <div className="space-y-3">
                {recommendations.map((rec, index) => (
                    <div
                        key={index}
                        className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg"
                    >
                        <span className="text-lg">{rec.icon}</span>
                        <div className="flex-1">
                            <div className="font-medium text-sm text-gray-900">
                                {rec.title}
                            </div>
                            <div className="text-xs text-gray-500">
                                {rec.category}
                            </div>
                            <div className="text-xs text-blue-600 mt-1">
                                Clear Text
                            </div>
                        </div>
                        <div
                            className={`w-2 h-2 rounded-full ${
                                rec.status === 'high'
                                    ? 'bg-red-500'
                                    : 'bg-yellow-500'
                            }`}
                        ></div>
                    </div>
                ))}
            </div>

            <button className="mt-4 text-blue-600 text-sm hover:underline flex items-center gap-1">
                See all recommendations <ArrowRight className="w-3 h-3" />
            </button>
        </div>
    )
}

// Timeline Component
const TimelineComponent = () => {
    return (
        <div className="bg-white rounded-lg border p-6">
            <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-4 h-4 text-blue-500" />
                <h3 className="font-semibold text-gray-900">
                    Timeline to ISO 27001 Certification
                </h3>
            </div>

            <div className="space-y-4">
                {timelineData.map((item, index) => (
                    <div key={item.id} className="flex items-center gap-4">
                        <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                item.status === 'completed'
                                    ? 'bg-green-100'
                                    : 'bg-gray-100'
                            }`}
                        >
                            {item.status === 'completed' ? (
                                <CheckCircle className="w-5 h-5 text-green-600" />
                            ) : (
                                <Clock className="w-5 h-5 text-gray-400" />
                            )}
                        </div>
                        <div className="flex-1">
                            <div className="font-medium text-sm text-gray-900">
                                {item.title}
                            </div>
                            <div className="text-xs text-gray-500">
                                {item.subtitle}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

// What to Do Next Component
const WhatToDoNext = () => {
    return (
        <div className="bg-white rounded-lg border p-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">What to Do Next</h3>
            </div>

            <div className="space-y-3">
                {todoItems.map((item) => (
                    <div
                        key={item.id}
                        className="flex items-center gap-3 p-2 bg-gray-200 rounded-md"
                    >
                        <input
                            type="checkbox"
                            checked={item.completed}
                            className="w-4 h-4 text-blue-600 rounded"
                            readOnly
                        />
                        <span
                            className={`text-sm ${
                                item.completed
                                    ? 'line-through text-gray-500'
                                    : 'text-gray-900'
                            }`}
                        >
                            {item.text}
                        </span>
                    </div>
                ))}
            </div>

            <button className="mt-4 text-blue-600 text-sm hover:underline flex items-center gap-1">
                View Complete Checklist <ArrowRight className="w-3 h-3" />
            </button>
        </div>
    )
}

// Document Upload Status Component
const DocumentUploadStatus = () => {
    return (
        <div className="bg-white rounded-lg border p-6">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-blue-500" />
                    <h3 className="font-semibold text-gray-900">
                        Document Upload Status
                    </h3>
                </div>
                <span className="text-sm text-gray-500">6 / 15</span>
            </div>

            <div className="text-sm text-gray-600 mb-4">
                Required documents: 6
            </div>

            <div className="space-y-3">
                {documents.map((doc, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-between p-2 hover:bg-gray-50 rounded bg-gray-200"
                    >
                        <div className="flex items-center gap-3">
                            <div
                                className={`w-2 h-2 rounded-full ${
                                    doc.status === 'uploaded'
                                        ? 'bg-green-500'
                                        : 'bg-gray-300'
                                }`}
                            ></div>
                            <span className="text-sm text-gray-900">
                                {doc.name}
                            </span>
                        </div>
                        <span className="text-xs text-gray-500">
                            {doc.version}
                        </span>
                    </div>
                ))}
            </div>

            <button className="mt-4 text-blue-600 text-sm hover:underline flex items-center gap-1">
                Open Policy Center <ArrowRight className="w-3 h-3" />
            </button>
        </div>
    )
}

// Need Help Component
const NeedHelp = () => {
    return (
        <div className="bg-white rounded-lg border p-6">
            <div className="flex items-center gap-2 mb-4">
                <HelpCircle className="w-4 h-4 text-blue-500" />
                <h3 className="font-semibold text-gray-900">Need Help?</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {helpQuestions.map((question, index) => (
                    <div
                        key={index}
                        className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer"
                    >
                        <div className="text-sm font-medium text-gray-900 mb-1">
                            {question}
                        </div>
                        <div className="text-xs text-gray-500">
                            Get quick help with common questions.
                        </div>
                    </div>
                ))}
            </div>

            <button className="mt-4 text-blue-600 text-sm hover:underline flex items-center gap-1">
                Visit our Help Center <ArrowRight className="w-3 h-3" />
            </button>
        </div>
    )
}

// Main Dashboard Component
const ComplianceDashboard = () => {
    return (
        <div className="min-h-screen bg-gray-50 p-6">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">
                            Welcome to your compliance workspace!
                        </h1>
                        <p className="text-gray-600">
                            You&apos;ve completed setup and now your real work
                            towards final compliance starts here.
                        </p>
                    </div>
                    <div className="text-right">
                        <div className="text-2xl font-bold text-blue-600">
                            32%
                        </div>
                        <div className="text-sm text-gray-500">
                            32% Complete
                        </div>
                        <button className="mt-2 text-blue-600 text-sm hover:underline flex items-center gap-1">
                            Explore Control Maps{' '}
                            <ArrowRight className="w-3 h-3" />
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <GapAnalysisPieChart />
                        <AIRecommendations />
                    </div>
                    <TimelineComponent />
                </div>

                <div className="space-y-6">
                    <WhatToDoNext />
                    <DocumentUploadStatus />
                </div>
            </div>
            <div className="mt-6">
                <NeedHelp />
            </div>
        </div>
    )
}

export default ComplianceDashboard

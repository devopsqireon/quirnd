'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import the router
import { CheckCircle, AlertTriangle, Clock, Target, FileText, ChevronDown, ChevronUp, ExternalLink, ShieldCheck, BarChart, Calendar, Link as LinkIcon, Milestone, ClipboardCheck } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

// --- MOCK DATA (Simulating a more mature ISMS) ---
const complianceScore = 68;

const summaryStats = {
    strengths: 12,
    inProgress: 5,
    gaps: 4,
};

const prioritizedTasks = [
    { id: 'task-1', title: 'Develop and approve an Information Security Policy', clause: '5.2', priority: 'High', status: 'In Progress' },
    { id: 'task-2', title: 'Develop a formal Risk Treatment Plan (RTP) and Statement of Applicability (SoA)', clause: '6.1.3', priority: 'High', status: 'Not Started' },
    { id: 'task-3', title: 'Establish and document a formal process for document control', clause: '7.5', priority: 'Medium', status: 'Completed' },
    { id: 'task-4', title: 'Define and document the scope of the ISMS', clause: '4.3', priority: 'Medium', status: 'Completed' },
    { id: 'task-5', title: 'Conduct an internal ISMS audit', clause: '9.2', priority: 'Low', status: 'Not Started' },
    { id: 'task-6', title: 'Implement user access control procedures', clause: 'A.5.15', priority: 'High', status: 'Not Started' },
    { id: 'task-7', title: 'Review and update supplier agreements for security clauses', clause: 'A.15.2', priority: 'Medium', status: 'In Progress' },
];

const riskData = [
    { name: 'Critical', value: 4 },
    { name: 'High', value: 12 },
    { name: 'Medium', value: 25 },
    { name: 'Low', value: 40 },
];
const RISK_COLORS = ['#ef4444', '#f97316', '#f59e0b', '#3b82f6'];

const controlEffectivenessData = {
    effective: 89,
    needsImprovement: 15,
    ineffective: 3
};

const upcomingActivities = [
    { id: 1, title: 'Quarterly Risk Assessment', dueDate: '2025-09-30', type: 'Risk' },
    { id: 2, title: 'Internal Audit Cycle Begins', dueDate: '2025-10-01', type: 'Audit' },
    { id: 3, title: 'Management Review Meeting', dueDate: '2025-10-15', type: 'Meeting' },
    { id: 4, title: 'Acceptable Use Policy Review', dueDate: '2025-11-01', type: 'Policy' },
];

const certificationTimelineData = [
    { id: 1, title: 'Phase 1: Scoping & Planning', status: 'Completed', date: 'August 2025' },
    { id: 2, title: 'Phase 2: Risk Assessment & Treatment', status: 'In Progress', date: 'September 2025', progress: 60 },
    { id: 3, title: 'Phase 3: Control Implementation', status: 'Upcoming', date: 'Oct - Nov 2025' },
    { id: 4, title: 'Phase 4: Internal Audit & Management Review', status: 'Upcoming', date: 'December 2025' },
    { id: 5, title: 'Phase 5: Stage 1 Certification Audit', status: 'Upcoming', date: 'January 2026' },
    { id: 6, title: 'Phase 6: Stage 2 Certification Audit', status: 'Upcoming', date: 'February 2026' },
];


// --- DASHBOARD COMPONENTS ---

const NextStepWidget: React.FC = () => {
    const router = useRouter();

    const handleNavigate = () => {
        router.push('/risk/asset-register');
    };

    return (
        <div className="bg-slate-800 text-white p-6 rounded-lg shadow-lg">
            <div className="flex items-start gap-4">
                <div className="bg-white/10 p-3 rounded-full">
                    <ClipboardCheck className="w-6 h-6 text-white" />
                </div>
                <div>
                    <h2 className="text-xl font-bold">Your Next Step: Start Your Risk Assessment</h2>
                    <p className="mt-1 text-slate-300">This is the foundation of your ISMS. By identifying and treating risks, you will justify your security controls and prepare for your audit.</p>
                    <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                        <span className="bg-white/10 px-2 py-1 rounded-full text-center">Asset Register</span>
                        <span className="bg-white/10 px-2 py-1 rounded-full text-center">Risk Register</span>
                        <span className="bg-white/10 px-2 py-1 rounded-full text-center">Risk Treatment Plan</span>
                        <span className="bg-white/10 px-2 py-1 rounded-full text-center">Statement of Applicability</span>
                    </div>
                    <div className="relative inline-block mt-5 group">
                        <button onClick={handleNavigate} className="bg-white text-slate-800 font-semibold px-4 py-2 rounded-lg hover:bg-slate-200 transition-colors">
                            Start Risk Assessment
                        </button>
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-700 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
                            This process begins with creating your Asset Register.
                            <svg className="absolute text-slate-700 h-2 w-full left-0 top-full" x="0px" y="0px" viewBox="0 0 255 255"><polygon className="fill-current" points="0,0 127.5,127.5 255,0"/></svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


const CompliancePostureWidget = ({ score, stats }: { score: number, stats: { strengths: number, inProgress: number, gaps: number } }) => {
    const circumference = 2 * Math.PI * 50;
    const offset = circumference - (score / 100) * circumference;
    const getColor = (s: number) => {
        if (s < 40) return 'text-red-500';
        if (s < 75) return 'text-yellow-500';
        return 'text-green-500';
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col md:flex-row items-center gap-6">
            <div className="flex-shrink-0">
                <div className="relative">
                    <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 120 120">
                        <circle cx="60" cy="60" r="50" strokeWidth="10" stroke="currentColor" className="text-slate-200" fill="transparent" />
                        <circle cx="60" cy="60" r="50" strokeWidth="10" stroke="currentColor" fill="transparent" strokeDasharray={circumference} strokeDashoffset={offset} className={`transition-all duration-1000 ease-out ${getColor(score)}`} strokeLinecap="round" />
                    </svg>
                    <span className={`absolute inset-0 flex items-center justify-center text-4xl font-bold ${getColor(score)}`}>{score}%</span>
                </div>
            </div>
            <div className="flex-grow w-full">
                <h2 className="text-lg font-semibold text-slate-800 mb-4">Overall Compliance Posture</h2>
                <p className="text-sm text-slate-500 mb-4">Your real-time score based on implemented controls and evidence.</p>
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <CheckCircle className="w-6 h-6 text-green-500" />
                        <div>
                            <p className="font-semibold text-slate-700">{stats.strengths} Strengths</p>
                            <p className="text-xs text-slate-500">Controls fully implemented</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Clock className="w-6 h-6 text-yellow-500" />
                        <div>
                            <p className="font-semibold text-slate-700">{stats.inProgress} In Progress</p>
                            <p className="text-xs text-slate-500">Controls partially implemented</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <AlertTriangle className="w-6 h-6 text-red-500" />
                        <div>
                            <p className="font-semibold text-slate-700">{stats.gaps} Identified Gaps</p>
                            <p className="text-xs text-slate-500">Controls not yet implemented</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ActionPlanWidget: React.FC<{ tasks: any[] }> = ({ tasks }) => {
    const [activeTab, setActiveTab] = useState('High');

    const getStatusClass = (status: string) => {
        switch (status) {
            case 'Completed': return 'bg-green-100 text-green-800';
            case 'In Progress': return 'bg-blue-100 text-blue-800';
            default: return 'bg-slate-100 text-slate-800';
        }
    };

    const filteredTasks = tasks.filter(task => task.priority === activeTab);
    const completedTasks = tasks.filter(task => task.status === 'Completed').length;
    const totalTasks = tasks.length;
    const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

    return (
        <div className="bg-white rounded-lg shadow-sm">
            <div className="p-4 border-b border-slate-200">
                <div className="flex items-center gap-3 mb-4">
                    <Target className="w-6 h-6 text-blue-600" />
                    <h2 className="text-lg font-semibold text-slate-800">Action Plan</h2>
                </div>
                <div>
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-semibold text-slate-700">Overall Progress</span>
                        <span className="text-sm font-semibold text-slate-700">{completedTasks} / {totalTasks} Completed</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2.5">
                        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
                    </div>
                </div>
            </div>
            
            <div className="flex border-b border-slate-200">
                {['High', 'Medium', 'Low'].map(priority => (
                    <button 
                        key={priority}
                        onClick={() => setActiveTab(priority)}
                        className={`flex-1 py-3 text-sm font-semibold focus:outline-none transition-colors ${activeTab === priority ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:text-slate-800'}`}
                    >
                        {priority} Priority
                    </button>
                ))}
            </div>

            <div className="p-4">
                {filteredTasks.length > 0 ? (
                    <div className="space-y-3">
                        {filteredTasks.map(task => (
                             <div key={task.id} className="p-3 bg-slate-50 rounded-md border border-slate-200 flex items-center justify-between gap-4">
                                <div className="flex items-center gap-3">
                                    <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" checked={task.status === 'Completed'} readOnly />
                                    <div>
                                        <p className="text-sm font-medium text-slate-800">{task.title}</p>
                                        <p className="text-xs text-slate-500">Clause: {task.clause}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                     <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusClass(task.status)}`}>{task.status}</span>
                                     <button className="flex items-center gap-1 text-blue-600 hover:text-blue-800 font-semibold text-sm">
                                        View <ExternalLink className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <p className="text-slate-500">No {activeTab.toLowerCase()} priority tasks.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

const CertificationTimeline: React.FC = () => {
    const getStatusInfo = (status: string) => {
        switch (status) {
            case 'Completed':
                return { icon: CheckCircle, color: 'text-white', bgColor: 'bg-green-500', badge: 'bg-green-100 text-green-800' };
            case 'In Progress':
                return { icon: Clock, color: 'text-white', bgColor: 'bg-blue-500', badge: 'bg-blue-100 text-blue-800' };
            default:
                return { icon: 'div', color: '', bgColor: 'bg-slate-300', badge: 'bg-slate-100 text-slate-600' };
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center gap-3 mb-6">
                <Milestone className="w-6 h-6 text-indigo-500" />
                <h2 className="text-lg font-semibold text-slate-800">Timeline to ISO 27001 Certification</h2>
            </div>
            <div className="space-y-4">
                {certificationTimelineData.map((item, index) => {
                    const { icon: Icon, bgColor, badge } = getStatusInfo(item.status);
                    const isLast = index === certificationTimelineData.length - 1;
                    
                    let connectorColor = 'bg-slate-200';
                    if (item.status === 'Completed') {
                        const nextItem = certificationTimelineData[index + 1];
                        if (nextItem && nextItem.status !== 'Upcoming') {
                            connectorColor = 'bg-green-500';
                        }
                    }
                     if(item.status === 'In Progress') {
                        connectorColor = 'bg-blue-500';
                     }


                    return (
                        <div key={item.id} className="relative flex gap-4 group">
                            {/* Connector Line */}
                            {!isLast && (
                                <div className="absolute left-5 top-10 h-full w-0.5" style={{backgroundColor: connectorColor.replace('bg-','')}}></div>
                            )}
                             {item.status === 'In Progress' && !isLast && (
                                <div className="absolute left-5 top-10 h-full w-0.5">
                                    <div className="h-full w-full bg-slate-200">
                                         <div className="h-1/2 w-full bg-blue-500"></div>
                                    </div>
                                </div>
                            )}


                            {/* Icon */}
                            <div className={`relative flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center z-10 ${bgColor}`}>
                                {Icon === 'div' ? (
                                    <div className="w-3 h-3 bg-white rounded-full"></div>
                                ) : (
                                    <Icon className="w-5 h-5 text-white" />
                                )}
                            </div>

                            {/* Details */}
                            <div className="flex-grow pb-4">
                                <div className="flex items-center justify-between">
                                    <p className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">{item.title}</p>
                                    <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${badge}`}>{item.status}</span>
                                </div>
                                <p className="text-sm text-slate-500 mt-1">{item.date}</p>
                                {item.status === 'In Progress' && item.progress && (
                                    <div className="mt-2">
                                        <div className="w-full bg-slate-200 rounded-full h-1.5">
                                            <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${item.progress}%` }}></div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};


const RiskOverview: React.FC = () => (
    <div className="bg-white p-6 rounded-lg shadow-sm h-full">
        <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="w-6 h-6 text-orange-500" />
            <h2 className="text-lg font-semibold text-slate-800">Risk Management Overview</h2>
        </div>
        <div style={{ width: '100%', height: 250 }}>
            <ResponsiveContainer>
                <PieChart>
                    <Pie data={riskData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} labelLine={false} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                        {riskData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={RISK_COLORS[index % RISK_COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend iconType="circle" />
                </PieChart>
            </ResponsiveContainer>
        </div>
    </div>
);

const ControlEffectiveness: React.FC = () => (
     <div className="bg-white p-6 rounded-lg shadow-sm h-full">
        <div className="flex items-center gap-3 mb-4">
            <ShieldCheck className="w-6 h-6 text-green-500" />
            <h2 className="text-lg font-semibold text-slate-800">Control Effectiveness</h2>
        </div>
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-600">Effective</span>
                <span className="text-sm font-bold text-green-600">{controlEffectivenessData.effective}</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2.5">
                <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${(controlEffectivenessData.effective / (controlEffectivenessData.effective + controlEffectivenessData.needsImprovement + controlEffectivenessData.ineffective)) * 100}%` }}></div>
            </div>

            <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-600">Needs Improvement</span>
                <span className="text-sm font-bold text-yellow-600">{controlEffectivenessData.needsImprovement}</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2.5">
                <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: `${(controlEffectivenessData.needsImprovement / (controlEffectivenessData.effective + controlEffectivenessData.needsImprovement + controlEffectivenessData.ineffective)) * 100}%` }}></div>
            </div>

             <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-600">Ineffective</span>
                <span className="text-sm font-bold text-red-600">{controlEffectivenessData.ineffective}</span>
            </div>
             <div className="w-full bg-slate-200 rounded-full h-2.5">
                <div className="bg-red-500 h-2.5 rounded-full" style={{ width: `${(controlEffectivenessData.ineffective / (controlEffectivenessData.effective + controlEffectivenessData.needsImprovement + controlEffectivenessData.ineffective)) * 100}%` }}></div>
            </div>
        </div>
    </div>
);

const UpcomingActivities: React.FC = () => {
    const getTypeInfo = (type: string) => {
        switch (type) {
            case 'Risk': return { icon: BarChart, color: 'bg-orange-100 text-orange-600' };
            case 'Audit': return { icon: ShieldCheck, color: 'bg-blue-100 text-blue-600' };
            case 'Meeting': return { icon: Clock, color: 'bg-purple-100 text-purple-600' };
            case 'Policy': return { icon: FileText, color: 'bg-green-100 text-green-600' };
            default: return { icon: Calendar, color: 'bg-slate-100 text-slate-600' };
        }
    };
    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center gap-3 mb-4">
                <Calendar className="w-6 h-6 text-purple-500" />
                <h2 className="text-lg font-semibold text-slate-800">Upcoming Activities</h2>
            </div>
            <div className="space-y-4">
                {upcomingActivities.map(activity => {
                    const { icon: Icon, color } = getTypeInfo(activity.type);
                    return (
                        <div key={activity.id} className="flex items-center gap-4">
                            <div className={`p-2 rounded-full ${color}`}>
                                <Icon className="w-5 h-5" />
                            </div>
                            <div className="flex-grow">
                                <p className="font-semibold text-slate-700">{activity.title}</p>
                            </div>
                            <p className="text-sm text-slate-500 font-medium shrink-0">{activity.dueDate}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const QuickAccess: React.FC = () => {
    const links = [
        { title: 'Risk Register', icon: BarChart, href: '#' },
        { title: 'Policy Management', icon: FileText, href: '#' },
        { title: 'Internal Audits', icon: ShieldCheck, href: '#' },
        { title: 'Key Personnel', icon: Clock, href: '#' },
    ];
    return (
        <div className="grid grid-cols-2 gap-4">
            {links.map(link => {
                const { icon: Icon } = link;
                return (
                    <a key={link.title} href={link.href} className="bg-white p-4 rounded-lg shadow-sm flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow">
                        <Icon className="w-8 h-8 text-blue-600 mb-2" />
                        <span className="text-sm font-semibold text-slate-700">{link.title}</span>
                    </a>
                )
            })}
        </div>
    )
}

// --- MAIN DASHBOARD PAGE ---
const DashboardPage: React.FC = () => {
    return (
        <div className="bg-slate-100 font-sans p-4 sm:p-6 lg:p-8 min-h-screen">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900">Org Admin Dashboard</h1>
                    <p className="text-slate-600 mt-1">Here's your ISMS command center. Welcome, Admin.</p>
                </div>
                
                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:items-start">
                    {/* Left Column (Main Content) */}
                    <div className="lg:col-span-2 space-y-6">
                        <NextStepWidget />
                        <ActionPlanWidget tasks={prioritizedTasks} />
                        <CertificationTimeline />
                    </div>

                    {/* Right Column (Sidebar) */}
                    <div className="space-y-6">
                        <QuickAccess />
                        <CompliancePostureWidget score={complianceScore} stats={summaryStats} />
                        <RiskOverview />
                        <ControlEffectiveness />
                        <UpcomingActivities />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardPage;


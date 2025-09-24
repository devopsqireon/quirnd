'use client'

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { usePageHeader } from '@/app/contexts/PageHeaderContext';
import { Check, Upload, ChevronLeft, ChevronRight, FileText, X, Lightbulb } from 'lucide-react';

// --- DATA: GAP ANALYSIS QUESTIONS (with Expected Evidence) ---
const GAP_ANALYSIS_QUESTIONS = {
    'Clause 4: Context': [
        { id: '4.1', ref: 'Clause 4.1', question: "Have you identified internal and external issues relevant to your organization's purpose and information security?", guidance: "Comment on how these issues are monitored.", expectedEvidence: ['SWOT Analysis', 'PESTLE Analysis', 'Meeting Minutes discussing context'] },
        { id: '4.2', ref: 'Clause 4.2', question: "Have you identified all interested parties (e.g., clients, employees, regulators) and their information security requirements?", guidance: "Upload a stakeholder register or a document outlining their requirements.", expectedEvidence: ['Stakeholder Register', 'Communication Plan', 'Documented requirements from clients/regulators'] },
        { id: '4.3', ref: 'Clause 4.3', question: "Has the scope of your Information Security Management System (ISMS) been formally defined and documented?", guidance: "This is critical. Upload the official 'Scope of the ISMS' document.", expectedEvidence: ['Official "Scope of the ISMS" Document'] },
    ],
    'Clause 5: Leadership': [
        { id: '5.1', ref: 'Clause 5.1', question: "Can you demonstrate top management's commitment to the ISMS (e.g., by providing resources, promoting security)?", guidance: "Upload management review minutes, signed policy documents, or budget approvals for security initiatives.", expectedEvidence: ['Management Review Minutes', 'Signed Policy Documents', 'Budget Approvals for Security'] },
        { id: '5.2', ref: 'Clause 5.2', question: "Has the organization defined and approved an Information Security Policy that is communicated and available?", guidance: "Upload the main Information Security Policy document. Comment on how it's made available to staff and stakeholders.", expectedEvidence: ['The main Information Security Policy document', 'Communication records (emails, intranet page)'] },
        { id: '5.3', ref: 'Clause 5.3', question: "Have information security roles, responsibilities, and authorities been clearly assigned and communicated?", guidance: "Upload an organizational chart, RACI matrix, or link to the 'Key Personnel & Responsibilities' section in Qireon.", expectedEvidence: ['Organizational Chart with security roles', 'RACI Matrix', 'Job Descriptions for key personnel'] },
    ],
    'Clause 6: Planning': [
        { id: '6.1.2', ref: 'Clause 6.1.2', question: "Have you defined and implemented a formal information security risk assessment process?", guidance: "Upload the risk assessment methodology or procedure document.", expectedEvidence: ['Risk Assessment Methodology/Procedure Document', 'Risk Register Template'] },
        { id: '6.1.3', ref: 'Clause 6.1.3', question: "Have you developed a risk treatment plan, and is there a Statement of Applicability (SoA) to justify control selections?", guidance: "Upload the Risk Treatment Plan (RTP) and the Statement of Applicability (SoA).", expectedEvidence: ['Risk Treatment Plan (RTP)', 'Statement of Applicability (SoA)'] },
        { id: '6.2', ref: 'Clause 6.2', question: "Have you established measurable information security objectives at relevant functions and levels?", guidance: "Upload the document listing the security objectives and how they will be measured (e.g., KPIs).", expectedEvidence: ['Information Security Objectives Document', 'KPIs/Metrics Dashboard'] },
    ],
    'Clause 7: Support': [
        { id: '7.2', ref: 'Clause 7.2', question: "Do you have a process to ensure that individuals involved in the ISMS are competent on the basis of education, training, or experience?", guidance: "Upload training records, competency matrices, or relevant certifications of key personnel.", expectedEvidence: ['Training Records/Certificates', 'Competency Matrix', 'Job descriptions with required skills'] },
        { id: '7.3', ref: 'Clause 7.3', question: "Is there an ongoing security awareness program for all relevant personnel?", guidance: "Upload awareness training materials, phishing campaign results, or communication records.", expectedEvidence: ['Security Awareness Training Materials', 'Phishing Campaign Results', 'Internal Security Newsletters'] },
        { id: '7.5', ref: 'Clause 7.5', question: "Is there a documented process for creating, controlling, and maintaining documented information for the ISMS?", guidance: "Upload the document control procedure.", expectedEvidence: ['Document Control Procedure', 'Master Document List'] },
    ],
    'Clause 8: Operation': [
        { id: '8.1', ref: 'Clause 8.1', question: "Are the processes needed to meet information security requirements planned, implemented, and controlled?", guidance: "Upload process documents, standard operating procedures (SOPs), or system configuration documents.", expectedEvidence: ['Standard Operating Procedures (SOPs)', 'Process Flowcharts', 'System Configuration Baselines'] },
        { id: '8.2', ref: 'Clause 8.2', question: "Have you performed the information security risk assessment at planned intervals?", guidance: "Upload the most recent completed risk assessment report or risk register.", expectedEvidence: ['Completed Risk Assessment Report', 'Updated Risk Register'] },
        { id: '8.3', ref: 'Clause 8.3', question: "Have you implemented the information security risk treatment plan?", guidance: "Provide evidence of control implementation. This could be screenshots, change logs, or links to implemented policies.", expectedEvidence: ['Evidence of implemented controls (screenshots, change logs)', 'Project plans for control implementation'] },
    ],
    'Clause 9: Performance': [
        { id: '9.1', ref: 'Clause 9.1', question: "Do you monitor, measure, analyze, and evaluate the performance of your ISMS and its controls?", guidance: "Upload security metrics dashboards, monitoring reports, or log analysis summaries.", expectedEvidence: ['Security Metrics Dashboard (e.g., from SIEM)', 'Vulnerability Scan Reports', 'Performance Evaluation Reports'] },
        { id: '9.2', ref: 'Clause 9.2', question: "Does your organization conduct internal ISMS audits at planned intervals?", guidance: "Upload the internal audit program/schedule and the most recent internal audit reports.", expectedEvidence: ['Internal Audit Program/Schedule', 'Completed Internal Audit Reports', 'Nonconformity Reports from internal audit'] },
        { id: '9.3', ref: 'Clause 9.3', question: "Does top management regularly review the ISMS to ensure its suitability, adequacy, and effectiveness?", guidance: "Upload the minutes and action items from the last management review meeting.", expectedEvidence: ['Management Review Meeting Minutes', 'Presentation slides from review', 'Action items log from review'] },
    ],
    'Clause 10: Improvement': [
        { id: '10.2', ref: 'Clause 10.2', question: "Do you have a process to identify, address, and learn from nonconformities and implement corrective actions?", guidance: "Upload your corrective action procedure and a log/register of any identified nonconformities and their status.", expectedEvidence: ['Corrective Action Procedure', 'Corrective Action Request (CAR) Log/Register'] },
    ],
};

const GAP_ANALYSIS_HELP_CONTENT = {
    '4.1': { title: "Why this matters", content: "Auditors check this to ensure your ISMS is aligned with your business strategy, not just an isolated IT project. It shows you understand the bigger picture." },
    '4.2': { title: "Auditor's Focus", content: "This proves you've considered your obligations to everyone involved. An auditor wants to see that you know what's expected of you, legally and contractually." },
    '4.3': { title: "Critical for Audit", content: "The scope statement defines the boundaries of your audit. Without a clear, documented scope, an auditor cannot begin their assessment." },
    '5.1': { title: "Leadership Buy-In", content: "Auditors will specifically look for evidence that leadership is actively involved. This proves the ISMS is taken seriously at the highest level." },
    '5.2': { title: "The 'Constitution' of your ISMS", content: "This policy is the single most important document. Auditors see it as the foundation upon which all your security controls are built." },
    '5.3': { title: "Demonstrating Accountability", content: "An auditor needs to see a clear chain of command for information security. This shows that people are held accountable for their roles." },
    '6.1.2': { title: "The Heart of the ISMS", content: "A structured risk assessment process is non-negotiable. Auditors will scrutinize this to ensure you're identifying and evaluating threats systematically." },
    '6.1.3': { title: "Justifying Your Controls", content: "The SoA tells an auditor not only which controls you've chosen, but also why you've excluded others. It's a key document for demonstrating a thoughtful security strategy." },
    '6.2': { title: "Measuring Success", content: "Auditors look for measurable objectives to verify that your ISMS is actually achieving what it set out to do. 'Being secure' is not enough; you need KPIs." },
    '7.2': { title: "Proving Competence", content: "This shows an auditor that the people running your ISMS are qualified for the job. It’s about having the right people in the right seats." },
    '7.3': { title: "The Human Firewall", content: "Auditors know that technical controls can fail. A strong awareness program is evidence that you are strengthening your weakest link: your people." },
    '7.5': { title: "Controlling Your Documents", content: "An ISMS generates a lot of documentation. Auditors need to see that you have a formal process for version control, approvals, and reviews." },
    '8.1': { title: "From Planning to Practice", content: "This is where you prove that your policies and procedures are actually being followed in day-to-day operations. Auditors look for consistency." },
    '8.2': { title: "A Living Process", content: "Risk is not a one-time activity. Evidence of regular risk assessments shows an auditor that your ISMS is adapting to new threats." },
    '8.3': { title: "Closing the Loop on Risk", content: "It's not enough to identify risks; you must treat them. Auditors will check your risk treatment plan against actual implemented controls." },
    '9.1': { title: "Data-Driven Security", content: "This shows an auditor that you're not just 'hoping' your controls work. You are actively monitoring and measuring their effectiveness." },
    '9.2': { title: "Auditing Yourself", content: "Internal audits are how you find problems before an external auditor does. It demonstrates a commitment to proactive improvement." },
    '9.3': { title: "Steering the Ship", content: "Management reviews are critical for proving that leadership is staying informed and making strategic decisions about the ISMS." },
    '10.2': { title: "Learning from Mistakes", content: "No ISMS is perfect. Auditors want to see that when something goes wrong, you have a formal process to fix it and prevent it from happening again." },
};

const CLAUSES = Object.keys(GAP_ANALYSIS_QUESTIONS);

// --- TYPE DEFINITIONS ---
type Status = 'Yes' | 'No' | 'Partially' | null;
interface Answer {
    status: Status;
    comments: string;
    evidenceFiles: File[];
}
interface AllAnswers {
    [questionId: string]: Answer;
}

// --- REUSABLE UI COMPONENTS ---

const QSensei: React.FC<{ title: string; content: React.ReactNode }> = ({ title, content }) => {
    const [isOpen, setIsOpen] = useState(false);
    const popoverRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative inline-flex ml-2" ref={popoverRef}>
            <div className="relative group">
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-blue-500 hover:text-blue-700 transition-colors cursor-pointer"
                    aria-label="QSensei"
                >
                    <Lightbulb className="w-4 h-4" />
                </button>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-700 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
                    QSensei Suggestion
                    <svg className="absolute text-slate-700 h-2 w-full left-0 top-full" x="0px" y="0px" viewBox="0 0 255 255"><polygon className="fill-current" points="0,0 127.5,127.5 255,0"/></svg>
                </div>
            </div>
            {isOpen && (
                 <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 bg-slate-50 border border-slate-300 rounded-lg shadow-xl z-10">
                    <div className="p-4">
                         <div className="flex items-center mb-2">
                            <span className="text-blue-500"><Lightbulb className="w-5 h-5"/></span>
                            <h4 className="font-semibold text-sm text-slate-800 ml-2">{title}</h4>
                        </div>
                        <div className="text-xs text-slate-600 space-y-2">{content}</div>
                    </div>
                     <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-50 border-b border-r border-slate-300 transform rotate-45"></div>
                </div>
            )}
        </div>
    );
};


const ProgressSidebar: React.FC<{ setupSteps: any[] }> = ({ setupSteps }) => (
    <aside className="w-full bg-white border border-slate-200 shadow-sm rounded-lg p-6 hidden lg:block sticky top-6">
        <h3 className="font-semibold text-slate-800 mb-4">Onboarding Progress</h3>
        <div className="space-y-4">
            {setupSteps.map((step) => (
                <div key={step.id} className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${step.completed ? 'bg-green-500 text-white' : step.active ? 'bg-blue-500 text-white ring-4 ring-blue-100' : 'bg-slate-200 text-slate-600'}`}>
                        {step.completed ? <Check className="w-5 h-5" /> : step.id}
                    </div>
                    <span className={`text-sm font-medium ${step.active ? 'text-blue-600' : step.completed ? 'text-slate-700' : 'text-slate-500'}`}>
                        {step.label}
                    </span>
                </div>
            ))}
        </div>
    </aside>
);

const ClauseStepper: React.FC<{ clauses: string[], currentClause: string, onClauseSelect: (clause: string) => void }> = ({ clauses, currentClause, onClauseSelect }) => (
    <div className="mb-8 overflow-x-auto">
        <div className="flex border-b border-gray-200">
            {clauses.map(clause => (
                <button
                    key={clause}
                    onClick={() => onClauseSelect(clause)}
                    className={`px-4 py-3 text-sm font-semibold whitespace-nowrap focus:outline-none transition-colors ${currentClause === clause ? 'border-b-2 border-blue-600 text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
                >
                    {clause}
                </button>
            ))}
        </div>
    </div>
);

const QuestionCard: React.FC<{
    questionData: any;
    answer: Answer;
    helpContent: { title: string, content: React.ReactNode };
    onUpdate: (questionId: string, field: keyof Omit<Answer, 'evidenceFiles'>, value: any) => void;
    onAddFiles: (questionId: string, files: FileList) => void;
    onRemoveFile: (questionId: string, fileIndex: number) => void;
}> = ({ questionData, answer, helpContent, onUpdate, onAddFiles, onRemoveFile }) => {
    const { id, ref, question, guidance, expectedEvidence } = questionData;
    const showConditionalFields = answer.status === 'Yes' || answer.status === 'Partially';

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            onAddFiles(id, e.target.files);
        }
    };

    return (
        <div className="border border-gray-200 bg-white rounded-lg mb-6 shadow-sm">
            <div className="p-6">
                <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider">{ref}</p>
                <div className="flex items-center mt-1">
                    <h3 className="font-semibold text-slate-800">{question}</h3>
                    <QSensei title={helpContent.title} content={helpContent.content} />
                </div>
                
                <div className="mt-4 flex flex-col sm:flex-row gap-3">
                    {(['Yes', 'No', 'Partially'] as const).map(statusValue => (
                        <label key={statusValue} className={`flex-1 flex items-center p-3 border rounded-md cursor-pointer transition-colors ${answer.status === statusValue ? 'bg-blue-50 border-blue-400' : 'hover:bg-slate-50 border-gray-300'}`}>
                            <input
                                type="radio"
                                name={`status-${id}`}
                                checked={answer.status === statusValue}
                                onChange={() => onUpdate(id, 'status', statusValue)}
                                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                            />
                            <span className="ml-3 text-sm font-medium text-slate-700">{statusValue === 'Yes' ? "Yes (We have this)" : statusValue === 'No' ? "No (We do not have this)" : "Partially (In progress)"}</span>
                        </label>
                    ))}
                </div>
            </div>

            {showConditionalFields && (
                <div className="bg-slate-50 border-t border-gray-200 px-6 py-5">
                    <p className="text-sm font-semibold text-slate-700 mb-1">Describe the evidence or implementation status.</p>
                    <p className="text-xs text-slate-500 mb-3">{guidance}</p>

                    <div className="mb-4">
                        <p className="text-xs font-semibold text-slate-600 mb-2">Examples of Expected Evidence:</p>
                        <div className="space-y-2">
                            {expectedEvidence.map((evidenceText: string, index: number) => (
                                <div key={index} className="flex items-center gap-2 p-2 bg-white border border-slate-200 rounded-md">
                                    <FileText className="w-4 h-4 text-blue-500 shrink-0" />
                                    <p className="text-xs text-slate-700">{evidenceText}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    <textarea
                        value={answer.comments}
                        onChange={(e) => onUpdate(id, 'comments', e.target.value)}
                        placeholder="Add comments here..."
                        rows={3}
                        className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                    />

                    <div className="mt-4">
                        <label htmlFor={`file-upload-${id}`} className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer">
                            <Upload className="w-4 h-4" />
                            Upload Evidence
                        </label>
                        <input id={`file-upload-${id}`} type="file" className="hidden" onChange={handleFileChange} multiple />
                        {answer.evidenceFiles.length > 0 && (
                            <div className="mt-3 space-y-2">
                                {answer.evidenceFiles.map((file, index) => (
                                    <div key={index} className="flex items-center justify-between gap-2 text-sm text-slate-700 bg-slate-100 p-2 rounded-md border border-slate-200">
                                        <div className="flex items-center gap-2 overflow-hidden">
                                            <FileText className="w-4 h-4 shrink-0 text-slate-500" />
                                            <span className="truncate" title={file.name}>{file.name}</span>
                                        </div>
                                        <button onClick={() => onRemoveFile(id, index)} className="p-1 text-slate-400 hover:text-red-600 rounded-full shrink-0">
                                            <X className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

// --- NEW PROGRESS BAR COMPONENT ---
const AnalysisProgressBar: React.FC<{ answered: number; total: number }> = ({ answered, total }) => {
    const percentage = total > 0 ? Math.round((answered / total) * 100) : 0;

    return (
        <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 mb-6">
            <div className="flex justify-between items-center mb-2">
                <p className="text-sm font-semibold text-slate-700">Analysis Progress</p>
                <p className="text-sm font-bold text-blue-600">{percentage}% Complete</p>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2.5">
                <div 
                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-500" 
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>
            <p className="text-xs text-slate-500 text-right mt-1">{answered} of {total} questions answered</p>
        </div>
    );
};


// --- MAIN GAP ANALYSIS PAGE COMPONENT ---
const GapAnalysisPage: React.FC = () => {
    const router = useRouter();
    const { setBreadcrumbs } = usePageHeader();
    const [currentClauseKey, setCurrentClauseKey] = useState(CLAUSES[0]);
    const [answers, setAnswers] = useState<AllAnswers>(() => {
        const initialAnswers: AllAnswers = {};
        Object.values(GAP_ANALYSIS_QUESTIONS).flat().forEach(q => {
            initialAnswers[q.id] = { status: null, comments: '', evidenceFiles: [] };
        });
        return initialAnswers;
    });

    const setupSteps = [
        { id: 1, label: 'Account Created', completed: true },
        { id: 2, label: 'Environment Setup', completed: true },
        { id: 3, label: 'Gap Analysis', completed: false, active: true },
        { id: 4, label: 'Dashboard', completed: false },
    ];

    useEffect(() => {
        setBreadcrumbs([
            { label: 'Home', href: '/dashboard' },
            { label: 'Onboarding', href: '#' },
            { label: 'Initial Gap Analysis' }
        ]);
        return () => setBreadcrumbs([]);
    }, [setBreadcrumbs]);

    const handleUpdateAnswer = (questionId: string, field: keyof Omit<Answer, 'evidenceFiles'>, value: any) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: {
                ...prev[questionId],
                [field]: value,
            },
        }));
    };

    const handleAddFiles = (questionId: string, files: FileList) => {
        const newFiles = Array.from(files);
        setAnswers(prev => ({
            ...prev,
            [questionId]: {
                ...prev[questionId],
                evidenceFiles: [...prev[questionId].evidenceFiles, ...newFiles],
            },
        }));
    };

    const handleRemoveFile = (questionId: string, fileIndex: number) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: {
                ...prev[questionId],
                evidenceFiles: prev[questionId].evidenceFiles.filter((_, index) => index !== fileIndex),
            },
        }));
    };

    const navigateClause = (direction: 'next' | 'prev') => {
        const currentIndex = CLAUSES.indexOf(currentClauseKey);
        if (direction === 'next' && currentIndex < CLAUSES.length - 1) {
            setCurrentClauseKey(CLAUSES[currentIndex + 1]);
        } else if (direction === 'prev' && currentIndex > 0) {
            setCurrentClauseKey(CLAUSES[currentIndex - 1]);
        }
    };
    
    const handleSubmit = () => {
        console.log("Submitting Gap Analysis:", answers);
        router.push('/dashboard/org-admin');
    }

    const currentQuestions = GAP_ANALYSIS_QUESTIONS[currentClauseKey as keyof typeof GAP_ANALYSIS_QUESTIONS];
    const totalQuestions = Object.values(GAP_ANALYSIS_QUESTIONS).flat().length;
    const answeredQuestions = Object.values(answers).filter(a => a.status !== null).length;

    return (
        <div className="bg-slate-50 font-sans">
            <div className="grid grid-cols-1 lg:grid-cols-[288px_1fr] gap-8 items-start">
                <ProgressSidebar setupSteps={setupSteps} />
                <main className="bg-white border border-slate-200 shadow-sm rounded-lg">
                    <div className="p-8">
                        <div className='border-b border-slate-200 pb-4 mb-6'>
                            <h2 className="text-xl font-bold text-slate-800 mb-1">Initial Gap Analysis</h2>
                            <p className="text-sm text-slate-600">Answer the following questions to establish your baseline compliance posture against ISO 27001:2022.</p>
                        </div>

                        <AnalysisProgressBar answered={answeredQuestions} total={totalQuestions} />
                        
                        <ClauseStepper clauses={CLAUSES} currentClause={currentClauseKey} onClauseSelect={setCurrentClauseKey} />
                        
                        <div>
                            {currentQuestions.map(q => (
                                <QuestionCard
                                    key={q.id}
                                    questionData={q}
                                    answer={answers[q.id]}
                                    helpContent={GAP_ANALYSIS_HELP_CONTENT[q.id as keyof typeof GAP_ANALYSIS_HELP_CONTENT]}
                                    onUpdate={handleUpdateAnswer}
                                    onAddFiles={handleAddFiles}
                                    onRemoveFile={handleRemoveFile}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="p-6 bg-slate-100 rounded-b-lg border-t border-slate-200">
                        <div className="flex justify-between items-center">
                            <button
                                onClick={() => navigateClause('prev')}
                                disabled={CLAUSES.indexOf(currentClauseKey) === 0}
                                className="text-sm font-semibold text-slate-700 hover:bg-slate-200 px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ChevronLeft className="w-4 h-4 inline-block mr-1" />
                                Previous
                            </button>
                            
                            {CLAUSES.indexOf(currentClauseKey) < CLAUSES.length - 1 ? (
                                <button
                                    onClick={() => navigateClause('next')}
                                    className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 font-semibold"
                                >
                                    Next
                                    <ChevronRight className="w-4 h-4 inline-block ml-1" />
                                </button>
                            ) : (
                                <button
                                    onClick={handleSubmit}
                                    className="bg-green-600 text-white px-6 py-2.5 rounded-lg hover:bg-green-700 transition-colors shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-green-500 font-semibold"
                                >
                                    Complete Analysis & View Dashboard
                                </button>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default GapAnalysisPage;


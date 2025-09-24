import React, { useState } from 'react';
import { BrainCircuit, Trash2, Pencil } from 'lucide-react';

type Personnel = {
    id: string;
    fullName: string;
    jobTitle: string;
    email: string;
    ismsRoles: string[];
    responsibilities: string;
};

type OrganizationData = {
    keyPersonnel: Personnel[];
};

const FormSection: React.FC<any> = ({ children }) => <div>{children}</div>;
const QSensei: React.FC<any> = () => null;

const initialFormState: Personnel = {
    id: '',
    fullName: '',
    jobTitle: '',
    email: '',
    ismsRoles: [],
    responsibilities: '',
};

const ISMS_ROLE_OPTIONS = [
    { value: 'Top Management', label: 'Top Management', description: 'Has ultimate authority and accountability for the ISMS.' },
    { value: 'ISMS Manager', label: 'ISMS Manager', description: 'Responsible for day-to-day operations of the ISMS.' },
    { value: 'Risk Owner', label: 'Risk Owner', description: 'Accountable for managing a specific information security risk.' },
    { value: 'Asset Owner', label: 'Asset Owner', description: 'Responsible for the classification and protection of specific information assets.' },
    { value: 'Control Owner', label: 'Control Owner', description: 'Responsible for implementing and maintaining a specific security control.' },
];

export const KeyPersonnelStep: React.FC<{
    orgData: OrganizationData;
    onPersonnelUpdate: (personnel: Personnel[]) => void;
    QSenseiComponent: React.ElementType;
    HELP_CONTENT: any;
}> = ({
    orgData,
    onPersonnelUpdate,
    QSenseiComponent,
    HELP_CONTENT
}) => {
    const [formState, setFormState] = useState<Personnel>(initialFormState);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [errors, setErrors] = useState<Partial<Record<keyof Omit<Personnel, 'id' | 'responsibilities'>, string>>>({});

    const validate = () => {
        const newErrors: Partial<Record<keyof Omit<Personnel, 'id' | 'responsibilities'>, string>> = {};
        if (!formState.fullName.trim()) newErrors.fullName = "Full Name is required.";
        if (!formState.jobTitle.trim()) newErrors.jobTitle = "Job Title is required.";
        if (!formState.email.trim()) {
            newErrors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
            newErrors.email = "Email address is invalid.";
        }
        if (formState.ismsRoles.length === 0) newErrors.ismsRoles = "At least one ISMS Role must be selected.";
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleFormChange = (field: keyof Omit<Personnel, 'ismsRoles'>, value: string) => {
        setFormState(prev => ({ ...prev, [field]: value }));
        if (errors[field as keyof typeof errors]) {
            setErrors(prev => ({ ...prev, [field]: undefined }));
        }
    };

    const handleRoleChange = (roleValue: string) => {
        setFormState(prev => {
            const newRoles = prev.ismsRoles.includes(roleValue)
                ? prev.ismsRoles.filter(r => r !== roleValue)
                : [...prev.ismsRoles, roleValue];
            return { ...prev, ismsRoles: newRoles };
        });
        if (errors.ismsRoles) {
            setErrors(prev => ({ ...prev, ismsRoles: undefined }));
        }
    };

    const handleAiSuggestResponsibilities = () => {
        if (formState.ismsRoles.length === 0) return;
        const suggestions: { [key: string]: string } = {
            'Top Management': "Ensuring the information security policy and objectives are aligned with the organization's strategic direction. Providing necessary resources for the ISMS and promoting a culture of security. Chairing management review meetings to assess ISMS performance.",
            'ISMS Manager': "Overseeing the day-to-day operation, maintenance, and improvement of the Information Security Management System. Coordinating internal audits and reporting on the ISMS performance to top management.",
            'Risk Owner': "Identifying, assessing, and treating information security risks within their designated area of responsibility. Monitoring the effectiveness of risk treatment plans.",
            'Asset Owner': "Ensuring that information assets are properly classified, protected, and handled according to the security policy. Responsible for granting access to their assets.",
            'Control Owner': "Implementing, operating, and maintaining specific security controls as defined in the ISMS. Reporting on the performance and effectiveness of these controls."
        };
        const generatedResponsibilities = formState.ismsRoles
            .map(role => suggestions[role] || '')
            .filter(Boolean)
            .join('\n\n');
        setFormState(prev => ({ ...prev, responsibilities: generatedResponsibilities }));
    };
    
    const handleSave = () => {
        if (!validate()) return;

        let updatedPersonnel;
        if (editingId) {
            updatedPersonnel = orgData.keyPersonnel.map(p => p.id === editingId ? { ...formState, id: editingId } : p);
        } else {
            updatedPersonnel = [...orgData.keyPersonnel, { ...formState, id: crypto.randomUUID() }];
        }
        onPersonnelUpdate(updatedPersonnel);
        setFormState(initialFormState);
        setEditingId(null);
        setErrors({});
    };

    const handleEdit = (person: Personnel) => {
        setFormState(person);
        setEditingId(person.id);
        setErrors({});
    };

    const handleDelete = (id: string) => {
        const updatedPersonnel = orgData.keyPersonnel.filter(p => p.id !== id);
        onPersonnelUpdate(updatedPersonnel);
        if (editingId === id) {
            setFormState(initialFormState);
            setEditingId(null);
            setErrors({});
        }
    };

    const handleCancel = () => {
        setFormState(initialFormState);
        setEditingId(null);
        setErrors({});
    };

    return (
        <FormSection>
            <div className="px-8">
                <div className="mb-6">
                    <label className="flex items-center text-lg font-bold text-gray-800 mb-1">
                        Key Personnel & Responsibilities*
                        <QSenseiComponent title={HELP_CONTENT.keyPersonnel.title} content={HELP_CONTENT.keyPersonnel.content} />
                    </label>
                    <p className="text-sm text-slate-600">Define the core team responsible for your Information Security Management System (ISMS).</p>
                </div>

                <div className="mb-8 border border-gray-300 rounded-lg overflow-hidden">
                    <table className="min-w-full bg-white">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="py-3 px-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Full Name</th>
                                <th className="py-3 px-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Job Title</th>
                                <th className="py-3 px-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">ISMS Role(s)</th>
                                <th className="py-3 px-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                            {orgData.keyPersonnel.length > 0 ? orgData.keyPersonnel.map(person => (
                                <tr key={person.id}>
                                    <td className="py-3 px-4 whitespace-nowrap text-sm text-slate-800">{person.fullName}</td>
                                    <td className="py-3 px-4 whitespace-nowrap text-sm text-slate-600">{person.jobTitle}</td>
                                    <td className="py-3 px-4 text-sm text-slate-600">{person.ismsRoles.join(', ')}</td>
                                    <td className="py-3 px-4 whitespace-nowrap text-sm">
                                        <div className="flex items-center gap-3">
                                            <button onClick={() => handleEdit(person)} className="text-blue-600 hover:text-blue-800 flex items-center gap-1">
                                                <Pencil className="w-4 h-4"/> Edit
                                            </button>
                                            <button onClick={() => handleDelete(person.id)} className="text-red-600 hover:text-red-800 flex items-center gap-1">
                                                <Trash2 className="w-4 h-4"/> Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={4} className="text-center py-8 text-sm text-slate-500">No personnel added yet. Use the form below to add a person.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="border border-gray-200 rounded-lg p-6 bg-slate-10 mb-8">
                    <h3 className="text-md font-bold text-gray-800 mb-4">{editingId ? 'Edit Person' : 'Add New Person'}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name*</label>
                            <input type="text" placeholder="e.g., Priya Singh" value={formState.fullName} onChange={(e) => handleFormChange('fullName', e.target.value)} className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.fullName ? 'border-red-500' : 'border-gray-300'}`} />
                            {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Job Title*</label>
                            <input type="text" placeholder="e.g., Chief Technology Officer" value={formState.jobTitle} onChange={(e) => handleFormChange('jobTitle', e.target.value)} className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.jobTitle ? 'border-red-500' : 'border-gray-300'}`} />
                            {errors.jobTitle && <p className="text-red-500 text-xs mt-1">{errors.jobTitle}</p>}
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email*</label>
                            <input type="email" placeholder="e.g., p.singh@yourcompany.com" value={formState.email} onChange={(e) => handleFormChange('email', e.target.value)} className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`} />
                             {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                        </div>
                        
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Primary ISMS Role(s)*</label>
                            <div className="space-y-3">
                                {ISMS_ROLE_OPTIONS.map(opt => (
                                    <label key={opt.value} className="flex items-start p-3 border bg-white border-gray-300 rounded-md cursor-pointer hover:bg-slate-50 transition-colors">
                                        <input
                                            type="checkbox"
                                            checked={formState.ismsRoles.includes(opt.value)}
                                            onChange={() => handleRoleChange(opt.value)}
                                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 mt-1"
                                        />
                                        <div className="ml-3">
                                            <span className="font-semibold text-sm text-gray-800">{opt.label}</span>
                                            <p className="text-xs text-slate-600">{opt.description}</p>
                                        </div>
                                    </label>
                                ))}
                            </div>
                             {errors.ismsRoles && <p className="text-red-500 text-xs mt-1">{errors.ismsRoles}</p>}
                        </div>

                        <div className="md:col-span-2">
                            <label className="flex items-center text-sm font-medium text-gray-700 mb-1">Specific ISMS Responsibilities</label>
                            <textarea rows={4} placeholder="Describe their specific duties..." value={formState.responsibilities} onChange={(e) => handleFormChange('responsibilities', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            <button onClick={handleAiSuggestResponsibilities} className="flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 mt-2 disabled:text-slate-400 disabled:cursor-not-allowed" disabled={formState.ismsRoles.length === 0}>
                                <BrainCircuit className="w-4 h-4" /> Suggest with QSensei
                            </button>
                        </div>
                        <div className="md:col-span-2 flex justify-end gap-3">
                            {editingId && (
                                <button onClick={handleCancel} className="text-sm font-semibold text-slate-700 hover:bg-slate-200 px-4 py-2 rounded-lg transition-colors">Cancel</button>
                            )}
                            <button onClick={handleSave} className="bg-slate-600 text-white px-6 py-2 rounded-lg hover:bg-slate-700 transition-colors shadow-sm font-semibold">
                                {editingId ? 'Update Person' : 'Save Person'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </FormSection>
    );
};


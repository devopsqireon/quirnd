// File: /app/risk/risk-register/add/components/steps/Step8Details.tsx

'use client'

import React, { useState } from 'react';
import { FileText, Plus, X, Upload, Tag, Link, Lock } from 'lucide-react';
import { AddRiskFormData, ValidationError } from '../../types';

interface Step8DetailsProps {
    formData: AddRiskFormData;
    onChange: (data: Partial<AddRiskFormData>) => void;
    errors: ValidationError[];
}

const commonTags = [
    'Cybersecurity', 'Data Protection', 'GDPR', 'ISO 27001', 'Compliance',
    'Operations', 'Infrastructure', 'Third Party', 'Vendor', 'Critical',
    'High Priority', 'Financial Risk', 'Reputational Risk', 'Technology',
    'Human Resources', 'Supply Chain', 'Business Continuity'
];

const confidentialityLevels = [
    { value: 'Public', description: 'Can be shared publicly', color: 'bg-green-100 text-green-800' },
    { value: 'Internal', description: 'For internal use only', color: 'bg-blue-100 text-blue-800' },
    { value: 'Confidential', description: 'Restricted access required', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'Highly Confidential', description: 'Strict access control', color: 'bg-red-100 text-red-800' }
];

export const Step8Details: React.FC<Step8DetailsProps> = ({
    formData,
    onChange,
    errors
}) => {
    const [newTag, setNewTag] = useState('');
    const [newReference, setNewReference] = useState('');

    const addTag = (tag: string) => {
        const trimmedTag = tag.trim();
        if (trimmedTag && !formData.tags.includes(trimmedTag)) {
            onChange({
                tags: [...formData.tags, trimmedTag]
            });
        }
        setNewTag('');
    };

    const removeTag = (tagToRemove: string) => {
        onChange({
            tags: formData.tags.filter(tag => tag !== tagToRemove)
        });
    };

    const addReference = (reference: string) => {
        const trimmedRef = reference.trim();
        if (trimmedRef && !formData.references.includes(trimmedRef)) {
            onChange({
                references: [...formData.references, trimmedRef]
            });
        }
        setNewReference('');
    };

    const removeReference = (refToRemove: string) => {
        onChange({
            references: formData.references.filter(ref => ref !== refToRemove)
        });
    };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const newAttachments = Array.from(files).map(file => ({
                id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
                name: file.name,
                url: URL.createObjectURL(file),
                type: file.type
            }));
            
            onChange({
                attachments: [...formData.attachments, ...newAttachments]
            });
        }
    };

    const removeAttachment = (attachmentId: string) => {
        onChange({
            attachments: formData.attachments.filter(a => a.id !== attachmentId)
        });
    };

    const getFileIcon = (type: string) => {
        if (type.startsWith('image/')) return '🖼️';
        if (type.includes('pdf')) return '📄';
        if (type.includes('word') || type.includes('document')) return '📝';
        if (type.includes('excel') || type.includes('spreadsheet')) return '📊';
        if (type.includes('powerpoint') || type.includes('presentation')) return '📋';
        return '📎';
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-teal-100 rounded-xl mb-4">
                    <FileText className="w-6 h-6 text-teal-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Additional Details</h2>
                <p className="text-slate-600">
                    Add supporting information, references, and classification details
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-6">
                    {/* Tags */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Tags & Keywords
                        </label>
                        <p className="text-sm text-slate-500 mb-3">
                            Add tags to help categorize and search for this risk
                        </p>
                        
                        {/* Tag Input */}
                        <div className="flex gap-2 mb-3">
                            <input
                                type="text"
                                value={newTag}
                                onChange={(e) => setNewTag(e.target.value)}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        addTag(newTag);
                                    }
                                }}
                                placeholder="Enter a tag..."
                                className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm"
                            />
                            <button
                                type="button"
                                onClick={() => addTag(newTag)}
                                disabled={!newTag.trim()}
                                className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                            >
                                <Plus className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Common Tags */}
                        <div className="mb-4">
                            <p className="text-xs text-slate-500 mb-2">Quick add common tags:</p>
                            <div className="flex flex-wrap gap-1">
                                {commonTags.filter(tag => !formData.tags.includes(tag)).slice(0, 8).map(tag => (
                                    <button
                                        key={tag}
                                        type="button"
                                        onClick={() => addTag(tag)}
                                        className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-full hover:bg-teal-100 hover:text-teal-700 transition-colors"
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Selected Tags */}
                        <div className="flex flex-wrap gap-2">
                            {formData.tags.map(tag => (
                                <span
                                    key={tag}
                                    className="inline-flex items-center gap-1 px-3 py-1 bg-teal-100 text-teal-800 text-sm rounded-full"
                                >
                                    <Tag className="w-3 h-3" />
                                    {tag}
                                    <button
                                        type="button"
                                        onClick={() => removeTag(tag)}
                                        className="ml-1 hover:text-teal-900"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </span>
                            ))}
                        </div>
                        
                        {formData.tags.length === 0 && (
                            <div className="text-center py-4 text-slate-500 bg-slate-50 rounded-lg border-2 border-dashed border-slate-300">
                                <Tag className="w-6 h-6 mx-auto mb-1 opacity-50" />
                                <p className="text-sm">No tags added</p>
                            </div>
                        )}
                    </div>

                    {/* References */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            References & Sources
                        </label>
                        <p className="text-sm text-slate-500 mb-3">
                            Add links to relevant documents, policies, or external sources
                        </p>
                        
                        <div className="flex gap-2 mb-3">
                            <input
                                type="url"
                                value={newReference}
                                onChange={(e) => setNewReference(e.target.value)}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        addReference(newReference);
                                    }
                                }}
                                placeholder="https://example.com/document"
                                className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm"
                            />
                            <button
                                type="button"
                                onClick={() => addReference(newReference)}
                                disabled={!newReference.trim()}
                                className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                            >
                                <Plus className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="space-y-2">
                            {formData.references.map((reference, index) => (
                                <div key={index} className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-lg">
                                    <div className="flex items-center gap-2 flex-1 min-w-0">
                                        <Link className="w-4 h-4 text-slate-400 flex-shrink-0" />
                                        <a
                                            href={reference}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm text-teal-600 hover:text-teal-700 truncate"
                                        >
                                            {reference}
                                        </a>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => removeReference(reference)}
                                        className="p-1 text-slate-400 hover:text-red-600 flex-shrink-0 ml-2"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>

                        {formData.references.length === 0 && (
                            <div className="text-center py-4 text-slate-500 bg-slate-50 rounded-lg border-2 border-dashed border-slate-300">
                                <Link className="w-6 h-6 mx-auto mb-1 opacity-50" />
                                <p className="text-sm">No references added</p>
                            </div>
                        )}
                    </div>

                    {/* File Attachments */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            File Attachments
                        </label>
                        <p className="text-sm text-slate-500 mb-3">
                            Upload supporting documents, screenshots, or evidence
                        </p>
                        
                        <div className="mb-4">
                            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-300 rounded-lg cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <Upload className="w-8 h-8 text-slate-400 mb-2" />
                                    <p className="text-sm text-slate-500">
                                        <span className="font-semibold">Click to upload</span> or drag and drop
                                    </p>
                                    <p className="text-xs text-slate-400">PDF, DOC, XLS, PNG, JPG up to 10MB</p>
                                </div>
                                <input
                                    type="file"
                                    className="hidden"
                                    multiple
                                    accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg"
                                    onChange={handleFileUpload}
                                />
                            </label>
                        </div>

                        <div className="space-y-2">
                            {formData.attachments.map((attachment) => (
                                <div key={attachment.id} className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <span className="text-lg">{getFileIcon(attachment.type)}</span>
                                        <div>
                                            <div className="text-sm font-medium text-slate-900">{attachment.name}</div>
                                            <div className="text-xs text-slate-500">{attachment.type}</div>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => removeAttachment(attachment.id)}
                                        className="p-1 text-slate-400 hover:text-red-600"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>

                        {formData.attachments.length === 0 && (
                            <div className="text-center py-4 text-slate-500 bg-slate-50 rounded-lg border-2 border-dashed border-slate-300">
                                <Upload className="w-6 h-6 mx-auto mb-1 opacity-50" />
                                <p className="text-sm">No files attached</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    {/* Notes */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Additional Notes
                        </label>
                        <textarea
                            value={formData.notes}
                            onChange={(e) => onChange({ notes: e.target.value })}
                            placeholder="Add any additional context, background information, or special considerations..."
                            rows={6}
                            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 resize-none"
                        />
                        <div className="mt-2 text-xs text-slate-500">
                            {formData.notes.length}/1000 characters
                        </div>
                    </div>

                    {/* Confidentiality Level */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Information Classification *
                        </label>
                        <p className="text-sm text-slate-500 mb-4">
                            Set the confidentiality level for this risk information
                        </p>
                        
                        <div className="space-y-2">
                            {confidentialityLevels.map((level) => (
                                <label
                                    key={level.value}
                                    className={`block p-3 border-2 rounded-lg cursor-pointer transition-all hover:border-teal-300 ${
                                        formData.confidentialityLevel === level.value
                                            ? 'border-teal-500 bg-teal-50'
                                            : 'border-slate-200'
                                    }`}
                                >
                                    <input
                                        type="radio"
                                        name="confidentialityLevel"
                                        value={level.value}
                                        checked={formData.confidentialityLevel === level.value}
                                        onChange={(e) => onChange({ confidentialityLevel: e.target.value })}
                                        className="sr-only"
                                    />
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <Lock className="w-5 h-5 text-slate-400" />
                                            <div>
                                                <div className="font-medium text-slate-900">{level.value}</div>
                                                <div className="text-sm text-slate-500">{level.description}</div>
                                            </div>
                                        </div>
                                        <span className={`px-2 py-1 text-xs rounded-full ${level.color}`}>
                                            {level.value}
                                        </span>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Summary */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 className="font-medium text-slate-900 mb-3 flex items-center gap-2">
                            <FileText className="w-5 h-5 text-blue-600" />
                            Additional Details Summary
                        </h4>
                        
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-slate-600">Tags:</span>
                                <span className="font-medium text-slate-900">{formData.tags.length}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-600">References:</span>
                                <span className="font-medium text-slate-900">{formData.references.length}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-600">Attachments:</span>
                                <span className="font-medium text-slate-900">{formData.attachments.length}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-600">Notes:</span>
                                <span className="font-medium text-slate-900">
                                    {formData.notes ? 'Added' : 'None'}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-600">Classification:</span>
                                <span className={`px-2 py-1 text-xs rounded-full ${
                                    confidentialityLevels.find(l => l.value === formData.confidentialityLevel)?.color || 'bg-slate-100 text-slate-800'
                                }`}>
                                    {formData.confidentialityLevel}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Best Practices */}
                    <div className="bg-slate-50 rounded-lg p-4">
                        <h4 className="font-medium text-slate-900 mb-2">Documentation Best Practices</h4>
                        <ul className="text-sm text-slate-600 space-y-1">
                            <li>• Use descriptive tags for easy categorization</li>
                            <li>• Include relevant policy or procedure references</li>
                            <li>• Attach supporting evidence or documentation</li>
                            <li>• Set appropriate confidentiality classification</li>
                            <li>• Document assumptions and constraints in notes</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};
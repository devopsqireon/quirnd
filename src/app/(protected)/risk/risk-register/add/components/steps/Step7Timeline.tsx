// File: /app/risk/risk-register/add/components/steps/Step7Timeline.tsx

'use client'

import React from 'react';
import { Calendar, Clock, AlertTriangle, TrendingUp } from 'lucide-react';
import { AddRiskFormData, ValidationError } from '../../types';

interface Step7TimelineProps {
    formData: AddRiskFormData;
    onChange: (data: Partial<AddRiskFormData>) => void;
    errors: ValidationError[];
}

const reviewFrequencies = [
    { value: 'Weekly', description: 'Every week (for critical/active risks)' },
    { value: 'Monthly', description: 'Every month (for high-priority risks)' },
    { value: 'Quarterly', description: 'Every 3 months (for medium risks)' },
    { value: 'Semi-annually', description: 'Every 6 months (for stable risks)' },
    { value: 'Annually', description: 'Every year (for low/accepted risks)' }
];

const escalationTriggers = [
    'Risk score increases by 25% or more',
    'New vulnerabilities discovered',
    'Mitigation actions fail or are delayed',
    'External threat environment changes',
    'Regulatory requirements change',
    'Business impact exceeds tolerance',
    'Control failures detected'
];

export const Step7Timeline: React.FC<Step7TimelineProps> = ({
    formData,
    onChange,
    errors
}) => {
    const getFieldError = (fieldName: string) => {
        return errors.find(error => error.field === fieldName);
    };

    // Calculate next review date based on frequency
    const calculateNextReviewDate = (frequency: string, fromDate: string = '') => {
        const baseDate = fromDate ? new Date(fromDate) : new Date();
        const nextDate = new Date(baseDate);

        switch (frequency) {
            case 'Weekly':
                nextDate.setDate(nextDate.getDate() + 7);
                break;
            case 'Monthly':
                nextDate.setMonth(nextDate.getMonth() + 1);
                break;
            case 'Quarterly':
                nextDate.setMonth(nextDate.getMonth() + 3);
                break;
            case 'Semi-annually':
                nextDate.setMonth(nextDate.getMonth() + 6);
                break;
            case 'Annually':
                nextDate.setFullYear(nextDate.getFullYear() + 1);
                break;
        }

        return nextDate.toISOString().split('T')[0];
    };

    const handleFrequencyChange = (frequency: string) => {
        const nextReviewDate = calculateNextReviewDate(frequency, formData.initialReviewDate || formData.dateIdentified);
        onChange({
            reviewFrequency: frequency,
            nextReviewDate
        });
    };

    const handleInitialReviewDateChange = (date: string) => {
        let nextReviewDate = formData.nextReviewDate;
        if (formData.reviewFrequency) {
            nextReviewDate = calculateNextReviewDate(formData.reviewFrequency, date);
        }
        onChange({
            initialReviewDate: date,
            nextReviewDate
        });
    };

    const toggleEscalationCriteria = (criteria: string) => {
        const current = formData.escalationCriteria.split('\n').filter(c => c.trim());
        const updated = current.includes(criteria)
            ? current.filter(c => c !== criteria)
            : [...current, criteria];
        onChange({ escalationCriteria: updated.join('\n') });
    };

    const isEscalationSelected = (criteria: string) => {
        return formData.escalationCriteria.includes(criteria);
    };

    const getDaysUntilReview = (date: string) => {
        if (!date) return null;
        const reviewDate = new Date(date);
        const today = new Date();
        const diffTime = reviewDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    const getReviewUrgency = (days: number | null) => {
        if (days === null) return null;
        if (days < 0) return { color: 'text-red-600', label: 'Overdue' };
        if (days <= 7) return { color: 'text-orange-600', label: 'Due soon' };
        if (days <= 30) return { color: 'text-yellow-600', label: 'Due this month' };
        return { color: 'text-green-600', label: 'Scheduled' };
    };

    const nextReviewDays = getDaysUntilReview(formData.nextReviewDate);
    const reviewUrgency = getReviewUrgency(nextReviewDays);

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-teal-100 rounded-xl mb-4">
                    <Calendar className="w-6 h-6 text-teal-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Timeline & Review Schedule</h2>
                <p className="text-slate-600">
                    Set up monitoring and review schedules for ongoing risk management
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column - Dates */}
                <div className="space-y-6">
                    {/* Date Identified */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Date Risk Identified *
                        </label>
                        <input
                            type="date"
                            value={formData.dateIdentified}
                            onChange={(e) => onChange({ dateIdentified: e.target.value })}
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
                                getFieldError('dateIdentified') ? 'border-red-300' : 'border-slate-300'
                            }`}
                        />
                        {getFieldError('dateIdentified') && (
                            <p className="mt-1 text-sm text-red-600">{getFieldError('dateIdentified')?.message}</p>
                        )}
                    </div>

                    {/* Initial Review Date */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Initial Review Date *
                        </label>
                        <input
                            type="date"
                            value={formData.initialReviewDate}
                            onChange={(e) => handleInitialReviewDateChange(e.target.value)}
                            min={formData.dateIdentified}
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
                                getFieldError('initialReviewDate') ? 'border-red-300' : 'border-slate-300'
                            }`}
                        />
                        <p className="mt-1 text-sm text-slate-500">
                            First comprehensive review of this risk
                        </p>
                        {getFieldError('initialReviewDate') && (
                            <p className="mt-1 text-sm text-red-600">{getFieldError('initialReviewDate')?.message}</p>
                        )}
                    </div>

                    {/* Review Frequency */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Review Frequency *
                        </label>
                        <div className="space-y-2">
                            {reviewFrequencies.map((freq) => (
                                <label
                                    key={freq.value}
                                    className={`block p-3 border-2 rounded-lg cursor-pointer transition-all hover:border-teal-300 ${
                                        formData.reviewFrequency === freq.value
                                            ? 'border-teal-500 bg-teal-50'
                                            : 'border-slate-200'
                                    }`}
                                >
                                    <input
                                        type="radio"
                                        name="reviewFrequency"
                                        value={freq.value}
                                        checked={formData.reviewFrequency === freq.value}
                                        onChange={(e) => handleFrequencyChange(e.target.value)}
                                        className="sr-only"
                                    />
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center justify-center w-6 h-6">
                                            {formData.reviewFrequency === freq.value ? (
                                                <Clock className="w-4 h-4 text-teal-600" />
                                            ) : (
                                                <div className="w-4 h-4 border border-slate-400 rounded-full"></div>
                                            )}
                                        </div>
                                        <div>
                                            <div className="font-medium text-slate-900">{freq.value}</div>
                                            <div className="text-sm text-slate-500">{freq.description}</div>
                                        </div>
                                    </div>
                                </label>
                            ))}
                        </div>
                        {getFieldError('reviewFrequency') && (
                            <p className="mt-2 text-sm text-red-600">{getFieldError('reviewFrequency')?.message}</p>
                        )}
                    </div>

                    {/* Next Review Date (Auto-calculated) */}
                    {formData.nextReviewDate && (
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Next Scheduled Review
                            </label>
                            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="font-medium text-slate-900">{formData.nextReviewDate}</div>
                                        {nextReviewDays !== null && reviewUrgency && (
                                            <div className={`text-sm ${reviewUrgency.color}`}>
                                                {reviewUrgency.label}
                                                {nextReviewDays >= 0 && ` (${nextReviewDays} days)`}
                                                {nextReviewDays < 0 && ` (${Math.abs(nextReviewDays)} days ago)`}
                                            </div>
                                        )}
                                    </div>
                                    <Calendar className="w-5 h-5 text-slate-400" />
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Column - Escalation */}
                <div className="space-y-6">
                    {/* Escalation Criteria */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-4">
                            Escalation Triggers
                        </label>
                        <p className="text-sm text-slate-600 mb-4">
                            Select conditions that should trigger immediate escalation and review
                        </p>
                        
                        <div className="space-y-2">
                            {escalationTriggers.map((trigger) => (
                                <label
                                    key={trigger}
                                    className="flex items-start p-3 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer"
                                >
                                    <input
                                        type="checkbox"
                                        checked={isEscalationSelected(trigger)}
                                        onChange={() => toggleEscalationCriteria(trigger)}
                                        className="w-4 h-4 text-teal-600 border-slate-300 rounded focus:ring-teal-500 mt-0.5 mr-3 flex-shrink-0"
                                    />
                                    <span className="text-sm text-slate-700">{trigger}</span>
                                </label>
                            ))}
                        </div>

                        {/* Custom Escalation Criteria */}
                        <div className="mt-4">
                            <textarea
                                value={formData.escalationCriteria}
                                onChange={(e) => onChange({ escalationCriteria: e.target.value })}
                                placeholder="Add custom escalation criteria (one per line)..."
                                rows={3}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 resize-none text-sm"
                            />
                            <p className="mt-1 text-xs text-slate-500">
                                You can edit the selected criteria above or add custom ones here
                            </p>
                        </div>
                    </div>

                    {/* Timeline Summary */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 className="font-medium text-slate-900 mb-3 flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-blue-600" />
                            Review Timeline Summary
                        </h4>
                        
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-slate-600">Risk Identified:</span>
                                <span className="font-medium text-slate-900">
                                    {formData.dateIdentified || 'Not set'}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-600">Initial Review:</span>
                                <span className="font-medium text-slate-900">
                                    {formData.initialReviewDate || 'Not scheduled'}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-600">Review Frequency:</span>
                                <span className="font-medium text-slate-900">
                                    {formData.reviewFrequency || 'Not set'}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-600">Next Review:</span>
                                <span className="font-medium text-slate-900">
                                    {formData.nextReviewDate || 'Not scheduled'}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-600">Escalation Triggers:</span>
                                <span className="font-medium text-slate-900">
                                    {formData.escalationCriteria.split('\n').filter(c => c.trim()).length || 0} defined
                                </span>
                            </div>
                        </div>

                        {(!formData.reviewFrequency || !formData.initialReviewDate) && (
                            <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                                <p className="text-sm text-yellow-800">
                                    Set review frequency and initial review date to establish proper risk monitoring.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Review Guidelines */}
                    <div className="bg-slate-50 rounded-lg p-4">
                        <h4 className="font-medium text-slate-900 mb-2">Review Guidelines</h4>
                        <ul className="text-sm text-slate-600 space-y-1">
                            <li>• Critical risks should be reviewed weekly or monthly</li>
                            <li>• High risks typically need quarterly reviews</li>
                            <li>• Medium/low risks can be reviewed semi-annually</li>
                            <li>• Set escalation triggers for immediate attention</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};
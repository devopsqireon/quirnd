// File: /app/risk/risk-register/view/[id]/components/RiskViewHeader.tsx

'use client'

import React from 'react';
import { 
    AlertTriangle, 
    Calendar, 
    User, 
    Building,
    Clock,
    Target,
    Edit,
    TrendingUp,
    TrendingDown,
    Minus
} from 'lucide-react';
import { Risk } from '../types';

interface RiskViewHeaderProps {
    risk: Risk;
    onEdit: () => void;
    onUpdateRisk: (updatedRisk: Partial<Risk>) => void;
}

export const RiskViewHeader: React.FC<RiskViewHeaderProps> = ({ risk, onEdit, onUpdateRisk }) => {
    const getRiskLevelColor = (level: string) => {
        switch (level) {
            case 'Critical': return 'text-red-600 bg-red-50 border-red-200';
            case 'High': return 'text-orange-600 bg-orange-50 border-orange-200';
            case 'Medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
            case 'Low': return 'text-green-600 bg-green-50 border-green-200';
            default: return 'text-gray-600 bg-gray-50 border-gray-200';
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Open': return 'text-red-600 bg-red-50';
            case 'In Progress': return 'text-blue-600 bg-blue-50';
            case 'Under Review': return 'text-yellow-600 bg-yellow-50';
            case 'Closed': return 'text-green-600 bg-green-50';
            case 'Deferred': return 'text-gray-600 bg-gray-50';
            default: return 'text-gray-600 bg-gray-50';
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const isOverdue = (dateString: string) => {
        return new Date(dateString) < new Date();
    };

    const getRiskTrend = () => {
        const currentScore = risk.riskScore;
        const previousScore = risk.inherentRisk?.score || currentScore;
        
        if (currentScore > previousScore) return 'increasing';
        if (currentScore < previousScore) return 'decreasing';
        return 'stable';
    };

    const trend = getRiskTrend();
    const getTrendIcon = () => {
        switch (trend) {
            case 'increasing': return <TrendingUp className="w-4 h-4 text-red-500" />;
            case 'decreasing': return <TrendingDown className="w-4 h-4 text-green-500" />;
            default: return <Minus className="w-4 h-4 text-gray-500" />;
        }
    };

    return (
        <div className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Main Header Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    {/* Left Column - Risk Information (8 columns) */}
                    <div className="lg:col-span-8">
                        {/* Risk ID and Level Badge */}
                        <div className="flex items-center gap-4 mb-4">
                            <span className="text-lg font-mono text-gray-500 bg-gray-100 px-3 py-1 rounded-md">
                                {risk.id}
                            </span>
                            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border ${getRiskLevelColor(risk.riskLevel)}`}>
                                <AlertTriangle className="w-4 h-4" />
                                {risk.riskLevel} Risk
                            </div>
                            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${getStatusColor(risk.status)}`}>
                                {risk.status}
                            </div>
                        </div>

                        {/* Risk Title */}
                        <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
                            {risk.title}
                        </h1>

                        {/* Risk Description */}
                        <p className="text-gray-600 text-lg leading-relaxed mb-6 max-w-4xl">
                            {risk.description}
                        </p>

                        {/* Key Details Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="bg-gray-50 rounded-lg p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <User className="w-4 h-4 text-gray-500" />
                                    <span className="text-xs text-gray-500 uppercase tracking-wide font-medium">Owner</span>
                                </div>
                                <div className="font-semibold text-gray-900">{risk.owner}</div>
                            </div>
                            
                            <div className="bg-gray-50 rounded-lg p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <Building className="w-4 h-4 text-gray-500" />
                                    <span className="text-xs text-gray-500 uppercase tracking-wide font-medium">Business Unit</span>
                                </div>
                                <div className="font-semibold text-gray-900">{risk.businessUnit}</div>
                            </div>
                            
                            <div className="bg-gray-50 rounded-lg p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <Calendar className="w-4 h-4 text-gray-500" />
                                    <span className="text-xs text-gray-500 uppercase tracking-wide font-medium">Due Date</span>
                                </div>
                                <div className={`font-semibold ${isOverdue(risk.dueDate) ? 'text-red-600' : 'text-gray-900'}`}>
                                    {formatDate(risk.dueDate)}
                                    {isOverdue(risk.dueDate) && (
                                        <span className="text-xs text-red-500 ml-1 block">(Overdue)</span>
                                    )}
                                </div>
                            </div>
                            
                            <div className="bg-gray-50 rounded-lg p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <Clock className="w-4 h-4 text-gray-500" />
                                    <span className="text-xs text-gray-500 uppercase tracking-wide font-medium">Last Updated</span>
                                </div>
                                <div className="font-semibold text-gray-900">
                                    {formatDate(risk.lastUpdated || risk.createdDate)}
                                </div>
                            </div>
                        </div>

                        {/* Risk Reduction Section */}
                        {risk.inherentRisk && risk.residualRisk && (
                            <div className="mt-6 bg-gradient-to-r from-slate-50 to-blue-50 rounded-lg border border-slate-200 p-5">
                                <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                                    <Target className="w-5 h-5 text-blue-600" />
                                    Risk Reduction Progress
                                </h3>
                                <div className="grid grid-cols-4 gap-4">
                                    <div className="text-center">
                                        <div className="text-xs text-slate-500 uppercase tracking-wide mb-1">Inherent</div>
                                        <div className="font-bold text-red-600 text-xl">{risk.inherentRisk.score}</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-xs text-slate-500 uppercase tracking-wide mb-1">Current</div>
                                        <div className="font-bold text-orange-600 text-xl">{risk.riskScore}</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-xs text-slate-500 uppercase tracking-wide mb-1">Target</div>
                                        <div className="font-bold text-green-600 text-xl">{risk.residualRisk.score}</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-xs text-slate-500 uppercase tracking-wide mb-1">Reduction</div>
                                        <div className="font-bold text-blue-600 text-xl">
                                            {Math.round(((risk.inherentRisk.score - risk.residualRisk.score) / risk.inherentRisk.score) * 100)}%
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Tags */}
                        {risk.tags && risk.tags.length > 0 && (
                            <div className="mt-6">
                                <div className="flex flex-wrap gap-2">
                                    {risk.tags.map((tag, index) => (
                                        <span 
                                            key={index}
                                            className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full font-medium"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column - Risk Metrics (4 columns) */}
                    <div className="lg:col-span-4">
                        <div className="grid grid-cols-1 gap-6">
                            
                            {/* Risk Score Card */}
                            <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border border-slate-200 p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-semibold text-slate-900">Risk Assessment</h3>
                                    <button
                                        onClick={onEdit}
                                        className="text-blue-600 hover:text-blue-700 p-1"
                                    >
                                        <Edit className="w-4 h-4" />
                                    </button>
                                </div>
                                
                                <div className="text-center mb-6">
                                    <div className={`inline-flex items-center gap-4 px-6 py-4 rounded-xl ${getRiskLevelColor(risk.riskLevel)}`}>
                                        <div className="text-center">
                                            <div className="text-3xl font-bold">{risk.riskScore}</div>
                                            <div className="text-sm font-medium opacity-80">Risk Score</div>
                                        </div>
                                        <div className="w-px h-12 bg-current opacity-20"></div>
                                        <div className="text-left">
                                            <div className="font-semibold">{risk.riskLevel}</div>
                                            <div className="text-sm opacity-80">Level</div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div className="text-center bg-white rounded-lg p-3">
                                        <div className="font-semibold text-gray-900 text-lg">
                                            {risk.likelihoodScore || risk.likelihood}/5
                                        </div>
                                        <div className="text-gray-500">Likelihood</div>
                                    </div>
                                    <div className="text-center bg-white rounded-lg p-3">
                                        <div className="font-semibold text-gray-900 text-lg">
                                            {risk.impactScore || (typeof risk.impact === 'number' ? risk.impact : 0)}/5
                                        </div>
                                        <div className="text-gray-500">Impact</div>
                                    </div>
                                </div>

                                <div className="mt-4 pt-4 border-t border-slate-200 flex items-center justify-between">
                                    <span className="text-sm text-slate-600">Trend</span>
                                    <div className="flex items-center gap-1">
                                        {getTrendIcon()}
                                        <span className="text-sm text-slate-700 capitalize font-medium">{trend}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Progress Card */}
                            <div className="bg-white rounded-lg border border-gray-200 p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-semibold text-gray-900">Progress</h3>
                                    <div className="text-2xl font-bold text-blue-600">{risk.progress || 0}%</div>
                                </div>
                                
                                <div className="w-full bg-gray-200 rounded-full h-4 mb-3">
                                    <div 
                                        className="bg-gradient-to-r from-blue-500 to-blue-600 h-4 rounded-full transition-all duration-500" 
                                        style={{ width: `${risk.progress || 0}%` }}
                                    />
                                </div>
                                
                                <div className="text-sm text-gray-600 mb-4">
                                    {(risk.progress || 0) < 25 ? 'Getting started' :
                                     (risk.progress || 0) < 50 ? 'Making progress' :
                                     (risk.progress || 0) < 75 ? 'Well underway' :
                                     (risk.progress || 0) < 100 ? 'Nearly complete' : 'Complete'}
                                </div>

                                <div className="text-xs text-gray-500">
                                    <div className="flex justify-between mb-1">
                                        <span>Assigned To</span>
                                        <span className="font-medium text-gray-700">
                                            {risk.assignedTo || risk.assignee || 'Not assigned'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
 
}
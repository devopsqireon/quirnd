// File: /app/risk/risk-register/add/utils/validation.ts

import { AddRiskFormData, ValidationError } from '../types';

export const validateStep1 = (data: AddRiskFormData): ValidationError[] => {
    const errors: ValidationError[] = [];

    if (!data.title.trim()) {
        errors.push({
            field: 'title',
            message: 'Risk title is required',
            severity: 'error'
        });
    } else if (data.title.length < 10) {
        errors.push({
            field: 'title',
            message: 'Risk title should be at least 10 characters',
            severity: 'warning'
        });
    }

    if (!data.description.trim()) {
        errors.push({
            field: 'description',
            message: 'Risk description is required',
            severity: 'error'
        });
    } else if (data.description.length < 20) {
        errors.push({
            field: 'description',
            message: 'Risk description should be at least 20 characters for clarity',
            severity: 'warning'
        });
    }

    if (!data.category) {
        errors.push({
            field: 'category',
            message: 'Risk category is required',
            severity: 'error'
        });
    }

    if (!data.riskType) {
        errors.push({
            field: 'riskType',
            message: 'Risk type is required',
            severity: 'error'
        });
    }

    return errors;
};

export const validateStep2 = (data: AddRiskFormData): ValidationError[] => {
    const errors: ValidationError[] = [];

    if (!data.likelihood) {
        errors.push({
            field: 'likelihood',
            message: 'Likelihood assessment is required',
            severity: 'error'
        });
    }

    if (!data.impact) {
        errors.push({
            field: 'impact',
            message: 'Impact assessment is required',
            severity: 'error'
        });
    }

    if (data.likelihoodScore && data.impactScore) {
        const riskScore = data.likelihoodScore * data.impactScore;
        if (riskScore >= 20 && !data.notes) {
            errors.push({
                field: 'notes',
                message: 'Critical risks require additional documentation and justification',
                severity: 'warning'
            });
        }
    }

    return errors;
};

export const validateStep3 = (data: AddRiskFormData): ValidationError[] => {
    const errors: ValidationError[] = [];

    if (data.associatedAssets.length === 0 && data.affectedSystems.length === 0 && data.businessProcesses.length === 0) {
        errors.push({
            field: 'associatedAssets',
            message: 'Select at least one asset, system, or business process',
            severity: 'warning'
        });
    }

    return errors;
};

export const validateStep4 = (data: AddRiskFormData): ValidationError[] => {
    const errors: ValidationError[] = [];

    if (!data.owner.trim()) {
        errors.push({
            field: 'owner',
            message: 'Risk owner is required',
            severity: 'error'
        });
    }

    if (!data.department) {
        errors.push({
            field: 'department',
            message: 'Department is required',
            severity: 'error'
        });
    }

    return errors;
};

export const validateStep5 = (data: AddRiskFormData): ValidationError[] => {
    const errors: ValidationError[] = [];

    if (data.annexAControls.length === 0) {
        errors.push({
            field: 'annexAControls',
            message: 'Consider mapping at least one ISO 27001 control',
            severity: 'warning'
        });
    }

    return errors;
};

export const validateStep6 = (data: AddRiskFormData): ValidationError[] => {
    const errors: ValidationError[] = [];

    if (!data.treatmentStrategy) {
        errors.push({
            field: 'treatmentStrategy',
            message: 'Risk treatment strategy is required',
            severity: 'error'
        });
    }

    if (data.treatmentStrategy === 'Mitigate' && data.mitigationActions.length === 0) {
        errors.push({
            field: 'mitigationActions',
            message: 'Mitigation strategy requires at least one action',
            severity: 'warning'
        });
    }

    return errors;
};

export const validateStep7 = (data: AddRiskFormData): ValidationError[] => {
    const errors: ValidationError[] = [];

    if (!data.dateIdentified) {
        errors.push({
            field: 'dateIdentified',
            message: 'Date identified is required',
            severity: 'error'
        });
    }

    if (!data.initialReviewDate) {
        errors.push({
            field: 'initialReviewDate',
            message: 'Initial review date is required',
            severity: 'error'
        });
    }

    if (!data.reviewFrequency) {
        errors.push({
            field: 'reviewFrequency',
            message: 'Review frequency is required',
            severity: 'error'
        });
    }

    if (data.initialReviewDate && data.dateIdentified && new Date(data.initialReviewDate) < new Date(data.dateIdentified)) {
        errors.push({
            field: 'initialReviewDate',
            message: 'Initial review date cannot be before the date identified',
            severity: 'error'
        });
    }

    return errors;
};

export const validateStep8 = (data: AddRiskFormData): ValidationError[] => {
    const errors: ValidationError[] = [];

    if (!data.confidentialityLevel) {
        errors.push({
            field: 'confidentialityLevel',
            message: 'Information classification is required',
            severity: 'error'
        });
    }

    return errors;
};

export const validateAllSteps = (data: AddRiskFormData): ValidationError[] => {
    const step1Errors = validateStep1(data);
    const step2Errors = validateStep2(data);
    const step3Errors = validateStep3(data);
    const step4Errors = validateStep4(data);
    const step5Errors = validateStep5(data);
    const step6Errors = validateStep6(data);
    const step7Errors = validateStep7(data);
    const step8Errors = validateStep8(data);
    
    return [...step1Errors, ...step2Errors, ...step3Errors, ...step4Errors, ...step5Errors, ...step6Errors, ...step7Errors, ...step8Errors];
};

export const getStepValidationStatus = (stepNumber: number, data: AddRiskFormData): boolean => {
    switch (stepNumber) {
        case 1:
            return validateStep1(data).filter(e => e.severity === 'error').length === 0;
        case 2:
            return validateStep2(data).filter(e => e.severity === 'error').length === 0;
        case 3:
            return validateStep3(data).filter(e => e.severity === 'error').length === 0;
        case 4:
            return validateStep4(data).filter(e => e.severity === 'error').length === 0;
        case 5:
            return validateStep5(data).filter(e => e.severity === 'error').length === 0;
        case 6:
            return validateStep6(data).filter(e => e.severity === 'error').length === 0;
        case 7:
            return validateStep7(data).filter(e => e.severity === 'error').length === 0;
        case 8:
            return validateStep8(data).filter(e => e.severity === 'error').length === 0;
        default:
            return true;
    }
};
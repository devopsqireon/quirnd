// src/app/report-incident/page.tsx
"use client";

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  AlertTriangle, 
  ArrowLeft, 
  ArrowRight,
  Check,
  Clock,
  Lock,
  Smartphone
} from 'lucide-react';

import { WizardHeader } from '@/components/report-incident/wizard-header';
import { WizardNavigation } from '@/components/report-incident/wizard-navigation';
import { BasicInformationStep } from '@/components/report-incident/steps/basic-information-step';
import { DescriptionImpactStep } from '@/components/report-incident/steps/description-impact-step';
import { ReporterDetailsStep } from '@/components/report-incident/steps/reporter-details-step';
import { EvidenceUploadStep } from '@/components/report-incident/steps/evidence-upload-step';
import { AdditionalDetailsStep } from '@/components/report-incident/steps/additional-details-step';
import { ReviewSubmitStep } from '@/components/report-incident/steps/review-submit-step';
import OnboardingHeader from '@/component/layout/OnboardingHeader';
import OnboardingFooter from '@/component/layout/OnboardingFooter';

const STEPS = [
  { id: 1, title: 'Basic Information', description: 'Incident details and classification' },
  { id: 2, title: 'Description & Impact', description: 'What happened and what was affected' },
  { id: 3, title: 'Reporter Details', description: 'Your contact information' },
  { id: 4, title: 'Evidence & Files', description: 'Supporting documentation' },
  { id: 5, title: 'Additional Details', description: 'Tags and business impact' },
  { id: 6, title: 'Review & Submit', description: 'Confirm and submit your report' }
];

export default function ReportIncidentPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Basic Information
    title: '',
    category: '',
    severity: '',
    dateDetected: new Date().toISOString().split('T')[0],
    timeDetected: new Date().toTimeString().split(' ')[0].substring(0, 5),
    
    // Description & Impact
    description: '',
    affectedAssets: [],
    impacts: [],
    immediateActions: '',
    
    // Reporter Details
    isAnonymous: false,
    reporterName: 'John Smith',
    reporterDepartment: 'IT Security',
    reporterEmail: 'john.smith@company.com',
    reporterPhone: '',
    additionalContact: '',
    
    // Evidence
    uploadedFiles: [],
    
    // Additional Details
    tags: [],
    regulatoryRequired: false,
    relatedIncidents: '',
    financialImpact: '',
    customersAffected: '',
    reputationRisk: '',
    
    // Review & Submit
    confirmAccuracy: false
  });

  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(formData.title && formData.category && formData.severity && formData.dateDetected && formData.timeDetected);
      case 2:
        return !!formData.description;
      case 3:
        return !!formData.reporterEmail;
      case 4:
        return true; // Evidence is optional
      case 5:
        return true; // Additional details are optional
      case 6:
        return formData.confirmAccuracy;
      default:
        return false;
    }
  };

  const goToStep = (step: number) => {
    if (step >= 1 && step <= STEPS.length) {
      setCurrentStep(step);
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps([...completedSteps, currentStep]);
      }
      if (currentStep < STEPS.length) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;
    
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Form submitted:', formData);
      // Handle successful submission (redirect, show success message, etc.)
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveDraft = () => {
    console.log('Saving draft:', formData);
    // Handle saving as draft
  };

  const progressPercentage = (currentStep / STEPS.length) * 100;
  const isStepValid = validateStep(currentStep);
  const isLastStep = currentStep === STEPS.length;

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <BasicInformationStep formData={formData} updateFormData={updateFormData} />;
      case 2:
        return <DescriptionImpactStep formData={formData} updateFormData={updateFormData} />;
      case 3:
        return <ReporterDetailsStep formData={formData} updateFormData={updateFormData} />;
      case 4:
        return <EvidenceUploadStep formData={formData} updateFormData={updateFormData} />;
      case 5:
        return <AdditionalDetailsStep formData={formData} updateFormData={updateFormData} />;
      case 6:
        return <ReviewSubmitStep formData={formData} updateFormData={updateFormData} />;
      default:
        return null;
    }
  };

  return (
    
    <div className="min-h-screen bg-gray-50">
        <OnboardingHeader />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Wizard Header */}
        <WizardHeader />

        {/* Main Wizard Container */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Progress Bar */}
          <div className="bg-gray-50 px-8 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold text-gray-900">
                Step {currentStep} of {STEPS.length}: {STEPS[currentStep - 1].title}
              </h2>
              <span className="text-sm text-gray-500">
                {Math.round(progressPercentage)}% Complete
              </span>
            </div>
            <Progress value={progressPercentage} className="h-2 mb-3" />
            <p className="text-sm text-gray-600">{STEPS[currentStep - 1].description}</p>
          </div>

          {/* Step Navigation */}
          <WizardNavigation 
            steps={STEPS}
            currentStep={currentStep}
            completedSteps={completedSteps}
            onStepClick={goToStep}
          />

          {/* Step Content */}
          <div className="px-8 py-8">
            <div className="space-y-6">
              {renderStepContent()}
            </div>
          </div>

          {/* Navigation Footer */}
          <div className="bg-gray-50 px-8 py-6 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Clock className="h-4 w-4" />
                  <span>Auto-saved 2 minutes ago</span>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleSaveDraft}
                >
                  Save Draft
                </Button>
              </div>

              <div className="flex items-center space-x-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>

                {isLastStep ? (
                  <Button
                    onClick={handleSubmit}
                    disabled={!isStepValid || isSubmitting}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Check className="mr-2 h-4 w-4" />
                        Submit Report
                      </>
                    )}
                  </Button>
                ) : (
                  <Button
                    onClick={nextStep}
                    disabled={!isStepValid}
                  >
                    Next
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>

            {!isStepValid && currentStep !== 4 && currentStep !== 5 && (
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  Please complete all required fields before proceeding to the next step.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="w-full">
                <OnboardingFooter />
            </div>
    </div>
    
  );
}
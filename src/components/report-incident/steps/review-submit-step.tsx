// src/components/report-incident/steps/review-submit-step.tsx
"use client";

import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Info, AlertTriangle, Clock, FileText, User, Shield } from 'lucide-react';

interface ReviewSubmitStepProps {
  formData: any;
  updateFormData: (field: string, value: any) => void;
}

export function ReviewSubmitStep({ formData, updateFormData }: ReviewSubmitStepProps) {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const formatCategory = (category: string) => {
    return category ? category.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ') : 'Not specified';
  };

  return (
    <div className="space-y-8">
      {/* Step Introduction */}
      <Card className="bg-green-50 border-green-200">
        <CardContent className="p-6">
          <div className="flex items-start space-x-3">
            <Check className="text-green-600 h-6 w-6 mt-1" />
            <div>
              <h3 className="text-xl font-semibold text-green-900 mb-2">Review & Submit</h3>
              <p className="text-sm text-green-800">
                Please review your incident report below. Once submitted, our security team will be 
                immediately notified and begin their response process.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Incident Summary */}
      <Card>
        <CardContent className="p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <FileText className="h-5 w-5 text-blue-600" />
            <span>Incident Summary</span>
          </h4>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label className="text-sm text-gray-500">Incident Title</Label>
                <p className="font-medium text-gray-900 mt-1">
                  {formData.title || 'Not specified'}
                </p>
              </div>
              
              <div>
                <Label className="text-sm text-gray-500">Category</Label>
                <p className="font-medium text-gray-900 mt-1">
                  {formatCategory(formData.category)}
                </p>
              </div>
              
              <div>
                <Label className="text-sm text-gray-500">Date & Time Detected</Label>
                <p className="font-medium text-gray-900 mt-1">
                  {formData.dateDetected && formData.timeDetected ? 
                    `${formData.dateDetected} at ${formData.timeDetected}` : 
                    'Not specified'
                  }
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label className="text-sm text-gray-500">Severity Level</Label>
                <div className="mt-1">
                  {formData.severity ? (
                    <Badge className={`${getSeverityColor(formData.severity)} font-medium`}>
                      {formData.severity.charAt(0).toUpperCase() + formData.severity.slice(1)}
                    </Badge>
                  ) : (
                    <span className="text-gray-500">Not specified</span>
                  )}
                </div>
              </div>
              
              <div>
                <Label className="text-sm text-gray-500">Reporter</Label>
                <div className="mt-1 flex items-center space-x-2">
                  <User className="h-4 w-4 text-gray-400" />
                  <span className="font-medium text-gray-900">
                    {formData.isAnonymous ? 'Anonymous Report' : formData.reporterName}
                  </span>
                </div>
              </div>
              
              <div>
                <Label className="text-sm text-gray-500">Affected Systems</Label>
                <div className="mt-1">
                  {formData.affectedAssets.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {formData.affectedAssets.slice(0, 3).map((asset: string, index: number) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {asset}
                        </Badge>
                      ))}
                      {formData.affectedAssets.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{formData.affectedAssets.length - 3} more
                        </Badge>
                      )}
                    </div>
                  ) : (
                    <span className="text-gray-500">None specified</span>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {formData.description && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <Label className="text-sm text-gray-500">Description</Label>
              <div className="mt-2 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-800 leading-relaxed">
                  {formData.description.substring(0, 300)}
                  {formData.description.length > 300 && '...'}
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Additional Details Summary */}
      {(formData.tags.length > 0 || formData.regulatoryRequired || formData.financialImpact || formData.customersAffected) && (
        <Card>
          <CardContent className="p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Additional Details</h4>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {formData.tags.length > 0 && (
                <div>
                  <Label className="text-sm text-gray-500">Tags</Label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {formData.tags.map((tag: string, index: number) => (
                      <Badge key={index} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                </div>
              )}
              
              {formData.regulatoryRequired && (
                <div>
                  <Label className="text-sm text-gray-500">Regulatory Status</Label>
                  <div className="mt-2">
                    <Badge className="bg-orange-100 text-orange-800">
                      <Shield className="mr-1 h-3 w-3" />
                      Regulatory Review Required
                    </Badge>
                  </div>
                </div>
              )}
              
              {(formData.financialImpact || formData.customersAffected) && (
                <div className="lg:col-span-2">
                  <Label className="text-sm text-gray-500">Business Impact</Label>
                  <div className="mt-2 grid grid-cols-3 gap-4 text-sm">
                    {formData.financialImpact && (
                      <div>
                        <span className="text-gray-600">Financial:</span>
                        <span className="ml-1 font-medium">{formData.financialImpact}</span>
                      </div>
                    )}
                    {formData.customersAffected && (
                      <div>
                        <span className="text-gray-600">Customers:</span>
                        <span className="ml-1 font-medium">{formData.customersAffected}</span>
                      </div>
                    )}
                    {formData.reputationRisk && (
                      <div>
                        <span className="text-gray-600">Reputation:</span>
                        <span className="ml-1 font-medium">{formData.reputationRisk}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* What Happens Next */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-start space-x-3">
            <Info className="text-blue-600 h-5 w-5 mt-0.5" />
            <div>
              <h4 className="font-semibold text-blue-900 mb-3">What happens after submission?</h4>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 font-semibold text-xs">1</span>
                  </div>
                  <p className="text-sm text-blue-800">
                    Your incident will be assigned a unique ID (e.g., INC-2024-XXX) and logged in our system
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 font-semibold text-xs">2</span>
                  </div>
                  <p className="text-sm text-blue-800">
                    The security team will be immediately notified and begin triage within 15 minutes
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 font-semibold text-xs">3</span>
                  </div>
                  <p className="text-sm text-blue-800">
                    You'll receive a confirmation email with the incident reference and next steps
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 font-semibold text-xs">4</span>
                  </div>
                  <p className="text-sm text-blue-800">
                    Investigation and response procedures will begin according to our incident response plan
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Final Confirmation */}
      <Card className="border-2 border-gray-200">
        <CardContent className="p-6">
          <div className="flex items-start space-x-3">
            <Checkbox
              required
              checked={formData.confirmAccuracy}
              onCheckedChange={(checked) => updateFormData('confirmAccuracy', checked)}
              className="mt-1"
            />
            <div>
              <Label className="text-base font-medium text-gray-900 cursor-pointer">
                I confirm that the information provided is accurate to the best of my knowledge
              </Label>
              <p className="text-sm text-gray-600 mt-1">
                By submitting this report, you acknowledge that you have provided truthful information 
                and understand that this will initiate our incident response procedures.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Emergency Contact */}
      <Card className="bg-red-50 border-red-200">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="text-red-600 h-5 w-5 mt-0.5" />
            <div>
              <h4 className="font-medium text-red-900 mb-1">Need immediate assistance?</h4>
              <p className="text-sm text-red-800">
                For urgent security emergencies that require immediate attention, 
                call our 24/7 Security Hotline: <strong>+1 (555) 123-SECURITY</strong>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
// src/components/report-incident/review-submit.tsx
"use client";

import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Check, Info } from 'lucide-react';

interface ReviewSubmitProps {
  formData: any;
  updateFormData: (field: string, value: any) => void;
}

export function ReviewSubmit({ formData, updateFormData }: ReviewSubmitProps) {
  return (
    <section className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
          <Check className="text-green-600 h-4 w-4" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Review & Submit</h2>
        <div className="flex-1 h-px bg-gray-200"></div>
      </div>
      
      <div className="space-y-6">
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Incident Summary</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Title:</span>
              <span className="ml-2 font-medium">{formData.title || 'Not specified'}</span>
            </div>
            <div>
              <span className="text-gray-500">Severity:</span>
              <span className={`ml-2 font-medium ${
                formData.severity === 'critical' ? 'text-red-600' :
                formData.severity === 'high' ? 'text-orange-600' :
                formData.severity === 'medium' ? 'text-yellow-600' :
                'text-green-600'
              }`}>
                {formData.severity ? 
                  formData.severity.charAt(0).toUpperCase() + formData.severity.slice(1) : 
                  'Not specified'
                }
              </span>
            </div>
            <div>
              <span className="text-gray-500">Category:</span>
              <span className="ml-2 font-medium">
                {formData.category ? 
                  formData.category.split('-').map((word: string) => 
                    word.charAt(0).toUpperCase() + word.slice(1)
                  ).join(' ') : 
                  'Not specified'
                }
              </span>
            </div>
            <div>
              <span className="text-gray-500">Date/Time:</span>
              <span className="ml-2 font-medium">
                {formData.dateDetected && formData.timeDetected ? 
                  `${formData.dateDetected} ${formData.timeDetected}` : 
                  'Not specified'
                }
              </span>
            </div>
          </div>
        </div>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Info className="text-blue-500 h-5 w-5 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-blue-900">What happens after submission?</p>
              <ul className="text-xs text-blue-800 mt-2 space-y-1">
                <li>• Your incident will be assigned a unique ID and logged in the Incident Register</li>
                <li>• The security team will be automatically notified</li>
                <li>• You'll receive a confirmation email with the incident reference</li>
                <li>• Investigation and response procedures will begin immediately</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-3 pt-4">
          <Checkbox
            required
            checked={formData.confirmAccuracy}
            onCheckedChange={(checked) => updateFormData('confirmAccuracy', checked)}
          />
          <Label className="text-sm text-gray-700 cursor-pointer">
            I confirm that the information provided is accurate to the best of my knowledge
          </Label>
        </div>
      </div>
    </section>
  );
}
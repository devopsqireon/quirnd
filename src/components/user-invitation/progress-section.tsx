// src/components/user-invitation/progress-section.tsx
interface ProgressSectionProps {
    currentStep: number
    totalSteps: number
    steps: string[]
  }
  
  export function ProgressSection({ currentStep, totalSteps, steps }: ProgressSectionProps) {
    const progressPercentage = (currentStep / totalSteps) * 100
  
    return (
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Account Setup Progress</span>
            <span className="text-sm text-gray-500">Step {currentStep} of {totalSteps}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            {steps.map((step, index) => (
              <span 
                key={index}
                className={index + 1 === currentStep ? 'font-medium text-blue-600' : ''}
              >
                {step}
              </span>
            ))}
          </div>
        </div>
      </section>
    )
  }
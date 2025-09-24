// src/components/user-invitation/whats-next.tsx
import { Rocket } from 'lucide-react'

export function WhatsNext() {
  const steps = [
    'Complete account verification',
    'Review pending policy assignments', 
    'Complete mandatory training modules',
    'Access your compliance dashboard'
  ]

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-6">
      <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
        <Rocket className="mr-2 h-5 w-5 text-blue-600" />
        What's Next?
      </h3>
      <div className="space-y-3">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
              index === 0 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-300 text-white'
            }`}>
              {index + 1}
            </div>
            <span className={`text-sm ${
              index === 0 ? 'text-gray-700' : 'text-gray-500'
            }`}>
              {step}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
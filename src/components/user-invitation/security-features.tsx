// src/components/user-invitation/security-features.tsx
import { Shield, Lock, Smartphone, Clock, Award } from 'lucide-react'

export function SecurityFeatures() {
  const features = [
    {
      icon: Lock,
      title: 'End-to-End Encryption',
      description: 'Your data is protected with AES-256 encryption',
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: Smartphone,
      title: 'Multi-Factor Authentication',
      description: 'Required for all compliance roles',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: Clock,
      title: 'Audit Logging',
      description: 'All activities are tracked and logged',
      color: 'bg-purple-100 text-purple-600'
    },
    {
      icon: Award,
      title: 'ISO 27001 Compliant',
      description: 'Meets international security standards',
      color: 'bg-orange-100 text-orange-600'
    }
  ]

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
        <Shield className="mr-2 h-5 w-5 text-green-600" />
        Security Features
      </h3>
      <div className="space-y-4">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${feature.color}`}>
              <feature.icon className="h-4 w-4" />
            </div>
            <div>
              <p className="font-medium text-gray-900 text-sm">{feature.title}</p>
              <p className="text-xs text-gray-600">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
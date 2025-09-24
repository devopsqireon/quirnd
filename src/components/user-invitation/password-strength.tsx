// src/components/user-invitation/password-strength.tsx
import { Check, X } from 'lucide-react'

interface PasswordStrengthProps {
  password: string
  strength: {
    score: number
    feedback: string
    requirements: {
      length: boolean
      uppercase: boolean
      number: boolean
      special: boolean
    }
  }
}

export function PasswordStrength({ password, strength }: PasswordStrengthProps) {
  const getStrengthColor = (score: number) => {
    if (score === 4) return 'bg-green-500'
    if (score === 3) return 'bg-yellow-500'
    if (score === 2) return 'bg-orange-500'
    return 'bg-red-500'
  }

  const getStrengthTextColor = (score: number) => {
    if (score === 4) return 'text-green-600'
    if (score === 3) return 'text-yellow-600'
    if (score === 2) return 'text-orange-600'
    return 'text-red-600'
  }

  return (
    <div className="mt-2">
      <div className="flex items-center space-x-2 mb-1">
        <span className="text-xs font-medium text-gray-700">Password Strength:</span>
        <div className="flex space-x-1">
          {[1, 2, 3, 4].map((level) => (
            <div
              key={level}
              className={`w-2 h-2 rounded-full ${
                level <= strength.score ? getStrengthColor(strength.score) : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
        <span className={`text-xs font-medium ${getStrengthTextColor(strength.score)}`}>
          {strength.feedback}
        </span>
      </div>
      <div className="text-xs text-gray-500 space-y-1">
        <p className="flex items-center">
          {strength.requirements.length ? (
            <Check className="w-3 h-3 text-green-500 mr-1" />
          ) : (
            <X className="w-3 h-3 text-red-500 mr-1" />
          )}
          At least 8 characters
        </p>
        <p className="flex items-center">
          {strength.requirements.uppercase ? (
            <Check className="w-3 h-3 text-green-500 mr-1" />
          ) : (
            <X className="w-3 h-3 text-red-500 mr-1" />
          )}
          Include uppercase letter
        </p>
        <p className="flex items-center">
          {strength.requirements.number ? (
            <Check className="w-3 h-3 text-green-500 mr-1" />
          ) : (
            <X className="w-3 h-3 text-red-500 mr-1" />
          )}
          Include number
        </p>
        <p className="flex items-center">
          {strength.requirements.special ? (
            <Check className="w-3 h-3 text-green-500 mr-1" />
          ) : (
            <X className="w-3 h-3 text-red-500 mr-1" />
          )}
          Include special character
        </p>
      </div>
    </div>
  )
}
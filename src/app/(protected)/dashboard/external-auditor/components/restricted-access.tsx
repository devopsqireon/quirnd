// src/app/(protected)/dashboard/external-dashboard/components/restricted-access.tsx
import { Card, CardContent } from '@/components/ui/card'
import { Lock, X } from 'lucide-react'

const restrictedItems = [
  'Full Risk Register (only SoA + evidence mapping available)',
  'Incident Register (only summary via evidence if shared)',
  'Training/Policy completion breakdowns',
  'Activity Logs or Internal Audit Trail',
  'Integration settings and configurations'
]

export function RestrictedAccess() {
  return (
    <section className="mb-8">
      <Card className="bg-gray-100 border-l-4 border-gray-400">
        <CardContent className="p-6">
          <div className="flex items-start">
            <Lock className="text-gray-500 text-xl mr-4 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Restricted Access Areas</h3>
              <p className="text-gray-700 mb-3">The following areas are not available for external auditors:</p>
              <ul className="space-y-2 text-gray-600">
                {restrictedItems.map((item, index) => (
                  <li key={index} className="flex items-center">
                    <X className="text-red-500 mr-2 w-4 h-4 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
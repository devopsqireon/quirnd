// src/app/(protected)/dashboard/external-dashboard/components/quick-actions.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArchiveRestore, Search, Bookmark, StickyNote, Flag, Printer } from 'lucide-react'

const quickActions = [
  {
    title: 'Export Audit Report',
    description: 'Generate comprehensive audit summary',
    icon: ArchiveRestore,
    iconColor: 'blue'
  },
  {
    title: 'Evidence Search',
    description: 'Find specific evidence documents',
    icon: Search,
    iconColor: 'green'
  },
  {
    title: 'Bookmark Control',
    description: 'Save control for detailed review',
    icon: Bookmark,
    iconColor: 'purple'
  },
  {
    title: 'Add Audit Note',
    description: 'Record observations and comments',
    icon: StickyNote,
    iconColor: 'yellow'
  },
  {
    title: 'Flag for Follow-up',
    description: 'Mark items requiring attention',
    icon: Flag,
    iconColor: 'red'
  },
  {
    title: 'Print Checklist',
    description: 'Generate audit checklist PDF',
    icon: Printer,
    iconColor: 'indigo'
  }
]

export function QuickActions() {
  return (
    <section className="mb-8">
      <Card className="border border-gray-100">
        <CardHeader>
          <CardTitle>Quick Actions & Tools</CardTitle>
          <CardDescription>Frequently used auditor tools and shortcuts</CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickActions.map((action, index) => {
              const IconComponent = action.icon
              return (
                <Button
                  key={index}
                  variant="outline"
                  className="flex items-center p-4 h-auto border border-gray-200 hover:bg-gray-50 text-left justify-start"
                >
                  <div className={`w-10 h-10 bg-${action.iconColor}-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0`}>
                    <IconComponent className={`text-${action.iconColor}-600`} />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{action.title}</div>
                    <div className="text-sm text-gray-600">{action.description}</div>
                  </div>
                </Button>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
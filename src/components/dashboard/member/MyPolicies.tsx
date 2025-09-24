// src/components/dashboard/member/MyPolicies.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Filter, AlertTriangle, Shield, CheckCircle, Users, Eye, Check } from 'lucide-react';

const policies = [
  {
    id: 1,
    title: 'Data Privacy Policy v2.1',
    description: 'Updated privacy guidelines for customer data',
    lastUpdated: 'December 1, 2024',
    dueDate: 'December 15, 2024',
    status: 'Pending',
    icon: AlertTriangle,
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-600',
    statusColor: 'bg-orange-100 text-orange-800'
  },
  {
    id: 2,
    title: 'Information Security Policy',
    description: 'Annual security policy acknowledgment',
    lastUpdated: 'November 28, 2024',
    dueDate: 'December 20, 2024',
    status: 'Review',
    icon: Shield,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    statusColor: 'bg-blue-100 text-blue-800'
  },
  {
    id: 3,
    title: 'Code of Conduct',
    description: 'Employee behavior and ethics guidelines',
    acceptedDate: 'November 15, 2024',
    nextReview: 'November 2025',
    status: 'Accepted',
    icon: CheckCircle,
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
    statusColor: 'bg-green-100 text-green-800'
  },
  {
    id: 4,
    title: 'Remote Work Policy',
    description: 'Guidelines for remote work arrangements',
    lastUpdated: 'December 5, 2024',
    dueDate: 'December 25, 2024',
    status: 'Pending',
    icon: Users,
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
    statusColor: 'bg-orange-100 text-orange-800'
  }
];

export default function MyPolicies() {
  return (
    <section id="my-policies-section" className="mb-8">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl font-semibold text-gray-900">My Policies</CardTitle>
              <p className="text-sm text-gray-600 mt-1">Policies requiring your review and acknowledgment</p>
            </div>
            <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {policies.map((policy) => (
              <Card key={policy.id} className="border border-gray-200 hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center">
                      <div className={`p-2 ${policy.iconBg} rounded-lg`}>
                        <policy.icon className={`${policy.iconColor} h-5 w-5`} />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-lg font-medium text-gray-900">{policy.title}</h3>
                        <p className="text-sm text-gray-500">{policy.description}</p>
                      </div>
                    </div>
                    <Badge className={policy.statusColor}>{policy.status}</Badge>
                  </div>
                  <div className="mb-4">
                    {policy.status === 'Accepted' ? (
                      <>
                        <p className="text-sm text-gray-600 mb-2">Accepted: {policy.acceptedDate}</p>
                        <p className="text-sm text-gray-600">Next Review: {policy.nextReview}</p>
                      </>
                    ) : (
                      <>
                        <p className="text-sm text-gray-600 mb-2">Last Updated: {policy.lastUpdated}</p>
                        <p className="text-sm text-gray-600">Due: {policy.dueDate}</p>
                      </>
                    )}
                  </div>
                  <div className="flex space-x-3">
                    <Button 
                      variant="outline" 
                      className={`flex-1 ${policy.status === 'Accepted' ? 'text-gray-600 border-gray-300' : 'text-blue-600 border-blue-600 hover:bg-blue-50'}`}
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      {policy.status === 'Accepted' ? 'View Policy' : 'Review Policy'}
                    </Button>
                    <Button 
                      className={`flex-1 ${policy.status === 'Accepted' ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                      disabled={policy.status === 'Accepted'}
                    >
                      <Check className="mr-2 h-4 w-4" />
                      {policy.status === 'Accepted' ? 'Accepted' : 'Accept'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
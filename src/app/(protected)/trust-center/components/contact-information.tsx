// src/components/trust-center/contact-information.tsx
import { Mail, Phone, Shield, Clock, AlertTriangle } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

export function ContactInformation() {
  const complianceTeam = [
    {
      name: 'Sarah Mitchell',
      role: 'Chief Information Security Officer',
      email: 'sarah.mitchell@securevault.com',
      avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg',
      initials: 'SM'
    },
    {
      name: 'Michael Chen',
      role: 'ISO 27001 Lead Implementer',
      email: 'michael.chen@securevault.com',
      avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg',
      initials: 'MC'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Compliance Analyst',
      email: 'emily.rodriguez@securevault.com',
      avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-6.jpg',
      initials: 'ER'
    }
  ]

  const contactChannels = [
    {
      icon: Mail,
      iconColor: 'text-blue-600',
      iconBg: 'bg-blue-100',
      title: 'General Inquiries',
      value: 'compliance@securevault.com',
      valueColor: 'text-blue-600'
    },
    {
      icon: Phone,
      iconColor: 'text-green-600',
      iconBg: 'bg-green-100',
      title: 'Phone Support',
      value: '+1 (555) 123-4567',
      valueColor: 'text-gray-600'
    },
    {
      icon: Shield,
      iconColor: 'text-purple-600',
      iconBg: 'bg-purple-100',
      title: 'Security Incidents',
      value: 'security@securevault.com',
      valueColor: 'text-red-600'
    },
    {
      icon: Clock,
      iconColor: 'text-orange-600',
      iconBg: 'bg-orange-100',
      title: 'Business Hours',
      value: 'Monday - Friday, 9:00 AM - 6:00 PM PST',
      valueColor: 'text-gray-600'
    }
  ]

  return (
    <section className="mb-12">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Contact Information</h2>
        <p className="text-gray-600">Get in touch with our compliance and security team</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Compliance Team</h3>
            <div className="space-y-4">
              {complianceTeam.map((member, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback>{member.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-gray-900">{member.name}</p>
                    <p className="text-sm text-gray-600">{member.role}</p>
                    <p className="text-sm text-blue-600">{member.email}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Channels</h3>
            <div className="space-y-4">
              {contactChannels.map((channel, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className={`w-10 h-10 ${channel.iconBg} rounded-lg flex items-center justify-center`}>
                    <channel.icon className={channel.iconColor} />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{channel.title}</p>
                    <p className={`text-sm ${channel.valueColor}`}>{channel.value}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="text-yellow-600 mt-1" />
                <div>
                  <p className="text-sm font-medium text-yellow-800">Emergency Response</p>
                  <p className="text-sm text-yellow-700">
                    For urgent security matters outside business hours, contact our 24/7 SOC at +1 (555) 911-SECU
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
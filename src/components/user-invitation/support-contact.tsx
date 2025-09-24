// src/components/user-invitation/support-contact.tsx
import { Button } from '@/components/ui/button'
import { Headphones, Mail, Phone, Clock, MessageCircle } from 'lucide-react'

export function SupportContact() {
  const handleLiveChat = () => {
    // Open live chat widget
    console.log('Opening live chat...')
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
        <Headphones className="mr-2 h-5 w-5 text-gray-600" />
        Need Help?
      </h3>
      <div className="space-y-3">
        <div className="flex items-center space-x-3">
          <Mail className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-700">support@qireon.com</span>
        </div>
        <div className="flex items-center space-x-3">
          <Phone className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-700">1-800-QIREON-1</span>
        </div>
        <div className="flex items-center space-x-3">
          <Clock className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-700">24/7 Support Available</span>
        </div>
      </div>
      <Button 
        onClick={handleLiveChat}
        className="w-full mt-4 bg-gray-100 hover:bg-gray-200 text-gray-700"
        variant="outline"
      >
        <MessageCircle className="mr-2 h-4 w-4" />
        Start Live Chat
      </Button>
    </div>
  )
}
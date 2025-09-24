// src/components/trust-center/modals/certificate-modal.tsx
import { Award } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

interface CertificateModalProps {
  isOpen: boolean
  onClose: () => void
}

export function CertificateModal({ isOpen, onClose }: CertificateModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>ISO 27001 Certificate</DialogTitle>
        </DialogHeader>
        <div className="p-6">
          <div className="bg-gray-100 rounded-lg p-8 text-center">
            <Award className="text-6xl text-blue-600 mb-4 mx-auto" />
            <p className="text-gray-600">Certificate preview would be displayed here</p>
            <p className="text-sm text-gray-500 mt-2">Watermarked version for viewing purposes</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
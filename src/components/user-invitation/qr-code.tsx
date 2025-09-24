// src/components/user-invitation/qr-code.tsx
export function QRCode() {
    return (
      <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
        <div className="w-32 h-32 mx-auto bg-gray-100 rounded-lg flex items-center justify-center mb-4">
          <img 
            className="w-32 h-32 rounded-lg" 
            src="https://storage.googleapis.com/uxpilot-auth.appspot.com/c9472f96fa-c05854b93719a4ddbbbe.png" 
            alt="QR code for authenticator app setup" 
          />
        </div>
        <p className="text-sm text-gray-600">Scan this QR code with your authenticator app</p>
      </div>
    )
  }
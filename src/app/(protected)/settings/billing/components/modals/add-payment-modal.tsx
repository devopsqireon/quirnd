// src/app/(protected)/settings/billing/components/modals/add-payment-modal.tsx

"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { X } from "lucide-react";
import { PaymentMethod } from "../../types/billing";

interface AddPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPayment: (paymentMethod: Omit<PaymentMethod, 'id'>) => void;
}

export function AddPaymentModal({ isOpen, onClose, onAddPayment }: AddPaymentModalProps) {
  const [paymentType, setPaymentType] = useState<'card' | 'paypal'>('card');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCvc] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const [setAsDefault, setSetAsDefault] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const newPaymentMethod: Omit<PaymentMethod, 'id'> = {
        type: cardNumber.startsWith('4') ? 'visa' : cardNumber.startsWith('5') ? 'mastercard' : 'visa',
        last4: cardNumber.slice(-4),
        expiryDate,
        isDefault: setAsDefault,
        cardholderName
      };

      await onAddPayment(newPaymentMethod);
      
      // Reset form
      setCardNumber('');
      setExpiryDate('');
      setCvc('');
      setCardholderName('');
      setSetAsDefault(false);
      
      onClose();
    } catch (error) {
      console.error('Failed to add payment method:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold">Add Payment Method</DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Payment Type Selection */}
          <RadioGroup value={paymentType} onValueChange={(value) => setPaymentType(value as 'card' | 'paypal')}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="card" id="card" />
              <Label htmlFor="card" className="font-medium">Credit/Debit Card</Label>
            </div>
          </RadioGroup>

          {paymentType === 'card' && (
            <>
              {/* Card Number */}
              <div>
                <Label htmlFor="cardNumber" className="text-sm font-medium text-slate-700">
                  Card Number
                </Label>
                <Input
                  id="cardNumber"
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                  maxLength={19}
                  required
                />
              </div>

              {/* Expiry and CVC */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiryDate" className="text-sm font-medium text-slate-700">
                    Expiry Date
                  </Label>
                  <Input
                    id="expiryDate"
                    type="text"
                    placeholder="MM/YY"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                    maxLength={5}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="cvc" className="text-sm font-medium text-slate-700">
                    CVC
                  </Label>
                  <Input
                    id="cvc"
                    type="text"
                    placeholder="123"
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value.replace(/[^0-9]/g, '').slice(0, 4))}
                    maxLength={4}
                    required
                  />
                </div>
              </div>

              {/* Cardholder Name */}
              <div>
                <Label htmlFor="cardholderName" className="text-sm font-medium text-slate-700">
                  Cardholder Name
                </Label>
                <Input
                  id="cardholderName"
                  type="text"
                  placeholder="John Doe"
                  value={cardholderName}
                  onChange={(e) => setCardholderName(e.target.value)}
                  required
                />
              </div>
            </>
          )}

          {/* Set as Default */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="setAsDefault"
              checked={setAsDefault}
              onCheckedChange={(checked) => setSetAsDefault(checked as boolean)}
            />
            <Label htmlFor="setAsDefault" className="text-sm text-slate-700">
              Set as default payment method
            </Label>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-3">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-slate-900 hover:bg-slate-800"
              disabled={isLoading}
            >
              {isLoading ? 'Adding...' : 'Add Payment Method'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
// src/app/(protected)/settings/components/organization/SecuritySection.tsx

'use client';

import { Shield, Globe, Trash2, Plus } from 'lucide-react';
import { SecuritySettings } from '@/lib/types/organization';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface SecuritySectionProps {
  settings: SecuritySettings | null;
  onUpdate: (updates: Partial<SecuritySettings>) => void;
}

export function SecuritySection({ settings, onUpdate }: SecuritySectionProps) {
  if (!settings) return null;

  const removeIpRestriction = (id: string) => {
    const updatedRestrictions = settings.ipRestrictions.filter(restriction => restriction.id !== id);
    onUpdate({ ipRestrictions: updatedRestrictions });
  };

  return (
    <section className="mb-8">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Security Preferences</CardTitle>
              <CardDescription>Organization-wide security settings</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <Badge variant="secondary" className="text-green-600">Secure</Badge>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Two-Factor Authentication */}
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Shield className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Two-Factor Authentication</h4>
                    <p className="text-xs text-muted-foreground">Required for all organization members</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="text-green-600">Enabled</Badge>
                  <div className="w-11 h-6 bg-green-500 rounded-full relative">
                    <div className="w-5 h-5 bg-white rounded-full shadow absolute top-0.5 right-0.5"></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Session Management */}
          <div className="space-y-2">
            <Label htmlFor="session-timeout">Session Timeout</Label>
            <Select 
              value={settings.sessionTimeout.toString()} 
              onValueChange={(value) => onUpdate({ sessionTimeout: parseInt(value) })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30">30 minutes</SelectItem>
                <SelectItem value="60">1 hour</SelectItem>
                <SelectItem value="120">2 hours</SelectItem>
                <SelectItem value="240">4 hours</SelectItem>
                <SelectItem value="480">8 hours</SelectItem>
                <SelectItem value="0">Never expire</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">Automatic logout after period of inactivity</p>
          </div>

          {/* IP Restrictions */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>IP Address Restrictions</Label>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-1" />
                Add IP Range
              </Button>
            </div>
            <div className="space-y-2">
              {settings.ipRestrictions.map((restriction) => (
                <Card key={restriction.id} className="bg-muted/50">
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Globe className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{restriction.ipRange}</span>
                        <Badge variant="secondary" className="text-xs">
                          {restriction.label}
                        </Badge>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => removeIpRestriction(restriction.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
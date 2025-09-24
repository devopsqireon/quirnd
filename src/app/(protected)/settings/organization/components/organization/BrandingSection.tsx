// src/app/(protected)/settings/components/organization/BrandingSection.tsx

'use client';

import { useState } from 'react';
import { CloudUpload, Building, Upload, X, HelpCircle } from 'lucide-react';
import { Organization } from '@/lib/types/organization';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Label } from '@/components/ui/label';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface BrandingSectionProps {
  organization: Organization | null;
  onUpdate: (updates: Partial<Organization>) => void;
}

export function BrandingSection({ organization, onUpdate }: BrandingSectionProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  if (!organization) return null;

  const handleLogoUpload = async (file: File) => {
    setIsUploading(true);
    setUploadProgress(0);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          onUpdate({ logoUrl: URL.createObjectURL(file) });
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && (file.type.startsWith('image/') || file.type === 'image/svg+xml')) {
      handleLogoUpload(file);
    }
  };

  return (
    <section className="mb-8">
      <Card>
        <CardHeader>
          <CardTitle>Branding</CardTitle>
          <CardDescription>Customize your organization's visual identity</CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-8">
          {/* Logo Upload */}
          <div className="space-y-4">
            <Label className="text-sm font-medium">Organization Logo</Label>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Upload Zone */}
              <div>
                <div 
                  className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-primary hover:bg-primary/5 cursor-pointer transition-all"
                  onClick={() => document.getElementById('logo-input')?.click()}
                >
                  <div className="space-y-3">
                    <div className="mx-auto w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                      <CloudUpload className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Drop your logo here, or <span className="text-primary">browse</span></p>
                      <p className="text-xs text-muted-foreground">PNG, JPG, SVG up to 5MB</p>
                    </div>
                  </div>
                  <input 
                    id="logo-input"
                    type="file" 
                    className="hidden" 
                    accept=".png,.jpg,.jpeg,.svg"
                    onChange={handleFileSelect}
                  />
                </div>
                
                {/* Upload Progress */}
                {isUploading && (
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Uploading logo...</span>
                      <span className="text-muted-foreground">{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} className="w-full" />
                  </div>
                )}
              </div>
              
              {/* Logo Preview */}
              <div>
                <Card className="bg-muted/50">
                  <CardContent className="p-6">
                    <h4 className="text-sm font-medium mb-4">Preview</h4>
                    <div className="space-y-4">
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-primary-foreground">
                              {organization.logoUrl ? (
                                <img 
                                  src={organization.logoUrl} 
                                  alt="Logo" 
                                  className="w-full h-full rounded-lg object-cover"
                                />
                              ) : (
                                <Building className="h-5 w-5" />
                              )}
                            </div>
                            <span className="text-sm font-medium">Acme Corporation</span>
                          </div>
                        </CardContent>
                      </Card>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
                          onClick={() => document.getElementById('logo-input')?.click()}
                        >
                          Replace
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1 text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
                          onClick={() => onUpdate({ logoUrl: undefined })}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Logo Settings */}
          <Card className="bg-muted/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Switch 
                    id="show-logo"
                    checked={organization.showLogoOnReports}
                    onCheckedChange={(checked) => onUpdate({ showLogoOnReports: checked })}
                  />
                  <div>
                    <Label htmlFor="show-logo" className="text-sm font-medium cursor-pointer">
                      Show organization logo on reports and exports
                    </Label>
                    <p className="text-xs text-muted-foreground">Your logo will appear in exported reports and dashboards</p>
                  </div>
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="sm" className="p-2">
                        <HelpCircle className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p>This setting controls whether your organization logo appears on compliance reports, data exports, and dashboard printouts. Enabling this helps maintain brand consistency across all documentation.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </section>
  );
}
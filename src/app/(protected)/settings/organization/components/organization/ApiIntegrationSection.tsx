// src/app/(protected)/settings/components/organization/ApiIntegrationSection.tsx

'use client';

import { useState } from 'react';
import { Key, Link, Plus, MoreVertical, Trash2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export function ApiIntegrationSection() {
  const [apiKeys] = useState([
    {
      id: '1',
      name: 'Production API Key',
      createdAt: 'Jan 15, 2024',
      lastUsed: '2 hours ago',
      status: 'active' as const
    },
    {
      id: '2',
      name: 'Development API Key',
      createdAt: 'Dec 8, 2023',
      lastUsed: '5 days ago',
      status: 'limited' as const
    }
  ]);

  const [webhooks] = useState([
    {
      id: '1',
      url: 'https://api.acmecorp.com/webhook',
      events: ['Compliance alerts', 'audit events'],
      status: 'healthy' as const
    }
  ]);

  const [connectedApps] = useState([
    {
      id: '1',
      name: 'Microsoft 365',
      provider: 'microsoft',
      status: 'connected' as const
    },
    {
      id: '2',
      name: 'Google Workspace',
      provider: 'google',
      status: 'connected' as const
    }
  ]);

  return (
    <section className="mb-8">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>API & Integrations</CardTitle>
              <CardDescription>Manage API access and third-party integrations</CardDescription>
            </div>
            <Button>Generate API Key</Button>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* API Keys */}
          <div>
            <h4 className="text-sm font-medium mb-4">Active API Keys</h4>
            <div className="space-y-3">
              {apiKeys.map((apiKey) => (
                <Card key={apiKey.id} className="bg-muted/50">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 ${
                          apiKey.status === 'active' ? 'bg-green-100' : 'bg-yellow-100'
                        } rounded-lg flex items-center justify-center`}>
                          <Key className={`h-4 w-4 ${
                            apiKey.status === 'active' ? 'text-green-600' : 'text-yellow-600'
                          }`} />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{apiKey.name}</p>
                          <p className="text-xs text-muted-foreground">
                            Created on {apiKey.createdAt} • Last used {apiKey.lastUsed}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge 
                          variant="secondary" 
                          className={
                            apiKey.status === 'active' 
                              ? 'text-green-600' 
                              : 'text-yellow-600'
                          }
                        >
                          {apiKey.status === 'active' ? 'Active' : 'Limited'}
                        </Badge>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Regenerate</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Webhook Configuration */}
          <div className="border-t pt-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-medium">Webhook Endpoints</h4>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-1" />
                Add Webhook
              </Button>
            </div>
            <div className="space-y-2">
              {webhooks.map((webhook) => (
                <Card key={webhook.id} className="bg-muted/50">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Link className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{webhook.url}</p>
                          <p className="text-xs text-muted-foreground">
                            {webhook.events.join(', ')}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-xs text-muted-foreground">Healthy</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Connected Apps */}
          <div className="border-t pt-6">
            <h4 className="text-sm font-medium mb-4">Connected Applications</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {connectedApps.map((app) => (
                <Card key={app.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 ${
                          app.provider === 'microsoft' ? 'bg-blue-600' : 'bg-green-600'
                        } rounded-lg flex items-center justify-center text-white`}>
                          {app.provider === 'microsoft' ? 'M' : 'G'}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{app.name}</p>
                          <p className="text-xs text-muted-foreground">Connected</p>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
                      >
                        Disconnect
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
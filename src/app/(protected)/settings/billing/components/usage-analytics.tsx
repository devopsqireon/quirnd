// src/app/(protected)/settings/billing/components/usage-analytics.tsx

"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, TrendingUp, TriangleAlert } from "lucide-react";
import { UsageMetrics } from "../types/billing";

interface UsageAnalyticsProps {
  metrics: UsageMetrics;
  onViewUpgradeOptions: () => void;
}

export function UsageAnalytics({ metrics, onViewUpgradeOptions }: UsageAnalyticsProps) {
  const userGrowthPercentage = 12; // Mock data - would come from API
  const storageGrowthPercentage = 25; // Mock data - would come from API
  const storageUsagePercentage = (metrics.storageUsed / metrics.storageLimit) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Usage Analytics</CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Monthly Active Users */}
          <div className="bg-slate-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-slate-700">Monthly Active Users</span>
              <Users className="w-5 h-5 text-slate-400" />
            </div>
            <div className="text-2xl font-bold text-slate-900 mb-1">{metrics.activeUsers}</div>
            <div className="text-sm text-green-600 flex items-center">
              <TrendingUp className="w-4 h-4 mr-1" />
              +{userGrowthPercentage}% from last month
            </div>
          </div>
          
          {/* Storage Growth */}
          <div className="bg-slate-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-slate-700">Storage Growth</span>
              <TrendingUp className="w-5 h-5 text-slate-400" />
            </div>
            <div className="text-2xl font-bold text-slate-900 mb-1">+{((metrics.storageUsed * 0.2) / 1000).toFixed(0)}GB</div>
            <div className="text-sm text-orange-600 flex items-center">
              <TrendingUp className="w-4 h-4 mr-1" />
              +{storageGrowthPercentage}% from last month
            </div>
          </div>
        </div>

        {/* Usage Alert */}
        {storageUsagePercentage >= 60 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <TriangleAlert className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-medium text-yellow-900 mb-1">Usage Alert</h3>
                <p className="text-sm text-yellow-800 mb-2">
                  You're approaching your storage limit ({storageUsagePercentage.toFixed(0)}% used). 
                  Consider upgrading to Enterprise plan for 5TB storage.
                </p>
                <Button 
                  variant="link" 
                  className="text-yellow-600 hover:text-yellow-700 p-0 h-auto text-sm font-medium"
                  onClick={onViewUpgradeOptions}
                >
                  View upgrade options →
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
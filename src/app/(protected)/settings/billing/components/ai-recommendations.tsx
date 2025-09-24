// src/app/(protected)/settings/billing/components/ai-recommendations.tsx

"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bot, Calendar, BarChart3 } from "lucide-react";
import { AIRecommendation } from "../types/billing";

interface AIRecommendationsProps {
  recommendations: AIRecommendation[];
  onTakeAction: (recommendationId: string, action: string) => void;
}

export function AIRecommendations({ recommendations, onTakeAction }: AIRecommendationsProps) {
  const getIcon = (type: AIRecommendation['type']) => {
    switch (type) {
      case 'plan-optimization':
        return <Bot className="w-5 h-5" />;
      case 'billing-cycle':
        return <Calendar className="w-5 h-5" />;
      case 'usage-trend':
        return <BarChart3 className="w-5 h-5" />;
      default:
        return <Bot className="w-5 h-5" />;
    }
  };

  const getVariantClasses = (variant: AIRecommendation['variant']) => {
    switch (variant) {
      case 'blue':
        return {
          border: 'border-blue-200',
          bg: 'bg-blue-50',
          iconBg: 'bg-blue-600',
          title: 'text-blue-900',
          description: 'text-blue-800',
          primaryBtn: 'text-blue-600 bg-white border-blue-300 hover:bg-blue-50',
          secondaryBtn: 'text-blue-600 hover:text-blue-700'
        };
      case 'green':
        return {
          border: 'border-green-200',
          bg: 'bg-green-50',
          iconBg: 'bg-green-600',
          title: 'text-green-900',
          description: 'text-green-800',
          primaryBtn: 'text-green-600 bg-white border-green-300 hover:bg-green-50',
          secondaryBtn: 'text-green-600 hover:text-green-700'
        };
      case 'orange':
        return {
          border: 'border-orange-200',
          bg: 'bg-orange-50',
          iconBg: 'bg-orange-600',
          title: 'text-orange-900',
          description: 'text-orange-800',
          primaryBtn: 'text-orange-600 bg-white border-orange-300 hover:bg-orange-50',
          secondaryBtn: 'text-orange-600 hover:text-orange-700'
        };
      default:
        return {
          border: 'border-slate-200',
          bg: 'bg-slate-50',
          iconBg: 'bg-slate-600',
          title: 'text-slate-900',
          description: 'text-slate-800',
          primaryBtn: 'text-slate-600 bg-white border-slate-300 hover:bg-slate-50',
          secondaryBtn: 'text-slate-600 hover:text-slate-700'
        };
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">AI Recommendations</CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {recommendations.map((recommendation) => {
            const styles = getVariantClasses(recommendation.variant);
            
            return (
              <div 
                key={recommendation.id} 
                className={`border ${styles.border} ${styles.bg} rounded-lg p-4`}
              >
                <div className="flex items-start space-x-3">
                  <div className={`w-8 h-8 ${styles.iconBg} rounded-full flex items-center justify-center flex-shrink-0 text-white`}>
                    {getIcon(recommendation.type)}
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-medium ${styles.title} mb-1`}>
                      {recommendation.title}
                    </h3>
                    <p className={`text-sm ${styles.description} mb-3`}>
                      {recommendation.description}
                    </p>
                    <div className="flex items-center space-x-3">
                      <Button
                        variant="outline"
                        size="sm"
                        className={styles.primaryBtn}
                        onClick={() => onTakeAction(recommendation.id, 'primary')}
                      >
                        {recommendation.primaryAction}
                      </Button>
                      {recommendation.secondaryAction && (
                        <Button
                          variant="link"
                          size="sm"
                          className={`${styles.secondaryBtn} p-0 h-auto`}
                          onClick={() => onTakeAction(recommendation.id, 'secondary')}
                        >
                          {recommendation.secondaryAction}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
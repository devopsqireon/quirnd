// src/app/(protected)/settings/help-support/components/SuggestedArticles.tsx
import React from 'react';
import { Book, Settings, Shield, Bug } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export function SuggestedArticles() {
  const articles = [
    {
      title: 'Getting Started Guide',
      description: 'Complete setup and configuration',
      icon: Book,
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-600',
      badge: '✓ Popular',
      badgeColor: 'text-green-600',
      readTime: '5 min read',
    },
    {
      title: 'Account Settings',
      description: 'Manage your profile and preferences',
      icon: Settings,
      bgColor: 'bg-green-100',
      iconColor: 'text-green-600',
      readTime: '3 min read',
    },
    {
      title: 'Security Best Practices',
      description: 'Keep your account secure',
      icon: Shield,
      bgColor: 'bg-purple-100',
      iconColor: 'text-purple-600',
      badge: '✓ Recommended',
      badgeColor: 'text-blue-600',
      readTime: '7 min read',
    },
    {
      title: 'Troubleshooting Common Issues',
      description: 'Fix problems quickly',
      icon: Bug,
      bgColor: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
      readTime: '10 min read',
    },
  ];

  const handleArticleClick = (title: string) => {
    toast.info(`Opening article: ${title}`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Suggested Articles</CardTitle>
        <p className="text-sm text-gray-500">Based on common issues</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {articles.map((article, index) => {
            const Icon = article.icon;
            return (
              <div
                key={index}
                className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => handleArticleClick(article.title)}
              >
                <div className="flex-shrink-0">
                  <div className={`h-8 w-8 ${article.bgColor} rounded-lg flex items-center justify-center`}>
                    <Icon className={`h-4 w-4 ${article.iconColor}`} />
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-gray-900">{article.title}</h4>
                  <p className="text-xs text-gray-500">{article.description}</p>
                  <div className="flex items-center mt-1">
                    {article.badge && (
                      <span className={`text-xs ${article.badgeColor} mr-2`}>
                        {article.badge}
                      </span>
                    )}
                    <span className="text-xs text-gray-400">{article.readTime}</span>
                  </div>
                </div>
              </div>
            );
          })}
          <Button variant="link" className="w-full text-sm text-blue-600 hover:text-blue-700 py-2">
            View all articles →
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
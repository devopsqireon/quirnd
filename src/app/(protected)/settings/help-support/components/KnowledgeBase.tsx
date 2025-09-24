// src/app/(protected)/settings/help-support/components/KnowledgeBase.tsx
'use client';
import React, { useState } from 'react';
import { Search, Rocket, Settings, CreditCard, Bug, Play, Shield, Plug } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export function KnowledgeBase() {
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    {
      title: 'Getting Started',
      description: 'Setup guides and tutorials',
      icon: Rocket,
      bgColor: 'bg-gradient-to-br from-blue-50 to-blue-100',
      borderColor: 'border-blue-200',
      iconBg: 'bg-blue-600',
      articleCount: 15,
    },
    {
      title: 'Account Management',
      description: 'Profile and settings help',
      icon: Settings,
      bgColor: 'bg-gradient-to-br from-green-50 to-green-100',
      borderColor: 'border-green-200',
      iconBg: 'bg-green-600',
      articleCount: 12,
    },
    {
      title: 'Billing & Payments',
      description: 'Subscription and payment info',
      icon: CreditCard,
      bgColor: 'bg-gradient-to-br from-purple-50 to-purple-100',
      borderColor: 'border-purple-200',
      iconBg: 'bg-purple-600',
      articleCount: 8,
    },
    {
      title: 'Troubleshooting',
      description: 'Fix common issues',
      icon: Bug,
      bgColor: 'bg-gradient-to-br from-orange-50 to-orange-100',
      borderColor: 'border-orange-200',
      iconBg: 'bg-orange-600',
      articleCount: 20,
    },
  ];

  const featuredArticles = [
    {
      title: 'Complete Platform Setup Guide',
      description: 'A comprehensive guide to setting up your account and configuring all essential features for maximum productivity.',
      icon: Play,
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      lastUpdated: '2 days ago',
      readTime: '10 min read',
      badge: '✓ Most helpful',
      badgeColor: 'text-green-600',
    },
    {
      title: 'Security Best Practices',
      description: 'Learn how to keep your account secure with two-factor authentication, strong passwords, and security monitoring.',
      icon: Shield,
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
      lastUpdated: '5 days ago',
      readTime: '7 min read',
      badge: '✓ Recommended',
      badgeColor: 'text-blue-600',
    },
    {
      title: 'API Integration Guide',
      description: 'Step-by-step instructions for integrating our API with your existing systems and third-party applications.',
      icon: Plug,
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
      lastUpdated: '1 week ago',
      readTime: '15 min read',
      badge: 'Advanced',
      badgeColor: 'text-orange-600',
    },
  ];

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      toast.error('Please enter a search term');
      return;
    }
    toast.info(`Searching for: ${searchQuery}`);
  };

  const handleCategoryClick = (category: string) => {
    toast.info(`Opening ${category} articles`);
  };

  const handleArticleClick = (title: string) => {
    toast.info(`Opening article: ${title}`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Knowledge Base</CardTitle>
        <p className="text-sm text-gray-500">Find answers to common questions and learn how to use our platform</p>
      </CardHeader>
      <CardContent>
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Input
              placeholder="Search for articles, guides, and tutorials..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="pl-10 pr-20 py-3"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <Button
              className="absolute inset-y-0 right-1 my-1 px-4"
              onClick={handleSearch}
            >
              Search
            </Button>
          </div>
        </div>

        {/* Popular Categories */}
        <div className="mb-8">
          <h3 className="text-md font-semibold text-gray-900 mb-4">Popular Categories</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <div
                  key={index}
                  className={`${category.bgColor} p-4 rounded-lg border ${category.borderColor} hover:shadow-md transition-shadow cursor-pointer`}
                  onClick={() => handleCategoryClick(category.title)}
                >
                  <div className="flex items-center mb-2">
                    <div className={`h-8 w-8 ${category.iconBg} rounded-lg flex items-center justify-center mr-3`}>
                      <Icon className="h-4 w-4 text-white" />
                    </div>
                    <h4 className="font-medium text-gray-900">{category.title}</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{category.description}</p>
                  <span className="text-xs text-gray-600">{category.articleCount} articles</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Featured Articles */}
        <div>
          <h3 className="text-md font-semibold text-gray-900 mb-4">Featured Articles</h3>
          <div className="space-y-4">
            {featuredArticles.map((article, index) => {
              const Icon = article.icon;
              return (
                <div
                  key={index}
                  className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => handleArticleClick(article.title)}
                >
                  <div className="flex-shrink-0">
                    <div className={`h-12 w-12 ${article.iconBg} rounded-lg flex items-center justify-center`}>
                      <Icon className={`h-6 w-6 ${article.iconColor}`} />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 mb-1">{article.title}</h4>
                    <p className="text-sm text-gray-600 mb-2">{article.description}</p>
                    <div className="flex items-center text-xs text-gray-500">
                      <span>Updated {article.lastUpdated}</span>
                      <span className="mx-2">•</span>
                      <span>{article.readTime}</span>
                      <span className="mx-2">•</span>
                      <span className={article.badgeColor}>{article.badge}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
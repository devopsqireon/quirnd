// File: src/app/(protected)/settings/feedback/page.tsx

import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FeedbackSubmission from '@/components/feedback/FeedbackSubmission';
import MyFeedback from '@/components/feedback/MyFeedback';
import ProductRoadmap from '@/components/feedback/ProductRoadmap';
import CommunityFeedback from '@/components/feedback/CommunityFeedback';
import FeedbackAnalytics from '@/components/feedback/FeedbackAnalytics';
import AIInsights from '@/components/feedback/AIInsights';
import EngagementMetrics from '@/components/feedback/EngagementMetrics';
import HeroSection from '@/components/feedback/HeroSection';
import QuickStats from '@/components/feedback/QuickStats';
import TrendingFeedback from '@/components/feedback/TrendingFeedback';
import RecentUpdates from '@/components/feedback/RecentUpdates';

export default function FeedbackPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <HeroSection />
      
      <Tabs defaultValue="feedback" className="mt-8">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
          <TabsTrigger value="roadmap">Roadmap</TabsTrigger>
          <TabsTrigger value="community">Community</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="feedback" className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <FeedbackSubmission />
              <MyFeedback />
            </div>
            <div className="space-y-8">
              <QuickStats />
              <TrendingFeedback />
              <RecentUpdates />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="roadmap">
          <ProductRoadmap />
        </TabsContent>

        <TabsContent value="community">
          <CommunityFeedback />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-8">
          <FeedbackAnalytics />
          <AIInsights />
          <EngagementMetrics />
        </TabsContent>
      </Tabs>
    </div>
  );
}
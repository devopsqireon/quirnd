    // File: src/components/feedback/HeroSection.tsx

import React from 'react';
import { Card } from '@/components/ui/card';
import { MessageSquare, Rocket, Users } from 'lucide-react';

export default function HeroSection() {
  return (
    <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-2xl border-0">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-bold mb-4">Shape the Future of Qireon</h1>
        <p className="text-xl text-blue-100 mb-6">
          Your feedback drives our innovation. Submit ideas, track progress, and see what's coming next in our product roadmap.
        </p>
        <div className="flex items-center space-x-6">
          <div className="flex items-center">
            <MessageSquare className="w-6 h-6 mr-2" />
            <div>
              <div className="text-2xl font-bold">247</div>
              <div className="text-sm text-blue-100">Active Feedback</div>
            </div>
          </div>
          <div className="flex items-center">
            <Rocket className="w-6 h-6 mr-2" />
            <div>
              <div className="text-2xl font-bold">18</div>
              <div className="text-sm text-blue-100">Features Delivered</div>
            </div>
          </div>
          <div className="flex items-center">
            <Users className="w-6 h-6 mr-2" />
            <div>
              <div className="text-2xl font-bold">1.2k</div>
              <div className="text-sm text-blue-100">Community Votes</div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
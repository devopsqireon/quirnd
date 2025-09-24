// src/app/(protected)/settings/help-support/components/QuickChat.tsx
'use client';
import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';

export function QuickChat() {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (!message.trim()) return;
    toast.success('Message sent to support agent');
    setMessage('');
  };

  const chatMessages = [
    {
      id: 1,
      sender: 'agent',
      name: 'Agent Mike',
      avatar: '/avatar-2.jpg',
      message: "Hi! I'm here to help. What can I assist you with today?",
      time: '2 min ago',
    },
    {
      id: 2,
      sender: 'user',
      message: "I'm having trouble accessing my dashboard",
      time: '1 min ago',
    },
    {
      id: 3,
      sender: 'agent',
      name: 'Agent Mike',
      avatar: '/avatar-2.jpg',
      message: "I can help with that! Let me check your account permissions.",
      time: 'now',
    },
  ];

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Quick Chat</CardTitle>
          <div className="flex items-center">
            <div className="h-2 w-2 bg-green-400 rounded-full mr-2"></div>
            <span className="text-xs text-green-600">Online</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mb-4 max-h-64 overflow-y-auto">
          {chatMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start space-x-3 ${
                msg.sender === 'user' ? 'justify-end' : ''
              }`}
            >
              {msg.sender === 'agent' && (
                <Avatar className="h-8 w-8">
                  <AvatarImage src={msg.avatar} alt={msg.name} />
                  <AvatarFallback>AM</AvatarFallback>
                </Avatar>
              )}
              <div className={`flex-1 ${msg.sender === 'user' ? 'ml-8' : ''}`}>
                <div
                  className={`rounded-lg px-3 py-2 ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white ml-8'
                      : 'bg-gray-100'
                  }`}
                >
                  <p className="text-sm">{msg.message}</p>
                </div>
                <p className={`text-xs text-gray-500 mt-1 ${
                  msg.sender === 'user' ? 'text-right' : ''
                }`}>
                  {msg.sender === 'agent' ? `${msg.name} - ${msg.time}` : `You - ${msg.time}`}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-200 pt-4">
          <div className="flex space-x-2">
            <Input
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <Button onClick={handleSendMessage}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
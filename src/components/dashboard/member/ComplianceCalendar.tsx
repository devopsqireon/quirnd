// src/components/dashboard/member/ComplianceCalendar.tsx
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const calendarData = [
  // Previous month days
  { day: 26, isCurrentMonth: false },
  { day: 27, isCurrentMonth: false },
  { day: 28, isCurrentMonth: false },
  { day: 29, isCurrentMonth: false },
  { day: 30, isCurrentMonth: false },
  
  // Current month days
  { day: 1, isCurrentMonth: true },
  { day: 2, isCurrentMonth: true },
  { day: 3, isCurrentMonth: true },
  { day: 4, isCurrentMonth: true },
  { day: 5, isCurrentMonth: true },
  { day: 6, isCurrentMonth: true },
  { day: 7, isCurrentMonth: true },
  { day: 8, isCurrentMonth: true },
  { day: 9, isCurrentMonth: true },
  { day: 10, isCurrentMonth: true, event: { text: 'Training Due', color: 'bg-red-100 text-red-800' } },
  { day: 11, isCurrentMonth: true },
  { day: 12, isCurrentMonth: true },
  { day: 13, isCurrentMonth: true, isToday: true },
  { day: 14, isCurrentMonth: true },
  { day: 15, isCurrentMonth: true, event: { text: 'Policy Due', color: 'bg-orange-100 text-orange-800' } },
  { day: 16, isCurrentMonth: true },
  { day: 17, isCurrentMonth: true },
  { day: 18, isCurrentMonth: true, event: { text: 'Task Due', color: 'bg-blue-100 text-blue-800' } },
  { day: 19, isCurrentMonth: true },
  { day: 20, isCurrentMonth: true, event: { text: 'Assessment', color: 'bg-green-100 text-green-800' } },
  { day: 21, isCurrentMonth: true },
  { day: 22, isCurrentMonth: true },
  { day: 23, isCurrentMonth: true },
  { day: 24, isCurrentMonth: true },
  { day: 25, isCurrentMonth: true, event: { text: 'Remote Policy', color: 'bg-purple-100 text-purple-800' } },
  { day: 26, isCurrentMonth: true },
  { day: 27, isCurrentMonth: true },
  { day: 28, isCurrentMonth: true },
  { day: 29, isCurrentMonth: true },
  { day: 30, isCurrentMonth: true, event: { text: 'GDPR Due', color: 'bg-yellow-100 text-yellow-800' } },
  { day: 31, isCurrentMonth: true },
  
  // Next month days
  { day: 1, isCurrentMonth: false },
  { day: 2, isCurrentMonth: false },
  { day: 3, isCurrentMonth: false },
  { day: 4, isCurrentMonth: false },
  { day: 5, isCurrentMonth: false },
  { day: 6, isCurrentMonth: false }
];

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function ComplianceCalendar() {
  const [selectedView, setSelectedView] = useState('Month');

  return (
    <section id="compliance-calendar-section" className="mb-8">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl font-semibold text-gray-900">Compliance Calendar</CardTitle>
              <p className="text-sm text-gray-600 mt-1">Upcoming deadlines and important dates</p>
            </div>
            <div className="flex space-x-2">
              {['Month', 'Week', 'Day'].map((view) => (
                <Button
                  key={view}
                  variant={selectedView === view ? 'default' : 'outline'}
                  size="sm"
                  className={selectedView === view ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-50'}
                  onClick={() => setSelectedView(view)}
                >
                  {view}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-7 gap-px bg-gray-200 rounded-lg overflow-hidden">
            {/* Calendar Headers */}
            {weekDays.map((day) => (
              <div key={day} className="bg-gray-50 p-3 text-center text-sm font-medium text-gray-700">
                {day}
              </div>
            ))}

            {/* Calendar Days */}
            {calendarData.map((date, index) => (
              <div
                key={index}
                className={`bg-white p-2 h-24 text-sm ${
                  date.isToday
                    ? 'bg-blue-50 border-2 border-blue-600'
                    : date.isCurrentMonth
                    ? 'text-gray-900'
                    : 'text-gray-400'
                }`}
              >
                <div className={`font-medium ${date.isToday ? 'text-blue-600' : ''}`}>
                  {date.day}
                </div>
                {date.isToday && (
                  <div className="text-xs text-blue-600 mt-1">Today</div>
                )}
                {date.event && (
                  <Badge className={`text-xs ${date.event.color} px-1 rounded mt-1 text-[10px] leading-tight`}>
                    {date.event.text}
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
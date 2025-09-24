// src/components/dashboard/member/MyTraining.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, AlertTriangle, Database, Code, CheckCircle, Award } from 'lucide-react';

const trainingCourses = [
  {
    id: 1,
    title: 'Security Awareness Training 2024',
    description: 'Annual mandatory security training',
    progress: 0,
    dueDate: 'December 10, 2024',
    status: 'Overdue',
    icon: AlertTriangle,
    bgColor: 'border-red-200 bg-red-50',
    iconBg: 'bg-red-100',
    iconColor: 'text-red-600',
    statusColor: 'bg-red-100 text-red-800',
    buttonColor: 'bg-red-600 hover:bg-red-700',
    buttonText: 'Start Training Now'
  },
  {
    id: 2,
    title: 'Data Protection & GDPR',
    description: 'Learn about data protection regulations',
    progress: 65,
    dueDate: 'December 30, 2024',
    status: 'In Progress',
    icon: Database,
    bgColor: 'border-yellow-200 bg-yellow-50',
    iconBg: 'bg-yellow-100',
    iconColor: 'text-yellow-600',
    statusColor: 'bg-yellow-100 text-yellow-800',
    buttonColor: 'border-yellow-600 text-yellow-600 hover:bg-yellow-50',
    buttonText: 'Continue Training'
  },
  {
    id: 3,
    title: 'Secure Coding Practices',
    description: 'Best practices for secure software development',
    duration: '2 hours',
    dueDate: 'January 15, 2025',
    status: 'Available',
    icon: Code,
    bgColor: 'border-blue-200 bg-blue-50',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    statusColor: 'bg-blue-100 text-blue-800',
    buttonColor: 'border-blue-600 text-blue-600 hover:bg-blue-50',
    buttonText: 'Start Training'
  },
  {
    id: 4,
    title: 'Phishing Awareness',
    description: 'Recognize and report phishing attempts',
    completedDate: 'November 25, 2024',
    score: '95%',
    status: 'Completed',
    icon: CheckCircle,
    bgColor: 'border-green-200 bg-green-50',
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
    statusColor: 'bg-green-100 text-green-800',
    buttonColor: 'border-gray-300 text-gray-600 hover:bg-gray-50',
    buttonText: 'View Certificate'
  }
];

export default function MyTraining() {
  return (
    <section id="my-training-section" className="mb-8">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl font-semibold text-gray-900">My Training</CardTitle>
              <p className="text-sm text-gray-600 mt-1">Compliance training courses and certifications</p>
            </div>
            <Button className="bg-green-600 hover:bg-green-700">
              <Play className="mr-2 h-4 w-4" />
              Continue Learning
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          {/* Training Progress Overview */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Overall Training Progress</h3>
              <span className="text-2xl font-bold text-blue-600">85%</span>
            </div>
            <div className="w-full bg-white rounded-full h-3 mb-4">
              <div className="bg-blue-600 h-3 rounded-full" style={{ width: '85%' }}></div>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-green-600">12</p>
                <p className="text-sm text-gray-600">Completed</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-yellow-600">2</p>
                <p className="text-sm text-gray-600">In Progress</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-red-600">1</p>
                <p className="text-sm text-gray-600">Overdue</p>
              </div>
            </div>
          </div>

          {/* Training Courses */}
          <div className="space-y-4">
            {trainingCourses.map((course) => (
              <Card key={course.id} className={`${course.bgColor} border`}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className={`p-3 ${course.iconBg} rounded-full`}>
                        <course.icon className={`${course.iconColor} h-6 w-6`} />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-900">{course.title}</h3>
                        <p className="text-sm text-gray-600">{course.description}</p>
                      </div>
                    </div>
                    <Badge className={course.statusColor}>{course.status}</Badge>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      {course.status === 'Completed' ? (
                        <>
                          <span>Completed: {course.completedDate}</span>
                          <span>Score: {course.score}</span>
                        </>
                      ) : course.progress !== undefined ? (
                        <>
                          <span>Progress: {course.progress}%</span>
                          <span>Due: {course.dueDate}</span>
                        </>
                      ) : (
                        <>
                          <span>Duration: {course.duration}</span>
                          <span>Due: {course.dueDate}</span>
                        </>
                      )}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          course.status === 'Overdue' ? 'bg-red-600' :
                          course.status === 'In Progress' ? 'bg-yellow-600' :
                          course.status === 'Completed' ? 'bg-green-600' : 'bg-gray-300'
                        }`}
                        style={{ width: `${course.progress || (course.status === 'Completed' ? 100 : 0)}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <Button 
                    className={`w-full ${
                      course.status === 'Overdue' ? course.buttonColor :
                      course.status === 'Completed' ? course.buttonColor : ''
                    }`}
                    variant={course.status === 'Overdue' ? 'default' : 'outline'}
                  >
                    {course.status === 'Completed' ? (
                      <Award className="mr-2 h-4 w-4" />
                    ) : (
                      <Play className="mr-2 h-4 w-4" />
                    )}
                    {course.buttonText}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
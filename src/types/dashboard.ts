// src/types/dashboard.ts
export interface Task {
  id: number;
  name: string;
  description: string;
  dueDate: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'In Progress' | 'Not Started' | 'Review' | 'Completed';
  assignedBy: string;
  priorityColor: string;
  statusColor: string;
  dueDateColor: string;
}

export interface Policy {
  id: number;
  title: string;
  description: string;
  lastUpdated?: string;
  dueDate?: string;
  acceptedDate?: string;
  nextReview?: string;
  status: 'Pending' | 'Review' | 'Accepted';
  icon: React.ComponentType<any>;
  iconBg: string;
  iconColor: string;
  statusColor: string;
}

export interface TrainingCourse {
  id: number;
  title: string;
  description: string;
  progress?: number;
  dueDate?: string;
  completedDate?: string;
  score?: string;
  duration?: string;
  status: 'Overdue' | 'In Progress' | 'Available' | 'Completed';
  icon: React.ComponentType<any>;
  bgColor: string;
  iconBg: string;
  iconColor: string;
  statusColor: string;
  buttonColor: string;
  buttonText: string;
}

export interface Incident {
  id: number;
  title: string;
  reportedOn: string;
  description: string;
  status: 'Under Review' | 'Resolved' | 'Open';
  icon: React.ComponentType<any>;
  iconBg: string;
  iconColor: string;
  statusColor: string;
}

export interface Notification {
  id: number;
  type: 'error' | 'warning' | 'info' | 'success';
  title: string;
  message: string;
  action: string;
  bgColor: string;
  iconColor: string;
  icon: React.ComponentType<any>;
  textColor: string;
  messageColor: string;
  actionColor: string;
}

export interface Activity {
  id: number;
  type: string;
  title: string;
  description: string;
  date: string;
  datetime: string;
  icon: React.ComponentType<any>;
  iconBg: string;
  iconColor: string;
}

export interface CalendarDay {
  day: number;
  isCurrentMonth: boolean;
  isToday?: boolean;
  event?: {
    text: string;
    color: string;
  };
}

export interface QuickAction {
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  bgGradient: string;
  borderColor: string;
  hoverGradient: string;
  iconBg: string;
  iconColor: string;
  isReportButton?: boolean;
}

export interface IncidentReportForm {
  incidentType: string;
  severity: string;
  description: string;
  occurredAt: string;
  files: File[];
}
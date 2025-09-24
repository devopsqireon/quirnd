// File: src/lib/validations/feedback.ts

import { z } from 'zod';

export const feedbackFormSchema = z.object({
  title: z
    .string()
    .min(5, 'Title must be at least 5 characters')
    .max(100, 'Title must be less than 100 characters'),
  description: z
    .string()
    .min(20, 'Description must be at least 20 characters')
    .max(1000, 'Description must be less than 1000 characters'),
  category: z.enum(['feature', 'bug', 'improvement', 'integration', 'performance']),
  priority: z.enum(['low', 'medium', 'high', 'critical']),
  impactArea: z.enum(['ux', 'performance', 'security', 'analytics', 'api']),
  tags: z.array(z.string()).optional(),
  attachments: z.array(z.string()).optional(),
});

export const feedbackFiltersSchema = z.object({
  search: z.string().optional(),
  category: z.string().optional(),
  status: z.string().optional(),
  priority: z.string().optional(),
  dateRange: z.object({
    start: z.date(),
    end: z.date(),
  }).optional(),
  sortBy: z.enum(['newest', 'oldest', 'most-voted', 'most-commented']),
});

export type FeedbackFormData = z.infer<typeof feedbackFormSchema>;
export type FeedbackFiltersData = z.infer<typeof feedbackFiltersSchema>;
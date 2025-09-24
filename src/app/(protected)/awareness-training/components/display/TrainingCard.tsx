// /app/awareness-training/components/display/TrainingCard.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Users } from 'lucide-react';
import { TrainingProgram } from '../../types';
import { CategoryBadge, DifficultyBadge, ActionButtons } from '../shared';
import { formatDuration } from '../../utils/helpers';

interface TrainingCardProps {
  training: TrainingProgram;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onAssign: (id: string) => void;
}

const TrainingCard: React.FC<TrainingCardProps> = ({
  training,
  onView,
  onEdit,
  onDelete,
  onAssign
}) => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg mb-2 line-clamp-2">{training.title}</CardTitle>
            <div className="flex items-center gap-2 mb-2">
              <CategoryBadge category={training.category} />
              <DifficultyBadge difficulty={training.difficulty} />
              {!training.isActive && (
                <Badge variant="outline" className="bg-gray-100 text-gray-600">
                  Inactive
                </Badge>
              )}
            </div>
          </div>
          <ActionButtons
            onView={() => onView(training.id)}
            onEdit={() => onEdit(training.id)}
            onDelete={() => onDelete(training.id)}
            onAssign={() => onAssign(training.id)}
            size="sm"
            variant="ghost"
          />
        </div>
      </CardHeader>
      
      <CardContent>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{training.description}</p>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-400" />
              {formatDuration(training.duration)}
            </span>
            <span className="flex items-center gap-2">
              <Users className="w-4 h-4 text-gray-400" />
              {training.totalAssignments} assigned
            </span>
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">Completion Rate</span>
              <span className="font-medium">{training.completionRate}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-600 h-2 rounded-full transition-all duration-300" 
                style={{ width: `${training.completionRate}%` }}
              />
            </div>
          </div>
          
          {training.tags && training.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {training.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {training.tags.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{training.tags.length - 3} more
                </Badge>
              )}
            </div>
          )}
          
          {training.prerequisites && training.prerequisites.length > 0 && (
            <div className="text-xs text-gray-500">
              <span className="font-medium">Prerequisites:</span> {training.prerequisites.length} required
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TrainingCard;
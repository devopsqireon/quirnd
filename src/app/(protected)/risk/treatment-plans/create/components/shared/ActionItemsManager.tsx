// /app/risk/treatment-plans/create/components/shared/ActionItemsManager.tsx
import React from 'react';
import { Plus, X } from 'lucide-react';
import { TreatmentPlanFormData, ActionItem } from '../../types';

interface ActionItemsManagerProps {
  formData: TreatmentPlanFormData;
  setFormData: (data: TreatmentPlanFormData) => void;
}

export const ActionItemsManager: React.FC<ActionItemsManagerProps> = ({
  formData,
  setFormData,
}) => {
  const actions = formData.actions || [];

  const addAction = () => {
    const newAction: ActionItem = {
      id: Date.now(),
      title: '',
      description: '',
      owner: '',
      dueDate: '',
      priority: 'Medium'
    };
    const newActions = [...actions, newAction];
    setFormData({ ...formData, actions: newActions });
  };

  const updateAction = (id: number, field: keyof ActionItem, value: string) => {
    const updatedActions = actions.map(action =>
      action.id === id ? { ...action, [field]: value } : action
    );
    setFormData({ ...formData, actions: updatedActions });
  };

  const removeAction = (id: number) => {
    const filteredActions = actions.filter(action => action.id !== id);
    setFormData({ ...formData, actions: filteredActions });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800 border-red-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Initialize with one action if none exist
  React.useEffect(() => {
    if (actions.length === 0) {
      addAction();
    }
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-md font-semibold text-gray-900">Action Items</h4>
        <button
          onClick={addAction}
          className="px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Action
        </button>
      </div>

      <div className="space-y-4">
        {actions.map((action, index) => (
          <div key={action.id} className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-500">Action {index + 1}</span>
                <select
                  value={action.priority}
                  onChange={(e) => updateAction(action.id, 'priority', e.target.value)}
                  className={`px-2 py-1 text-xs rounded-full border ${getPriorityColor(action.priority)}`}
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
              {actions.length > 1 && (
                <button
                  onClick={() => removeAction(action.id)}
                  className="text-gray-400 hover:text-red-500"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <div className="grid gap-4">
              <div>
                <input
                  type="text"
                  placeholder="Action title..."
                  value={action.title}
                  onChange={(e) => updateAction(action.id, 'title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <textarea
                  placeholder="Action description..."
                  value={action.description}
                  onChange={(e) => updateAction(action.id, 'description', e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Assigned to..."
                  value={action.owner}
                  onChange={(e) => updateAction(action.id, 'owner', e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="date"
                  value={action.dueDate}
                  onChange={(e) => updateAction(action.id, 'dueDate', e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

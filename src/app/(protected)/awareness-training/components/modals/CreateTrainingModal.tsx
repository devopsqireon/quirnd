// /app/awareness-training/components/modals/CreateTrainingModal.tsx
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { X, Plus, Sparkles, Maximize2, Minimize2, Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { TRAINING_CATEGORIES, DIFFICULTY_LEVELS, TRAINING_TAGS } from '../../utils/constants';

interface CreateTrainingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

// Mock AI generation function
const generateAIContent = async (title: string, category: string) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  const descriptions = {
    'cybersecurity': `Comprehensive cybersecurity training covering essential security practices, threat awareness, and incident response. Learn to identify common attack vectors, implement security best practices, and protect organizational assets from cyber threats.`,
    'data-privacy': `In-depth training on data protection regulations, privacy rights, and compliance requirements. Understand GDPR, data handling procedures, and privacy by design principles to ensure responsible data management.`,
    'compliance': `Essential compliance training covering regulatory requirements, industry standards, and organizational policies. Learn to navigate compliance frameworks and implement effective governance practices.`,
    'risk-management': `Strategic risk management training focusing on risk identification, assessment, and mitigation strategies. Develop skills to proactively manage organizational risks and build resilient business processes.`,
    'general': `Essential awareness training covering fundamental concepts and best practices. Build foundational knowledge and skills necessary for professional development and organizational success.`
  };

  const objectives = {
    'cybersecurity': [
      'Identify and respond to common cybersecurity threats',
      'Implement strong password and authentication practices',
      'Recognize phishing attempts and social engineering tactics',
      'Apply security best practices in daily work activities'
    ],
    'data-privacy': [
      'Understand data protection regulations and compliance requirements',
      'Implement privacy-by-design principles in data handling',
      'Recognize and respond to data privacy incidents',
      'Apply appropriate data classification and handling procedures'
    ],
    'compliance': [
      'Navigate regulatory requirements and industry standards',
      'Implement effective compliance monitoring and reporting',
      'Identify compliance risks and mitigation strategies',
      'Maintain accurate compliance documentation and records'
    ],
    'risk-management': [
      'Conduct comprehensive risk assessments and analysis',
      'Develop and implement risk mitigation strategies',
      'Monitor and evaluate risk management effectiveness',
      'Communicate risk information to stakeholders effectively'
    ],
    'general': [
      'Understand fundamental organizational policies and procedures',
      'Apply best practices in professional work environment',
      'Demonstrate awareness of key compliance requirements',
      'Contribute to organizational security and risk management'
    ]
  };

  const suggestedTags = {
    'cybersecurity': ['Security', 'Threats', 'Protection', 'Incident Response'],
    'data-privacy': ['Privacy', 'GDPR', 'Data Protection', 'Compliance'],
    'compliance': ['Regulations', 'Standards', 'Governance', 'Audit'],
    'risk-management': ['Risk Assessment', 'Mitigation', 'Analysis', 'Strategy'],
    'general': ['Awareness', 'Best Practices', 'Fundamentals', 'Professional Development']
  };

  const categoryKey = category.toLowerCase().replace(/\s+/g, '-');
  
  return {
    description: descriptions[categoryKey] || descriptions['general'],
    learningObjectives: objectives[categoryKey] || objectives['general'],
    tags: suggestedTags[categoryKey] || suggestedTags['general']
  };
};

const CreateTrainingModal: React.FC<CreateTrainingModalProps> = ({
  isOpen,
  onClose,
  onSubmit
}) => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    difficulty: '',
    description: '',
    duration: '',
    tags: [] as string[],
    learningObjectives: [''],
    isActive: true
  });

  const [newTag, setNewTag] = useState('');
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [showAIToast, setShowAIToast] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      duration: parseInt(formData.duration),
      learningObjectives: formData.learningObjectives.filter(obj => obj.trim() !== '')
    });
  };

  const handleAIGenerate = async () => {
    if (!formData.title || !formData.category) {
      alert('Please enter a title and select a category first');
      return;
    }

    setIsGeneratingAI(true);
    try {
      const aiContent = await generateAIContent(formData.title, formData.category);
      
      setFormData(prev => ({
        ...prev,
        description: aiContent.description,
        learningObjectives: aiContent.learningObjectives,
        tags: [...new Set([...prev.tags, ...aiContent.tags])] // Merge and deduplicate
      }));

      // Show toast notification
      setShowAIToast(true);
      setTimeout(() => setShowAIToast(false), 4000);
    } catch (error) {
      console.error('AI generation failed:', error);
      alert('Failed to generate AI content. Please try again.');
    } finally {
      setIsGeneratingAI(false);
    }
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const addLearningObjective = () => {
    setFormData(prev => ({
      ...prev,
      learningObjectives: [...prev.learningObjectives, '']
    }));
  };

  const updateLearningObjective = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      learningObjectives: prev.learningObjectives.map((obj, i) => 
        i === index ? value : obj
      )
    }));
  };

  const removeLearningObjective = (index: number) => {
    setFormData(prev => ({
      ...prev,
      learningObjectives: prev.learningObjectives.filter((_, i) => i !== index)
    }));
  };

  return (
    <>
      {/* AI Toast Notification */}
      {showAIToast && (
        <div className="fixed top-4 right-4 z-[60] bg-green-50 border border-green-200 rounded-lg p-4 shadow-lg">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-green-600" />
            <div>
              <p className="text-sm font-medium text-green-800">AI Content Generated</p>
              <p className="text-sm text-green-600">AI-generated content applied. Please review and adjust.</p>
            </div>
          </div>
        </div>
      )}

      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className={`${
          isFullScreen 
            ? 'w-screen h-screen max-w-none max-h-none' 
            : 'max-w-2xl max-h-[90vh]'
        } overflow-y-auto`}>
          <DialogHeader>
            <div className="flex items-center justify-between">
              <div>
                <DialogTitle>Create New Training Program</DialogTitle>
                <DialogDescription>
                  Create a comprehensive training program for your organization.
                </DialogDescription>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={toggleFullScreen}
                className="shrink-0"
              >
                {isFullScreen ? (
                  <Minimize2 className="w-4 h-4" />
                ) : (
                  <Maximize2 className="w-4 h-4" />
                )}
              </Button>
            </div>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Training Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter training title"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="duration">Duration (minutes) *</Label>
                <Input
                  id="duration"
                  type="number"
                  value={formData.duration}
                  onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                  placeholder="45"
                  min="1"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category">Category *</Label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select category</option>
                  {Object.entries(TRAINING_CATEGORIES).map(([value, config]) => (
                    <option key={value} value={value}>{config.label}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <Label htmlFor="difficulty">Difficulty Level *</Label>
                <select
                  id="difficulty"
                  value={formData.difficulty}
                  onChange={(e) => setFormData(prev => ({ ...prev, difficulty: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select difficulty</option>
                  {Object.entries(DIFFICULTY_LEVELS).map(([value, config]) => (
                    <option key={value} value={value}>{config.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Description with AI Assist */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="description">Description *</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleAIGenerate}
                  disabled={isGeneratingAI || !formData.title || !formData.category}
                  className="flex items-center space-x-2"
                >
                  {isGeneratingAI ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Generating...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>AI Generate</span>
                    </>
                  )}
                </Button>
              </div>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Provide a detailed description of the training program"
                rows={3}
                required
              />
            </div>

            {/* Tags */}
            <div>
              <Label>Tags</Label>
              <div className="flex gap-2 mb-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add a tag"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                />
                <Button type="button" onClick={addTag} size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="flex items-center gap-1">
                    {tag}
                    <X 
                      className="w-3 h-3 cursor-pointer" 
                      onClick={() => removeTag(tag)}
                    />
                  </Badge>
                ))}
              </div>
              <div className="mt-2">
                <p className="text-sm text-gray-500 mb-1">Suggested tags:</p>
                <div className="flex flex-wrap gap-1">
                  {TRAINING_TAGS.slice(0, 8).map((tag) => (
                    <Badge 
                      key={tag} 
                      variant="outline" 
                      className="cursor-pointer hover:bg-gray-100"
                      onClick={() => {
                        if (!formData.tags.includes(tag)) {
                          setFormData(prev => ({
                            ...prev,
                            tags: [...prev.tags, tag]
                          }));
                        }
                      }}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Learning Objectives */}
            <div>
              <Label>Learning Objectives</Label>
              <div className="space-y-2">
                {formData.learningObjectives.map((objective, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={objective}
                      onChange={(e) => updateLearningObjective(index, e.target.value)}
                      placeholder={`Learning objective ${index + 1}`}
                    />
                    {formData.learningObjectives.length > 1 && (
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm"
                        onClick={() => removeLearningObjective(index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  onClick={addLearningObjective}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Objective
                </Button>
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                Create Training Program
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateTrainingModal;
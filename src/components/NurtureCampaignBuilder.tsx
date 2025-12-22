import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { 
  Plus, 
  Trash2, 
  ChevronDown, 
  ChevronUp, 
  Mail, 
  Clock, 
  GitBranch,
  Save,
  Play,
  Copy,
  Settings,
  Eye,
  MousePointer,
  MessageSquare,
  ArrowRight,
  AlertCircle
} from 'lucide-react';
import { toast } from 'sonner';

interface CampaignStep {
  id: string;
  order: number;
  type: 'email' | 'delay' | 'condition';
  emailTemplateId?: string;
  emailSubject?: string;
  emailBody?: string;
  delayAmount?: number;
  delayUnit?: 'hours' | 'days' | 'weeks';
  conditionType?: 'opened' | 'clicked' | 'replied' | 'not_opened';
  yesPath?: CampaignStep[];
  noPath?: CampaignStep[];
}

interface Campaign {
  id?: string;
  name: string;
  description: string;
  segmentId: string;
  triggerType: 'manual' | 'automatic';
  status: 'draft' | 'active' | 'paused';
  steps: CampaignStep[];
}

interface NurtureCampaignBuilderProps {
  campaignId?: string;
  onSave: (campaign: Campaign) => void;
  onCancel: () => void;
}

export default function NurtureCampaignBuilder({
  campaignId,
  onSave,
  onCancel
}: NurtureCampaignBuilderProps) {
  const [campaign, setCampaign] = useState<Campaign>({
    name: '',
    description: '',
    segmentId: '',
    triggerType: 'manual',
    status: 'draft',
    steps: []
  });

  const [selectedTemplate, setSelectedTemplate] = useState<string>('');

  const templates = [
    { id: 'welcome', name: 'New Candidate Welcome (5 steps)', steps: 5 },
    { id: 'reengagement', name: 'Re-engagement Series (5 steps)', steps: 5 },
    { id: 'passive', name: 'Passive Candidate Nurture (7 steps)', steps: 7 },
    { id: 'jobmatch', name: 'Job Match Alert (4 steps)', steps: 4 },
    { id: 'interview', name: 'Interview Preparation (6 steps)', steps: 6 },
    { id: 'blank', name: 'Start from Scratch', steps: 0 }
  ];

  const segments = [
    { id: 'all', name: 'All Candidates' },
    { id: 'new', name: 'New Candidates (Last 7 days)' },
    { id: 'react', name: 'React Developers' },
    { id: 'senior', name: 'Senior Level (5+ years)' },
    { id: 'inactive', name: 'Inactive 90+ days' },
    { id: 'passive', name: 'Passive Candidates' },
    { id: 'hot', name: 'Hot Leads (Engagement > 70)' },
    { id: 'nyc', name: 'New York City' }
  ];

  const loadTemplate = (templateId: string) => {
    const templateSteps: Record<string, CampaignStep[]> = {
      welcome: [
        {
          id: '1',
          order: 1,
          type: 'email',
          emailSubject: 'Welcome to [Company Name]!',
          emailBody: 'Hi {{firstName}},\n\nWelcome! We\'re excited to connect with you...'
        },
        {
          id: '2',
          order: 2,
          type: 'delay',
          delayAmount: 3,
          delayUnit: 'days'
        },
        {
          id: '3',
          order: 3,
          type: 'email',
          emailSubject: 'Great opportunities for {{role}} professionals',
          emailBody: 'Hi {{firstName}},\n\nI wanted to share some exciting opportunities...'
        },
        {
          id: '4',
          order: 4,
          type: 'delay',
          delayAmount: 7,
          delayUnit: 'days'
        },
        {
          id: '5',
          order: 5,
          type: 'email',
          emailSubject: 'Career advice: Growing as a {{role}}',
          emailBody: 'Hi {{firstName}},\n\nHere are some insights to help you grow...'
        }
      ],
      reengagement: [
        {
          id: '1',
          order: 1,
          type: 'email',
          emailSubject: 'We miss you, {{firstName}}!',
          emailBody: 'Hi {{firstName}},\n\nIt\'s been a while since we last connected...'
        },
        {
          id: '2',
          order: 2,
          type: 'delay',
          delayAmount: 5,
          delayUnit: 'days'
        },
        {
          id: '3',
          order: 3,
          type: 'email',
          emailSubject: 'New opportunities in your area',
          emailBody: 'Hi {{firstName}},\n\nThe market has been active lately...'
        },
        {
          id: '4',
          order: 4,
          type: 'delay',
          delayAmount: 7,
          delayUnit: 'days'
        },
        {
          id: '5',
          order: 5,
          type: 'email',
          emailSubject: 'Last chance: Exclusive opportunities',
          emailBody: 'Hi {{firstName}},\n\nBefore I close these positions...'
        }
      ],
      passive: [
        {
          id: '1',
          order: 1,
          type: 'email',
          emailSubject: 'Introduction from [Company Name]',
          emailBody: 'Hi {{firstName}},\n\nI came across your profile and was impressed...'
        },
        {
          id: '2',
          order: 2,
          type: 'delay',
          delayAmount: 1,
          delayUnit: 'weeks'
        },
        {
          id: '3',
          order: 3,
          type: 'email',
          emailSubject: 'Opportunities for {{role}} professionals',
          emailBody: 'Hi {{firstName}},\n\nHere are some roles that match your background...'
        },
        {
          id: '4',
          order: 4,
          type: 'delay',
          delayAmount: 2,
          delayUnit: 'weeks'
        },
        {
          id: '5',
          order: 5,
          type: 'email',
          emailSubject: 'Career development tips',
          emailBody: 'Hi {{firstName}},\n\nI wanted to share some insights...'
        },
        {
          id: '6',
          order: 6,
          type: 'delay',
          delayAmount: 2,
          delayUnit: 'weeks'
        },
        {
          id: '7',
          order: 7,
          type: 'email',
          emailSubject: 'Checking in',
          emailBody: 'Hi {{firstName}},\n\nHow are things going at {{currentCompany}}?'
        }
      ],
      jobmatch: [
        {
          id: '1',
          order: 1,
          type: 'email',
          emailSubject: '🎯 Perfect match: {{jobTitle}} at {{companyName}}',
          emailBody: 'Hi {{firstName}},\n\nI found a role that\'s a perfect fit for you...'
        },
        {
          id: '2',
          order: 2,
          type: 'delay',
          delayAmount: 2,
          delayUnit: 'days'
        },
        {
          id: '3',
          order: 3,
          type: 'email',
          emailSubject: 'More details about the {{jobTitle}} role',
          emailBody: 'Hi {{firstName}},\n\nHere\'s more information about the opportunity...'
        },
        {
          id: '4',
          order: 4,
          type: 'delay',
          delayAmount: 3,
          delayUnit: 'days'
        }
      ],
      interview: [
        {
          id: '1',
          order: 1,
          type: 'email',
          emailSubject: 'Interview confirmed: {{jobTitle}} at {{companyName}}',
          emailBody: 'Hi {{firstName}},\n\nYour interview is scheduled...'
        },
        {
          id: '2',
          order: 2,
          type: 'delay',
          delayAmount: 2,
          delayUnit: 'days'
        },
        {
          id: '3',
          order: 3,
          type: 'email',
          emailSubject: 'Research guide for {{companyName}}',
          emailBody: 'Hi {{firstName}},\n\nHere\'s what you should know about {{companyName}}...'
        },
        {
          id: '4',
          order: 4,
          type: 'delay',
          delayAmount: 1,
          delayUnit: 'days'
        },
        {
          id: '5',
          order: 5,
          type: 'email',
          emailSubject: 'Last-minute interview tips',
          emailBody: 'Hi {{firstName}},\n\nGood luck tomorrow! Here are some final tips...'
        },
        {
          id: '6',
          order: 6,
          type: 'delay',
          delayAmount: 1,
          delayUnit: 'days'
        }
      ]
    };

    if (templateSteps[templateId]) {
      setCampaign(prev => ({
        ...prev,
        steps: templateSteps[templateId]
      }));
      toast.success('Template loaded successfully');
    }
  };

  const addStep = (type: 'email' | 'delay' | 'condition') => {
    const newStep: CampaignStep = {
      id: Date.now().toString(),
      order: campaign.steps.length + 1,
      type,
      ...(type === 'email' && { 
        emailSubject: '', 
        emailBody: '' 
      }),
      ...(type === 'delay' && { 
        delayAmount: 1, 
        delayUnit: 'days' as const 
      }),
      ...(type === 'condition' && { 
        conditionType: 'opened' as const,
        yesPath: [],
        noPath: []
      })
    };

    setCampaign(prev => ({
      ...prev,
      steps: [...prev.steps, newStep]
    }));
  };

  const removeStep = (stepId: string) => {
    setCampaign(prev => ({
      ...prev,
      steps: prev.steps.filter(s => s.id !== stepId)
    }));
  };

  const updateStep = (stepId: string, updates: Partial<CampaignStep>) => {
    setCampaign(prev => ({
      ...prev,
      steps: prev.steps.map(s => s.id === stepId ? { ...s, ...updates } : s)
    }));
  };

  const moveStep = (stepId: string, direction: 'up' | 'down') => {
    const index = campaign.steps.findIndex(s => s.id === stepId);
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === campaign.steps.length - 1)
    ) {
      return;
    }

    const newSteps = [...campaign.steps];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newSteps[index], newSteps[targetIndex]] = [newSteps[targetIndex], newSteps[index]];
    
    // Update order numbers
    newSteps.forEach((step, idx) => {
      step.order = idx + 1;
    });

    setCampaign(prev => ({ ...prev, steps: newSteps }));
  };

  const handleSave = (status: 'draft' | 'active') => {
    if (!campaign.name.trim()) {
      toast.error('Please enter a campaign name');
      return;
    }
    if (!campaign.segmentId) {
      toast.error('Please select a target segment');
      return;
    }
    if (campaign.steps.length === 0) {
      toast.error('Please add at least one step');
      return;
    }

    onSave({ ...campaign, status });
    toast.success(status === 'draft' ? 'Campaign saved as draft' : 'Campaign activated!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2>{campaignId ? 'Edit Campaign' : 'Create New Campaign'}</h2>
          <p className="text-muted-foreground">
            Build automated email sequences to nurture candidates
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="outline" onClick={() => handleSave('draft')}>
            <Save className="w-4 h-4 mr-2" />
            Save Draft
          </Button>
          <Button onClick={() => handleSave('active')}>
            <Play className="w-4 h-4 mr-2" />
            Activate Campaign
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Campaign Settings */}
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Campaign Settings</CardTitle>
              <CardDescription>Basic campaign configuration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Campaign Name *</Label>
                <Input
                  id="name"
                  placeholder="e.g., New Candidate Welcome"
                  value={campaign.name}
                  onChange={(e) => setCampaign(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="What is this campaign for?"
                  value={campaign.description}
                  onChange={(e) => setCampaign(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="segment">Target Segment *</Label>
                <Select
                  value={campaign.segmentId}
                  onValueChange={(value) => setCampaign(prev => ({ ...prev, segmentId: value }))}
                >
                  <SelectTrigger id="segment">
                    <SelectValue placeholder="Select segment" />
                  </SelectTrigger>
                  <SelectContent>
                    {segments.map(segment => (
                      <SelectItem key={segment.id} value={segment.id}>
                        {segment.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="trigger">Enrollment Trigger</Label>
                <Select
                  value={campaign.triggerType}
                  onValueChange={(value: 'manual' | 'automatic') => 
                    setCampaign(prev => ({ ...prev, triggerType: value }))
                  }
                >
                  <SelectTrigger id="trigger">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manual">Manual (I'll enroll candidates)</SelectItem>
                    <SelectItem value="automatic">Automatic (Auto-enroll segment)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div>
                <Label>Use Template</Label>
                <Select
                  value={selectedTemplate}
                  onValueChange={(value) => {
                    setSelectedTemplate(value);
                    loadTemplate(value);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a template..." />
                  </SelectTrigger>
                  <SelectContent>
                    {templates.map(template => (
                      <SelectItem key={template.id} value={template.id}>
                        {template.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-1">
                  Start with a pre-built sequence
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Quick Add Step</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => addStep('email')}
              >
                <Mail className="w-4 h-4 mr-2 text-blue-600" />
                Add Email
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => addStep('delay')}
              >
                <Clock className="w-4 h-4 mr-2 text-orange-600" />
                Add Delay
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => addStep('condition')}
                disabled
              >
                <GitBranch className="w-4 h-4 mr-2 text-purple-600" />
                Add Condition
                <Badge variant="secondary" className="ml-auto text-xs">Pro</Badge>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Campaign Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Steps:</span>
                <span className="font-semibold">{campaign.steps.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Emails:</span>
                <span className="font-semibold">
                  {campaign.steps.filter(s => s.type === 'email').length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Duration:</span>
                <span className="font-semibold">
                  {campaign.steps
                    .filter(s => s.type === 'delay')
                    .reduce((sum, s) => {
                      const days = s.delayUnit === 'days' ? s.delayAmount! :
                                  s.delayUnit === 'weeks' ? s.delayAmount! * 7 :
                                  s.delayAmount! / 24;
                      return sum + days;
                    }, 0)} days
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Campaign Builder */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Campaign Workflow</CardTitle>
              <CardDescription>
                Build your sequence step by step
              </CardDescription>
            </CardHeader>
            <CardContent>
              {campaign.steps.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed rounded-lg">
                  <Mail className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="font-semibold mb-2">No steps yet</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Choose a template or add steps manually
                  </p>
                  <div className="flex gap-2 justify-center">
                    <Button onClick={() => addStep('email')}>
                      <Mail className="w-4 h-4 mr-2" />
                      Add First Email
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {campaign.steps.map((step, index) => (
                    <React.Fragment key={step.id}>
                      {index > 0 && (
                        <div className="flex justify-center">
                          <ArrowRight className="w-5 h-5 text-muted-foreground rotate-90" />
                        </div>
                      )}
                      <StepCard
                        step={step}
                        index={index}
                        totalSteps={campaign.steps.length}
                        onUpdate={(updates) => updateStep(step.id, updates)}
                        onRemove={() => removeStep(step.id)}
                        onMoveUp={() => moveStep(step.id, 'up')}
                        onMoveDown={() => moveStep(step.id, 'down')}
                      />
                    </React.Fragment>
                  ))}

                  <div className="pt-4 flex justify-center">
                    <Button variant="outline" onClick={() => addStep('email')}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Another Step
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function StepCard({
  step,
  index,
  totalSteps,
  onUpdate,
  onRemove,
  onMoveUp,
  onMoveDown
}: {
  step: CampaignStep;
  index: number;
  totalSteps: number;
  onUpdate: (updates: Partial<CampaignStep>) => void;
  onRemove: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}) {
  const [isExpanded, setIsExpanded] = useState(true);

  if (step.type === 'delay') {
    return (
      <div className="border rounded-lg p-4 bg-orange-50 border-orange-200">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-orange-600" />
            <span className="font-medium">Wait</span>
            <Badge variant="secondary">Step {index + 1}</Badge>
          </div>
          <div className="flex items-center gap-1">
            {index > 0 && (
              <Button variant="ghost" size="sm" onClick={onMoveUp}>
                <ChevronUp className="w-4 h-4" />
              </Button>
            )}
            {index < totalSteps - 1 && (
              <Button variant="ghost" size="sm" onClick={onMoveDown}>
                <ChevronDown className="w-4 h-4" />
              </Button>
            )}
            <Button variant="ghost" size="sm" onClick={onRemove}>
              <Trash2 className="w-4 h-4 text-red-600" />
            </Button>
          </div>
        </div>
        <div className="flex gap-2">
          <Input
            type="number"
            min="1"
            value={step.delayAmount}
            onChange={(e) => onUpdate({ delayAmount: parseInt(e.target.value) })}
            className="w-24"
          />
          <Select
            value={step.delayUnit}
            onValueChange={(value: 'hours' | 'days' | 'weeks') => onUpdate({ delayUnit: value })}
          >
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hours">Hours</SelectItem>
              <SelectItem value="days">Days</SelectItem>
              <SelectItem value="weeks">Weeks</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    );
  }

  if (step.type === 'email') {
    return (
      <div className="border rounded-lg overflow-hidden">
        <div 
          className="flex items-center justify-between p-4 bg-blue-50 border-b cursor-pointer hover:bg-blue-100 transition-colors"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-blue-600" />
            <span className="font-medium">Email</span>
            <Badge variant="secondary">Step {index + 1}</Badge>
            {step.emailSubject && (
              <span className="text-sm text-muted-foreground ml-2">
                {step.emailSubject.substring(0, 40)}
                {step.emailSubject.length > 40 && '...'}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1">
            {index > 0 && (
              <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); onMoveUp(); }}>
                <ChevronUp className="w-4 h-4" />
              </Button>
            )}
            {index < totalSteps - 1 && (
              <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); onMoveDown(); }}>
                <ChevronDown className="w-4 h-4" />
              </Button>
            )}
            <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); onRemove(); }}>
              <Trash2 className="w-4 h-4 text-red-600" />
            </Button>
            {isExpanded ? <ChevronUp className="w-4 h-4 ml-2" /> : <ChevronDown className="w-4 h-4 ml-2" />}
          </div>
        </div>

        {isExpanded && (
          <div className="p-4 space-y-4">
            <div>
              <Label>Subject Line *</Label>
              <Input
                placeholder="e.g., Welcome to [Company Name], {{firstName}}!"
                value={step.emailSubject}
                onChange={(e) => onUpdate({ emailSubject: e.target.value })}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Use {'{{firstName}}'}, {'{{lastName}}'}, {'{{role}}'} for personalization
              </p>
            </div>

            <div>
              <Label>Email Body *</Label>
              <Textarea
                placeholder="Hi {{firstName}},&#10;&#10;Welcome to our talent network! We're excited to connect..."
                value={step.emailBody}
                onChange={(e) => onUpdate({ emailBody: e.target.value })}
                rows={8}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Available tokens: {'{{firstName}}'}, {'{{lastName}}'}, {'{{role}}'}, {'{{skills}}'}, {'{{experience}}'}
              </p>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Eye className="w-3 h-3 mr-1" />
                Preview
              </Button>
              <Button variant="outline" size="sm">
                <Copy className="w-3 h-3 mr-1" />
                Use Template
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return null;
}

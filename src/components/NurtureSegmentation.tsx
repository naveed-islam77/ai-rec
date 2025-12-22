import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { 
  Users, 
  Plus, 
  Trash2, 
  Save, 
  Play,
  Filter,
  Eye,
  TrendingUp,
  MapPin,
  Briefcase,
  Star,
  Calendar,
  Mail,
  Target,
  Search
} from 'lucide-react';
import { toast } from 'sonner';

interface SegmentCondition {
  id: string;
  field: string;
  operator: string;
  value: string;
  logic?: 'AND' | 'OR';
}

interface Segment {
  id?: string;
  name: string;
  description: string;
  conditions: SegmentCondition[];
  candidateCount?: number;
  isDynamic: boolean;
  createdAt?: string;
}

interface NurtureSegmentationProps {
  onSave: (segment: Segment) => void;
  onCancel: () => void;
}

export default function NurtureSegmentation({
  onSave,
  onCancel
}: NurtureSegmentationProps) {
  const [segment, setSegment] = useState<Segment>({
    name: '',
    description: '',
    conditions: [],
    isDynamic: true
  });

  const [previewCount, setPreviewCount] = useState(0);

  const fieldOptions = [
    { value: 'skills', label: 'Skills', icon: Star },
    { value: 'experience', label: 'Years of Experience', icon: Briefcase },
    { value: 'location', label: 'Location', icon: MapPin },
    { value: 'role', label: 'Current Role', icon: Briefcase },
    { value: 'status', label: 'Status', icon: Users },
    { value: 'lastContact', label: 'Last Contact', icon: Calendar },
    { value: 'engagementScore', label: 'Engagement Score', icon: TrendingUp },
    { value: 'source', label: 'Source', icon: Target },
    { value: 'emailOpens', label: 'Email Opens (Last 30d)', icon: Mail },
    { value: 'dateAdded', label: 'Date Added', icon: Calendar },
    { value: 'appliedJobs', label: 'Applied Jobs', icon: Briefcase }
  ];

  const operatorOptions: Record<string, { value: string; label: string }[]> = {
    skills: [
      { value: 'contains', label: 'Contains' },
      { value: 'notContains', label: 'Does not contain' },
      { value: 'equals', label: 'Equals exactly' }
    ],
    experience: [
      { value: 'greaterThan', label: 'Greater than' },
      { value: 'lessThan', label: 'Less than' },
      { value: 'equals', label: 'Equals' },
      { value: 'between', label: 'Between' }
    ],
    location: [
      { value: 'equals', label: 'Equals' },
      { value: 'contains', label: 'Contains' },
      { value: 'notEquals', label: 'Not equals' }
    ],
    role: [
      { value: 'contains', label: 'Contains' },
      { value: 'equals', label: 'Equals' },
      { value: 'notContains', label: 'Does not contain' }
    ],
    status: [
      { value: 'equals', label: 'Is' },
      { value: 'notEquals', label: 'Is not' }
    ],
    lastContact: [
      { value: 'moreThan', label: 'More than X days ago' },
      { value: 'lessThan', label: 'Less than X days ago' },
      { value: 'between', label: 'Between X and Y days ago' }
    ],
    engagementScore: [
      { value: 'greaterThan', label: 'Greater than' },
      { value: 'lessThan', label: 'Less than' },
      { value: 'between', label: 'Between' }
    ],
    source: [
      { value: 'equals', label: 'Is' },
      { value: 'notEquals', label: 'Is not' }
    ],
    emailOpens: [
      { value: 'greaterThan', label: 'Greater than' },
      { value: 'lessThan', label: 'Less than' },
      { value: 'equals', label: 'Equals' }
    ],
    dateAdded: [
      { value: 'after', label: 'After' },
      { value: 'before', label: 'Before' },
      { value: 'between', label: 'Between' },
      { value: 'last', label: 'In the last X days' }
    ],
    appliedJobs: [
      { value: 'greaterThan', label: 'Greater than' },
      { value: 'lessThan', label: 'Less than' },
      { value: 'equals', label: 'Equals' }
    ]
  };

  const prebuiltSegments = [
    {
      name: 'Hot Leads (High Engagement)',
      description: 'Candidates with engagement score > 70',
      conditions: [
        { field: 'engagementScore', operator: 'greaterThan', value: '70' }
      ],
      count: 34
    },
    {
      name: 'Senior React Developers',
      description: 'React devs with 5+ years experience',
      conditions: [
        { field: 'skills', operator: 'contains', value: 'React', logic: 'AND' },
        { field: 'experience', operator: 'greaterThan', value: '5' }
      ],
      count: 28
    },
    {
      name: 'Inactive 90+ Days',
      description: 'No contact in the last 90 days',
      conditions: [
        { field: 'lastContact', operator: 'moreThan', value: '90' }
      ],
      count: 156
    },
    {
      name: 'New Candidates (Last 7 Days)',
      description: 'Recently added to talent pool',
      conditions: [
        { field: 'dateAdded', operator: 'last', value: '7' }
      ],
      count: 23
    },
    {
      name: 'Passive Candidates',
      description: 'Status is passive, not actively looking',
      conditions: [
        { field: 'status', operator: 'equals', value: 'passive' }
      ],
      count: 89
    },
    {
      name: 'NYC Tech Talent',
      description: 'Technical roles in New York City',
      conditions: [
        { field: 'location', operator: 'contains', value: 'New York', logic: 'AND' },
        { field: 'skills', operator: 'contains', value: 'JavaScript' }
      ],
      count: 45
    },
    {
      name: 'Email Engaged',
      description: 'Opened 3+ emails in last 30 days',
      conditions: [
        { field: 'emailOpens', operator: 'greaterThan', value: '3' }
      ],
      count: 67
    },
    {
      name: 'Applied to Jobs',
      description: 'Applied to at least 1 job',
      conditions: [
        { field: 'appliedJobs', operator: 'greaterThan', value: '0' }
      ],
      count: 112
    }
  ];

  const addCondition = () => {
    const newCondition: SegmentCondition = {
      id: Date.now().toString(),
      field: 'skills',
      operator: 'contains',
      value: '',
      logic: segment.conditions.length > 0 ? 'AND' : undefined
    };
    setSegment(prev => ({
      ...prev,
      conditions: [...prev.conditions, newCondition]
    }));
  };

  const removeCondition = (conditionId: string) => {
    setSegment(prev => ({
      ...prev,
      conditions: prev.conditions.filter(c => c.id !== conditionId)
    }));
  };

  const updateCondition = (conditionId: string, updates: Partial<SegmentCondition>) => {
    setSegment(prev => ({
      ...prev,
      conditions: prev.conditions.map(c => 
        c.id === conditionId ? { ...c, ...updates } : c
      )
    }));
  };

  const loadPrebuiltSegment = (prebuilt: any) => {
    const conditions = prebuilt.conditions.map((c: any, index: number) => ({
      id: Date.now().toString() + index,
      field: c.field,
      operator: c.operator,
      value: c.value,
      logic: c.logic
    }));

    setSegment({
      name: prebuilt.name,
      description: prebuilt.description,
      conditions,
      isDynamic: true
    });
    setPreviewCount(prebuilt.count);
    toast.success('Segment template loaded');
  };

  const calculatePreview = () => {
    // Simulate calculation
    const randomCount = Math.floor(Math.random() * 200) + 20;
    setPreviewCount(randomCount);
    toast.success(`Found ${randomCount} matching candidates`);
  };

  const handleSave = () => {
    if (!segment.name.trim()) {
      toast.error('Please enter a segment name');
      return;
    }
    if (segment.conditions.length === 0) {
      toast.error('Please add at least one condition');
      return;
    }

    onSave({ ...segment, candidateCount: previewCount });
    toast.success('Segment saved successfully');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="flex items-center gap-2">
            <Filter className="w-6 h-6 text-purple-600" />
            Create Segment
          </h2>
          <p className="text-muted-foreground">
            Build targeted audience segments for your campaigns
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            Save Segment
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Segment Builder */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Segment Details</CardTitle>
              <CardDescription>Name and describe your segment</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="segmentName">Segment Name *</Label>
                <Input
                  id="segmentName"
                  placeholder="e.g., Senior React Developers"
                  value={segment.name}
                  onChange={(e) => setSegment(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>

              <div>
                <Label htmlFor="segmentDescription">Description</Label>
                <Input
                  id="segmentDescription"
                  placeholder="What is this segment for?"
                  value={segment.description}
                  onChange={(e) => setSegment(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Segment Conditions</CardTitle>
                  <CardDescription>Define who should be included</CardDescription>
                </div>
                <Button onClick={addCondition} size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Condition
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {segment.conditions.length === 0 ? (
                <div className="text-center py-8 border-2 border-dashed rounded-lg">
                  <Filter className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
                  <h3 className="font-semibold mb-2">No conditions yet</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Add conditions to define your segment
                  </p>
                  <Button onClick={addCondition}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add First Condition
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {segment.conditions.map((condition, index) => (
                    <div key={condition.id}>
                      {index > 0 && condition.logic && (
                        <div className="flex items-center gap-2 my-2">
                          <Separator className="flex-1" />
                          <Select
                            value={condition.logic}
                            onValueChange={(value: 'AND' | 'OR') => 
                              updateCondition(condition.id, { logic: value })
                            }
                          >
                            <SelectTrigger className="w-20">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="AND">AND</SelectItem>
                              <SelectItem value="OR">OR</SelectItem>
                            </SelectContent>
                          </Select>
                          <Separator className="flex-1" />
                        </div>
                      )}
                      
                      <div className="border rounded-lg p-4 bg-accent/50">
                        <div className="grid grid-cols-12 gap-3">
                          <div className="col-span-4">
                            <Label className="text-xs">Field</Label>
                            <Select
                              value={condition.field}
                              onValueChange={(value) => updateCondition(condition.id, { field: value })}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {fieldOptions.map(option => (
                                  <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="col-span-3">
                            <Label className="text-xs">Operator</Label>
                            <Select
                              value={condition.operator}
                              onValueChange={(value) => updateCondition(condition.id, { operator: value })}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {(operatorOptions[condition.field] || []).map(option => (
                                  <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="col-span-4">
                            <Label className="text-xs">Value</Label>
                            <Input
                              placeholder="Enter value..."
                              value={condition.value}
                              onChange={(e) => updateCondition(condition.id, { value: e.target.value })}
                            />
                          </div>

                          <div className="col-span-1 flex items-end">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeCondition(condition.id)}
                            >
                              <Trash2 className="w-4 h-4 text-red-600" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {segment.conditions.length > 0 && (
                <div className="mt-4 pt-4 border-t">
                  <Button onClick={calculatePreview} className="w-full">
                    <Search className="w-4 h-4 mr-2" />
                    Preview Matching Candidates
                  </Button>
                  {previewCount > 0 && (
                    <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Users className="w-5 h-5 text-green-600" />
                        <span className="font-semibold text-green-900">
                          {previewCount} candidates match this segment
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Pre-built Segments */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Pre-built Segments</CardTitle>
              <CardDescription>Start with a template</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {prebuiltSegments.map((prebuilt, index) => (
                <div
                  key={index}
                  className="border rounded-lg p-3 hover:bg-accent/50 cursor-pointer transition-colors"
                  onClick={() => loadPrebuiltSegment(prebuilt)}
                >
                  <div className="flex items-start justify-between mb-1">
                    <h4 className="font-medium text-sm">{prebuilt.name}</h4>
                    <Badge variant="secondary" className="text-xs">
                      {prebuilt.count}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {prebuilt.description}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="text-sm">Segment Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex gap-2">
                <Target className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Be specific</p>
                  <p className="text-xs text-muted-foreground">
                    Narrow segments perform better than broad ones
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <TrendingUp className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Use dynamic segments</p>
                  <p className="text-xs text-muted-foreground">
                    They auto-update as candidates change
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Users className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Test segment size</p>
                  <p className="text-xs text-muted-foreground">
                    Aim for 20-200 candidates per campaign
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

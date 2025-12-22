import { useState, useRef, useEffect } from 'react';
import { Users, Briefcase, TrendingUp, CheckCircle, Clock, XCircle, Sparkles, Settings, Plus, Trash2, Eye, EyeOff, GripVertical, BarChart3, PieChart as PieChartIcon, LineChart as LineChartIcon, Activity, Brain, Target, TrendingDown, AlertCircle, MessageSquare, ChevronDown, ChevronRight, Maximize2, Minimize2, Edit, Save, X, Zap, Filter, Calendar as CalendarIcon, Search, Building2 } from 'lucide-react';
import { MarketIntelligence } from './MarketIntelligence';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import { toast } from 'sonner@2.0.3';
import { Switch } from './ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';

interface DashboardProps {
  onNavigate?: (view: 'jobs' | 'candidates') => void;
}

interface DashletFilter {
  id: string;
  label: string;
  type: 'select' | 'daterange' | 'multiselect' | 'search';
  options?: Array<{ value: string; label: string }>;
  value: any;
  aiSuggested?: boolean;
}

interface Dashlet {
  id: string;
  type: 'stat' | 'chart' | 'insight' | 'prediction' | 'activity' | 'custom';
  title: string;
  description?: string;
  enabled: boolean;
  position: { x: number; y: number };
  size: 'small' | 'medium' | 'large' | 'full';
  config?: any;
  aiGenerated?: boolean;
  filters?: DashletFilter[];
  activeFilters?: Record<string, any>;
}

const defaultDashlets: Dashlet[] = [
  {
    id: 'stat-1',
    type: 'stat',
    title: 'Total Candidates',
    enabled: true,
    position: { x: 0, y: 0 },
    size: 'small',
    config: { value: '1,284', change: '+12%', icon: 'Users', color: 'blue' },
    filters: [
      {
        id: 'status',
        label: 'Status',
        type: 'multiselect',
        options: [
          { value: 'all', label: 'All Statuses' },
          { value: 'screening', label: 'Screening' },
          { value: 'interviewing', label: 'Interviewing' },
          { value: 'offered', label: 'Offer Extended' }
        ],
        value: ['all']
      },
      {
        id: 'dateRange',
        label: 'Date Range',
        type: 'select',
        options: [
          { value: 'today', label: 'Today' },
          { value: 'week', label: 'This Week' },
          { value: 'month', label: 'This Month' },
          { value: 'quarter', label: 'This Quarter' }
        ],
        value: 'month'
      }
    ],
    activeFilters: { status: ['all'], dateRange: 'month' }
  },
  {
    id: 'stat-2',
    type: 'stat',
    title: 'Open Positions',
    enabled: true,
    position: { x: 1, y: 0 },
    size: 'small',
    config: { value: '34', change: '+3', icon: 'Briefcase', color: 'purple' },
    filters: [
      {
        id: 'department',
        label: 'Department',
        type: 'select',
        options: [
          { value: 'all', label: 'All Departments' },
          { value: 'engineering', label: 'Engineering' },
          { value: 'sales', label: 'Sales' },
          { value: 'marketing', label: 'Marketing' }
        ],
        value: 'all'
      },
      {
        id: 'priority',
        label: 'Priority',
        type: 'select',
        options: [
          { value: 'all', label: 'All Priorities' },
          { value: 'high', label: 'High' },
          { value: 'medium', label: 'Medium' },
          { value: 'low', label: 'Low' }
        ],
        value: 'all'
      }
    ],
    activeFilters: { department: 'all', priority: 'all' }
  },
  {
    id: 'stat-3',
    type: 'stat',
    title: 'Interviews Scheduled',
    enabled: true,
    position: { x: 2, y: 0 },
    size: 'small',
    config: { value: '52', change: '+8', icon: 'Clock', color: 'orange' },
    filters: [
      {
        id: 'timeframe',
        label: 'Timeframe',
        type: 'select',
        options: [
          { value: 'upcoming', label: 'Upcoming' },
          { value: 'today', label: 'Today' },
          { value: 'week', label: 'This Week' },
          { value: 'month', label: 'This Month' }
        ],
        value: 'week'
      }
    ],
    activeFilters: { timeframe: 'week' }
  },
  {
    id: 'stat-4',
    type: 'stat',
    title: 'Placements This Month',
    enabled: true,
    position: { x: 3, y: 0 },
    size: 'small',
    config: { value: '18', change: '+5', icon: 'CheckCircle', color: 'green' },
    filters: [
      {
        id: 'client',
        label: 'Client',
        type: 'select',
        options: [
          { value: 'all', label: 'All Clients' },
          { value: 'techcorp', label: 'TechCorp' },
          { value: 'startupxyz', label: 'StartupXYZ' },
          { value: 'enterprise', label: 'Enterprise Co' }
        ],
        value: 'all'
      }
    ],
    activeFilters: { client: 'all' }
  },
  {
    id: 'chart-1',
    type: 'chart',
    title: 'Applications & Placements Trend',
    enabled: true,
    position: { x: 0, y: 1 },
    size: 'medium',
    config: { chartType: 'line' },
    filters: [
      {
        id: 'period',
        label: 'Period',
        type: 'select',
        options: [
          { value: '6months', label: 'Last 6 Months' },
          { value: '3months', label: 'Last 3 Months' },
          { value: 'year', label: 'Last Year' }
        ],
        value: '6months'
      },
      {
        id: 'position',
        label: 'Position',
        type: 'select',
        options: [
          { value: 'all', label: 'All Positions' },
          { value: 'developer', label: 'Developers' },
          { value: 'designer', label: 'Designers' },
          { value: 'manager', label: 'Managers' }
        ],
        value: 'all'
      }
    ],
    activeFilters: { period: '6months', position: 'all' }
  },
  {
    id: 'chart-2',
    type: 'chart',
    title: 'Candidates by Status',
    enabled: true,
    position: { x: 2, y: 1 },
    size: 'medium',
    config: { chartType: 'pie' },
    filters: [
      {
        id: 'source',
        label: 'Source',
        type: 'select',
        options: [
          { value: 'all', label: 'All Sources' },
          { value: 'linkedin', label: 'LinkedIn' },
          { value: 'referral', label: 'Referrals' },
          { value: 'jobboard', label: 'Job Boards' }
        ],
        value: 'all'
      }
    ],
    activeFilters: { source: 'all' }
  },
  {
    id: 'chart-3',
    type: 'chart',
    title: 'AI Match Score Distribution',
    enabled: true,
    position: { x: 0, y: 2 },
    size: 'medium',
    config: { chartType: 'bar' },
    filters: [
      {
        id: 'job',
        label: 'Job Opening',
        type: 'select',
        options: [
          { value: 'all', label: 'All Jobs' },
          { value: 'senior-dev', label: 'Senior Developer' },
          { value: 'product-mgr', label: 'Product Manager' },
          { value: 'designer', label: 'UX Designer' }
        ],
        value: 'all'
      },
      {
        id: 'minScore',
        label: 'Min Score',
        type: 'select',
        options: [
          { value: '0', label: 'All Scores' },
          { value: '60', label: '60+' },
          { value: '70', label: '70+' },
          { value: '80', label: '80+' }
        ],
        value: '0'
      }
    ],
    activeFilters: { job: 'all', minScore: '0' }
  },
  {
    id: 'insight-1',
    type: 'insight',
    title: 'AI Insights & Recommendations',
    description: 'Real-time AI-powered recruitment insights',
    enabled: true,
    position: { x: 2, y: 2 },
    size: 'medium',
    filters: [
      {
        id: 'category',
        label: 'Category',
        type: 'multiselect',
        options: [
          { value: 'all', label: 'All Insights' },
          { value: 'candidates', label: 'Candidates' },
          { value: 'scheduling', label: 'Scheduling' },
          { value: 'skills', label: 'Skills Gap' }
        ],
        value: ['all']
      },
      {
        id: 'priority',
        label: 'Priority',
        type: 'select',
        options: [
          { value: 'all', label: 'All' },
          { value: 'high', label: 'High Priority' },
          { value: 'medium', label: 'Medium' }
        ],
        value: 'all'
      }
    ],
    activeFilters: { category: ['all'], priority: 'all' }
  },
  {
    id: 'prediction-1',
    type: 'prediction',
    title: 'Predictive Analytics',
    description: 'AI forecasts for next 30 days',
    enabled: true,
    position: { x: 0, y: 3 },
    size: 'medium',
    filters: [
      {
        id: 'metric',
        label: 'Metric',
        type: 'select',
        options: [
          { value: 'applications', label: 'Applications' },
          { value: 'placements', label: 'Placements' },
          { value: 'interviews', label: 'Interviews' }
        ],
        value: 'applications'
      },
      {
        id: 'confidence',
        label: 'Min Confidence',
        type: 'select',
        options: [
          { value: '0', label: 'All Predictions' },
          { value: '70', label: '70%+' },
          { value: '80', label: '80%+' }
        ],
        value: '0'
      }
    ],
    activeFilters: { metric: 'applications', confidence: '0' }
  },
  {
    id: 'activity-1',
    type: 'activity',
    title: 'Recent Activity',
    enabled: true,
    position: { x: 2, y: 3 },
    size: 'medium',
    filters: [
      {
        id: 'activityType',
        label: 'Activity Type',
        type: 'multiselect',
        options: [
          { value: 'all', label: 'All Activities' },
          { value: 'candidates', label: 'Candidates' },
          { value: 'interviews', label: 'Interviews' },
          { value: 'jobs', label: 'Jobs' },
          { value: 'ai', label: 'AI Actions' }
        ],
        value: ['all']
      },
      {
        id: 'timeRange',
        label: 'Time Range',
        type: 'select',
        options: [
          { value: 'hour', label: 'Last Hour' },
          { value: 'day', label: 'Last 24 Hours' },
          { value: 'week', label: 'Last Week' }
        ],
        value: 'day'
      }
    ],
    activeFilters: { activityType: ['all'], timeRange: 'day' }
  }
];

export function Dashboard({ onNavigate }: DashboardProps) {
  const [dashlets, setDashlets] = useState<Dashlet[]>(defaultDashlets);
  const [showSettings, setShowSettings] = useState(false);
  const [showAICreator, setShowAICreator] = useState(false);
  const [aiPrompt, setAIPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [draggedDashlet, setDraggedDashlet] = useState<string | null>(null);
  const [editingDashlet, setEditingDashlet] = useState<string | null>(null);
  const [expandedDashlets, setExpandedDashlets] = useState<Set<string>>(new Set());
  const [showAIAssistant, setShowAIAssistant] = useState(true);
  const [filterPopoverOpen, setFilterPopoverOpen] = useState<Record<string, boolean>>({});

  // Mock data
  const applicationsByMonth = [
    { month: 'Jan', applications: 245, placements: 12, predictions: 250 },
    { month: 'Feb', applications: 312, placements: 15, predictions: 320 },
    { month: 'Mar', applications: 289, placements: 14, predictions: 295 },
    { month: 'Apr', applications: 398, placements: 18, predictions: 405 },
    { month: 'May', applications: 445, placements: 22, predictions: 455 },
    { month: 'Jun', applications: 512, placements: 25, predictions: 525 },
    { month: 'Jul (Predicted)', applications: null, placements: null, predictions: 580 }
  ];

  const candidatesByStatus = [
    { name: 'Screening', value: 342, color: '#3b82f6' },
    { name: 'Interviewing', value: 156, color: '#8b5cf6' },
    { name: 'Offer Extended', value: 68, color: '#f59e0b' },
    { name: 'Hired', value: 98, color: '#10b981' },
    { name: 'Rejected', value: 234, color: '#ef4444' }
  ];

  const aiMatchingData = [
    { score: '90-100', count: 45 },
    { score: '80-89', count: 124 },
    { score: '70-79', count: 256 },
    { score: '60-69', count: 178 },
    { score: '<60', count: 89 }
  ];

  const skillsRadarData = [
    { skill: 'React', current: 85, required: 90 },
    { skill: 'Node.js', current: 78, required: 80 },
    { skill: 'Python', current: 65, required: 85 },
    { skill: 'AWS', current: 72, required: 75 },
    { skill: 'TypeScript', current: 88, required: 85 }
  ];

  const handleDragStart = (dashletId: string) => {
    setDraggedDashlet(dashletId);
  };

  const handleDragEnd = () => {
    setDraggedDashlet(null);
  };

  const handleDrop = (targetId: string) => {
    if (!draggedDashlet || draggedDashlet === targetId) return;

    const draggedIndex = dashlets.findIndex(d => d.id === draggedDashlet);
    const targetIndex = dashlets.findIndex(d => d.id === targetId);

    const newDashlets = [...dashlets];
    const draggedItem = newDashlets[draggedIndex];
    const targetItem = newDashlets[targetIndex];

    // Swap positions
    const tempPosition = draggedItem.position;
    draggedItem.position = targetItem.position;
    targetItem.position = tempPosition;

    setDashlets(newDashlets);
    toast.success('Dashboard layout updated');
  };

  const toggleDashlet = (id: string) => {
    setDashlets(dashlets.map(d => 
      d.id === id ? { ...d, enabled: !d.enabled } : d
    ));
  };

  const removeDashlet = (id: string) => {
    setDashlets(dashlets.filter(d => d.id !== id));
    toast.success('Dashlet removed');
  };

  const handleAIGenerate = async () => {
    if (!aiPrompt.trim()) {
      toast.error('Please describe what you want to see');
      return;
    }

    setIsGenerating(true);

    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Generate dashlet based on prompt
    const suggestedFilters = generateFiltersFromPrompt(aiPrompt);
    const initialActiveFilters: Record<string, any> = {};
    suggestedFilters.forEach(filter => {
      initialActiveFilters[filter.id] = filter.value;
    });

    const newDashlet: Dashlet = {
      id: `custom-${Date.now()}`,
      type: 'custom',
      title: aiPrompt.slice(0, 50) + (aiPrompt.length > 50 ? '...' : ''),
      description: 'AI-generated dashlet with smart filters',
      enabled: true,
      position: { x: 0, y: dashlets.length },
      size: 'medium',
      aiGenerated: true,
      config: {
        prompt: aiPrompt,
        data: generateMockDataFromPrompt(aiPrompt)
      },
      filters: suggestedFilters,
      activeFilters: initialActiveFilters
    };

    setDashlets([...dashlets, newDashlet]);
    setIsGenerating(false);
    setShowAICreator(false);
    setAIPrompt('');
    
    const filterCount = suggestedFilters.length;
    if (filterCount > 0) {
      toast.success(`AI dashlet created with ${filterCount} smart filter${filterCount > 1 ? 's' : ''}!`);
    } else {
      toast.success('AI dashlet created successfully!');
    }
  };

  const generateFiltersFromPrompt = (prompt: string): DashletFilter[] => {
    const lower = prompt.toLowerCase();
    const filters: DashletFilter[] = [];

    // AI suggests relevant filters based on prompt keywords
    if (lower.includes('skill') || lower.includes('technology')) {
      filters.push(
        {
          id: 'skillLevel',
          label: 'Skill Level',
          type: 'select',
          options: [
            { value: 'all', label: 'All Levels' },
            { value: 'expert', label: 'Expert' },
            { value: 'advanced', label: 'Advanced' },
            { value: 'intermediate', label: 'Intermediate' }
          ],
          value: 'all',
          aiSuggested: true
        },
        {
          id: 'department',
          label: 'Department',
          type: 'select',
          options: [
            { value: 'all', label: 'All Departments' },
            { value: 'engineering', label: 'Engineering' },
            { value: 'product', label: 'Product' },
            { value: 'design', label: 'Design' }
          ],
          value: 'all',
          aiSuggested: true
        }
      );
    }

    if (lower.includes('time') || lower.includes('hire') || lower.includes('fill')) {
      filters.push(
        {
          id: 'position',
          label: 'Position Type',
          type: 'select',
          options: [
            { value: 'all', label: 'All Positions' },
            { value: 'engineering', label: 'Engineering' },
            { value: 'sales', label: 'Sales' },
            { value: 'marketing', label: 'Marketing' }
          ],
          value: 'all',
          aiSuggested: true
        },
        {
          id: 'seniority',
          label: 'Seniority',
          type: 'select',
          options: [
            { value: 'all', label: 'All Levels' },
            { value: 'senior', label: 'Senior' },
            { value: 'mid', label: 'Mid-level' },
            { value: 'junior', label: 'Junior' }
          ],
          value: 'all',
          aiSuggested: true
        }
      );
    }

    if (lower.includes('source') || lower.includes('channel')) {
      filters.push(
        {
          id: 'timeRange',
          label: 'Time Range',
          type: 'select',
          options: [
            { value: 'month', label: 'This Month' },
            { value: 'quarter', label: 'This Quarter' },
            { value: 'year', label: 'This Year' }
          ],
          value: 'month',
          aiSuggested: true
        }
      );
    }

    if (lower.includes('candidate') || lower.includes('applicant')) {
      filters.push(
        {
          id: 'status',
          label: 'Status',
          type: 'multiselect',
          options: [
            { value: 'all', label: 'All Statuses' },
            { value: 'screening', label: 'Screening' },
            { value: 'interviewing', label: 'Interviewing' },
            { value: 'offered', label: 'Offered' }
          ],
          value: ['all'],
          aiSuggested: true
        }
      );
    }

    // Always add a date range filter
    if (filters.length > 0) {
      filters.push({
        id: 'dateRange',
        label: 'Date Range',
        type: 'select',
        options: [
          { value: 'week', label: 'Last 7 Days' },
          { value: 'month', label: 'Last 30 Days' },
          { value: 'quarter', label: 'Last 90 Days' }
        ],
        value: 'month',
        aiSuggested: true
      });
    }

    return filters;
  };

  const generateMockDataFromPrompt = (prompt: string) => {
    // Simple logic to generate different data based on keywords
    const lower = prompt.toLowerCase();
    
    if (lower.includes('skill') || lower.includes('technology')) {
      return {
        type: 'skills',
        data: [
          { name: 'React', value: 156 },
          { name: 'Python', value: 98 },
          { name: 'AWS', value: 142 },
          { name: 'Node.js', value: 134 }
        ]
      };
    } else if (lower.includes('time') || lower.includes('hire') || lower.includes('fill')) {
      return {
        type: 'metric',
        value: '24.5 days',
        trend: 'down',
        change: '-3.2 days',
        description: 'Average time to hire'
      };
    } else if (lower.includes('source') || lower.includes('channel')) {
      return {
        type: 'sources',
        data: [
          { name: 'LinkedIn', value: 342 },
          { name: 'Referrals', value: 156 },
          { name: 'Job Boards', value: 98 },
          { name: 'Direct', value: 67 }
        ]
      };
    } else {
      return {
        type: 'trend',
        data: Array.from({ length: 6 }, (_, i) => ({
          month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][i],
          value: Math.floor(Math.random() * 100) + 50
        }))
      };
    }
  };

  const toggleExpand = (id: string) => {
    const newExpanded = new Set(expandedDashlets);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedDashlets(newExpanded);
  };

  const updateFilter = (dashletId: string, filterId: string, value: any) => {
    setDashlets(dashlets.map(d => {
      if (d.id === dashletId) {
        return {
          ...d,
          activeFilters: {
            ...d.activeFilters,
            [filterId]: value
          }
        };
      }
      return d;
    }));
  };

  const clearFilters = (dashletId: string) => {
    setDashlets(dashlets.map(d => {
      if (d.id === dashletId && d.filters) {
        const resetFilters: Record<string, any> = {};
        d.filters.forEach(filter => {
          resetFilters[filter.id] = filter.type === 'multiselect' ? ['all'] : filter.options?.[0]?.value || '';
        });
        return {
          ...d,
          activeFilters: resetFilters
        };
      }
      return d;
    }));
    toast.success('Filters cleared');
  };

  const getActiveFilterCount = (dashlet: Dashlet) => {
    if (!dashlet.filters || !dashlet.activeFilters) return 0;
    
    let count = 0;
    dashlet.filters.forEach(filter => {
      const value = dashlet.activeFilters?.[filter.id];
      if (filter.type === 'multiselect') {
        if (value && value.length > 0 && !value.includes('all')) {
          count++;
        }
      } else {
        if (value && value !== 'all' && value !== filter.options?.[0]?.value) {
          count++;
        }
      }
    });
    return count;
  };

  const getSizeClass = (size: string, isExpanded: boolean) => {
    if (isExpanded) return 'col-span-4';
    switch (size) {
      case 'small': return 'col-span-1';
      case 'medium': return 'col-span-2';
      case 'large': return 'col-span-3';
      case 'full': return 'col-span-4';
      default: return 'col-span-2';
    }
  };

  const getIconComponent = (iconName: string) => {
    const icons: any = {
      Users, Briefcase, Clock, CheckCircle, TrendingUp, TrendingDown,
      Target, Brain, Activity, AlertCircle
    };
    return icons[iconName] || Users;
  };

  const renderDashlet = (dashlet: Dashlet) => {
    if (!dashlet.enabled) return null;

    const isExpanded = expandedDashlets.has(dashlet.id);
    const Icon = dashlet.config?.icon ? getIconComponent(dashlet.config.icon) : Sparkles;

    return (
      <Card
        key={dashlet.id}
        className={`${getSizeClass(dashlet.size, isExpanded)} ${
          draggedDashlet === dashlet.id ? 'opacity-50' : ''
        } transition-all duration-200 hover:shadow-lg relative group`}
        draggable
        onDragStart={() => handleDragStart(dashlet.id)}
        onDragEnd={handleDragEnd}
        onDragOver={(e) => e.preventDefault()}
        onDrop={() => handleDrop(dashlet.id)}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-2 flex-1">
              <GripVertical className="w-4 h-4 text-gray-400 mt-1 cursor-move opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex-1">
                <CardTitle className="flex items-center gap-2 text-base">
                  {dashlet.type === 'stat' && <Icon className={`w-5 h-5 text-${dashlet.config?.color}-600`} />}
                  {dashlet.aiGenerated && <Sparkles className="w-4 h-4 text-purple-600" />}
                  {dashlet.title}
                </CardTitle>
                {dashlet.description && (
                  <CardDescription className="text-xs mt-1">{dashlet.description}</CardDescription>
                )}
              </div>
            </div>
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="ghost"
                size="sm"
                className="h-7 w-7 p-0"
                onClick={() => toggleExpand(dashlet.id)}
              >
                {isExpanded ? <Minimize2 className="w-3 h-3" /> : <Maximize2 className="w-3 h-3" />}
              </Button>
              {dashlet.aiGenerated && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 w-7 p-0"
                  onClick={() => removeDashlet(dashlet.id)}
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              )}
            </div>
          </div>
          
          {/* Filter Section */}
          {dashlet.filters && dashlet.filters.length > 0 && (
            <div className="mt-3 flex items-center gap-2 flex-wrap">
              <Popover 
                open={filterPopoverOpen[dashlet.id]} 
                onOpenChange={(open) => setFilterPopoverOpen({ ...filterPopoverOpen, [dashlet.id]: open })}
              >
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="h-7 gap-1.5">
                    <Filter className="w-3 h-3" />
                    Filters
                    {getActiveFilterCount(dashlet) > 0 && (
                      <Badge variant="secondary" className="ml-1 h-4 w-4 p-0 flex items-center justify-center rounded-full bg-purple-100 text-purple-700 text-xs">
                        {getActiveFilterCount(dashlet)}
                      </Badge>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80" align="start">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm">Filters</h4>
                      {getActiveFilterCount(dashlet) > 0 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => clearFilters(dashlet.id)}
                          className="h-6 text-xs"
                        >
                          Clear all
                        </Button>
                      )}
                    </div>
                    <Separator />
                    <div className="space-y-3 max-h-[300px] overflow-y-auto">
                      {dashlet.filters.map(filter => (
                        <div key={filter.id} className="space-y-2">
                          <Label className="text-xs flex items-center gap-1.5">
                            {filter.label}
                            {filter.aiSuggested && (
                              <Badge variant="secondary" className="bg-purple-100 text-purple-700 text-xs h-4 px-1">
                                <Sparkles className="w-2.5 h-2.5 mr-0.5" />
                                AI
                              </Badge>
                            )}
                          </Label>
                          
                          {filter.type === 'select' && (
                            <Select
                              value={dashlet.activeFilters?.[filter.id] || filter.value}
                              onValueChange={(value) => updateFilter(dashlet.id, filter.id, value)}
                            >
                              <SelectTrigger className="h-8 text-xs">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {filter.options?.map(option => (
                                  <SelectItem key={option.value} value={option.value} className="text-xs">
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                          
                          {filter.type === 'multiselect' && (
                            <div className="space-y-2 border rounded-md p-2 max-h-32 overflow-y-auto">
                              {filter.options?.map(option => {
                                const currentValue = dashlet.activeFilters?.[filter.id] || filter.value;
                                const isChecked = Array.isArray(currentValue) && currentValue.includes(option.value);
                                
                                return (
                                  <div key={option.value} className="flex items-center gap-2">
                                    <Checkbox
                                      id={`${dashlet.id}-${filter.id}-${option.value}`}
                                      checked={isChecked}
                                      onCheckedChange={(checked) => {
                                        let newValue = Array.isArray(currentValue) ? [...currentValue] : [];
                                        if (option.value === 'all') {
                                          newValue = checked ? ['all'] : [];
                                        } else {
                                          if (checked) {
                                            newValue = newValue.filter(v => v !== 'all');
                                            newValue.push(option.value);
                                          } else {
                                            newValue = newValue.filter(v => v !== option.value);
                                            if (newValue.length === 0) newValue = ['all'];
                                          }
                                        }
                                        updateFilter(dashlet.id, filter.id, newValue);
                                      }}
                                    />
                                    <Label
                                      htmlFor={`${dashlet.id}-${filter.id}-${option.value}`}
                                      className="text-xs cursor-pointer"
                                    >
                                      {option.label}
                                    </Label>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                          
                          {filter.type === 'search' && (
                            <Input
                              placeholder="Search..."
                              value={dashlet.activeFilters?.[filter.id] || ''}
                              onChange={(e) => updateFilter(dashlet.id, filter.id, e.target.value)}
                              className="h-8 text-xs"
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
              
              {/* Active Filter Badges */}
              {dashlet.filters.map(filter => {
                const value = dashlet.activeFilters?.[filter.id];
                if (!value) return null;
                
                if (filter.type === 'multiselect') {
                  if (Array.isArray(value) && value.length > 0 && !value.includes('all')) {
                    return value.map(v => {
                      const option = filter.options?.find(o => o.value === v);
                      return option ? (
                        <Badge key={`${filter.id}-${v}`} variant="secondary" className="h-6 text-xs gap-1">
                          {filter.label}: {option.label}
                          <X 
                            className="w-3 h-3 cursor-pointer hover:text-red-600" 
                            onClick={() => {
                              const newValue = value.filter((val: string) => val !== v);
                              updateFilter(dashlet.id, filter.id, newValue.length > 0 ? newValue : ['all']);
                            }}
                          />
                        </Badge>
                      ) : null;
                    });
                  }
                } else {
                  if (value !== 'all' && value !== filter.options?.[0]?.value) {
                    const option = filter.options?.find(o => o.value === value);
                    return option ? (
                      <Badge key={filter.id} variant="secondary" className="h-6 text-xs gap-1">
                        {filter.label}: {option.label}
                        <X 
                          className="w-3 h-3 cursor-pointer hover:text-red-600" 
                          onClick={() => updateFilter(dashlet.id, filter.id, 'all')}
                        />
                      </Badge>
                    ) : null;
                  }
                }
                return null;
              })}
            </div>
          )}
        </CardHeader>
        <CardContent>
          {dashlet.type === 'stat' && (
            <div>
              <p className="text-3xl mb-1">{dashlet.config.value}</p>
              <p className="text-green-600 text-sm">{dashlet.config.change} from last month</p>
            </div>
          )}

          {dashlet.type === 'chart' && dashlet.config.chartType === 'line' && (
            <ResponsiveContainer width="100%" height={isExpanded ? 400 : 250}>
              <LineChart data={applicationsByMonth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="applications" stroke="#3b82f6" strokeWidth={2} name="Applications" />
                <Line type="monotone" dataKey="placements" stroke="#10b981" strokeWidth={2} name="Placements" />
                <Line 
                  type="monotone" 
                  dataKey="predictions" 
                  stroke="#8b5cf6" 
                  strokeWidth={2} 
                  strokeDasharray="5 5" 
                  name="AI Prediction" 
                />
              </LineChart>
            </ResponsiveContainer>
          )}

          {dashlet.type === 'chart' && dashlet.config.chartType === 'pie' && (
            <ResponsiveContainer width="100%" height={isExpanded ? 400 : 250}>
              <PieChart>
                <Pie
                  data={candidatesByStatus}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={isExpanded ? 120 : 80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {candidatesByStatus.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          )}

          {dashlet.type === 'chart' && dashlet.config.chartType === 'bar' && (
            <ResponsiveContainer width="100%" height={isExpanded ? 400 : 250}>
              <BarChart data={aiMatchingData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="score" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8b5cf6" name="Candidates" />
              </BarChart>
            </ResponsiveContainer>
          )}

          {dashlet.type === 'insight' && (
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                <Brain className="text-blue-600 w-5 h-5 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm">High-quality candidate surge detected</p>
                  <p className="text-xs text-gray-600 mt-1">15 candidates with 85+ match score in the last 24 hours</p>
                  <Button size="sm" variant="outline" className="mt-2" onClick={() => onNavigate?.('candidates')}>
                    View Candidates
                  </Button>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                <Target className="text-green-600 w-5 h-5 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm">Optimal interview scheduling window</p>
                  <p className="text-xs text-gray-600 mt-1">Tuesday-Thursday, 10 AM - 3 PM shows 40% higher acceptance</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                <AlertCircle className="text-purple-600 w-5 h-5 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm">Skill gap analysis complete</p>
                  <p className="text-xs text-gray-600 mt-1">Top requested: React, Python, AWS</p>
                  <Button size="sm" variant="outline" className="mt-2" onClick={() => onNavigate?.('jobs')}>
                    View Positions
                  </Button>
                </div>
              </div>
            </div>
          )}

          {dashlet.type === 'prediction' && (
            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Brain className="w-5 h-5 text-purple-600" />
                  <p className="text-sm">AI Forecast - Next 30 Days</p>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-3">
                  <div>
                    <p className="text-xs text-gray-600">Expected Applications</p>
                    <p className="text-xl text-purple-600">580</p>
                    <p className="text-xs text-green-600">+13% vs last month</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Predicted Placements</p>
                    <p className="text-xl text-purple-600">28</p>
                    <p className="text-xs text-green-600">+56% vs last month</p>
                  </div>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={150}>
                <AreaChart data={applicationsByMonth.slice(0, -1)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="applications" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-600">Prediction Confidence</span>
                  <Badge variant="secondary" className="bg-green-100 text-green-700">87%</Badge>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-600">Trending Skills</span>
                  <span>React, Python, DevOps</span>
                </div>
              </div>
            </div>
          )}

          {dashlet.type === 'activity' && (
            <ScrollArea className="h-64">
              <div className="space-y-3">
                {[
                  { icon: Users, color: 'blue', text: 'Sarah Johnson added to Senior Developer pipeline', time: '5 min ago' },
                  { icon: CheckCircle, color: 'green', text: 'Interview scheduled with Michael Chen', time: '12 min ago' },
                  { icon: Briefcase, color: 'purple', text: 'New position posted: Product Manager', time: '1 hour ago' },
                  { icon: TrendingUp, color: 'orange', text: 'AI identified 8 high-match candidates', time: '2 hours ago' },
                  { icon: Clock, color: 'gray', text: 'Email campaign sent to 45 candidates', time: '3 hours ago' }
                ].map((activity, idx) => (
                  <div key={idx} className="flex items-start gap-3 pb-3 border-b last:border-0">
                    <activity.icon className={`w-4 h-4 text-${activity.color}-600 mt-0.5`} />
                    <div className="flex-1">
                      <p className="text-sm">{activity.text}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}

          {dashlet.type === 'custom' && dashlet.config?.data && (
            <div>
              {dashlet.config.data.type === 'metric' && (
                <div className="text-center p-4">
                  <p className="text-4xl mb-2">{dashlet.config.data.value}</p>
                  <p className={`text-sm ${dashlet.config.data.trend === 'down' ? 'text-green-600' : 'text-red-600'}`}>
                    {dashlet.config.data.change}
                  </p>
                  <p className="text-xs text-gray-600 mt-2">{dashlet.config.data.description}</p>
                </div>
              )}
              {(dashlet.config.data.type === 'skills' || dashlet.config.data.type === 'sources') && (
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={dashlet.config.data.data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#8b5cf6" />
                  </BarChart>
                </ResponsiveContainer>
              )}
              {dashlet.config.data.type === 'trend' && (
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={dashlet.config.data.data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#8b5cf6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  const sortedDashlets = [...dashlets].sort((a, b) => {
    if (a.position.y !== b.position.y) return a.position.y - b.position.y;
    return a.position.x - b.position.x;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-purple-600" />
            AI-Powered Dashboard
          </h1>
          <p className="text-gray-600 mt-2">Intelligent insights and customizable analytics for your recruitment pipeline</p>
        </div>
      </div>

      {/* Main Tabs */}
      <Tabs defaultValue="analytics" className="space-y-6">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="analytics" className="gap-2">
              <BarChart3 className="w-4 h-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="market-intelligence" className="gap-2">
              <Building2 className="w-4 h-4" />
              Market Intelligence
            </TabsTrigger>
          </TabsList>
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setShowAICreator(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add AI Dashlet
            </Button>
            <Button variant="outline" onClick={() => setShowSettings(true)}>
              <Settings className="w-4 h-4 mr-2" />
              Customize
            </Button>
          </div>
        </div>

        <TabsContent value="analytics" className="space-y-6 mt-0">

      {/* AI Assistant Card */}
      {showAIAssistant && (
        <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white rounded-lg">
                <Brain className="w-6 h-6 text-purple-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-base mb-1">AI Dashboard Assistant</h3>
                    <p className="text-sm text-gray-600">
                      I can help you create custom dashlets, analyze trends, and provide insights. Just describe what you want to see!
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowAIAssistant(false)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex gap-2 mt-3 flex-wrap">
                  <Badge 
                    variant="secondary" 
                    className="cursor-pointer hover:bg-purple-100"
                    onClick={() => {
                      setAIPrompt('Show me average time to hire by position');
                      setShowAICreator(true);
                    }}
                  >
                    Time to hire metrics
                  </Badge>
                  <Badge 
                    variant="secondary" 
                    className="cursor-pointer hover:bg-purple-100"
                    onClick={() => {
                      setAIPrompt('Show me candidate sources breakdown');
                      setShowAICreator(true);
                    }}
                  >
                    Source analysis
                  </Badge>
                  <Badge 
                    variant="secondary" 
                    className="cursor-pointer hover:bg-purple-100"
                    onClick={() => {
                      setAIPrompt('Show me top skills in demand');
                      setShowAICreator(true);
                    }}
                  >
                    Skills demand
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Dashboard Grid */}
      <div className="grid grid-cols-4 gap-4 auto-rows-auto">
        {sortedDashlets.map(renderDashlet)}
      </div>

      {/* AI Dashlet Creator Dialog */}
      <Dialog open={showAICreator} onOpenChange={setShowAICreator}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-600" />
              Create AI Dashlet
            </DialogTitle>
            <DialogDescription>
              Describe what you want to visualize and AI will create a custom dashlet for you
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="ai-prompt">What would you like to see?</Label>
              <Textarea
                id="ai-prompt"
                placeholder="Examples:&#10;- Show me average time to hire by position&#10;- Display top candidate sources&#10;- Show skills gap analysis&#10;- Track interview completion rates"
                value={aiPrompt}
                onChange={(e) => setAIPrompt(e.target.value)}
                rows={6}
                className="mt-2"
              />
            </div>

            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-start gap-2">
                <Zap className="w-4 h-4 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-sm mb-2">Suggestions:</p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'Time to hire trends',
                      'Candidate source ROI',
                      'Interview conversion rates',
                      'Skills demand forecast',
                      'Recruiter performance',
                      'Salary benchmarks'
                    ].map(suggestion => (
                      <Badge
                        key={suggestion}
                        variant="secondary"
                        className="cursor-pointer hover:bg-blue-100"
                        onClick={() => setAIPrompt(`Show me ${suggestion.toLowerCase()}`)}
                      >
                        {suggestion}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* AI Filter Preview */}
            {aiPrompt && (
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <div className="flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-purple-600 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm mb-2">AI will suggest these filters:</p>
                    <div className="flex flex-wrap gap-2">
                      {generateFiltersFromPrompt(aiPrompt).map(filter => (
                        <Badge key={filter.id} variant="secondary" className="bg-white text-xs gap-1">
                          <Filter className="w-3 h-3" />
                          {filter.label}
                        </Badge>
                      ))}
                      {generateFiltersFromPrompt(aiPrompt).length === 0 && (
                        <p className="text-xs text-gray-600">No specific filters suggested for this query</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAICreator(false)}>
              Cancel
            </Button>
            <Button onClick={handleAIGenerate} disabled={isGenerating}>
              {isGenerating ? (
                <>
                  <Brain className="w-4 h-4 mr-2 animate-pulse" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Create Dashlet
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Settings Dialog */}
      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Customize Dashboard</DialogTitle>
            <DialogDescription>
              Enable, disable, or remove dashlets. Drag and drop dashlets on the main view to rearrange.
            </DialogDescription>
          </DialogHeader>

          <ScrollArea className="max-h-[500px] pr-4">
            <div className="space-y-3 py-4">
              {dashlets.map(dashlet => (
                <div
                  key={dashlet.id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <GripVertical className="w-4 h-4 text-gray-400" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm">{dashlet.title}</p>
                        {dashlet.aiGenerated && (
                          <Badge variant="secondary" className="bg-purple-100 text-purple-700 text-xs">
                            AI Generated
                          </Badge>
                        )}
                      </div>
                      {dashlet.description && (
                        <p className="text-xs text-gray-500 mt-0.5">{dashlet.description}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={dashlet.enabled}
                      onCheckedChange={() => toggleDashlet(dashlet.id)}
                    />
                    {dashlet.aiGenerated && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeDashlet(dashlet.id)}
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <DialogFooter>
            <Button onClick={() => setShowSettings(false)}>Done</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
        </TabsContent>

        {/* Market Intelligence Tab */}
        <TabsContent value="market-intelligence" className="mt-0">
          <MarketIntelligence />
        </TabsContent>
      </Tabs>
    </div>
  );
}

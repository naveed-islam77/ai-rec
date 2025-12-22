import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  Zap, 
  Play,
  Pause,
  UserPlus,
  Mail,
  Calendar,
  TrendingUp,
  MessageSquare,
  Eye,
  Plus,
  Settings,
  Target,
  CheckCircle2
} from 'lucide-react';

interface AutomationRule {
  id: string;
  name: string;
  trigger: string;
  action: string;
  status: 'active' | 'paused';
  executionCount: number;
  lastExecuted?: string;
}

export default function NurtureAutomation() {
  const [rules, setRules] = useState<AutomationRule[]>([
    {
      id: '1',
      name: 'Auto-enroll new candidates',
      trigger: 'Candidate added to database',
      action: 'Enroll in "New Candidate Welcome" campaign',
      status: 'active',
      executionCount: 234,
      lastExecuted: '2 hours ago'
    },
    {
      id: '2',
      name: 'Re-engage inactive candidates',
      trigger: 'No contact in 90 days',
      action: 'Enroll in "Re-engagement Campaign"',
      status: 'active',
      executionCount: 89,
      lastExecuted: '1 day ago'
    },
    {
      id: '3',
      name: 'Job match alerts',
      trigger: 'New job matches candidate profile',
      action: 'Send job match email',
      status: 'active',
      executionCount: 156,
      lastExecuted: '3 hours ago'
    },
    {
      id: '4',
      name: 'Pause on reply',
      trigger: 'Candidate replies to email',
      action: 'Pause campaign & tag as "engaged"',
      status: 'active',
      executionCount: 67,
      lastExecuted: '5 hours ago'
    },
    {
      id: '5',
      name: 'Hot lead notification',
      trigger: 'Engagement score > 80',
      action: 'Notify recruiter & tag as "hot lead"',
      status: 'active',
      executionCount: 28,
      lastExecuted: '1 day ago'
    },
    {
      id: '6',
      name: 'Profile completion reminder',
      trigger: 'Profile incomplete after 7 days',
      action: 'Send profile completion email',
      status: 'paused',
      executionCount: 45,
      lastExecuted: '1 week ago'
    }
  ]);

  const toggleRuleStatus = (ruleId: string) => {
    setRules(rules.map(rule => 
      rule.id === ruleId 
        ? { ...rule, status: rule.status === 'active' ? 'paused' as const : 'active' as const }
        : rule
    ));
  };

  const triggers = [
    { 
      id: 'candidate_added',
      name: 'Candidate Added',
      icon: UserPlus,
      description: 'When a new candidate is added to database',
      color: 'text-blue-600'
    },
    {
      id: 'no_contact',
      name: 'No Contact Period',
      icon: Calendar,
      description: 'After X days without contact',
      color: 'text-orange-600'
    },
    {
      id: 'email_opened',
      name: 'Email Opened',
      icon: Eye,
      description: 'When candidate opens an email',
      color: 'text-green-600'
    },
    {
      id: 'email_replied',
      name: 'Email Replied',
      icon: MessageSquare,
      description: 'When candidate replies to email',
      color: 'text-purple-600'
    },
    {
      id: 'engagement_score',
      name: 'Engagement Score',
      icon: TrendingUp,
      description: 'When engagement score reaches threshold',
      color: 'text-pink-600'
    },
    {
      id: 'job_match',
      name: 'Job Match Found',
      icon: Target,
      description: 'When new job matches candidate',
      color: 'text-cyan-600'
    },
    {
      id: 'profile_updated',
      name: 'Profile Updated',
      icon: Settings,
      description: 'When candidate updates their profile',
      color: 'text-indigo-600'
    },
    {
      id: 'status_change',
      name: 'Status Changed',
      icon: CheckCircle2,
      description: 'When candidate status changes',
      color: 'text-teal-600'
    }
  ];

  const actions = [
    {
      id: 'enroll_campaign',
      name: 'Enroll in Campaign',
      description: 'Add candidate to nurture sequence'
    },
    {
      id: 'send_email',
      name: 'Send Email',
      description: 'Send immediate one-time email'
    },
    {
      id: 'pause_campaign',
      name: 'Pause Campaign',
      description: 'Stop current nurture sequence'
    },
    {
      id: 'add_tag',
      name: 'Add Tag',
      description: 'Apply tag to candidate'
    },
    {
      id: 'update_score',
      name: 'Update Engagement Score',
      description: 'Increase or decrease score'
    },
    {
      id: 'notify_recruiter',
      name: 'Notify Recruiter',
      description: 'Send notification to recruiter'
    },
    {
      id: 'move_stage',
      name: 'Move Kanban Stage',
      description: 'Change candidate pipeline stage'
    }
  ];

  const stats = [
    {
      label: 'Active Rules',
      value: rules.filter(r => r.status === 'active').length,
      total: rules.length,
      icon: Zap,
      color: 'text-blue-600'
    },
    {
      label: 'Total Executions',
      value: rules.reduce((sum, r) => sum + r.executionCount, 0),
      change: '+23 today',
      icon: Play,
      color: 'text-green-600'
    },
    {
      label: 'Time Saved',
      value: '47h',
      change: 'this month',
      icon: Calendar,
      color: 'text-purple-600'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="flex items-center gap-2">
            <Zap className="w-6 h-6 text-purple-600" />
            Automation Rules
          </h2>
          <p className="text-muted-foreground">
            Trigger-based actions to automate your nurture workflow
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Create Rule
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <div className="flex items-baseline gap-2">
                      <p className="text-2xl font-bold">{stat.value}</p>
                      {stat.total && (
                        <span className="text-sm text-muted-foreground">/ {stat.total}</span>
                      )}
                      {stat.change && (
                        <span className="text-xs text-muted-foreground">{stat.change}</span>
                      )}
                    </div>
                  </div>
                  <Icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Active Rules */}
      <Card>
        <CardHeader>
          <CardTitle>Active Automation Rules</CardTitle>
          <CardDescription>Manage your automated workflows</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {rules.map(rule => (
              <div key={rule.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold">{rule.name}</h4>
                      <Badge 
                        variant={rule.status === 'active' ? 'default' : 'secondary'}
                        className={rule.status === 'active' ? 'bg-green-600' : ''}
                      >
                        {rule.status === 'active' ? (
                          <><Play className="w-3 h-3 mr-1" /> Active</>
                        ) : (
                          <><Pause className="w-3 h-3 mr-1" /> Paused</>
                        )}
                      </Badge>
                    </div>
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <span className="font-medium">Trigger:</span>
                        <span>{rule.trigger}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <span className="font-medium">Action:</span>
                        <span>{rule.action}</span>
                      </div>
                    </div>
                  </div>
                  <Switch
                    checked={rule.status === 'active'}
                    onCheckedChange={() => toggleRuleStatus(rule.id)}
                  />
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground pt-3 border-t">
                  <span>Executed {rule.executionCount} times</span>
                  {rule.lastExecuted && <span>Last: {rule.lastExecuted}</span>}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Available Triggers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Available Triggers</CardTitle>
            <CardDescription>Events that can start automation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-2">
              {triggers.map(trigger => {
                const Icon = trigger.icon;
                return (
                  <div key={trigger.id} className="border rounded-lg p-3 flex items-start gap-3">
                    <Icon className={`w-5 h-5 ${trigger.color} mt-0.5`} />
                    <div className="flex-1">
                      <p className="font-medium text-sm">{trigger.name}</p>
                      <p className="text-xs text-muted-foreground">{trigger.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Available Actions</CardTitle>
            <CardDescription>What happens when triggered</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-2">
              {actions.map(action => (
                <div key={action.id} className="border rounded-lg p-3">
                  <p className="font-medium text-sm">{action.name}</p>
                  <p className="text-xs text-muted-foreground">{action.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Common Workflows */}
      <Card>
        <CardHeader>
          <CardTitle>Pre-built Automation Templates</CardTitle>
          <CardDescription>Click to add these common workflows</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Button variant="outline" className="h-auto flex-col items-start py-4 px-4">
              <div className="flex items-center gap-2 mb-2">
                <UserPlus className="w-4 h-4 text-blue-600" />
                <span className="font-semibold text-sm">Welcome New Candidates</span>
              </div>
              <p className="text-xs text-muted-foreground text-left">
                Auto-enroll new candidates in welcome series
              </p>
            </Button>

            <Button variant="outline" className="h-auto flex-col items-start py-4 px-4">
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare className="w-4 h-4 text-green-600" />
                <span className="font-semibold text-sm">Handle Replies</span>
              </div>
              <p className="text-xs text-muted-foreground text-left">
                Pause campaigns and tag when candidates reply
              </p>
            </Button>

            <Button variant="outline" className="h-auto flex-col items-start py-4 px-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-purple-600" />
                <span className="font-semibold text-sm">Score-Based Actions</span>
              </div>
              <p className="text-xs text-muted-foreground text-left">
                Move hot leads to priority pipeline stage
              </p>
            </Button>

            <Button variant="outline" className="h-auto flex-col items-start py-4 px-4">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-4 h-4 text-orange-600" />
                <span className="font-semibold text-sm">Job Matching</span>
              </div>
              <p className="text-xs text-muted-foreground text-left">
                Auto-send job alerts when matches are found
              </p>
            </Button>

            <Button variant="outline" className="h-auto flex-col items-start py-4 px-4">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4 text-red-600" />
                <span className="font-semibold text-sm">Re-engagement</span>
              </div>
              <p className="text-xs text-muted-foreground text-left">
                Win back candidates after 90 days of inactivity
              </p>
            </Button>

            <Button variant="outline" className="h-auto flex-col items-start py-4 px-4">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4 text-yellow-600" />
                <span className="font-semibold text-sm">Engagement Boost</span>
              </div>
              <p className="text-xs text-muted-foreground text-left">
                Send personalized content to active engagers
              </p>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Automation Best Practices</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="flex gap-2">
            <Zap className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium">Start simple</p>
              <p className="text-xs text-muted-foreground">
                Begin with 2-3 core rules, then expand as needed
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <TrendingUp className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium">Monitor performance</p>
              <p className="text-xs text-muted-foreground">
                Review execution logs weekly to optimize rules
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Settings className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium">Test before activating</p>
              <p className="text-xs text-muted-foreground">
                Use a small segment to test new automation rules
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

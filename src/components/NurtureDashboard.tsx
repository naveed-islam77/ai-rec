import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  Play, 
  Pause, 
  Users, 
  Mail, 
  TrendingUp, 
  Eye, 
  MousePointer, 
  MessageSquare,
  Target,
  Clock,
  AlertCircle,
  CheckCircle2,
  BarChart3,
  Plus
} from 'lucide-react';

interface Campaign {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'draft';
  enrolled: number;
  sent: number;
  openRate: number;
  clickRate: number;
  replyRate: number;
  conversion: number;
  createdAt: string;
  segment: string;
  steps: number;
}

interface NurtureDashboardProps {
  onCreateCampaign: () => void;
  onViewCampaign: (campaignId: string) => void;
  onViewTemplates: () => void;
  onViewSegments: () => void;
  onViewAnalytics: () => void;
}

export default function NurtureDashboard({
  onCreateCampaign,
  onViewCampaign,
  onViewTemplates,
  onViewSegments,
  onViewAnalytics
}: NurtureDashboardProps) {
  const [campaigns] = useState<Campaign[]>([
    {
      id: '1',
      name: 'New Candidate Welcome',
      status: 'active',
      enrolled: 47,
      sent: 235,
      openRate: 68,
      clickRate: 24,
      replyRate: 12,
      conversion: 8,
      createdAt: '2024-10-15',
      segment: 'New Candidates',
      steps: 5
    },
    {
      id: '2',
      name: 'Senior React Dev Nurture',
      status: 'active',
      enrolled: 34,
      sent: 156,
      openRate: 72,
      clickRate: 31,
      replyRate: 18,
      conversion: 15,
      createdAt: '2024-10-01',
      segment: 'React Developers',
      steps: 6
    },
    {
      id: '3',
      name: 'Re-engagement Campaign',
      status: 'active',
      enrolled: 89,
      sent: 267,
      openRate: 42,
      clickRate: 15,
      replyRate: 7,
      conversion: 4,
      createdAt: '2024-09-20',
      segment: 'Inactive 90+ days',
      steps: 5
    },
    {
      id: '4',
      name: 'Passive Candidate Check-in',
      status: 'paused',
      enrolled: 156,
      sent: 468,
      openRate: 55,
      clickRate: 19,
      replyRate: 9,
      conversion: 6,
      createdAt: '2024-09-01',
      segment: 'Passive Candidates',
      steps: 7
    },
    {
      id: '5',
      name: 'Job Match Alert Series',
      status: 'active',
      enrolled: 28,
      sent: 84,
      openRate: 81,
      clickRate: 45,
      replyRate: 23,
      conversion: 19,
      createdAt: '2024-10-28',
      segment: 'Hot Leads',
      steps: 4
    }
  ]);

  const activeCampaigns = campaigns.filter(c => c.status === 'active');
  const totalEnrolled = campaigns.reduce((sum, c) => sum + c.enrolled, 0);
  const totalSent = campaigns.reduce((sum, c) => sum + c.sent, 0);
  const avgOpenRate = campaigns.reduce((sum, c) => sum + c.openRate, 0) / campaigns.length;
  const avgReplyRate = campaigns.reduce((sum, c) => sum + c.replyRate, 0) / campaigns.length;

  const thisWeekSent = 847;
  const lastWeekSent = 723;
  const weekGrowth = ((thisWeekSent - lastWeekSent) / lastWeekSent) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="flex items-center gap-2">
            <Target className="w-6 h-6 text-purple-600" />
            Nurture Engine
          </h2>
          <p className="text-muted-foreground">
            Automated candidate relationship management
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onViewTemplates}>
            <Mail className="w-4 h-4 mr-2" />
            Templates
          </Button>
          <Button variant="outline" onClick={onViewSegments}>
            <Users className="w-4 h-4 mr-2" />
            Segments
          </Button>
          <Button onClick={onCreateCampaign}>
            <Plus className="w-4 h-4 mr-2" />
            New Campaign
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
            <Play className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeCampaigns.length}</div>
            <p className="text-xs text-muted-foreground">
              {campaigns.length - activeCampaigns.length} paused
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Candidates Enrolled</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalEnrolled}</div>
            <p className="text-xs text-muted-foreground">
              Across {campaigns.length} campaigns
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Emails This Week</CardTitle>
            <Mail className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{thisWeekSent}</div>
            <p className="text-xs text-green-600 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +{weekGrowth.toFixed(1)}% from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Open Rate</CardTitle>
            <Eye className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgOpenRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              {avgReplyRate.toFixed(1)}% reply rate
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common nurture engine tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button variant="outline" className="h-auto flex-col py-4" onClick={onCreateCampaign}>
              <Plus className="w-5 h-5 mb-2 text-purple-600" />
              <span className="text-sm">New Campaign</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col py-4" onClick={onViewTemplates}>
              <Mail className="w-5 h-5 mb-2 text-blue-600" />
              <span className="text-sm">Browse Templates</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col py-4" onClick={onViewSegments}>
              <Users className="w-5 h-5 mb-2 text-green-600" />
              <span className="text-sm">Create Segment</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col py-4" onClick={onViewAnalytics}>
              <BarChart3 className="w-5 h-5 mb-2 text-orange-600" />
              <span className="text-sm">View Analytics</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Campaigns List */}
      <Card>
        <CardHeader>
          <CardTitle>All Campaigns</CardTitle>
          <CardDescription>Manage your automated nurture sequences</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="active">
            <TabsList>
              <TabsTrigger value="active">
                Active ({activeCampaigns.length})
              </TabsTrigger>
              <TabsTrigger value="all">All ({campaigns.length})</TabsTrigger>
              <TabsTrigger value="paused">
                Paused ({campaigns.filter(c => c.status === 'paused').length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="space-y-4 mt-4">
              {activeCampaigns.map(campaign => (
                <CampaignCard 
                  key={campaign.id} 
                  campaign={campaign} 
                  onView={() => onViewCampaign(campaign.id)}
                />
              ))}
            </TabsContent>

            <TabsContent value="all" className="space-y-4 mt-4">
              {campaigns.map(campaign => (
                <CampaignCard 
                  key={campaign.id} 
                  campaign={campaign} 
                  onView={() => onViewCampaign(campaign.id)}
                />
              ))}
            </TabsContent>

            <TabsContent value="paused" className="space-y-4 mt-4">
              {campaigns.filter(c => c.status === 'paused').map(campaign => (
                <CampaignCard 
                  key={campaign.id} 
                  campaign={campaign} 
                  onView={() => onViewCampaign(campaign.id)}
                />
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Performance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Campaigns</CardTitle>
            <CardDescription>By conversion rate</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[...campaigns]
                .sort((a, b) => b.conversion - a.conversion)
                .slice(0, 3)
                .map(campaign => (
                  <div key={campaign.id} className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-sm">{campaign.name}</p>
                        <Badge variant={campaign.status === 'active' ? 'default' : 'secondary'} className="text-xs">
                          {campaign.status}
                        </Badge>
                      </div>
                      <Progress value={campaign.conversion * 5} className="mt-2 h-2" />
                    </div>
                    <div className="ml-4 text-right">
                      <p className="font-bold text-lg">{campaign.conversion}%</p>
                      <p className="text-xs text-muted-foreground">conversion</p>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Engagement Metrics</CardTitle>
            <CardDescription>Average across all campaigns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-blue-600" />
                  <span className="text-sm">Open Rate</span>
                </div>
                <div className="flex items-center gap-3">
                  <Progress value={avgOpenRate} className="w-24 h-2" />
                  <span className="font-bold w-12 text-right">{avgOpenRate.toFixed(1)}%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MousePointer className="w-4 h-4 text-purple-600" />
                  <span className="text-sm">Click Rate</span>
                </div>
                <div className="flex items-center gap-3">
                  <Progress 
                    value={campaigns.reduce((sum, c) => sum + c.clickRate, 0) / campaigns.length} 
                    className="w-24 h-2" 
                  />
                  <span className="font-bold w-12 text-right">
                    {(campaigns.reduce((sum, c) => sum + c.clickRate, 0) / campaigns.length).toFixed(1)}%
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Reply Rate</span>
                </div>
                <div className="flex items-center gap-3">
                  <Progress value={avgReplyRate} className="w-24 h-2" />
                  <span className="font-bold w-12 text-right">{avgReplyRate.toFixed(1)}%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-orange-600" />
                  <span className="text-sm">Conversion</span>
                </div>
                <div className="flex items-center gap-3">
                  <Progress 
                    value={campaigns.reduce((sum, c) => sum + c.conversion, 0) / campaigns.length * 10} 
                    className="w-24 h-2" 
                  />
                  <span className="font-bold w-12 text-right">
                    {(campaigns.reduce((sum, c) => sum + c.conversion, 0) / campaigns.length).toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function CampaignCard({ campaign, onView }: { campaign: Campaign; onView: () => void }) {
  return (
    <div className="border rounded-lg p-4 hover:bg-accent/50 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-semibold">{campaign.name}</h4>
            <Badge 
              variant={campaign.status === 'active' ? 'default' : 'secondary'}
              className={campaign.status === 'active' ? 'bg-green-600' : ''}
            >
              {campaign.status === 'active' ? (
                <><Play className="w-3 h-3 mr-1" /> Active</>
              ) : (
                <><Pause className="w-3 h-3 mr-1" /> Paused</>
              )}
            </Badge>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              {campaign.enrolled} enrolled
            </span>
            <span className="flex items-center gap-1">
              <Mail className="w-3 h-3" />
              {campaign.sent} sent
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {campaign.steps} steps
            </span>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={onView}>
          View Details
        </Button>
      </div>

      <div className="grid grid-cols-4 gap-3 pt-3 border-t">
        <div>
          <p className="text-xs text-muted-foreground mb-1">Open Rate</p>
          <p className="font-bold text-sm flex items-center gap-1">
            <Eye className="w-3 h-3 text-blue-600" />
            {campaign.openRate}%
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Click Rate</p>
          <p className="font-bold text-sm flex items-center gap-1">
            <MousePointer className="w-3 h-3 text-purple-600" />
            {campaign.clickRate}%
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Reply Rate</p>
          <p className="font-bold text-sm flex items-center gap-1">
            <MessageSquare className="w-3 h-3 text-green-600" />
            {campaign.replyRate}%
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Conversion</p>
          <p className="font-bold text-sm flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-orange-600" />
            {campaign.conversion}%
          </p>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Segment: {campaign.segment}</span>
          <span>Created: {new Date(campaign.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
}

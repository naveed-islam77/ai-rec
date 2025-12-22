import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { 
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown,
  Download,
  Calendar,
  Eye,
  MousePointer,
  MessageSquare,
  Target,
  Users,
  Mail,
  Clock,
  Award
} from 'lucide-react';

export default function NurtureAnalytics() {
  const [dateRange, setDateRange] = useState('30');

  // Campaign Performance Data
  const campaignData = [
    { name: 'Welcome', sent: 235, opens: 160, clicks: 56, replies: 28, conversions: 19 },
    { name: 'Job Match', sent: 84, opens: 68, clicks: 38, replies: 19, conversions: 16 },
    { name: 'Re-engage', sent: 267, opens: 112, clicks: 40, replies: 19, conversions: 11 },
    { name: 'Passive', sent: 468, opens: 257, clicks: 89, replies: 42, conversions: 28 },
    { name: 'Check-in', sent: 156, opens: 91, clicks: 30, replies: 14, conversions: 9 }
  ];

  // Time Series Data
  const timeSeriesData = [
    { date: 'Oct 1', sent: 45, opens: 28, clicks: 12 },
    { date: 'Oct 5', sent: 62, opens: 41, clicks: 18 },
    { date: 'Oct 10', sent: 78, opens: 52, clicks: 23 },
    { date: 'Oct 15', sent: 91, opens: 64, clicks: 29 },
    { date: 'Oct 20', sent: 103, opens: 73, clicks: 34 },
    { date: 'Oct 25', sent: 87, opens: 59, clicks: 26 },
    { date: 'Oct 30', sent: 95, opens: 67, clicks: 31 }
  ];

  // Funnel Data
  const funnelData = [
    { stage: 'Enrolled', count: 354, color: '#3b82f6' },
    { stage: 'Received Email', count: 1210, color: '#8b5cf6' },
    { stage: 'Opened', count: 747, color: '#10b981' },
    { stage: 'Clicked', count: 276, color: '#f59e0b' },
    { stage: 'Replied', count: 122, color: '#ef4444' },
    { stage: 'Converted', count: 83, color: '#06b6d4' }
  ];

  // Segment Performance
  const segmentData = [
    { name: 'New Candidates', value: 23, performance: 85 },
    { name: 'React Devs', value: 34, performance: 92 },
    { name: 'Inactive 90+', value: 89, performance: 42 },
    { name: 'Passive', value: 156, performance: 58 },
    { name: 'Hot Leads', value: 28, performance: 97 }
  ];

  // Email Performance by Time
  const timePerformance = [
    { hour: '8 AM', opens: 45 },
    { hour: '9 AM', opens: 67 },
    { hour: '10 AM', opens: 89 },
    { hour: '11 AM', opens: 76 },
    { hour: '12 PM', opens: 52 },
    { hour: '1 PM', opens: 48 },
    { hour: '2 PM', opens: 71 },
    { hour: '3 PM', opens: 83 },
    { hour: '4 PM', opens: 69 },
    { hour: '5 PM', opens: 44 }
  ];

  // A/B Test Results
  const abTestData = [
    {
      test: 'Subject Line Test #1',
      variantA: { name: 'Question format', openRate: 64, clicks: 28 },
      variantB: { name: 'Direct format', openRate: 71, clicks: 34 },
      winner: 'B'
    },
    {
      test: 'Send Time Test',
      variantA: { name: 'Morning (9 AM)', openRate: 68, clicks: 31 },
      variantB: { name: 'Afternoon (2 PM)', openRate: 73, clicks: 29 },
      winner: 'B'
    }
  ];

  const stats = [
    {
      title: 'Total Emails Sent',
      value: '1,210',
      change: '+17.2%',
      trend: 'up',
      icon: Mail,
      color: 'text-blue-600'
    },
    {
      title: 'Avg. Open Rate',
      value: '61.7%',
      change: '+4.3%',
      trend: 'up',
      icon: Eye,
      color: 'text-green-600'
    },
    {
      title: 'Avg. Click Rate',
      value: '22.8%',
      change: '+2.1%',
      trend: 'up',
      icon: MousePointer,
      color: 'text-purple-600'
    },
    {
      title: 'Conversion Rate',
      value: '6.9%',
      change: '-0.8%',
      trend: 'down',
      icon: Target,
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="flex items-center gap-2">
            <BarChart className="w-6 h-6 text-blue-600" />
            Nurture Analytics
          </h2>
          <p className="text-muted-foreground">
            Detailed performance metrics and insights
          </p>
        </div>
        <div className="flex gap-2">
          <select
            className="px-3 py-2 border rounded-lg text-sm"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
          >
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
            <option value="365">Last year</option>
          </select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trend === 'up' ? TrendingUp : TrendingDown;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className={`text-xs flex items-center gap-1 ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  <TrendIcon className="w-3 h-3" />
                  {stat.change} from last period
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="segments">Segments</TabsTrigger>
          <TabsTrigger value="timing">Best Times</TabsTrigger>
          <TabsTrigger value="abtests">A/B Tests</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Email Activity Over Time</CardTitle>
                <CardDescription>Sent, opens, and clicks by date</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={timeSeriesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="sent" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                    <Area type="monotone" dataKey="opens" stackId="2" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
                    <Area type="monotone" dataKey="clicks" stackId="3" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.6} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Conversion Funnel</CardTitle>
                <CardDescription>Journey from enrollment to conversion</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {funnelData.map((stage, index) => {
                    const percentage = index === 0 ? 100 : (stage.count / funnelData[0].count) * 100;
                    return (
                      <div key={stage.stage}>
                        <div className="flex items-center justify-between mb-1 text-sm">
                          <span className="font-medium">{stage.stage}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-muted-foreground">{stage.count}</span>
                            <Badge variant="secondary">{percentage.toFixed(0)}%</Badge>
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-8 overflow-hidden">
                          <div
                            className="h-full rounded-full flex items-center justify-end px-3 text-white text-xs font-medium transition-all"
                            style={{
                              width: `${percentage}%`,
                              backgroundColor: stage.color
                            }}
                          >
                            {percentage > 20 && `${percentage.toFixed(0)}%`}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Top Insights</CardTitle>
              <CardDescription>AI-powered recommendations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-green-900">Strong Performance</p>
                    <p className="text-sm text-green-700">
                      Job Match campaigns are converting 2.3x better than average. Consider creating more job-specific campaigns.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-blue-900">Timing Opportunity</p>
                    <p className="text-sm text-blue-700">
                      Emails sent at 2-3 PM have 12% higher open rates. Adjust your send times for better engagement.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                  <Users className="w-5 h-5 text-orange-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-orange-900">Re-engagement Needed</p>
                    <p className="text-sm text-orange-700">
                      89 candidates haven't engaged in 90+ days. Launch a re-engagement campaign to win them back.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Campaigns Tab */}
        <TabsContent value="campaigns" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Campaign Performance Comparison</CardTitle>
              <CardDescription>Metrics across all active campaigns</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={campaignData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="sent" fill="#3b82f6" name="Sent" />
                  <Bar dataKey="opens" fill="#10b981" name="Opens" />
                  <Bar dataKey="clicks" fill="#f59e0b" name="Clicks" />
                  <Bar dataKey="replies" fill="#8b5cf6" name="Replies" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {campaignData.map((campaign, index) => {
              const openRate = ((campaign.opens / campaign.sent) * 100).toFixed(1);
              const clickRate = ((campaign.clicks / campaign.sent) * 100).toFixed(1);
              const replyRate = ((campaign.replies / campaign.sent) * 100).toFixed(1);
              const conversionRate = ((campaign.conversions / campaign.sent) * 100).toFixed(1);

              return (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-base">{campaign.name} Campaign</CardTitle>
                    <CardDescription>{campaign.sent} emails sent</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2">
                          <Eye className="w-4 h-4 text-blue-600" />
                          Open Rate
                        </span>
                        <span className="font-bold">{openRate}%</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2">
                          <MousePointer className="w-4 h-4 text-purple-600" />
                          Click Rate
                        </span>
                        <span className="font-bold">{clickRate}%</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2">
                          <MessageSquare className="w-4 h-4 text-green-600" />
                          Reply Rate
                        </span>
                        <span className="font-bold">{replyRate}%</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2">
                          <Target className="w-4 h-4 text-orange-600" />
                          Conversion
                        </span>
                        <span className="font-bold">{conversionRate}%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* Segments Tab */}
        <TabsContent value="segments" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Segment Performance</CardTitle>
              <CardDescription>Engagement by audience segment</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {segmentData.map((segment, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-semibold">{segment.name}</h4>
                        <p className="text-sm text-muted-foreground">{segment.value} candidates</p>
                      </div>
                      <Badge 
                        variant={segment.performance > 70 ? 'default' : 'secondary'}
                        className={segment.performance > 70 ? 'bg-green-600' : ''}
                      >
                        {segment.performance}% engaged
                      </Badge>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-full rounded-full ${
                          segment.performance > 70 ? 'bg-green-600' :
                          segment.performance > 50 ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`}
                        style={{ width: `${segment.performance}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Timing Tab */}
        <TabsContent value="timing" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Best Send Times</CardTitle>
              <CardDescription>Open rates by time of day</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={timePerformance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="opens" stroke="#10b981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="font-medium text-blue-900 mb-2">Recommendation</p>
                <p className="text-sm text-blue-700">
                  Peak engagement occurs between 2-3 PM. Schedule your most important campaigns during this window for maximum impact.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* A/B Tests Tab */}
        <TabsContent value="abtests" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>A/B Test Results</CardTitle>
              <CardDescription>Compare variants to optimize performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {abTestData.map((test, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-4">{test.test}</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className={`border rounded-lg p-3 ${test.winner === 'A' ? 'border-green-500 bg-green-50' : ''}`}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">Variant A</span>
                          {test.winner === 'A' && <Award className="w-4 h-4 text-green-600" />}
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{test.variantA.name}</p>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span>Open Rate:</span>
                            <span className="font-bold">{test.variantA.openRate}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Click Rate:</span>
                            <span className="font-bold">{test.variantA.clicks}%</span>
                          </div>
                        </div>
                      </div>
                      <div className={`border rounded-lg p-3 ${test.winner === 'B' ? 'border-green-500 bg-green-50' : ''}`}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">Variant B</span>
                          {test.winner === 'B' && <Award className="w-4 h-4 text-green-600" />}
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{test.variantB.name}</p>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span>Open Rate:</span>
                            <span className="font-bold">{test.variantB.openRate}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Click Rate:</span>
                            <span className="font-bold">{test.variantB.clicks}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Briefcase, 
  Target, 
  AlertTriangle, 
  Brain, 
  Sparkles,
  Building2,
  Search,
  Filter,
  ArrowUpRight,
  Clock,
  DollarSign,
  MapPin,
  Zap,
  LineChart as LineChartIcon,
  BarChart3,
  Activity,
  Eye,
  RefreshCw,
  Download,
  Bell,
  CheckCircle
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import { Progress } from './ui/progress';

const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#06b6d4', '#ec4899'];

// Mock data for market trends
const hiringTrendData = [
  { month: 'Jul', tech: 2345, finance: 1234, healthcare: 1567, retail: 890 },
  { month: 'Aug', tech: 2567, finance: 1345, healthcare: 1678, retail: 945 },
  { month: 'Sep', tech: 2890, finance: 1456, healthcare: 1789, retail: 1023 },
  { month: 'Oct', tech: 3123, finance: 1567, healthcare: 1890, retail: 1134 },
  { month: 'Nov', tech: 3456, finance: 1678, healthcare: 2012, retail: 1245 },
  { month: 'Dec', tech: 3789, finance: 1789, healthcare: 2134, retail: 1356 }
];

const emergingSkillsData = [
  { skill: 'AI/ML', demand: 95, growth: 45, avgSalary: 145000 },
  { skill: 'React', demand: 88, growth: 32, avgSalary: 115000 },
  { skill: 'Python', demand: 92, growth: 38, avgSalary: 125000 },
  { skill: 'Cloud (AWS)', demand: 85, growth: 42, avgSalary: 135000 },
  { skill: 'DevOps', demand: 82, growth: 35, avgSalary: 130000 },
  { skill: 'Cybersecurity', demand: 89, growth: 48, avgSalary: 140000 },
  { skill: 'Data Science', demand: 87, growth: 40, avgSalary: 138000 },
  { skill: 'Blockchain', demand: 75, growth: 55, avgSalary: 150000 }
];

const talentShortageData = [
  { role: 'Senior ML Engineer', shortage: 85, timeToFill: 45, competition: 'High' },
  { role: 'Full Stack Developer', shortage: 72, timeToFill: 32, competition: 'High' },
  { role: 'DevOps Engineer', shortage: 78, timeToFill: 38, competition: 'High' },
  { role: 'Data Scientist', shortage: 80, timeToFill: 42, competition: 'Very High' },
  { role: 'Cloud Architect', shortage: 75, timeToFill: 40, competition: 'High' },
  { role: 'Product Manager', shortage: 65, timeToFill: 28, competition: 'Medium' },
  { role: 'UX Designer', shortage: 58, timeToFill: 25, competition: 'Medium' }
];

const competitorActivity = [
  { 
    company: 'TechCorp', 
    activeJobs: 234, 
    recentHires: 45, 
    avgSalary: '$135K',
    trend: 'up',
    change: '+18%',
    topRoles: ['Software Engineer', 'Product Manager', 'Data Scientist']
  },
  { 
    company: 'InnovateLabs', 
    activeJobs: 187, 
    recentHires: 32, 
    avgSalary: '$128K',
    trend: 'up',
    change: '+12%',
    topRoles: ['Full Stack Dev', 'UX Designer', 'DevOps Engineer']
  },
  { 
    company: 'DataDynamics', 
    activeJobs: 156, 
    recentHires: 28, 
    avgSalary: '$142K',
    trend: 'up',
    change: '+24%',
    topRoles: ['ML Engineer', 'Data Engineer', 'Cloud Architect']
  },
  { 
    company: 'CloudFirst', 
    activeJobs: 143, 
    recentHires: 25, 
    avgSalary: '$138K',
    trend: 'down',
    change: '-5%',
    topRoles: ['Cloud Engineer', 'Site Reliability Engineer', 'Security Engineer']
  },
  { 
    company: 'AIStartup', 
    activeJobs: 98, 
    recentHires: 38, 
    avgSalary: '$152K',
    trend: 'up',
    change: '+35%',
    topRoles: ['AI Researcher', 'ML Engineer', 'NLP Engineer']
  }
];

const salaryTrendData = [
  { role: 'Software Engineer', q1: 110, q2: 115, q3: 118, q4: 122 },
  { role: 'Product Manager', q1: 125, q2: 128, q3: 132, q4: 135 },
  { role: 'Data Scientist', q1: 130, q2: 135, q3: 138, q4: 142 },
  { role: 'DevOps Engineer', q1: 118, q2: 122, q3: 125, q4: 130 }
];

const marketInsights = [
  {
    id: 1,
    type: 'opportunity',
    priority: 'high',
    title: 'Rising Demand for AI/ML Skills',
    description: 'AI/ML engineer demand has increased 45% this quarter. Consider proactive sourcing.',
    metrics: { impact: 'High', confidence: 92 },
    action: 'Build talent pool',
    timestamp: '2 hours ago'
  },
  {
    id: 2,
    type: 'alert',
    priority: 'high',
    title: 'Competitor Salary Increase Detected',
    description: 'TechCorp increased Software Engineer salaries by 18%. Review compensation strategy.',
    metrics: { impact: 'High', confidence: 88 },
    action: 'Adjust offers',
    timestamp: '5 hours ago'
  },
  {
    id: 3,
    type: 'trend',
    priority: 'medium',
    title: 'Remote Work Preferences Growing',
    description: '78% of tech candidates now prioritize remote-first opportunities.',
    metrics: { impact: 'Medium', confidence: 85 },
    action: 'Update job postings',
    timestamp: '1 day ago'
  },
  {
    id: 4,
    type: 'opportunity',
    priority: 'medium',
    title: 'Emerging Market: Green Tech Roles',
    description: 'Sustainability-focused tech roles seeing 35% growth in postings.',
    metrics: { impact: 'Medium', confidence: 79 },
    action: 'Explore niche',
    timestamp: '1 day ago'
  },
  {
    id: 5,
    type: 'alert',
    priority: 'low',
    title: 'Hiring Slowdown in Fintech',
    description: 'Finance sector showing 12% decrease in new job postings this month.',
    metrics: { impact: 'Low', confidence: 82 },
    action: 'Monitor closely',
    timestamp: '2 days ago'
  }
];

const locationHotspots = [
  { city: 'San Francisco', jobs: 12456, growth: 18, avgSalary: 165000 },
  { city: 'New York', jobs: 10234, growth: 15, avgSalary: 155000 },
  { city: 'Austin', jobs: 8567, growth: 32, avgSalary: 125000 },
  { city: 'Seattle', jobs: 7890, growth: 22, avgSalary: 145000 },
  { city: 'Boston', jobs: 6543, growth: 12, avgSalary: 140000 },
  { city: 'Remote', jobs: 15678, growth: 45, avgSalary: 135000 }
];

export function MarketIntelligence() {
  const [selectedIndustry, setSelectedIndustry] = useState('technology');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedTimeframe, setSelectedTimeframe] = useState('6months');
  const [autoRefresh, setAutoRefresh] = useState(true);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="flex items-center gap-2">
            <Brain className="w-6 h-6 text-blue-600" />
            Market Intelligence
          </h1>
          <p className="text-gray-600 mt-2">
            AI-powered insights on hiring trends, competitor activity, and talent market dynamics
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="w-4 h-4" />
            Export Report
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Bell className={autoRefresh ? 'text-blue-600' : ''} />
            Alerts
          </Button>
          <Button size="sm" className="gap-2">
            <RefreshCw className="w-4 h-4" />
            Refresh Data
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-4 gap-4">
            <div>
              <Label>Industry</Label>
              <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="retail">Retail</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Role Category</Label>
              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="engineering">Engineering</SelectItem>
                  <SelectItem value="product">Product</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="data">Data & Analytics</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Timeframe</Label>
              <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1month">Last Month</SelectItem>
                  <SelectItem value="3months">Last 3 Months</SelectItem>
                  <SelectItem value="6months">Last 6 Months</SelectItem>
                  <SelectItem value="1year">Last Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Location</Label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="sf">San Francisco Bay Area</SelectItem>
                  <SelectItem value="nyc">New York</SelectItem>
                  <SelectItem value="austin">Austin</SelectItem>
                  <SelectItem value="remote">Remote</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="trends">Hiring Trends</TabsTrigger>
          <TabsTrigger value="skills">Emerging Skills</TabsTrigger>
          <TabsTrigger value="competitors">Competitors</TabsTrigger>
          <TabsTrigger value="shortages">Talent Gaps</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  Market Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl mb-1">8,234</div>
                <p className="text-sm text-green-600">+23% vs last month</p>
                <p className="text-xs text-gray-600 mt-1">Active job postings</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-blue-600" />
                  Avg Salary Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl mb-1">$132K</div>
                <p className="text-sm text-blue-600">+8.5% YoY</p>
                <p className="text-xs text-gray-600 mt-1">Tech sector average</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Clock className="w-4 h-4 text-orange-600" />
                  Time to Fill
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl mb-1">35 days</div>
                <p className="text-sm text-orange-600">+3 days vs Q3</p>
                <p className="text-xs text-gray-600 mt-1">Industry average</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                  Talent Shortage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl mb-1">High</div>
                <p className="text-sm text-red-600">Critical in 7 roles</p>
                <p className="text-xs text-gray-600 mt-1">Severity index</p>
              </CardContent>
            </Card>
          </div>

          {/* Market Snapshot */}
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <LineChartIcon className="w-4 h-4" />
                  Hiring Activity by Industry
                </CardTitle>
                <CardDescription>Last 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={hiringTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="tech" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} name="Technology" />
                    <Area type="monotone" dataKey="finance" stackId="1" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} name="Finance" />
                    <Area type="monotone" dataKey="healthcare" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.6} name="Healthcare" />
                    <Area type="monotone" dataKey="retail" stackId="1" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.6} name="Retail" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Hiring Hotspots
                </CardTitle>
                <CardDescription>Job growth by location</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px]">
                  <div className="space-y-4">
                    {locationHotspots.map((location, index) => (
                      <div key={location.city}>
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <p className="text-sm">{location.city}</p>
                            <p className="text-xs text-gray-600">{location.jobs.toLocaleString()} jobs • ${(location.avgSalary / 1000).toFixed(0)}K avg</p>
                          </div>
                          <Badge variant={location.growth > 30 ? 'default' : 'secondary'} className="gap-1">
                            <TrendingUp className="w-3 h-3" />
                            +{location.growth}%
                          </Badge>
                        </div>
                        <Progress value={location.growth} className="h-2" />
                        {index < locationHotspots.length - 1 && <Separator className="mt-4" />}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Hiring Trends Tab */}
        <TabsContent value="trends" className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Job Posting Volume Trends</CardTitle>
                <CardDescription>Historical hiring activity across sectors</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={hiringTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="tech" stroke="#3b82f6" strokeWidth={2} name="Technology" />
                    <Line type="monotone" dataKey="finance" stroke="#8b5cf6" strokeWidth={2} name="Finance" />
                    <Line type="monotone" dataKey="healthcare" stroke="#10b981" strokeWidth={2} name="Healthcare" />
                    <Line type="monotone" dataKey="retail" stroke="#f59e0b" strokeWidth={2} name="Retail" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Salary Trends by Role</CardTitle>
                <CardDescription>Quarterly compensation trends (in $K)</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={salaryTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="role" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="q1" stroke="#ef4444" strokeWidth={2} name="Q1" />
                    <Line type="monotone" dataKey="q2" stroke="#f59e0b" strokeWidth={2} name="Q2" />
                    <Line type="monotone" dataKey="q3" stroke="#10b981" strokeWidth={2} name="Q3" />
                    <Line type="monotone" dataKey="q4" stroke="#3b82f6" strokeWidth={2} name="Q4" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Trend Insights */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Activity className="w-4 h-4" />
                Key Trend Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <Sparkles className="w-5 h-5 text-blue-600" />
                    <Badge>High Impact</Badge>
                  </div>
                  <h4 className="text-sm mb-1">Remote Work Normalization</h4>
                  <p className="text-xs text-gray-600 mb-3">
                    45% increase in remote-first postings. Companies adapting to distributed talent.
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    View Details
                  </Button>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    <Badge variant="secondary">Opportunity</Badge>
                  </div>
                  <h4 className="text-sm mb-1">AI/ML Talent War</h4>
                  <p className="text-xs text-gray-600 mb-3">
                    Unprecedented demand for AI skills. Average salaries up 22% in 6 months.
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    View Details
                  </Button>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <AlertTriangle className="w-5 h-5 text-orange-600" />
                    <Badge variant="secondary">Watch</Badge>
                  </div>
                  <h4 className="text-sm mb-1">Hiring Slowdown Signals</h4>
                  <p className="text-xs text-gray-600 mb-3">
                    Some tech giants reducing headcount. May create talent availability.
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    View Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Emerging Skills Tab */}
        <TabsContent value="skills" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Zap className="w-4 h-4 text-purple-600" />
                Hot Skills in Demand
              </CardTitle>
              <CardDescription>Skills with highest demand growth and market value</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {emergingSkillsData.map((skill, index) => (
                  <div key={skill.skill} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          index === 0 ? 'bg-yellow-100 text-yellow-700' :
                          index === 1 ? 'bg-gray-100 text-gray-700' :
                          index === 2 ? 'bg-orange-100 text-orange-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                          {index + 1}
                        </div>
                        <div>
                          <p className="text-sm">{skill.skill}</p>
                          <p className="text-xs text-gray-600">Avg: ${(skill.avgSalary / 1000).toFixed(0)}K</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-xs text-gray-600">Demand Score</p>
                          <p className="text-sm">{skill.demand}/100</p>
                        </div>
                        <Badge className="gap-1" variant={skill.growth > 40 ? 'default' : 'secondary'}>
                          <TrendingUp className="w-3 h-3" />
                          +{skill.growth}%
                        </Badge>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <Progress value={skill.demand} className="h-2" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Skill Demand vs Supply</CardTitle>
                <CardDescription>Market balance analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={emergingSkillsData.slice(0, 5)}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="skill" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="demand" fill="#3b82f6" name="Demand Score" />
                    <Bar dataKey="growth" fill="#10b981" name="Growth %" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">AI Recommendations</CardTitle>
                <CardDescription>Proactive sourcing strategies</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px]">
                  <div className="space-y-4">
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-start gap-2 mb-2">
                        <Brain className="w-4 h-4 text-blue-600 mt-0.5" />
                        <div>
                          <h4 className="text-sm">Build AI/ML Talent Pool</h4>
                          <p className="text-xs text-gray-600 mt-1">
                            45% demand growth detected. Start sourcing now before competition intensifies.
                          </p>
                        </div>
                      </div>
                      <Button size="sm" className="w-full mt-2">
                        Start Campaign
                      </Button>
                    </div>

                    <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                      <div className="flex items-start gap-2 mb-2">
                        <Target className="w-4 h-4 text-purple-600 mt-0.5" />
                        <div>
                          <h4 className="text-sm">Upskill Existing Candidates</h4>
                          <p className="text-xs text-gray-600 mt-1">
                            Consider Python candidates for ML roles - 89% skill overlap.
                          </p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" className="w-full mt-2">
                        View Candidates
                      </Button>
                    </div>

                    <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-start gap-2 mb-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                        <div>
                          <h4 className="text-sm">Optimize Job Descriptions</h4>
                          <p className="text-xs text-gray-600 mt-1">
                            Add "Cloud (AWS)" to attract 42% more qualified applicants.
                          </p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" className="w-full mt-2">
                        Update JDs
                      </Button>
                    </div>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Competitors Tab */}
        <TabsContent value="competitors" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                Competitor Hiring Activity
              </CardTitle>
              <CardDescription>Real-time tracking of competitor recruitment efforts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {competitorActivity.map((competitor) => (
                  <Card key={competitor.company} className="border">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                            <Building2 className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h4 className="text-sm">{competitor.company}</h4>
                            <p className="text-xs text-gray-600">
                              {competitor.activeJobs} active jobs • {competitor.recentHires} recent hires
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={competitor.trend === 'up' ? 'default' : 'secondary'} className="gap-1">
                            {competitor.trend === 'up' ? 
                              <TrendingUp className="w-3 h-3" /> : 
                              <TrendingDown className="w-3 h-3" />
                            }
                            {competitor.change}
                          </Badge>
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <p className="text-xs text-gray-600 mb-1">Avg Salary</p>
                          <p className="text-sm">{competitor.avgSalary}</p>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg col-span-2">
                          <p className="text-xs text-gray-600 mb-1">Top Roles Hiring For</p>
                          <div className="flex gap-1 flex-wrap">
                            {competitor.topRoles.map(role => (
                              <Badge key={role} variant="secondary" className="text-xs">
                                {role}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Brain className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="text-sm mb-2">AI Competitive Intelligence</h4>
                  <p className="text-xs text-gray-700 mb-3">
                    TechCorp and AIStartup are aggressively hiring AI/ML talent. Consider:
                  </p>
                  <ul className="text-xs text-gray-700 space-y-1 ml-4 list-disc">
                    <li>Increase AI Engineer salaries by 10-15% to stay competitive</li>
                    <li>Highlight unique culture and projects in job descriptions</li>
                    <li>Fast-track interview process (competitors averaging 2 weeks)</li>
                    <li>Consider remote-first for wider talent pool access</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Talent Gaps Tab */}
        <TabsContent value="shortages" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                Talent Shortage Analysis
              </CardTitle>
              <CardDescription>Critical roles with supply constraints</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {talentShortageData.map((shortage) => (
                  <div key={shortage.role} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="text-sm mb-1">{shortage.role}</h4>
                        <p className="text-xs text-gray-600">
                          Average {shortage.timeToFill} days to fill
                        </p>
                      </div>
                      <Badge 
                        variant={shortage.competition === 'Very High' ? 'destructive' : 'secondary'}
                        className="gap-1"
                      >
                        <AlertTriangle className="w-3 h-3" />
                        {shortage.competition} Competition
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-600">Shortage Severity</span>
                        <span className="text-sm">{shortage.shortage}%</span>
                      </div>
                      <Progress 
                        value={shortage.shortage} 
                        className={`h-2 ${
                          shortage.shortage > 80 ? '[&>div]:bg-red-600' :
                          shortage.shortage > 70 ? '[&>div]:bg-orange-600' :
                          '[&>div]:bg-yellow-600'
                        }`}
                      />
                    </div>

                    <div className="flex gap-2 mt-3">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Search className="w-3 h-3 mr-1" />
                        Source Now
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <Target className="w-3 h-3 mr-1" />
                        Build Pipeline
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Proactive Sourcing Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                      <AlertTriangle className="w-4 h-4 text-red-600" />
                    </div>
                    <Badge variant="destructive">Critical</Badge>
                  </div>
                  <h4 className="text-sm mb-2">Senior ML Engineer Pipeline</h4>
                  <p className="text-xs text-gray-600 mb-3">
                    85% shortage severity. Start building talent pool immediately.
                  </p>
                  <div className="space-y-2">
                    <Button size="sm" className="w-full">
                      Start AI Sourcing Campaign
                    </Button>
                    <Button size="sm" variant="outline" className="w-full">
                      View Similar Profiles
                    </Button>
                  </div>
                </div>

                <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                      <Clock className="w-4 h-4 text-orange-600" />
                    </div>
                    <Badge className="bg-orange-600">High Priority</Badge>
                  </div>
                  <h4 className="text-sm mb-2">DevOps Engineer Shortage</h4>
                  <p className="text-xs text-gray-600 mb-3">
                    38 days average fill time. Consider contract-to-hire.
                  </p>
                  <div className="space-y-2">
                    <Button size="sm" variant="outline" className="w-full">
                      Explore Alternatives
                    </Button>
                    <Button size="sm" variant="outline" className="w-full">
                      Review Contractors
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* AI Insights Tab */}
        <TabsContent value="insights" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-600" />
                AI-Powered Market Insights
              </CardTitle>
              <CardDescription>Real-time intelligence and actionable recommendations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {marketInsights.map((insight) => (
                  <Card key={insight.id} className="border">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          insight.type === 'opportunity' ? 'bg-green-100' :
                          insight.type === 'alert' ? 'bg-red-100' :
                          'bg-blue-100'
                        }`}>
                          {insight.type === 'opportunity' ? <Target className="w-5 h-5 text-green-600" /> :
                           insight.type === 'alert' ? <AlertTriangle className="w-5 h-5 text-red-600" /> :
                           <TrendingUp className="w-5 h-5 text-blue-600" />}
                        </div>

                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h4 className="text-sm mb-1">{insight.title}</h4>
                              <p className="text-xs text-gray-600">{insight.description}</p>
                            </div>
                            <Badge 
                              variant={insight.priority === 'high' ? 'destructive' : 'secondary'}
                              className="ml-2"
                            >
                              {insight.priority}
                            </Badge>
                          </div>

                          <div className="flex items-center gap-4 mb-3">
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-600">Impact:</span>
                              <Badge variant="outline" className="text-xs">
                                {insight.metrics.impact}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-600">Confidence:</span>
                              <Badge variant="outline" className="text-xs">
                                {insight.metrics.confidence}%
                              </Badge>
                            </div>
                            <span className="text-xs text-gray-500 ml-auto">{insight.timestamp}</span>
                          </div>

                          <Button size="sm" variant="outline" className="gap-2">
                            <ArrowUpRight className="w-3 h-3" />
                            {insight.action}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Predictive Analytics</CardTitle>
                <CardDescription>AI forecasts for next quarter</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Brain className="w-4 h-4 text-blue-600" />
                    <span className="text-sm">Hiring Volume Forecast</span>
                  </div>
                  <p className="text-xs text-gray-600 mb-2">
                    Expected 28% increase in tech job postings next quarter
                  </p>
                  <Progress value={78} className="h-2" />
                  <p className="text-xs text-gray-500 mt-1">78% confidence</p>
                </div>

                <div className="p-3 bg-purple-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-purple-600" />
                    <span className="text-sm">Salary Inflation</span>
                  </div>
                  <p className="text-xs text-gray-600 mb-2">
                    AI/ML salaries projected to rise 12-15% in Q1 2025
                  </p>
                  <Progress value={85} className="h-2" />
                  <p className="text-xs text-gray-500 mt-1">85% confidence</p>
                </div>

                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Talent Availability</span>
                  </div>
                  <p className="text-xs text-gray-600 mb-2">
                    Potential talent influx from recent tech layoffs
                  </p>
                  <Progress value={72} className="h-2" />
                  <p className="text-xs text-gray-500 mt-1">72% confidence</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Recommended Actions</CardTitle>
                <CardDescription>Prioritized by potential impact</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px]">
                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center text-xs">
                          1
                        </div>
                        <span className="text-sm">Review ML Engineer Compensation</span>
                      </div>
                      <p className="text-xs text-gray-600 ml-8">
                        Competitors raised salaries. Risk losing candidates.
                      </p>
                    </div>

                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center text-xs">
                          2
                        </div>
                        <span className="text-sm">Start Proactive AI Sourcing</span>
                      </div>
                      <p className="text-xs text-gray-600 ml-8">
                        Build pipeline before demand spike in Q1.
                      </p>
                    </div>

                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-full bg-yellow-100 flex items-center justify-center text-xs">
                          3
                        </div>
                        <span className="text-sm">Optimize Remote Job Postings</span>
                      </div>
                      <p className="text-xs text-gray-600 ml-8">
                        45% more applicants for remote-first roles.
                      </p>
                    </div>

                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-xs">
                          4
                        </div>
                        <span className="text-sm">Explore Contract-to-Hire</span>
                      </div>
                      <p className="text-xs text-gray-600 ml-8">
                        Reduce time-to-fill for critical DevOps roles.
                      </p>
                    </div>

                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-xs">
                          5
                        </div>
                        <span className="text-sm">Re-engage Silver Medalists</span>
                      </div>
                      <p className="text-xs text-gray-600 ml-8">
                        156 past candidates now match open roles.
                      </p>
                    </div>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

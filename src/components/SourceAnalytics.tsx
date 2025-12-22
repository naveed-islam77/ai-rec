import { BarChart3, TrendingUp, TrendingDown, Users, Clock, Target, Download, Calendar } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
} from 'recharts';

const sourcingVolumeData = [
  { month: 'Jan', linkedin: 45, github: 32, indeed: 15, stackoverflow: 8 },
  { month: 'Feb', linkedin: 52, github: 38, indeed: 18, stackoverflow: 12 },
  { month: 'Mar', linkedin: 61, github: 45, indeed: 22, stackoverflow: 15 },
  { month: 'Apr', linkedin: 58, github: 41, indeed: 19, stackoverflow: 11 },
  { month: 'May', linkedin: 70, github: 51, indeed: 25, stackoverflow: 18 },
  { month: 'Jun', linkedin: 82, github: 59, indeed: 31, stackoverflow: 20 },
];

const conversionFunnelData = [
  { stage: 'Sourced', count: 247, percentage: 100 },
  { stage: 'Imported', count: 89, percentage: 36 },
  { stage: 'Contacted', count: 54, percentage: 22 },
  { stage: 'Responded', count: 23, percentage: 9 },
  { stage: 'Interviewed', count: 12, percentage: 5 },
];

const sourceDistributionData = [
  { name: 'LinkedIn', value: 127, color: '#0077B5' },
  { name: 'GitHub', value: 89, color: '#333333' },
  { name: 'Indeed', value: 31, color: '#2164F3' },
  { name: 'Stack Overflow', value: 18, color: '#F48024' },
];

const responseRateData = [
  { source: 'GitHub', rate: 18, color: '#333333' },
  { source: 'LinkedIn', rate: 12, color: '#0077B5' },
  { source: 'Indeed', rate: 9, color: '#2164F3' },
  { source: 'Stack Overflow', rate: 7, color: '#F48024' },
];

const timeToSourceData = [
  { week: 'Week 1', avgTime: 35 },
  { week: 'Week 2', avgTime: 28 },
  { week: 'Week 3', avgTime: 25 },
  { week: 'Week 4', avgTime: 23 },
];

export function SourceAnalytics() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl">Sourcing Analytics</h2>
          <p className="text-sm text-gray-600 mt-1">
            Track performance and optimize your sourcing strategy
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="30days">
            <SelectTrigger className="w-40">
              <Calendar className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="year">This year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Candidates Sourced</span>
            <Users className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl mb-1">247</div>
          <div className="flex items-center gap-1 text-xs">
            <TrendingUp className="w-3 h-3 text-green-600" />
            <span className="text-green-600">+23% vs last month</span>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Import Rate</span>
            <Target className="w-4 h-4 text-green-600" />
          </div>
          <div className="text-2xl mb-1">36%</div>
          <div className="flex items-center gap-1 text-xs">
            <TrendingUp className="w-3 h-3 text-green-600" />
            <span className="text-green-600">+4% vs last month</span>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Avg Response Rate</span>
            <BarChart3 className="w-4 h-4 text-orange-600" />
          </div>
          <div className="text-2xl mb-1">12%</div>
          <div className="flex items-center gap-1 text-xs">
            <TrendingUp className="w-3 h-3 text-green-600" />
            <span className="text-green-600">+2% vs manual</span>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Avg Time to Source</span>
            <Clock className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl mb-1">23m</div>
          <div className="flex items-center gap-1 text-xs">
            <TrendingDown className="w-3 h-3 text-green-600" />
            <span className="text-green-600">-12m vs last month</span>
          </div>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-2 gap-6">
        {/* Sourcing Volume Over Time */}
        <Card className="p-6">
          <h3 className="text-base mb-4">Sourcing Volume by Platform</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={sourcingVolumeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="linkedin" stackId="a" fill="#0077B5" name="LinkedIn" />
              <Bar dataKey="github" stackId="a" fill="#333333" name="GitHub" />
              <Bar dataKey="indeed" stackId="a" fill="#2164F3" name="Indeed" />
              <Bar dataKey="stackoverflow" stackId="a" fill="#F48024" name="Stack Overflow" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Source Distribution */}
        <Card className="p-6">
          <h3 className="text-base mb-4">Source Distribution</h3>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={sourceDistributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {sourceDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Conversion Funnel */}
      <Card className="p-6">
        <h3 className="text-base mb-4">Conversion Funnel</h3>
        <div className="space-y-3">
          {conversionFunnelData.map((stage, index) => (
            <div key={stage.stage}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm">{stage.stage}</span>
                  <Badge variant="secondary">{stage.count} candidates</Badge>
                </div>
                <span className="text-sm text-gray-600">{stage.percentage}%</span>
              </div>
              <div className="relative">
                <Progress value={stage.percentage} className="h-8" />
                {index < conversionFunnelData.length - 1 && (
                  <div className="text-xs text-gray-500 mt-1">
                    Drop-off: {conversionFunnelData[index].count - conversionFunnelData[index + 1].count} candidates
                    ({((1 - conversionFunnelData[index + 1].count / conversionFunnelData[index].count) * 100).toFixed(0)}%)
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-2 gap-6">
        {/* Response Rate by Source */}
        <Card className="p-6">
          <h3 className="text-base mb-4">Response Rate by Source</h3>
          <div className="space-y-4">
            {responseRateData.map(source => (
              <div key={source.source}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">{source.source}</span>
                  <span className="text-sm">{source.rate}%</span>
                </div>
                <Progress value={source.rate} className="h-3" style={{ '--progress-color': source.color } as any} />
              </div>
            ))}
          </div>
          <div className="mt-6 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-start gap-2">
              <TrendingUp className="w-4 h-4 text-blue-600 mt-0.5" />
              <div className="text-sm">
                <p className="text-blue-900 mb-1">Best Performing Source</p>
                <p className="text-blue-700">GitHub candidates have 50% higher response rate than average</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Time to Source Trend */}
        <Card className="p-6">
          <h3 className="text-base mb-4">Average Time to Source (minutes)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={timeToSourceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="avgTime" stroke="#8b5cf6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
          <div className="mt-4 p-3 bg-purple-50 rounded-lg border border-purple-200">
            <div className="flex items-start gap-2">
              <Clock className="w-4 h-4 text-purple-600 mt-0.5" />
              <div className="text-sm">
                <p className="text-purple-900 mb-1">Efficiency Improvement</p>
                <p className="text-purple-700">AI sourcing is 34% faster than manual sourcing</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Platform Performance Comparison */}
      <Card className="p-6">
        <h3 className="text-base mb-4">Platform Performance Comparison</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 text-sm">Platform</th>
                <th className="text-right py-3 px-4 text-sm">Sourced</th>
                <th className="text-right py-3 px-4 text-sm">Imported</th>
                <th className="text-right py-3 px-4 text-sm">Import Rate</th>
                <th className="text-right py-3 px-4 text-sm">Response Rate</th>
                <th className="text-right py-3 px-4 text-sm">Avg Time</th>
                <th className="text-right py-3 px-4 text-sm">Quality Score</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#0077B5]"></div>
                    LinkedIn
                  </div>
                </td>
                <td className="text-right py-3 px-4">127</td>
                <td className="text-right py-3 px-4">48</td>
                <td className="text-right py-3 px-4">38%</td>
                <td className="text-right py-3 px-4">12%</td>
                <td className="text-right py-3 px-4">18m</td>
                <td className="text-right py-3 px-4">
                  <Badge className="bg-green-500">High</Badge>
                </td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#333333]"></div>
                    GitHub
                  </div>
                </td>
                <td className="text-right py-3 px-4">89</td>
                <td className="text-right py-3 px-4">35</td>
                <td className="text-right py-3 px-4">39%</td>
                <td className="text-right py-3 px-4">18%</td>
                <td className="text-right py-3 px-4">25m</td>
                <td className="text-right py-3 px-4">
                  <Badge className="bg-green-500">High</Badge>
                </td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#2164F3]"></div>
                    Indeed
                  </div>
                </td>
                <td className="text-right py-3 px-4">31</td>
                <td className="text-right py-3 px-4">9</td>
                <td className="text-right py-3 px-4">29%</td>
                <td className="text-right py-3 px-4">9%</td>
                <td className="text-right py-3 px-4">32m</td>
                <td className="text-right py-3 px-4">
                  <Badge variant="secondary">Medium</Badge>
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#F48024]"></div>
                    Stack Overflow
                  </div>
                </td>
                <td className="text-right py-3 px-4">18</td>
                <td className="text-right py-3 px-4">6</td>
                <td className="text-right py-3 px-4">33%</td>
                <td className="text-right py-3 px-4">7%</td>
                <td className="text-right py-3 px-4">28m</td>
                <td className="text-right py-3 px-4">
                  <Badge variant="secondary">Medium</Badge>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      {/* Insights */}
      <Card className="p-6 bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
        <h3 className="text-base mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-purple-600" />
          AI-Generated Insights
        </h3>
        <div className="space-y-3">
          <div className="p-3 bg-white rounded-lg">
            <div className="flex items-start gap-2">
              <TrendingUp className="w-4 h-4 text-green-600 mt-1" />
              <div>
                <p className="text-sm mb-1">GitHub is your best-performing source with 18% response rate</p>
                <p className="text-xs text-gray-600">Consider increasing GitHub search frequency</p>
              </div>
            </div>
          </div>
          <div className="p-3 bg-white rounded-lg">
            <div className="flex items-start gap-2">
              <Clock className="w-4 h-4 text-purple-600 mt-1" />
              <div>
                <p className="text-sm mb-1">Your sourcing efficiency has improved by 34% this month</p>
                <p className="text-xs text-gray-600">AI-powered search is saving you ~8 hours per week</p>
              </div>
            </div>
          </div>
          <div className="p-3 bg-white rounded-lg">
            <div className="flex items-start gap-2">
              <Target className="w-4 h-4 text-blue-600 mt-1" />
              <div>
                <p className="text-sm mb-1">Your import rate of 36% is above industry average (28%)</p>
                <p className="text-xs text-gray-600">Quality of sourced candidates is excellent</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

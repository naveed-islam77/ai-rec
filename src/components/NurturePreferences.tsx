import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';
import { 
  Settings, 
  Mail,
  Bell,
  Shield,
  UserX,
  CheckCircle2,
  AlertCircle,
  Download,
  Trash2,
  Archive,
  Clock
} from 'lucide-react';
import { toast } from 'sonner';

export default function NurturePreferences() {
  const [globalSettings, setGlobalSettings] = useState({
    emailsEnabled: true,
    frequency: 'weekly',
    includeJobAlerts: true,
    includeCareerAdvice: true,
    includeCompanyNews: true,
    respectQuietHours: true
  });

  const unsubscribedCandidates = [
    {
      id: '1',
      name: 'John Smith',
      email: 'john@example.com',
      unsubscribedDate: '2024-10-15',
      reason: 'Too frequent'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      unsubscribedDate: '2024-10-20',
      reason: 'Not interested'
    },
    {
      id: '3',
      name: 'Mike Davis',
      email: 'mike@example.com',
      unsubscribedDate: '2024-10-28',
      reason: 'Found a job'
    }
  ];

  const complianceStats = [
    {
      label: 'Unsubscribe Rate',
      value: '1.2%',
      status: 'good',
      icon: UserX
    },
    {
      label: 'Bounce Rate',
      value: '0.8%',
      status: 'good',
      icon: AlertCircle
    },
    {
      label: 'Spam Reports',
      value: '0.1%',
      status: 'excellent',
      icon: Shield
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="flex items-center gap-2">
            <Settings className="w-6 h-6 text-gray-600" />
            Preferences & Compliance
          </h2>
          <p className="text-muted-foreground">
            Manage email preferences and subscription settings
          </p>
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export Settings
        </Button>
      </div>

      {/* Compliance Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {complianceStats.map((stat, index) => {
          const Icon = stat.icon;
          const statusColor = stat.status === 'excellent' ? 'text-green-600' :
                            stat.status === 'good' ? 'text-blue-600' :
                            'text-orange-600';
          return (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <Badge 
                      variant="secondary" 
                      className={`mt-1 ${
                        stat.status === 'excellent' ? 'bg-green-100 text-green-700' :
                        stat.status === 'good' ? 'bg-blue-100 text-blue-700' :
                        'bg-orange-100 text-orange-700'
                      }`}
                    >
                      {stat.status}
                    </Badge>
                  </div>
                  <Icon className={`w-8 h-8 ${statusColor}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Global Email Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Global Email Settings</CardTitle>
          <CardDescription>Default preferences for all campaigns</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Email Communications</Label>
              <p className="text-sm text-muted-foreground">
                Master switch for all nurture emails
              </p>
            </div>
            <Switch
              checked={globalSettings.emailsEnabled}
              onCheckedChange={(checked) => 
                setGlobalSettings(prev => ({ ...prev, emailsEnabled: checked }))
              }
            />
          </div>

          <Separator />

          <div>
            <Label>Default Email Frequency</Label>
            <Select
              value={globalSettings.frequency}
              onValueChange={(value) => 
                setGlobalSettings(prev => ({ ...prev, frequency: value }))
              }
            >
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly (Recommended)</SelectItem>
                <SelectItem value="biweekly">Bi-weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground mt-1">
              Maximum email frequency across all campaigns
            </p>
          </div>

          <Separator />

          <div className="space-y-4">
            <Label>Content Preferences</Label>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <p className="text-sm font-medium">Job Alerts</p>
                <p className="text-xs text-muted-foreground">
                  Include matching job opportunities
                </p>
              </div>
              <Switch
                checked={globalSettings.includeJobAlerts}
                onCheckedChange={(checked) => 
                  setGlobalSettings(prev => ({ ...prev, includeJobAlerts: checked }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <p className="text-sm font-medium">Career Advice</p>
                <p className="text-xs text-muted-foreground">
                  Tips, insights, and educational content
                </p>
              </div>
              <Switch
                checked={globalSettings.includeCareerAdvice}
                onCheckedChange={(checked) => 
                  setGlobalSettings(prev => ({ ...prev, includeCareerAdvice: checked }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <p className="text-sm font-medium">Company News</p>
                <p className="text-xs text-muted-foreground">
                  Updates about your recruitment agency
                </p>
              </div>
              <Switch
                checked={globalSettings.includeCompanyNews}
                onCheckedChange={(checked) => 
                  setGlobalSettings(prev => ({ ...prev, includeCompanyNews: checked }))
                }
              />
            </div>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Respect Quiet Hours</Label>
              <p className="text-sm text-muted-foreground">
                Don't send emails between 8 PM - 8 AM in recipient's timezone
              </p>
            </div>
            <Switch
              checked={globalSettings.respectQuietHours}
              onCheckedChange={(checked) => 
                setGlobalSettings(prev => ({ ...prev, respectQuietHours: checked }))
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Unsubscribe Management */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Unsubscribed Candidates</CardTitle>
              <CardDescription>
                Manage candidates who opted out of emails
              </CardDescription>
            </div>
            <Badge variant="secondary" className="text-sm">
              {unsubscribedCandidates.length} total
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {unsubscribedCandidates.length === 0 ? (
              <div className="text-center py-8 border-2 border-dashed rounded-lg">
                <CheckCircle2 className="w-12 h-12 mx-auto text-green-600 mb-3" />
                <p className="font-semibold">No unsubscribes</p>
                <p className="text-sm text-muted-foreground">
                  All candidates are actively receiving emails
                </p>
              </div>
            ) : (
              unsubscribedCandidates.map(candidate => (
                <div key={candidate.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold">{candidate.name}</h4>
                        <Badge variant="secondary" className="bg-red-100 text-red-700">
                          <UserX className="w-3 h-3 mr-1" />
                          Unsubscribed
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{candidate.email}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {candidate.unsubscribedDate}
                        </span>
                        <span>Reason: {candidate.reason}</span>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" title="Re-subscribe">
                        <Mail className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" title="Archive">
                        <Archive className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Compliance Features */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-600" />
            Compliance Features
          </CardTitle>
          <CardDescription>Built-in compliance with email regulations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-green-900">GDPR Compliant</p>
                <p className="text-sm text-green-700">
                  All emails include clear unsubscribe links and data processing notices
                </p>
              </div>
            </div>

            <div className="flex gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-green-900">CAN-SPAM Act</p>
                <p className="text-sm text-green-700">
                  One-click unsubscribe and physical address included in all emails
                </p>
              </div>
            </div>

            <div className="flex gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-green-900">Consent Tracking</p>
                <p className="text-sm text-green-700">
                  Automatic logging of opt-in, opt-out, and preference changes
                </p>
              </div>
            </div>

            <div className="flex gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-green-900">Suppression Lists</p>
                <p className="text-sm text-green-700">
                  Automatic exclusion of unsubscribed and bounced addresses
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preference Center Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Candidate Preference Center</CardTitle>
          <CardDescription>What candidates see when managing preferences</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border-2 rounded-lg p-6 bg-gray-50">
            <h3 className="font-semibold mb-4">Email Preferences</h3>
            
            <div className="space-y-4 bg-white p-4 rounded border">
              <div>
                <Label>Email Frequency</Label>
                <Select defaultValue="weekly" disabled>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Email Types</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="jobs" defaultChecked disabled />
                    <label htmlFor="jobs" className="text-sm">Job opportunities</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="advice" defaultChecked disabled />
                    <label htmlFor="advice" className="text-sm">Career advice</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="news" defaultChecked disabled />
                    <label htmlFor="news" className="text-sm">Company updates</label>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="flex gap-2">
                <Button size="sm" disabled>Save Preferences</Button>
                <Button size="sm" variant="outline" disabled>
                  Unsubscribe from All
                </Button>
              </div>
            </div>

            <p className="text-xs text-muted-foreground mt-4">
              Preview only - candidates access this via email footer links
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Best Practices */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Email Compliance Best Practices</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="flex gap-2">
            <Shield className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium">Honor unsubscribes immediately</p>
              <p className="text-xs text-muted-foreground">
                Process opt-outs within 24 hours (automatically handled)
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium">Make unsubscribe easy</p>
              <p className="text-xs text-muted-foreground">
                One-click unsubscribe link in every email footer
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <AlertCircle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium">Monitor bounce rates</p>
              <p className="text-xs text-muted-foreground">
                Keep below 2% to maintain sender reputation
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Bell className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium">Respect frequency preferences</p>
              <p className="text-xs text-muted-foreground">
                Never exceed candidate's chosen email frequency
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

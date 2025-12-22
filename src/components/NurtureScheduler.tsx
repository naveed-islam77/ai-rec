import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  Clock, 
  Calendar,
  Zap,
  TrendingUp,
  Sun,
  Moon,
  Coffee,
  Sunset,
  Globe,
  Users,
  Mail,
  Pause,
  Play
} from 'lucide-react';

export default function NurtureScheduler() {
  const [smartScheduling, setSmartScheduling] = useState(true);
  const [respectTimezones, setRespectTimezones] = useState(true);
  const [avoidWeekends, setAvoidWeekends] = useState(true);
  const [pauseDuringHolidays, setPauseDuringHolidays] = useState(true);

  const upcomingSends = [
    {
      campaign: 'New Candidate Welcome',
      recipients: 23,
      scheduledTime: '2024-11-04 09:00 AM EST',
      optimized: true,
      status: 'scheduled'
    },
    {
      campaign: 'Senior React Dev Nurture',
      recipients: 34,
      scheduledTime: '2024-11-04 02:00 PM EST',
      optimized: true,
      status: 'scheduled'
    },
    {
      campaign: 'Re-engagement Campaign',
      recipients: 89,
      scheduledTime: '2024-11-05 10:00 AM EST',
      optimized: true,
      status: 'scheduled'
    },
    {
      campaign: 'Job Match Alert Series',
      recipients: 28,
      scheduledTime: '2024-11-05 03:00 PM EST',
      optimized: true,
      status: 'scheduled'
    }
  ];

  const timeSlots = [
    { time: '8 AM - 10 AM', label: 'Early Morning', icon: Coffee, performance: 58, color: 'text-orange-600' },
    { time: '10 AM - 12 PM', label: 'Late Morning', icon: Sun, performance: 76, color: 'text-yellow-600' },
    { time: '12 PM - 2 PM', label: 'Lunch Time', icon: Coffee, performance: 52, color: 'text-red-600' },
    { time: '2 PM - 4 PM', label: 'Afternoon', icon: Sunset, performance: 84, color: 'text-green-600' },
    { time: '4 PM - 6 PM', label: 'Late Afternoon', icon: Moon, performance: 69, color: 'text-blue-600' },
    { time: '6 PM - 8 PM', label: 'Evening', icon: Moon, performance: 41, color: 'text-purple-600' }
  ];

  const dayPerformance = [
    { day: 'Monday', opens: 73, clicks: 28 },
    { day: 'Tuesday', opens: 81, clicks: 34 },
    { day: 'Wednesday', opens: 79, clicks: 32 },
    { day: 'Thursday', opens: 76, clicks: 30 },
    { day: 'Friday', opens: 65, clicks: 24 },
    { day: 'Saturday', opens: 42, clicks: 15 },
    { day: 'Sunday', opens: 38, clicks: 12 }
  ];

  const upcomingHolidays = [
    { date: '2024-11-28', name: 'Thanksgiving' },
    { date: '2024-12-25', name: 'Christmas' },
    { date: '2025-01-01', name: 'New Year\'s Day' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="flex items-center gap-2">
            <Clock className="w-6 h-6 text-blue-600" />
            Smart Scheduler
          </h2>
          <p className="text-muted-foreground">
            Optimize send times for maximum engagement
          </p>
        </div>
      </div>

      {/* Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Scheduling Settings</CardTitle>
          <CardDescription>Configure intelligent send time optimization</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-purple-600" />
                Smart Scheduling (AI-Powered)
              </Label>
              <p className="text-sm text-muted-foreground">
                Automatically optimize send times based on recipient behavior
              </p>
            </div>
            <Switch checked={smartScheduling} onCheckedChange={setSmartScheduling} />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-blue-600" />
                Respect Time Zones
              </Label>
              <p className="text-sm text-muted-foreground">
                Send emails at the optimal time in each recipient's timezone
              </p>
            </div>
            <Switch checked={respectTimezones} onCheckedChange={setRespectTimezones} />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-green-600" />
                Avoid Weekends
              </Label>
              <p className="text-sm text-muted-foreground">
                Don't send emails on Saturdays and Sundays
              </p>
            </div>
            <Switch checked={avoidWeekends} onCheckedChange={setAvoidWeekends} />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="flex items-center gap-2">
                <Pause className="w-4 h-4 text-orange-600" />
                Pause During Holidays
              </Label>
              <p className="text-sm text-muted-foreground">
                Automatically pause campaigns during major holidays
              </p>
            </div>
            <Switch checked={pauseDuringHolidays} onCheckedChange={setPauseDuringHolidays} />
          </div>

          <div className="pt-4 border-t">
            <Label>Send Rate Limit</Label>
            <div className="flex items-center gap-2 mt-2">
              <Select defaultValue="100">
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                  <SelectItem value="200">200</SelectItem>
                  <SelectItem value="500">500</SelectItem>
                  <SelectItem value="unlimited">Unlimited</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-sm text-muted-foreground">emails per hour</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Limit sending rate to maintain deliverability
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Best Times */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              Best Send Times
            </CardTitle>
            <CardDescription>Based on historical open rates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {timeSlots.map((slot, index) => {
                const Icon = slot.icon;
                return (
                  <div key={index} className="border rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Icon className={`w-4 h-4 ${slot.color}`} />
                        <span className="font-medium text-sm">{slot.label}</span>
                      </div>
                      <Badge 
                        variant={slot.performance > 70 ? 'default' : 'secondary'}
                        className={slot.performance > 70 ? 'bg-green-600' : ''}
                      >
                        {slot.performance}%
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="text-xs text-muted-foreground">{slot.time}</p>
                      <div className="flex-1">
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div
                            className={`h-full rounded-full ${
                              slot.performance > 70 ? 'bg-green-600' :
                              slot.performance > 50 ? 'bg-yellow-500' :
                              'bg-red-500'
                            }`}
                            style={{ width: `${slot.performance}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm font-medium text-green-900">Recommendation</p>
              <p className="text-xs text-green-700 mt-1">
                Schedule important campaigns between 2-4 PM for best results
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Day Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              Day of Week Performance
            </CardTitle>
            <CardDescription>Open and click rates by day</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {dayPerformance.map((day, index) => (
                <div key={index} className="border rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-sm">{day.day}</span>
                    <div className="flex gap-2">
                      <Badge variant="outline" className="text-xs">
                        {day.opens}% opens
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {day.clicks}% clicks
                      </Badge>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-full rounded-full ${
                        day.opens > 70 ? 'bg-green-600' :
                        day.opens > 60 ? 'bg-blue-600' :
                        day.opens > 40 ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`}
                      style={{ width: `${day.opens}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm font-medium text-blue-900">Recommendation</p>
              <p className="text-xs text-blue-700 mt-1">
                Tuesday and Wednesday show highest engagement. Avoid weekends.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Sends */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Scheduled Sends</CardTitle>
              <CardDescription>Upcoming email batches</CardDescription>
            </div>
            <Badge variant="secondary" className="text-sm">
              {upcomingSends.length} queued
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {upcomingSends.map((send, index) => (
              <div key={index} className="border rounded-lg p-4 flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold">{send.campaign}</h4>
                    {send.optimized && (
                      <Badge variant="secondary" className="text-xs bg-purple-100 text-purple-700">
                        <Zap className="w-3 h-3 mr-1" />
                        AI Optimized
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {send.recipients} recipients
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {send.scheduledTime}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-600">
                    <Play className="w-3 h-3 mr-1" />
                    Scheduled
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Holidays */}
      {pauseDuringHolidays && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-red-600" />
              Upcoming Holiday Pauses
            </CardTitle>
            <CardDescription>Campaigns will automatically pause on these dates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {upcomingHolidays.map((holiday, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Pause className="w-4 h-4 text-orange-600" />
                    <div>
                      <p className="font-medium text-sm">{holiday.name}</p>
                      <p className="text-xs text-muted-foreground">{holiday.date}</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                    Auto-pause
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Smart Scheduling Tips</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="flex gap-2">
            <Zap className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium">AI learns from your data</p>
              <p className="text-xs text-muted-foreground">
                The more emails you send, the smarter the scheduling becomes
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Globe className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium">Timezone detection</p>
              <p className="text-xs text-muted-foreground">
                Automatically detects candidate timezone from their location
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <TrendingUp className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium">Continuous optimization</p>
              <p className="text-xs text-muted-foreground">
                Send times adjust automatically based on performance
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

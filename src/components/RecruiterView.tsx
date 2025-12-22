import { useState } from 'react';
import { GripVertical, Users, MapPin, Building2, Sparkles, Calendar, TrendingUp, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { jobs } from './JobList';

interface RecruiterViewProps {
  onSelectJob: (jobId: number) => void;
}

interface JobPosition {
  id: number;
  title: string;
  client: string;
  location: string;
  applicants: number;
  aiMatches: number;
  fillRate: number;
  urgency: 'High' | 'Medium' | 'Low';
  daysOpen: number;
}

interface KanbanColumn {
  id: string;
  title: string;
  color: string;
  jobs: JobPosition[];
}

const recruiters = [
  { name: 'Emily Rodriguez', email: 'emily.r@agency.com' },
  { name: 'Michael Chen', email: 'michael.c@agency.com' },
  { name: 'Sarah Martinez', email: 'sarah.m@agency.com' },
  { name: 'David Park', email: 'david.p@agency.com' },
];

export function RecruiterView({ onSelectJob }: RecruiterViewProps) {
  const [selectedRecruiter, setSelectedRecruiter] = useState('Emily Rodriguez');
  
  const getRecruiterJobs = (recruiterName: string): JobPosition[] => {
    return jobs
      .filter(job => job.recruiter.name === recruiterName)
      .map(job => ({
        id: job.id,
        title: job.title,
        client: job.client,
        location: job.location,
        applicants: job.applicants,
        aiMatches: job.aiMatches,
        fillRate: job.fillRate,
        urgency: job.fillRate < 50 ? 'High' : job.fillRate < 70 ? 'Medium' : 'Low',
        daysOpen: parseInt(job.posted.split(' ')[0]) || 7,
      }));
  };

  const categorizeJobs = (recruiterJobs: JobPosition[]): KanbanColumn[] => {
    return [
      {
        id: 'sourcing',
        title: 'Sourcing Candidates',
        color: 'bg-orange-100',
        jobs: recruiterJobs.filter(job => job.fillRate < 30),
      },
      {
        id: 'screening',
        title: 'Active Screening',
        color: 'bg-blue-100',
        jobs: recruiterJobs.filter(job => job.fillRate >= 30 && job.fillRate < 60),
      },
      {
        id: 'interviewing',
        title: 'Interviewing',
        color: 'bg-purple-100',
        jobs: recruiterJobs.filter(job => job.fillRate >= 60 && job.fillRate < 80),
      },
      {
        id: 'closing',
        title: 'Making Offers',
        color: 'bg-green-100',
        jobs: recruiterJobs.filter(job => job.fillRate >= 80),
      },
    ];
  };

  const [columns, setColumns] = useState(categorizeJobs(getRecruiterJobs(selectedRecruiter)));
  const [draggedJob, setDraggedJob] = useState<{ job: JobPosition; fromColumn: string } | null>(null);

  const handleRecruiterChange = (recruiterName: string) => {
    setSelectedRecruiter(recruiterName);
    setColumns(categorizeJobs(getRecruiterJobs(recruiterName)));
  };

  const handleDragStart = (job: JobPosition, fromColumn: string) => {
    setDraggedJob({ job, fromColumn });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (toColumnId: string) => {
    if (!draggedJob) return;

    const { job, fromColumn } = draggedJob;
    if (fromColumn === toColumnId) return;

    setColumns(prevColumns => {
      return prevColumns.map(col => {
        if (col.id === fromColumn) {
          return {
            ...col,
            jobs: col.jobs.filter(j => j.id !== job.id),
          };
        }
        if (col.id === toColumnId) {
          return {
            ...col,
            jobs: [...col.jobs, job],
          };
        }
        return col;
      });
    });

    setDraggedJob(null);
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'High':
        return 'bg-red-100 text-red-700';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'Low':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const recruiterJobs = getRecruiterJobs(selectedRecruiter);
  const totalApplicants = recruiterJobs.reduce((sum, job) => sum + job.applicants, 0);
  const totalAIMatches = recruiterJobs.reduce((sum, job) => sum + job.aiMatches, 0);
  const avgFillRate = recruiterJobs.length > 0 
    ? Math.round(recruiterJobs.reduce((sum, job) => sum + job.fillRate, 0) / recruiterJobs.length)
    : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1>Recruiter Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your job openings and candidate pipeline</p>
        </div>
        <div className="w-[300px]">
          <Select value={selectedRecruiter} onValueChange={handleRecruiterChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {recruiters.map((recruiter) => (
                <SelectItem key={recruiter.email} value={recruiter.name}>
                  {recruiter.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Positions</p>
                <p className="text-2xl mt-1">{recruiterJobs.length}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Building2 className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Applicants</p>
                <p className="text-2xl mt-1">{totalApplicants}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">AI Matches</p>
                <p className="text-2xl mt-1">{totalAIMatches}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <Sparkles className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Fill Rate</p>
                <p className="text-2xl mt-1">{avgFillRate}%</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Kanban Board */}
      <Card>
        <CardHeader>
          <CardTitle>Position Pipeline</CardTitle>
          <p className="text-sm text-gray-600">Drag and drop positions to update their status</p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto pb-4">
            <div className="flex gap-4 min-w-max">
              {columns.map((column) => (
                <div
                  key={column.id}
                  className="flex-shrink-0 w-[340px]"
                  onDragOver={handleDragOver}
                  onDrop={() => handleDrop(column.id)}
                >
                  <div className={`${column.color} rounded-t-lg px-4 py-3`}>
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm">{column.title}</h3>
                      <Badge variant="secondary" className="text-xs">
                        {column.jobs.length}
                      </Badge>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-b-lg p-3 min-h-[500px] space-y-3">
                    {column.jobs.map((job) => (
                      <Card
                        key={job.id}
                        className="cursor-move hover:shadow-md transition-shadow bg-white"
                        draggable
                        onDragStart={() => handleDragStart(job, column.id)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start gap-2 mb-3">
                            <GripVertical className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2 mb-1">
                                <p className="text-sm line-clamp-2">{job.title}</p>
                                <Badge className={getUrgencyColor(job.urgency)} variant="secondary">
                                  {job.urgency}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-1 mt-1">
                                <Building2 className="w-3 h-3 text-gray-400" />
                                <p className="text-xs text-gray-600 truncate">{job.client}</p>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-1 text-xs text-gray-600 mb-3">
                            <MapPin className="w-3 h-3" />
                            {job.location}
                          </div>

                          {/* Progress */}
                          <div className="mb-3 p-2 bg-gray-50 rounded">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs">Fill Progress</span>
                              <span className="text-xs">{job.fillRate}%</span>
                            </div>
                            <Progress value={job.fillRate} className="h-1.5" />
                          </div>

                          {/* Stats */}
                          <div className="grid grid-cols-3 gap-2 mb-3 text-center">
                            <div className="p-2 bg-blue-50 rounded">
                              <p className="text-xs text-gray-600">Applicants</p>
                              <p className="text-sm">{job.applicants}</p>
                            </div>
                            <div className="p-2 bg-purple-50 rounded">
                              <p className="text-xs text-gray-600">AI Match</p>
                              <p className="text-sm">{job.aiMatches}</p>
                            </div>
                            <div className="p-2 bg-orange-50 rounded">
                              <p className="text-xs text-gray-600">Days</p>
                              <p className="text-sm">{job.daysOpen}d</p>
                            </div>
                          </div>

                          {/* Actions */}
                          <Button
                            size="sm"
                            variant="outline"
                            className="w-full h-8 text-xs"
                            onClick={() => onSelectJob(job.id)}
                          >
                            <Eye className="w-3 h-3 mr-2" />
                            View Details
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                    {column.jobs.length === 0 && (
                      <div className="flex items-center justify-center h-32 text-sm text-gray-400">
                        No positions in this stage
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <Calendar className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm">High Priority</p>
                <p className="text-xs text-gray-600 mt-1">
                  {recruiterJobs.filter(j => j.urgency === 'High').length} positions need immediate attention
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Sparkles className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm">AI Recommendations</p>
                <p className="text-xs text-gray-600 mt-1">
                  Review {totalAIMatches} AI-matched candidates
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm">Performance</p>
                <p className="text-xs text-gray-600 mt-1">
                  {avgFillRate}% average fill rate across positions
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

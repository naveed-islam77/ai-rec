import { useState } from 'react';
import { Briefcase, MapPin, Clock, DollarSign, Users, Plus, Search, Filter, Grid, List, ExternalLink, Link2, Copy } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { JobList } from './JobList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { JobApplicationChatbot } from './JobApplicationChatbot';
import { toast } from 'sonner@2.0.3';
import { copyToClipboard } from '../utils/clipboard';

const jobsData = [
  {
    id: 1,
    title: 'Senior Full Stack Developer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    salary: '$120k - $160k',
    applicants: 47,
    aiMatches: 12,
    posted: '2 days ago',
    status: 'Open',
    description: 'Looking for an experienced full stack developer to join our growing team.',
  },
  {
    id: 2,
    title: 'Product Manager',
    department: 'Product',
    location: 'San Francisco, CA',
    type: 'Full-time',
    salary: '$130k - $170k',
    applicants: 89,
    aiMatches: 23,
    posted: '5 days ago',
    status: 'Open',
    description: 'Lead product strategy and roadmap for our flagship product.',
  },
  {
    id: 3,
    title: 'UX Designer',
    department: 'Design',
    location: 'New York, NY',
    type: 'Full-time',
    salary: '$90k - $120k',
    applicants: 124,
    aiMatches: 31,
    posted: '1 week ago',
    status: 'Open',
    description: 'Create beautiful and intuitive user experiences for our customers.',
  },
  {
    id: 4,
    title: 'Data Scientist',
    department: 'Data & Analytics',
    location: 'Remote',
    type: 'Full-time',
    salary: '$110k - $150k',
    applicants: 67,
    aiMatches: 18,
    posted: '3 days ago',
    status: 'Open',
    description: 'Analyze complex data sets and build predictive models.',
  },
  {
    id: 5,
    title: 'DevOps Engineer',
    department: 'Engineering',
    location: 'Austin, TX',
    type: 'Full-time',
    salary: '$100k - $140k',
    applicants: 52,
    aiMatches: 15,
    posted: '4 days ago',
    status: 'Open',
    description: 'Manage infrastructure and deployment pipelines.',
  },
  {
    id: 6,
    title: 'Marketing Manager',
    department: 'Marketing',
    location: 'Los Angeles, CA',
    type: 'Full-time',
    salary: '$95k - $130k',
    applicants: 103,
    aiMatches: 28,
    posted: '1 week ago',
    status: 'Open',
    description: 'Drive marketing strategy and lead generation campaigns.',
  },
];

interface JobsProps {
  onSelectJob: (jobId: number) => void;
}

export function Jobs({ onSelectJob }: JobsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showApplicationChatbot, setShowApplicationChatbot] = useState(false);
  const [selectedJobForApplication, setSelectedJobForApplication] = useState<typeof jobsData[0] | null>(null);

  const filteredJobs = jobsData.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = filterDepartment === 'all' || job.department === filterDepartment;
    return matchesSearch && matchesDepartment;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Job Openings</h1>
          <p className="text-gray-600 mt-2">Manage and track all your open positions</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Post New Job
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Job Posting</DialogTitle>
              <DialogDescription>
                Create a new job opening for your organization
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <Label htmlFor="job-title">Job Title</Label>
                <Input id="job-title" placeholder="e.g. Senior Software Engineer" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="department">Department</Label>
                  <Select>
                    <SelectTrigger id="department">
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="engineering">Engineering</SelectItem>
                      <SelectItem value="product">Product</SelectItem>
                      <SelectItem value="design">Design</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="sales">Sales</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="e.g. Remote, San Francisco" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="type">Employment Type</Label>
                  <Select>
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-time">Full-time</SelectItem>
                      <SelectItem value="part-time">Part-time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="salary">Salary Range</Label>
                  <Input id="salary" placeholder="e.g. $100k - $140k" />
                </div>
              </div>
              <div>
                <Label htmlFor="description">Job Description</Label>
                <Textarea id="description" rows={6} placeholder="Enter detailed job description..." />
              </div>
              <Button className="w-full">Create Job Posting</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search jobs..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={filterDepartment} onValueChange={setFilterDepartment}>
          <SelectTrigger className="w-[200px]">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Department" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Departments</SelectItem>
            <SelectItem value="Engineering">Engineering</SelectItem>
            <SelectItem value="Product">Product</SelectItem>
            <SelectItem value="Design">Design</SelectItem>
            <SelectItem value="Marketing">Marketing</SelectItem>
            <SelectItem value="Data & Analytics">Data & Analytics</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex gap-2 border rounded-lg p-1">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            <Grid className="w-4 h-4 mr-2" />
            Grid
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            <List className="w-4 h-4 mr-2" />
            List
          </Button>
        </div>
      </div>

      {/* Jobs Views */}
      {viewMode === 'list' ? (
        <JobList onSelectJob={onSelectJob} />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredJobs.map((job) => (
          <Card key={job.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onSelectJob(job.id)}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Briefcase className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{job.title}</CardTitle>
                    <p className="text-gray-600 text-sm mt-1">{job.department}</p>
                  </div>
                </div>
                <Badge variant="secondary">{job.status}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 text-sm">{job.description}</p>
              
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  {job.location}
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="w-4 h-4" />
                  {job.type}
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <DollarSign className="w-4 h-4" />
                  {job.salary}
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Users className="w-4 h-4" />
                  {job.applicants} applicants
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-600">{job.aiMatches} AI matches</span>
                </div>
                <span className="text-sm text-gray-500">{job.posted}</span>
              </div>
              
              <div className="flex gap-2 pt-4">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="flex-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    const publicLink = `${window.location.origin}/apply/${job.id}`;
                    copyToClipboard(publicLink).then(success => {
                      if (success) {
                        toast.success('Application link copied!');
                      } else {
                        toast.error('Failed to copy link');
                      }
                    });
                  }}
                >
                  <Copy className="w-3 h-3 mr-1" />
                  Copy Public Link
                </Button>
                <Button 
                  size="sm" 
                  className="flex-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedJobForApplication(job);
                    setShowApplicationChatbot(true);
                  }}
                >
                  <ExternalLink className="w-3 h-3 mr-1" />
                  Preview Apply
                </Button>
              </div>
            </CardContent>
          </Card>
          ))}
        </div>
      )}
      
      {/* Application Chatbot */}
      {showApplicationChatbot && selectedJobForApplication && (
        <JobApplicationChatbot
          jobId={selectedJobForApplication.id}
          jobTitle={selectedJobForApplication.title}
          jobDescription={selectedJobForApplication.description}
          companyName="TechCorp Solutions"
          onClose={() => {
            setShowApplicationChatbot(false);
            setSelectedJobForApplication(null);
          }}
        />
      )}
    </div>
  );
}

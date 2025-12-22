import { MapPin, DollarSign, Clock, Users, Building2, Calendar, Sparkles } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Progress } from './ui/progress';

interface Job {
  id: number;
  title: string;
  client: string;
  department: string;
  location: string;
  type: string;
  salary: string;
  status: 'Open' | 'Closed' | 'On Hold';
  applicants: number;
  posted: string;
  recruiter: {
    name: string;
    avatar: string;
    email: string;
  };
  aiMatches: number;
  fillRate: number;
}

const jobs: Job[] = [
  {
    id: 1,
    title: 'Senior Full Stack Developer',
    client: 'TechCorp Solutions',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    salary: '$120k - $160k',
    status: 'Open',
    applicants: 47,
    posted: '2 days ago',
    recruiter: {
      name: 'Emily Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
      email: 'emily.r@agency.com',
    },
    aiMatches: 12,
    fillRate: 65,
  },
  {
    id: 2,
    title: 'Product Manager',
    client: 'InnovateLabs Inc',
    department: 'Product',
    location: 'New York, NY',
    type: 'Full-time',
    salary: '$130k - $180k',
    status: 'Open',
    applicants: 38,
    posted: '5 days ago',
    recruiter: {
      name: 'Michael Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      email: 'michael.c@agency.com',
    },
    aiMatches: 8,
    fillRate: 52,
  },
  {
    id: 3,
    title: 'UX/UI Designer',
    client: 'DesignHub Co',
    department: 'Design',
    location: 'San Francisco, CA',
    type: 'Full-time',
    salary: '$100k - $140k',
    status: 'Open',
    applicants: 52,
    posted: '1 week ago',
    recruiter: {
      name: 'Sarah Martinez',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
      email: 'sarah.m@agency.com',
    },
    aiMatches: 15,
    fillRate: 73,
  },
  {
    id: 4,
    title: 'DevOps Engineer',
    client: 'CloudScale Systems',
    department: 'Engineering',
    location: 'Austin, TX',
    type: 'Full-time',
    salary: '$110k - $150k',
    status: 'Open',
    applicants: 31,
    posted: '3 days ago',
    recruiter: {
      name: 'Emily Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
      email: 'emily.r@agency.com',
    },
    aiMatches: 9,
    fillRate: 58,
  },
  {
    id: 5,
    title: 'Data Scientist',
    client: 'DataDriven Analytics',
    department: 'Data',
    location: 'Remote',
    type: 'Full-time',
    salary: '$140k - $190k',
    status: 'Open',
    applicants: 44,
    posted: '4 days ago',
    recruiter: {
      name: 'David Park',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
      email: 'david.p@agency.com',
    },
    aiMatches: 11,
    fillRate: 68,
  },
  {
    id: 6,
    title: 'Marketing Manager',
    client: 'BrandBoost Media',
    department: 'Marketing',
    location: 'Los Angeles, CA',
    type: 'Full-time',
    salary: '$90k - $130k',
    status: 'On Hold',
    applicants: 29,
    posted: '1 week ago',
    recruiter: {
      name: 'Sarah Martinez',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
      email: 'sarah.m@agency.com',
    },
    aiMatches: 6,
    fillRate: 45,
  },
  {
    id: 7,
    title: 'Mobile Developer (iOS)',
    client: 'AppVentures Ltd',
    department: 'Engineering',
    location: 'Seattle, WA',
    type: 'Full-time',
    salary: '$115k - $155k',
    status: 'Open',
    applicants: 36,
    posted: '6 days ago',
    recruiter: {
      name: 'Michael Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      email: 'michael.c@agency.com',
    },
    aiMatches: 10,
    fillRate: 61,
  },
  {
    id: 8,
    title: 'Sales Director',
    client: 'SalesForce Pro',
    department: 'Sales',
    location: 'Boston, MA',
    type: 'Full-time',
    salary: '$150k - $200k',
    status: 'Open',
    applicants: 22,
    posted: '2 days ago',
    recruiter: {
      name: 'David Park',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
      email: 'david.p@agency.com',
    },
    aiMatches: 5,
    fillRate: 38,
  },
];

interface JobListProps {
  onSelectJob: (jobId: number) => void;
  filterRecruiter?: string;
}

export function JobList({ onSelectJob, filterRecruiter }: JobListProps) {
  const filteredJobs = filterRecruiter
    ? jobs.filter(job => job.recruiter.name === filterRecruiter)
    : jobs;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open':
        return 'bg-green-100 text-green-700';
      case 'Closed':
        return 'bg-gray-100 text-gray-700';
      case 'On Hold':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <Card>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Position</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Recruiter</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Applicants</TableHead>
                <TableHead>AI Matches</TableHead>
                <TableHead>Fill Rate</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredJobs.map((job) => (
                <TableRow key={job.id} className="hover:bg-gray-50">
                  <TableCell>
                    <div>
                      <p 
                        className="cursor-pointer hover:text-blue-600 transition-colors"
                        onClick={() => onSelectJob(job.id)}
                      >
                        {job.title}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="text-xs">
                          {job.type}
                        </Badge>
                        <span className="text-xs text-gray-500">{job.posted}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-sm">{job.client}</p>
                        <p className="text-xs text-gray-500">{job.department}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <ImageWithFallback
                        src={job.recruiter.avatar}
                        alt={job.recruiter.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-sm">{job.recruiter.name}</p>
                        <p className="text-xs text-gray-500">{job.recruiter.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-sm">{job.location}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span className="text-sm">{job.applicants}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-purple-600" />
                      <span className="text-sm">{job.aiMatches}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <Progress value={job.fillRate} className="flex-1 h-1.5" />
                        <span className="text-xs text-gray-600 whitespace-nowrap">{job.fillRate}%</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(job.status)}>
                      {job.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onSelectJob(job.id)}
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

export { jobs };

import { useState, useEffect } from 'react';
import { JobApplicationChatbot } from './JobApplicationChatbot';
import { Briefcase, MapPin, Clock, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

// Mock job data - in real implementation, fetch based on job ID from URL
const jobsData = [
  {
    id: 1,
    title: 'Senior Full Stack Developer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    salary: '$120k - $160k',
    status: 'Open',
    description: 'We are looking for an experienced full stack developer to join our growing engineering team. You will work on cutting-edge technologies and help build scalable web applications.',
    companyName: 'TechCorp Solutions',
    companyLogo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200',
    requirements: [
      '5+ years of experience in full-stack development',
      'Strong proficiency in React and Node.js',
      'Experience with TypeScript and modern web technologies',
      'Excellent problem-solving and communication skills'
    ],
    benefits: [
      'Remote work flexibility',
      'Competitive salary and equity',
      'Health, dental, and vision insurance',
      '401(k) matching',
      'Professional development budget'
    ]
  },
  {
    id: 2,
    title: 'Product Manager',
    department: 'Product',
    location: 'San Francisco, CA',
    type: 'Full-time',
    salary: '$130k - $170k',
    status: 'Open',
    description: 'Lead product strategy and roadmap for our flagship product. Work closely with engineering, design, and stakeholders.',
    companyName: 'InnovateCo',
    companyLogo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200',
    requirements: [
      '3+ years of product management experience',
      'Strong analytical and data-driven mindset',
      'Experience with agile methodologies',
      'Excellent stakeholder management skills'
    ],
    benefits: [
      'Hybrid work model',
      'Competitive compensation',
      'Stock options',
      'Unlimited PTO',
      'Learning and development opportunities'
    ]
  }
];

interface PublicJobApplicationProps {
  jobId?: number;
}

export function PublicJobApplication({ jobId = 1 }: PublicJobApplicationProps) {
  const [showChatbot, setShowChatbot] = useState(false);
  const job = jobsData.find(j => j.id === jobId) || jobsData[0];

  useEffect(() => {
    // Auto-open chatbot after a brief delay to let users see the job details
    const timer = setTimeout(() => {
      setShowChatbot(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-xl">
          <CardHeader className="border-b bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <Briefcase className="w-6 h-6" />
                  <CardTitle className="text-2xl">{job.title}</CardTitle>
                </div>
                <p className="text-blue-100">{job.companyName}</p>
              </div>
              <Badge variant="secondary" className="bg-white text-blue-600">
                {job.status}
              </Badge>
            </div>
          </CardHeader>
          
          <CardContent className="p-6 space-y-6">
            {/* Job Details */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-4 h-4 text-blue-600" />
                <span className="text-sm">{job.location}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="w-4 h-4 text-blue-600" />
                <span className="text-sm">{job.type}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <DollarSign className="w-4 h-4 text-blue-600" />
                <span className="text-sm">{job.salary}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Briefcase className="w-4 h-4 text-blue-600" />
                <span className="text-sm">{job.department}</span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="font-semibold mb-2">About the Role</h3>
              <p className="text-gray-700">{job.description}</p>
            </div>

            {/* Requirements */}
            <div>
              <h3 className="font-semibold mb-2">Requirements</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                {job.requirements.map((req, idx) => (
                  <li key={idx}>{req}</li>
                ))}
              </ul>
            </div>

            {/* Benefits */}
            <div>
              <h3 className="font-semibold mb-2">Benefits</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                {job.benefits.map((benefit, idx) => (
                  <li key={idx}>{benefit}</li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            {!showChatbot && (
              <div className="pt-4 border-t">
                <button
                  onClick={() => setShowChatbot(true)}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-shadow"
                >
                  Apply Now
                </button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Application Chatbot */}
        {showChatbot && (
          <JobApplicationChatbot
            jobId={job.id}
            jobTitle={job.title}
            jobDescription={job.description}
            companyName={job.companyName}
            onClose={() => setShowChatbot(false)}
          />
        )}
      </div>
    </div>
  );
}

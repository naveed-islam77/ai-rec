import { useState } from 'react';
import { ArrowLeft, MapPin, DollarSign, Clock, Users, Sparkles, TrendingUp, Edit, Building2, Wand2, Mail, MessageSquare, CheckCircle2, Send, CheckSquare, Square, Grid3x3, List, Search, Phone } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { KanbanBoard } from './KanbanBoard';
import { InterviewSheet } from './InterviewSheet';
import { toast } from 'sonner@2.0.3';

interface JobDetailProps {
  jobId: number;
  onBack: () => void;
  onSelectCandidate: (candidateId: number) => void;
}

export function JobDetail({ jobId, onBack, onSelectCandidate }: JobDetailProps) {
  const [jobDetail, setJobDetail] = useState({
    id: 1,
    title: 'Senior Full Stack Developer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    salary: '$120k - $160k',
    posted: '2 days ago',
    status: 'Open',
    clientName: 'TechCorp Solutions',
    hiringManager: 'John Smith',
    description: `We are looking for an experienced Senior Full Stack Developer to join our growing engineering team. You will be responsible for designing, developing, and maintaining our web applications using modern technologies.

In this role, you will work closely with product managers, designers, and other engineers to deliver high-quality features that delight our users. You'll have the opportunity to make architectural decisions and mentor junior developers.`,
    responsibilities: [
      'Design and implement scalable web applications using React and Node.js',
      'Collaborate with cross-functional teams to define and ship new features',
      'Write clean, maintainable, and well-tested code',
      'Participate in code reviews and provide constructive feedback',
      'Mentor junior developers and contribute to team growth',
      'Stay up-to-date with emerging technologies and best practices',
    ],
    requirements: [
      '5+ years of experience in full-stack web development',
      'Strong proficiency in React, Node.js, and TypeScript',
      'Experience with cloud platforms (AWS, GCP, or Azure)',
      'Solid understanding of database design and SQL',
      'Experience with CI/CD pipelines and DevOps practices',
      'Excellent communication and collaboration skills',
      'Bachelor\'s degree in Computer Science or related field',
    ],
    applicants: 47,
    topCandidates: [
      {
        id: 1,
        name: 'Sarah Johnson',
        title: 'Senior Full Stack Developer',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
        matchScore: 94,
        status: 'Interview',
      },
      {
        id: 4,
        name: 'David Park',
        title: 'Full Stack Engineer',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
        matchScore: 91,
        status: 'Screening',
      },
      {
        id: 7,
        name: 'Jennifer Lee',
        title: 'Software Engineer',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
        matchScore: 88,
        status: 'Screening',
      },
    ],
    suggestedCandidates: [
      {
        id: 1,
        name: 'Sarah Johnson',
        title: 'Senior Full Stack Developer',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
        matchScore: 94,
        skills: ['React', 'Node.js', 'Python', 'AWS'],
        experience: '8 years',
        location: 'San Francisco, CA',
        email: 'sarah.j@email.com',
        phone: '+1 (555) 123-4567',
        contacted: true,
        responded: true,
        responseStatus: 'interested',
        lastContact: '2024-10-30 10:30 AM',
      },
      {
        id: 4,
        name: 'David Park',
        title: 'Full Stack Engineer',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
        matchScore: 91,
        skills: ['React', 'Node.js', 'TypeScript', 'MongoDB'],
        experience: '7 years',
        location: 'Seattle, WA',
        email: 'dpark@email.com',
        phone: '+1 (555) 456-7890',
        contacted: false,
        responded: false,
        responseStatus: null,
        lastContact: null,
      },
      {
        id: 8,
        name: 'Jessica Chen',
        title: 'Full Stack Developer',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
        matchScore: 89,
        skills: ['React', 'Python', 'Django', 'PostgreSQL'],
        experience: '6 years',
        location: 'Remote',
        email: 'jchen@email.com',
        phone: '+1 (555) 789-0123',
        contacted: true,
        responded: false,
        responseStatus: null,
        lastContact: '2024-10-31 8:00 AM',
      },
      {
        id: 9,
        name: 'Alex Martinez',
        title: 'Senior Software Engineer',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400',
        matchScore: 87,
        skills: ['Node.js', 'Express', 'React', 'AWS'],
        experience: '9 years',
        location: 'Austin, TX',
        email: 'amartinez@email.com',
        phone: '+1 (555) 234-5678',
        contacted: false,
        responded: false,
        responseStatus: null,
        lastContact: null,
      },
      {
        id: 10,
        name: 'Rachel Green',
        title: 'Full Stack Developer',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400',
        matchScore: 85,
        skills: ['React', 'Node.js', 'MongoDB', 'Docker'],
        experience: '5 years',
        location: 'Boston, MA',
        email: 'rgreen@email.com',
        phone: '+1 (555) 345-6789',
        contacted: true,
        responded: true,
        responseStatus: 'interested',
        lastContact: '2024-10-29 3:20 PM',
      },
      {
        id: 11,
        name: 'Tom Wilson',
        title: 'Software Engineer',
        avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400',
        matchScore: 83,
        skills: ['TypeScript', 'React', 'GraphQL', 'Node.js'],
        experience: '4 years',
        location: 'New York, NY',
        email: 'twilson@email.com',
        phone: '+1 (555) 567-8901',
        contacted: false,
        responded: false,
        responseStatus: null,
        lastContact: null,
      },
    ],
    stats: {
      totalApplications: 47,
      aiMatches: 12,
      inScreening: 28,
      inInterview: 8,
      offered: 2,
    },
  });

  const [editMetadataOpen, setEditMetadataOpen] = useState(false);
  const [aiImproveOpen, setAiImproveOpen] = useState(false);
  const [improvingJD, setImprovingJD] = useState(false);
  const [improvedDescription, setImprovedDescription] = useState('');
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
  const [selectedCandidates, setSelectedCandidates] = useState<number[]>([]);
  const [contactMethod, setContactMethod] = useState<'email' | 'sms'>('email');
  const [contactMessage, setContactMessage] = useState('');
  const [generatingMessage, setGeneratingMessage] = useState(false);
  const [viewType, setViewType] = useState<'card' | 'list'>('card');
  const [searchTerm, setSearchTerm] = useState('');
  const [editForm, setEditForm] = useState({
    title: jobDetail.title,
    department: jobDetail.department,
    location: jobDetail.location,
    type: jobDetail.type,
    salary: jobDetail.salary,
    clientName: jobDetail.clientName,
    hiringManager: jobDetail.hiringManager,
  });

  const handleEditMetadata = () => {
    setJobDetail({
      ...jobDetail,
      ...editForm,
    });
    setEditMetadataOpen(false);
    toast.success('Job details updated successfully');
  };

  const handleImproveJD = () => {
    setImprovingJD(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const improved = `We are seeking an exceptional Senior Full Stack Developer to join our innovative engineering team at ${jobDetail.clientName}. This role offers a unique opportunity to shape the future of our web applications using cutting-edge technologies and modern development practices.

As a key member of our team, you will architect and develop scalable solutions that directly impact millions of users. You'll collaborate with talented product managers, designers, and engineers in an agile environment, making strategic technical decisions while mentoring the next generation of developers.

This position offers:
• Remote-first work culture with flexible hours
• Competitive compensation (${jobDetail.salary}) and equity package
• Opportunity to work with modern tech stack (React, Node.js, TypeScript)
• Professional development budget and conference attendance
• Collaborative team environment with strong engineering culture

Join us in building products that make a difference!`;

      setImprovedDescription(improved);
      setImprovingJD(false);
    }, 2000);
  };

  const handleApplyImprovedJD = () => {
    setJobDetail({
      ...jobDetail,
      description: improvedDescription,
    });
    setAiImproveOpen(false);
    toast.success('Job description updated with AI improvements');
  };

  const handleOpenContactDialog = (candidate: any, method: 'email' | 'sms') => {
    setSelectedCandidate(candidate);
    setContactMethod(method);
    const template = method === 'email'
      ? `Hi ${candidate.name.split(' ')[0]},\n\nI came across your profile and was impressed by your experience with ${candidate.skills.slice(0, 2).join(' and ')}. We have an exciting opportunity at ${jobDetail.clientName} for a ${jobDetail.title} role that I think would be a great fit for you.\n\nThe role offers:\n• ${jobDetail.location} work\n• Competitive salary (${jobDetail.salary})\n• Great team culture\n• Cutting-edge tech stack\n\nWould you be open to a brief call to discuss this opportunity?\n\nBest regards`
      : `Hi ${candidate.name.split(' ')[0]}! Quick question - would you be interested in a ${jobDetail.title} role at ${jobDetail.clientName}? Great comp + benefits. Let me know!`;
    setContactMessage(template);
    setContactDialogOpen(true);
  };

  const handleSendContact = () => {
    // If sending to multiple selected candidates
    if (selectedCandidates.length > 0) {
      const updatedCandidates = jobDetail.suggestedCandidates.map(c =>
        selectedCandidates.includes(c.id)
          ? { ...c, contacted: true, lastContact: new Date().toLocaleString() }
          : c
      );
      setJobDetail({
        ...jobDetail,
        suggestedCandidates: updatedCandidates,
      });
      setContactDialogOpen(false);
      setSelectedCandidates([]);
      toast.success(`${contactMethod === 'email' ? 'Email' : 'SMS'} sent to ${selectedCandidates.length} candidate(s)`);
    } else if (selectedCandidate) {
      // Single candidate contact
      const updatedCandidates = jobDetail.suggestedCandidates.map(c =>
        c.id === selectedCandidate.id
          ? { ...c, contacted: true, lastContact: new Date().toLocaleString() }
          : c
      );
      setJobDetail({
        ...jobDetail,
        suggestedCandidates: updatedCandidates,
      });
      setContactDialogOpen(false);
      toast.success(`${contactMethod === 'email' ? 'Email' : 'SMS'} sent to ${selectedCandidate.name}`);
    }
  };

  const toggleCandidateSelection = (candidateId: number) => {
    setSelectedCandidates(prev => 
      prev.includes(candidateId)
        ? prev.filter(id => id !== candidateId)
        : [...prev, candidateId]
    );
  };

  const toggleSelectAll = () => {
    const filteredCandidates = jobDetail.suggestedCandidates.filter(candidate => {
      const searchLower = searchTerm.toLowerCase();
      return searchTerm === '' || 
             candidate.name.toLowerCase().includes(searchLower) ||
             candidate.title.toLowerCase().includes(searchLower) ||
             candidate.location.toLowerCase().includes(searchLower) ||
             candidate.skills.some(s => s.toLowerCase().includes(searchLower));
    });
    
    const allFilteredSelected = filteredCandidates.every(c => selectedCandidates.includes(c.id));
    
    if (allFilteredSelected) {
      // Deselect all filtered candidates
      setSelectedCandidates(prev => prev.filter(id => !filteredCandidates.map(c => c.id).includes(id)));
    } else {
      // Select all filtered candidates
      const newSelections = [...new Set([...selectedCandidates, ...filteredCandidates.map(c => c.id)])];
      setSelectedCandidates(newSelections);
    }
  };

  const generateAIMessage = async (method: 'email' | 'sms') => {
    setGeneratingMessage(true);
    
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const candidatesList = selectedCandidates.length > 0
      ? jobDetail.suggestedCandidates.filter(c => selectedCandidates.includes(c.id))
      : [selectedCandidate];
    
    const firstName = candidatesList.length === 1 
      ? candidatesList[0].name.split(' ')[0]
      : 'there';
    
    const skills = candidatesList.length === 1
      ? candidatesList[0].skills.slice(0, 2).join(' and ')
      : 'your technical expertise';
    
    if (method === 'email') {
      const message = `Hi ${firstName},

I hope this message finds you well. I came across your profile and was genuinely impressed by your experience with ${skills}. Your background aligns exceptionally well with an exciting opportunity we have at ${jobDetail.clientName}.

We're looking for a ${jobDetail.title} to join our ${jobDetail.department} team. Based on your profile, I believe this could be an excellent fit for you.

Here's what makes this role special:
• ${jobDetail.location} - Great work-life balance
• Competitive compensation: ${jobDetail.salary}
• Work with cutting-edge technologies including ${jobDetail.requirements.slice(0, 2).join(', ')}
• Collaborative team environment with strong engineering culture
• Opportunity to make significant impact on products used by thousands

The role involves:
${jobDetail.responsibilities.slice(0, 3).map((r, i) => `${i + 1}. ${r}`).join('\n')}

Would you be open to a brief 15-minute call this week to explore this opportunity further? I'd love to learn more about your career goals and share additional details about the position.

Looking forward to hearing from you!

Best regards,
Recruitment Team`;
      setContactMessage(message);
    } else {
      const message = `Hi ${firstName}! I found your profile and think you'd be perfect for a ${jobDetail.title} role at ${jobDetail.clientName}. ${jobDetail.salary}, ${jobDetail.location}, great tech stack. Interested in a quick chat? Reply YES if you'd like to learn more!`;
      setContactMessage(message);
    }
    
    setGeneratingMessage(false);
  };

  const handleOpenMultiContactDialog = async (method: 'email' | 'sms') => {
    if (selectedCandidates.length === 0) {
      toast.error('Please select at least one candidate');
      return;
    }
    
    setContactMethod(method);
    setContactDialogOpen(true);
    setSelectedCandidate(null);
    
    // Generate AI message immediately
    await generateAIMessage(method);
  };

  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={onBack}>
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Jobs
      </Button>

      {/* Header */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div className="flex-1">
              <div className="flex items-start gap-3 mb-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-2xl">{jobDetail.title}</h1>
                  <p className="text-gray-600 mt-1">{jobDetail.department}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Building2 className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{jobDetail.clientName}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {jobDetail.location}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {jobDetail.type}
                </div>
                <div className="flex items-center gap-1">
                  <DollarSign className="w-4 h-4" />
                  {jobDetail.salary}
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {jobDetail.applicants} applicants
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <Badge className="bg-green-100 text-green-700">
                {jobDetail.status}
              </Badge>
            </div>
          </div>
          
          <div className="flex gap-3 mt-6 flex-wrap">
            {/* Edit Metadata Dialog */}
            <Dialog open={editMetadataOpen} onOpenChange={setEditMetadataOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Details
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Edit Job Details</DialogTitle>
                  <DialogDescription>
                    Update job information and requirements
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div>
                    <Label htmlFor="edit-title">Job Title</Label>
                    <Input
                      id="edit-title"
                      value={editForm.title}
                      onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="edit-client">Client Name</Label>
                      <Input
                        id="edit-client"
                        value={editForm.clientName}
                        onChange={(e) => setEditForm({ ...editForm, clientName: e.target.value })}
                        placeholder="e.g. TechCorp Solutions"
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-department">Department</Label>
                      <Input
                        id="edit-department"
                        value={editForm.department}
                        onChange={(e) => setEditForm({ ...editForm, department: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="edit-location">Location</Label>
                      <Input
                        id="edit-location"
                        value={editForm.location}
                        onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-type">Employment Type</Label>
                      <Select value={editForm.type} onValueChange={(value) => setEditForm({ ...editForm, type: value })}>
                        <SelectTrigger id="edit-type">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Full-time">Full-time</SelectItem>
                          <SelectItem value="Part-time">Part-time</SelectItem>
                          <SelectItem value="Contract">Contract</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="edit-salary">Salary Range</Label>
                      <Input
                        id="edit-salary"
                        value={editForm.salary}
                        onChange={(e) => setEditForm({ ...editForm, salary: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-manager">Hiring Manager</Label>
                      <Input
                        id="edit-manager"
                        value={editForm.hiringManager}
                        onChange={(e) => setEditForm({ ...editForm, hiringManager: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="flex gap-3 pt-4">
                    <Button onClick={handleEditMetadata} className="flex-1">
                      Save Changes
                    </Button>
                    <Button variant="outline" onClick={() => setEditMetadataOpen(false)} className="flex-1">
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            {/* AI Improve JD Dialog */}
            <Dialog open={aiImproveOpen} onOpenChange={setAiImproveOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Wand2 className="w-4 h-4 mr-2" />
                  Improve with AI
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-purple-600" />
                    AI-Powered Job Description Enhancement
                  </DialogTitle>
                  <DialogDescription>
                    Let AI improve your job description with SEO optimization, inclusive language, and engaging content
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-gray-700">
                      Our AI will analyze your job description and enhance it with:
                    </p>
                    <ul className="text-sm text-gray-600 mt-2 space-y-1 list-disc list-inside">
                      <li>More engaging and compelling language</li>
                      <li>Better structure and readability</li>
                      <li>SEO-optimized keywords for better visibility</li>
                      <li>Inclusive and bias-free language</li>
                    </ul>
                  </div>

                  <div>
                    <Label>Current Description</Label>
                    <div className="mt-2 p-4 bg-gray-50 rounded-lg border max-h-[200px] overflow-y-auto">
                      <p className="text-sm text-gray-700 whitespace-pre-line">{jobDetail.description}</p>
                    </div>
                  </div>

                  {!improvedDescription && !improvingJD && (
                    <Button onClick={handleImproveJD} className="w-full">
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate AI Improvements
                    </Button>
                  )}

                  {improvingJD && (
                    <div className="flex items-center justify-center py-8">
                      <div className="text-center space-y-3">
                        <div className="animate-spin w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full mx-auto"></div>
                        <p className="text-sm text-gray-600">AI is analyzing and improving your job description...</p>
                      </div>
                    </div>
                  )}

                  {improvedDescription && (
                    <>
                      <div>
                        <Label>AI-Improved Description</Label>
                        <div className="mt-2 p-4 bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg border border-purple-200 max-h-[300px] overflow-y-auto">
                          <p className="text-sm text-gray-700 whitespace-pre-line">{improvedDescription}</p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <Button onClick={handleApplyImprovedJD} className="flex-1">
                          Apply Improvements
                        </Button>
                        <Button variant="outline" onClick={() => setImprovedDescription('')} className="flex-1">
                          Regenerate
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </DialogContent>
            </Dialog>

            <Button 
              variant="outline"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(window.location.href);
                  toast.success('Job link copied to clipboard!');
                } catch (err) {
                  // Fallback for when clipboard API is blocked
                  const textArea = document.createElement('textarea');
                  textArea.value = window.location.href;
                  textArea.style.position = 'fixed';
                  textArea.style.left = '-999999px';
                  document.body.appendChild(textArea);
                  textArea.select();
                  try {
                    document.execCommand('copy');
                    toast.success('Job link copied to clipboard!');
                  } catch (e) {
                    toast.error('Failed to copy link. Please copy manually.');
                  }
                  document.body.removeChild(textArea);
                }
              }}
            >
              Share Job
            </Button>
            <Button 
              variant="outline"
              onClick={() => {
                toast.success('Position closed successfully');
              }}
            >
              Close Position
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Contact Candidate Dialog */}
      <Dialog open={contactDialogOpen} onOpenChange={setContactDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-600" />
              {contactMethod === 'email' ? 'Send Email' : 'Send SMS'} to {
                selectedCandidates.length > 0 
                  ? `${selectedCandidates.length} Candidate(s)` 
                  : selectedCandidate?.name
              }
            </DialogTitle>
            <DialogDescription>
              {contactMethod === 'email' 
                ? 'Compose and send an email to the selected candidate(s)' 
                : 'Send an SMS message to the selected candidate(s)'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            {/* Recipients */}
            {selectedCandidates.length > 0 && (
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm mb-2">Sending to:</p>
                <div className="flex flex-wrap gap-2">
                  {jobDetail.suggestedCandidates
                    .filter(c => selectedCandidates.includes(c.id))
                    .map(c => (
                      <Badge key={c.id} variant="secondary">
                        {c.name}
                      </Badge>
                    ))
                  }
                </div>
              </div>
            )}

            <div>
              <Label>Contact Method</Label>
              <div className="flex gap-2 mt-2">
                <Button
                  variant={contactMethod === 'email' ? 'default' : 'outline'}
                  onClick={async () => {
                    setContactMethod('email');
                    await generateAIMessage('email');
                  }}
                  className="flex-1"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Email
                </Button>
                <Button
                  variant={contactMethod === 'sms' ? 'default' : 'outline'}
                  onClick={async () => {
                    setContactMethod('sms');
                    await generateAIMessage('sms');
                  }}
                  className="flex-1"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  SMS
                </Button>
              </div>
            </div>
            
            <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
              <div className="flex items-start gap-2">
                <Sparkles className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm">AI-Generated Message</p>
                  <p className="text-xs text-gray-600 mt-1">
                    This message is personalized based on the job description, company details, and candidate profile
                  </p>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <Label>Message</Label>
                {generatingMessage && (
                  <span className="text-xs text-purple-600 flex items-center gap-1">
                    <div className="animate-spin w-3 h-3 border-2 border-purple-600 border-t-transparent rounded-full"></div>
                    Generating with AI...
                  </span>
                )}
              </div>
              {generatingMessage ? (
                <div className="border rounded-lg p-8 flex items-center justify-center bg-gray-50">
                  <div className="text-center">
                    <div className="animate-spin w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full mx-auto mb-3"></div>
                    <p className="text-sm text-gray-600">AI is crafting the perfect message...</p>
                  </div>
                </div>
              ) : (
                <Textarea
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  rows={contactMethod === 'email' ? 12 : 5}
                  className="mt-2"
                />
              )}
            </div>

            <div className="flex gap-2 justify-between">
              <Button 
                variant="outline" 
                onClick={async () => {
                  await generateAIMessage(contactMethod);
                  toast.success('Message regenerated with AI');
                }}
                className="gap-2"
                disabled={generatingMessage}
              >
                <Sparkles className="w-4 h-4" />
                Regenerate
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => {
                  setContactDialogOpen(false);
                  if (selectedCandidates.length === 0) {
                    setSelectedCandidate(null);
                  }
                }}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleSendContact} 
                  className="gap-2"
                  disabled={generatingMessage}
                >
                  <Send className="w-4 h-4" />
                  Send {contactMethod === 'email' ? 'Email' : 'SMS'}
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Tabs for different views */}
      <Tabs defaultValue="suggested" className="w-full">
        <TabsList className="grid w-full grid-cols-5 max-w-[1000px]">
          <TabsTrigger value="suggested">AI Suggested</TabsTrigger>
          <TabsTrigger value="pipeline">Candidate Pipeline</TabsTrigger>
          <TabsTrigger value="details">Job Details</TabsTrigger>
          <TabsTrigger value="interview">Interview Guide</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="suggested" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-purple-600" />
                      AI-Suggested Candidates
                    </CardTitle>
                    <p className="text-sm text-gray-600 mt-1">Reach out to highly matched candidates who haven't applied yet</p>
                  </div>
                  {selectedCandidates.length > 0 && (
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-sm">
                        {selectedCandidates.length} selected
                      </Badge>
                      <Button
                        onClick={() => handleOpenMultiContactDialog('email')}
                        size="sm"
                        className="gap-2"
                      >
                        <Mail className="w-4 h-4" />
                        Email Selected
                      </Button>
                      <Button
                        onClick={() => handleOpenMultiContactDialog('sms')}
                        size="sm"
                        variant="outline"
                        className="gap-2"
                      >
                        <MessageSquare className="w-4 h-4" />
                        Text Selected
                      </Button>
                    </div>
                  )}
                </div>

                {/* Search and View Controls */}
                <div className="flex items-center gap-3">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search candidates by name, title, skills, location..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <div className="flex items-center gap-1 border rounded-lg p-1">
                    <Button
                      variant={viewType === 'card' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewType('card')}
                      className="gap-2"
                    >
                      <Grid3x3 className="w-4 h-4" />
                      Card
                    </Button>
                    <Button
                      variant={viewType === 'list' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewType('list')}
                      className="gap-2"
                    >
                      <List className="w-4 h-4" />
                      List
                    </Button>
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Selection Controls */}
          <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg border">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleSelectAll}
              className="gap-2"
            >
              {selectedCandidates.length === jobDetail.suggestedCandidates.filter(c => {
                const searchLower = searchTerm.toLowerCase();
                return c.name.toLowerCase().includes(searchLower) ||
                       c.title.toLowerCase().includes(searchLower) ||
                       c.location.toLowerCase().includes(searchLower) ||
                       c.skills.some(s => s.toLowerCase().includes(searchLower));
              }).length ? (
                <>
                  <CheckSquare className="w-4 h-4" />
                  Deselect All
                </>
              ) : (
                <>
                  <Square className="w-4 h-4" />
                  Select All
                </>
              )}
            </Button>
            {selectedCandidates.length > 0 && (
              <p className="text-sm text-gray-600">
                {selectedCandidates.length} of {jobDetail.suggestedCandidates.filter(c => {
                  const searchLower = searchTerm.toLowerCase();
                  return c.name.toLowerCase().includes(searchLower) ||
                         c.title.toLowerCase().includes(searchLower) ||
                         c.location.toLowerCase().includes(searchLower) ||
                         c.skills.some(s => s.toLowerCase().includes(searchLower));
                }).length} candidates selected
              </p>
            )}
          </div>

          {/* Candidate Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Suggested Candidates</p>
                    <p className="text-2xl mt-1">{jobDetail.suggestedCandidates.length}</p>
                  </div>
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Contacted</p>
                    <p className="text-2xl mt-1">
                      {jobDetail.suggestedCandidates.filter(c => c.contacted).length}
                    </p>
                  </div>
                  <Send className="w-8 h-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Interested</p>
                    <p className="text-2xl mt-1">
                      {jobDetail.suggestedCandidates.filter(c => c.responseStatus === 'interested').length}
                    </p>
                  </div>
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Candidates Grid/List */}
          {(() => {
            const filteredCandidates = jobDetail.suggestedCandidates.filter(candidate => {
              const searchLower = searchTerm.toLowerCase();
              return searchTerm === '' || 
                     candidate.name.toLowerCase().includes(searchLower) ||
                     candidate.title.toLowerCase().includes(searchLower) ||
                     candidate.location.toLowerCase().includes(searchLower) ||
                     candidate.skills.some(s => s.toLowerCase().includes(searchLower));
            });

            if (filteredCandidates.length === 0) {
              return (
                <Card>
                  <CardContent className="py-12 text-center">
                    <Search className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <h3 className="text-lg mb-2">No candidates found</h3>
                    <p className="text-sm text-gray-600">
                      {searchTerm ? 'Try adjusting your search terms' : 'No candidates match the current criteria'}
                    </p>
                    {searchTerm && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setSearchTerm('')}
                        className="mt-4"
                      >
                        Clear Search
                      </Button>
                    )}
                  </CardContent>
                </Card>
              );
            }

            return viewType === 'card' ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredCandidates.map((candidate) => (
              <Card 
                key={candidate.id} 
                className={`hover:shadow-lg transition-all cursor-pointer ${
                  selectedCandidates.includes(candidate.id) ? 'ring-2 ring-blue-500 bg-blue-50/30' : ''
                }`}
                onClick={() => toggleCandidateSelection(candidate.id)}
              >
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="flex flex-col items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleCandidateSelection(candidate.id);
                        }}
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                          selectedCandidates.includes(candidate.id)
                            ? 'bg-blue-600 border-blue-600'
                            : 'border-gray-300 hover:border-blue-400'
                        }`}
                      >
                        {selectedCandidates.includes(candidate.id) && (
                          <CheckSquare className="w-4 h-4 text-white" />
                        )}
                      </button>
                      <ImageWithFallback
                        src={candidate.avatar}
                        alt={candidate.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <h3 className="truncate">{candidate.name}</h3>
                          <p className="text-sm text-gray-600 truncate">{candidate.title}</p>
                          <p className="text-xs text-gray-500 mt-1">{candidate.location}</p>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <div className="flex items-center gap-1 bg-purple-50 px-2 py-1 rounded">
                            <Sparkles className="w-3 h-3 text-purple-600" />
                            <span className="text-sm text-purple-600">{candidate.matchScore}%</span>
                          </div>
                          {candidate.responded && candidate.responseStatus === 'interested' && (
                            <Badge className="bg-green-100 text-green-700 text-xs">
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              Interested
                            </Badge>
                          )}
                          {candidate.contacted && !candidate.responded && (
                            <Badge variant="outline" className="text-xs">
                              <Clock className="w-3 h-3 mr-1" />
                              Awaiting Reply
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Skills */}
                      <div className="mt-3">
                        <div className="flex flex-wrap gap-1">
                          {candidate.skills.map((skill) => (
                            <Badge key={skill} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Experience and Contact */}
                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-xs text-gray-600">{candidate.experience} experience</span>
                      </div>

                      {candidate.contacted && candidate.lastContact && (
                        <div className="mt-3 p-2 bg-blue-50 rounded text-xs text-gray-600">
                          Last contacted: {candidate.lastContact}
                        </div>
                      )}

                      {candidate.responded && candidate.responseStatus === 'interested' && (
                        <div className="mt-3 p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
                          <div className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                            <div className="flex-1">
                              <p className="text-xs">Candidate expressed interest!</p>
                              <Button
                                size="sm"
                                className="mt-2 w-full"
                                onClick={() => onSelectCandidate(candidate.id)}
                              >
                                View Full Profile
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="mt-4 pt-4 border-t flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 gap-2"
                          onClick={() => handleOpenContactDialog(candidate, 'email')}
                          disabled={candidate.contacted}
                        >
                          <Mail className="w-4 h-4" />
                          {candidate.contacted ? 'Email Sent' : 'Email'}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 gap-2"
                          onClick={() => handleOpenContactDialog(candidate, 'sms')}
                          disabled={candidate.contacted}
                        >
                          <MessageSquare className="w-4 h-4" />
                          {candidate.contacted ? 'SMS Sent' : 'SMS'}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onSelectCandidate(candidate.id)}
                        >
                          View
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
              </div>
            ) : (
              /* List View */
              <div className="space-y-3">
                {filteredCandidates.map((candidate) => (
                  <Card 
                    key={candidate.id} 
                    className={`hover:shadow-md transition-all cursor-pointer ${
                      selectedCandidates.includes(candidate.id) ? 'ring-2 ring-blue-500 bg-blue-50/30' : ''
                    }`}
                    onClick={() => toggleCandidateSelection(candidate.id)}
                  >
                    <CardContent className="py-4">
                      <div className="flex items-center gap-4">
                        {/* Checkbox */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleCandidateSelection(candidate.id);
                          }}
                          className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors flex-shrink-0 ${
                            selectedCandidates.includes(candidate.id)
                              ? 'bg-blue-600 border-blue-600'
                              : 'border-gray-300 hover:border-blue-400'
                          }`}
                        >
                          {selectedCandidates.includes(candidate.id) && (
                            <CheckSquare className="w-4 h-4 text-white" />
                          )}
                        </button>

                        {/* Avatar */}
                        <ImageWithFallback
                          src={candidate.avatar}
                          alt={candidate.name}
                          className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                        />

                        {/* Candidate Info */}
                        <div className="flex-1 min-w-0 grid grid-cols-12 gap-4 items-center">
                          {/* Name & Title */}
                          <div className="col-span-3">
                            <h3 className="truncate">{candidate.name}</h3>
                            <p className="text-sm text-gray-600 truncate">{candidate.title}</p>
                          </div>

                          {/* Location */}
                          <div className="col-span-2 flex items-center gap-1 text-sm text-gray-600">
                            <MapPin className="w-4 h-4 flex-shrink-0" />
                            <span className="truncate">{candidate.location}</span>
                          </div>

                          {/* Experience */}
                          <div className="col-span-2 text-sm text-gray-600">
                            {candidate.experience}
                          </div>

                          {/* Skills */}
                          <div className="col-span-3 flex flex-wrap gap-1">
                            {candidate.skills.slice(0, 3).map((skill) => (
                              <Badge key={skill} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                            {candidate.skills.length > 3 && (
                              <Badge variant="secondary" className="text-xs">
                                +{candidate.skills.length - 3}
                              </Badge>
                            )}
                          </div>

                          {/* Match Score */}
                          <div className="col-span-2 flex items-center justify-end gap-3">
                            <div className="flex items-center gap-1 bg-purple-50 px-2 py-1 rounded">
                              <Sparkles className="w-3 h-3 text-purple-600" />
                              <span className="text-sm text-purple-600">{candidate.matchScore}%</span>
                            </div>
                          </div>
                        </div>

                        {/* Status & Actions */}
                        <div className="flex items-center gap-2 flex-shrink-0">
                          {candidate.responded && candidate.responseStatus === 'interested' && (
                            <Badge className="bg-green-100 text-green-700 text-xs">
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              Interested
                            </Badge>
                          )}
                          {candidate.contacted && !candidate.responded && (
                            <Badge variant="outline" className="text-xs">
                              <Clock className="w-3 h-3 mr-1" />
                              Awaiting
                            </Badge>
                          )}
                          
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-1"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenContactDialog(candidate, 'email');
                            }}
                            disabled={candidate.contacted}
                          >
                            <Mail className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-1"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenContactDialog(candidate, 'sms');
                            }}
                            disabled={candidate.contacted}
                          >
                            <Phone className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectCandidate(candidate.id);
                            }}
                          >
                            View
                          </Button>
                        </div>
                      </div>

                      {/* Additional Info Row */}
                      {(candidate.contacted && candidate.lastContact) && (
                        <div className="mt-3 pt-3 border-t flex items-center gap-2 text-xs text-gray-600">
                          <Clock className="w-3 h-3" />
                          Last contacted: {candidate.lastContact}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            );
          })()}
        </TabsContent>

        <TabsContent value="pipeline" className="space-y-6 mt-6">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <Card>
              <CardContent className="pt-4">
                <p className="text-2xl">{jobDetail.stats.totalApplications}</p>
                <p className="text-xs text-gray-600 mt-1">Applications</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <p className="text-2xl text-purple-600">{jobDetail.stats.aiMatches}</p>
                <p className="text-xs text-gray-600 mt-1">AI Matches</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <p className="text-2xl">{jobDetail.stats.inScreening}</p>
                <p className="text-xs text-gray-600 mt-1">Screening</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <p className="text-2xl">{jobDetail.stats.inInterview}</p>
                <p className="text-xs text-gray-600 mt-1">Interviewing</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <p className="text-2xl">{jobDetail.stats.offered}</p>
                <p className="text-xs text-gray-600 mt-1">Offers</p>
              </CardContent>
            </Card>
          </div>

          {/* Kanban Board */}
          <Card>
            <CardHeader>
              <CardTitle>Recruitment Pipeline</CardTitle>
              <p className="text-sm text-gray-600">Drag and drop candidates to move them through the hiring stages</p>
            </CardHeader>
            <CardContent>
              <KanbanBoard onSelectCandidate={onSelectCandidate} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="details" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Job Details */}
              <Card>
                <CardContent className="pt-6">
                  <Tabs defaultValue="description">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="description">Description</TabsTrigger>
                      <TabsTrigger value="requirements">Requirements</TabsTrigger>
                      <TabsTrigger value="responsibilities">Responsibilities</TabsTrigger>
                    </TabsList>

                    <TabsContent value="description" className="mt-4">
                      <p className="text-gray-600 whitespace-pre-line">{jobDetail.description}</p>
                    </TabsContent>

                    <TabsContent value="requirements" className="mt-4">
                      <ul className="space-y-3">
                        {jobDetail.requirements.map((req, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                            <span className="text-gray-600">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </TabsContent>

                    <TabsContent value="responsibilities" className="mt-4">
                      <ul className="space-y-3">
                        {jobDetail.responsibilities.map((resp, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                            <span className="text-gray-600">{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-purple-600" />
                    Top AI Matches
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {jobDetail.topCandidates.map((candidate) => (
                    <div
                      key={candidate.id}
                      className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => onSelectCandidate(candidate.id)}
                    >
                      <div className="flex items-start gap-3">
                        <ImageWithFallback
                          src={candidate.avatar}
                          alt={candidate.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm truncate">{candidate.name}</p>
                          <p className="text-xs text-gray-600 truncate">{candidate.title}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Progress value={candidate.matchScore} className="flex-1 h-1.5" />
                            <span className="text-xs text-purple-600">{candidate.matchScore}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => {
                      // Scroll to pipeline tab
                      const pipelineTab = document.querySelector('[value="pipeline"]');
                      if (pipelineTab instanceof HTMLElement) {
                        pipelineTab.click();
                      }
                    }}
                  >
                    View All Candidates
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Posting Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div>
                    <p className="text-gray-600">Client</p>
                    <p className="mt-1">{jobDetail.clientName}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Posted</p>
                    <p className="mt-1">{jobDetail.posted}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Job ID</p>
                    <p className="mt-1">JOB-{jobDetail.id.toString().padStart(5, '0')}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Hiring Manager</p>
                    <p className="mt-1">{jobDetail.hiringManager}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="interview" className="space-y-6 mt-6">
          <InterviewSheet 
            jobTitle={jobDetail.title}
            jobDescription={jobDetail.description}
          />
        </TabsContent>

        <TabsContent value="insights" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>AI Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
                  <TrendingUp className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm">Average time to hire: 18 days</p>
                    <p className="text-xs text-gray-600 mt-1">32% faster than similar roles</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 p-3 bg-purple-50 rounded-lg">
                  <Sparkles className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm">Peak application time</p>
                    <p className="text-xs text-gray-600 mt-1">Most applications received on Tuesdays at 10 AM</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 p-3 bg-green-50 rounded-lg">
                  <Sparkles className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm">High-quality candidate pool</p>
                    <p className="text-xs text-gray-600 mt-1">12 candidates with 85+ match score</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recommended Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 border border-blue-200 bg-blue-50 rounded-lg">
                  <p className="text-sm">Review top 3 AI-matched candidates</p>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="mt-2 w-full"
                    onClick={() => {
                      const suggestedTab = document.querySelector('[value="suggested"]');
                      if (suggestedTab instanceof HTMLElement) {
                        suggestedTab.click();
                      }
                    }}
                  >
                    View Candidates
                  </Button>
                </div>
                <div className="p-3 border border-purple-200 bg-purple-50 rounded-lg">
                  <p className="text-sm">Schedule interviews for screening stage</p>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="mt-2 w-full"
                    onClick={() => {
                      toast.success('Interview scheduling feature coming soon!');
                    }}
                  >
                    Schedule Now
                  </Button>
                </div>
                <div className="p-3 border border-orange-200 bg-orange-50 rounded-lg">
                  <p className="text-sm">Update job description for better reach</p>
                  <Button size="sm" variant="outline" className="mt-2 w-full" onClick={() => setAiImproveOpen(true)}>
                    Improve with AI
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

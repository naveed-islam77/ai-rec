import { useState, useRef } from 'react';
import { ArrowLeft, Mail, Phone, MapPin, Briefcase, GraduationCap, FileText, Sparkles, Calendar, CheckCircle, TrendingUp, MessageSquare, Send, Download, Building2, Clock, XCircle, CircleCheck, Linkedin, CheckCircle2, Share2, Eye, EyeOff, Edit, Save, X, User, Plus, FolderOpen, Paperclip, Check, CheckCheck, Image as ImageIcon, ExternalLink, FileIcon, History, UserCheck, Trash2, PhoneIncoming, PhoneOutgoing, ChevronDown, ChevronRight } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Separator } from './ui/separator';
import { InterviewSheet } from './InterviewSheet';
import { Input } from './ui/input';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { ScrollArea } from './ui/scroll-area';
import { AIEmailComposer } from './AIEmailComposer';
import { projectId, publicAnonKey } from '../utils/supabase/info';

const candidateDetail = {
  id: 1,
  name: 'Sarah Johnson',
  title: 'Senior Full Stack Developer',
  location: 'San Francisco, CA',
  email: 'sarah.j@email.com',
  phone: '+1 (555) 123-4567',
  linkedinUrl: 'https://linkedin.com/in/sarahjohnson',
  openToWork: true,
  experience: '8 years',
  education: 'BS Computer Science, Stanford University',
  skills: ['React', 'Node.js', 'Python', 'AWS', 'MongoDB', 'TypeScript', 'Docker', 'GraphQL'],
  status: 'Interview',
  appliedFor: 'Senior Full Stack Developer',
  appliedDate: 'October 25, 2025',
  aiMatchScore: 94,
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
  summary: 'Highly skilled full-stack developer with 8 years of experience building scalable web applications. Proven track record of leading technical teams and delivering complex projects on time.',
  workHistory: [
    {
      company: 'TechCorp Inc.',
      role: 'Senior Software Engineer',
      period: '2021 - Present',
      description: 'Led development of microservices architecture serving 2M+ users. Mentored team of 5 junior developers.',
      supervisor: 'John Smith',
      supervisorTitle: 'VP of Engineering',
      supervisorEmail: 'john.smith@techcorp.com',
      supervisorPhone: '+1 (555) 111-2222',
      projects: [
        {
          name: 'Cloud Migration Initiative',
          description: 'Led the migration of legacy monolithic application to cloud-native microservices architecture on AWS',
          clientName: 'Enterprise Solutions Corp',
          clientContact: 'robert.jones@enterprisesol.com'
        },
        {
          name: 'Real-time Analytics Platform',
          description: 'Architected and built real-time data analytics platform processing 10M+ events daily',
          clientName: 'DataFlow Analytics',
          clientContact: '+1 (555) 777-9999'
        }
      ]
    },
    {
      company: 'StartupXYZ',
      role: 'Full Stack Developer',
      period: '2018 - 2021',
      description: 'Built and maintained core product features using React and Node.js. Improved application performance by 40%.',
      supervisor: 'Emily Chen',
      supervisorTitle: 'CTO',
      supervisorEmail: 'emily@startupxyz.com',
      supervisorPhone: '+1 (555) 333-4444',
      projects: [
        {
          name: 'Mobile App Backend',
          description: 'Developed RESTful API backend for iOS and Android mobile applications',
          clientName: 'MobileFirst Inc',
          clientContact: 'sarah.williams@mobilefirst.com'
        }
      ]
    },
    {
      company: 'Digital Solutions LLC',
      role: 'Web Developer',
      period: '2017 - 2018',
      description: 'Developed client-facing web applications and RESTful APIs. Collaborated with design team on UX improvements.',
      supervisor: 'Mike Rodriguez',
      supervisorTitle: 'Development Manager',
      supervisorEmail: 'mike.r@digitalsolutions.com',
      supervisorPhone: '+1 (555) 555-6666',
      projects: []
    },
  ],
  projects: [
    {
      name: 'E-Commerce Platform Redesign',
      description: 'Led the complete redesign and rebuild of a major e-commerce platform serving 500K+ users',
      technologies: ['React', 'Node.js', 'MongoDB', 'AWS'],
      role: 'Lead Developer',
      period: '2023 - 2024',
      url: 'https://example.com'
    },
    {
      name: 'Real-time Analytics Dashboard',
      description: 'Built a real-time analytics dashboard with WebSocket integration and data visualization',
      technologies: ['TypeScript', 'GraphQL', 'D3.js'],
      role: 'Full Stack Developer',
      period: '2022',
      url: ''
    }
  ],
  references: [
    {
      name: 'David Wilson',
      title: 'Senior Engineering Manager',
      company: 'TechCorp Inc.',
      email: 'david.w@techcorp.com',
      phone: '+1 (555) 777-8888',
      relationship: 'Direct Manager'
    },
    {
      name: 'Lisa Brown',
      title: 'Product Director',
      company: 'StartupXYZ',
      email: 'lisa@startupxyz.com',
      phone: '+1 (555) 999-0000',
      relationship: 'Colleague'
    }
  ],
  applicationHistory: [
    {
      id: 1,
      jobTitle: 'Senior Full Stack Developer',
      company: 'TechCorp Solutions',
      clientName: 'Enterprise Tech Co.',
      appliedDate: 'Oct 25, 2025',
      status: 'Active - Interview Stage',
      outcome: 'In Progress',
      matchScore: 94,
      notes: 'Strong technical fit. Scheduled for final round.',
      timeline: [
        { date: 'Oct 25', event: 'Application Submitted', status: 'completed' },
        { date: 'Oct 26', event: 'AI Screening Passed', status: 'completed' },
        { date: 'Oct 28', event: 'Phone Screen', status: 'completed' },
        { date: 'Oct 30', event: 'Technical Interview', status: 'current' },
      ]
    },
    {
      id: 2,
      jobTitle: 'Lead Full Stack Engineer',
      company: 'InnovateTech',
      clientName: 'Innovation Labs',
      appliedDate: 'Oct 15, 2025',
      status: 'Withdrawn',
      outcome: 'Candidate Withdrew',
      matchScore: 89,
      notes: 'Candidate withdrew due to accepting another offer.',
      timeline: [
        { date: 'Oct 15', event: 'Application Submitted', status: 'completed' },
        { date: 'Oct 16', event: 'Phone Screen Scheduled', status: 'completed' },
        { date: 'Oct 18', event: 'Candidate Withdrew', status: 'completed' },
      ]
    },
    {
      id: 3,
      jobTitle: 'Software Engineer',
      company: 'MegaCorp',
      clientName: 'Global Solutions Inc.',
      appliedDate: 'Sep 20, 2025',
      status: 'Not Selected',
      outcome: 'Rejected - Skills Gap',
      matchScore: 72,
      notes: 'Lacked experience with specific legacy systems required.',
      timeline: [
        { date: 'Sep 20', event: 'Application Submitted', status: 'completed' },
        { date: 'Sep 21', event: 'AI Screening', status: 'completed' },
        { date: 'Sep 23', event: 'Not Selected', status: 'completed' },
      ]
    },
    {
      id: 4,
      jobTitle: 'Senior Developer',
      company: 'CloudTech Systems',
      clientName: 'Cloud Innovations',
      appliedDate: 'Aug 10, 2025',
      status: 'Completed - Hired',
      outcome: 'Hired',
      matchScore: 91,
      notes: 'Successfully placed. Started Sep 1, 2025.',
      timeline: [
        { date: 'Aug 10', event: 'Application Submitted', status: 'completed' },
        { date: 'Aug 12', event: 'Phone Screen', status: 'completed' },
        { date: 'Aug 15', event: 'Technical Interview', status: 'completed' },
        { date: 'Aug 20', event: 'Offer Extended', status: 'completed' },
        { date: 'Aug 25', event: 'Offer Accepted', status: 'completed' },
        { date: 'Sep 1', event: 'Started Position', status: 'completed' },
      ]
    },
  ],
  aiInsights: {
    strengths: [
      'Strong technical skill match (React, Node.js, AWS)',
      'Leadership experience aligns with team lead responsibilities',
      'Education background from top-tier university',
      'Proven track record at high-growth companies',
    ],
    concerns: [
      'Salary expectations may be above budget range',
      'Limited experience with our specific tech stack (PostgreSQL)',
    ],
    cultureFit: 85,
    technicalFit: 94,
    experienceFit: 92,
  },
  timeline: [
    { date: 'Oct 25, 2025', event: 'Application Submitted', status: 'completed', type: 'application', title: 'Application Submitted', description: 'Candidate applied for Senior Full Stack Developer position', timestamp: '10:30 AM' },
    { date: 'Oct 26, 2025', event: 'AI Screening Passed', status: 'completed', type: 'status', title: 'AI Screening Passed', description: 'Match score: 94%', timestamp: '2:15 PM' },
    { date: 'Oct 28, 2025', event: 'Phone Screen Scheduled', status: 'completed', type: 'interview', title: 'Phone Screen', description: 'Initial screening call completed', timestamp: '11:00 AM' },
    { date: 'Oct 30, 2025', event: 'Technical Interview', status: 'upcoming', type: 'interview', title: 'Technical Interview Scheduled', description: 'Live coding session with engineering team', timestamp: '3:00 PM' },
    { date: 'TBD', event: 'Final Interview', status: 'pending', type: 'interview', title: 'Final Interview', description: 'To be scheduled', timestamp: '' },
  ],
  conversations: [
    {
      id: 1,
      type: 'email',
      label: 'Email Thread',
      messages: [
        {
          id: 1,
          sender: 'recruiter',
          senderName: 'John Recruiter',
          content: 'Hi Sarah,\n\nI came across your profile and was impressed by your experience with React and Node.js. We have an exciting opportunity at TechCorp Solutions for a Senior Full Stack Developer role that I think would be a great fit for you.\n\nWould you be open to a brief call to discuss this opportunity?\n\nBest regards,\nJohn',
          subject: 'Initial Outreach - Senior Full Stack Developer',
          timestamp: 'Oct 30, 2024 10:30 AM',
          read: true,
          attachments: [
            { name: 'Job_Description.pdf', size: '245 KB', type: 'pdf' }
          ]
        },
        {
          id: 2,
          sender: 'candidate',
          senderName: 'Sarah Johnson',
          content: 'Hi John,\n\nThank you for reaching out! I would be very interested in learning more about this opportunity. I am available for a call this week.\n\nBest,\nSarah',
          timestamp: 'Oct 30, 2024 2:15 PM',
          read: true,
          attachments: []
        },
        {
          id: 3,
          sender: 'recruiter',
          senderName: 'John Recruiter',
          content: 'Great! How about Thursday at 2 PM? I will send you the meeting link.',
          timestamp: 'Oct 30, 2024 3:45 PM',
          read: true,
          attachments: []
        }
      ]
    },
    {
      id: 2,
      type: 'whatsapp',
      label: 'WhatsApp Chat',
      messages: [
        {
          id: 1,
          sender: 'recruiter',
          senderName: 'John Recruiter',
          content: 'Hi Sarah! Just wanted to confirm our call tomorrow at 2 PM. Looking forward to chatting!',
          timestamp: 'Nov 2, 2024 9:00 AM',
          read: true,
          attachments: []
        },
        {
          id: 2,
          sender: 'candidate',
          senderName: 'Sarah Johnson',
          content: '👍 Confirmed! See you tomorrow.',
          timestamp: 'Nov 2, 2024 9:15 AM',
          read: true,
          attachments: []
        },
        {
          id: 3,
          sender: 'recruiter',
          senderName: 'John Recruiter',
          content: 'Perfect! Here is the agenda for our call.',
          timestamp: 'Nov 2, 2024 10:30 AM',
          read: true,
          attachments: [
            { name: 'Meeting_Agenda.docx', size: '128 KB', type: 'docx' }
          ]
        }
      ]
    }
  ],
  files: [
    {
      id: 1,
      name: 'Sarah_Johnson_Resume.pdf',
      type: 'pdf',
      size: '245 KB',
      uploadedBy: 'Sarah Johnson',
      uploadedAt: 'Oct 25, 2024 10:30 AM',
      category: 'Resume',
      url: '#'
    },
    {
      id: 2,
      name: 'Job_Description.pdf',
      type: 'pdf',
      size: '180 KB',
      uploadedBy: 'John Recruiter',
      uploadedAt: 'Oct 30, 2024 10:30 AM',
      category: 'Job Description',
      url: '#'
    },
    {
      id: 3,
      name: 'Meeting_Agenda.docx',
      type: 'docx',
      size: '128 KB',
      uploadedBy: 'John Recruiter',
      uploadedAt: 'Nov 2, 2024 10:30 AM',
      category: 'Meeting Notes',
      url: '#'
    },
    {
      id: 4,
      name: 'Portfolio_Project_Screenshots.zip',
      type: 'zip',
      size: '5.2 MB',
      uploadedBy: 'Sarah Johnson',
      uploadedAt: 'Nov 1, 2024 3:45 PM',
      category: 'Portfolio',
      url: '#'
    },
    {
      id: 5,
      name: 'Reference_Letter_TechCorp.pdf',
      type: 'pdf',
      size: '320 KB',
      uploadedBy: 'Sarah Johnson',
      uploadedAt: 'Nov 3, 2024 9:15 AM',
      category: 'Reference',
      url: '#'
    },
  ],
  auditHistory: [
    {
      id: 1,
      action: 'Profile Created',
      user: 'System',
      timestamp: 'Oct 25, 2024 10:30 AM',
      details: 'Candidate profile created from resume upload',
      type: 'create'
    },
    {
      id: 2,
      action: 'Status Changed',
      user: 'John Recruiter',
      timestamp: 'Oct 26, 2024 2:15 PM',
      details: 'Status changed from "New" to "Screening"',
      type: 'update'
    },
    {
      id: 3,
      action: 'Email Sent',
      user: 'John Recruiter',
      timestamp: 'Oct 30, 2024 10:30 AM',
      details: 'Initial outreach email sent',
      type: 'email'
    },
    {
      id: 4,
      action: 'Profile Viewed',
      user: 'Emily Chen',
      timestamp: 'Oct 30, 2024 11:45 AM',
      details: 'Profile viewed by hiring manager',
      type: 'view'
    },
    {
      id: 5,
      action: 'Interview Scheduled',
      user: 'John Recruiter',
      timestamp: 'Oct 30, 2024 3:45 PM',
      details: 'Phone screen scheduled for Nov 3, 2024 at 2:00 PM',
      type: 'interview'
    },
    {
      id: 6,
      action: 'Status Changed',
      user: 'John Recruiter',
      timestamp: 'Oct 31, 2024 9:00 AM',
      details: 'Status changed from "Screening" to "Interview"',
      type: 'update'
    },
    {
      id: 7,
      action: 'Notes Added',
      user: 'John Recruiter',
      timestamp: 'Nov 1, 2024 2:30 PM',
      details: 'Added technical assessment notes',
      type: 'note'
    },
    {
      id: 8,
      action: 'Profile Shared',
      user: 'John Recruiter',
      timestamp: 'Nov 2, 2024 10:15 AM',
      details: 'Profile shared with client TechCorp Solutions',
      type: 'share'
    },
  ],
};

// Available jobs for matching
const availableJobs = [
  {
    id: 'job-1',
    title: 'Senior Full Stack Developer',
    company: 'TechCorp Solutions',
    location: 'San Francisco, CA',
    locationType: 'Hybrid',
    salaryRange: { min: 140000, max: 180000 },
    requiredSkills: ['React', 'Node.js', 'TypeScript', 'AWS', 'MongoDB', 'Docker'],
    niceToHaveSkills: ['GraphQL', 'Python', 'Kubernetes'],
    experienceYears: { min: 5, max: 10 },
    description: 'Leading development of next-gen cloud platform'
  },
  {
    id: 'job-2',
    title: 'Lead Frontend Engineer',
    company: 'Innovation Labs',
    location: 'Remote',
    locationType: 'Remote',
    salaryRange: { min: 150000, max: 200000 },
    requiredSkills: ['React', 'TypeScript', 'Next.js', 'GraphQL', 'Testing'],
    niceToHaveSkills: ['Node.js', 'AWS', 'Docker'],
    experienceYears: { min: 7, max: 12 },
    description: 'Architect frontend systems for enterprise SaaS platform'
  },
  {
    id: 'job-3',
    title: 'Backend Developer',
    company: 'DataFlow Inc',
    location: 'New York, NY',
    locationType: 'On-site',
    salaryRange: { min: 120000, max: 160000 },
    requiredSkills: ['Node.js', 'Python', 'PostgreSQL', 'Redis', 'Microservices'],
    niceToHaveSkills: ['MongoDB', 'AWS', 'Docker'],
    experienceYears: { min: 4, max: 8 },
    description: 'Build scalable backend services for data processing'
  }
];

interface CandidateDetailProps {
  candidateId?: number;
  onBack?: () => void;
  onViewCompany?: (companyName: string) => void;
  initialEditMode?: boolean;
  candidateData?: any;
  onSave?: (updatedData: any) => void;
  onClose?: () => void;
}

export function CandidateDetail({ candidateId, onBack, onViewCompany, initialEditMode = false, candidateData, onSave, onClose }: CandidateDetailProps) {
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [showCallDialog, setShowCallDialog] = useState(false);
  const [showCompanyDialog, setShowCompanyDialog] = useState(false);
  const [selectedCompanyName, setSelectedCompanyName] = useState<string>('');
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [showAnonymizeDialog, setShowAnonymizeDialog] = useState(false);
  const [showEmailClientDialog, setShowEmailClientDialog] = useState(false);
  const [isInterviewSheetOpen, setIsInterviewSheetOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<any>(null);
  const [showResumeDialog, setShowResumeDialog] = useState(false);
  const [anonymizeFields, setAnonymizeFields] = useState({
    name: false,
    email: false,
    phone: false,
    avatar: false,
    workHistory: false,
    education: false,
    contact: false,
  });

  // Edit mode states
  const [isEditMode, setIsEditMode] = useState(initialEditMode);
  const [editingSections, setEditingSections] = useState<Record<string, boolean>>({});
  const [editedData, setEditedData] = useState(candidateData || candidateDetail);
  const [newSkill, setNewSkill] = useState('');

  // Chat states
  const [activeConversation, setActiveConversation] = useState(0);
  const [conversationTab, setConversationTab] = useState<'email' | 'whatsapp' | 'phone' | 'files' | 'audit'>('email');
  const [newMessage, setNewMessage] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Phone call states
  const [isCallActive, setIsCallActive] = useState(false);
  const [isCallConnecting, setIsCallConnecting] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [callTranscript, setCallTranscript] = useState<Array<{
    speaker: 'recruiter' | 'candidate';
    text: string;
    timestamp: string;
    sentiment?: 'positive' | 'neutral' | 'negative';
  }>>([]);
  const [liveSentiment, setLiveSentiment] = useState<{
    overall: 'positive' | 'neutral' | 'negative';
    score: number;
    keywords: string[];
  } | null>(null);
  const [postCallSummary, setPostCallSummary] = useState<{
    jdFit: string;
    softSkills: string;
    overallAssessment: string;
    recommendation: string;
  } | null>(null);
  const [callNotes, setCallNotes] = useState('');
  const [callHistory, setCallHistory] = useState<Array<{
    id: string;
    date: string;
    time: string;
    direction: 'incoming' | 'outgoing';
    duration: string;
    summary: string;
    transcript: any[];
    notes: string;
    aiAnalysis?: {
      jdFit: string;
      softSkills: string;
      overallAssessment: string;
      recommendation: string;
    };
  }>>([
    // Mock data with incoming and outgoing calls
    {
      id: 'call-3',
      date: 'Nov 10, 2024',
      time: '3:45 PM',
      direction: 'outgoing',
      duration: '12:34',
      summary: 'Technical screening call - Discussed React and Node.js experience. Candidate showed strong understanding of microservices architecture.',
      transcript: [],
      notes: 'Follow up with technical assessment. Very strong candidate.',
      aiAnalysis: {
        jdFit: 'Excellent match - 95%. All required technical skills present.',
        softSkills: 'Strong communication, confident, articulate about past work.',
        overallAssessment: 'Highly qualified candidate with relevant experience and excellent technical knowledge.',
        recommendation: 'Proceed to technical interview round immediately.'
      }
    },
    {
      id: 'call-2',
      date: 'Nov 8, 2024',
      time: '10:15 AM',
      direction: 'incoming',
      duration: '5:23',
      summary: 'Candidate called to inquire about position details and team structure.',
      transcript: [],
      notes: 'Showed strong interest. Answered all questions about remote work policy and team dynamics.',
      aiAnalysis: {
        jdFit: 'Good preliminary fit based on conversation.',
        softSkills: 'Proactive, curious, good questions about company culture.',
        overallAssessment: 'Positive engagement, demonstrated interest in role specifics.',
        recommendation: 'Schedule formal screening call.'
      }
    },
    {
      id: 'call-1',
      date: 'Nov 5, 2024',
      time: '2:30 PM',
      direction: 'outgoing',
      duration: '8:45',
      summary: 'Initial outreach call - Introduced company and opportunity. Confirmed interest in role.',
      transcript: [],
      notes: 'Candidate expressed strong interest. Available for next steps. Prefers afternoon calls.',
      aiAnalysis: {
        jdFit: 'Preliminary assessment positive based on resume discussion.',
        softSkills: 'Friendly, professional, enthusiastic.',
        overallAssessment: 'Good initial impression, candidate is engaged and interested.',
        recommendation: 'Move forward with technical screening.'
      }
    }
  ]);
  const [expandedCallId, setExpandedCallId] = useState<string | null>(null);
  
  // Email composer states
  const [showEmailComposerDialog, setShowEmailComposerDialog] = useState(false);
  const [emailComposerMode, setEmailComposerMode] = useState<'compose' | 'reply'>('compose');
  
  // AI Match Analysis states
  const [selectedJobId, setSelectedJobId] = useState<string>('job-1');
  const [recruiterNotes, setRecruiterNotes] = useState<string>('');
  const [showInterviewQuestions, setShowInterviewQuestions] = useState(true);
  const [isMatchAnalysisExpanded, setIsMatchAnalysisExpanded] = useState(true);
  
  // Work History edit states
  const [editingWorkIndex, setEditingWorkIndex] = useState<number | null>(null);
  const [showAddWorkDialog, setShowAddWorkDialog] = useState(false);

  const handleCompanyClick = (companyName: string) => {
    setSelectedCompanyName(companyName);
    setShowCompanyDialog(true);
    if (onViewCompany) {
      onViewCompany(companyName);
    } else {
      toast.info(`View company: ${companyName} (Intelligence module integration)`);
    }
  };
  
  const handleDownloadResume = () => {
    toast.success('Resume downloaded successfully!');
  };

  const handleMoveToNextStage = () => {
    toast.success('Candidate moved to next stage!');
  };

  const handleSendRejection = () => {
    toast.info('Rejection email sent to candidate');
  };

  const handleEmailCandidate = () => {
    toast.success('Opening email composer...');
  };

  const handleCallCandidate = () => {
    toast.success('Initiating call...');
  };

  const handleScheduleInterview = () => {
    setIsInterviewSheetOpen(true);
  };

  const handleShareProfile = async () => {
    const shareToken = Math.random().toString(36).substr(2, 12);
    const shareUrl = `${window.location.origin}/candidate-review/${shareToken}`;
    
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast.success('Shareable link copied to clipboard!');
      setShowShareDialog(false);
    } catch (err) {
      const textArea = document.createElement('textarea');
      textArea.value = shareUrl;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        toast.success('Shareable link copied to clipboard!');
      } catch (e) {
        toast.error('Failed to copy link');
      }
      document.body.removeChild(textArea);
    }
  };

  const handleDownloadAnonymizedResume = () => {
    const fieldsToAnonymize = Object.entries(anonymizeFields)
      .filter(([_, value]) => value)
      .map(([key, _]) => key);
    
    if (fieldsToAnonymize.length === 0) {
      toast.error('Please select at least one field to anonymize');
      return;
    }

    toast.success('Anonymized resume downloaded successfully!');
    setShowAnonymizeDialog(false);
  };

  const handleEmailClient = () => {
    setShowEmailClientDialog(true);
  };

  const handleSendClientEmail = () => {
    toast.success('Email sent to client with candidate profile!');
    setShowEmailClientDialog(false);
  };

  const toggleSectionEdit = (section: string) => {
    setEditingSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleSaveSection = (section: string) => {
    toggleSectionEdit(section);
    toast.success(`${section} updated successfully!`);
  };

  const handleSaveAll = () => {
    setIsEditMode(false);
    setEditingSections({});
    toast.success('All changes saved successfully!');
    if (onSave) {
      onSave(editedData);
    }
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
    setEditingSections({});
    setEditedData(candidateData || candidateDetail);
    setEditingWorkIndex(null);
    toast.info('Changes discarded');
  };

  const handleEditWork = (index: number) => {
    setEditingWorkIndex(index);
  };

  const handleSaveWork = (index: number) => {
    setEditingWorkIndex(null);
    toast.success('Work history updated successfully!');
  };

  const handleCancelWorkEdit = () => {
    setEditingWorkIndex(null);
    setEditedData(candidateData || candidateDetail);
  };

  const handleDeleteWork = (index: number) => {
    const updatedWorkHistory = editedData.workHistory.filter((_: any, i: number) => i !== index);
    setEditedData({
      ...editedData,
      workHistory: updatedWorkHistory
    });
    toast.success('Work history entry deleted');
  };

  const handleUpdateWorkField = (index: number, field: string, value: any) => {
    const updatedWorkHistory = [...editedData.workHistory];
    updatedWorkHistory[index] = {
      ...updatedWorkHistory[index],
      [field]: value
    };
    setEditedData({
      ...editedData,
      workHistory: updatedWorkHistory
    });
  };

  const handleAddWork = () => {
    const newWork = {
      company: '',
      role: '',
      period: '',
      description: '',
      supervisor: '',
      supervisorTitle: '',
      supervisorEmail: '',
      supervisorPhone: '',
      projects: []
    };
    setEditedData({
      ...editedData,
      workHistory: [...editedData.workHistory, newWork]
    });
    setEditingWorkIndex(editedData.workHistory.length);
    setShowAddWorkDialog(false);
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !editedData.skills.includes(newSkill.trim())) {
      setEditedData({
        ...editedData,
        skills: [...editedData.skills, newSkill.trim()]
      });
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setEditedData({
      ...editedData,
      skills: editedData.skills.filter((s: string) => s !== skillToRemove)
    });
  };

  const handleBackClick = () => {
    if (onBack) {
      onBack();
    } else if (onClose) {
      onClose();
    }
  };

  // Chat handlers
  const handleSendMessage = () => {
    if (!newMessage.trim() && attachments.length === 0) return;
    
    toast.success('Message sent!');
    setNewMessage('');
    setAttachments([]);
  };

  const handleFileAttachment = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments(Array.from(e.target.files));
    }
  };

  const handleRemoveAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  // Phone call handlers
  const handleStartCall = async () => {
    setIsCallConnecting(true);
    
    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-4304bc86/call/initiate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify({
          candidatePhone: editedData.phone,
          candidateName: editedData.name,
          candidateId: editedData.id
        })
      });

      if (!response.ok) {
        throw new Error('Failed to initiate call');
      }

      const data = await response.json();
      
      setIsCallConnecting(false);
      setIsCallActive(true);
      setCallDuration(0);
      setCallTranscript([]);
      
      // Start call duration timer
      const durationInterval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);

      // Store interval ID for cleanup
      (window as any).callDurationInterval = durationInterval;

      // Start polling for transcript updates
      startTranscriptPolling(data.callSid);
      
      toast.success('Call connected!');
    } catch (error) {
      console.error('Error starting call:', error);
      toast.error('Failed to start call. Please try again.');
      setIsCallConnecting(false);
    }
  };

  const startTranscriptPolling = (callSid: string) => {
    const pollInterval = setInterval(async () => {
      try {
        const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-4304bc86/call/transcript/${callSid}`, {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setCallTranscript(data.transcript);
          setLiveSentiment(data.sentiment);
        }
      } catch (error) {
        console.error('Error fetching transcript:', error);
      }
    }, 2000); // Poll every 2 seconds

    (window as any).transcriptPollInterval = pollInterval;
  };

  const handleEndCall = async () => {
    // Clear intervals
    if ((window as any).callDurationInterval) {
      clearInterval((window as any).callDurationInterval);
    }
    if ((window as any).transcriptPollInterval) {
      clearInterval((window as any).transcriptPollInterval);
    }

    try {
      // End the call on server
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-4304bc86/call/end`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify({
          candidateId: editedData.id,
          transcript: callTranscript,
          duration: callDuration,
          jobTitle: editedData.appliedFor
        })
      });

      if (!response.ok) {
        throw new Error('Failed to end call');
      }

      const data = await response.json();
      
      setIsCallActive(false);
      setPostCallSummary(data.summary);
      toast.success('Call ended. Generating AI analysis...');
    } catch (error) {
      console.error('Error ending call:', error);
      toast.error('Failed to end call properly');
      setIsCallActive(false);
    }
  };

  const handleSaveCallToHistory = () => {
    if (!postCallSummary) return;

    const now = new Date();
    const callRecord = {
      id: `call-${Date.now()}`,
      date: now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      time: now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
      direction: 'outgoing' as const,
      duration: `${Math.floor(callDuration / 60)}:${(callDuration % 60).toString().padStart(2, '0')}`,
      summary: postCallSummary.overallAssessment,
      transcript: callTranscript,
      notes: callNotes,
      aiAnalysis: postCallSummary
    };

    setCallHistory([callRecord, ...callHistory]);

    // Add to interview timeline
    const timelineEntry = {
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      event: 'Phone Interview',
      status: 'completed',
      type: 'interview',
      title: 'Phone Interview Completed',
      description: `${postCallSummary.overallAssessment.substring(0, 100)}...`,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
    };

    setEditedData({
      ...editedData,
      timeline: [timelineEntry, ...editedData.timeline]
    });

    // Reset states
    setPostCallSummary(null);
    setCallTranscript([]);
    setCallNotes('');
    setCallDuration(0);

    toast.success('Call saved to interview history!');
  };

  const handleDiscardCall = () => {
    setPostCallSummary(null);
    setCallTranscript([]);
    setCallNotes('');
    setCallDuration(0);
    toast.info('Call discarded');
  };

  // Email composer handlers
  const handleSendEmail = (email: { to: string; subject: string; body: string }) => {
    // Add the sent email to the conversation
    const newEmailMessage = {
      id: editedData.conversations.find((c: any) => c.type === 'email')?.messages.length + 1 || 1,
      sender: 'recruiter',
      senderName: 'John Recruiter',
      content: email.body,
      subject: email.subject,
      timestamp: new Date().toLocaleString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric', 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      }),
      read: true,
      attachments: []
    };

    const updatedConversations = editedData.conversations.map((conv: any) => {
      if (conv.type === 'email') {
        return {
          ...conv,
          messages: [...conv.messages, newEmailMessage]
        };
      }
      return conv;
    });

    setEditedData({
      ...editedData,
      conversations: updatedConversations
    });

    setShowEmailComposerDialog(false);
    toast.success('Email sent successfully!');
  };

  const getConversationHistory = () => {
    const emailConv = editedData.conversations.find((c: any) => c.type === 'email');
    const whatsappConv = editedData.conversations.find((c: any) => c.type === 'whatsapp');
    
    let history = '';
    
    if (emailConv && emailConv.messages.length > 0) {
      history += '--- Email Conversation ---\n';
      emailConv.messages.forEach((msg: any) => {
        history += `${msg.senderName}: ${msg.content}\n\n`;
      });
    }
    
    if (whatsappConv && whatsappConv.messages.length > 0) {
      history += '\n--- WhatsApp Conversation ---\n';
      whatsappConv.messages.forEach((msg: any) => {
        history += `${msg.senderName}: ${msg.content}\n\n`;
      });
    }
    
    return history;
  };

  const getLastMessage = () => {
    const emailConv = editedData.conversations.find((c: any) => c.type === 'email');
    if (emailConv && emailConv.messages.length > 0) {
      return emailConv.messages[emailConv.messages.length - 1].content;
    }
    return '';
  };

  const currentConversation = editedData.conversations[activeConversation];

  // Calculate AI Match Analysis based on selected job
  const calculateMatchAnalysis = () => {
    const selectedJob = availableJobs.find(j => j.id === selectedJobId);
    if (!selectedJob) return null;

    const candidateSkills = editedData.skills;
    const requiredSkills = selectedJob.requiredSkills;
    const niceToHaveSkills = selectedJob.niceToHaveSkills;

    // Skill match calculation
    const matchedRequired = requiredSkills.filter(skill => 
      candidateSkills.some((cs: string) => cs.toLowerCase().includes(skill.toLowerCase()))
    );
    const matchedNiceToHave = niceToHaveSkills.filter(skill => 
      candidateSkills.some((cs: string) => cs.toLowerCase().includes(skill.toLowerCase()))
    );
    const missingRequired = requiredSkills.filter(skill => 
      !candidateSkills.some((cs: string) => cs.toLowerCase().includes(skill.toLowerCase()))
    );

    const skillMatchScore = Math.round(
      (matchedRequired.length / requiredSkills.length) * 100
    );

    // Location match
    const candidateLocation = editedData.location;
    const jobLocation = selectedJob.location;
    const locationMatch = 
      selectedJob.locationType === 'Remote' ? 100 :
      candidateLocation.toLowerCase().includes(jobLocation.toLowerCase().split(',')[0]) ? 100 :
      candidateLocation.toLowerCase().includes(jobLocation.toLowerCase().split(',')[1]?.trim()) ? 80 :
      60;

    // Salary match (assuming candidate expects similar to current market rate)
    const expectedSalary = 160000; // Could be from candidate profile
    const salaryMatch = 
      expectedSalary >= selectedJob.salaryRange.min && expectedSalary <= selectedJob.salaryRange.max ? 100 :
      expectedSalary < selectedJob.salaryRange.min ? Math.max(70, 100 - ((selectedJob.salaryRange.min - expectedSalary) / 10000 * 5)) :
      Math.max(70, 100 - ((expectedSalary - selectedJob.salaryRange.max) / 10000 * 5));

    // Experience match
    const candidateYears = parseInt(editedData.experience);
    const experienceMatch = 
      candidateYears >= selectedJob.experienceYears.min && candidateYears <= selectedJob.experienceYears.max ? 100 :
      candidateYears < selectedJob.experienceYears.min ? Math.max(60, 100 - ((selectedJob.experienceYears.min - candidateYears) * 10)) :
      Math.max(80, 100 - ((candidateYears - selectedJob.experienceYears.max) * 5));

    // Overall score
    const overallScore = Math.round(
      (skillMatchScore * 0.4) + 
      (locationMatch * 0.2) + 
      (salaryMatch * 0.2) + 
      (experienceMatch * 0.2)
    );

    // Generate interview questions
    const interviewQuestions = [
      {
        category: 'Technical',
        questions: matchedRequired.slice(0, 3).map(skill => 
          `Can you describe a challenging project where you used ${skill}?`
        )
      },
      {
        category: 'Gap Assessment',
        questions: missingRequired.map(skill => 
          `We use ${skill} extensively. How would you approach learning this technology?`
        )
      },
      {
        category: 'Experience',
        questions: [
          `Tell me about your experience with ${selectedJob.description.toLowerCase()}`,
          'How do you approach system architecture and design decisions?',
          'Describe a time when you had to scale an application to handle increased load'
        ]
      }
    ];

    return {
      job: selectedJob,
      overallScore,
      skillMatch: {
        score: skillMatchScore,
        matched: matchedRequired,
        niceToHave: matchedNiceToHave,
        missing: missingRequired
      },
      locationMatch,
      salaryMatch,
      experienceMatch,
      interviewQuestions: interviewQuestions.filter(cat => cat.questions.length > 0)
    };
  };

  const matchAnalysis = calculateMatchAnalysis();

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <Button variant="ghost" onClick={handleBackClick}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Candidates
        </Button>
        
        {!isEditMode ? (
          <Button onClick={() => setIsEditMode(true)} className="gap-2">
            <Edit className="w-4 h-4" />
            Edit Profile
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleCancelEdit} className="gap-2">
              <X className="w-4 h-4" />
              Cancel
            </Button>
            <Button onClick={handleSaveAll} className="gap-2">
              <Save className="w-4 h-4" />
              Save All Changes
            </Button>
          </div>
        )}
      </div>

      <div className="flex-1 flex gap-6 min-h-0">
        {/* Main Content Area */}
        <div className="flex-1 min-w-0 overflow-auto">
          <div className="space-y-6">
            {/* Header */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-6 flex-wrap">
                  <ImageWithFallback
                    src={editedData.avatar}
                    alt={editedData.name}
                    className="w-24 h-24 rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-[300px]">
                    <div className="flex items-start justify-between flex-wrap gap-4">
                      <div className="flex-1">
                        {editingSections.header ? (
                          <div className="space-y-3 mb-3">
                            <div>
                              <Label htmlFor="edit-name">Full Name</Label>
                              <Input
                                id="edit-name"
                                value={editedData.name}
                                onChange={(e) => setEditedData({ ...editedData, name: e.target.value })}
                              />
                            </div>
                            <div>
                              <Label htmlFor="edit-title">Job Title</Label>
                              <Input
                                id="edit-title"
                                value={editedData.title}
                                onChange={(e) => setEditedData({ ...editedData, title: e.target.value })}
                              />
                            </div>
                            <div>
                              <Label htmlFor="edit-location">Location</Label>
                              <Input
                                id="edit-location"
                                value={editedData.location}
                                onChange={(e) => setEditedData({ ...editedData, location: e.target.value })}
                              />
                            </div>
                            <div>
                              <Label htmlFor="edit-experience">Experience</Label>
                              <Input
                                id="edit-experience"
                                value={editedData.experience}
                                onChange={(e) => setEditedData({ ...editedData, experience: e.target.value })}
                              />
                            </div>
                            <Button size="sm" onClick={() => handleSaveSection('header')} className="gap-2">
                              <Save className="w-3 h-3" />
                              Save
                            </Button>
                          </div>
                        ) : (
                          <div>
                            <div className="flex items-center gap-3">
                              <h1 className="text-2xl">{editedData.name}</h1>
                              <a
                                href={editedData.linkedinUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800 transition-colors"
                              >
                                <Linkedin className="w-5 h-5" />
                              </a>
                              {isEditMode && (
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => toggleSectionEdit('header')}
                                  className="ml-2"
                                >
                                  <Edit className="w-4 h-4" />
                                </Button>
                              )}
                            </div>
                            <p className="text-gray-600 mt-1">{editedData.title}</p>
                            <div className="flex items-center gap-4 mt-3 text-sm text-gray-600">
                              <div className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                {editedData.location}
                              </div>
                              <div className="flex items-center gap-1">
                                <Briefcase className="w-4 h-4" />
                                {editedData.experience}
                              </div>
                            </div>
                            {editedData.openToWork && (
                              <div className="mt-2">
                                <Badge className="bg-green-100 text-green-700">
                                  <CheckCircle2 className="w-3 h-3 mr-1" />
                                  Open to Work
                                </Badge>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                      <Badge className="bg-purple-100 text-purple-700">
                        {editedData.status}
                      </Badge>
                    </div>
                    
                    <div className="flex gap-3 mt-4 flex-wrap">
                      <Button variant="outline" onClick={handleScheduleInterview}>
                        <Calendar className="w-4 h-4 mr-2" />
                        Schedule Interview
                      </Button>
                      <Button variant="outline" onClick={() => setShowShareDialog(true)}>
                        <Share2 className="w-4 h-4 mr-2" />
                        Share
                      </Button>
                      <Button variant="outline" onClick={() => setShowAnonymizeDialog(true)}>
                        <Download className="w-4 h-4 mr-2" />
                        Anonymize
                      </Button>
                      <Button variant="outline" onClick={handleEmailClient}>
                        <Send className="w-4 h-4 mr-2" />
                        Email to Client
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI Match Analysis */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsMatchAnalysisExpanded(!isMatchAnalysisExpanded)}
                      className="p-0 h-auto hover:bg-transparent"
                    >
                      {isMatchAnalysisExpanded ? (
                        <ChevronDown className="w-5 h-5 text-gray-600" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-gray-600" />
                      )}
                    </Button>
                    <CardTitle className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-purple-600" />
                      AI Match Analysis
                    </CardTitle>
                  </div>
                  <div className="flex items-center gap-2">
                    <Label className="text-sm text-gray-600">Compare against:</Label>
                    <select
                      value={selectedJobId}
                      onChange={(e) => setSelectedJobId(e.target.value)}
                      className="border rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      {availableJobs.map(job => (
                        <option key={job.id} value={job.id}>
                          {job.title} - {job.company}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                {matchAnalysis && isMatchAnalysisExpanded && (
                  <p className="text-sm text-gray-500 mt-2">
                    Analyzing fit for {matchAnalysis.job.title} at {matchAnalysis.job.company}
                  </p>
                )}
              </CardHeader>
              {isMatchAnalysisExpanded && (
                <CardContent className="space-y-6">
                {matchAnalysis && (
                  <>
                    {/* Overall Match Score */}
                    <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span>Overall Match Score</span>
                        <span className={`text-xl ${
                          matchAnalysis.overallScore >= 80 ? 'text-green-600' :
                          matchAnalysis.overallScore >= 60 ? 'text-orange-600' :
                          'text-red-600'
                        }`}>
                          {matchAnalysis.overallScore}%
                        </span>
                      </div>
                      <Progress value={matchAnalysis.overallScore} className="h-3" />
                    </div>

                    {/* Detailed Match Breakdown */}
                    <div className="grid grid-cols-2 gap-4">
                      {/* Skills Match */}
                      <div className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <p className="text-sm">Skills Match</p>
                          <span className="text-sm font-medium">{matchAnalysis.skillMatch.score}%</span>
                        </div>
                        <Progress value={matchAnalysis.skillMatch.score} className="h-2 mb-3" />
                        <div className="space-y-2">
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Matched Required Skills:</p>
                            <div className="flex flex-wrap gap-1">
                              {matchAnalysis.skillMatch.matched.map((skill, i) => (
                                <Badge key={i} variant="secondary" className="bg-green-100 text-green-700 text-xs">
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          {matchAnalysis.skillMatch.missing.length > 0 && (
                            <div>
                              <p className="text-xs text-gray-500 mb-1">Missing Skills:</p>
                              <div className="flex flex-wrap gap-1">
                                {matchAnalysis.skillMatch.missing.map((skill, i) => (
                                  <Badge key={i} variant="secondary" className="bg-red-100 text-red-700 text-xs">
                                    <XCircle className="w-3 h-3 mr-1" />
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                          {matchAnalysis.skillMatch.niceToHave.length > 0 && (
                            <div>
                              <p className="text-xs text-gray-500 mb-1">Nice-to-Have Skills:</p>
                              <div className="flex flex-wrap gap-1">
                                {matchAnalysis.skillMatch.niceToHave.map((skill, i) => (
                                  <Badge key={i} variant="secondary" className="bg-blue-100 text-blue-700 text-xs">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Location Match */}
                      <div className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <p className="text-sm">Location Match</p>
                          <span className="text-sm font-medium">{matchAnalysis.locationMatch}%</span>
                        </div>
                        <Progress value={matchAnalysis.locationMatch} className="h-2 mb-3" />
                        <div className="space-y-2 text-xs">
                          <div className="flex items-start gap-2">
                            <MapPin className="w-4 h-4 text-gray-500 mt-0.5" />
                            <div>
                              <p className="text-gray-500">Candidate:</p>
                              <p className="font-medium">{editedData.location}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <Building2 className="w-4 h-4 text-gray-500 mt-0.5" />
                            <div>
                              <p className="text-gray-500">Job Location:</p>
                              <p className="font-medium">{matchAnalysis.job.location}</p>
                              <Badge variant="secondary" className="mt-1 text-xs">
                                {matchAnalysis.job.locationType}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Salary Match */}
                      <div className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <p className="text-sm">Salary Match</p>
                          <span className="text-sm font-medium">{Math.round(matchAnalysis.salaryMatch)}%</span>
                        </div>
                        <Progress value={matchAnalysis.salaryMatch} className="h-2 mb-3" />
                        <div className="space-y-2 text-xs">
                          <div>
                            <p className="text-gray-500">Job Salary Range:</p>
                            <p className="font-medium">
                              ${(matchAnalysis.job.salaryRange.min / 1000).toFixed(0)}k - ${(matchAnalysis.job.salaryRange.max / 1000).toFixed(0)}k
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500">Expected Salary:</p>
                            <p className="font-medium">$160k (Market Rate)</p>
                          </div>
                        </div>
                      </div>

                      {/* Experience Match */}
                      <div className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <p className="text-sm">Experience Match</p>
                          <span className="text-sm font-medium">{Math.round(matchAnalysis.experienceMatch)}%</span>
                        </div>
                        <Progress value={matchAnalysis.experienceMatch} className="h-2 mb-3" />
                        <div className="space-y-2 text-xs">
                          <div>
                            <p className="text-gray-500">Required Experience:</p>
                            <p className="font-medium">
                              {matchAnalysis.job.experienceYears.min}-{matchAnalysis.job.experienceYears.max} years
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500">Candidate Experience:</p>
                            <p className="font-medium">{editedData.experience}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Interview Preparation Section */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="flex items-center gap-2">
                          <MessageSquare className="w-5 h-5 text-blue-600" />
                          AI-Generated Interview Questions
                        </h3>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setShowInterviewQuestions(!showInterviewQuestions)}
                        >
                          {showInterviewQuestions ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                      </div>

                      {showInterviewQuestions && (
                        <div className="space-y-4">
                          {matchAnalysis.interviewQuestions.map((category, idx) => (
                            <div key={idx} className="border rounded-lg p-4 bg-blue-50">
                              <p className="text-sm mb-3">
                                <Badge variant="secondary" className="mr-2">{category.category}</Badge>
                              </p>
                              <ul className="space-y-2">
                                {category.questions.map((question, qIdx) => (
                                  <li key={qIdx} className="flex items-start gap-2 text-sm">
                                    <span className="text-blue-600 flex-shrink-0">{qIdx + 1}.</span>
                                    <span className="text-gray-700">{question}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <Separator />

                    {/* Recruiter Notes & Interview Actions */}
                    <div>
                      <h3 className="flex items-center gap-2 mb-3">
                        <FileText className="w-5 h-5 text-orange-600" />
                        Recruiter Notes & Actions
                      </h3>
                      <div className="space-y-3">
                        <div>
                          <Label htmlFor="recruiter-notes" className="text-sm">
                            Interview Notes & Observations
                          </Label>
                          <Textarea
                            id="recruiter-notes"
                            placeholder="Add your notes about the candidate's fit for this role, interview observations, or next steps..."
                            value={recruiterNotes}
                            onChange={(e) => setRecruiterNotes(e.target.value)}
                            rows={4}
                            className="mt-1"
                          />
                        </div>
                        <div className="flex gap-2">
                          <Button
                            onClick={() => {
                              toast.success('Notes saved successfully!');
                            }}
                            variant="outline"
                            size="sm"
                          >
                            <Save className="w-4 h-4 mr-2" />
                            Save Notes
                          </Button>
                          <Button
                            onClick={() => setIsInterviewSheetOpen(true)}
                            size="sm"
                          >
                            <Calendar className="w-4 h-4 mr-2" />
                            Fill Interview Sheet
                          </Button>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
              )}
            </Card>

            {/* Tabbed Content */}
            <Card>
              <CardContent className="pt-6">
                <Tabs defaultValue="overview">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="work">Work History</TabsTrigger>
                    <TabsTrigger value="timeline">Interviews</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-4 mt-4">
                    <div>
                      <h3 className="text-lg mb-2">Summary</h3>
                      {editingSections.summary ? (
                        <div className="space-y-3">
                          <Textarea
                            value={editedData.summary}
                            onChange={(e) => setEditedData({ ...editedData, summary: e.target.value })}
                            rows={4}
                          />
                          <Button size="sm" onClick={() => handleSaveSection('summary')}>
                            <Save className="w-3 h-3 mr-2" />
                            Save
                          </Button>
                        </div>
                      ) : (
                        <div className="flex items-start justify-between">
                          <p className="text-gray-600">{editedData.summary}</p>
                          {isEditMode && (
                            <Button size="sm" variant="ghost" onClick={() => toggleSectionEdit('summary')}>
                              <Edit className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      )}
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-lg mb-3">Contact Information</h3>
                      {editingSections.contact ? (
                        <div className="space-y-3">
                          <div>
                            <Label htmlFor="edit-email">Email</Label>
                            <Input
                              id="edit-email"
                              type="email"
                              value={editedData.email}
                              onChange={(e) => setEditedData({ ...editedData, email: e.target.value })}
                            />
                          </div>
                          <div>
                            <Label htmlFor="edit-phone">Phone</Label>
                            <Input
                              id="edit-phone"
                              value={editedData.phone}
                              onChange={(e) => setEditedData({ ...editedData, phone: e.target.value })}
                            />
                          </div>
                          <div>
                            <Label htmlFor="edit-linkedin">LinkedIn URL</Label>
                            <Input
                              id="edit-linkedin"
                              value={editedData.linkedinUrl}
                              onChange={(e) => setEditedData({ ...editedData, linkedinUrl: e.target.value })}
                            />
                          </div>
                          <Button size="sm" onClick={() => handleSaveSection('contact')}>
                            <Save className="w-3 h-3 mr-2" />
                            Save
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Mail className="w-4 h-4 text-gray-500" />
                              <span>{editedData.email}</span>
                            </div>
                            {isEditMode && (
                              <Button size="sm" variant="ghost" onClick={() => toggleSectionEdit('contact')}>
                                <Edit className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                          <div className="flex items-center gap-3">
                            <Phone className="w-4 h-4 text-gray-500" />
                            <span>{editedData.phone}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <Linkedin className="w-4 h-4 text-gray-500" />
                            <a href={editedData.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                              View LinkedIn Profile
                            </a>
                          </div>
                        </div>
                      )}
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-lg mb-3">Education</h3>
                      {editingSections.education ? (
                        <div className="space-y-3">
                          <Textarea
                            value={editedData.education}
                            onChange={(e) => setEditedData({ ...editedData, education: e.target.value })}
                            rows={2}
                          />
                          <Button size="sm" onClick={() => handleSaveSection('education')}>
                            <Save className="w-3 h-3 mr-2" />
                            Save
                          </Button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <GraduationCap className="w-5 h-5 text-gray-500" />
                            <span>{editedData.education}</span>
                          </div>
                          {isEditMode && (
                            <Button size="sm" variant="ghost" onClick={() => toggleSectionEdit('education')}>
                              <Edit className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="work" className="space-y-4 mt-4">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg">Work History</h3>
                      {isEditMode && (
                        <Button size="sm" onClick={handleAddWork}>
                          <Plus className="w-4 h-4 mr-2" />
                          Add Position
                        </Button>
                      )}
                    </div>

                    {editedData.workHistory.map((work: any, index: number) => (
                      <Card key={index}>
                        <CardContent className="pt-6">
                          {editingWorkIndex === index ? (
                            // Edit Mode
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label htmlFor={`role-${index}`}>Job Title</Label>
                                  <Input
                                    id={`role-${index}`}
                                    value={work.role}
                                    onChange={(e) => handleUpdateWorkField(index, 'role', e.target.value)}
                                    placeholder="e.g., Senior Software Engineer"
                                  />
                                </div>
                                <div>
                                  <Label htmlFor={`company-${index}`}>Company</Label>
                                  <Input
                                    id={`company-${index}`}
                                    value={work.company}
                                    onChange={(e) => handleUpdateWorkField(index, 'company', e.target.value)}
                                    placeholder="e.g., TechCorp Inc."
                                  />
                                </div>
                              </div>

                              <div>
                                <Label htmlFor={`period-${index}`}>Period</Label>
                                <Input
                                  id={`period-${index}`}
                                  value={work.period}
                                  onChange={(e) => handleUpdateWorkField(index, 'period', e.target.value)}
                                  placeholder="e.g., 2021 - Present"
                                />
                              </div>

                              <div>
                                <Label htmlFor={`description-${index}`}>Description</Label>
                                <Textarea
                                  id={`description-${index}`}
                                  value={work.description}
                                  onChange={(e) => handleUpdateWorkField(index, 'description', e.target.value)}
                                  rows={3}
                                  placeholder="Describe responsibilities and achievements..."
                                />
                              </div>

                              <Separator />

                              <div className="space-y-3">
                                <h4 className="text-sm">Supervisor Information (Optional)</h4>
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label htmlFor={`supervisor-${index}`}>Supervisor Name</Label>
                                    <Input
                                      id={`supervisor-${index}`}
                                      value={work.supervisor || ''}
                                      onChange={(e) => handleUpdateWorkField(index, 'supervisor', e.target.value)}
                                      placeholder="e.g., John Smith"
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor={`supervisor-title-${index}`}>Supervisor Title</Label>
                                    <Input
                                      id={`supervisor-title-${index}`}
                                      value={work.supervisorTitle || ''}
                                      onChange={(e) => handleUpdateWorkField(index, 'supervisorTitle', e.target.value)}
                                      placeholder="e.g., VP of Engineering"
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor={`supervisor-email-${index}`}>Supervisor Email</Label>
                                    <Input
                                      id={`supervisor-email-${index}`}
                                      type="email"
                                      value={work.supervisorEmail || ''}
                                      onChange={(e) => handleUpdateWorkField(index, 'supervisorEmail', e.target.value)}
                                      placeholder="supervisor@company.com"
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor={`supervisor-phone-${index}`}>Supervisor Phone</Label>
                                    <Input
                                      id={`supervisor-phone-${index}`}
                                      value={work.supervisorPhone || ''}
                                      onChange={(e) => handleUpdateWorkField(index, 'supervisorPhone', e.target.value)}
                                      placeholder="+1 (555) 123-4567"
                                    />
                                  </div>
                                </div>
                              </div>

                              <div className="flex gap-2 pt-2">
                                <Button size="sm" onClick={() => handleSaveWork(index)}>
                                  <Save className="w-4 h-4 mr-2" />
                                  Save
                                </Button>
                                <Button size="sm" variant="outline" onClick={handleCancelWorkEdit}>
                                  <X className="w-4 h-4 mr-2" />
                                  Cancel
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="destructive" 
                                  onClick={() => handleDeleteWork(index)}
                                  className="ml-auto"
                                >
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Delete
                                </Button>
                              </div>
                            </div>
                          ) : (
                            // View Mode
                            <>
                              <div className="flex items-start justify-between mb-3">
                                <div className="flex-1">
                                  <h3 className="text-lg">{work.role}</h3>
                                  <button
                                    onClick={() => handleCompanyClick(work.company)}
                                    className="text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1 mt-1"
                                  >
                                    <Building2 className="w-4 h-4" />
                                    {work.company}
                                    <ExternalLink className="w-3 h-3" />
                                  </button>
                                  <p className="text-sm text-gray-600 mt-1">{work.period}</p>
                                </div>
                                {isEditMode && (
                                  <Button size="sm" variant="ghost" onClick={() => handleEditWork(index)}>
                                    <Edit className="w-4 h-4" />
                                  </Button>
                                )}
                              </div>
                              <p className="text-gray-700 mb-4">{work.description}</p>

                              {work.supervisor && (
                                <div className="bg-gray-50 p-3 rounded-lg mb-4">
                                  <p className="text-sm mb-1"><strong>Supervisor:</strong> {work.supervisor}</p>
                                  <p className="text-sm mb-1"><strong>Title:</strong> {work.supervisorTitle}</p>
                                  <p className="text-sm mb-1"><strong>Email:</strong> {work.supervisorEmail}</p>
                                  <p className="text-sm"><strong>Phone:</strong> {work.supervisorPhone}</p>
                                </div>
                              )}

                              {work.projects && work.projects.length > 0 && (
                                <div>
                                  <h4 className="text-sm mb-3 flex items-center gap-2">
                                    <FolderOpen className="w-4 h-4" />
                                    Projects ({work.projects.length})
                                  </h4>
                                  <div className="space-y-3">
                                    {work.projects.map((project: any, pIndex: number) => (
                                      <div key={pIndex} className="border-l-2 border-purple-300 pl-4">
                                        <h5 className="text-sm mb-1">{project.name}</h5>
                                        <p className="text-sm text-gray-600 mb-2">{project.description}</p>
                                        <div className="text-xs text-gray-500">
                                          <p><strong>Client:</strong> {project.clientName}</p>
                                          <p><strong>Contact:</strong> {project.clientContact}</p>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </TabsContent>

                  <TabsContent value="timeline" className="space-y-4 mt-4">
                    <div className="space-y-4">
                      {editedData.timeline.map((item: any, index: number) => (
                        <div key={index} className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              item.status === 'completed' ? 'bg-green-100' :
                              item.status === 'upcoming' ? 'bg-blue-100' :
                              'bg-gray-100'
                            }`}>
                              {item.type === 'application' ? <FileText className="w-5 h-5 text-gray-600" /> :
                               item.type === 'interview' ? <Calendar className="w-5 h-5 text-blue-600" /> :
                               <CheckCircle className="w-5 h-5 text-green-600" />}
                            </div>
                            {index < editedData.timeline.length - 1 && (
                              <div className="w-0.5 h-16 bg-gray-300" />
                            )}
                          </div>
                          <div className="flex-1 pb-8">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="text-base">{item.title}</h4>
                              <span className="text-sm text-gray-500">{item.timestamp}</span>
                            </div>
                            <p className="text-sm text-gray-600 mb-1">{item.description}</p>
                            <p className="text-xs text-gray-500">{item.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Conversations Sidebar with Tabs */}
        <div className="w-96 flex-shrink-0">
          <Card className="h-full flex flex-col">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Conversations
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col min-h-0 p-0">
              {/* Main Tabs: Email, WhatsApp, Phone, Files, Audit */}
              <div className="border-b">
                <div className="flex">
                  <button
                    onClick={() => setConversationTab('email')}
                    className={`flex-1 px-3 py-3 text-sm font-medium transition-colors relative ${
                      conversationTab === 'email'
                        ? 'border-b-2 border-purple-600 text-purple-600'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <div className="flex items-center justify-center gap-1.5">
                      <Mail className="w-4 h-4" />
                      <span className="text-xs">3</span>
                    </div>
                  </button>
                  <button
                    onClick={() => setConversationTab('whatsapp')}
                    className={`flex-1 px-3 py-3 text-sm font-medium transition-colors ${
                      conversationTab === 'whatsapp'
                        ? 'border-b-2 border-purple-600 text-purple-600'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <div className="flex items-center justify-center gap-1.5">
                      <MessageSquare className="w-4 h-4" />
                      <span className="text-xs">3</span>
                    </div>
                  </button>
                  <button
                    onClick={() => setConversationTab('phone')}
                    className={`flex-1 px-3 py-3 text-sm font-medium transition-colors ${
                      conversationTab === 'phone'
                        ? 'border-b-2 border-purple-600 text-purple-600'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <div className="flex items-center justify-center gap-1.5">
                      <Phone className="w-4 h-4" />
                      {callHistory.length > 0 && <span className="text-xs">{callHistory.length}</span>}
                    </div>
                  </button>
                  <button
                    onClick={() => setConversationTab('files')}
                    className={`flex-1 px-3 py-3 text-sm font-medium transition-colors ${
                      conversationTab === 'files'
                        ? 'border-b-2 border-purple-600 text-purple-600'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <div className="flex items-center justify-center gap-1.5">
                      <FileIcon className="w-4 h-4" />
                      <span className="text-xs">5</span>
                    </div>
                  </button>
                  <button
                    onClick={() => setConversationTab('audit')}
                    className={`flex-1 px-3 py-3 text-sm font-medium transition-colors ${
                      conversationTab === 'audit'
                        ? 'border-b-2 border-purple-600 text-purple-600'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <div className="flex items-center justify-center gap-1.5">
                      <History className="w-4 h-4" />
                      <span className="text-xs">8</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Email Tab Content */}
              {conversationTab === 'email' && (
                <>
                  {/* Messages */}
                  <ScrollArea className="flex-1 px-4 py-4">
                    <div className="space-y-4">
                      {editedData.conversations.find((c: any) => c.type === 'email')?.messages.map((message: any) => (
                        <div
                          key={message.id}
                          className={`flex ${message.sender === 'recruiter' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[80%] rounded-lg p-3 ${
                              message.sender === 'recruiter'
                                ? 'bg-purple-600 text-white'
                                : 'bg-gray-100 text-gray-900'
                            }`}
                          >
                            {message.subject && (
                              <p className="text-sm mb-2 opacity-90">
                                <strong>{message.subject}</strong>
                              </p>
                            )}
                            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                            {message.attachments && message.attachments.length > 0 && (
                              <div className="mt-2 space-y-1">
                                {message.attachments.map((att: any, index: number) => (
                                  <div
                                    key={index}
                                    className={`flex items-center gap-2 text-xs p-2 rounded ${
                                      message.sender === 'recruiter'
                                        ? 'bg-purple-700'
                                        : 'bg-gray-200'
                                    }`}
                                  >
                                    <Paperclip className="w-3 h-3" />
                                    <span>{att.name}</span>
                                    <span className="opacity-75">({att.size})</span>
                                  </div>
                                ))}
                              </div>
                            )}
                            <div className="flex items-center justify-between mt-2">
                              <p className="text-xs opacity-75">{message.timestamp}</p>
                              {message.sender === 'recruiter' && message.read && (
                                <CheckCheck className="w-4 h-4" />
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>

                  {/* Email Composer Actions */}
                  <div className="border-t p-4">
                    <div className="flex gap-2">
                      <Button
                        onClick={() => {
                          setEmailComposerMode('compose');
                          setShowEmailComposerDialog(true);
                        }}
                        className="flex-1"
                        variant="outline"
                      >
                        <Mail className="w-4 h-4 mr-2" />
                        Compose Email
                      </Button>
                      <Button
                        onClick={() => {
                          setEmailComposerMode('reply');
                          setShowEmailComposerDialog(true);
                        }}
                        className="flex-1"
                      >
                        <Sparkles className="w-4 h-4 mr-2" />
                        AI Generate Draft
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500 mt-2 text-center">
                      AI will analyze previous email & WhatsApp conversations
                    </p>
                  </div>
                </>
              )}

              {/* WhatsApp Tab Content */}
              {conversationTab === 'whatsapp' && (
                <>
                  {/* Messages */}
                  <ScrollArea className="flex-1 px-4 py-4">
                    <div className="space-y-4">
                      {editedData.conversations.find((c: any) => c.type === 'whatsapp')?.messages.map((message: any) => (
                        <div
                          key={message.id}
                          className={`flex ${message.sender === 'recruiter' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[80%] rounded-lg p-3 ${
                              message.sender === 'recruiter'
                                ? 'bg-green-600 text-white'
                                : 'bg-gray-100 text-gray-900'
                            }`}
                          >
                            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                            {message.attachments && message.attachments.length > 0 && (
                              <div className="mt-2 space-y-1">
                                {message.attachments.map((att: any, index: number) => (
                                  <div
                                    key={index}
                                    className={`flex items-center gap-2 text-xs p-2 rounded ${
                                      message.sender === 'recruiter'
                                        ? 'bg-green-700'
                                        : 'bg-gray-200'
                                    }`}
                                  >
                                    <Paperclip className="w-3 h-3" />
                                    <span>{att.name}</span>
                                    <span className="opacity-75">({att.size})</span>
                                  </div>
                                ))}
                              </div>
                            )}
                            <div className="flex items-center justify-between mt-2">
                              <p className="text-xs opacity-75">{message.timestamp}</p>
                              {message.sender === 'recruiter' && message.read && (
                                <CheckCheck className="w-4 h-4" />
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>

                  {/* Message Input */}
                  <div className="border-t p-4">
                    {attachments.length > 0 && (
                      <div className="mb-2 space-y-1">
                        {attachments.map((file, index) => (
                          <div key={index} className="flex items-center justify-between bg-gray-100 p-2 rounded">
                            <div className="flex items-center gap-2">
                              <Paperclip className="w-4 h-4" />
                              <span className="text-sm">{file.name}</span>
                            </div>
                            <button onClick={() => handleRemoveAttachment(index)}>
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="flex gap-2">
                      <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        className="hidden"
                        onChange={handleFileAttachment}
                      />
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Paperclip className="w-4 h-4" />
                      </Button>
                      <Input
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                      />
                      <Button onClick={handleSendMessage}>
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </>
              )}

              {/* Phone Tab Content */}
              {conversationTab === 'phone' && (
                <>
                  {!isCallActive && !postCallSummary ? (
                    // Pre-call state - Show call history and dial button
                    <>
                      <ScrollArea className="flex-1 p-4">
                        {callHistory.length > 0 ? (
                          <div className="space-y-3">
                            <div className="flex items-center justify-between mb-3">
                              <h3 className="text-sm font-medium">Call History</h3>
                              <Badge variant="outline" className="text-xs">
                                {callHistory.length} {callHistory.length === 1 ? 'call' : 'calls'}
                              </Badge>
                            </div>
                            {callHistory.map((call) => (
                              <div key={call.id} className="border rounded-lg overflow-hidden transition-all">
                                <div 
                                  className="p-3 hover:bg-gray-50 cursor-pointer"
                                  onClick={() => setExpandedCallId(expandedCallId === call.id ? null : call.id)}
                                >
                                  <div className="flex items-start justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                      {call.direction === 'incoming' ? (
                                        <PhoneIncoming className="w-4 h-4 text-blue-600" />
                                      ) : (
                                        <PhoneOutgoing className="w-4 h-4 text-green-600" />
                                      )}
                                      <div>
                                        <p className="text-sm font-medium">{call.date}</p>
                                        <p className="text-xs text-gray-500">{call.time}</p>
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Badge 
                                        variant="outline" 
                                        className={call.direction === 'incoming' ? 'text-blue-600 border-blue-200' : 'text-green-600 border-green-200'}
                                      >
                                        {call.direction}
                                      </Badge>
                                      <span className="text-xs text-gray-500">{call.duration}</span>
                                      {expandedCallId === call.id ? (
                                        <ChevronDown className="w-4 h-4 text-gray-400" />
                                      ) : (
                                        <ChevronRight className="w-4 h-4 text-gray-400" />
                                      )}
                                    </div>
                                  </div>
                                  <p className="text-xs text-gray-600">{call.summary}</p>
                                </div>
                                
                                {/* Expanded Details */}
                                {expandedCallId === call.id && (
                                  <div className="border-t bg-gray-50 p-4 space-y-3">
                                    {/* Recruiter Notes */}
                                    {call.notes && (
                                      <div>
                                        <p className="text-xs font-medium text-gray-700 mb-1 flex items-center gap-1">
                                          <FileText className="w-3 h-3" />
                                          Recruiter Notes
                                        </p>
                                        <p className="text-xs text-gray-600 bg-white p-2 rounded border">{call.notes}</p>
                                      </div>
                                    )}
                                    
                                    {/* AI Analysis */}
                                    {call.aiAnalysis && (
                                      <div className="space-y-2">
                                        <p className="text-xs font-medium text-gray-700 flex items-center gap-1">
                                          <Sparkles className="w-3 h-3 text-purple-600" />
                                          AI Analysis
                                        </p>
                                        <div className="space-y-2">
                                          <div className="bg-white p-2 rounded border">
                                            <p className="text-xs font-medium text-gray-600 mb-0.5">Job Fit</p>
                                            <p className="text-xs text-gray-700">{call.aiAnalysis.jdFit}</p>
                                          </div>
                                          <div className="bg-white p-2 rounded border">
                                            <p className="text-xs font-medium text-gray-600 mb-0.5">Soft Skills</p>
                                            <p className="text-xs text-gray-700">{call.aiAnalysis.softSkills}</p>
                                          </div>
                                          <div className="bg-white p-2 rounded border">
                                            <p className="text-xs font-medium text-gray-600 mb-0.5">Overall Assessment</p>
                                            <p className="text-xs text-gray-700">{call.aiAnalysis.overallAssessment}</p>
                                          </div>
                                          <div className="bg-purple-50 p-2 rounded border border-purple-200">
                                            <p className="text-xs font-medium text-purple-700 mb-0.5">Recommendation</p>
                                            <p className="text-xs text-purple-900">{call.aiAnalysis.recommendation}</p>
                                          </div>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center h-full text-center p-6">
                            <Phone className="w-12 h-12 text-gray-300 mb-3" />
                            <p className="text-sm text-gray-500 mb-2">No call history</p>
                            <p className="text-xs text-gray-400">Click below to start your first call</p>
                          </div>
                        )}
                      </ScrollArea>
                      
                      <div className="border-t p-4">
                        <Button 
                          className="w-full bg-green-600 hover:bg-green-700"
                          onClick={handleStartCall}
                          disabled={isCallConnecting}
                        >
                          {isCallConnecting ? (
                            <>
                              <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              Connecting...
                            </>
                          ) : (
                            <>
                              <Phone className="w-4 h-4 mr-2" />
                              Call {editedData.name}
                            </>
                          )}
                        </Button>
                        <p className="text-xs text-gray-500 mt-2 text-center">
                          {editedData.phone}
                        </p>
                      </div>
                    </>
                  ) : isCallActive ? (
                    // Active call state - Show real-time transcript and sentiment
                    <>
                      {/* Call Header */}
                      <div className="p-4 bg-green-50 border-b">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-green-600 rounded-full animate-pulse" />
                            <p className="text-sm font-medium">Call in progress</p>
                          </div>
                          <p className="text-sm text-gray-600">
                            {Math.floor(callDuration / 60)}:{(callDuration % 60).toString().padStart(2, '0')}
                          </p>
                        </div>
                        
                        {/* Live Sentiment Indicator */}
                        {liveSentiment && (
                          <div className="mt-3 p-2 bg-white rounded-lg">
                            <div className="flex items-center justify-between mb-1">
                              <p className="text-xs font-medium">Live Sentiment</p>
                              <Badge 
                                className={
                                  liveSentiment.overall === 'positive' ? 'bg-green-100 text-green-700' :
                                  liveSentiment.overall === 'negative' ? 'bg-red-100 text-red-700' :
                                  'bg-gray-100 text-gray-700'
                                }
                              >
                                {liveSentiment.overall}
                              </Badge>
                            </div>
                            <Progress value={liveSentiment.score} className="h-1" />
                            {liveSentiment.keywords.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-2">
                                {liveSentiment.keywords.map((keyword, idx) => (
                                  <span key={idx} className="text-xs bg-purple-50 text-purple-600 px-2 py-0.5 rounded">
                                    {keyword}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Live Transcript */}
                      <ScrollArea className="flex-1 p-4">
                        <div className="space-y-3">
                          <p className="text-xs text-gray-500 text-center mb-4">Live Transcript</p>
                          {callTranscript.map((entry, idx) => (
                            <div
                              key={idx}
                              className={`flex ${entry.speaker === 'recruiter' ? 'justify-end' : 'justify-start'}`}
                            >
                              <div
                                className={`max-w-[85%] rounded-lg p-3 ${
                                  entry.speaker === 'recruiter'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 text-gray-900'
                                }`}
                              >
                                <p className="text-xs opacity-75 mb-1">
                                  {entry.speaker === 'recruiter' ? 'You' : editedData.name}
                                </p>
                                <p className="text-sm">{entry.text}</p>
                                <div className="flex items-center justify-between mt-1">
                                  <p className="text-xs opacity-75">{entry.timestamp}</p>
                                  {entry.sentiment && (
                                    <span className={`text-xs ${
                                      entry.sentiment === 'positive' ? 'text-green-300' :
                                      entry.sentiment === 'negative' ? 'text-red-300' :
                                      'text-gray-300'
                                    }`}>
                                      {entry.sentiment === 'positive' ? '😊' : entry.sentiment === 'negative' ? '😟' : '😐'}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>

                      {/* End Call Button */}
                      <div className="border-t p-4">
                        <Button 
                          className="w-full bg-red-600 hover:bg-red-700"
                          onClick={handleEndCall}
                        >
                          <Phone className="w-4 h-4 mr-2 rotate-135" />
                          End Call
                        </Button>
                      </div>
                    </>
                  ) : postCallSummary ? (
                    // Post-call state - Show AI summary and notes
                    <>
                      <ScrollArea className="flex-1 p-4">
                        <div className="space-y-4">
                          {/* AI Summary Header */}
                          <div className="flex items-center gap-2 mb-4">
                            <Sparkles className="w-5 h-5 text-purple-600" />
                            <h3 className="font-medium">AI Call Analysis</h3>
                          </div>

                          {/* JD Suitability */}
                          <div className="p-3 bg-blue-50 rounded-lg">
                            <p className="text-sm font-medium mb-2 flex items-center gap-2">
                              <Briefcase className="w-4 h-4" />
                              Job Fit Analysis
                            </p>
                            <p className="text-sm text-gray-700">{postCallSummary.jdFit}</p>
                          </div>

                          {/* Soft Skills Assessment */}
                          <div className="p-3 bg-green-50 rounded-lg">
                            <p className="text-sm font-medium mb-2 flex items-center gap-2">
                              <UserCheck className="w-4 h-4" />
                              Soft Skills Assessment
                            </p>
                            <p className="text-sm text-gray-700">{postCallSummary.softSkills}</p>
                          </div>

                          {/* Overall Assessment */}
                          <div className="p-3 bg-purple-50 rounded-lg">
                            <p className="text-sm font-medium mb-2 flex items-center gap-2">
                              <TrendingUp className="w-4 h-4" />
                              Overall Assessment
                            </p>
                            <p className="text-sm text-gray-700">{postCallSummary.overallAssessment}</p>
                          </div>

                          {/* Recommendation */}
                          <div className="p-3 bg-yellow-50 rounded-lg">
                            <p className="text-sm font-medium mb-2">Recommendation</p>
                            <p className="text-sm text-gray-700">{postCallSummary.recommendation}</p>
                          </div>

                          <Separator />

                          {/* Recruiter Notes */}
                          <div>
                            <Label htmlFor="call-notes" className="text-sm font-medium mb-2 block">
                              Your Notes
                            </Label>
                            <Textarea
                              id="call-notes"
                              placeholder="Add your observations from the call..."
                              value={callNotes}
                              onChange={(e) => setCallNotes(e.target.value)}
                              rows={4}
                              className="w-full"
                            />
                          </div>
                        </div>
                      </ScrollArea>

                      {/* Save to Interview History */}
                      <div className="border-t p-4 space-y-2">
                        <Button 
                          className="w-full"
                          onClick={handleSaveCallToHistory}
                        >
                          <Save className="w-4 h-4 mr-2" />
                          Save to Interview History
                        </Button>
                        <Button 
                          variant="outline"
                          className="w-full"
                          onClick={handleDiscardCall}
                        >
                          Discard
                        </Button>
                      </div>
                    </>
                  ) : null}
                </>
              )}

              {/* Files Tab Content */}
              {conversationTab === 'files' && (
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-3">
                    {editedData.files.map((file: any) => (
                      <div key={file.id} className="p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded bg-purple-100 flex items-center justify-center flex-shrink-0">
                            <FileText className="w-5 h-5 text-purple-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{file.name}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              {file.size} • {file.category}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                              Uploaded by {file.uploadedBy} • {file.uploadedAt}
                            </p>
                          </div>
                          <Button size="sm" variant="ghost">
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full mt-4" variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Upload File
                  </Button>
                </ScrollArea>
              )}

              {/* Audit Tab Content */}
              {conversationTab === 'audit' && (
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {editedData.auditHistory.map((audit: any, index: number) => (
                      <div key={audit.id} className="relative">
                        {index !== editedData.auditHistory.length - 1 && (
                          <div className="absolute left-4 top-8 bottom-0 w-px bg-gray-200" />
                        )}
                        <div className="flex gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                            audit.type === 'create' ? 'bg-green-100' :
                            audit.type === 'update' ? 'bg-blue-100' :
                            audit.type === 'email' ? 'bg-purple-100' :
                            audit.type === 'view' ? 'bg-gray-100' :
                            audit.type === 'interview' ? 'bg-yellow-100' :
                            audit.type === 'note' ? 'bg-orange-100' :
                            audit.type === 'share' ? 'bg-pink-100' :
                            'bg-gray-100'
                          }`}>
                            {audit.type === 'create' && <Plus className="w-4 h-4 text-green-600" />}
                            {audit.type === 'update' && <Edit className="w-4 h-4 text-blue-600" />}
                            {audit.type === 'email' && <Mail className="w-4 h-4 text-purple-600" />}
                            {audit.type === 'view' && <Eye className="w-4 h-4 text-gray-600" />}
                            {audit.type === 'interview' && <Calendar className="w-4 h-4 text-yellow-600" />}
                            {audit.type === 'note' && <FileText className="w-4 h-4 text-orange-600" />}
                            {audit.type === 'share' && <Share2 className="w-4 h-4 text-pink-600" />}
                          </div>
                          <div className="flex-1 pb-4">
                            <p className="text-sm font-medium">{audit.action}</p>
                            <p className="text-xs text-gray-600 mt-1">{audit.details}</p>
                            <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                              <UserCheck className="w-3 h-3" />
                              <span>{audit.user}</span>
                              <span>•</span>
                              <span>{audit.timestamp}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Share Dialog */}
      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share Candidate Profile</DialogTitle>
            <DialogDescription>
              Generate a shareable link to send this candidate profile to your client for review
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              The generated link will allow clients to view this candidate's profile without accessing your recruitment platform.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowShareDialog(false)}>Cancel</Button>
            <Button onClick={handleShareProfile}>Generate & Copy Link</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Anonymize Dialog */}
      <Dialog open={showAnonymizeDialog} onOpenChange={setShowAnonymizeDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Download Anonymized Resume</DialogTitle>
            <DialogDescription>
              Select which fields to anonymize before sharing with the client
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            {Object.entries(anonymizeFields).map(([field, checked]) => (
              <div key={field} className="flex items-center space-x-2">
                <Checkbox
                  id={field}
                  checked={checked}
                  onCheckedChange={(checked) =>
                    setAnonymizeFields({ ...anonymizeFields, [field]: checked as boolean })
                  }
                />
                <label htmlFor={field} className="text-sm capitalize cursor-pointer">
                  {field.replace(/([A-Z])/g, ' $1').trim()}
                </label>
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAnonymizeDialog(false)}>Cancel</Button>
            <Button onClick={handleDownloadAnonymizedResume}>
              <Download className="w-4 h-4 mr-2" />
              Download Resume
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Email to Client Dialog */}
      <Dialog open={showEmailClientDialog} onOpenChange={setShowEmailClientDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Email Candidate to Client</DialogTitle>
            <DialogDescription>
              Send this candidate profile to your client for review
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="client-email">Client Email</Label>
              <Input id="client-email" type="email" placeholder="client@company.com" />
            </div>
            <div>
              <Label htmlFor="email-message">Message</Label>
              <Textarea
                id="email-message"
                placeholder="Hi, I wanted to share this candidate profile with you..."
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEmailClientDialog(false)}>Cancel</Button>
            <Button onClick={handleSendClientEmail}>
              <Send className="w-4 h-4 mr-2" />
              Send Email
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Email Composer Dialog */}
      <Dialog open={showEmailComposerDialog} onOpenChange={setShowEmailComposerDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {emailComposerMode === 'compose' ? 'Compose Email' : 'AI Generated Draft'}
            </DialogTitle>
            <DialogDescription>
              {emailComposerMode === 'reply' 
                ? 'AI will analyze previous email and WhatsApp conversations to generate a contextual reply'
                : 'Compose a new email to the candidate'
              }
            </DialogDescription>
          </DialogHeader>
          <AIEmailComposer
            mode={emailComposerMode}
            recipientEmail={editedData.email}
            recipientName={editedData.name}
            recipientType="candidate"
            context={{
              jobTitle: editedData.appliedFor,
              candidateTitle: editedData.title,
              previousMessage: getLastMessage(),
              conversationHistory: getConversationHistory()
            }}
            onSend={handleSendEmail}
            onCancel={() => setShowEmailComposerDialog(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Interview Sheet */}
      <InterviewSheet
        open={isInterviewSheetOpen}
        onOpenChange={setIsInterviewSheetOpen}
        candidateName={editedData.name}
        jobTitle={editedData.appliedFor}
      />
    </div>
  );
}

export default function CandidateDetailPage() {
  return <CandidateDetail />;
}

import { useState } from 'react';
import { 
  Mail, MessageSquare, Phone, Search, Filter, Clock, CheckCircle2, Circle, 
  Send, Sparkles, User, Briefcase, ArrowRight, Upload, FileText, Building2,
  TrendingUp, TrendingDown, BarChart3, Users, Eye, MousePointerClick, 
  Reply, AlertCircle, CheckCheck, XCircle, Pause, Play, Settings, Plus,
  MoreVertical, Calendar, Target, Zap, Activity, Inbox as InboxIcon
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import { Avatar, AvatarFallback } from './ui/avatar';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { ResumeParser } from './ResumeParser';
import { toast } from 'sonner@2.0.3';
import { Progress } from './ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { AIEmailComposer } from './AIEmailComposer';

interface InboxProps {
  onSelectCandidate: (candidateId: number) => void;
}

// ============ CANDIDATE COMMUNICATION DATA ============
const candidateCommunications = [
  {
    id: 1,
    candidateId: 1,
    candidateName: 'Sarah Johnson',
    candidateTitle: 'Senior Full Stack Developer',
    candidateAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    jobId: 1,
    jobTitle: 'Senior Full Stack Developer',
    type: 'email' as const,
    status: 'responded' as const,
    subject: 'Exciting Opportunity at TechCorp Solutions',
    preview: 'Hi Sarah, I came across your profile and was impressed by your experience with React and Node.js...',
    lastMessage: 'Thank you for reaching out! I\'m definitely interested in learning more.',
    sentAt: '2024-10-30 10:30 AM',
    respondedAt: '2024-10-30 2:45 PM',
    unread: true,
    hasAttachment: true,
  },
  {
    id: 2,
    candidateId: 4,
    candidateName: 'David Park',
    candidateTitle: 'Data Scientist',
    candidateAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
    jobId: 2,
    jobTitle: 'Senior Data Scientist',
    type: 'sms' as const,
    status: 'responded' as const,
    subject: null,
    preview: 'Hi David! Quick question - would you be interested in a Data Scientist role at DataCorp?',
    lastMessage: 'Yes, I\'m interested! Can we schedule a call?',
    sentAt: '2024-10-30 9:15 AM',
    respondedAt: '2024-10-30 9:42 AM',
    unread: true,
    hasAttachment: false,
  },
  {
    id: 3,
    candidateId: 3,
    candidateName: 'Emily Rodriguez',
    candidateTitle: 'UX/UI Designer',
    candidateAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    jobId: 3,
    jobTitle: 'Senior UX Designer',
    type: 'email' as const,
    status: 'sent' as const,
    subject: 'UX Designer Role at DesignHub Creative',
    preview: 'Hi Emily, Your portfolio caught our attention. We\'re hiring for a Senior UX Designer...',
    lastMessage: 'Hi Emily, Your portfolio caught our attention.',
    sentAt: '2024-10-31 8:00 AM',
    respondedAt: null,
    unread: false,
    hasAttachment: false,
  },
  {
    id: 4,
    candidateId: 5,
    candidateName: 'Michael Chen',
    candidateTitle: 'DevOps Engineer',
    candidateAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    jobId: 4,
    jobTitle: 'DevOps Engineer',
    type: 'email' as const,
    status: 'responded' as const,
    subject: 'Follow-up: DevOps Engineer Position',
    preview: 'Hi Michael, Just following up on our last conversation about the DevOps role...',
    lastMessage: 'I appreciate the follow-up. I\'m still very interested.',
    sentAt: '2024-10-29 3:20 PM',
    respondedAt: '2024-10-29 5:10 PM',
    unread: false,
    hasAttachment: false,
  },
];

// ============ ACCOUNT COMMUNICATION DATA ============
const accountCommunications = [
  {
    id: 1,
    accountId: 1,
    accountName: 'TechCorp Solutions',
    contactName: 'Jennifer Martinez',
    contactTitle: 'VP of Engineering',
    contactAvatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400',
    type: 'email' as const,
    status: 'responded' as const,
    subject: 'Candidate Shortlist for Senior Developer Role',
    preview: 'Hi Jennifer, I\'ve prepared a shortlist of 3 exceptional candidates for your review...',
    lastMessage: 'Great! These candidates look promising. Let\'s schedule interviews for all three.',
    sentAt: '2024-10-31 10:00 AM',
    respondedAt: '2024-10-31 11:30 AM',
    unread: true,
    priority: 'high' as const,
  },
  {
    id: 2,
    accountId: 2,
    accountName: 'DataCorp Analytics',
    contactName: 'Robert Thompson',
    contactTitle: 'Hiring Manager',
    contactAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    type: 'email' as const,
    status: 'responded' as const,
    subject: 'Next Steps for Data Scientist Position',
    preview: 'Hi Robert, Following up on the interviews conducted last week...',
    lastMessage: 'Thanks for the update. We\'d like to extend an offer to David.',
    sentAt: '2024-10-30 2:15 PM',
    respondedAt: '2024-10-30 4:20 PM',
    unread: true,
    priority: 'high' as const,
  },
  {
    id: 3,
    accountId: 3,
    accountName: 'DesignHub Creative',
    contactName: 'Lisa Wang',
    contactTitle: 'Creative Director',
    contactAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400',
    type: 'email' as const,
    status: 'sent' as const,
    subject: 'Introduction: UX Designer Candidates',
    preview: 'Hi Lisa, I hope this email finds you well. I wanted to introduce you to some talented UX designers...',
    lastMessage: 'Hi Lisa, I hope this email finds you well.',
    sentAt: '2024-10-31 9:00 AM',
    respondedAt: null,
    unread: false,
    priority: 'medium' as const,
  },
  {
    id: 4,
    accountId: 4,
    accountName: 'CloudScale Inc',
    contactName: 'James Rodriguez',
    contactTitle: 'CTO',
    contactAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400',
    type: 'email' as const,
    status: 'responded' as const,
    subject: 'Q4 Hiring Plans Discussion',
    preview: 'Hi James, Thank you for the call yesterday. As discussed, here\'s an overview of our recruitment strategy...',
    lastMessage: 'Perfect! Let\'s move forward with this plan.',
    sentAt: '2024-10-29 1:30 PM',
    respondedAt: '2024-10-29 3:45 PM',
    unread: false,
    priority: 'medium' as const,
  },
];

// ============ OUTREACH CAMPAIGNS DATA ============
const outreachCampaigns = [
  {
    id: 1,
    name: 'Senior Developer Outreach - Q4 2024',
    status: 'active' as const,
    totalContacts: 250,
    contacted: 180,
    opened: 95,
    replied: 28,
    interested: 15,
    bounced: 8,
    unsubscribed: 3,
    sequences: 4,
    createdAt: '2024-10-15',
    lastActivity: '2 hours ago',
    openRate: 52.8,
    replyRate: 15.6,
    interestedRate: 8.3,
  },
  {
    id: 2,
    name: 'Data Science Talent Pool',
    status: 'active' as const,
    totalContacts: 180,
    contacted: 150,
    opened: 72,
    replied: 21,
    interested: 12,
    bounced: 5,
    unsubscribed: 2,
    sequences: 3,
    createdAt: '2024-10-20',
    lastActivity: '5 hours ago',
    openRate: 48.0,
    replyRate: 14.0,
    interestedRate: 8.0,
  },
  {
    id: 3,
    name: 'UX Designer Pipeline',
    status: 'paused' as const,
    totalContacts: 120,
    contacted: 85,
    opened: 38,
    replied: 12,
    interested: 7,
    bounced: 3,
    unsubscribed: 1,
    sequences: 3,
    createdAt: '2024-10-10',
    lastActivity: '2 days ago',
    openRate: 44.7,
    replyRate: 14.1,
    interestedRate: 8.2,
  },
  {
    id: 4,
    name: 'DevOps Engineers - Tech Companies',
    status: 'active' as const,
    totalContacts: 200,
    contacted: 145,
    opened: 68,
    replied: 18,
    interested: 9,
    bounced: 6,
    unsubscribed: 2,
    sequences: 4,
    createdAt: '2024-10-25',
    lastActivity: '1 hour ago',
    openRate: 46.9,
    replyRate: 12.4,
    interestedRate: 6.2,
  },
];

// ============ EMAILS NEEDING ATTENTION ============
const emailsNeedingAttention = [
  {
    id: 1,
    campaignId: 1,
    campaignName: 'Senior Developer Outreach - Q4 2024',
    prospectName: 'Alex Thompson',
    prospectTitle: 'Senior Software Engineer',
    prospectCompany: 'Tech Innovations Inc',
    prospectAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400',
    status: 'interested' as const,
    subject: 'Re: Exciting Senior Developer Opportunity',
    lastMessage: 'This sounds interesting! I\'d like to learn more about the role and compensation.',
    receivedAt: '30 minutes ago',
    sequenceStep: 2,
    priority: 'high' as const,
  },
  {
    id: 2,
    campaignId: 2,
    campaignName: 'Data Science Talent Pool',
    prospectName: 'Priya Sharma',
    prospectTitle: 'Data Scientist',
    prospectCompany: 'Analytics Pro',
    prospectAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
    status: 'interested' as const,
    subject: 'Re: Data Science Leadership Role',
    lastMessage: 'I\'m very interested. Can we schedule a call this week?',
    receivedAt: '1 hour ago',
    sequenceStep: 3,
    priority: 'high' as const,
  },
  {
    id: 3,
    campaignId: 1,
    campaignName: 'Senior Developer Outreach - Q4 2024',
    prospectName: 'Marcus Johnson',
    prospectTitle: 'Full Stack Developer',
    prospectCompany: 'StartupXYZ',
    prospectAvatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400',
    status: 'replied' as const,
    subject: 'Re: Full Stack Developer Opportunity',
    lastMessage: 'Thanks for reaching out. Could you share more details about the tech stack?',
    receivedAt: '2 hours ago',
    sequenceStep: 1,
    priority: 'medium' as const,
  },
  {
    id: 4,
    campaignId: 4,
    campaignName: 'DevOps Engineers - Tech Companies',
    prospectName: 'Rachel Kim',
    prospectTitle: 'DevOps Lead',
    prospectCompany: 'Cloud Systems Ltd',
    prospectAvatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400',
    status: 'interested' as const,
    subject: 'Re: DevOps Leadership Opportunity',
    lastMessage: 'I\'m actively looking for new opportunities. This sounds like a great fit!',
    receivedAt: '3 hours ago',
    sequenceStep: 2,
    priority: 'high' as const,
  },
  {
    id: 5,
    campaignId: 2,
    campaignName: 'Data Science Talent Pool',
    prospectName: 'Tom Anderson',
    prospectTitle: 'ML Engineer',
    prospectCompany: 'AI Dynamics',
    prospectAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400',
    status: 'not_interested' as const,
    subject: 'Re: Machine Learning Engineer Role',
    lastMessage: 'Thank you, but I\'m not looking to make a move at this time.',
    receivedAt: '5 hours ago',
    sequenceStep: 2,
    priority: 'low' as const,
  },
  {
    id: 6,
    campaignId: 1,
    campaignName: 'Senior Developer Outreach - Q4 2024',
    prospectName: 'Sofia Martinez',
    prospectTitle: 'Software Architect',
    prospectCompany: 'Enterprise Solutions',
    prospectAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400',
    status: 'question' as const,
    subject: 'Re: Software Architecture Position',
    lastMessage: 'Is this role remote? And what\'s the team size?',
    receivedAt: '6 hours ago',
    sequenceStep: 1,
    priority: 'medium' as const,
  },
];

export function Inbox({ onSelectCandidate }: InboxProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState('candidate');
  const [selectedCampaign, setSelectedCampaign] = useState<number | null>(null);
  const [showParserDialog, setShowParserDialog] = useState(false);
  const [showComposeDialog, setShowComposeDialog] = useState(false);
  const [showReplyDialog, setShowReplyDialog] = useState(false);
  const [composeMode, setComposeMode] = useState<'compose' | 'reply'>('compose');
  const [selectedMessage, setSelectedMessage] = useState<any>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'responded':
      case 'interested':
        return 'bg-green-100 text-green-700';
      case 'sent':
      case 'replied':
      case 'question':
        return 'bg-blue-100 text-blue-700';
      case 'not_interested':
        return 'bg-red-100 text-red-700';
      case 'bounced':
        return 'bg-orange-100 text-orange-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600';
      case 'medium':
        return 'text-yellow-600';
      case 'low':
        return 'text-gray-600';
      default:
        return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'interested':
        return <TrendingUp className="w-4 h-4" />;
      case 'not_interested':
        return <TrendingDown className="w-4 h-4" />;
      case 'replied':
      case 'question':
        return <Reply className="w-4 h-4" />;
      case 'bounced':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Mail className="w-4 h-4" />;
    }
  };

  // Render Candidate Communication Tab
  const renderCandidateTab = () => (
    <div className="grid grid-cols-12 gap-6">
      {/* Message List */}
      <div className="col-span-4">
        <Card>
          <CardHeader className="border-b">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Messages</CardTitle>
              <Badge variant="secondary">{candidateCommunications.length}</Badge>
            </div>
            <div className="relative mt-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search messages..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2 mt-3">
              <Select defaultValue="all">
                <SelectTrigger className="h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Messages</SelectItem>
                  <SelectItem value="unread">Unread</SelectItem>
                  <SelectItem value="responded">Responded</SelectItem>
                  <SelectItem value="sent">Sent</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="recent">
                <SelectTrigger className="h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="unread">Unread First</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <ScrollArea className="h-[600px]">
            <div className="divide-y">
              {candidateCommunications.map((comm) => (
                <div
                  key={comm.id}
                  className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                    comm.unread ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <Avatar className="w-10 h-10">
                      <ImageWithFallback
                        src={comm.candidateAvatar}
                        alt={comm.candidateName}
                        className="w-full h-full object-cover"
                      />
                      <AvatarFallback>{comm.candidateName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm truncate">
                            {comm.unread && <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mr-2" />}
                            {comm.candidateName}
                          </p>
                          <p className="text-xs text-gray-500 truncate">{comm.candidateTitle}</p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          {comm.type === 'email' ? (
                            <Mail className="w-4 h-4 text-gray-400" />
                          ) : (
                            <MessageSquare className="w-4 h-4 text-gray-400" />
                          )}
                          {comm.hasAttachment && <FileText className="w-4 h-4 text-gray-400" />}
                        </div>
                      </div>
                      {comm.subject && (
                        <p className="text-xs mb-1 truncate">{comm.subject}</p>
                      )}
                      <p className="text-xs text-gray-600 truncate mb-2">{comm.lastMessage}</p>
                      <div className="flex items-center justify-between">
                        <Badge className={`text-xs ${getStatusColor(comm.status)}`}>
                          {comm.status}
                        </Badge>
                        <p className="text-xs text-gray-400">{comm.respondedAt || comm.sentAt}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </Card>
      </div>

      {/* Message Detail */}
      <div className="col-span-8">
        <Card className="h-full">
          <CardHeader className="border-b">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <Avatar className="w-12 h-12">
                  <ImageWithFallback
                    src={candidateCommunications[0].candidateAvatar}
                    alt={candidateCommunications[0].candidateName}
                    className="w-full h-full object-cover"
                  />
                  <AvatarFallback>
                    {candidateCommunications[0].candidateName.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg">{candidateCommunications[0].candidateName}</h3>
                  <p className="text-sm text-gray-600">{candidateCommunications[0].candidateTitle}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Applied for: {candidateCommunications[0].jobTitle}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => onSelectCandidate(candidateCommunications[0].candidateId)}>
                  <User className="w-4 h-4 mr-2" />
                  View Profile
                </Button>
                <Dialog open={showParserDialog} onOpenChange={setShowParserDialog}>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="outline">
                      <Upload className="w-4 h-4 mr-2" />
                      Parse Resume
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[90vh]">
                    <DialogHeader>
                      <DialogTitle>Resume Parser</DialogTitle>
                      <DialogDescription>
                        Upload and parse resume from email attachment
                      </DialogDescription>
                    </DialogHeader>
                    <ResumeParser />
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </CardHeader>
          <ScrollArea className="h-[480px]">
            <CardContent className="pt-6 space-y-6">
              {/* Email Thread */}
              <div className="space-y-4">
                {/* Outgoing Message */}
                <div className="flex justify-end">
                  <div className="max-w-[80%]">
                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs">
                          JD
                        </div>
                        <div>
                          <p className="text-xs">You</p>
                          <p className="text-xs text-gray-500">2024-10-30 10:30 AM</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700 whitespace-pre-line">
                        Hi Sarah, I came across your profile and was impressed by your experience with React and Node.js. We have an exciting opportunity at TechCorp Solutions for a Senior Full Stack Developer role that I think would be a great fit for you.

The role offers:
• Remote work flexibility
• Competitive salary ($120k-$160k)
• Great team culture
• Cutting-edge tech stack

Would you be open to a brief call to discuss this opportunity?
                      </p>
                    </div>
                  </div>
                </div>

                {/* Incoming Message with Attachment */}
                <div className="flex justify-start">
                  <div className="max-w-[80%]">
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Avatar className="w-8 h-8">
                          <ImageWithFallback
                            src={candidateCommunications[0].candidateAvatar}
                            alt={candidateCommunications[0].candidateName}
                            className="w-full h-full object-cover"
                          />
                          <AvatarFallback>SJ</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-xs">{candidateCommunications[0].candidateName}</p>
                          <p className="text-xs text-gray-500">2024-10-30 2:45 PM</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700 mb-3">
                        Thank you for reaching out! I'm definitely interested in learning more about this opportunity. When would be a good time to discuss?
                      </p>
                      {/* Attachment */}
                      <div className="bg-gray-50 rounded p-3 border border-gray-200 flex items-center gap-3">
                        <FileText className="w-8 h-8 text-blue-600" />
                        <div className="flex-1">
                          <p className="text-xs">Sarah_Johnson_Resume.pdf</p>
                          <p className="text-xs text-gray-500">245 KB</p>
                        </div>
                        <Button size="sm" variant="outline">Download</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </ScrollArea>
          <div className="border-t p-4">
            <div className="space-y-3">
              {/* AI Quick Reply Suggestions */}
              <div className="flex gap-2 flex-wrap">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setSelectedMessage(candidateCommunications[0]);
                    setComposeMode('reply');
                    setShowReplyDialog(true);
                  }}
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  AI Reply
                </Button>
                <Button size="sm" variant="ghost">
                  Schedule Call
                </Button>
                <Button size="sm" variant="ghost">
                  Request More Info
                </Button>
              </div>
              <div className="flex gap-2">
                <Input placeholder="Type your message..." className="flex-1" />
                <Button>
                  <Send className="w-4 h-4 mr-2" />
                  Send
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );

  // Render Account Communication Tab
  const renderAccountTab = () => (
    <div className="grid grid-cols-12 gap-6">
      {/* Message List */}
      <div className="col-span-4">
        <Card>
          <CardHeader className="border-b">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Client Messages</CardTitle>
              <Badge variant="secondary">{accountCommunications.filter(c => c.unread).length} new</Badge>
            </div>
            <div className="relative mt-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search accounts..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2 mt-3">
              <Select defaultValue="all">
                <SelectTrigger className="h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="high">High Priority</SelectItem>
                  <SelectItem value="medium">Medium Priority</SelectItem>
                  <SelectItem value="low">Low Priority</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <ScrollArea className="h-[600px]">
            <div className="divide-y">
              {accountCommunications.map((comm) => (
                <div
                  key={comm.id}
                  className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                    comm.unread ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <Avatar className="w-10 h-10">
                      <ImageWithFallback
                        src={comm.contactAvatar}
                        alt={comm.contactName}
                        className="w-full h-full object-cover"
                      />
                      <AvatarFallback>{comm.contactName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm truncate flex items-center gap-2">
                            {comm.unread && <span className="inline-block w-2 h-2 bg-blue-600 rounded-full" />}
                            {comm.contactName}
                            {comm.priority === 'high' && (
                              <AlertCircle className={`w-3 h-3 ${getPriorityColor(comm.priority)}`} />
                            )}
                          </p>
                          <p className="text-xs text-gray-500 truncate">{comm.contactTitle}</p>
                          <p className="text-xs text-gray-400 truncate flex items-center gap-1">
                            <Building2 className="w-3 h-3" />
                            {comm.accountName}
                          </p>
                        </div>
                      </div>
                      <p className="text-xs mb-1 truncate">{comm.subject}</p>
                      <p className="text-xs text-gray-600 truncate mb-2">{comm.lastMessage}</p>
                      <div className="flex items-center justify-between">
                        <Badge className={`text-xs ${getStatusColor(comm.status)}`}>
                          {comm.status}
                        </Badge>
                        <p className="text-xs text-gray-400">{comm.respondedAt || comm.sentAt}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </Card>
      </div>

      {/* Message Detail */}
      <div className="col-span-8">
        <Card className="h-full">
          <CardHeader className="border-b">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <Avatar className="w-12 h-12">
                  <ImageWithFallback
                    src={accountCommunications[0].contactAvatar}
                    alt={accountCommunications[0].contactName}
                    className="w-full h-full object-cover"
                  />
                  <AvatarFallback>
                    {accountCommunications[0].contactName.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg">{accountCommunications[0].contactName}</h3>
                  <p className="text-sm text-gray-600">{accountCommunications[0].contactTitle}</p>
                  <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                    <Building2 className="w-3 h-3" />
                    {accountCommunications[0].accountName}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <Building2 className="w-4 h-4 mr-2" />
                  View Account
                </Button>
              </div>
            </div>
          </CardHeader>
          <ScrollArea className="h-[480px]">
            <CardContent className="pt-6 space-y-6">
              <div className="space-y-4">
                {/* Outgoing Message */}
                <div className="flex justify-end">
                  <div className="max-w-[80%]">
                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs">
                          JD
                        </div>
                        <div>
                          <p className="text-xs">You</p>
                          <p className="text-xs text-gray-500">2024-10-31 10:00 AM</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700 whitespace-pre-line">
                        Hi Jennifer,

I've prepared a shortlist of 3 exceptional candidates for your Senior Developer role at TechCorp Solutions. Each candidate has been carefully vetted and matches the requirements we discussed.

I'll send you their anonymized profiles separately for review. All three candidates have:
• 5+ years of experience with React and Node.js
• Strong leadership and mentoring capabilities
• Excellent communication skills
• Available to start within 2-4 weeks

Please let me know your thoughts, and we can schedule interviews for the candidates you'd like to meet.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Incoming Response */}
                <div className="flex justify-start">
                  <div className="max-w-[80%]">
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Avatar className="w-8 h-8">
                          <ImageWithFallback
                            src={accountCommunications[0].contactAvatar}
                            alt={accountCommunications[0].contactName}
                            className="w-full h-full object-cover"
                          />
                          <AvatarFallback>JM</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-xs">{accountCommunications[0].contactName}</p>
                          <p className="text-xs text-gray-500">2024-10-31 11:30 AM</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700">
                        Great! These candidates look promising. I've reviewed the profiles and would like to schedule interviews for all three. Can we set up times for next week? Tuesday and Wednesday work best for our team.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </ScrollArea>
          <div className="border-t p-4">
            <div className="space-y-3">
              {/* AI Quick Reply Suggestions */}
              <div className="flex gap-2 flex-wrap">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setSelectedMessage(accountCommunications[0]);
                    setComposeMode('reply');
                    setShowReplyDialog(true);
                  }}
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  AI Reply
                </Button>
                <Button size="sm" variant="ghost">
                  Send Candidate Profiles
                </Button>
                <Button size="sm" variant="ghost">
                  Schedule Meeting
                </Button>
              </div>
              <div className="flex gap-2">
                <Input placeholder="Type your message..." className="flex-1" />
                <Button>
                  <Send className="w-4 h-4 mr-2" />
                  Send
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );

  // Render Outreach Communication Tab
  const renderOutreachTab = () => (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 mb-1">Active Campaigns</p>
                <p className="text-2xl">
                  {outreachCampaigns.filter(c => c.status === 'active').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {outreachCampaigns.filter(c => c.status === 'paused').length} paused
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 mb-1">Total Contacted</p>
                <p className="text-2xl">
                  {outreachCampaigns.reduce((sum, c) => sum + c.contacted, 0)}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Send className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +12% this week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 mb-1">Avg Open Rate</p>
                <p className="text-2xl">
                  {(outreachCampaigns.reduce((sum, c) => sum + c.openRate, 0) / outreachCampaigns.length).toFixed(1)}%
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Eye className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">Industry avg: 45%</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 mb-1">Interested Replies</p>
                <p className="text-2xl">
                  {outreachCampaigns.reduce((sum, c) => sum + c.interested, 0)}
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +8% reply rate
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Emails Needing Attention */}
      <Card>
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-orange-600" />
                Needs Attention
              </CardTitle>
              <p className="text-sm text-gray-600 mt-1">
                {emailsNeedingAttention.filter(e => e.status === 'interested').length} interested • {emailsNeedingAttention.filter(e => e.status === 'question').length} questions
              </p>
            </div>
            <div className="flex gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="h-9 w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="interested">Interested</SelectItem>
                  <SelectItem value="question">Questions</SelectItem>
                  <SelectItem value="replied">Replied</SelectItem>
                  <SelectItem value="not_interested">Not Interested</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {emailsNeedingAttention.map((email) => (
              <div
                key={email.id}
                className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <div className="flex items-start gap-4">
                  <Avatar className="w-12 h-12">
                    <ImageWithFallback
                      src={email.prospectAvatar}
                      alt={email.prospectName}
                      className="w-full h-full object-cover"
                    />
                    <AvatarFallback>{email.prospectName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-sm">{email.prospectName}</p>
                          <Badge className={`text-xs ${getStatusColor(email.status)}`}>
                            {getStatusIcon(email.status)}
                            <span className="ml-1">{email.status.replace('_', ' ')}</span>
                          </Badge>
                          {email.priority === 'high' && (
                            <Badge variant="destructive" className="text-xs">
                              High Priority
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-gray-600">{email.prospectTitle} at {email.prospectCompany}</p>
                        <p className="text-xs text-gray-500">Campaign: {email.campaignName}</p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <p className="text-xs text-gray-500 whitespace-nowrap">{email.receivedAt}</p>
                        <Badge variant="outline" className="text-xs">
                          Step {email.sequenceStep}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-xs mb-1">{email.subject}</p>
                    <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded border border-gray-200">
                      {email.lastMessage}
                    </p>
                    <div className="flex gap-2 mt-3">
                      <Button 
                        size="sm" 
                        variant="default"
                        onClick={() => {
                          setSelectedMessage(email);
                          setComposeMode('reply');
                          setShowReplyDialog(true);
                        }}
                      >
                        <Sparkles className="w-3 h-3 mr-1" />
                        AI Reply
                      </Button>
                      <Button size="sm" variant="outline">
                        <Reply className="w-3 h-3 mr-1" />
                        Manual Reply
                      </Button>
                      {email.status === 'interested' && (
                        <Button size="sm" variant="outline">
                          <User className="w-3 h-3 mr-1" />
                          Convert to Candidate
                        </Button>
                      )}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="sm" variant="ghost">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Mark as Read</DropdownMenuItem>
                          <DropdownMenuItem>Schedule Follow-up</DropdownMenuItem>
                          <DropdownMenuItem>Remove from Campaign</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">Archive</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Campaign List */}
      <Card>
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Outreach Campaigns</CardTitle>
              <p className="text-sm text-gray-600 mt-1">
                Manage your cold email campaigns and track performance
              </p>
            </div>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Campaign
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Campaign Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-center">Contacts</TableHead>
                <TableHead className="text-center">Contacted</TableHead>
                <TableHead className="text-center">Open Rate</TableHead>
                <TableHead className="text-center">Reply Rate</TableHead>
                <TableHead className="text-center">Interested</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {outreachCampaigns.map((campaign) => (
                <TableRow key={campaign.id} className="cursor-pointer hover:bg-gray-50">
                  <TableCell>
                    <div>
                      <p className="text-sm">{campaign.name}</p>
                      <p className="text-xs text-gray-500">
                        {campaign.sequences} sequences • Last activity: {campaign.lastActivity}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={campaign.status === 'active' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {campaign.status === 'active' ? (
                        <Play className="w-3 h-3 mr-1" />
                      ) : (
                        <Pause className="w-3 h-3 mr-1" />
                      )}
                      {campaign.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">{campaign.totalContacts}</TableCell>
                  <TableCell className="text-center">
                    <div>
                      <p className="text-sm">{campaign.contacted}</p>
                      <Progress
                        value={(campaign.contacted / campaign.totalContacts) * 100}
                        className="h-1 mt-1"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Eye className="w-3 h-3 text-gray-400" />
                      <span className="text-sm">{campaign.openRate}%</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Reply className="w-3 h-3 text-gray-400" />
                      <span className="text-sm">{campaign.replyRate}%</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant="outline" className="text-xs">
                      <TrendingUp className="w-3 h-3 mr-1 text-green-600" />
                      {campaign.interested}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="sm" variant="ghost">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <BarChart3 className="w-4 h-4 mr-2" />
                          View Analytics
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Settings className="w-4 h-4 mr-2" />
                          Edit Campaign
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          {campaign.status === 'active' ? (
                            <>
                              <Pause className="w-4 h-4 mr-2" />
                              Pause Campaign
                            </>
                          ) : (
                            <>
                              <Play className="w-4 h-4 mr-2" />
                              Resume Campaign
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Users className="w-4 h-4 mr-2" />
                          Add Prospects
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <XCircle className="w-4 h-4 mr-2" />
                          Delete Campaign
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl mb-2">Inbox</h1>
            <p className="text-gray-600">
              Manage candidate communications, client messages, and outreach campaigns
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
            <Button onClick={() => {
              setComposeMode('compose');
              setSelectedMessage(null);
              setShowComposeDialog(true);
            }}>
              <Mail className="w-4 h-4 mr-2" />
              Compose
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="candidate" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Candidate Communication
            {candidateCommunications.filter(c => c.unread).length > 0 && (
              <Badge variant="destructive" className="ml-2 h-5 px-1.5 text-xs">
                {candidateCommunications.filter(c => c.unread).length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="account" className="flex items-center gap-2">
            <Building2 className="w-4 h-4" />
            Account Communication
            {accountCommunications.filter(c => c.unread).length > 0 && (
              <Badge variant="destructive" className="ml-2 h-5 px-1.5 text-xs">
                {accountCommunications.filter(c => c.unread).length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="outreach" className="flex items-center gap-2">
            <Target className="w-4 h-4" />
            Outreach Communication
            {emailsNeedingAttention.filter(e => e.priority === 'high').length > 0 && (
              <Badge variant="destructive" className="ml-2 h-5 px-1.5 text-xs">
                {emailsNeedingAttention.filter(e => e.priority === 'high').length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="candidate">
          {renderCandidateTab()}
        </TabsContent>

        <TabsContent value="account">
          {renderAccountTab()}
        </TabsContent>

        <TabsContent value="outreach">
          {renderOutreachTab()}
        </TabsContent>
      </Tabs>

      {/* Compose Email Dialog */}
      <Dialog open={showComposeDialog} onOpenChange={setShowComposeDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Compose New Email</DialogTitle>
            <DialogDescription>
              Use AI to draft professional emails quickly
            </DialogDescription>
          </DialogHeader>
          <AIEmailComposer
            mode="compose"
            recipientType={selectedTab === 'candidate' ? 'candidate' : selectedTab === 'account' ? 'client' : 'prospect'}
            onSend={(email) => {
              console.log('Sending email:', email);
              setShowComposeDialog(false);
            }}
            onCancel={() => setShowComposeDialog(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Reply Dialog */}
      <Dialog open={showReplyDialog} onOpenChange={setShowReplyDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Reply with AI</DialogTitle>
            <DialogDescription>
              AI-generated response based on the conversation context
            </DialogDescription>
          </DialogHeader>
          <AIEmailComposer
            mode="reply"
            recipientEmail={selectedMessage?.candidateEmail || selectedMessage?.contactEmail || selectedMessage?.prospectEmail}
            recipientName={selectedMessage?.candidateName || selectedMessage?.contactName || selectedMessage?.prospectName}
            recipientType={selectedTab === 'candidate' ? 'candidate' : selectedTab === 'account' ? 'client' : 'prospect'}
            context={{
              jobTitle: selectedMessage?.jobTitle,
              candidateTitle: selectedMessage?.candidateTitle || selectedMessage?.contactTitle || selectedMessage?.prospectTitle,
              companyName: selectedMessage?.accountName || selectedMessage?.companyName || selectedMessage?.prospectCompany,
              previousMessage: selectedMessage?.lastMessage,
            }}
            onSend={(email) => {
              console.log('Sending reply:', email);
              setShowReplyDialog(false);
              toast.success('Reply sent successfully!');
            }}
            onCancel={() => setShowReplyDialog(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

import { useState, useEffect, useRef } from 'react';
import { Search, Filter, Mail, Phone, MapPin, Briefcase, GraduationCap, Star, Sparkles, Send, MessageSquare, CheckSquare, Square, Grid3x3, List, Linkedin, CheckCircle2, XCircle, Target, Kanban, Plus, Edit, User, FileUp, History, X, Bookmark, TrendingUp } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Progress } from './ui/progress';
import { Textarea } from './ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Label } from './ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from './ui/command';
import { toast } from 'sonner@2.0.3';

// Nurture Engine Components
import NurtureDashboard from './NurtureDashboard';
import NurtureCampaignBuilder from './NurtureCampaignBuilder';
import NurtureTemplateLibrary from './NurtureTemplateLibrary';
import NurtureSegmentation from './NurtureSegmentation';
import NurtureAnalytics from './NurtureAnalytics';
import NurturePersonalization from './NurturePersonalization';
import NurtureScheduler from './NurtureScheduler';
import NurtureAutomation from './NurtureAutomation';
import NurturePreferences from './NurturePreferences';
import { KanbanBoard } from './KanbanBoard';
import { ResumeParser } from './ResumeParser';

const jobOpeningsData = [
  {
    id: 1,
    title: 'Senior Full Stack Developer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    status: 'Open',
    requiredSkills: ['React', 'Node.js', 'Python', 'AWS', 'MongoDB'],
  },
  {
    id: 2,
    title: 'Product Manager',
    department: 'Product',
    location: 'San Francisco, CA',
    type: 'Full-time',
    status: 'Open',
    requiredSkills: ['Product Strategy', 'Agile', 'Analytics', 'User Research'],
  },
  {
    id: 3,
    title: 'UX Designer',
    department: 'Design',
    location: 'New York, NY',
    type: 'Full-time',
    status: 'Open',
    requiredSkills: ['Figma', 'Adobe XD', 'User Research', 'Prototyping'],
  },
  {
    id: 4,
    title: 'Data Scientist',
    department: 'Data & Analytics',
    location: 'Remote',
    type: 'Full-time',
    status: 'Open',
    requiredSkills: ['Python', 'Machine Learning', 'TensorFlow', 'SQL'],
  },
  {
    id: 5,
    title: 'DevOps Engineer',
    department: 'Engineering',
    location: 'Austin, TX',
    type: 'Full-time',
    status: 'Open',
    requiredSkills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD'],
  },
];

const candidatesData = [
  {
    id: 1,
    name: 'Sarah Johnson',
    title: 'Senior Full Stack Developer',
    location: 'San Francisco, CA',
    email: 'sarah.j@email.com',
    phone: '+1 (555) 123-4567',
    experience: '8 years',
    education: 'BS Computer Science, Stanford',
    skills: ['React', 'Node.js', 'Python', 'AWS', 'MongoDB'],
    status: 'Screening',
    appliedFor: 'Senior Full Stack Developer',
    aiMatchScore: 94,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    openToWork: true,
    linkedinUrl: 'https://linkedin.com/in/sarahjohnson',
  },
  {
    id: 2,
    name: 'Michael Chen',
    title: 'Product Manager',
    location: 'New York, NY',
    email: 'mchen@email.com',
    phone: '+1 (555) 234-5678',
    experience: '6 years',
    education: 'MBA, Harvard Business School',
    skills: ['Product Strategy', 'Agile', 'Analytics', 'User Research'],
    status: 'Interview',
    appliedFor: 'Product Manager',
    aiMatchScore: 89,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    openToWork: false,
    linkedinUrl: 'https://linkedin.com/in/michaelchen',
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    title: 'UX/UI Designer',
    location: 'Austin, TX',
    email: 'emily.r@email.com',
    phone: '+1 (555) 345-6789',
    experience: '5 years',
    education: 'BFA Design, Rhode Island School of Design',
    skills: ['Figma', 'Adobe XD', 'User Research', 'Prototyping', 'Design Systems'],
    status: 'Screening',
    appliedFor: 'UX Designer',
    aiMatchScore: 92,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    openToWork: true,
    linkedinUrl: 'https://linkedin.com/in/emilyrodriguez',
  },
  {
    id: 4,
    name: 'David Park',
    title: 'Data Scientist',
    location: 'Seattle, WA',
    email: 'dpark@email.com',
    phone: '+1 (555) 456-7890',
    experience: '7 years',
    education: 'PhD Statistics, MIT',
    skills: ['Python', 'Machine Learning', 'TensorFlow', 'SQL', 'R'],
    status: 'Interview',
    appliedFor: 'Data Scientist',
    aiMatchScore: 96,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
    openToWork: true,
    linkedinUrl: 'https://linkedin.com/in/davidpark',
  },
  {
    id: 5,
    name: 'Lisa Thompson',
    title: 'DevOps Engineer',
    location: 'Remote',
    email: 'lisa.t@email.com',
    phone: '+1 (555) 567-8901',
    experience: '6 years',
    education: 'BS Software Engineering, UC Berkeley',
    skills: ['Kubernetes', 'Docker', 'AWS', 'CI/CD', 'Terraform'],
    status: 'Offer',
    appliedFor: 'DevOps Engineer',
    aiMatchScore: 88,
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400',
    openToWork: false,
    linkedinUrl: 'https://linkedin.com/in/lisathompson',
  },
  {
    id: 6,
    name: 'James Williams',
    title: 'Marketing Specialist',
    location: 'Los Angeles, CA',
    email: 'jwilliams@email.com',
    phone: '+1 (555) 678-9012',
    experience: '4 years',
    education: 'BA Marketing, UCLA',
    skills: ['SEO', 'Content Marketing', 'Google Analytics', 'Social Media', 'Email Marketing'],
    status: 'Screening',
    appliedFor: 'Marketing Manager',
    aiMatchScore: 82,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    openToWork: true,
    linkedinUrl: 'https://linkedin.com/in/jameswilliams',
  },
];

const statusColors: Record<string, string> = {
  'Screening': 'bg-blue-100 text-blue-700',
  'Interview': 'bg-purple-100 text-purple-700',
  'Offer': 'bg-orange-100 text-orange-700',
  'Hired': 'bg-green-100 text-green-700',
  'Rejected': 'bg-red-100 text-red-700',
};

interface CandidatesProps {
  onSelectCandidate: (candidateId: number, editMode?: boolean, candidateData?: any) => void;
}

export function Candidates({ onSelectCandidate }: CandidatesProps) {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('match');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCandidates, setSelectedCandidates] = useState<number[]>([]);
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [showTextDialog, setShowTextDialog] = useState(false);
  const [showAIMessageDialog, setShowAIMessageDialog] = useState(false);
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');
  const [textMessage, setTextMessage] = useState('');
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [showAddCandidateDialog, setShowAddCandidateDialog] = useState(false);
  const [showEditCandidateDialog, setShowEditCandidateDialog] = useState(false);
  const [showResumeParser, setShowResumeParser] = useState(false);
  const [editingCandidate, setEditingCandidate] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Enhanced Search States
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [savedSearches, setSavedSearches] = useState<Array<{id: string, query: string, timestamp: string}>>([]);
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [selectedJobOpening, setSelectedJobOpening] = useState<number | null>(null);
  const [showJobOpenings, setShowJobOpenings] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  // Nurture Engine State
  const [nurtureView, setNurtureView] = useState<'dashboard' | 'campaign' | 'templates' | 'segments' | 'analytics' | 'personalization' | 'scheduler' | 'automation' | 'preferences'>('dashboard');

  // Load saved searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('candidateSearchHistory');
    const savedQueries = localStorage.getItem('candidateSavedSearches');
    if (saved) {
      setSearchHistory(JSON.parse(saved).slice(0, 10)); // Keep last 10
    }
    if (savedQueries) {
      setSavedSearches(JSON.parse(savedQueries));
    }
  }, []);

  // Save to search history
  const addToSearchHistory = (query: string) => {
    if (!query.trim() || searchHistory.includes(query)) return;
    const newHistory = [query, ...searchHistory.filter(q => q !== query)].slice(0, 10);
    setSearchHistory(newHistory);
    localStorage.setItem('candidateSearchHistory', JSON.stringify(newHistory));
  };

  // Save search query
  const saveSearch = (query: string) => {
    if (!query.trim()) return;
    const newSavedSearch = {
      id: Date.now().toString(),
      query: query,
      timestamp: new Date().toISOString(),
    };
    const newSavedSearches = [newSavedSearch, ...savedSearches];
    setSavedSearches(newSavedSearches);
    localStorage.setItem('candidateSavedSearches', JSON.stringify(newSavedSearches));
    toast.success('Search saved successfully!');
  };

  // Delete saved search
  const deleteSavedSearch = (id: string) => {
    const newSavedSearches = savedSearches.filter(s => s.id !== id);
    setSavedSearches(newSavedSearches);
    localStorage.setItem('candidateSavedSearches', JSON.stringify(newSavedSearches));
    toast.success('Saved search removed');
  };

  // Calculate AI match score for job opening
  const calculateJobMatchScore = (candidate: any, jobId: number) => {
    const job = jobOpeningsData.find(j => j.id === jobId);
    if (!job) return candidate.aiMatchScore;

    const matchingSkills = candidate.skills.filter((skill: string) => 
      job.requiredSkills.some(required => 
        required.toLowerCase() === skill.toLowerCase()
      )
    ).length;

    const baseScore = (matchingSkills / job.requiredSkills.length) * 100;
    return Math.min(Math.round(baseScore), 100);
  };

  const [newCandidate, setNewCandidate] = useState({
    name: '',
    title: '',
    location: '',
    email: '',
    phone: '',
    experience: '',
    education: '',
    skills: [] as string[],
    status: 'Screening',
    appliedFor: '',
    linkedinUrl: '',
    openToWork: true
  });

  const [candidatesList, setCandidatesList] = useState(candidatesData);

  let filteredCandidates = candidatesList.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         candidate.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         candidate.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = filterStatus === 'all' || candidate.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Apply job opening filter and recalculate match scores
  if (selectedJobOpening) {
    filteredCandidates = filteredCandidates.map(candidate => ({
      ...candidate,
      aiMatchScore: calculateJobMatchScore(candidate, selectedJobOpening)
    }));
  }

  if (sortBy === 'match') {
    filteredCandidates = [...filteredCandidates].sort((a, b) => b.aiMatchScore - a.aiMatchScore);
  }

  const handleToggleCandidate = (candidateId: number) => {
    setSelectedCandidates(prev => 
      prev.includes(candidateId) 
        ? prev.filter(id => id !== candidateId)
        : [...prev, candidateId]
    );
  };

  const handleSelectAll = () => {
    if (selectedCandidates.length === filteredCandidates.length) {
      setSelectedCandidates([]);
    } else {
      setSelectedCandidates(filteredCandidates.map(c => c.id));
    }
  };

  const handleGenerateAIMessage = () => {
    setIsGeneratingAI(true);
    setTimeout(() => {
      const selectedNames = candidatesData
        .filter(c => selectedCandidates.includes(c.id))
        .map(c => c.name);
      
      const aiSubject = "Exciting Opportunity - Let's Connect";
      const aiBody = `Hi {{name}},

I hope this message finds you well! I came across your impressive profile and was particularly drawn to your experience with {{skills}}.

We're currently working with several leading tech companies who are actively seeking talented professionals like yourself. Based on your background in {{position}}, I believe there are some exceptional opportunities that would align perfectly with your career goals.

The roles we're discussing offer:
• Competitive compensation packages
• Remote/hybrid work flexibility
• Cutting-edge technology stacks
• Strong company cultures and growth potential

Would you be open to a brief 15-minute call this week to explore how we might be able to help advance your career? I'd love to learn more about what you're looking for in your next role.

Looking forward to connecting!

Best regards,
[Your Name]
TechStaff Solutions`;

      setEmailSubject(aiSubject);
      setEmailBody(aiBody);
      setIsGeneratingAI(false);
      setShowAIMessageDialog(false);
      setShowEmailDialog(true);
      toast.success('AI-generated personalized message ready!');
    }, 2000);
  };

  const handleSendMassEmail = () => {
    const selectedNames = candidatesData
      .filter(c => selectedCandidates.includes(c.id))
      .map(c => c.name);
    toast.success(`Email sent to ${selectedCandidates.length} candidates`);
    setShowEmailDialog(false);
    setSelectedCandidates([]);
    setEmailSubject('');
    setEmailBody('');
  };

  const handleSendMassText = () => {
    toast.success(`Text message sent to ${selectedCandidates.length} candidates`);
    setShowTextDialog(false);
    setSelectedCandidates([]);
    setTextMessage('');
  };

  const handleAddCandidate = () => {
    setShowResumeParser(true);
  };

  const handleResumeParserComplete = (parsedData: any) => {
    // Convert parsed data to candidate format
    const candidate = {
      id: Date.now(),
      name: parsedData.name,
      title: parsedData.title,
      location: parsedData.location,
      email: parsedData.email,
      phone: parsedData.phone,
      experience: parsedData.experience,
      education: parsedData.education,
      skills: parsedData.skills,
      status: 'Screening',
      appliedFor: parsedData.title,
      aiMatchScore: Math.floor(Math.random() * 20) + 80,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
      openToWork: true,
      linkedinUrl: ''
    };
    
    setCandidatesList([candidate, ...candidatesList]);
    setShowResumeParser(false);
    toast.success(`${parsedData.name} added successfully via AI parsing!`);
  };

  const handleEditCandidate = (candidate: any) => {
    // Open full candidate detail page in edit mode
    onSelectCandidate(candidate.id, true, candidate);
  };

  const handleSaveNewCandidate = async () => {
    if (!newCandidate.name || !newCandidate.email) {
      toast.error('Please fill in required fields (Name and Email)');
      return;
    }

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const candidate = {
        ...newCandidate,
        id: Date.now(),
        aiMatchScore: Math.floor(Math.random() * 20) + 80,
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400'
      };
      
      setCandidatesList([...candidatesList, candidate]);
      toast.success('Candidate added successfully');
      setShowAddCandidateDialog(false);
    } catch (error) {
      toast.error('Failed to add candidate');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveEditCandidate = async () => {
    if (!editingCandidate) return;

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setCandidatesList(candidatesList.map(c => 
        c.id === editingCandidate.id ? editingCandidate : c
      ));
      toast.success('Candidate updated successfully');
      setShowEditCandidateDialog(false);
    } catch (error) {
      toast.error('Failed to update candidate');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1>Candidates</h1>
        <p className="text-gray-600 mt-2">AI-powered candidate matching and management</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">
            <List className="w-4 h-4 mr-2" />
            All Candidates
          </TabsTrigger>
          <TabsTrigger value="nurture">
            <Target className="w-4 h-4 mr-2" />
            Nurture Campaigns
          </TabsTrigger>
        </TabsList>

        {/* All Candidates Tab */}
        <TabsContent value="all" className="space-y-6 mt-6">
      {/* Enhanced Search and Filters */}
      <div className="flex gap-4 flex-wrap">
        <div className="flex-1 min-w-[300px]">
          <Popover open={showSearchSuggestions} onOpenChange={setShowSearchSuggestions}>
            <PopoverTrigger asChild>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 z-10" />
                <Input
                  ref={searchInputRef}
                  placeholder="Search candidates by name, role, or skills..."
                  className="pl-10 pr-20"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setShowSearchSuggestions(true)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && searchQuery) {
                      addToSearchHistory(searchQuery);
                      setShowSearchSuggestions(false);
                    }
                  }}
                />
                {searchQuery && (
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-6 w-6 p-0"
                      onClick={() => saveSearch(searchQuery)}
                    >
                      <Bookmark className="w-3 h-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-6 w-6 p-0"
                      onClick={() => setSearchQuery('')}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                )}
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-[400px] p-0" align="start">
              <Command>
                <CommandList>
                  {savedSearches.length > 0 && (
                    <>
                      <CommandGroup heading="Saved Searches">
                        {savedSearches.map((search) => (
                          <CommandItem
                            key={search.id}
                            onSelect={() => {
                              setSearchQuery(search.query);
                              setShowSearchSuggestions(false);
                            }}
                          >
                            <div className="flex items-center justify-between w-full">
                              <div className="flex items-center gap-2">
                                <Bookmark className="w-4 h-4 text-purple-600" />
                                <span>{search.query}</span>
                              </div>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-6 w-6 p-0"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteSavedSearch(search.id);
                                }}
                              >
                                <X className="w-3 h-3" />
                              </Button>
                            </div>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                      <CommandSeparator />
                    </>
                  )}
                  {searchHistory.length > 0 && (
                    <CommandGroup heading="Recent Searches">
                      {searchHistory.map((query, index) => (
                        <CommandItem
                          key={index}
                          onSelect={() => {
                            setSearchQuery(query);
                            setShowSearchSuggestions(false);
                          }}
                        >
                          <History className="w-4 h-4 mr-2 text-gray-400" />
                          <span>{query}</span>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  )}
                  {savedSearches.length === 0 && searchHistory.length === 0 && (
                    <CommandEmpty>No search history yet</CommandEmpty>
                  )}
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        <Popover open={showJobOpenings} onOpenChange={setShowJobOpenings}>
          <PopoverTrigger asChild>
            <Button
              variant={selectedJobOpening ? 'default' : 'outline'}
              className="min-w-[200px] justify-between"
            >
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                {selectedJobOpening 
                  ? jobOpeningsData.find(j => j.id === selectedJobOpening)?.title 
                  : 'Match to Job Opening'}
              </div>
              {selectedJobOpening && (
                <X
                  className="w-4 h-4 ml-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedJobOpening(null);
                  }}
                />
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[400px] p-0" align="start">
            <Command>
              <CommandInput placeholder="Search job openings..." />
              <CommandList>
                <CommandEmpty>No job openings found</CommandEmpty>
                <CommandGroup heading="Active Job Openings">
                  {jobOpeningsData.map((job) => (
                    <CommandItem
                      key={job.id}
                      onSelect={() => {
                        setSelectedJobOpening(job.id);
                        setShowJobOpenings(false);
                        toast.success(`Matching candidates to ${job.title}`);
                      }}
                    >
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium">{job.title}</span>
                          <Badge variant="outline" className="text-xs">
                            {job.department}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {job.location}
                          </span>
                          <span>{job.type}</span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {job.requiredSkills.slice(0, 3).map((skill, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                          {job.requiredSkills.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{job.requiredSkills.length - 3}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-[180px]">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Screening">Screening</SelectItem>
            <SelectItem value="Interview">Interview</SelectItem>
            <SelectItem value="Offer">Offer</SelectItem>
            <SelectItem value="Hired">Hired</SelectItem>
          </SelectContent>
        </Select>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="match">AI Match Score</SelectItem>
            <SelectItem value="recent">Most Recent</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex gap-1 border rounded-lg p-1">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            <Grid3x3 className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
        <Button onClick={handleAddCandidate} className="gap-2 bg-gradient-to-r from-purple-600 to-blue-600">
          <Sparkles className="w-4 h-4" />
          AI Parse Resume
        </Button>
      </div>

      {/* Active Job Opening Banner */}
      {selectedJobOpening && (
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardContent className="py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm mb-1">
                    <span className="font-medium">Matching candidates to:</span>{' '}
                    {jobOpeningsData.find(j => j.id === selectedJobOpening)?.title}
                  </p>
                  <p className="text-xs text-gray-600">
                    AI match scores recalculated based on job requirements • {filteredCandidates.length} matching candidates found
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedJobOpening(null)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Mass Action Bar */}
      {selectedCandidates.length > 0 && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="py-4">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm" onClick={handleSelectAll}>
                  {selectedCandidates.length === filteredCandidates.length ? (
                    <CheckSquare className="w-4 h-4 mr-2" />
                  ) : (
                    <Square className="w-4 h-4 mr-2" />
                  )}
                  {selectedCandidates.length === filteredCandidates.length ? 'Deselect All' : 'Select All'}
                </Button>
                <span className="text-sm">
                  {selectedCandidates.length} candidate{selectedCandidates.length !== 1 ? 's' : ''} selected
                </span>
              </div>
              <div className="flex gap-2">
                <Button onClick={() => setShowAIMessageDialog(true)} className="bg-gradient-to-r from-purple-600 to-blue-600">
                  <Sparkles className="w-4 h-4 mr-2" />
                  AI Generate Message
                </Button>
                <Button variant="outline" onClick={() => setShowEmailDialog(true)}>
                  <Mail className="w-4 h-4 mr-2" />
                  Mass Email
                </Button>
                <Button variant="outline" onClick={() => setShowTextDialog(true)}>
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Mass Text
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedCandidates([])}
                >
                  Clear Selection
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCandidates.map((candidate) => (
            <Card 
              key={candidate.id} 
              className={`hover:shadow-lg transition-all ${
                selectedCandidates.includes(candidate.id) ? 'ring-2 ring-blue-500 bg-blue-50' : ''
              }`}
            >
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <ImageWithFallback
                      src={candidate.avatar}
                      alt={candidate.name}
                      className="w-16 h-16 rounded-full object-cover cursor-pointer"
                      onClick={() => onSelectCandidate(candidate.id)}
                    />
                    <button
                      className={`absolute -top-2 -right-2 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center transition-colors ${
                        selectedCandidates.includes(candidate.id) 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-white text-gray-400 hover:bg-gray-100'
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleCandidate(candidate.id);
                      }}
                    >
                      {selectedCandidates.includes(candidate.id) ? (
                        <CheckSquare className="w-4 h-4" />
                      ) : (
                        <Square className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  <div 
                    className="flex-1 min-w-0 cursor-pointer"
                    onClick={() => onSelectCandidate(candidate.id)}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="truncate">{candidate.name}</h3>
                      <a
                        href={candidate.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                    </div>
                    <p className="text-sm text-gray-600 truncate">{candidate.title}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <MapPin className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-600">{candidate.location}</span>
                    </div>
                    {candidate.openToWork && (
                      <div className="flex items-center gap-1 mt-2">
                        <Badge className="bg-green-100 text-green-700 text-xs">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Open to Work
                        </Badge>
                      </div>
                    )}
                  </div>
                </div>

                {/* AI Match Score */}
                <div 
                  className="mt-4 p-3 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg cursor-pointer"
                  onClick={() => onSelectCandidate(candidate.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1">
                      <Sparkles className="w-4 h-4 text-purple-600" />
                      <span className="text-sm">AI Match Score</span>
                    </div>
                    <span className="text-purple-600">{candidate.aiMatchScore}%</span>
                  </div>
                  <Progress value={candidate.aiMatchScore} className="h-2" />
                </div>

                {/* Applied For */}
                <div 
                  className="mt-4 cursor-pointer"
                  onClick={() => onSelectCandidate(candidate.id)}
                >
                  <p className="text-xs text-gray-500">Applied for</p>
                  <p className="text-sm mt-1">{candidate.appliedFor}</p>
                </div>

                {/* Skills */}
                <div 
                  className="mt-4 cursor-pointer"
                  onClick={() => onSelectCandidate(candidate.id)}
                >
                  <div className="flex flex-wrap gap-1">
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
                </div>

                {/* Experience and Education */}
                <div 
                  className="mt-4 space-y-2 text-sm cursor-pointer"
                  onClick={() => onSelectCandidate(candidate.id)}
                >
                  <div className="flex items-center gap-2 text-gray-600">
                    <Briefcase className="w-4 h-4" />
                    <span>{candidate.experience}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <GraduationCap className="w-4 h-4" />
                    <span className="truncate">{candidate.education}</span>
                  </div>
                </div>

                {/* Status and Actions */}
                <div className="mt-4 pt-4 border-t flex items-center justify-between">
                  <Badge className={statusColors[candidate.status]}>
                    {candidate.status}
                  </Badge>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="h-8 w-8 p-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditCandidate(candidate);
                      }}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="h-8 w-8 p-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        toast.success(`Opening email to ${candidate.name}`);
                      }}
                    >
                      <Mail className="w-4 h-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="h-8 w-8 p-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        toast.success(`Calling ${candidate.name}`);
                      }}
                    >
                      <Phone className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <button onClick={handleSelectAll}>
                    {selectedCandidates.length === filteredCandidates.length ? (
                      <CheckSquare className="w-4 h-4" />
                    ) : (
                      <Square className="w-4 h-4" />
                    )}
                  </button>
                </TableHead>
                <TableHead>Candidate</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Applied For</TableHead>
                <TableHead>Match Score</TableHead>
                <TableHead>Skills</TableHead>
                <TableHead>Experience</TableHead>
                <TableHead>Availability</TableHead>
                <TableHead className="w-24">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCandidates.map((candidate) => (
                <TableRow
                  key={candidate.id}
                  className={`cursor-pointer ${
                    selectedCandidates.includes(candidate.id) ? 'bg-blue-50' : ''
                  }`}
                >
                  <TableCell>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleCandidate(candidate.id);
                      }}
                      className="flex items-center justify-center"
                    >
                      {selectedCandidates.includes(candidate.id) ? (
                        <CheckSquare className="w-4 h-4 text-blue-600" />
                      ) : (
                        <Square className="w-4 h-4 text-gray-400" />
                      )}
                    </button>
                  </TableCell>
                  <TableCell onClick={() => onSelectCandidate(candidate.id)}>
                    <div className="flex items-center gap-3">
                      <ImageWithFallback
                        src={candidate.avatar}
                        alt={candidate.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{candidate.name}</p>
                          <a
                            href={candidate.linkedinUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="text-blue-600 hover:text-blue-800 transition-colors"
                          >
                            <Linkedin className="w-3 h-3" />
                          </a>
                        </div>
                        <p className="text-sm text-gray-600">{candidate.title}</p>
                        <p className="text-xs text-gray-500">{candidate.location}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell onClick={() => onSelectCandidate(candidate.id)}>
                    <Badge className={statusColors[candidate.status]}>
                      {candidate.status}
                    </Badge>
                  </TableCell>
                  <TableCell onClick={() => onSelectCandidate(candidate.id)}>
                    <p className="text-sm">{candidate.appliedFor}</p>
                  </TableCell>
                  <TableCell onClick={() => onSelectCandidate(candidate.id)}>
                    <div className="flex items-center gap-2">
                      <Progress value={candidate.aiMatchScore} className="w-16 h-2" />
                      <span className="text-sm font-medium">{candidate.aiMatchScore}%</span>
                    </div>
                  </TableCell>
                  <TableCell onClick={() => onSelectCandidate(candidate.id)}>
                    <div className="flex flex-wrap gap-1">
                      {candidate.skills.slice(0, 2).map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {candidate.skills.length > 2 && (
                        <Badge variant="secondary" className="text-xs">
                          +{candidate.skills.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell onClick={() => onSelectCandidate(candidate.id)}>
                    <p className="text-sm">{candidate.experience}</p>
                  </TableCell>
                  <TableCell onClick={() => onSelectCandidate(candidate.id)}>
                    {candidate.openToWork ? (
                      <Badge className="bg-green-100 text-green-700 text-xs">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Open
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="text-xs">
                        <XCircle className="w-3 h-3 mr-1" />
                        Not Available
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditCandidate(candidate);
                        }}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          toast.success(`Opening email to ${candidate.name}`);
                        }}
                      >
                        <Mail className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          toast.success(`Calling ${candidate.name}`);
                        }}
                      >
                        <Phone className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}

      {/* AI Message Generation Dialog */}
      <Dialog open={showAIMessageDialog} onOpenChange={setShowAIMessageDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-600" />
              AI-Powered Message Generation
            </DialogTitle>
            <DialogDescription>
              Generate highly contextual messages for {selectedCandidates.length} selected candidate{selectedCandidates.length !== 1 ? 's' : ''}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg border border-purple-200">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-purple-600 mt-0.5" />
                <div>
                  <p className="text-sm mb-2">AI will analyze each candidate's profile and generate personalized messages considering:</p>
                  <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                    <li>Their skills and experience</li>
                    <li>Current role and career trajectory</li>
                    <li>Match score for the position</li>
                    <li>Personalized value propositions</li>
                    <li>Natural, professional tone</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">
                <strong>Selected candidates:</strong>
              </p>
              <div className="flex flex-wrap gap-2">
                {candidatesData
                  .filter(c => selectedCandidates.includes(c.id))
                  .map(c => (
                    <Badge key={c.id} variant="secondary">
                      {c.name} - {c.title}
                    </Badge>
                  ))}
              </div>
            </div>

            {isGeneratingAI && (
              <div className="flex items-center justify-center py-8">
                <div className="text-center space-y-3">
                  <div className="animate-spin w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full mx-auto"></div>
                  <p className="text-sm text-gray-600">
                    AI is analyzing candidate profiles and crafting personalized messages...
                  </p>
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAIMessageDialog(false)} disabled={isGeneratingAI}>
              Cancel
            </Button>
            <Button onClick={handleGenerateAIMessage} disabled={isGeneratingAI} className="bg-gradient-to-r from-purple-600 to-blue-600">
              <Sparkles className="w-4 h-4 mr-2" />
              Generate AI Message
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Mass Email Dialog */}
      <Dialog open={showEmailDialog} onOpenChange={setShowEmailDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Send Mass Email</DialogTitle>
            <DialogDescription>
              Sending to {selectedCandidates.length} selected candidate{selectedCandidates.length !== 1 ? 's' : ''}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm mb-2 block">Email Subject</label>
              <Input
                placeholder="Enter email subject"
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm mb-2 block">Email Body</label>
              <Textarea
                placeholder={`Write your email message here...\n\nYou can use variables:\n{{name}} - Candidate's name\n{{position}} - Position they applied for\n{{skills}} - Their skills\n{{company}} - Your company name`}
                value={emailBody}
                onChange={(e) => setEmailBody(e.target.value)}
                rows={10}
              />
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                <strong>Preview recipients:</strong>
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                {candidatesData
                  .filter(c => selectedCandidates.includes(c.id))
                  .map(c => (
                    <Badge key={c.id} variant="secondary">
                      {c.name} ({c.email})
                    </Badge>
                  ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEmailDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSendMassEmail} disabled={!emailSubject || !emailBody}>
              <Send className="w-4 h-4 mr-2" />
              Send Email
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Mass Text Dialog */}
      <Dialog open={showTextDialog} onOpenChange={setShowTextDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Send Mass Text Message</DialogTitle>
            <DialogDescription>
              Sending to {selectedCandidates.length} selected candidate{selectedCandidates.length !== 1 ? 's' : ''}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm mb-2 block">Text Message (160 characters max)</label>
              <Textarea
                placeholder={`Write your text message here...\n\nYou can use variables:\n{{name}} - Candidate's name\n{{company}} - Your company name`}
                value={textMessage}
                onChange={(e) => setTextMessage(e.target.value)}
                rows={5}
                maxLength={160}
              />
              <p className="text-xs text-gray-500 mt-1">
                {textMessage.length}/160 characters
              </p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                <strong>Preview recipients:</strong>
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                {candidatesData
                  .filter(c => selectedCandidates.includes(c.id))
                  .map(c => (
                    <Badge key={c.id} variant="secondary">
                      {c.name} ({c.phone})
                    </Badge>
                  ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowTextDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSendMassText} disabled={!textMessage}>
              <MessageSquare className="w-4 h-4 mr-2" />
              Send Text
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
        </TabsContent>

        {/* Nurture Campaigns Tab */}
        <TabsContent value="nurture" className="mt-6">
          {nurtureView === 'dashboard' && (
            <NurtureDashboard
              onCreateCampaign={() => setNurtureView('campaign')}
              onViewCampaign={(id) => setNurtureView('campaign')}
              onViewTemplates={() => setNurtureView('templates')}
              onViewSegments={() => setNurtureView('segments')}
              onViewAnalytics={() => setNurtureView('analytics')}
            />
          )}
          {nurtureView === 'campaign' && (
            <NurtureCampaignBuilder
              onSave={(campaign) => {
                toast.success('Campaign saved successfully!');
                setNurtureView('dashboard');
              }}
              onCancel={() => setNurtureView('dashboard')}
            />
          )}
          {nurtureView === 'templates' && (
            <NurtureTemplateLibrary
              onSelectTemplate={(template) => {
                toast.success('Template selected!');
                setNurtureView('campaign');
              }}
              onClose={() => setNurtureView('dashboard')}
            />
          )}
          {nurtureView === 'segments' && (
            <NurtureSegmentation
              onSave={(segment) => {
                toast.success('Segment saved successfully!');
                setNurtureView('dashboard');
              }}
              onCancel={() => setNurtureView('dashboard')}
            />
          )}
          {nurtureView === 'analytics' && (
            <NurtureAnalytics />
          )}
          {nurtureView === 'personalization' && (
            <NurturePersonalization />
          )}
          {nurtureView === 'scheduler' && (
            <NurtureScheduler />
          )}
          {nurtureView === 'automation' && (
            <NurtureAutomation />
          )}
          {nurtureView === 'preferences' && (
            <NurturePreferences />
          )}

          {/* Nurture Sub-Navigation */}
          {nurtureView === 'dashboard' && (
            <Card className="mt-6">
              <CardContent className="pt-6">
                <div className="flex gap-2 flex-wrap">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setNurtureView('personalization')}
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Personalization
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setNurtureView('scheduler')}
                  >
                    <span className="w-4 h-4 mr-2">🕐</span>
                    Scheduler
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setNurtureView('automation')}
                  >
                    <span className="w-4 h-4 mr-2">⚡</span>
                    Automation
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setNurtureView('preferences')}
                  >
                    <span className="w-4 h-4 mr-2">⚙️</span>
                    Preferences
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* AI Resume Parser Dialog */}
      <Dialog open={showResumeParser} onOpenChange={setShowResumeParser}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader className="sr-only">
            <DialogTitle>AI Resume Parser</DialogTitle>
            <DialogDescription>
              Upload a resume and let AI extract candidate information
            </DialogDescription>
          </DialogHeader>
          <ResumeParser 
            onComplete={handleResumeParserComplete}
            onCancel={() => setShowResumeParser(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Candidate Dialog */}
      <Dialog open={showEditCandidateDialog} onOpenChange={setShowEditCandidateDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit className="w-5 h-5 text-blue-600" />
              Edit Candidate
            </DialogTitle>
            <DialogDescription>
              Update candidate information
            </DialogDescription>
          </DialogHeader>

          {editingCandidate && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-candidate-name">Full Name *</Label>
                  <Input
                    id="edit-candidate-name"
                    value={editingCandidate.name}
                    onChange={(e) => setEditingCandidate({ ...editingCandidate, name: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-candidate-title">Job Title *</Label>
                  <Input
                    id="edit-candidate-title"
                    value={editingCandidate.title}
                    onChange={(e) => setEditingCandidate({ ...editingCandidate, title: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-candidate-email">Email *</Label>
                  <Input
                    id="edit-candidate-email"
                    type="email"
                    value={editingCandidate.email}
                    onChange={(e) => setEditingCandidate({ ...editingCandidate, email: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-candidate-phone">Phone</Label>
                  <Input
                    id="edit-candidate-phone"
                    value={editingCandidate.phone}
                    onChange={(e) => setEditingCandidate({ ...editingCandidate, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-candidate-location">Location</Label>
                  <Input
                    id="edit-candidate-location"
                    value={editingCandidate.location}
                    onChange={(e) => setEditingCandidate({ ...editingCandidate, location: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-candidate-experience">Experience</Label>
                  <Input
                    id="edit-candidate-experience"
                    value={editingCandidate.experience}
                    onChange={(e) => setEditingCandidate({ ...editingCandidate, experience: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-candidate-status">Status</Label>
                  <Select value={editingCandidate.status} onValueChange={(value) => setEditingCandidate({ ...editingCandidate, status: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Screening">Screening</SelectItem>
                      <SelectItem value="Interview">Interview</SelectItem>
                      <SelectItem value="Offer">Offer</SelectItem>
                      <SelectItem value="Hired">Hired</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="edit-candidate-linkedin">LinkedIn URL</Label>
                  <Input
                    id="edit-candidate-linkedin"
                    value={editingCandidate.linkedinUrl}
                    onChange={(e) => setEditingCandidate({ ...editingCandidate, linkedinUrl: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="edit-candidate-education">Education</Label>
                <Input
                  id="edit-candidate-education"
                  value={editingCandidate.education}
                  onChange={(e) => setEditingCandidate({ ...editingCandidate, education: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="edit-candidate-applied-for">Applied For</Label>
                <Input
                  id="edit-candidate-applied-for"
                  value={editingCandidate.appliedFor}
                  onChange={(e) => setEditingCandidate({ ...editingCandidate, appliedFor: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="edit-candidate-skills">Skills (comma-separated)</Label>
                <Input
                  id="edit-candidate-skills"
                  value={editingCandidate.skills.join(', ')}
                  onChange={(e) => setEditingCandidate({ 
                    ...editingCandidate, 
                    skills: e.target.value.split(',').map((s: string) => s.trim()).filter((s: string) => s) 
                  })}
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditCandidateDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveEditCandidate} disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

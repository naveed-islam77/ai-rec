import { useState } from 'react';
import { 
  Building2, 
  Users, 
  MapPin, 
  Briefcase, 
  TrendingUp, 
  Bell, 
  Save, 
  Edit2, 
  X,
  Linkedin,
  Twitter,
  Globe,
  Facebook,
  Instagram,
  Sparkles,
  Calendar,
  DollarSign,
  Award,
  Target,
  AlertCircle,
  CheckCircle2,
  FileText,
  UserCheck,
  Link as LinkIcon,
  Plus,
  Trash2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { toast } from 'sonner';

interface CompanyDetailViewProps {
  companyName: string;
  onClose: () => void;
  onConvertToAccount?: () => void;
  showConvertButton?: boolean;
}

interface Candidate {
  id: string;
  name: string;
  role: string;
  status: 'current' | 'past';
  startDate: string;
  endDate?: string;
  skills: string[];
  projects: string[];
}

interface Project {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  status: 'active' | 'completed';
  supervisor: string;
  candidates: string[];
  technologies: string[];
}

interface Location {
  id: string;
  city: string;
  state: string;
  country: string;
  address: string;
  type: 'headquarters' | 'office' | 'remote';
  employeeCount: number;
}

interface Division {
  id: string;
  name: string;
  description: string;
  headCount: number;
  lead: string;
  keyTechnologies: string[];
}

interface Influencer {
  id: string;
  name: string;
  title: string;
  email: string;
  phone?: string;
  linkedin?: string;
  department: string;
  influenceScore: number;
  lastContact?: string;
}

interface Signal {
  id: string;
  type: 'news' | 'funding' | 'management_change' | 'layoff' | 'expansion' | 'product_launch';
  title: string;
  description: string;
  date: string;
  source: string;
  sentiment: 'positive' | 'negative' | 'neutral';
}

interface CompanyData {
  name: string;
  status: 'prospect' | 'lead' | 'client' | 'past_client';
  aiWatch: boolean;
  totalEmployees: number;
  annualTurnover: number;
  keyTechnologies: string[];
  keyProducts: string[];
  industry: string;
  founded: string;
  revenue: string;
  socialMedia: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
    website?: string;
  };
  candidates: Candidate[];
  projects: Project[];
  locations: Location[];
  divisions: Division[];
  influencers: Influencer[];
  signals: Signal[];
  notes: string;
}

export function CompanyDetailView({ companyName, onClose, onConvertToAccount, showConvertButton = false }: CompanyDetailViewProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  
  // Mock data - in production this would come from API
  const [companyData, setCompanyData] = useState<CompanyData>({
    name: companyName,
    status: 'prospect',
    aiWatch: false,
    totalEmployees: 5000,
    annualTurnover: 12.5,
    keyTechnologies: ['React', 'Node.js', 'Python', 'AWS', 'Kubernetes'],
    keyProducts: ['Cloud Platform', 'Analytics Suite', 'Mobile App'],
    industry: 'Technology',
    founded: '2015',
    revenue: '$500M - $1B',
    socialMedia: {
      linkedin: 'https://linkedin.com/company/techcorp',
      twitter: 'https://twitter.com/techcorp',
      website: 'https://techcorp.com',
    },
    candidates: [
      {
        id: '1',
        name: 'Sarah Johnson',
        role: 'Senior Software Engineer',
        status: 'current',
        startDate: '2023-01-15',
        skills: ['React', 'TypeScript', 'Node.js'],
        projects: ['proj1', 'proj2']
      },
      {
        id: '2',
        name: 'Michael Chen',
        role: 'DevOps Engineer',
        status: 'current',
        startDate: '2022-06-10',
        skills: ['Kubernetes', 'AWS', 'Docker'],
        projects: ['proj3']
      },
      {
        id: '3',
        name: 'Emily Rodriguez',
        role: 'Product Manager',
        status: 'past',
        startDate: '2020-03-01',
        endDate: '2023-08-15',
        skills: ['Product Strategy', 'Agile', 'Data Analysis'],
        projects: ['proj2']
      },
    ],
    projects: [
      {
        id: 'proj1',
        name: 'Cloud Migration Initiative',
        description: 'Migrating legacy systems to AWS cloud infrastructure',
        startDate: '2023-01-01',
        status: 'active',
        supervisor: 'David Park',
        candidates: ['Sarah Johnson', 'Michael Chen'],
        technologies: ['AWS', 'Kubernetes', 'Docker']
      },
      {
        id: 'proj2',
        name: 'Mobile App Redesign',
        description: 'Complete overhaul of mobile application UX/UI',
        startDate: '2022-09-01',
        endDate: '2023-06-30',
        status: 'completed',
        supervisor: 'Lisa Anderson',
        candidates: ['Sarah Johnson', 'Emily Rodriguez'],
        technologies: ['React Native', 'TypeScript', 'Firebase']
      },
      {
        id: 'proj3',
        name: 'Infrastructure Automation',
        description: 'Implementing CI/CD pipelines and infrastructure as code',
        startDate: '2023-03-15',
        status: 'active',
        supervisor: 'David Park',
        candidates: ['Michael Chen'],
        technologies: ['Jenkins', 'Terraform', 'Ansible']
      },
    ],
    locations: [
      {
        id: 'loc1',
        city: 'San Francisco',
        state: 'CA',
        country: 'USA',
        address: '123 Market St, San Francisco, CA 94105',
        type: 'headquarters',
        employeeCount: 2500
      },
      {
        id: 'loc2',
        city: 'Austin',
        state: 'TX',
        country: 'USA',
        address: '456 Congress Ave, Austin, TX 78701',
        type: 'office',
        employeeCount: 1200
      },
      {
        id: 'loc3',
        city: 'New York',
        state: 'NY',
        country: 'USA',
        address: '789 Broadway, New York, NY 10003',
        type: 'office',
        employeeCount: 1300
      },
    ],
    divisions: [
      {
        id: 'div1',
        name: 'Engineering',
        description: 'Product development and infrastructure',
        headCount: 2000,
        lead: 'David Park',
        keyTechnologies: ['React', 'Python', 'AWS', 'Kubernetes']
      },
      {
        id: 'div2',
        name: 'Product',
        description: 'Product management and design',
        headCount: 300,
        lead: 'Lisa Anderson',
        keyTechnologies: ['Figma', 'Analytics', 'A/B Testing']
      },
      {
        id: 'div3',
        name: 'Sales & Marketing',
        description: 'Revenue generation and brand management',
        headCount: 800,
        lead: 'Robert Williams',
        keyTechnologies: ['Salesforce', 'HubSpot', 'Google Analytics']
      },
    ],
    influencers: [
      {
        id: 'inf1',
        name: 'David Park',
        title: 'VP of Engineering',
        email: 'david.park@techcorp.com',
        phone: '+1 (555) 123-4567',
        linkedin: 'https://linkedin.com/in/davidpark',
        department: 'Engineering',
        influenceScore: 95,
        lastContact: '2024-10-15'
      },
      {
        id: 'inf2',
        name: 'Lisa Anderson',
        title: 'Chief Product Officer',
        email: 'lisa.anderson@techcorp.com',
        linkedin: 'https://linkedin.com/in/lisaanderson',
        department: 'Product',
        influenceScore: 92,
        lastContact: '2024-10-20'
      },
      {
        id: 'inf3',
        name: 'Robert Williams',
        title: 'Chief Revenue Officer',
        email: 'robert.williams@techcorp.com',
        phone: '+1 (555) 234-5678',
        linkedin: 'https://linkedin.com/in/robertwilliams',
        department: 'Sales & Marketing',
        influenceScore: 88,
        lastContact: '2024-09-30'
      },
    ],
    signals: [
      {
        id: 'sig1',
        type: 'funding',
        title: 'Series D Funding - $200M Raised',
        description: 'Company announced Series D funding round led by Sequoia Capital',
        date: '2024-10-25',
        source: 'TechCrunch',
        sentiment: 'positive'
      },
      {
        id: 'sig2',
        type: 'management_change',
        title: 'New CTO Appointed',
        description: 'Former Google executive joins as Chief Technology Officer',
        date: '2024-10-15',
        source: 'LinkedIn',
        sentiment: 'positive'
      },
      {
        id: 'sig3',
        type: 'expansion',
        title: 'Opening New Office in London',
        description: 'Company announces European headquarters in London with 500 planned hires',
        date: '2024-10-01',
        source: 'Company Blog',
        sentiment: 'positive'
      },
      {
        id: 'sig4',
        type: 'product_launch',
        title: 'AI Analytics Platform Beta Launch',
        description: 'New AI-powered analytics product enters beta testing',
        date: '2024-09-20',
        source: 'Product Hunt',
        sentiment: 'positive'
      },
    ],
    notes: 'High-potential prospect. Strong engineering culture. Recently raised funding and expanding rapidly.'
  });

  const handleSave = async () => {
    // In production, this would save to API
    toast.success('Company information saved successfully');
    setIsEditing(false);
  };

  const handleStatusChange = (status: string) => {
    setCompanyData({ ...companyData, status: status as any });
  };

  const handleAIWatchToggle = (checked: boolean) => {
    setCompanyData({ ...companyData, aiWatch: checked });
    if (checked) {
      toast.success('AI Watch enabled - You\'ll receive alerts about this company');
    } else {
      toast.info('AI Watch disabled');
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'text-green-600 bg-green-50';
      case 'negative': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return <CheckCircle2 className="w-4 h-4" />;
      case 'negative': return <AlertCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getSignalIcon = (type: string) => {
    switch (type) {
      case 'funding': return <DollarSign className="w-4 h-4" />;
      case 'management_change': return <Users className="w-4 h-4" />;
      case 'expansion': return <TrendingUp className="w-4 h-4" />;
      case 'product_launch': return <Sparkles className="w-4 h-4" />;
      case 'layoff': return <AlertCircle className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'prospect': return 'bg-blue-100 text-blue-700';
      case 'lead': return 'bg-purple-100 text-purple-700';
      case 'client': return 'bg-green-100 text-green-700';
      case 'past_client': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <Building2 className="w-6 h-6 text-blue-600" />
              {isEditing ? (
                <Input
                  value={companyData.name}
                  onChange={(e) => setCompanyData({ ...companyData, name: e.target.value })}
                  className="text-2xl max-w-md"
                />
              ) : (
                <h1 className="text-2xl">{companyData.name}</h1>
              )}
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              {isEditing ? (
                <Select value={companyData.status} onValueChange={handleStatusChange}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="prospect">Prospect</SelectItem>
                    <SelectItem value="lead">Lead</SelectItem>
                    <SelectItem value="client">Client</SelectItem>
                    <SelectItem value="past_client">Past Client</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <Badge className={getStatusColor(companyData.status)}>
                  {companyData.status.replace('_', ' ').toUpperCase()}
                </Badge>
              )}
              <Badge variant="outline">{companyData.industry}</Badge>
              <Badge variant="outline">Founded {companyData.founded}</Badge>
              <Badge variant="outline">{companyData.revenue} Revenue</Badge>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-2 bg-purple-50 rounded-lg border border-purple-200">
              <Bell className={`w-4 h-4 ${companyData.aiWatch ? 'text-purple-600' : 'text-gray-400'}`} />
              <span className="text-sm">AI Watch</span>
              <Switch
                checked={companyData.aiWatch}
                onCheckedChange={handleAIWatchToggle}
              />
            </div>
            {showConvertButton && onConvertToAccount && (
              <Button 
                onClick={onConvertToAccount} 
                size="sm" 
                className="bg-green-600 hover:bg-green-700"
              >
                <Building2 className="w-4 h-4 mr-1" />
                Convert to Account
              </Button>
            )}
            {isEditing ? (
              <>
                <Button onClick={handleSave} size="sm">
                  <Save className="w-4 h-4 mr-1" />
                  Save
                </Button>
                <Button onClick={() => setIsEditing(false)} variant="outline" size="sm">
                  <X className="w-4 h-4 mr-1" />
                  Cancel
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)} variant="outline" size="sm">
                <Edit2 className="w-4 h-4 mr-1" />
                Edit
              </Button>
            )}
            <Button onClick={onClose} variant="ghost" size="sm">
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
          <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
            <p className="text-xs text-gray-600 mb-1">Total Employees</p>
            {isEditing ? (
              <Input
                type="number"
                value={companyData.totalEmployees}
                onChange={(e) => setCompanyData({ ...companyData, totalEmployees: parseInt(e.target.value) })}
                className="h-8"
              />
            ) : (
              <p className="text-xl font-semibold text-blue-900">{companyData.totalEmployees.toLocaleString()}</p>
            )}
          </div>
          <div className="bg-orange-50 rounded-lg p-3 border border-orange-100">
            <p className="text-xs text-gray-600 mb-1">Annual Turnover</p>
            {isEditing ? (
              <Input
                type="number"
                step="0.1"
                value={companyData.annualTurnover}
                onChange={(e) => setCompanyData({ ...companyData, annualTurnover: parseFloat(e.target.value) })}
                className="h-8"
              />
            ) : (
              <p className="text-xl font-semibold text-orange-900">{companyData.annualTurnover}%</p>
            )}
          </div>
          <div className="bg-green-50 rounded-lg p-3 border border-green-100">
            <p className="text-xs text-gray-600 mb-1">Candidates in DB</p>
            <p className="text-xl font-semibold text-green-900">{companyData.candidates.length}</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-3 border border-purple-100">
            <p className="text-xs text-gray-600 mb-1">Active Projects</p>
            <p className="text-xl font-semibold text-purple-900">
              {companyData.projects.filter(p => p.status === 'active').length}
            </p>
          </div>
          <div className="bg-pink-50 rounded-lg p-3 border border-pink-100">
            <p className="text-xs text-gray-600 mb-1">Key Influencers</p>
            <p className="text-xl font-semibold text-pink-900">{companyData.influencers.length}</p>
          </div>
        </div>
      </div>

      {/* Main Content with Tabs */}
      <div className="flex-1 overflow-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
          <div className="bg-white border-b px-6">
            <TabsList className="bg-transparent">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="candidates">Candidates ({companyData.candidates.length})</TabsTrigger>
              <TabsTrigger value="projects">Projects ({companyData.projects.length})</TabsTrigger>
              <TabsTrigger value="locations">Locations ({companyData.locations.length})</TabsTrigger>
              <TabsTrigger value="divisions">Divisions ({companyData.divisions.length})</TabsTrigger>
              <TabsTrigger value="influencers">Influencers ({companyData.influencers.length})</TabsTrigger>
              <TabsTrigger value="signals">AI Signals ({companyData.signals.length})</TabsTrigger>
            </TabsList>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6 mt-0">
              {/* Key Technologies & Products */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      Key Technologies
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isEditing ? (
                      <Textarea
                        value={companyData.keyTechnologies.join(', ')}
                        onChange={(e) => setCompanyData({
                          ...companyData,
                          keyTechnologies: e.target.value.split(',').map(t => t.trim())
                        })}
                        placeholder="Enter technologies separated by commas"
                        rows={3}
                      />
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {companyData.keyTechnologies.map((tech, idx) => (
                          <Badge key={idx} variant="secondary">{tech}</Badge>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <Award className="w-4 h-4" />
                      Key Products
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isEditing ? (
                      <Textarea
                        value={companyData.keyProducts.join(', ')}
                        onChange={(e) => setCompanyData({
                          ...companyData,
                          keyProducts: e.target.value.split(',').map(p => p.trim())
                        })}
                        placeholder="Enter products separated by commas"
                        rows={3}
                      />
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {companyData.keyProducts.map((product, idx) => (
                          <Badge key={idx} variant="secondary">{product}</Badge>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Social Media Links */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <LinkIcon className="w-4 h-4" />
                    Social Media & Web Presence
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <Globe className="w-5 h-5 text-blue-600" />
                      {isEditing ? (
                        <Input
                          value={companyData.socialMedia.website || ''}
                          onChange={(e) => setCompanyData({
                            ...companyData,
                            socialMedia: { ...companyData.socialMedia, website: e.target.value }
                          })}
                          placeholder="Website URL"
                        />
                      ) : (
                        <a href={companyData.socialMedia.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          {companyData.socialMedia.website}
                        </a>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <Linkedin className="w-5 h-5 text-blue-700" />
                      {isEditing ? (
                        <Input
                          value={companyData.socialMedia.linkedin || ''}
                          onChange={(e) => setCompanyData({
                            ...companyData,
                            socialMedia: { ...companyData.socialMedia, linkedin: e.target.value }
                          })}
                          placeholder="LinkedIn URL"
                        />
                      ) : (
                        <a href={companyData.socialMedia.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          LinkedIn Profile
                        </a>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <Twitter className="w-5 h-5 text-sky-500" />
                      {isEditing ? (
                        <Input
                          value={companyData.socialMedia.twitter || ''}
                          onChange={(e) => setCompanyData({
                            ...companyData,
                            socialMedia: { ...companyData.socialMedia, twitter: e.target.value }
                          })}
                          placeholder="Twitter URL"
                        />
                      ) : (
                        <a href={companyData.socialMedia.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          Twitter Profile
                        </a>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <Facebook className="w-5 h-5 text-blue-600" />
                      {isEditing ? (
                        <Input
                          value={companyData.socialMedia.facebook || ''}
                          onChange={(e) => setCompanyData({
                            ...companyData,
                            socialMedia: { ...companyData.socialMedia, facebook: e.target.value }
                          })}
                          placeholder="Facebook URL"
                        />
                      ) : (
                        companyData.socialMedia.facebook ? (
                          <a href={companyData.socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            Facebook Page
                          </a>
                        ) : (
                          <span className="text-gray-400">Not available</span>
                        )
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Notes */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Notes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isEditing ? (
                    <Textarea
                      value={companyData.notes}
                      onChange={(e) => setCompanyData({ ...companyData, notes: e.target.value })}
                      placeholder="Add notes about this company..."
                      rows={4}
                    />
                  ) : (
                    <p className="text-gray-700">{companyData.notes}</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Candidates Tab */}
            <TabsContent value="candidates" className="mt-0">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Current Candidates: {companyData.candidates.filter(c => c.status === 'current').length}</h3>
                    <p className="text-sm text-gray-600">Past Candidates: {companyData.candidates.filter(c => c.status === 'past').length}</p>
                  </div>
                  {isEditing && (
                    <Button size="sm">
                      <Plus className="w-4 h-4 mr-1" />
                      Add Candidate
                    </Button>
                  )}
                </div>
                
                <Separator />

                <div className="grid grid-cols-1 gap-4">
                  {companyData.candidates.map((candidate) => (
                    <Card key={candidate.id}>
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <Avatar>
                                <AvatarFallback>{candidate.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                              </Avatar>
                              <div>
                                <h4 className="font-medium">{candidate.name}</h4>
                                <p className="text-sm text-gray-600">{candidate.role}</p>
                              </div>
                              <Badge variant={candidate.status === 'current' ? 'default' : 'secondary'}>
                                {candidate.status === 'current' ? 'Current' : 'Alumni'}
                              </Badge>
                            </div>
                            <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                              <div>
                                <p className="text-gray-600">Start Date</p>
                                <p>{new Date(candidate.startDate).toLocaleDateString()}</p>
                              </div>
                              {candidate.endDate && (
                                <div>
                                  <p className="text-gray-600">End Date</p>
                                  <p>{new Date(candidate.endDate).toLocaleDateString()}</p>
                                </div>
                              )}
                              <div className="col-span-2">
                                <p className="text-gray-600 mb-1">Skills</p>
                                <div className="flex flex-wrap gap-1">
                                  {candidate.skills.map((skill, idx) => (
                                    <Badge key={idx} variant="outline" className="text-xs">{skill}</Badge>
                                  ))}
                                </div>
                              </div>
                              <div className="col-span-2">
                                <p className="text-gray-600 mb-1">Projects</p>
                                <div className="flex flex-wrap gap-1">
                                  {candidate.projects.map((projectId, idx) => {
                                    const project = companyData.projects.find(p => p.id === projectId);
                                    return project ? (
                                      <Badge key={idx} variant="secondary" className="text-xs">{project.name}</Badge>
                                    ) : null;
                                  })}
                                </div>
                              </div>
                            </div>
                          </div>
                          {isEditing && (
                            <Button variant="ghost" size="sm">
                              <Trash2 className="w-4 h-4 text-red-600" />
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Projects Tab */}
            <TabsContent value="projects" className="mt-0">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Active Projects: {companyData.projects.filter(p => p.status === 'active').length}</h3>
                    <p className="text-sm text-gray-600">Completed Projects: {companyData.projects.filter(p => p.status === 'completed').length}</p>
                  </div>
                  {isEditing && (
                    <Button size="sm">
                      <Plus className="w-4 h-4 mr-1" />
                      Add Project
                    </Button>
                  )}
                </div>
                
                <Separator />

                <div className="grid grid-cols-1 gap-4">
                  {companyData.projects.map((project) => (
                    <Card key={project.id}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <CardTitle className="text-base">{project.name}</CardTitle>
                              <Badge variant={project.status === 'active' ? 'default' : 'secondary'}>
                                {project.status}
                              </Badge>
                            </div>
                            <CardDescription>{project.description}</CardDescription>
                          </div>
                          {isEditing && (
                            <Button variant="ghost" size="sm">
                              <Trash2 className="w-4 h-4 text-red-600" />
                            </Button>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4 text-sm">
                          <div>
                            <p className="text-gray-600 mb-1">Supervisor</p>
                            <div className="flex items-center gap-2">
                              <UserCheck className="w-4 h-4 text-blue-600" />
                              <p>{project.supervisor}</p>
                            </div>
                          </div>
                          <div>
                            <p className="text-gray-600 mb-1">Start Date</p>
                            <p>{new Date(project.startDate).toLocaleDateString()}</p>
                          </div>
                          {project.endDate && (
                            <div>
                              <p className="text-gray-600 mb-1">End Date</p>
                              <p>{new Date(project.endDate).toLocaleDateString()}</p>
                            </div>
                          )}
                        </div>
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm text-gray-600 mb-2">Technologies</p>
                            <div className="flex flex-wrap gap-1">
                              {project.technologies.map((tech, idx) => (
                                <Badge key={idx} variant="outline">{tech}</Badge>
                              ))}
                            </div>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 mb-2">Team Members ({project.candidates.length})</p>
                            <div className="flex flex-wrap gap-1">
                              {project.candidates.map((candidateName, idx) => (
                                <Badge key={idx} variant="secondary">{candidateName}</Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Locations Tab */}
            <TabsContent value="locations" className="mt-0">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Office Locations</h3>
                  {isEditing && (
                    <Button size="sm">
                      <Plus className="w-4 h-4 mr-1" />
                      Add Location
                    </Button>
                  )}
                </div>
                
                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {companyData.locations.map((location) => (
                    <Card key={location.id}>
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-start gap-3">
                            <MapPin className="w-5 h-5 text-blue-600 mt-1" />
                            <div>
                              <h4 className="font-medium">{location.city}, {location.state}</h4>
                              <p className="text-sm text-gray-600">{location.country}</p>
                            </div>
                          </div>
                          <Badge variant={location.type === 'headquarters' ? 'default' : 'secondary'}>
                            {location.type.replace('_', ' ')}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{location.address}</p>
                        <div className="flex items-center gap-2 text-sm">
                          <Users className="w-4 h-4 text-gray-500" />
                          <span>{location.employeeCount.toLocaleString()} employees</span>
                        </div>
                        {isEditing && (
                          <Button variant="ghost" size="sm" className="mt-3 w-full text-red-600">
                            <Trash2 className="w-4 h-4 mr-1" />
                            Remove
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Divisions Tab */}
            <TabsContent value="divisions" className="mt-0">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Business Divisions</h3>
                  {isEditing && (
                    <Button size="sm">
                      <Plus className="w-4 h-4 mr-1" />
                      Add Division
                    </Button>
                  )}
                </div>
                
                <Separator />

                <div className="grid grid-cols-1 gap-4">
                  {companyData.divisions.map((division) => (
                    <Card key={division.id}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-base">{division.name}</CardTitle>
                            <CardDescription>{division.description}</CardDescription>
                          </div>
                          {isEditing && (
                            <Button variant="ghost" size="sm">
                              <Trash2 className="w-4 h-4 text-red-600" />
                            </Button>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-gray-600 mb-1">Division Lead</p>
                            <div className="flex items-center gap-2">
                              <UserCheck className="w-4 h-4 text-blue-600" />
                              <p className="text-sm">{division.lead}</p>
                            </div>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 mb-1">Headcount</p>
                            <p className="text-sm font-medium">{division.headCount.toLocaleString()} employees</p>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-2">Key Technologies</p>
                          <div className="flex flex-wrap gap-1">
                            {division.keyTechnologies.map((tech, idx) => (
                              <Badge key={idx} variant="outline">{tech}</Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Influencers Tab */}
            <TabsContent value="influencers" className="mt-0">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Key Influencers & Decision Makers</h3>
                    <p className="text-sm text-gray-600">Supervisors, managers, and key contacts</p>
                  </div>
                  {isEditing && (
                    <Button size="sm">
                      <Plus className="w-4 h-4 mr-1" />
                      Add Influencer
                    </Button>
                  )}
                </div>
                
                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {companyData.influencers.map((influencer) => (
                    <Card key={influencer.id}>
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-start gap-3 flex-1">
                            <Avatar>
                              <AvatarFallback>{influencer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <h4 className="font-medium">{influencer.name}</h4>
                              <p className="text-sm text-gray-600">{influencer.title}</p>
                              <Badge variant="secondary" className="mt-1">{influencer.department}</Badge>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-1">
                              <Sparkles className="w-4 h-4 text-yellow-500" />
                              <span className="text-sm font-medium">{influencer.influenceScore}</span>
                            </div>
                            <p className="text-xs text-gray-500">Influence</p>
                          </div>
                        </div>
                        
                        <Separator className="my-3" />
                        
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <span className="text-gray-600">Email:</span>
                            <a href={`mailto:${influencer.email}`} className="text-blue-600 hover:underline">
                              {influencer.email}
                            </a>
                          </div>
                          {influencer.phone && (
                            <div className="flex items-center gap-2">
                              <span className="text-gray-600">Phone:</span>
                              <span>{influencer.phone}</span>
                            </div>
                          )}
                          {influencer.linkedin && (
                            <div className="flex items-center gap-2">
                              <Linkedin className="w-4 h-4 text-blue-600" />
                              <a href={influencer.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                LinkedIn Profile
                              </a>
                            </div>
                          )}
                          {influencer.lastContact && (
                            <div className="flex items-center gap-2 mt-2 pt-2 border-t">
                              <Calendar className="w-4 h-4 text-gray-500" />
                              <span className="text-gray-600">Last Contact:</span>
                              <span>{new Date(influencer.lastContact).toLocaleDateString()}</span>
                            </div>
                          )}
                        </div>
                        
                        {isEditing && (
                          <Button variant="ghost" size="sm" className="mt-3 w-full text-red-600">
                            <Trash2 className="w-4 h-4 mr-1" />
                            Remove
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* AI Signals Tab */}
            <TabsContent value="signals" className="mt-0">
              <div className="space-y-4">
                <div className="flex items-center gap-2 p-4 bg-purple-50 border border-purple-200 rounded-lg">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                  <div>
                    <h3 className="font-medium text-purple-900">AI-Generated Intelligence Signals</h3>
                    <p className="text-sm text-purple-700">Automatically detected events and trends about this company</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {companyData.signals.map((signal) => (
                    <Card key={signal.id}>
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-4">
                          <div className={`p-2 rounded-lg ${getSentimentColor(signal.sentiment)}`}>
                            {getSignalIcon(signal.type)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h4 className="font-medium mb-1">{signal.title}</h4>
                                <p className="text-sm text-gray-600">{signal.description}</p>
                              </div>
                              <div className={`flex items-center gap-1 px-2 py-1 rounded ${getSentimentColor(signal.sentiment)}`}>
                                {getSentimentIcon(signal.sentiment)}
                                <span className="text-xs capitalize">{signal.sentiment}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                              <div className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {new Date(signal.date).toLocaleDateString()}
                              </div>
                              <div className="flex items-center gap-1">
                                <FileText className="w-3 h-3" />
                                {signal.source}
                              </div>
                              <Badge variant="outline" className="text-xs">
                                {signal.type.replace('_', ' ')}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}

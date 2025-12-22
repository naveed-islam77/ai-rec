import { useState, useEffect } from 'react';
import { 
  Building2, MapPin, Network, Mail, Search, Filter, 
  ChevronRight, Sparkles, TrendingUp, Users, Eye, 
  BarChart3, Send, CheckCircle, Clock, MousePointerClick,
  Download, RefreshCw, Plus, Edit, Trash2, X, ChevronLeft
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { 
  Dialog, DialogContent, DialogDescription, DialogHeader, 
  DialogTitle, DialogFooter 
} from './ui/dialog';
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from './ui/select';
import { toast } from 'sonner@2.0.3';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, 
  CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  Sankey, Rectangle
} from 'recharts';
import { IntelligenceDashboard } from './IntelligenceDashboard';

interface Company {
  name: string;
  cities: string[];
  skills: string[];
  products?: string[];
  employees: any[];
  projects: any[];
  companyType?: string;
  aiScore?: number;
  scoreBreakdown?: any;
  hotness?: string;
  hiringManagers: any[];
  employeeCount: number;
  currentEmployees: number;
  viewCount: number;
  aiInfo: {
    industry: string;
    size: string;
    techStack: string[];
    fundingStage: string;
    growthTrend: string;
  };
}

interface HiringManager {
  name: string;
  email: string;
  title: string;
  company: string;
  city: string;
  skills: string[];
  teamMembers: string[];
  leadScore: number;
  emailsSent: number;
  emailsOpened: number;
  emailsReplied: number;
}

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  category: string;
}

interface Campaign {
  id: string;
  recipientCount: number;
  sentAt: string;
  stats: {
    sent: number;
    delivered: number;
    opened: number;
    clicked: number;
    replied: number;
  };
}

export function Intelligence() {
  const [activeTab, setActiveTab] = useState('accounts');
  const [isLoading, setIsLoading] = useState(false);
  
  // Data states
  const [companies, setCompanies] = useState<Company[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [cities, setCities] = useState<any[]>([]);
  const [talentMovement, setTalentMovement] = useState<any>(null);
  const [hiringManagers, setHiringManagers] = useState<HiringManager[]>([]);
  const [emailTemplates, setEmailTemplates] = useState<EmailTemplate[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  
  // Filter states
  const [skillFilter, setSkillFilter] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [companyFilter, setCompanyFilter] = useState('');
  const [productFilter, setProductFilter] = useState('');
  const [companyTypeFilter, setCompanyTypeFilter] = useState('all');
  const [showDashboard, setShowDashboard] = useState(false);
  
  // Dialog states
  const [showCompanyDialog, setShowCompanyDialog] = useState(false);
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [showTemplateDialog, setShowTemplateDialog] = useState(false);
  const [showCityDialog, setShowCityDialog] = useState(false);
  const [showCandidateDialog, setShowCandidateDialog] = useState(false);
  const [selectedManagers, setSelectedManagers] = useState<string[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);
  const [selectedCity, setSelectedCity] = useState<any | null>(null);
  const [selectedCityPage, setSelectedCityPage] = useState(1);
  const [selectedCandidate, setSelectedCandidate] = useState<any | null>(null);
  const [emailVariables, setEmailVariables] = useState({
    myCompany: 'TechStaff Solutions',
    senderName: 'John Doe',
    skill: ''
  });

  const baseUrl = `https://${projectId}.supabase.co/functions/v1/make-server-4304bc86`;

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [citiesRes, movementRes, managersRes, templatesRes] = await Promise.all([
        fetch(`${baseUrl}/intelligence/geographic`, {
          headers: { Authorization: `Bearer ${publicAnonKey}` }
        }).then(r => r.json()),
        fetch(`${baseUrl}/intelligence/talent-movement`, {
          headers: { Authorization: `Bearer ${publicAnonKey}` }
        }).then(r => r.json()),
        fetch(`${baseUrl}/intelligence/hiring-managers`, {
          headers: { Authorization: `Bearer ${publicAnonKey}` }
        }).then(r => r.json()),
        fetch(`${baseUrl}/intelligence/email-templates`, {
          headers: { Authorization: `Bearer ${publicAnonKey}` }
        }).then(r => r.json())
      ]);

      // Don't load companies by default - user should search
      setCompanies([]);
      setCities(citiesRes.cities || []);
      setTalentMovement(movementRes);
      setHiringManagers(managersRes.managers || []);
      setEmailTemplates(templatesRes.templates || []);
    } catch (error) {
      console.error('Error loading intelligence data:', error);
      toast.error('Failed to load intelligence data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterCompanies = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (skillFilter) params.append('skills', skillFilter);
      if (productFilter) params.append('products', productFilter);
      if (cityFilter) params.append('city', cityFilter);
      if (companyTypeFilter && companyTypeFilter !== 'all') params.append('companyType', companyTypeFilter);
      
      const url = `${baseUrl}/intelligence/companies/search?${params.toString()}`;
      console.log('=== FRONTEND REQUEST ===');
      console.log('Fetching companies from:', url);
      console.log('Filters:', { skillFilter, productFilter, cityFilter, companyTypeFilter });
      
      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${publicAnonKey}` }
      });
      
      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }
      
      const data = await response.json();
      console.log('Response data:', data);
      console.log('Companies count:', data.companies?.length || 0);
      
      setCompanies(data.companies || []);
      setShowDashboard(true);
      
      if (data.companies?.length > 0) {
        toast.success(`Found ${data.companies.length} companies ranked by relevance`);
      } else {
        toast.info('No companies found matching your criteria');
      }
    } catch (error) {
      console.error('=== ERROR IN FRONTEND ===');
      console.error('Error filtering companies:', error);
      toast.error(`Failed to filter companies: ${error.message || error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewCompanyDetails = async (company: Company) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${baseUrl}/intelligence/companies/${encodeURIComponent(company.name)}`,
        { headers: { Authorization: `Bearer ${publicAnonKey}` } }
      );
      const data = await response.json();
      setSelectedCompany({ ...company, ...data });
      setShowCompanyDialog(true);
    } catch (error) {
      console.error('Error loading company details:', error);
      toast.error('Failed to load company details');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterCities = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (skillFilter) params.append('skills', skillFilter);
      
      const response = await fetch(
        `${baseUrl}/intelligence/geographic?${params.toString()}`,
        { headers: { Authorization: `Bearer ${publicAnonKey}` } }
      );
      const data = await response.json();
      setCities(data.cities || []);
      toast.success('Cities filtered successfully');
    } catch (error) {
      console.error('Error filtering cities:', error);
      toast.error('Failed to filter cities');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterManagers = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (skillFilter) params.append('skills', skillFilter);
      if (companyFilter) params.append('company', companyFilter);
      
      const response = await fetch(
        `${baseUrl}/intelligence/hiring-managers?${params.toString()}`,
        { headers: { Authorization: `Bearer ${publicAnonKey}` } }
      );
      const data = await response.json();
      setHiringManagers(data.managers || []);
      toast.success('Hiring managers filtered successfully');
    } catch (error) {
      console.error('Error filtering managers:', error);
      toast.error('Failed to filter managers');
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleManager = (email: string) => {
    setSelectedManagers(prev =>
      prev.includes(email)
        ? prev.filter(e => e !== email)
        : [...prev, email]
    );
  };

  const handleSelectAllManagers = () => {
    if (selectedManagers.length === hiringManagers.length) {
      setSelectedManagers([]);
    } else {
      setSelectedManagers(hiringManagers.map(m => m.email));
    }
  };

  const handleSendCampaign = async () => {
    if (selectedManagers.length === 0) {
      toast.error('Please select at least one recipient');
      return;
    }
    if (!selectedTemplate) {
      toast.error('Please select an email template');
      return;
    }

    setIsLoading(true);
    try {
      const recipients = hiringManagers.filter(m => selectedManagers.includes(m.email));
      
      const response = await fetch(`${baseUrl}/intelligence/send-campaign`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify({
          recipients,
          template: selectedTemplate,
          variables: emailVariables
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast.success(`Campaign sent to ${selectedManagers.length} recipients!`);
        setCampaigns(prev => [...prev, data.campaign]);
        setShowEmailDialog(false);
        setSelectedManagers([]);
        setSelectedTemplate(null);
      }
    } catch (error) {
      console.error('Error sending campaign:', error);
      toast.error('Failed to send campaign');
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportManagers = () => {
    const csv = [
      ['Name', 'Email', 'Title', 'Company', 'City', 'Skills', 'Lead Score'].join(','),
      ...hiringManagers.map(m => [
        m.name,
        m.email,
        m.title,
        m.company,
        m.city,
        m.skills.join('; '),
        m.leadScore
      ].join(','))
    ].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'hiring-managers.csv';
    a.click();
    toast.success('Hiring managers exported to CSV');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="flex items-center gap-2">
            <Building2 className="w-8 h-8 text-blue-600" />
            Intelligence Hub
          </h1>
          <p className="text-gray-600 mt-1">
            Staffing intelligence powered by candidate data
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={loadData} disabled={isLoading}>
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="accounts">
            <Building2 className="w-4 h-4 mr-2" />
            Prospective Accounts
          </TabsTrigger>
          <TabsTrigger value="geographic">
            <MapPin className="w-4 h-4 mr-2" />
            Geographic Intelligence
          </TabsTrigger>
          <TabsTrigger value="movement">
            <Network className="w-4 h-4 mr-2" />
            Talent Movement
          </TabsTrigger>
          <TabsTrigger value="contacts">
            <Users className="w-4 h-4 mr-2" />
            Contact Database
          </TabsTrigger>
          <TabsTrigger value="campaigns">
            <Mail className="w-4 h-4 mr-2" />
            Email Campaigns
          </TabsTrigger>
        </TabsList>

        {/* Prospective Accounts Tab */}
        <TabsContent value="accounts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-600" />
                AI-Powered Company Search
              </CardTitle>
              <CardDescription>
                Search by products, skills, location, and company type. Results are ranked by AI to show the "hottest" companies for your criteria.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">Products/Technologies</label>
                    <Input
                      placeholder="e.g., Salesforce, Pimcore, SAP, AWS"
                      value={productFilter}
                      onChange={(e) => setProductFilter(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">Skills</label>
                    <Input
                      placeholder="e.g., React, Python, DevOps"
                      value={skillFilter}
                      onChange={(e) => setSkillFilter(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">City</label>
                    <Input
                      placeholder="e.g., San Francisco, New York"
                      value={cityFilter}
                      onChange={(e) => setCityFilter(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">Company Type</label>
                    <Select value={companyTypeFilter} onValueChange={setCompanyTypeFilter}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Companies</SelectItem>
                        <SelectItem value="service-provider">Service Providers (TCS, Infosys, Accenture)</SelectItem>
                        <SelectItem value="end-client">End Clients / Direct Employers</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button onClick={handleFilterCompanies} disabled={isLoading} className="flex-1">
                    <Search className="w-4 h-4 mr-2" />
                    {skillFilter || productFilter || cityFilter || (companyTypeFilter && companyTypeFilter !== 'all') ? 'Search & Rank Companies' : 'Show All Companies'}
                  </Button>
                  {companies.length > 0 && (
                    <Button 
                      variant="outline" 
                      onClick={() => setShowDashboard(!showDashboard)}
                    >
                      {showDashboard ? (
                        <>
                          <BarChart3 className="w-4 h-4 mr-2" />
                          Detailed View
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 mr-2" />
                          Dashboard
                        </>
                      )}
                    </Button>
                  )}
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setSkillFilter('');
                      setProductFilter('');
                      setCityFilter('');
                      setCompanyTypeFilter('all');
                      setCompanies([]);
                      setShowDashboard(false);
                    }}
                    disabled={!skillFilter && !productFilter && !cityFilter && companies.length === 0}
                  >
                    Clear
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {companies.length === 0 && !showDashboard ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">
                  Enter your search criteria above to find and rank companies
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  Try searching for products like "Salesforce" or "Pimcore", or skills like "React" or "SAP"
                </p>
              </CardContent>
            </Card>
          ) : showDashboard ? (
            <IntelligenceDashboard
              filters={{
                skill: skillFilter,
                product: productFilter,
                location: cityFilter,
                companyType: companyTypeFilter
              }}
              onCompanyClick={async (companyName) => {
                const company = companies.find(c => c.name === companyName);
                if (company) {
                  await handleViewCompanyDetails(company);
                }
              }}
            />
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  <Sparkles className="w-4 h-4 inline mr-1 text-purple-600" />
                  {companies.length} companies ranked by AI relevance
                </p>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                {companies.map((company, index) => {
                  const getHotnessColor = (hotness: string | undefined) => {
                    switch(hotness) {
                      case 'very-hot': return 'bg-red-500';
                      case 'hot': return 'bg-orange-500';
                      case 'warm': return 'bg-yellow-500';
                      default: return 'bg-gray-400';
                    }
                  };
                  
                  const getHotnessLabel = (hotness: string | undefined) => {
                    switch(hotness) {
                      case 'very-hot': return 'Very Hot';
                      case 'hot': return 'Hot';
                      case 'warm': return 'Warm';
                      default: return 'Cold';
                    }
                  };
                  
                  return (
                    <Card key={index} className="hover:shadow-md transition-shadow border-l-4" style={{ borderLeftColor: company.aiScore ? (company.aiScore > 70 ? '#ef4444' : company.aiScore > 50 ? '#f97316' : company.aiScore > 30 ? '#eab308' : '#9ca3af') : '#9ca3af' }}>
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-start gap-3">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 text-white">
                              #{index + 1}
                            </div>
                            <div>
                              <div className="flex items-center gap-3 mb-2">
                                <Building2 className="w-5 h-5 text-blue-600" />
                                <h3 className="text-lg">{company.name}</h3>
                                {company.companyType && (
                                  <Badge variant={company.companyType === 'service-provider' ? 'default' : 'secondary'}>
                                    {company.companyType === 'service-provider' ? 'Service Provider' : 'End Client'}
                                  </Badge>
                                )}
                              </div>
                              
                              {company.aiScore !== undefined && (
                                <div className="flex items-center gap-3 mb-2">
                                  <Badge className={`${getHotnessColor(company.hotness)} text-white`}>
                                    <Sparkles className="w-3 h-3 mr-1" />
                                    {getHotnessLabel(company.hotness)} - AI Score: {company.aiScore}/100
                                  </Badge>
                                  {company.scoreBreakdown && (
                                    <div className="flex gap-2 text-xs text-gray-600">
                                      <span>Skills: {company.scoreBreakdown.skillConcentration || 0}%</span>
                                      <span>•</span>
                                      <span>Products: {company.scoreBreakdown.productMatch || 0}%</span>
                                      <span>•</span>
                                      <span>Hiring: {company.scoreBreakdown.hiringActivity || 0}%</span>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <Button onClick={() => handleViewCompanyDetails(company)}>
                            View Details
                            <ChevronRight className="w-4 h-4 ml-2" />
                          </Button>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div>
                            <p className="text-xs text-gray-600">Industry</p>
                            <p className="text-sm mt-1">{company.aiInfo.industry}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-600">Company Size</p>
                            <p className="text-sm mt-1">{company.aiInfo.size}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-600">Employees in DB</p>
                            <p className="text-sm mt-1">
                              {company.currentEmployees} current, {company.employeeCount - company.currentEmployees} alumni
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-600">Growth Trend</p>
                            <div className="flex items-center gap-1 mt-1">
                              <TrendingUp className={`w-4 h-4 ${company.aiInfo.growthTrend === 'High' ? 'text-green-600' : company.aiInfo.growthTrend === 'Medium' ? 'text-yellow-600' : 'text-gray-400'}`} />
                              <span className="text-sm">{company.aiInfo.growthTrend}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-3">
                          <MapPin className="w-4 h-4 text-gray-400 mt-1" />
                          {company.cities.map((city, idx) => (
                            <Badge key={idx} variant="secondary">{city}</Badge>
                          ))}
                        </div>

                        {company.products && company.products.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-3">
                            <p className="text-xs text-gray-600 w-full">Products/Technologies Used:</p>
                            {company.products.map((product, idx) => (
                              <Badge key={idx} variant="outline">{product}</Badge>
                            ))}
                          </div>
                        )}

                        <div className="flex flex-wrap gap-2 mb-3">
                          <p className="text-xs text-gray-600 w-full">Skills Available:</p>
                          {company.skills.slice(0, 8).map((skill, idx) => (
                            <Badge key={idx}>{skill}</Badge>
                          ))}
                          {company.skills.length > 8 && (
                            <Badge variant="outline">+{company.skills.length - 8} more</Badge>
                          )}
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <p className="text-xs text-gray-600 w-full">Hiring Managers ({company.hiringManagers.length}):</p>
                          {company.hiringManagers.slice(0, 3).map((manager, idx) => (
                            <Badge key={idx} variant="outline">
                              {manager.name} - {manager.title}
                            </Badge>
                          ))}
                          {company.hiringManagers.length > 3 && (
                            <Badge variant="outline">+{company.hiringManagers.length - 3} more</Badge>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}
        </TabsContent>

        {/* Geographic Intelligence Tab */}
        <TabsContent value="geographic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Filter by Skills</CardTitle>
              <CardDescription>Find cities with companies using specific skills</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Input
                  placeholder="Skills (e.g., React, Python)"
                  value={skillFilter}
                  onChange={(e) => setSkillFilter(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={handleFilterCities} disabled={isLoading}>
                  <Filter className="w-4 h-4 mr-2" />
                  Filter Cities
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cities.map((city, index) => (
              <Card 
                key={index} 
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => {
                  setSelectedCity(city);
                  setSelectedCityPage(1);
                  setShowCityDialog(true);
                }} 
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => {
                  setSelectedCity(city);
                  setSelectedCityPage(1);
                  setShowCityDialog(true);
                }} 
                className=\"hover:shadow-lg transition-shadow cursor-pointer\"
                onClick={() => {
                  setSelectedCity(city);
                  setSelectedCityPage(1);
                  setShowCityDialog(true);
                }}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    {city.city}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Companies:</span>
                      <span className=\"font-medium\">{city.companyCount}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Candidates:</span>
                      <span className=\"font-medium\">{city.candidateCount}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Avg Salary:</span>
                      <span className=\"font-medium\">${(city.avgSalary / 1000).toFixed(0)}k</span>
                    </div>
                    
                    <div className="pt-2">
                      <p className="text-xs text-gray-600 mb-2">Top Companies:</p>
                      <div className="space-y-1">
                        {city.companies.slice(0, 3).map((company: string, idx: number) => (
                          <div key={idx} className="text-sm">{company}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Talent Movement Tab */}
        <TabsContent value="movement" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Talent Flow Clusters</CardTitle>
              <CardDescription>Common career paths and company transitions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {talentMovement?.clusters?.map((cluster: any, index: number) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-gray-400" />
                          <span>{cluster.from}</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-blue-600" />
                          <span>{cluster.to}</span>
                        </div>
                      </div>
                      <Badge>
                        <TrendingUp className="w-3 h-3 mr-1" />
                        {cluster.count} transitions
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <p className="text-xs text-gray-600 w-full">Candidates:</p>
                      {cluster.candidates.map((candidate: string, idx: number) => (
                        <Badge key={idx} variant="outline">{candidate}</Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Individual Movements</CardTitle>
              <CardDescription>Track individual career transitions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {talentMovement?.individualMovements?.map((movement: any, index: number) => (
                  <div key={index} className="p-3 border rounded text-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span>{movement.candidateName}</span>
                        <ChevronRight className="w-3 h-3 text-gray-400" />
                        <span className="text-gray-600">{movement.fromRole}</span>
                        <span className="text-gray-400">at</span>
                        <span>{movement.from}</span>
                        <ChevronRight className="w-3 h-3 text-blue-600" />
                        <span className="text-gray-600">{movement.toRole}</span>
                        <span className="text-gray-400">at</span>
                        <span className="font-medium">{movement.to}</span>
                      </div>
                      <span className="text-xs text-gray-500">{movement.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contact Database Tab */}
        <TabsContent value="contacts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Filter Hiring Managers</CardTitle>
              <CardDescription>Build targeted contact lists based on skills and companies</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Input
                  placeholder="Skills (e.g., React)"
                  value={skillFilter}
                  onChange={(e) => setSkillFilter(e.target.value)}
                />
                <Input
                  placeholder="Company"
                  value={companyFilter}
                  onChange={(e) => setCompanyFilter(e.target.value)}
                />
                <Button onClick={handleFilterManagers} disabled={isLoading}>
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" onClick={handleExportManagers}>
                  <Download className="w-4 h-4 mr-2" />
                  Export CSV
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base">
                    Hiring Managers ({hiringManagers.length})
                  </CardTitle>
                  <CardDescription>
                    {selectedManagers.length} selected for campaign
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleSelectAllManagers}>
                    {selectedManagers.length === hiringManagers.length ? 'Deselect All' : 'Select All'}
                  </Button>
                  <Button 
                    size="sm" 
                    onClick={() => setShowEmailDialog(true)}
                    disabled={selectedManagers.length === 0}
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Email Selected ({selectedManagers.length})
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {hiringManagers.map((manager, index) => (
                  <div 
                    key={index}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedManagers.includes(manager.email) ? 'bg-blue-50 border-blue-300' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => handleToggleManager(manager.email)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <input
                            type="checkbox"
                            checked={selectedManagers.includes(manager.email)}
                            onChange={() => {}}
                            className="w-4 h-4"
                          />
                          <div>
                            <h3 className="font-medium">{manager.name}</h3>
                            <p className="text-sm text-gray-600">{manager.title} at {manager.company}</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 ml-7">
                          <div>
                            <p className="text-xs text-gray-600">Email</p>
                            <p className="text-sm">{manager.email}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-600">Location</p>
                            <p className="text-sm">{manager.city}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-600">Team Size</p>
                            <p className="text-sm">{manager.teamMembers.length} members</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-600">Lead Score</p>
                            <Badge variant={manager.leadScore > 80 ? 'default' : 'secondary'}>
                              {manager.leadScore}/100
                            </Badge>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-3 ml-7">
                          <p className="text-xs text-gray-600 w-full">Skills in team:</p>
                          {manager.skills.slice(0, 5).map((skill, idx) => (
                            <Badge key={idx} variant="outline">{skill}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Email Campaigns Tab */}
        <TabsContent value="campaigns" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Total Campaigns</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl">{campaigns.length}</div>
                <p className="text-xs text-gray-600 mt-1">Email campaigns sent</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Total Sent</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl">
                  {campaigns.reduce((sum, c) => sum + c.stats.sent, 0)}
                </div>
                <p className="text-xs text-gray-600 mt-1">Emails delivered</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Avg Response Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl">
                  {campaigns.length > 0
                    ? Math.round(
                        (campaigns.reduce((sum, c) => sum + c.stats.replied, 0) /
                          campaigns.reduce((sum, c) => sum + c.stats.sent, 0)) *
                          100
                      )
                    : 0}%
                </div>
                <p className="text-xs text-gray-600 mt-1">Replies received</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Email Templates</CardTitle>
              <CardDescription>Pre-built templates for outreach campaigns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-3">
                {emailTemplates.map((template) => (
                  <div key={template.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium mb-1">{template.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">
                          Subject: {template.subject}
                        </p>
                        <p className="text-sm text-gray-500 line-clamp-2">
                          {template.body}
                        </p>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setShowTemplateDialog(true)}
                      >
                        Preview
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Recent Campaigns</CardTitle>
            </CardHeader>
            <CardContent>
              {campaigns.length === 0 ? (
                <p className="text-center text-gray-500 py-8">
                  No campaigns sent yet. Go to Contact Database to send your first campaign.
                </p>
              ) : (
                <div className="space-y-3">
                  {campaigns.map((campaign) => (
                    <div key={campaign.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className="font-medium">Campaign {campaign.id}</p>
                          <p className="text-xs text-gray-600">
                            Sent {new Date(campaign.sentAt).toLocaleString()}
                          </p>
                        </div>
                        <Badge>{campaign.recipientCount} recipients</Badge>
                      </div>
                      
                      <div className="grid grid-cols-5 gap-4 text-sm">
                        <div>
                          <div className="flex items-center gap-1 text-gray-600 mb-1">
                            <Send className="w-3 h-3" />
                            <span className="text-xs">Sent</span>
                          </div>
                          <p>{campaign.stats.sent}</p>
                        </div>
                        <div>
                          <div className="flex items-center gap-1 text-gray-600 mb-1">
                            <CheckCircle className="w-3 h-3" />
                            <span className="text-xs">Delivered</span>
                          </div>
                          <p>{campaign.stats.delivered}</p>
                        </div>
                        <div>
                          <div className="flex items-center gap-1 text-gray-600 mb-1">
                            <Eye className="w-3 h-3" />
                            <span className="text-xs">Opened</span>
                          </div>
                          <p>{campaign.stats.opened}</p>
                        </div>
                        <div>
                          <div className="flex items-center gap-1 text-gray-600 mb-1">
                            <MousePointerClick className="w-3 h-3" />
                            <span className="text-xs">Clicked</span>
                          </div>
                          <p>{campaign.stats.clicked}</p>
                        </div>
                        <div>
                          <div className="flex items-center gap-1 text-gray-600 mb-1">
                            <Mail className="w-3 h-3" />
                            <span className="text-xs">Replied</span>
                          </div>
                          <p>{campaign.stats.replied}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Company Details Dialog */}
      <Dialog open={showCompanyDialog} onOpenChange={setShowCompanyDialog}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-blue-600" />
              {selectedCompany?.name}
            </DialogTitle>
            <DialogDescription>
              Complete company profile with employees and projects
            </DialogDescription>
          </DialogHeader>
          
          {selectedCompany && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-xs text-gray-600">Industry</p>
                  <p className="text-sm mt-1">{selectedCompany.aiInfo.industry}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Size</p>
                  <p className="text-sm mt-1">{selectedCompany.aiInfo.size}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Employees in DB</p>
                  <p className="text-sm mt-1">{selectedCompany.employeeCount}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Funding Stage</p>
                  <p className="text-sm mt-1">{selectedCompany.aiInfo.fundingStage}</p>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">Employees & Alumni ({selectedCompany.employees.length})</h3>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {selectedCompany.employees.map((employee: any, idx: number) => (
                    <div key={idx} className="p-3 border rounded">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="font-medium">{employee.name}</p>
                          <p className="text-sm text-gray-600">{employee.role}</p>
                        </div>
                        <Badge variant={employee.current ? 'default' : 'secondary'}>
                          {employee.current ? 'Current' : 'Alumni'}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap gap-1 text-xs">
                        {employee.skills.slice(0, 5).map((skill: string, i: number) => (
                          <Badge key={i} variant="outline">{skill}</Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">Projects ({selectedCompany.projects.length})</h3>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {selectedCompany.projects.map((project: any, idx: number) => (
                    <div key={idx} className="p-3 border rounded">
                      <p className="font-medium">{project.name}</p>
                      <p className="text-sm text-gray-600">Led by: {project.employee}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">Hiring Managers ({selectedCompany.hiringManagers.length})</h3>
                <div className="space-y-2">
                  {selectedCompany.hiringManagers.map((manager: any, idx: number) => (
                    <div key={idx} className="p-3 border rounded">
                      <p className="font-medium">{manager.name}</p>
                      <p className="text-sm text-gray-600">{manager.title}</p>
                      <p className="text-sm text-blue-600">{manager.email}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Email Campaign Dialog */}
      <Dialog open={showEmailDialog} onOpenChange={setShowEmailDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Send Email Campaign</DialogTitle>
            <DialogDescription>
              Sending to {selectedManagers.length} hiring managers
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm mb-2 block">Select Template</label>
              <Select onValueChange={(value) => {
                const template = emailTemplates.find(t => t.id === value);
                setSelectedTemplate(template || null);
              }}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose an email template" />
                </SelectTrigger>
                <SelectContent>
                  {emailTemplates.map((template) => (
                    <SelectItem key={template.id} value={template.id}>
                      {template.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedTemplate && (
              <>
                <div>
                  <label className="text-sm mb-2 block">Variables</label>
                  <div className="space-y-2">
                    <Input
                      placeholder="Your Company Name"
                      value={emailVariables.myCompany}
                      onChange={(e) => setEmailVariables({...emailVariables, myCompany: e.target.value})}
                    />
                    <Input
                      placeholder="Your Name"
                      value={emailVariables.senderName}
                      onChange={(e) => setEmailVariables({...emailVariables, senderName: e.target.value})}
                    />
                    <Input
                      placeholder="Skill (e.g., React)"
                      value={emailVariables.skill}
                      onChange={(e) => setEmailVariables({...emailVariables, skill: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm mb-2 block">Preview</label>
                  <div className="p-4 border rounded bg-gray-50">
                    <p className="text-sm mb-2">
                      <strong>Subject:</strong> {selectedTemplate.subject}
                    </p>
                    <p className="text-sm whitespace-pre-wrap">{selectedTemplate.body}</p>
                  </div>
                </div>
              </>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEmailDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSendCampaign} disabled={isLoading || !selectedTemplate}>
              <Send className="w-4 h-4 mr-2" />
              Send Campaign
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

import { useState } from 'react';
import { Building2, TrendingUp, Users, Briefcase, UserCheck, Target, ChevronRight, Award, Sparkles, ExternalLink, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';

interface SearchFilters {
  skill?: string;
  product?: string;
  location?: string;
  companyType?: string;
}

interface CompanyInsight {
  name: string;
  score: number;
  location: string;
  employees: number;
  type: string;
  trend: 'up' | 'down' | 'stable';
  trendValue: string;
  description?: string;
}

interface IntelligenceDashboardProps {
  filters: SearchFilters;
  onCompanyClick?: (companyName: string) => void;
}

export function IntelligenceDashboard({ filters, onCompanyClick }: IntelligenceDashboardProps) {
  const [showAllDialog, setShowAllDialog] = useState(false);
  const [dialogType, setDialogType] = useState<string>('');
  const [dialogTitle, setDialogTitle] = useState('');

  // Mock data - in production this would come from API based on filters
  const totalCompanies = 247;
  
  const topCompanies: CompanyInsight[] = [
    { name: 'TechCorp Solutions', score: 98, location: 'San Francisco, CA', employees: 5000, type: 'End Client', trend: 'up', trendValue: '+15%', description: 'Leading enterprise software company' },
    { name: 'DataFlow Inc', score: 95, location: 'New York, NY', employees: 3200, type: 'End Client', trend: 'up', trendValue: '+12%', description: 'Data analytics and AI solutions' },
    { name: 'CloudNet Systems', score: 92, location: 'Seattle, WA', employees: 4100, type: 'Service Provider', trend: 'stable', trendValue: '+3%', description: 'Cloud infrastructure services' },
  ];

  const hiringCompanies: CompanyInsight[] = [
    { name: 'TechCorp Solutions', score: 98, location: 'San Francisco, CA', employees: 5000, type: 'End Client', trend: 'up', trendValue: '45 open roles' },
    { name: 'Innovation Labs', score: 94, location: 'Austin, TX', employees: 2800, type: 'End Client', trend: 'up', trendValue: '32 open roles' },
    { name: 'Digital Dynamics', score: 91, location: 'Boston, MA', employees: 3500, type: 'Service Provider', trend: 'up', trendValue: '28 open roles' },
    { name: 'NextGen Tech', score: 89, location: 'Denver, CO', employees: 1900, type: 'End Client', trend: 'up', trendValue: '24 open roles' },
    { name: 'Smart Solutions', score: 87, location: 'Chicago, IL', employees: 2400, type: 'Service Provider', trend: 'up', trendValue: '22 open roles' },
  ];

  const lookingOutCompanies: CompanyInsight[] = [
    { name: 'Legacy Systems Corp', score: 72, location: 'Detroit, MI', employees: 4200, type: 'End Client', trend: 'down', trendValue: '156 seeking' },
    { name: 'OldTech Industries', score: 68, location: 'Cleveland, OH', employees: 3800, type: 'End Client', trend: 'down', trendValue: '134 seeking' },
    { name: 'Traditional IT Co', score: 65, location: 'Pittsburgh, PA', employees: 2900, type: 'Service Provider', trend: 'down', trendValue: '98 seeking' },
    { name: 'Mainstream Software', score: 63, location: 'Milwaukee, WI', employees: 2100, type: 'Service Provider', trend: 'down', trendValue: '87 seeking' },
    { name: 'Standard Tech LLC', score: 60, location: 'Indianapolis, IN', employees: 1800, type: 'End Client', trend: 'down', trendValue: '76 seeking' },
  ];

  const serviceProviders: CompanyInsight[] = [
    { name: 'CloudNet Systems', score: 92, location: 'Seattle, WA', employees: 4100, type: 'Service Provider', trend: 'up', trendValue: '850 contractors' },
    { name: 'Digital Dynamics', score: 91, location: 'Boston, MA', employees: 3500, type: 'Service Provider', trend: 'up', trendValue: '720 contractors' },
    { name: 'Smart Solutions', score: 87, location: 'Chicago, IL', employees: 2400, type: 'Service Provider', trend: 'up', trendValue: '540 contractors' },
    { name: 'Tech Consultants Pro', score: 85, location: 'Atlanta, GA', employees: 2800, type: 'Service Provider', trend: 'stable', trendValue: '480 contractors' },
    { name: 'IT Services Global', score: 83, location: 'Dallas, TX', employees: 3100, type: 'Service Provider', trend: 'up', trendValue: '410 contractors' },
  ];

  const staffingCompanies: CompanyInsight[] = [
    { name: 'Elite Staffing Solutions', score: 90, location: 'New York, NY', employees: 450, type: 'Staffing', trend: 'up', trendValue: '2400 placements/yr' },
    { name: 'ProRecruit Partners', score: 88, location: 'Los Angeles, CA', employees: 380, type: 'Staffing', trend: 'up', trendValue: '2100 placements/yr' },
    { name: 'TechTalent Agency', score: 86, location: 'San Francisco, CA', employees: 320, type: 'Staffing', trend: 'up', trendValue: '1850 placements/yr' },
    { name: 'Workforce Pros', score: 84, location: 'Miami, FL', employees: 290, type: 'Staffing', trend: 'stable', trendValue: '1600 placements/yr' },
    { name: 'Recruitment Excellence', score: 82, location: 'Phoenix, AZ', employees: 250, type: 'Staffing', trend: 'up', trendValue: '1420 placements/yr' },
  ];

  const endClients: CompanyInsight[] = [
    { name: 'TechCorp Solutions', score: 98, location: 'San Francisco, CA', employees: 5000, type: 'End Client', trend: 'up', trendValue: '$2.5B revenue' },
    { name: 'DataFlow Inc', score: 95, location: 'New York, NY', employees: 3200, type: 'End Client', trend: 'up', trendValue: '$1.8B revenue' },
    { name: 'Innovation Labs', score: 94, location: 'Austin, TX', employees: 2800, type: 'End Client', trend: 'up', trendValue: '$1.4B revenue' },
    { name: 'NextGen Tech', score: 89, location: 'Denver, CO', employees: 1900, type: 'End Client', trend: 'up', trendValue: '$980M revenue' },
    { name: 'Enterprise Systems', score: 87, location: 'Charlotte, NC', employees: 2200, type: 'End Client', trend: 'stable', trendValue: '$850M revenue' },
  ];

  const allLookingOutCompanies: CompanyInsight[] = [
    ...lookingOutCompanies,
    { name: 'Classic Computing', score: 58, location: 'Columbus, OH', employees: 1600, type: 'Service Provider', trend: 'down', trendValue: '65 seeking' },
    { name: 'Heritage Tech', score: 56, location: 'Kansas City, MO', employees: 1400, type: 'End Client', trend: 'down', trendValue: '58 seeking' },
    { name: 'Vintage Software', score: 54, location: 'Nashville, TN', employees: 1200, type: 'Service Provider', trend: 'down', trendValue: '52 seeking' },
    { name: 'Established Systems', score: 52, location: 'Memphis, TN', employees: 1100, type: 'End Client', trend: 'down', trendValue: '47 seeking' },
    { name: 'Conventional IT', score: 50, location: 'Louisville, KY', employees: 980, type: 'Service Provider', trend: 'down', trendValue: '42 seeking' },
    { name: 'Traditional Computing', score: 48, location: 'Oklahoma City, OK', employees: 850, type: 'End Client', trend: 'down', trendValue: '38 seeking' },
    { name: 'Standard Systems Inc', score: 46, location: 'Omaha, NE', employees: 720, type: 'Service Provider', trend: 'down', trendValue: '34 seeking' },
  ];

  const allServiceProviders: CompanyInsight[] = [
    ...serviceProviders,
    { name: 'Professional Services Co', score: 81, location: 'Houston, TX', employees: 2700, type: 'Service Provider', trend: 'up', trendValue: '380 contractors' },
    { name: 'Consulting Partners LLC', score: 79, location: 'Philadelphia, PA', employees: 2200, type: 'Service Provider', trend: 'stable', trendValue: '340 contractors' },
    { name: 'Tech Advisory Group', score: 77, location: 'San Diego, CA', employees: 1900, type: 'Service Provider', trend: 'up', trendValue: '310 contractors' },
    { name: 'Solutions Unlimited', score: 75, location: 'Portland, OR', employees: 1700, type: 'Service Provider', trend: 'up', trendValue: '280 contractors' },
    { name: 'Strategic IT Services', score: 73, location: 'Minneapolis, MN', employees: 1500, type: 'Service Provider', trend: 'stable', trendValue: '250 contractors' },
  ];

  const allStaffingCompanies: CompanyInsight[] = [
    ...staffingCompanies,
    { name: 'Talent Solutions Inc', score: 80, location: 'Tampa, FL', employees: 230, type: 'Staffing', trend: 'up', trendValue: '1280 placements/yr' },
    { name: 'Career Builders Pro', score: 78, location: 'Denver, CO', employees: 210, type: 'Staffing', trend: 'stable', trendValue: '1150 placements/yr' },
    { name: 'Staffing Excellence', score: 76, location: 'Seattle, WA', employees: 195, type: 'Staffing', trend: 'up', trendValue: '1020 placements/yr' },
    { name: 'Hiring Partners LLC', score: 74, location: 'Austin, TX', employees: 180, type: 'Staffing', trend: 'up', trendValue: '950 placements/yr' },
    { name: 'Workforce Solutions', score: 72, location: 'Raleigh, NC', employees: 165, type: 'Staffing', trend: 'stable', trendValue: '880 placements/yr' },
  ];

  const allEndClients: CompanyInsight[] = [
    ...endClients,
    { name: 'Digital Innovations', score: 85, location: 'Palo Alto, CA', employees: 2100, type: 'End Client', trend: 'up', trendValue: '$780M revenue' },
    { name: 'Tech Solutions Ltd', score: 83, location: 'Cambridge, MA', employees: 1800, type: 'End Client', trend: 'stable', trendValue: '$650M revenue' },
    { name: 'Future Systems', score: 81, location: 'Redmond, WA', employees: 1600, type: 'End Client', trend: 'up', trendValue: '$580M revenue' },
    { name: 'Advanced Computing', score: 79, location: 'San Jose, CA', employees: 1500, type: 'End Client', trend: 'up', trendValue: '$520M revenue' },
    { name: 'Modern Tech Corp', score: 77, location: 'Santa Clara, CA', employees: 1400, type: 'End Client', trend: 'stable', trendValue: '$490M revenue' },
  ];

  const handleSeeAll = (type: string, title: string) => {
    setDialogType(type);
    setDialogTitle(title);
    setShowAllDialog(true);
  };

  const getDialogData = () => {
    switch (dialogType) {
      case 'lookingOut':
        return allLookingOutCompanies;
      case 'serviceProviders':
        return allServiceProviders;
      case 'staffing':
        return allStaffingCompanies;
      case 'endClients':
        return allEndClients;
      default:
        return [];
    }
  };

  const getTrendIcon = (trend: string) => {
    if (trend === 'up') return <TrendingUp className="w-3 h-3 text-green-600" />;
    if (trend === 'down') return <TrendingUp className="w-3 h-3 text-red-600 rotate-180" />;
    return <span className="w-3 h-3 text-gray-400">—</span>;
  };

  const CompanyCard = ({ company, showDescription = false }: { company: CompanyInsight; showDescription?: boolean }) => (
    <div 
      className="p-3 bg-white border rounded-lg hover:shadow-md transition-all cursor-pointer group"
      onClick={() => onCompanyClick?.(company.name)}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="text-sm font-medium truncate group-hover:text-blue-600 transition-colors">
              {company.name}
            </h4>
            <ExternalLink className="w-3 h-3 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-600 mb-1">
            <MapPin className="w-3 h-3" />
            <span className="truncate">{company.location}</span>
          </div>
          {showDescription && company.description && (
            <p className="text-xs text-gray-500 mt-1">{company.description}</p>
          )}
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="secondary" className="text-xs">
              {company.type}
            </Badge>
            <div className="flex items-center gap-1 text-xs text-gray-600">
              {getTrendIcon(company.trend)}
              <span>{company.trendValue}</span>
            </div>
          </div>
        </div>
        <div className="text-right flex-shrink-0">
          <div className="text-sm font-semibold text-purple-600">{company.score}</div>
          <div className="text-xs text-gray-500">Score</div>
          <Progress value={company.score} className="w-16 h-1.5 mt-1" />
        </div>
      </div>
    </div>
  );

  const renderSearchSummary = () => {
    const parts = [];
    if (filters.skill) parts.push(`Skill: ${filters.skill}`);
    if (filters.product) parts.push(`Product: ${filters.product}`);
    if (filters.location) parts.push(`Location: ${filters.location}`);
    if (filters.companyType && filters.companyType !== 'all') parts.push(`Type: ${filters.companyType}`);
    
    return parts.length > 0 ? parts.join(' • ') : 'All Companies';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6 border border-purple-200">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-purple-600" />
              <h2 className="text-xl">Intelligence Dashboard</h2>
            </div>
            <p className="text-sm text-gray-600">{renderSearchSummary()}</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-purple-600">{totalCompanies}</div>
            <div className="text-sm text-gray-600">Companies Found</div>
          </div>
        </div>
      </div>

      {/* Top 3 Companies */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5 text-yellow-600" />
                Top 3 Ranked Companies
              </CardTitle>
              <CardDescription>Highest scoring companies based on your search criteria</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {topCompanies.map((company, idx) => (
            <div key={company.name} className="relative">
              <div className="absolute -left-3 top-3 w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                {idx + 1}
              </div>
              <CompanyCard company={company} showDescription />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Hiring Companies */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-blue-600" />
              Top Hiring Companies
            </CardTitle>
            <CardDescription>Companies actively hiring for your skills</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {hiringCompanies.map((company) => (
              <CompanyCard key={company.name} company={company} />
            ))}
          </CardContent>
        </Card>

        {/* Companies Where People Are Looking Out */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-orange-600" />
                  High Talent Availability
                </CardTitle>
                <CardDescription>Companies with employees seeking opportunities</CardDescription>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => handleSeeAll('lookingOut', 'All Companies with High Talent Availability')}
              >
                See All
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {lookingOutCompanies.map((company) => (
              <CompanyCard key={company.name} company={company} />
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Three Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Service Providers */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Target className="w-4 h-4 text-purple-600" />
                  Top Service Providers
                </CardTitle>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => handleSeeAll('serviceProviders', 'All Service Providers')}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {serviceProviders.map((company) => (
              <CompanyCard key={company.name} company={company} />
            ))}
          </CardContent>
        </Card>

        {/* Top Staffing Companies */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Users className="w-4 h-4 text-green-600" />
                  Top Staffing Companies
                </CardTitle>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => handleSeeAll('staffing', 'All Staffing Companies')}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {staffingCompanies.map((company) => (
              <CompanyCard key={company.name} company={company} />
            ))}
          </CardContent>
        </Card>

        {/* Top End Clients */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Building2 className="w-4 h-4 text-indigo-600" />
                  Top End Clients
                </CardTitle>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => handleSeeAll('endClients', 'All End Clients')}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {endClients.map((company) => (
              <CompanyCard key={company.name} company={company} />
            ))}
          </CardContent>
        </Card>
      </div>

      {/* See All Dialog */}
      <Dialog open={showAllDialog} onOpenChange={setShowAllDialog}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{dialogTitle}</DialogTitle>
            <DialogDescription>
              {getDialogData().length} companies found matching your criteria
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            {getDialogData().map((company) => (
              <CompanyCard key={company.name} company={company} showDescription />
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

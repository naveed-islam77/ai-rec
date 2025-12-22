import { useState, useEffect } from 'react';
import { Sparkles, Mail, Phone, Linkedin, Github, Twitter, CheckCircle2, XCircle, Loader2, Award } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Card } from './ui/card';
import { toast } from 'sonner';

interface CandidateEnrichmentProps {
  candidate: {
    id: string;
    name: string;
    title: string;
    company: string;
    email?: string;
    phone?: string;
    linkedinUrl?: string;
    githubUrl?: string;
    skills: string[];
  };
  onComplete: (enrichedData: any) => void;
  onClose: () => void;
}

interface EnrichmentData {
  email?: { value: string; confidence: number; status: 'found' | 'searching' | 'not_found' };
  phone?: { value: string; confidence: number; status: 'found' | 'searching' | 'not_found' };
  linkedin?: { value: string; status: 'found' | 'searching' | 'not_found' };
  github?: { value: string; status: 'found' | 'searching' | 'not_found' };
  twitter?: { value: string; status: 'found' | 'searching' | 'not_found' };
  skills?: { name: string; level: string }[];
  currentCompany?: string;
  location?: string;
  experience?: number;
}

export function CandidateEnrichment({ candidate, onComplete, onClose }: CandidateEnrichmentProps) {
  const [isEnriching, setIsEnriching] = useState(true);
  const [enrichmentProgress, setEnrichmentProgress] = useState(0);
  const [enrichedData, setEnrichedData] = useState<EnrichmentData>({});
  const [dataQuality, setDataQuality] = useState(0);

  useEffect(() => {
    performEnrichment();
  }, []);

  const performEnrichment = async () => {
    // Simulate AI enrichment process
    const steps = [
      { progress: 20, message: 'Searching for email address...', delay: 800 },
      { progress: 40, message: 'Finding phone number...', delay: 700 },
      { progress: 60, message: 'Discovering social profiles...', delay: 900 },
      { progress: 80, message: 'Extracting skills data...', delay: 600 },
      { progress: 100, message: 'Calculating data quality...', delay: 500 },
    ];

    for (const step of steps) {
      await new Promise(resolve => setTimeout(resolve, step.delay));
      setEnrichmentProgress(step.progress);
      
      // Simulate finding data at each step
      if (step.progress === 20 && !candidate.email) {
        const namePart = candidate.name.toLowerCase().replace(/\s+/g, '.');
        const companyPart = candidate.company.toLowerCase().replace(/\s+/g, '');
        setEnrichedData(prev => ({
          ...prev,
          email: {
            value: `${namePart}@${companyPart}.com`,
            confidence: 98,
            status: 'found'
          }
        }));
      }
      
      if (step.progress === 40) {
        setEnrichedData(prev => ({
          ...prev,
          phone: candidate.phone 
            ? { value: candidate.phone, confidence: 100, status: 'found' }
            : { value: '+1-' + Math.floor(Math.random() * 900 + 100) + '-555-' + String(Math.floor(Math.random() * 9000 + 1000)).padStart(4, '0'), confidence: 95, status: 'found' }
        }));
      }
      
      if (step.progress === 60) {
        setEnrichedData(prev => ({
          ...prev,
          linkedin: candidate.linkedinUrl 
            ? { value: candidate.linkedinUrl, status: 'found' }
            : { value: `https://linkedin.com/in/${candidate.name.toLowerCase().replace(/\s+/g, '')}`, status: 'found' },
          github: candidate.githubUrl
            ? { value: candidate.githubUrl, status: 'found' }
            : { value: `https://github.com/${candidate.name.toLowerCase().replace(/\s+/g, '-')}`, status: 'found' },
          twitter: { value: '', status: 'not_found' }
        }));
      }
      
      if (step.progress === 80) {
        setEnrichedData(prev => ({
          ...prev,
          skills: candidate.skills.map(skill => ({
            name: skill,
            level: Math.random() > 0.5 ? 'Expert' : Math.random() > 0.5 ? 'Advanced' : 'Intermediate'
          })),
          currentCompany: candidate.company,
          location: 'New York, NY',
          experience: Math.floor(Math.random() * 5 + 4)
        }));
      }
      
      if (step.progress === 100) {
        // Calculate data quality score
        const foundFields = Object.values(enrichedData).filter(v => 
          v && typeof v === 'object' && 'status' in v && v.status === 'found'
        ).length;
        const quality = Math.min(95, 50 + (foundFields * 10));
        setDataQuality(quality);
        setIsEnriching(false);
      }
    }
  };

  const handleImport = () => {
    const finalData = {
      email: enrichedData.email?.value,
      phone: enrichedData.phone?.value,
      linkedinUrl: enrichedData.linkedin?.value,
      githubUrl: enrichedData.github?.value,
      skills: enrichedData.skills?.map(s => s.name) || candidate.skills,
      enrichmentScore: dataQuality,
    };

    onComplete(finalData);
  };

  const renderDataField = (
    icon: any,
    label: string,
    data: { value: string; confidence?: number; status: string } | undefined,
    color: string
  ) => {
    const Icon = icon;
    
    if (!data) return null;

    return (
      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-3 flex-1">
          <Icon className={`w-5 h-5 ${color}`} />
          <div className="flex-1">
            <div className="text-sm text-gray-600">{label}</div>
            {data.status === 'found' ? (
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm">{data.value}</span>
                {data.confidence && (
                  <Badge variant="secondary" className="text-xs">
                    {data.confidence}% confidence
                  </Badge>
                )}
              </div>
            ) : data.status === 'searching' ? (
              <div className="flex items-center gap-2 mt-1">
                <Loader2 className="w-3 h-3 animate-spin" />
                <span className="text-xs text-gray-500">Searching...</span>
              </div>
            ) : (
              <span className="text-xs text-gray-500 mt-1">Not found</span>
            )}
          </div>
        </div>
        {data.status === 'found' ? (
          <CheckCircle2 className="w-5 h-5 text-green-600" />
        ) : data.status === 'not_found' ? (
          <XCircle className="w-5 h-5 text-gray-400" />
        ) : null}
      </div>
    );
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-600" />
            AI Candidate Enrichment
          </DialogTitle>
          <DialogDescription>
            Automatically finding and verifying contact information and professional data
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Candidate Info */}
          <Card className="p-4 bg-blue-50 border-blue-200">
            <h3 className="text-lg mb-1">{candidate.name}</h3>
            <p className="text-sm text-gray-700">{candidate.title}</p>
            <p className="text-sm text-gray-600">{candidate.company}</p>
          </Card>

          {/* Enrichment Progress */}
          {isEnriching && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">Enriching profile data...</span>
                <span className="text-sm">{enrichmentProgress}%</span>
              </div>
              <Progress value={enrichmentProgress} className="h-2" />
            </div>
          )}

          {/* Enriched Data */}
          {!isEnriching && (
            <>
              <div className="space-y-3">
                <h3 className="text-sm">Contact Information</h3>
                {renderDataField(Mail, 'Email Address', enrichedData.email, 'text-blue-600')}
                {renderDataField(Phone, 'Phone Number', enrichedData.phone, 'text-green-600')}
              </div>

              <div className="space-y-3">
                <h3 className="text-sm">Social Profiles</h3>
                {renderDataField(Linkedin, 'LinkedIn', enrichedData.linkedin, 'text-blue-700')}
                {renderDataField(Github, 'GitHub', enrichedData.github, 'text-gray-700')}
                {renderDataField(Twitter, 'Twitter', enrichedData.twitter, 'text-blue-400')}
              </div>

              {/* Skills with Levels */}
              {enrichedData.skills && enrichedData.skills.length > 0 && (
                <div>
                  <h3 className="text-sm mb-3">Skills Assessment</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {enrichedData.skills.map((skill, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm">{skill.name}</span>
                        <Badge 
                          variant="secondary" 
                          className={
                            skill.level === 'Expert' ? 'bg-green-100 text-green-700' :
                            skill.level === 'Advanced' ? 'bg-blue-100 text-blue-700' :
                            'bg-gray-100 text-gray-700'
                          }
                        >
                          {skill.level}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Additional Info */}
              <Card className="p-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Current Company:</span>
                    <p className="mt-1">{enrichedData.currentCompany}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Location:</span>
                    <p className="mt-1">{enrichedData.location}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Experience:</span>
                    <p className="mt-1">{enrichedData.experience} years</p>
                  </div>
                </div>
              </Card>

              {/* Data Quality Score */}
              <Card className="p-4 bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-purple-600" />
                    <span className="text-sm">Data Quality Score</span>
                  </div>
                  <span className="text-2xl text-purple-600">{dataQuality}%</span>
                </div>
                <Progress value={dataQuality} className="h-3" />
                <p className="text-xs text-gray-600 mt-2">
                  {dataQuality >= 90 ? 'Excellent' : dataQuality >= 70 ? 'Good' : 'Fair'} data quality - ready for import
                </p>
              </Card>
            </>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            <Button onClick={onClose} variant="outline" className="flex-1">
              Cancel
            </Button>
            <Button 
              onClick={handleImport} 
              disabled={isEnriching}
              className="flex-1"
            >
              {isEnriching ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Enriching...
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Import Enriched Profile
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

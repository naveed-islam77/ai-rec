import { Building2, MapPin, Briefcase, Github, Linkedin, Globe, Mail, Phone, ExternalLink, CheckCircle2, Eye, SkipForward, Sparkles } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';

interface SourcedCandidateCardProps {
  candidate: {
    id: string;
    name: string;
    title: string;
    company: string;
    location: string;
    experience: number;
    source: 'linkedin' | 'github' | 'indeed' | 'stackoverflow';
    sourceUrl: string;
    email?: string;
    phone?: string;
    linkedinUrl?: string;
    githubUrl?: string;
    skills: string[];
    aiMatchScore: number;
    enrichmentStatus: 'pending' | 'enriched' | 'failed';
  };
  onImport: () => void;
  onEnrich: () => void;
  onSkip: () => void;
}

const sourceConfig = {
  linkedin: { name: 'LinkedIn', color: 'bg-blue-500', icon: Linkedin },
  github: { name: 'GitHub', color: 'bg-gray-800', icon: Github },
  indeed: { name: 'Indeed', color: 'bg-blue-700', icon: Globe },
  stackoverflow: { name: 'Stack Overflow', color: 'bg-orange-500', icon: Globe },
};

export function SourcedCandidateCard({ candidate, onImport, onEnrich, onSkip }: SourcedCandidateCardProps) {
  const sourceInfo = sourceConfig[candidate.source];
  const SourceIcon = sourceInfo.icon;

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-50';
    if (score >= 80) return 'text-blue-600 bg-blue-50';
    if (score >= 70) return 'text-yellow-600 bg-yellow-50';
    return 'text-gray-600 bg-gray-50';
  };

  const getEnrichmentBadge = () => {
    if (candidate.enrichmentStatus === 'enriched') {
      return (
        <Badge variant="secondary" className="bg-green-50 text-green-700">
          <CheckCircle2 className="w-3 h-3 mr-1" />
          Enriched
        </Badge>
      );
    }
    if (candidate.enrichmentStatus === 'pending') {
      return (
        <Badge variant="secondary" className="bg-yellow-50 text-yellow-700">
          Pending Enrichment
        </Badge>
      );
    }
    return null;
  };

  return (
    <Card className="p-6 hover:shadow-md transition-shadow">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-lg">{candidate.name}</h3>
              <div className={`px-3 py-1 rounded-full text-sm ${getMatchScoreColor(candidate.aiMatchScore)}`}>
                {candidate.aiMatchScore}% Match
              </div>
            </div>
            <p className="text-gray-700">{candidate.title}</p>
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Building2 className="w-4 h-4" />
                {candidate.company}
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {candidate.location}
              </div>
              <div className="flex items-center gap-1">
                <Briefcase className="w-4 h-4" />
                {candidate.experience} years
              </div>
            </div>
          </div>

          {/* Source Badge */}
          <div className="flex flex-col items-end gap-2">
            <Badge className={`${sourceInfo.color} text-white`}>
              <SourceIcon className="w-3 h-3 mr-1" />
              {sourceInfo.name}
            </Badge>
            {getEnrichmentBadge()}
          </div>
        </div>

        {/* Skills */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span className="text-sm text-gray-600">Skills Match</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {candidate.skills.map((skill, index) => (
              <Badge key={index} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        {/* Contact Information */}
        {(candidate.email || candidate.phone || candidate.linkedinUrl || candidate.githubUrl) && (
          <div className="flex flex-wrap gap-3 text-sm">
            {candidate.email && (
              <a
                href={`mailto:${candidate.email}`}
                className="flex items-center gap-1 text-blue-600 hover:text-blue-700"
              >
                <Mail className="w-4 h-4" />
                {candidate.email}
              </a>
            )}
            {candidate.phone && (
              <a
                href={`tel:${candidate.phone}`}
                className="flex items-center gap-1 text-blue-600 hover:text-blue-700"
              >
                <Phone className="w-4 h-4" />
                {candidate.phone}
              </a>
            )}
            {candidate.linkedinUrl && (
              <a
                href={candidate.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-blue-600 hover:text-blue-700"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
            {candidate.githubUrl && (
              <a
                href={candidate.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-blue-600 hover:text-blue-700"
              >
                <Github className="w-4 h-4" />
                GitHub
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        )}

        {/* AI Match Score Progress */}
        <div>
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-gray-600">AI Match Score</span>
            <span className={getMatchScoreColor(candidate.aiMatchScore).split(' ')[0]}>
              {candidate.aiMatchScore}%
            </span>
          </div>
          <Progress value={candidate.aiMatchScore} className="h-2" />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-2 border-t">
          <Button onClick={onImport} className="flex-1">
            <CheckCircle2 className="w-4 h-4 mr-2" />
            Import to Pool
          </Button>
          
          {candidate.enrichmentStatus === 'pending' && (
            <Button onClick={onEnrich} variant="outline">
              <Sparkles className="w-4 h-4 mr-2" />
              Enrich Data
            </Button>
          )}
          
          <Button onClick={onSkip} variant="ghost" size="icon">
            <SkipForward className="w-4 h-4" />
          </Button>
          
          <a
            href={candidate.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="ghost" size="icon">
              <Eye className="w-4 h-4" />
            </Button>
          </a>
        </div>
      </div>
    </Card>
  );
}

import { useState } from 'react';
import { Search, Filter, Download, CheckCircle2, Eye, Sparkles, Loader2 } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { BooleanSearchBuilder } from './BooleanSearchBuilder';
import { SourcedCandidateCard } from './SourcedCandidateCard';
import { CandidateEnrichment } from './CandidateEnrichment';
import { toast } from 'sonner';

interface SourcedCandidate {
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
}

const mockSourcedCandidates: SourcedCandidate[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    title: 'Senior React Developer',
    company: 'Tech Corp',
    location: 'New York, NY',
    experience: 6,
    source: 'linkedin',
    sourceUrl: 'https://linkedin.com/in/sarahjohnson',
    email: 'sarah.j@techcorp.com',
    linkedinUrl: 'https://linkedin.com/in/sarahjohnson',
    githubUrl: 'https://github.com/sarahj-dev',
    skills: ['React', 'TypeScript', 'Node.js', 'GraphQL'],
    aiMatchScore: 92,
    enrichmentStatus: 'enriched',
  },
  {
    id: '2',
    name: 'Mike Chen',
    title: 'React Lead Developer',
    company: 'StartupXYZ',
    location: 'Brooklyn, NY',
    experience: 7,
    source: 'github',
    sourceUrl: 'https://github.com/mikechen',
    linkedinUrl: 'https://linkedin.com/in/mikechen',
    githubUrl: 'https://github.com/mikechen',
    skills: ['React', 'TypeScript', 'AWS', 'Docker'],
    aiMatchScore: 88,
    enrichmentStatus: 'pending',
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    title: 'Full Stack Developer',
    company: 'Digital Agency',
    location: 'Manhattan, NY',
    experience: 5,
    source: 'linkedin',
    sourceUrl: 'https://linkedin.com/in/emilyrodriguez',
    email: 'emily.r@digital.com',
    phone: '+1-212-555-0145',
    linkedinUrl: 'https://linkedin.com/in/emilyrodriguez',
    skills: ['React', 'Vue.js', 'Node.js', 'MongoDB'],
    aiMatchScore: 85,
    enrichmentStatus: 'enriched',
  },
  {
    id: '4',
    name: 'David Park',
    title: 'Senior Frontend Engineer',
    company: 'Enterprise Solutions',
    location: 'Queens, NY',
    experience: 8,
    source: 'indeed',
    sourceUrl: 'https://indeed.com/profile/davidpark',
    linkedinUrl: 'https://linkedin.com/in/davidpark',
    skills: ['React', 'TypeScript', 'Redux', 'Next.js'],
    aiMatchScore: 90,
    enrichmentStatus: 'pending',
  },
  {
    id: '5',
    name: 'Lisa Wang',
    title: 'React Developer',
    company: 'Creative Studio',
    location: 'New York, NY',
    experience: 4,
    source: 'github',
    sourceUrl: 'https://github.com/lisawang',
    email: 'lisa.wang@creative.com',
    githubUrl: 'https://github.com/lisawang',
    skills: ['React', 'JavaScript', 'CSS', 'Tailwind'],
    aiMatchScore: 82,
    enrichmentStatus: 'enriched',
  },
];

export function AISourcingPanel() {
  const [isSearching, setIsSearching] = useState(false);
  const [candidates, setCandidates] = useState<SourcedCandidate[]>([]);
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([]);
  const [filterSource, setFilterSource] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('match_score');
  const [searchQuery, setSearchQuery] = useState('');
  const [showEnrichment, setShowEnrichment] = useState(false);
  const [enrichingCandidate, setEnrichingCandidate] = useState<SourcedCandidate | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (query: string, platforms: string[]) => {
    setIsSearching(true);
    setHasSearched(true);

    // Simulate search with delay
    setTimeout(() => {
      // Filter mock candidates based on selected platforms
      const results = mockSourcedCandidates.filter(c => 
        platforms.includes(c.source)
      );
      
      setCandidates(results);
      setIsSearching(false);
      toast.success(`Found ${results.length} candidates across ${platforms.length} platform(s)`);
    }, 2000);
  };

  const handleSaveSearch = (query: string, name: string) => {
    // In production, this would save to database
    console.log('Saving search:', { query, name });
  };

  const toggleCandidateSelection = (candidateId: string) => {
    setSelectedCandidates(prev =>
      prev.includes(candidateId)
        ? prev.filter(id => id !== candidateId)
        : [...prev, candidateId]
    );
  };

  const handleImportSelected = () => {
    if (selectedCandidates.length === 0) {
      toast.error('Please select candidates to import');
      return;
    }

    // Simulate import
    toast.success(`Importing ${selectedCandidates.length} candidate(s)...`);
    
    setTimeout(() => {
      toast.success(`Successfully imported ${selectedCandidates.length} candidate(s) to your talent pool!`);
      setSelectedCandidates([]);
    }, 1500);
  };

  const handleEnrichCandidate = (candidate: SourcedCandidate) => {
    setEnrichingCandidate(candidate);
    setShowEnrichment(true);
  };

  const handleEnrichmentComplete = (enrichedData: any) => {
    // Update candidate with enriched data
    setCandidates(prev =>
      prev.map(c =>
        c.id === enrichingCandidate?.id
          ? { ...c, ...enrichedData, enrichmentStatus: 'enriched' as const }
          : c
      )
    );
    
    setShowEnrichment(false);
    setEnrichingCandidate(null);
    toast.success('Candidate enriched successfully!');
  };

  const filteredCandidates = candidates
    .filter(c => filterSource === 'all' || c.source === filterSource)
    .filter(c => 
      searchQuery === '' ||
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.company.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'match_score') return b.aiMatchScore - a.aiMatchScore;
      if (sortBy === 'experience') return b.experience - a.experience;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0;
    });

  return (
    <div className="space-y-6">
      {/* Search Builder */}
      <BooleanSearchBuilder 
        onSearch={handleSearch} 
        onSaveSearch={handleSaveSearch}
      />

      {/* Loading State */}
      {isSearching && (
        <Card className="p-12">
          <div className="flex flex-col items-center justify-center gap-4">
            <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
            <div className="text-center">
              <h3 className="text-lg mb-1">Searching across platforms...</h3>
              <p className="text-sm text-gray-600">
                AI is analyzing profiles and calculating match scores
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Results Section */}
      {!isSearching && hasSearched && (
        <>
          {/* Results Header */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl flex items-center gap-2">
                Search Results
                <Badge variant="secondary">{filteredCandidates.length} candidates</Badge>
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                {selectedCandidates.length} selected
              </p>
            </div>

            {selectedCandidates.length > 0 && (
              <div className="flex gap-2">
                <Button onClick={handleImportSelected}>
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Import Selected ({selectedCandidates.length})
                </Button>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            )}
          </div>

          {/* Filters and Sort */}
          {candidates.length > 0 && (
            <Card className="p-4">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Filter by name, title, or company..."
                      className="pl-10"
                    />
                  </div>
                </div>

                <Select value={filterSource} onValueChange={setFilterSource}>
                  <SelectTrigger className="w-48">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sources</SelectItem>
                    <SelectItem value="linkedin">LinkedIn</SelectItem>
                    <SelectItem value="github">GitHub</SelectItem>
                    <SelectItem value="indeed">Indeed</SelectItem>
                    <SelectItem value="stackoverflow">Stack Overflow</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="match_score">Match Score</SelectItem>
                    <SelectItem value="experience">Experience</SelectItem>
                    <SelectItem value="name">Name</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </Card>
          )}

          {/* Results List */}
          {filteredCandidates.length > 0 ? (
            <div className="space-y-4">
              {filteredCandidates.map(candidate => (
                <div key={candidate.id} className="flex items-start gap-4">
                  <div className="pt-6">
                    <Checkbox
                      checked={selectedCandidates.includes(candidate.id)}
                      onCheckedChange={() => toggleCandidateSelection(candidate.id)}
                    />
                  </div>
                  <div className="flex-1">
                    <SourcedCandidateCard
                      candidate={candidate}
                      onImport={() => {
                        toast.success(`Importing ${candidate.name}...`);
                        setTimeout(() => {
                          toast.success(`${candidate.name} imported successfully!`);
                        }, 1000);
                      }}
                      onEnrich={() => handleEnrichCandidate(candidate)}
                      onSkip={() => {
                        setCandidates(prev => prev.filter(c => c.id !== candidate.id));
                        toast.info(`${candidate.name} skipped`);
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : candidates.length > 0 ? (
            <Card className="p-12">
              <div className="text-center text-gray-500">
                <Filter className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg mb-2">No candidates match your filters</h3>
                <p className="text-sm">Try adjusting your filter criteria</p>
              </div>
            </Card>
          ) : (
            <Card className="p-12">
              <div className="text-center text-gray-500">
                <Search className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg mb-2">No candidates found</h3>
                <p className="text-sm">Try adjusting your search criteria or selecting different platforms</p>
              </div>
            </Card>
          )}
        </>
      )}

      {/* Enrichment Dialog */}
      {showEnrichment && enrichingCandidate && (
        <CandidateEnrichment
          candidate={enrichingCandidate}
          onComplete={handleEnrichmentComplete}
          onClose={() => {
            setShowEnrichment(false);
            setEnrichingCandidate(null);
          }}
        />
      )}
    </div>
  );
}

import { useState } from 'react';
import { Sparkles, Wand2, Plus, X, HelpCircle, Search, Save } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from 'sonner';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';

interface SearchCriteria {
  id: string;
  field: string;
  operator: string;
  value: string;
  connector: 'AND' | 'OR';
}

interface BooleanSearchBuilderProps {
  onSearch: (query: string, platforms: string[]) => void;
  onSaveSearch?: (query: string, name: string) => void;
}

export function BooleanSearchBuilder({ onSearch, onSaveSearch }: BooleanSearchBuilderProps) {
  const [naturalLanguage, setNaturalLanguage] = useState('');
  const [booleanQuery, setBooleanQuery] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['linkedin', 'github']);
  const [criteria, setCriteria] = useState<SearchCriteria[]>([
    { id: '1', field: 'title', operator: 'contains', value: '', connector: 'AND' }
  ]);
  const [showVisualBuilder, setShowVisualBuilder] = useState(false);

  const platforms = [
    { id: 'linkedin', name: 'LinkedIn', color: 'bg-blue-500' },
    { id: 'github', name: 'GitHub', color: 'bg-gray-800' },
    { id: 'indeed', name: 'Indeed', color: 'bg-blue-700' },
    { id: 'stackoverflow', name: 'Stack Overflow', color: 'bg-orange-500' },
    { id: 'angellist', name: 'AngelList', color: 'bg-black' },
    { id: 'hired', name: 'Hired.com', color: 'bg-purple-600' },
    { id: 'dice', name: 'Dice', color: 'bg-red-600' },
    { id: 'glassdoor', name: 'Glassdoor', color: 'bg-green-600' },
    { id: 'twitter', name: 'Twitter/X', color: 'bg-blue-400' },
    { id: 'behance', name: 'Behance', color: 'bg-blue-600' },
    { id: 'dribbble', name: 'Dribbble', color: 'bg-pink-500' },
    { id: 'producthunt', name: 'ProductHunt', color: 'bg-orange-600' },
    { id: 'toptal', name: 'Toptal', color: 'bg-blue-800' },
    { id: 'upwork', name: 'Upwork', color: 'bg-green-500' },
    { id: 'freelancer', name: 'Freelancer', color: 'bg-blue-600' },
    { id: 'monster', name: 'Monster', color: 'bg-purple-700' },
    { id: 'careerbuilder', name: 'CareerBuilder', color: 'bg-orange-700' },
    { id: 'ziprecruiter', name: 'ZipRecruiter', color: 'bg-green-700' },
    { id: 'crunchbase', name: 'Crunchbase', color: 'bg-blue-900' },
    { id: 'medium', name: 'Medium', color: 'bg-gray-700' },
    { id: 'devto', name: 'Dev.to', color: 'bg-black' },
    { id: 'hashnode', name: 'Hashnode', color: 'bg-blue-600' },
  ];

  const fieldOptions = [
    { value: 'title', label: 'Job Title' },
    { value: 'skills', label: 'Skills' },
    { value: 'location', label: 'Location' },
    { value: 'experience', label: 'Years of Experience' },
    { value: 'education', label: 'Education' },
    { value: 'company', label: 'Current/Past Company' },
  ];

  const operatorOptions = [
    { value: 'contains', label: 'Contains' },
    { value: 'equals', label: 'Equals' },
    { value: 'not_contains', label: 'Does Not Contain' },
    { value: 'greater_than', label: 'Greater Than' },
    { value: 'less_than', label: 'Less Than' },
  ];

  const handleGenerateBoolean = async () => {
    if (!naturalLanguage.trim()) {
      toast.error('Please enter a search description');
      return;
    }

    setIsGenerating(true);

    // Simulate AI processing
    setTimeout(() => {
      // Convert natural language to boolean query
      const query = convertToBoolean(naturalLanguage);
      setBooleanQuery(query);
      setIsGenerating(false);
      toast.success('Boolean query generated!');
    }, 1500);
  };

  const convertToBoolean = (text: string): string => {
    // Simple conversion logic (in production, this would use actual AI)
    let query = text.toLowerCase();
    
    // Extract key terms
    const skillMatch = query.match(/(?:knows|has|with)\s+([a-z]+(?:\s+[a-z]+)*)/i);
    const locationMatch = query.match(/(?:in|located|from)\s+([a-z\s]+?)(?:\s+with|\s+and|$)/i);
    const experienceMatch = query.match(/(\d+)\+?\s*(?:years?|yrs?)/i);
    const titleMatch = query.match(/(?:senior|junior|lead|staff)?\s*(?:developer|engineer|designer|manager)/i);

    let booleanParts: string[] = [];

    if (titleMatch) {
      const title = titleMatch[0].trim();
      booleanParts.push(`(${title} OR "${title}")`);
    }

    if (skillMatch) {
      const skills = skillMatch[1].split(/\s+(?:and|or)\s+/);
      const skillQuery = skills.map(s => s.trim()).join(' OR ');
      booleanParts.push(`(${skillQuery})`);
    }

    if (locationMatch) {
      booleanParts.push(`"${locationMatch[1].trim()}"`);
    }

    if (experienceMatch) {
      booleanParts.push(`experience:${experienceMatch[1]}+`);
    }

    return booleanParts.join(' AND ') || query;
  };

  const togglePlatform = (platformId: string) => {
    setSelectedPlatforms(prev =>
      prev.includes(platformId)
        ? prev.filter(p => p !== platformId)
        : [...prev, platformId]
    );
  };

  const addCriteria = () => {
    setCriteria([
      ...criteria,
      { id: Date.now().toString(), field: 'title', operator: 'contains', value: '', connector: 'AND' }
    ]);
  };

  const removeCriteria = (id: string) => {
    if (criteria.length > 1) {
      setCriteria(criteria.filter(c => c.id !== id));
    }
  };

  const updateCriteria = (id: string, field: keyof SearchCriteria, value: any) => {
    setCriteria(criteria.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  const buildVisualQuery = () => {
    const parts = criteria
      .filter(c => c.value.trim())
      .map((c, index) => {
        let part = `${c.field}:${c.value}`;
        if (index > 0) {
          part = `${criteria[index].connector} ${part}`;
        }
        return part;
      });
    
    return parts.join(' ');
  };

  const handleSearch = () => {
    const query = booleanQuery || buildVisualQuery();
    
    if (!query.trim()) {
      toast.error('Please enter a search query');
      return;
    }

    if (selectedPlatforms.length === 0) {
      toast.error('Please select at least one platform');
      return;
    }

    onSearch(query, selectedPlatforms);
  };

  return (
    <div className="space-y-6">
      {/* Natural Language Input */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-purple-600" />
          <Label className="text-base">AI-Powered Search Builder</Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <HelpCircle className="w-4 h-4 text-gray-400" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">Describe your ideal candidate in plain English, and AI will convert it to an optimized boolean search query</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="space-y-4">
          <div>
            <Label>Describe your ideal candidate</Label>
            <Textarea
              value={naturalLanguage}
              onChange={(e) => setNaturalLanguage(e.target.value)}
              placeholder="e.g., Senior React developer in New York with 5+ years experience in TypeScript and Node.js"
              className="mt-2 min-h-[80px]"
            />
          </div>

          <Button
            onClick={handleGenerateBoolean}
            disabled={isGenerating || !naturalLanguage.trim()}
            className="w-full"
          >
            {isGenerating ? (
              <>
                <Wand2 className="w-4 h-4 mr-2 animate-spin" />
                Generating Boolean Query...
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4 mr-2" />
                Generate Boolean Query with AI
              </>
            )}
          </Button>
        </div>
      </Card>

      {/* Generated Boolean Query */}
      {booleanQuery && (
        <Card className="p-6 bg-blue-50 border-blue-200">
          <Label className="text-sm text-blue-900">Generated Boolean Query</Label>
          <div className="mt-2 p-3 bg-white rounded border border-blue-200">
            <code className="text-sm text-blue-900">{booleanQuery}</code>
          </div>
          <div className="flex gap-2 mt-3">
            <Button size="sm" variant="outline" onClick={() => setBooleanQuery('')}>
              Clear
            </Button>
            <Button size="sm" variant="outline" onClick={() => {
              navigator.clipboard.writeText(booleanQuery);
              toast.success('Query copied to clipboard!');
            }}>
              Copy Query
            </Button>
          </div>
        </Card>
      )}

      {/* Visual Query Builder Toggle */}
      <div className="flex items-center justify-between">
        <Label>Or build your query visually</Label>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowVisualBuilder(!showVisualBuilder)}
        >
          {showVisualBuilder ? 'Hide' : 'Show'} Visual Builder
        </Button>
      </div>

      {/* Visual Query Builder */}
      {showVisualBuilder && (
        <Card className="p-6">
          <div className="space-y-4">
            {criteria.map((criterion, index) => (
              <div key={criterion.id} className="space-y-3">
                {index > 0 && (
                  <div className="flex items-center gap-2">
                    <Select
                      value={criterion.connector}
                      onValueChange={(value: 'AND' | 'OR') => updateCriteria(criterion.id, 'connector', value)}
                    >
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="AND">AND</SelectItem>
                        <SelectItem value="OR">OR</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <Select
                    value={criterion.field}
                    onValueChange={(value) => updateCriteria(criterion.id, 'field', value)}
                  >
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {fieldOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select
                    value={criterion.operator}
                    onValueChange={(value) => updateCriteria(criterion.id, 'operator', value)}
                  >
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {operatorOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Input
                    value={criterion.value}
                    onChange={(e) => updateCriteria(criterion.id, 'value', e.target.value)}
                    placeholder="Enter value..."
                    className="flex-1"
                  />

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeCriteria(criterion.id)}
                    disabled={criteria.length === 1}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}

            <Button variant="outline" onClick={addCriteria} className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Add Criteria
            </Button>

            {criteria.some(c => c.value.trim()) && (
              <div className="p-3 bg-gray-50 rounded border">
                <Label className="text-xs text-gray-600">Preview Query:</Label>
                <code className="text-sm block mt-1">{buildVisualQuery()}</code>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Platform Selection */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-3">
          <Label>Select Platforms to Search (22 Sources Available)</Label>
          <div className="flex gap-2">
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => setSelectedPlatforms(platforms.slice(0, 4).map(p => p.id))}
            >
              Top 4
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => setSelectedPlatforms(platforms.map(p => p.id))}
            >
              Select All
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => setSelectedPlatforms([])}
            >
              Clear
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {platforms.map(platform => (
            <button
              key={platform.id}
              onClick={() => togglePlatform(platform.id)}
              className={`p-3 rounded-lg border-2 transition-all text-sm ${
                selectedPlatforms.includes(platform.id)
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${platform.color}`}></div>
                <span className="text-xs">{platform.name}</span>
              </div>
              {selectedPlatforms.includes(platform.id) && (
                <Badge variant="secondary" className="mt-1 text-xs">✓</Badge>
              )}
            </button>
          ))}
        </div>
        <p className="text-xs text-gray-600 mt-3">
          {selectedPlatforms.length} platform{selectedPlatforms.length !== 1 ? 's' : ''} selected. 
          Recommended: 2-4 platforms for best results.
        </p>
      </Card>

      {/* Search Button */}
      <div className="flex gap-3">
        <Button onClick={handleSearch} className="flex-1" size="lg">
          <Search className="w-4 h-4 mr-2" />
          Search Candidates
        </Button>
        {onSaveSearch && (booleanQuery || buildVisualQuery()) && (
          <Button
            variant="outline"
            size="lg"
            onClick={() => {
              const query = booleanQuery || buildVisualQuery();
              const name = prompt('Enter a name for this search:');
              if (name) {
                onSaveSearch(query, name);
                toast.success('Search saved successfully!');
              }
            }}
          >
            <Save className="w-4 h-4 mr-2" />
            Save Search
          </Button>
        )}
      </div>
    </div>
  );
}

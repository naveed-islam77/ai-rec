import { Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface InterviewSheetProps {
  jobTitle: string;
  jobDescription?: string;
  candidateName?: string;
  candidateProfile?: {
    skills: string[];
    experience: string;
    title: string;
  };
  isPersonalized?: boolean;
}

export function InterviewSheet({ 
  jobTitle, 
  candidateName,
}: InterviewSheetProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-600" />
          Interview Sheet for {candidateName || 'Candidate'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Content removed - functionality moved to AI Match Analysis */}
        </div>
      </CardContent>
    </Card>
  );
}

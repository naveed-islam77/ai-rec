import { useState } from 'react';
import { GripVertical, Mail, Phone, Sparkles, Send, CheckSquare, Square } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Progress } from './ui/progress';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from './ui/sheet';
import { Separator } from './ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from './ui/dialog';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { toast } from 'sonner@2.0.3';

interface Candidate {
  id: number;
  name: string;
  title: string;
  avatar: string;
  email: string;
  phone: string;
  aiMatchScore: number;
  skills: string[];
  experience: string;
  location: string;
}

interface KanbanColumn {
  id: string;
  title: string;
  candidates: Candidate[];
  color: string;
}

const initialColumns: KanbanColumn[] = [
  {
    id: 'applied',
    title: 'Applied',
    color: 'bg-gray-100',
    candidates: [
      {
        id: 8,
        name: 'Alex Morgan',
        title: 'Full Stack Developer',
        avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400',
        email: 'alex.m@email.com',
        phone: '+1 (555) 111-2222',
        aiMatchScore: 78,
        skills: ['React', 'Node.js', 'MongoDB'],
        experience: '4 years',
        location: 'Boston, MA',
      },
      {
        id: 9,
        name: 'Rachel Kim',
        title: 'Software Engineer',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
        email: 'rachel.k@email.com',
        phone: '+1 (555) 222-3333',
        aiMatchScore: 81,
        skills: ['JavaScript', 'Python', 'AWS'],
        experience: '5 years',
        location: 'Seattle, WA',
      },
    ],
  },
  {
    id: 'screening',
    title: 'Screening',
    color: 'bg-blue-100',
    candidates: [
      {
        id: 1,
        name: 'Sarah Johnson',
        title: 'Senior Full Stack Developer',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
        email: 'sarah.j@email.com',
        phone: '+1 (555) 123-4567',
        aiMatchScore: 94,
        skills: ['React', 'Node.js', 'Python', 'AWS'],
        experience: '8 years',
        location: 'San Francisco, CA',
      },
      {
        id: 10,
        name: 'Tom Wilson',
        title: 'Full Stack Engineer',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400',
        email: 'tom.w@email.com',
        phone: '+1 (555) 333-4444',
        aiMatchScore: 86,
        skills: ['React', 'TypeScript', 'GraphQL'],
        experience: '6 years',
        location: 'Austin, TX',
      },
    ],
  },
  {
    id: 'shortlisted',
    title: 'Shortlisted',
    color: 'bg-purple-100',
    candidates: [
      {
        id: 4,
        name: 'David Park',
        title: 'Full Stack Developer',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
        email: 'dpark@email.com',
        phone: '+1 (555) 456-7890',
        aiMatchScore: 91,
        skills: ['React', 'Node.js', 'Docker'],
        experience: '7 years',
        location: 'Seattle, WA',
      },
    ],
  },
  {
    id: 'technical',
    title: 'Technical Interview',
    color: 'bg-orange-100',
    candidates: [
      {
        id: 2,
        name: 'Michael Chen',
        title: 'Senior Software Engineer',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
        email: 'mchen@email.com',
        phone: '+1 (555) 234-5678',
        aiMatchScore: 89,
        skills: ['React', 'Node.js', 'Kubernetes'],
        experience: '6 years',
        location: 'New York, NY',
      },
    ],
  },
  {
    id: 'final',
    title: 'Final Interview',
    color: 'bg-yellow-100',
    candidates: [
      {
        id: 5,
        name: 'Lisa Thompson',
        title: 'Full Stack Developer',
        avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400',
        email: 'lisa.t@email.com',
        phone: '+1 (555) 567-8901',
        aiMatchScore: 88,
        skills: ['React', 'Node.js', 'PostgreSQL'],
        experience: '6 years',
        location: 'Remote',
      },
    ],
  },
  {
    id: 'offer',
    title: 'Offer',
    color: 'bg-green-100',
    candidates: [
      {
        id: 11,
        name: 'Emma Davis',
        title: 'Senior Full Stack Developer',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
        email: 'emma.d@email.com',
        phone: '+1 (555) 444-5555',
        aiMatchScore: 92,
        skills: ['React', 'Node.js', 'AWS', 'TypeScript'],
        experience: '7 years',
        location: 'San Francisco, CA',
      },
    ],
  },
];

interface KanbanBoardProps {
  onSelectCandidate: (candidateId: number) => void;
}

export function KanbanBoard({ onSelectCandidate }: KanbanBoardProps) {
  const [columns, setColumns] = useState(initialColumns);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [draggedCandidate, setDraggedCandidate] = useState<{ candidate: Candidate; fromColumn: string } | null>(null);
  const [selectedScreeningCandidates, setSelectedScreeningCandidates] = useState<number[]>([]);
  const [emailClientDialogOpen, setEmailClientDialogOpen] = useState(false);

  const handleDragStart = (candidate: Candidate, fromColumn: string) => {
    setDraggedCandidate({ candidate, fromColumn });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (toColumnId: string) => {
    if (!draggedCandidate) return;

    const { candidate, fromColumn } = draggedCandidate;
    if (fromColumn === toColumnId) return;

    setColumns(prevColumns => {
      return prevColumns.map(col => {
        if (col.id === fromColumn) {
          return {
            ...col,
            candidates: col.candidates.filter(c => c.id !== candidate.id),
          };
        }
        if (col.id === toColumnId) {
          return {
            ...col,
            candidates: [...col.candidates, candidate],
          };
        }
        return col;
      });
    });

    setDraggedCandidate(null);
  };

  const handleCandidateClick = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
  };

  const toggleScreeningSelection = (candidateId: number) => {
    setSelectedScreeningCandidates(prev =>
      prev.includes(candidateId)
        ? prev.filter(id => id !== candidateId)
        : [...prev, candidateId]
    );
  };

  const handleSendToClient = () => {
    if (selectedScreeningCandidates.length === 0) {
      toast.error('Please select at least one candidate');
      return;
    }
    setEmailClientDialogOpen(true);
  };

  const handleSubmitToClient = () => {
    const screeningColumn = columns.find(col => col.id === 'screening');
    const selectedCandidatesList = screeningColumn?.candidates.filter(c =>
      selectedScreeningCandidates.includes(c.id)
    ) || [];

    // Generate shareable links for each candidate
    const candidateLinks = selectedCandidatesList.map(c => ({
      name: c.name,
      link: `${window.location.origin}/candidate-review/${Math.random().toString(36).substr(2, 9)}`,
    }));

    toast.success(`Email sent to client with ${selectedScreeningCandidates.length} candidate profile(s)`);
    setEmailClientDialogOpen(false);
    setSelectedScreeningCandidates([]);
  };

  return (
    <>
      <div className="overflow-x-auto pb-4">
        <div className="flex gap-4 min-w-max">
          {columns.map((column) => (
            <div
              key={column.id}
              className="flex-shrink-0 w-[320px]"
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(column.id)}
            >
              <div className={`${column.color} rounded-t-lg px-4 py-3`}>
                <div className="flex items-center justify-between">
                  <h3 className="text-sm">{column.title}</h3>
                  <div className="flex items-center gap-2">
                    {column.id === 'screening' && selectedScreeningCandidates.length > 0 && (
                      <Badge className="bg-blue-600 text-white text-xs">
                        {selectedScreeningCandidates.length} selected
                      </Badge>
                    )}
                    <Badge variant="secondary" className="text-xs">
                      {column.candidates.length}
                    </Badge>
                  </div>
                </div>
                {column.id === 'screening' && column.candidates.length > 0 && (
                  <div className="mt-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="w-full gap-2 text-xs h-8"
                      onClick={handleSendToClient}
                    >
                      <Send className="w-3 h-3" />
                      Send to Client ({selectedScreeningCandidates.length || 0})
                    </Button>
                  </div>
                )}
              </div>
              <div className="bg-gray-50 rounded-b-lg p-3 min-h-[600px] space-y-3">
                {column.candidates.map((candidate) => (
                  <Card
                    key={candidate.id}
                    className={`cursor-move hover:shadow-md transition-shadow bg-white ${
                      column.id === 'screening' && selectedScreeningCandidates.includes(candidate.id)
                        ? 'ring-2 ring-blue-500'
                        : ''
                    }`}
                    draggable
                    onDragStart={() => handleDragStart(candidate, column.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3 mb-3">
                        {column.id === 'screening' && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleScreeningSelection(candidate.id);
                            }}
                            className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-1 transition-colors ${
                              selectedScreeningCandidates.includes(candidate.id)
                                ? 'bg-blue-600 border-blue-600'
                                : 'border-gray-300 hover:border-blue-400'
                            }`}
                          >
                            {selectedScreeningCandidates.includes(candidate.id) && (
                              <CheckSquare className="w-4 h-4 text-white" />
                            )}
                          </button>
                        )}
                        <GripVertical className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                        <ImageWithFallback
                          src={candidate.avatar}
                          alt={candidate.name}
                          className="w-12 h-12 rounded-full object-cover cursor-pointer"
                          onClick={() => handleCandidateClick(candidate)}
                        />
                        <div className="flex-1 min-w-0">
                          <p
                            className="text-sm cursor-pointer hover:text-blue-600"
                            onClick={() => handleCandidateClick(candidate)}
                          >
                            {candidate.name}
                          </p>
                          <p className="text-xs text-gray-600 truncate">{candidate.title}</p>
                        </div>
                      </div>

                      {/* AI Match Score */}
                      <div className="mb-3 p-2 bg-gradient-to-r from-purple-50 to-blue-50 rounded">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-purple-600" />
                            <span className="text-xs">Match</span>
                          </div>
                          <span className="text-xs text-purple-600">{candidate.aiMatchScore}%</span>
                        </div>
                        <Progress value={candidate.aiMatchScore} className="h-1.5" />
                      </div>

                      {/* Skills */}
                      <div className="flex flex-wrap gap-1 mb-3">
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

                      {/* Actions */}
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 h-8 text-xs"
                          onClick={() => onSelectCandidate(candidate.id)}
                        >
                          View Profile
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="h-8 w-8 p-0"
                          onClick={(e) => {
                            e.stopPropagation();
                            toast.success(`Sending email to ${candidate.name}`);
                          }}
                        >
                          <Mail className="w-3 h-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick View Sheet */}
      <Sheet open={!!selectedCandidate} onOpenChange={(open) => !open && setSelectedCandidate(null)}>
        <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
          {selectedCandidate && (
            <>
              <SheetHeader>
                <SheetTitle>Candidate Quick View</SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                <div className="flex items-start gap-4">
                  <ImageWithFallback
                    src={selectedCandidate.avatar}
                    alt={selectedCandidate.name}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg">{selectedCandidate.name}</h3>
                    <p className="text-sm text-gray-600">{selectedCandidate.title}</p>
                    <p className="text-sm text-gray-500 mt-1">{selectedCandidate.location}</p>
                  </div>
                </div>

                <Separator />

                {/* AI Match */}
                <div>
                  <p className="text-sm mb-2">AI Match Score</p>
                  <div className="p-3 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1">
                        <Sparkles className="w-4 h-4 text-purple-600" />
                        <span className="text-sm">Overall Match</span>
                      </div>
                      <span className="text-purple-600">{selectedCandidate.aiMatchScore}%</span>
                    </div>
                    <Progress value={selectedCandidate.aiMatchScore} className="h-2" />
                  </div>
                </div>

                <Separator />

                {/* Skills */}
                <div>
                  <p className="text-sm mb-2">Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedCandidate.skills.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Experience */}
                <div>
                  <p className="text-sm mb-2">Experience</p>
                  <p className="text-gray-600">{selectedCandidate.experience}</p>
                </div>

                <Separator />

                {/* Contact */}
                <div>
                  <p className="text-sm mb-3">Contact Information</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <a href={`mailto:${selectedCandidate.email}`} className="text-sm text-blue-600 hover:underline">
                        {selectedCandidate.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <a href={`tel:${selectedCandidate.phone}`} className="text-sm text-blue-600 hover:underline">
                        {selectedCandidate.phone}
                      </a>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Actions */}
                <div className="flex gap-3">
                  <Button className="flex-1" onClick={() => onSelectCandidate(selectedCandidate.id)}>
                    View Full Profile
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => {
                      toast.success('Interview scheduling feature coming soon!');
                    }}
                  >
                    Schedule Interview
                  </Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      {/* Email to Client Dialog */}
      <Dialog open={emailClientDialogOpen} onOpenChange={setEmailClientDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Send className="w-5 h-5" />
              Send Candidates to Client
            </DialogTitle>
            <DialogDescription>
              Send anonymized candidate profiles with evaluation forms to your client
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm mb-2">Sending {selectedScreeningCandidates.length} candidate(s) for review:</p>
              <div className="space-y-1">
                {columns.find(col => col.id === 'screening')?.candidates
                  .filter(c => selectedScreeningCandidates.includes(c.id))
                  .map(c => (
                    <div key={c.id} className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        {c.name}
                      </Badge>
                      <span className="text-xs text-gray-600">- {c.title}</span>
                    </div>
                  ))}
              </div>
            </div>

            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <div className="flex items-start gap-2">
                <Sparkles className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm mb-2">What will be sent:</p>
                  <ul className="text-xs text-gray-700 space-y-1 list-disc list-inside">
                    <li>Anonymized candidate profiles (names hidden)</li>
                    <li>Unique review links for each candidate</li>
                    <li>Suggested interview evaluation sheet</li>
                    <li>Option for free-flow comments</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="client-email">Client Email Address</Label>
              <input
                type="email"
                id="client-email"
                placeholder="client@company.com"
                className="w-full mt-2 px-3 py-2 border rounded-lg"
                defaultValue="hiring.manager@client.com"
              />
            </div>

            <div>
              <Label htmlFor="email-message">Message to Client (Optional)</Label>
              <Textarea
                id="email-message"
                placeholder="Add a personal message to the client..."
                rows={4}
                className="mt-2"
                defaultValue={`Hi,\n\nI've reviewed ${selectedScreeningCandidates.length} candidates for your ${columns.find(col => col.id === 'screening')?.title || 'position'} and believe they would be excellent fits.\n\nPlease review their anonymized profiles using the links below and provide your feedback. Each profile includes an AI match score and suggested interview questions.\n\nLooking forward to your thoughts!`}
              />
            </div>

            <div className="p-3 bg-gray-50 rounded border">
              <p className="text-xs text-gray-600 mb-2">Preview of candidate links:</p>
              {columns.find(col => col.id === 'screening')?.candidates
                .filter(c => selectedScreeningCandidates.includes(c.id))
                .map((c, idx) => (
                  <div key={c.id} className="text-xs text-gray-700 mb-1">
                    Candidate #{idx + 1}: <span className="text-blue-600">
                      {window.location.origin}/candidate-review/{Math.random().toString(36).substr(2, 9)}
                    </span>
                  </div>
                ))}
            </div>
          </div>

          <DialogFooter className="mt-6">
            <Button variant="outline" onClick={() => setEmailClientDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmitToClient} className="gap-2">
              <Send className="w-4 h-4" />
              Send to Client
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

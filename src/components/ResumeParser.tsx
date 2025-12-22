import { useState } from 'react';
import { Upload, FileText, Loader2, CheckCircle2, Sparkles, AlertCircle, Edit } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';
import { toast } from 'sonner@2.0.3';

type ParsingStep = 'upload' | 'parsing' | 'review' | 'complete';

interface ParsedData {
  name: string;
  email: string;
  phone: string;
  location: string;
  title: string;
  summary: string;
  skills: string[];
  experience: string;
  education: string;
  workHistory: {
    company: string;
    role: string;
    period: string;
    description: string;
  }[];
}

interface ResumeParserProps {
  onComplete?: (candidateData: ParsedData) => void;
  onCancel?: () => void;
}

export function ResumeParser({ onComplete, onCancel }: ResumeParserProps) {
  const [currentStep, setCurrentStep] = useState<ParsingStep>('upload');
  const [parsingProgress, setParsingProgress] = useState(0);
  const [fileName, setFileName] = useState('');
  const [parsedData, setParsedData] = useState<ParsedData>({
    name: '',
    email: '',
    phone: '',
    location: '',
    title: '',
    summary: '',
    skills: [],
    experience: '',
    education: '',
    workHistory: [],
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setCurrentStep('parsing');
      simulateParsing();
    }
  };

  const simulateParsing = () => {
    // Simulate AI parsing with progress steps
    const steps = [
      { progress: 20, message: 'Extracting text from resume...' },
      { progress: 40, message: 'Identifying contact information...' },
      { progress: 60, message: 'Analyzing work experience...' },
      { progress: 80, message: 'Extracting skills and education...' },
      { progress: 100, message: 'Finalizing candidate profile...' },
    ];

    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress++;
      const currentStepData = steps.find(s => s.progress >= currentProgress * 20);
      
      if (currentProgress <= 5) {
        setParsingProgress(currentProgress * 20);
      } else {
        clearInterval(interval);
        // Simulate parsed data
        setParsedData({
          name: 'Alexandra Williams',
          email: 'alexandra.williams@email.com',
          phone: '+1 (555) 987-6543',
          location: 'New York, NY',
          title: 'Senior Product Manager',
          summary: 'Results-driven Product Manager with 7+ years of experience leading cross-functional teams to deliver innovative products. Proven track record of increasing user engagement by 150% and revenue by $5M through data-driven product strategies.',
          skills: ['Product Strategy', 'Agile/Scrum', 'User Research', 'Data Analytics', 'A/B Testing', 'Roadmap Planning', 'Stakeholder Management', 'SQL', 'Jira', 'Figma'],
          experience: '7 years',
          education: 'MBA, NYU Stern School of Business',
          workHistory: [
            {
              company: 'TechVision Corp',
              role: 'Senior Product Manager',
              period: '2021 - Present',
              description: 'Led product strategy for flagship SaaS platform serving 100K+ users. Launched 3 major features that increased user engagement by 150% and revenue by $5M.',
            },
            {
              company: 'InnovateTech',
              role: 'Product Manager',
              period: '2019 - 2021',
              description: 'Managed product lifecycle from ideation to launch. Collaborated with engineering and design teams to deliver customer-centric solutions.',
            },
            {
              company: 'StartupHub',
              role: 'Associate Product Manager',
              period: '2017 - 2019',
              description: 'Supported product development initiatives and conducted user research. Analyzed metrics to inform product decisions.',
            },
          ],
        });
        setCurrentStep('review');
      }
    }, 600);
  };

  const handleSkillAdd = (skill: string) => {
    if (skill && !parsedData.skills.includes(skill)) {
      setParsedData({
        ...parsedData,
        skills: [...parsedData.skills, skill],
      });
    }
  };

  const handleSkillRemove = (skillToRemove: string) => {
    setParsedData({
      ...parsedData,
      skills: parsedData.skills.filter(s => s !== skillToRemove),
    });
  };

  const handleSubmit = () => {
    setCurrentStep('complete');
    setTimeout(() => {
      toast.success('Candidate added to database successfully!');
      onComplete?.(parsedData);
    }, 1000);
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-600" />
          AI Resume Parser
        </CardTitle>
        <p className="text-sm text-gray-600">Upload a resume and let AI extract candidate information</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Progress Steps */}
        <div className="flex items-center justify-between">
          {['Upload', 'Parsing', 'Review', 'Complete'].map((step, index) => {
            const stepValue = ['upload', 'parsing', 'review', 'complete'][index];
            const isActive = currentStep === stepValue;
            const isCompleted = ['upload', 'parsing', 'review', 'complete'].indexOf(currentStep) > index;
            
            return (
              <div key={step} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    isCompleted ? 'bg-green-500' : isActive ? 'bg-blue-500' : 'bg-gray-200'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    ) : (
                      <span className={`text-sm ${isActive ? 'text-white' : 'text-gray-500'}`}>
                        {index + 1}
                      </span>
                    )}
                  </div>
                  <span className={`text-xs mt-2 ${isActive ? 'text-blue-600' : 'text-gray-500'}`}>
                    {step}
                  </span>
                </div>
                {index < 3 && (
                  <div className={`flex-1 h-0.5 ${isCompleted ? 'bg-green-500' : 'bg-gray-200'}`} />
                )}
              </div>
            );
          })}
        </div>

        <Separator />

        {/* Upload Step */}
        {currentStep === 'upload' && (
          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-blue-400 transition-colors">
              <input
                type="file"
                id="resume-upload"
                className="hidden"
                accept=".pdf,.doc,.docx"
                onChange={handleFileUpload}
              />
              <label htmlFor="resume-upload" className="cursor-pointer">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-sm mb-2">Click to upload resume or drag and drop</p>
                <p className="text-xs text-gray-500">PDF, DOC, or DOCX (Max 10MB)</p>
              </label>
            </div>
            <div className="flex gap-2">
              <Button className="flex-1" onClick={() => document.getElementById('resume-upload')?.click()}>
                <Upload className="w-4 h-4 mr-2" />
                Choose File
              </Button>
              {onCancel && (
                <Button variant="outline" onClick={onCancel}>
                  Cancel
                </Button>
              )}
            </div>
          </div>
        )}

        {/* Parsing Step */}
        {currentStep === 'parsing' && (
          <div className="space-y-6 py-8">
            <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
              <FileText className="w-5 h-5 text-blue-600" />
              <div className="flex-1">
                <p className="text-sm">{fileName}</p>
                <p className="text-xs text-gray-600 mt-1">Processing with AI...</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Parsing Progress</span>
                <span className="text-blue-600">{parsingProgress}%</span>
              </div>
              <Progress value={parsingProgress} className="h-3" />
            </div>

            <div className="space-y-2">
              {[
                'Extracting text from resume...',
                'Identifying contact information...',
                'Analyzing work experience...',
                'Extracting skills and education...',
                'Finalizing candidate profile...',
              ].map((message, index) => {
                const completed = parsingProgress > index * 20;
                const active = parsingProgress >= index * 20 && parsingProgress < (index + 1) * 20;
                
                return (
                  <div key={index} className={`flex items-center gap-2 text-sm ${
                    completed ? 'text-green-600' : active ? 'text-blue-600' : 'text-gray-400'
                  }`}>
                    {completed ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : active ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border-2 border-gray-300" />
                    )}
                    <span>{message}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Review Step */}
        {currentStep === 'review' && (
          <div className="space-y-6">
            <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <p className="text-sm">Resume parsed successfully!</p>
                  <p className="text-xs text-gray-600 mt-1">Review and edit the extracted information before submitting.</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={parsedData.name}
                  onChange={(e) => setParsedData({ ...parsedData, name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="title">Job Title</Label>
                <Input
                  id="title"
                  value={parsedData.title}
                  onChange={(e) => setParsedData({ ...parsedData, title: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={parsedData.email}
                  onChange={(e) => setParsedData({ ...parsedData, email: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={parsedData.phone}
                  onChange={(e) => setParsedData({ ...parsedData, phone: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={parsedData.location}
                  onChange={(e) => setParsedData({ ...parsedData, location: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="experience">Years of Experience</Label>
                <Input
                  id="experience"
                  value={parsedData.experience}
                  onChange={(e) => setParsedData({ ...parsedData, experience: e.target.value })}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="summary">Professional Summary</Label>
              <Textarea
                id="summary"
                value={parsedData.summary}
                onChange={(e) => setParsedData({ ...parsedData, summary: e.target.value })}
                rows={3}
              />
            </div>

            <div>
              <Label>Skills</Label>
              <div className="flex flex-wrap gap-2 mt-2 mb-3">
                {parsedData.skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="gap-1">
                    {skill}
                    <button
                      onClick={() => handleSkillRemove(skill)}
                      className="ml-1 hover:text-red-600"
                    >
                      ×
                    </button>
                  </Badge>
                ))}
              </div>
              <Input
                placeholder="Add skill and press Enter"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSkillAdd(e.currentTarget.value);
                    e.currentTarget.value = '';
                  }
                }}
              />
            </div>

            <div>
              <Label htmlFor="education">Education</Label>
              <Input
                id="education"
                value={parsedData.education}
                onChange={(e) => setParsedData({ ...parsedData, education: e.target.value })}
              />
            </div>

            <div>
              <Label>Work History</Label>
              <div className="space-y-3 mt-2">
                {parsedData.workHistory.map((job, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <Input
                      value={job.role}
                      onChange={(e) => {
                        const newHistory = [...parsedData.workHistory];
                        newHistory[index].role = e.target.value;
                        setParsedData({ ...parsedData, workHistory: newHistory });
                      }}
                      className="mb-2"
                      placeholder="Job Title"
                    />
                    <div className="grid grid-cols-2 gap-2 mb-2">
                      <Input
                        value={job.company}
                        onChange={(e) => {
                          const newHistory = [...parsedData.workHistory];
                          newHistory[index].company = e.target.value;
                          setParsedData({ ...parsedData, workHistory: newHistory });
                        }}
                        placeholder="Company"
                      />
                      <Input
                        value={job.period}
                        onChange={(e) => {
                          const newHistory = [...parsedData.workHistory];
                          newHistory[index].period = e.target.value;
                          setParsedData({ ...parsedData, workHistory: newHistory });
                        }}
                        placeholder="Period"
                      />
                    </div>
                    <Textarea
                      value={job.description}
                      onChange={(e) => {
                        const newHistory = [...parsedData.workHistory];
                        newHistory[index].description = e.target.value;
                        setParsedData({ ...parsedData, workHistory: newHistory });
                      }}
                      placeholder="Description"
                      rows={2}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Button onClick={handleSubmit} className="flex-1 gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Add to Database
              </Button>
              <Button variant="outline" onClick={() => setCurrentStep('upload')}>
                Start Over
              </Button>
            </div>
          </div>
        )}

        {/* Complete Step */}
        {currentStep === 'complete' && (
          <div className="py-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl mb-2">Candidate Added Successfully!</h3>
            <p className="text-gray-600 mb-6">
              {parsedData.name} has been added to your candidate database.
            </p>
            <div className="flex gap-2 justify-center">
              <Button onClick={() => setCurrentStep('upload')}>
                Parse Another Resume
              </Button>
              {onComplete && (
                <Button variant="outline" onClick={() => onComplete(parsedData)}>
                  View Candidate
                </Button>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

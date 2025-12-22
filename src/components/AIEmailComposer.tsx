import { useState, useEffect } from 'react';
import { 
  Sparkles, Send, Wand2, Copy, RefreshCw, X, Plus, Paperclip, 
  AtSign, FileText, Calendar, Users, Building2, Briefcase, User
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';
import { toast } from 'sonner@2.0.3';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface AIEmailComposerProps {
  mode: 'compose' | 'reply';
  recipientEmail?: string;
  recipientName?: string;
  recipientType?: 'candidate' | 'client' | 'prospect';
  context?: {
    jobTitle?: string;
    candidateTitle?: string;
    companyName?: string;
    previousMessage?: string;
    conversationHistory?: string;
  };
  onSend?: (email: { to: string; subject: string; body: string }) => void;
  onCancel?: () => void;
}

// Email templates for different scenarios
const emailTemplates = {
  candidate: {
    initial_outreach: {
      name: 'Initial Candidate Outreach',
      subject: 'Exciting {jobTitle} Opportunity',
      body: `Hi {candidateName},

I came across your profile and was impressed by your background in {candidateTitle}. I'm currently working with a client who is looking for someone with your exact skill set.

The role is for a {jobTitle} position and offers:
• Competitive compensation package
• Remote work flexibility
• Opportunity to work with cutting-edge technologies
• Strong team culture and growth opportunities

Would you be interested in learning more about this opportunity? I'd love to schedule a brief call to discuss the details.

Looking forward to hearing from you!`
    },
    follow_up: {
      name: 'Candidate Follow-up',
      subject: 'Following up: {jobTitle} Opportunity',
      body: `Hi {candidateName},

I wanted to follow up on my previous email regarding the {jobTitle} position. I understand you're likely busy, but I believe this could be an excellent opportunity for someone with your background.

Are you available for a quick 15-minute call this week to discuss?

Best regards,`
    },
    interview_scheduling: {
      name: 'Interview Scheduling',
      subject: 'Interview Invitation: {jobTitle}',
      body: `Hi {candidateName},

Great news! The client would like to schedule an interview with you for the {jobTitle} position.

Could you please share your availability for this week? The interview will take approximately 45-60 minutes and can be conducted via video call.

Looking forward to your response!`
    },
    offer_notification: {
      name: 'Offer Notification',
      subject: 'Exciting News - Job Offer',
      body: `Hi {candidateName},

I'm thrilled to share that the client would like to extend an offer for the {jobTitle} position!

I'll be sending over the formal offer details shortly. In the meantime, please let me know if you have any questions.

Congratulations!`
    }
  },
  client: {
    candidate_submission: {
      name: 'Candidate Submission',
      subject: 'Candidate Profiles for {jobTitle}',
      body: `Hi {recipientName},

I've prepared a shortlist of exceptional candidates for the {jobTitle} position at {companyName}. Each candidate has been carefully vetted and matches the requirements we discussed.

I'll send their profiles separately for your review. All candidates are:
• Available for interviews within the next week
• Currently employed and looking for the right opportunity
• Strong cultural fit based on our discussions

Please review and let me know your thoughts. I'm happy to schedule interviews at your convenience.`
    },
    client_update: {
      name: 'Client Update',
      subject: 'Update on {jobTitle} Search',
      body: `Hi {recipientName},

I wanted to provide you with an update on our search for the {jobTitle} position.

Current status:
• Candidates reviewed: [Number]
• Qualified candidates identified: [Number]
• Interviews scheduled: [Number]

I'll continue to keep you updated on our progress. Please let me know if you have any questions or if priorities have changed.`
    },
    interview_feedback: {
      name: 'Request Interview Feedback',
      subject: 'Feedback Request: Candidate Interview',
      body: `Hi {recipientName},

Thank you for taking the time to interview the candidates for the {jobTitle} position.

I'd appreciate your feedback on the interviews to help us move forward efficiently. Specifically:
• Overall impressions of each candidate
• Any concerns or red flags
• Next steps you'd like to take

Looking forward to your thoughts!`
    }
  },
  prospect: {
    cold_outreach: {
      name: 'Cold Outreach',
      subject: 'Quick question about {companyName}',
      body: `Hi {recipientName},

I noticed that {companyName} has been growing rapidly in the {industry} space. Congratulations on the recent {milestone}!

I specialize in helping companies like yours build exceptional technical teams. I've successfully placed {number} developers in similar organizations and would love to learn more about your hiring needs.

Would you be open to a brief conversation?`
    },
    follow_up_interested: {
      name: 'Follow-up (Interested)',
      subject: 'Re: {previousSubject}',
      body: `Hi {recipientName},

Thanks for expressing interest! I'd love to learn more about your current hiring needs and how we can help.

When would be a good time for a brief call this week?

Looking forward to connecting!`
    }
  }
};

export function AIEmailComposer({
  mode,
  recipientEmail = '',
  recipientName = '',
  recipientType = 'candidate',
  context = {},
  onSend,
  onCancel
}: AIEmailComposerProps) {
  const [to, setTo] = useState(recipientEmail);
  const [cc, setCc] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [tone, setTone] = useState<'professional' | 'friendly' | 'casual'>('professional');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const generateAIReply = async () => {
    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      let aiResponse = '';
      
      if (context.previousMessage?.toLowerCase().includes('interested')) {
        aiResponse = `Hi ${recipientName},

That's wonderful to hear! I'm glad you're interested in learning more about this opportunity.

The ${context.jobTitle || 'position'} offers excellent growth potential and the chance to work with a fantastic team. The compensation package is competitive and includes comprehensive benefits.

Would you be available for a call this week? I'd love to discuss the role in more detail and answer any questions you might have.

Here are a few times that work for me:
• Tuesday, 2:00 PM - 4:00 PM
• Wednesday, 10:00 AM - 12:00 PM
• Thursday, 3:00 PM - 5:00 PM

Looking forward to our conversation!

Best regards,`;
      } else if (context.previousMessage?.toLowerCase().includes('question')) {
        aiResponse = `Hi ${recipientName},

Thank you for your question! I'd be happy to provide more details.

${context.previousMessage?.includes('remote') ? 'Yes, this position offers full remote flexibility with occasional team meetings.' : ''}
${context.previousMessage?.includes('salary') || context.previousMessage?.toLowerCase().includes('compensation') ? 'The compensation range for this role is competitive and depends on experience level. I\'d be happy to discuss specific numbers on a call.' : ''}
${context.previousMessage?.includes('tech stack') ? 'The tech stack includes React, Node.js, TypeScript, and AWS. The team is also exploring new technologies and values innovation.' : ''}

Do you have any other questions? I'm also happy to schedule a call to discuss in more detail.

Best regards,`;
      } else if (context.previousMessage?.toLowerCase().includes('not interested')) {
        aiResponse = `Hi ${recipientName},

Thank you for taking the time to respond. I completely understand.

If your situation changes in the future or if you know anyone who might be interested in opportunities like this, I'd appreciate you keeping me in mind.

Wishing you all the best in your current role!

Best regards,`;
      } else {
        aiResponse = `Hi ${recipientName},

Thank you for your message!

${context.jobTitle ? `I'd love to discuss the ${context.jobTitle} opportunity with you in more detail.` : 'I appreciate you getting back to me.'}

Would you be available for a brief call this week? I'm flexible with timing and happy to work around your schedule.

Looking forward to connecting!

Best regards,`;
      }

      setBody(aiResponse);
      setSubject(mode === 'reply' ? `Re: ${context.jobTitle || 'Your inquiry'}` : '');
      setIsGenerating(false);
      toast.success('AI draft generated successfully!');
    }, 1500);
  };

  const generateFromTemplate = (templateKey: string) => {
    const templates = emailTemplates[recipientType as keyof typeof emailTemplates];
    const template = templates[templateKey as keyof typeof templates];
    
    if (template) {
      let emailBody = template.body;
      let emailSubject = template.subject;

      // Replace placeholders
      emailBody = emailBody
        .replace(/{candidateName}/g, recipientName || '[Candidate Name]')
        .replace(/{recipientName}/g, recipientName || '[Name]')
        .replace(/{jobTitle}/g, context.jobTitle || '[Job Title]')
        .replace(/{candidateTitle}/g, context.candidateTitle || '[Current Title]')
        .replace(/{companyName}/g, context.companyName || '[Company Name]');

      emailSubject = emailSubject
        .replace(/{jobTitle}/g, context.jobTitle || '[Job Title]')
        .replace(/{companyName}/g, context.companyName || '[Company Name]');

      setBody(emailBody);
      setSubject(emailSubject);
      toast.success('Template applied!');
    }
  };

  const regenerateWithTone = () => {
    setIsGenerating(true);
    
    setTimeout(() => {
      let currentBody = body;
      
      if (tone === 'friendly') {
        currentBody = currentBody.replace('Hi ', 'Hey ');
        currentBody = currentBody.replace('Best regards,', 'Cheers,');
        currentBody = currentBody.replace('Looking forward to', "Can't wait to");
      } else if (tone === 'casual') {
        currentBody = currentBody.replace('Hi ', 'Hey ');
        currentBody = currentBody.replace('Best regards,', 'Thanks!');
        currentBody = currentBody.replace('I would like to', "I'd love to");
      } else {
        currentBody = currentBody.replace('Hey ', 'Hi ');
        currentBody = currentBody.replace(/Cheers,|Thanks!/g, 'Best regards,');
      }
      
      setBody(currentBody);
      setIsGenerating(false);
      toast.success(`Tone adjusted to ${tone}!`);
    }, 1000);
  };

  const handleSend = () => {
    if (!to.trim()) {
      toast.error('Please enter a recipient email');
      return;
    }
    if (!subject.trim()) {
      toast.error('Please enter a subject');
      return;
    }
    if (!body.trim()) {
      toast.error('Please enter a message');
      return;
    }

    onSend?.({ to, subject, body });
    toast.success('Email sent successfully!');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(body);
    toast.success('Email copied to clipboard!');
  };

  // Auto-generate reply on mount if in reply mode
  useEffect(() => {
    if (mode === 'reply' && context.previousMessage) {
      generateAIReply();
    }
  }, [mode]); // Only run when mode changes or on mount

  return (
    <div className="space-y-4">
      {/* Header with AI Indicator */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="text-sm">AI Email Assistant</h3>
            <p className="text-xs text-gray-500">
              {mode === 'reply' ? 'Smart reply generation' : 'Compose with AI assistance'}
            </p>
          </div>
        </div>
        {mode === 'reply' && (
          <Button
            size="sm"
            variant="outline"
            onClick={generateAIReply}
            disabled={isGenerating}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isGenerating ? 'animate-spin' : ''}`} />
            Regenerate
          </Button>
        )}
      </div>

      <Separator />

      {/* Email Form */}
      <div className="space-y-4">
        {/* To Field */}
        <div className="space-y-2">
          <Label>To</Label>
          <div className="flex gap-2">
            <Input
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder="recipient@example.com"
              disabled={mode === 'reply'}
            />
            {recipientType === 'candidate' && (
              <Badge variant="secondary" className="px-3">
                <User className="w-3 h-3 mr-1" />
                Candidate
              </Badge>
            )}
            {recipientType === 'client' && (
              <Badge variant="secondary" className="px-3">
                <Building2 className="w-3 h-3 mr-1" />
                Client
              </Badge>
            )}
            {recipientType === 'prospect' && (
              <Badge variant="secondary" className="px-3">
                <Users className="w-3 h-3 mr-1" />
                Prospect
              </Badge>
            )}
          </div>
        </div>

        {/* Advanced Options */}
        {showAdvanced && (
          <div className="space-y-2">
            <Label>CC</Label>
            <Input
              value={cc}
              onChange={(e) => setCc(e.target.value)}
              placeholder="cc@example.com"
            />
          </div>
        )}

        {/* Subject Field */}
        <div className="space-y-2">
          <Label>Subject</Label>
          <Input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Enter subject line..."
          />
        </div>

        {/* AI Controls */}
        <Tabs defaultValue="compose" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="compose">Compose</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
          </TabsList>
          
          <TabsContent value="compose" className="space-y-3 mt-4">
            {/* Tone Selector */}
            <div className="flex items-center gap-3">
              <Label className="text-xs text-gray-600">Tone:</Label>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant={tone === 'professional' ? 'default' : 'outline'}
                  onClick={() => setTone('professional')}
                  className="h-8 text-xs"
                >
                  Professional
                </Button>
                <Button
                  size="sm"
                  variant={tone === 'friendly' ? 'default' : 'outline'}
                  onClick={() => setTone('friendly')}
                  className="h-8 text-xs"
                >
                  Friendly
                </Button>
                <Button
                  size="sm"
                  variant={tone === 'casual' ? 'default' : 'outline'}
                  onClick={() => setTone('casual')}
                  className="h-8 text-xs"
                >
                  Casual
                </Button>
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={regenerateWithTone}
                className="h-8 text-xs ml-auto"
              >
                <Wand2 className="w-3 h-3 mr-1" />
                Apply Tone
              </Button>
            </div>

            {/* Quick AI Actions */}
            {mode === 'compose' && (
              <div className="flex gap-2 flex-wrap">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={generateAIReply}
                  disabled={isGenerating}
                  className="h-8 text-xs"
                >
                  <Sparkles className="w-3 h-3 mr-1" />
                  Generate Draft
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    const improved = body + "\n\nP.S. I'd be happy to answer any questions you might have!";
                    setBody(improved);
                    toast.success('Added call-to-action!');
                  }}
                  className="h-8 text-xs"
                >
                  <Plus className="w-3 h-3 mr-1" />
                  Add CTA
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="templates" className="mt-4">
            <div className="space-y-2">
              <Label className="text-xs text-gray-600">Quick Templates:</Label>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(emailTemplates[recipientType as keyof typeof emailTemplates] || {}).map(([key, template]) => (
                  <Button
                    key={key}
                    size="sm"
                    variant="outline"
                    onClick={() => generateFromTemplate(key)}
                    className="h-auto py-2 text-xs justify-start"
                  >
                    <FileText className="w-3 h-3 mr-2 flex-shrink-0" />
                    <span className="text-left truncate">{template.name}</span>
                  </Button>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Message Body */}
        <div className="space-y-2">
          <Label>Message</Label>
          <Textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder={isGenerating ? "AI is generating your email..." : "Type your message or use AI to generate..."}
            rows={12}
            disabled={isGenerating}
            className="font-mono text-sm"
          />
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>{body.length} characters</span>
            {isGenerating && (
              <span className="flex items-center gap-2 text-purple-600">
                <Sparkles className="w-3 h-3 animate-pulse" />
                Generating with AI...
              </span>
            )}
          </div>
        </div>

        {/* AI Suggestions */}
        {body && !isGenerating && (
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="pt-4">
              <div className="flex items-start gap-3">
                <Sparkles className="w-4 h-4 text-blue-600 mt-0.5" />
                <div className="flex-1">
                  <p className="text-xs mb-2">AI Suggestions:</p>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setBody(body + '\n\nBest regards,\n[Your Name]');
                        toast.success('Signature added!');
                      }}
                      className="h-7 text-xs"
                    >
                      Add Signature
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        const shortened = body.split('\n').slice(0, 8).join('\n') + '\n\nLooking forward to your response!';
                        setBody(shortened);
                        toast.success('Email shortened!');
                      }}
                      className="h-7 text-xs"
                    >
                      Make Shorter
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setBody(body.replace(/\n\n/g, '\n\n• '));
                        toast.success('Added bullet points!');
                      }}
                      className="h-7 text-xs"
                    >
                      Add Bullets
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-4 border-t">
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setShowAdvanced(!showAdvanced)}
          >
            {showAdvanced ? 'Hide' : 'Show'} Advanced Options
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={copyToClipboard}
            disabled={!body}
          >
            <Copy className="w-4 h-4 mr-2" />
            Copy
          </Button>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={handleSend} disabled={isGenerating}>
            <Send className="w-4 h-4 mr-2" />
            Send Email
          </Button>
        </div>
      </div>
    </div>
  );
}

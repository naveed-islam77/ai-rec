import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Textarea } from './ui/textarea';
import { 
  Sparkles, 
  User, 
  Briefcase, 
  MapPin, 
  Calendar,
  Mail,
  Building,
  Award,
  Code,
  Copy,
  Eye,
  Wand2
} from 'lucide-react';
import { toast } from 'sonner';

export default function NurturePersonalization() {
  const [selectedToken, setSelectedToken] = useState<string | null>(null);
  const [testEmail, setTestEmail] = useState('');

  const tokenCategories = [
    {
      name: 'Personal Info',
      icon: User,
      color: 'text-blue-600',
      tokens: [
        { key: '{{firstName}}', description: 'Candidate first name', example: 'John' },
        { key: '{{lastName}}', description: 'Candidate last name', example: 'Smith' },
        { key: '{{fullName}}', description: 'Full name', example: 'John Smith' },
        { key: '{{email}}', description: 'Email address', example: 'john@example.com' },
        { key: '{{phone}}', description: 'Phone number', example: '+1 555-0123' }
      ]
    },
    {
      name: 'Professional',
      icon: Briefcase,
      color: 'text-purple-600',
      tokens: [
        { key: '{{role}}', description: 'Current or target role', example: 'Senior React Developer' },
        { key: '{{currentCompany}}', description: 'Current employer', example: 'TechCorp Inc' },
        { key: '{{yearsExperience}}', description: 'Years of experience', example: '5' },
        { key: '{{title}}', description: 'Job title', example: 'Software Engineer' },
        { key: '{{seniority}}', description: 'Experience level', example: 'Senior' }
      ]
    },
    {
      name: 'Skills & Expertise',
      icon: Code,
      color: 'text-green-600',
      tokens: [
        { key: '{{topSkills}}', description: 'Top 3 skills', example: 'React, TypeScript, Node.js' },
        { key: '{{allSkills}}', description: 'All listed skills', example: 'React, TypeScript, Node.js, AWS, Docker' },
        { key: '{{primarySkill}}', description: 'Main skill', example: 'React' },
        { key: '{{certifications}}', description: 'Professional certifications', example: 'AWS Certified Developer' }
      ]
    },
    {
      name: 'Location & Preferences',
      icon: MapPin,
      color: 'text-orange-600',
      tokens: [
        { key: '{{location}}', description: 'Current location', example: 'New York, NY' },
        { key: '{{city}}', description: 'City only', example: 'New York' },
        { key: '{{state}}', description: 'State only', example: 'NY' },
        { key: '{{timezone}}', description: 'Time zone', example: 'EST' },
        { key: '{{preferredLocation}}', description: 'Desired location', example: 'Remote or NYC' }
      ]
    },
    {
      name: 'Engagement History',
      icon: Calendar,
      color: 'text-red-600',
      tokens: [
        { key: '{{lastContact}}', description: 'Days since last contact', example: '14' },
        { key: '{{lastContactDate}}', description: 'Date of last contact', example: 'Oct 15, 2024' },
        { key: '{{emailsOpened}}', description: 'Emails opened (30d)', example: '7' },
        { key: '{{engagementScore}}', description: 'Engagement score 0-100', example: '73' },
        { key: '{{source}}', description: 'How they were sourced', example: 'LinkedIn' }
      ]
    },
    {
      name: 'Job Matching',
      icon: Award,
      color: 'text-cyan-600',
      tokens: [
        { key: '{{matchingJobs}}', description: 'Number of matching jobs', example: '3' },
        { key: '{{topMatchTitle}}', description: 'Best matching job title', example: 'Senior React Developer' },
        { key: '{{topMatchCompany}}', description: 'Best match company', example: 'Startup XYZ' },
        { key: '{{topMatchSalary}}', description: 'Salary range', example: '$120k-$160k' },
        { key: '{{topMatchLocation}}', description: 'Job location', example: 'San Francisco, CA' }
      ]
    },
    {
      name: 'Recruiter & Company',
      icon: Building,
      color: 'text-indigo-600',
      tokens: [
        { key: '{{recruiterName}}', description: 'Your name', example: 'Sarah Johnson' },
        { key: '{{recruiterTitle}}', description: 'Your title', example: 'Senior Technical Recruiter' },
        { key: '{{recruiterEmail}}', description: 'Your email', example: 'sarah@company.com' },
        { key: '{{companyName}}', description: 'Your company name', example: 'Elite Talent Partners' },
        { key: '{{recruiterPhone}}', description: 'Your phone', example: '+1 555-0199' }
      ]
    }
  ];

  const conditionalBlocks = [
    {
      name: 'Experience Level',
      code: `{{#if yearsExperience > 5}}
  As a senior professional with {{yearsExperience}} years of experience...
{{else}}
  With your {{yearsExperience}} years of experience...
{{/if}}`,
      description: 'Show different content based on experience'
    },
    {
      name: 'Location Based',
      code: `{{#if location contains "Remote"}}
  I see you're open to remote work...
{{else}}
  For professionals in {{city}}...
{{/if}}`,
      description: 'Customize by location preference'
    },
    {
      name: 'Engagement Level',
      code: `{{#if engagementScore > 70}}
  I've noticed you've been highly engaged...
{{else if engagementScore > 40}}
  Thanks for staying connected...
{{else}}
  It's been a while since we connected...
{{/if}}`,
      description: 'Adapt message to engagement'
    },
    {
      name: 'Has Matching Jobs',
      code: `{{#if matchingJobs > 0}}
  I found {{matchingJobs}} opportunities that match your profile:
  • {{topMatchTitle}} at {{topMatchCompany}}
{{else}}
  I'm keeping an eye out for opportunities that match your background...
{{/if}}`,
      description: 'Only show jobs if available'
    }
  ];

  const exampleTemplates = [
    {
      name: 'Personalized Welcome',
      before: `Hi,

Welcome! We're excited to work with you.

Best,
Recruiter`,
      after: `Hi {{firstName}},

Welcome to {{companyName}}! We're excited to work with you.

I noticed you have {{yearsExperience}} years of experience as a {{role}} in {{city}}. With your background in {{topSkills}}, I think we can find some amazing opportunities for you.

Best,
{{recruiterName}}
{{recruiterTitle}}`
    },
    {
      name: 'Job Match Email',
      before: `Hi,

I have a job that might interest you.

Let me know if you want to learn more.`,
      after: `Hi {{firstName}},

I found a role that's perfect for your background in {{primarySkill}}:

📋 {{topMatchTitle}} at {{topMatchCompany}}
📍 {{topMatchLocation}}
💰 {{topMatchSalary}}

{{#if yearsExperience > 5}}
They're specifically looking for senior talent like yourself with {{yearsExperience}}+ years of experience.
{{else}}
This is a great opportunity for someone with your {{yearsExperience}} years of experience.
{{/if}}

Interested? Just reply and I'll send full details.

Best,
{{recruiterName}}`
    }
  ];

  const copyToken = (token: string) => {
    navigator.clipboard.writeText(token);
    toast.success('Token copied to clipboard');
  };

  const generateAIContent = () => {
    toast.success('AI content generated! (Demo feature)');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-purple-600" />
            Personalization Engine
          </h2>
          <p className="text-muted-foreground">
            Dynamic content and smart tokens for personalized emails
          </p>
        </div>
        <Button onClick={generateAIContent}>
          <Wand2 className="w-4 h-4 mr-2" />
          Generate with AI
        </Button>
      </div>

      <Tabs defaultValue="tokens">
        <TabsList>
          <TabsTrigger value="tokens">Tokens Library</TabsTrigger>
          <TabsTrigger value="conditional">Conditional Logic</TabsTrigger>
          <TabsTrigger value="examples">Examples</TabsTrigger>
          <TabsTrigger value="test">Test Personalization</TabsTrigger>
        </TabsList>

        {/* Tokens Tab */}
        <TabsContent value="tokens" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Available Tokens</CardTitle>
              <CardDescription>
                Click any token to copy it to your clipboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {tokenCategories.map((category, categoryIndex) => {
                  const Icon = category.icon;
                  return (
                    <div key={categoryIndex}>
                      <h3 className="flex items-center gap-2 mb-3">
                        <Icon className={`w-5 h-5 ${category.color}`} />
                        {category.name}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {category.tokens.map((token, tokenIndex) => (
                          <div
                            key={tokenIndex}
                            className="border rounded-lg p-3 hover:bg-accent cursor-pointer transition-colors"
                            onClick={() => copyToken(token.key)}
                          >
                            <div className="flex items-start justify-between mb-1">
                              <code className="text-sm font-mono text-purple-600">
                                {token.key}
                              </code>
                              <Copy className="w-3 h-3 text-muted-foreground" />
                            </div>
                            <p className="text-xs text-muted-foreground mb-1">
                              {token.description}
                            </p>
                            <p className="text-xs">
                              Example: <span className="font-medium">{token.example}</span>
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Conditional Logic Tab */}
        <TabsContent value="conditional" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Conditional Content Blocks</CardTitle>
              <CardDescription>
                Show different content based on candidate attributes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {conditionalBlocks.map((block, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{block.name}</h4>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          copyToken(block.code);
                        }}
                      >
                        <Copy className="w-3 h-3 mr-1" />
                        Copy
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {block.description}
                    </p>
                    <pre className="bg-gray-100 rounded p-3 text-xs overflow-x-auto">
                      <code>{block.code}</code>
                    </pre>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">How to use conditional blocks</h4>
                <ul className="text-sm text-blue-700 space-y-1 list-disc list-inside">
                  <li>Use <code className="bg-blue-100 px-1 rounded">{'{{#if condition}}'}</code> to start a condition</li>
                  <li>Use <code className="bg-blue-100 px-1 rounded">{'{{else}}'}</code> for alternative content</li>
                  <li>Use <code className="bg-blue-100 px-1 rounded">{'{{/if}}'}</code> to close the condition</li>
                  <li>Supports: &gt;, &lt;, =, contains, not contains</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Examples Tab */}
        <TabsContent value="examples" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Before & After Examples</CardTitle>
              <CardDescription>
                See how personalization transforms your emails
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {exampleTemplates.map((example, index) => (
                  <div key={index}>
                    <h3 className="font-semibold mb-3">{example.name}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="secondary">Before</Badge>
                          <span className="text-sm text-muted-foreground">Generic</span>
                        </div>
                        <div className="border rounded-lg p-4 bg-gray-50">
                          <pre className="text-sm whitespace-pre-wrap">{example.before}</pre>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className="bg-green-600">After</Badge>
                          <span className="text-sm text-muted-foreground">Personalized</span>
                        </div>
                        <div className="border rounded-lg p-4 bg-green-50 border-green-200">
                          <pre className="text-sm whitespace-pre-wrap font-mono">{example.after}</pre>
                        </div>
                      </div>
                    </div>
                    {index < exampleTemplates.length - 1 && <div className="h-px bg-border my-6" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Test Tab */}
        <TabsContent value="test" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Test Your Personalization</CardTitle>
              <CardDescription>
                Preview how your email will look with real candidate data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Email Template with Tokens</Label>
                <Textarea
                  placeholder="Hi {{firstName}},&#10;&#10;I noticed you have {{yearsExperience}} years of experience as a {{role}}..."
                  rows={8}
                  value={testEmail}
                  onChange={(e) => setTestEmail(e.target.value)}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Use any tokens from the library above
                </p>
              </div>

              <Button className="w-full">
                <Eye className="w-4 h-4 mr-2" />
                Preview with Sample Data
              </Button>

              <div className="border rounded-lg p-4 bg-accent">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                  Preview Output
                </h4>
                <div className="bg-white border rounded p-4">
                  {testEmail ? (
                    <pre className="text-sm whitespace-pre-wrap">
                      {testEmail
                        .replace(/\{\{firstName\}\}/g, 'John')
                        .replace(/\{\{lastName\}\}/g, 'Smith')
                        .replace(/\{\{role\}\}/g, 'Senior React Developer')
                        .replace(/\{\{yearsExperience\}\}/g, '5')
                        .replace(/\{\{topSkills\}\}/g, 'React, TypeScript, Node.js')
                        .replace(/\{\{location\}\}/g, 'New York, NY')
                        .replace(/\{\{recruiterName\}\}/g, 'Sarah Johnson')
                        .replace(/\{\{companyName\}\}/g, 'Elite Talent Partners')}
                    </pre>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      Enter a template above to see the preview
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

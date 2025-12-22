import { useState } from 'react';
import { HelpCircle, X, Linkedin, Github, Globe, Search, Sparkles, TrendingUp, CheckCircle2 } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

export function SourcingHelpCard() {
  const [showHelp, setShowHelp] = useState(false);

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setShowHelp(true)}
        className="fixed bottom-6 right-6 shadow-lg z-50"
      >
        <HelpCircle className="w-4 h-4 mr-2" />
        How It Works
      </Button>

      <Dialog open={showHelp} onOpenChange={setShowHelp}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-600" />
              How AI Sourcing Works
            </DialogTitle>
            <DialogDescription>
              Learn how to find and import candidates from LinkedIn, GitHub, and other platforms
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="quick-start" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="quick-start">Quick Start</TabsTrigger>
              <TabsTrigger value="platforms">Platforms</TabsTrigger>
              <TabsTrigger value="examples">Examples</TabsTrigger>
              <TabsTrigger value="tips">Pro Tips</TabsTrigger>
            </TabsList>

            <TabsContent value="quick-start" className="space-y-4">
              <Card className="p-4 bg-blue-50 border-blue-200">
                <h3 className="text-sm mb-3">🚀 5-Step Quick Start</h3>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">1</div>
                    <div>
                      <p className="text-sm">Describe your ideal candidate</p>
                      <p className="text-xs text-gray-600 mt-1">
                        "Senior React developer in NYC with 5+ years TypeScript"
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">2</div>
                    <div>
                      <p className="text-sm">Generate boolean query with AI</p>
                      <p className="text-xs text-gray-600 mt-1">
                        AI converts to: (React OR ReactJS) AND TypeScript AND "NYC"
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">3</div>
                    <div>
                      <p className="text-sm">Select platforms (LinkedIn, GitHub, etc.)</p>
                      <p className="text-xs text-gray-600 mt-1">
                        Recommended: LinkedIn + GitHub for tech roles
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">4</div>
                    <div>
                      <p className="text-sm">Review results with AI match scores</p>
                      <p className="text-xs text-gray-600 mt-1">
                        Focus on 85%+ matches for best results
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">5</div>
                    <div>
                      <p className="text-sm">Enrich contact data & import</p>
                      <p className="text-xs text-gray-600 mt-1">
                        AI finds emails, phones, and social profiles
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <h3 className="text-sm mb-3">🎯 What You Can Do</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                    <div className="text-xs">
                      <p className="font-medium">Multi-Platform Search</p>
                      <p className="text-gray-600">LinkedIn, GitHub, Indeed, Stack Overflow</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                    <div className="text-xs">
                      <p className="font-medium">AI Match Scoring</p>
                      <p className="text-gray-600">0-100% relevance scores</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                    <div className="text-xs">
                      <p className="font-medium">Contact Enrichment</p>
                      <p className="text-gray-600">Auto-find emails & phones</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                    <div className="text-xs">
                      <p className="font-medium">Saved Searches</p>
                      <p className="text-gray-600">Automate with scheduling</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                    <div className="text-xs">
                      <p className="font-medium">Analytics Dashboard</p>
                      <p className="text-gray-600">Track performance metrics</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                    <div className="text-xs">
                      <p className="font-medium">Bulk Import</p>
                      <p className="text-gray-600">Add multiple candidates at once</p>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="platforms" className="space-y-4">
              <div className="space-y-3">
                <Card className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-blue-500 rounded flex items-center justify-center">
                      <Linkedin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-sm">LinkedIn</h3>
                      <Badge variant="secondary" className="text-xs">~12% response rate</Badge>
                    </div>
                  </div>
                  <div className="text-xs space-y-2">
                    <p className="text-gray-600">
                      <strong>Best for:</strong> Corporate employees, traditional roles, professional network
                    </p>
                    <p className="text-gray-600">
                      <strong>Strengths:</strong> Complete work history, connections, recommendations
                    </p>
                    <p className="text-gray-600">
                      <strong>Use when:</strong> Hiring for established companies, need verified experience
                    </p>
                  </div>
                </Card>

                <Card className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-gray-800 rounded flex items-center justify-center">
                      <Github className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-sm">GitHub</h3>
                      <Badge className="bg-green-500 text-xs">~18% response rate (Highest!)</Badge>
                    </div>
                  </div>
                  <div className="text-xs space-y-2">
                    <p className="text-gray-600">
                      <strong>Best for:</strong> Software engineers, developers, technical roles
                    </p>
                    <p className="text-gray-600">
                      <strong>Strengths:</strong> Code samples, open source contributions, technical proof
                    </p>
                    <p className="text-gray-600">
                      <strong>Use when:</strong> Hiring developers, need to verify coding skills
                    </p>
                  </div>
                </Card>

                <Card className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-blue-700 rounded flex items-center justify-center">
                      <Globe className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-sm">Indeed</h3>
                      <Badge variant="secondary" className="text-xs">~9% response rate</Badge>
                    </div>
                  </div>
                  <div className="text-xs space-y-2">
                    <p className="text-gray-600">
                      <strong>Best for:</strong> Active job seekers, quick fills
                    </p>
                    <p className="text-gray-600">
                      <strong>Strengths:</strong> Recent resumes, availability signals, ready to move
                    </p>
                    <p className="text-gray-600">
                      <strong>Use when:</strong> Urgent hires, entry to mid-level positions
                    </p>
                  </div>
                </Card>

                <Card className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-orange-500 rounded flex items-center justify-center">
                      <Globe className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-sm">Stack Overflow</h3>
                      <Badge variant="secondary" className="text-xs">~7% response rate</Badge>
                    </div>
                  </div>
                  <div className="text-xs space-y-2">
                    <p className="text-gray-600">
                      <strong>Best for:</strong> Active developers, specialized tech stacks
                    </p>
                    <p className="text-gray-600">
                      <strong>Strengths:</strong> Technical reputation, problem-solving ability
                    </p>
                    <p className="text-gray-600">
                      <strong>Use when:</strong> Niche technologies, need proven technical skills
                    </p>
                  </div>
                </Card>
              </div>

              <Card className="p-4 bg-purple-50 border-purple-200">
                <h3 className="text-sm mb-2">💡 Platform Combinations</h3>
                <div className="text-xs space-y-2">
                  <p><strong>For Tech Roles:</strong> LinkedIn + GitHub</p>
                  <p><strong>For Quick Fills:</strong> LinkedIn + Indeed</p>
                  <p><strong>For Specialized Tech:</strong> GitHub + Stack Overflow</p>
                  <p><strong>For Business Roles:</strong> LinkedIn + Indeed</p>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="examples" className="space-y-4">
              <Card className="p-4">
                <h3 className="text-sm mb-3">Example Search #1: Senior Engineer</h3>
                <div className="space-y-2 text-xs">
                  <div className="p-2 bg-gray-50 rounded">
                    <strong>Input:</strong> "Senior React developer in New York with 5+ years TypeScript experience"
                  </div>
                  <div className="p-2 bg-blue-50 rounded">
                    <strong>AI Query:</strong> (React OR ReactJS) AND (TypeScript OR TS) AND "New York" AND experience:5+
                  </div>
                  <div className="p-2 bg-green-50 rounded">
                    <strong>Platforms:</strong> LinkedIn + GitHub
                  </div>
                  <div className="p-2 bg-purple-50 rounded">
                    <strong>Expected Results:</strong> ~30 candidates, 8-10 with 90%+ match
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <h3 className="text-sm mb-3">Example Search #2: Backend Engineer</h3>
                <div className="space-y-2 text-xs">
                  <div className="p-2 bg-gray-50 rounded">
                    <strong>Input:</strong> "Backend engineer with Python and AWS in San Francisco, 3+ years"
                  </div>
                  <div className="p-2 bg-blue-50 rounded">
                    <strong>AI Query:</strong> (Backend OR "Back-end") AND Python AND AWS AND "San Francisco" AND experience:3+
                  </div>
                  <div className="p-2 bg-green-50 rounded">
                    <strong>Platforms:</strong> GitHub + Stack Overflow
                  </div>
                  <div className="p-2 bg-purple-50 rounded">
                    <strong>Expected Results:</strong> ~25 candidates, 6-8 with 85%+ match
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <h3 className="text-sm mb-3">Example Search #3: Full Stack (Remote)</h3>
                <div className="space-y-2 text-xs">
                  <div className="p-2 bg-gray-50 rounded">
                    <strong>Input:</strong> "Full stack developer with React and Node.js, remote, 4+ years"
                  </div>
                  <div className="p-2 bg-blue-50 rounded">
                    <strong>AI Query:</strong> "Full stack" AND React AND (Node.js OR NodeJS) AND remote AND experience:4+
                  </div>
                  <div className="p-2 bg-green-50 rounded">
                    <strong>Platforms:</strong> LinkedIn + GitHub + Indeed
                  </div>
                  <div className="p-2 bg-purple-50 rounded">
                    <strong>Expected Results:</strong> ~50 candidates, 12-15 with 85%+ match
                  </div>
                </div>
              </Card>

              <Card className="p-4 bg-yellow-50 border-yellow-200">
                <h3 className="text-sm mb-2">⚠️ Common Mistakes to Avoid</h3>
                <div className="space-y-1 text-xs">
                  <p>❌ Too specific: "React developer with Redux, GraphQL, TypeScript, AWS, Docker in NYC with exactly 5 years"</p>
                  <p>❌ Too vague: "developer"</p>
                  <p>❌ Wrong platform: Searching Indeed for senior engineers (use LinkedIn/GitHub)</p>
                  <p>❌ Not enriching: Importing without getting contact info</p>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="tips" className="space-y-4">
              <Card className="p-4 bg-green-50 border-green-200">
                <h3 className="text-sm mb-3">✅ Search Best Practices</h3>
                <div className="space-y-2 text-xs">
                  <p>• Start broad, then narrow based on results</p>
                  <p>• Use OR for technology variations: (React OR ReactJS OR React.js)</p>
                  <p>• Quote exact phrases: "Senior Developer"</p>
                  <p>• Select 2-3 platforms, not all 4</p>
                  <p>• Save searches that work well</p>
                </div>
              </Card>

              <Card className="p-4 bg-blue-50 border-blue-200">
                <h3 className="text-sm mb-3">🎯 Match Score Guide</h3>
                <div className="space-y-2 text-xs">
                  <p><strong>90-100%:</strong> 🟢 Excellent - Top priority, import immediately</p>
                  <p><strong>80-89%:</strong> 🔵 Good - Strong candidates, worth reaching out</p>
                  <p><strong>70-79%:</strong> 🟡 Fair - Review carefully, may be worth it</p>
                  <p><strong>Below 70%:</strong> ⚪ Skip unless desperate</p>
                </div>
              </Card>

              <Card className="p-4 bg-purple-50 border-purple-200">
                <h3 className="text-sm mb-3">💡 Enrichment Tips</h3>
                <div className="space-y-2 text-xs">
                  <p>• Enrich before importing (get complete data upfront)</p>
                  <p>• Check confidence scores (95%+ is very reliable)</p>
                  <p>• Verify email format makes sense</p>
                  <p>• LinkedIn URLs are usually most accurate</p>
                  <p>• Some candidates have privacy settings (that's OK)</p>
                </div>
              </Card>

              <Card className="p-4 bg-orange-50 border-orange-200">
                <h3 className="text-sm mb-3">⚡ Time Savers</h3>
                <div className="space-y-2 text-xs">
                  <p>• Use bulk import for multiple candidates</p>
                  <p>• Enable auto-run on successful searches</p>
                  <p>• Build a library of 5-10 saved searches</p>
                  <p>• Review analytics weekly to optimize</p>
                  <p>• Set up daily searches for hot roles</p>
                </div>
              </Card>

              <Card className="p-4 bg-red-50 border-red-200">
                <h3 className="text-sm mb-3">⚠️ Quality Over Quantity</h3>
                <div className="space-y-2 text-xs">
                  <p>• Don't import all results blindly</p>
                  <p>• Focus on 85%+ match scores</p>
                  <p>• Personalize outreach messages</p>
                  <p>• Follow up within 24 hours</p>
                  <p>• Track what works in analytics</p>
                </div>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex gap-3 pt-4 border-t">
            <Button variant="outline" onClick={() => setShowHelp(false)} className="flex-1">
              Close
            </Button>
            <Button 
              onClick={() => {
                setShowHelp(false);
                window.open('/HOW_AI_SOURCING_WORKS.md', '_blank');
              }}
              className="flex-1"
            >
              Read Full Guide
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

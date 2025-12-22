import { useState } from 'react';
import { Chrome, Download, CheckCircle2, Linkedin, Github, Globe, Users, Zap, ExternalLink, Copy, AlertCircle } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Alert, AlertDescription } from './ui/alert';
import { toast } from 'sonner';

export function ChromeExtensionPanel() {
  const [extensionInstalled, setExtensionInstalled] = useState(false);
  const [recentSources, setRecentSources] = useState([
    { platform: 'LinkedIn', count: 12, time: '2 hours ago' },
    { platform: 'GitHub', count: 8, time: '5 hours ago' },
    { platform: 'AngelList', count: 5, time: '1 day ago' },
  ]);

  const handleInstallExtension = () => {
    toast.info('Chrome Extension would open in new tab');
    // In production: window.open('chrome-web-store-url', '_blank');
    setTimeout(() => {
      setExtensionInstalled(true);
      toast.success('Extension installed! Refresh LinkedIn, GitHub, or AngelList to start sourcing.');
    }, 2000);
  };

  const handleCopyBookmarklet = () => {
    const bookmarklet = `javascript:(function(){window.postMessage({type:'AI_RECRUIT_SCRAPE',source:window.location.href},'*');})();`;
    navigator.clipboard.writeText(bookmarklet);
    toast.success('Bookmarklet copied! Drag to bookmarks bar.');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl flex items-center gap-2 mb-2">
          <Chrome className="w-6 h-6 text-blue-600" />
          Chrome Extension - One-Click Sourcing
        </h2>
        <p className="text-sm text-gray-600">
          Source candidates directly from LinkedIn, GitHub, AngelList, and more with a single click
        </p>
      </div>

      {/* Installation Status */}
      <Card className={`p-4 ${extensionInstalled ? 'bg-green-50 border-green-200' : 'bg-blue-50 border-blue-200'}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {extensionInstalled ? (
              <>
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm">Extension Installed</p>
                  <p className="text-xs text-gray-600">Ready to source candidates</p>
                </div>
              </>
            ) : (
              <>
                <AlertCircle className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm">Extension Not Installed</p>
                  <p className="text-xs text-gray-600">Install to enable one-click sourcing</p>
                </div>
              </>
            )}
          </div>
          {!extensionInstalled && (
            <Button onClick={handleInstallExtension} size="sm">
              <Download className="w-4 h-4 mr-2" />
              Install Extension
            </Button>
          )}
        </div>
      </Card>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="platforms">Platforms</TabsTrigger>
          <TabsTrigger value="setup">Setup</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card className="p-4">
            <h3 className="text-sm mb-3">🚀 What You Can Do</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-start gap-2">
                <Zap className="w-4 h-4 text-yellow-500 mt-0.5" />
                <div className="text-xs">
                  <p className="font-medium">One-Click Import</p>
                  <p className="text-gray-600">Click extension icon on any profile</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Users className="w-4 h-4 text-blue-500 mt-0.5" />
                <div className="text-xs">
                  <p className="font-medium">Bulk Scraping</p>
                  <p className="text-gray-600">Import entire search results</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                <div className="text-xs">
                  <p className="font-medium">Auto-Enrichment</p>
                  <p className="text-gray-600">Emails & phones found automatically</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Globe className="w-4 h-4 text-purple-500 mt-0.5" />
                <div className="text-xs">
                  <p className="font-medium">Multi-Platform</p>
                  <p className="text-gray-600">Works on 20+ sourcing sites</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <h3 className="text-sm mb-3">📊 Extension Stats</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl text-blue-600">247</div>
                <div className="text-xs text-gray-600">Candidates Sourced</div>
                <div className="text-xs text-green-600">+23% this month</div>
              </div>
              <div className="text-center">
                <div className="text-2xl text-purple-600">18</div>
                <div className="text-xs text-gray-600">Avg. Time (sec)</div>
                <div className="text-xs text-green-600">3x faster</div>
              </div>
              <div className="text-center">
                <div className="text-2xl text-green-600">94%</div>
                <div className="text-xs text-gray-600">Enrichment Rate</div>
                <div className="text-xs text-gray-600">vs 67% manual</div>
              </div>
            </div>
          </Card>

          <Alert>
            <AlertCircle className="w-4 h-4" />
            <AlertDescription className="text-xs">
              <strong>Privacy Note:</strong> The extension only accesses publicly visible profile information.
              No login credentials are stored. All data is processed locally and sent securely to your AI Recruit account.
            </AlertDescription>
          </Alert>
        </TabsContent>

        <TabsContent value="platforms" className="space-y-3">
          {[
            { name: 'LinkedIn', icon: Linkedin, color: 'bg-blue-500', supported: true, features: ['Profile scraping', 'Search results', 'Company pages', 'Sales Navigator'] },
            { name: 'GitHub', icon: Github, color: 'bg-gray-800', supported: true, features: ['Developer profiles', 'Repos & contributions', 'Follower lists', 'Organization members'] },
            { name: 'AngelList', icon: Globe, color: 'bg-black', supported: true, features: ['Startup talent', 'Company profiles', 'Job seekers', 'Investors'] },
            { name: 'Indeed', icon: Globe, color: 'bg-blue-700', supported: true, features: ['Resume database', 'Job applicants', 'Search results', 'Profile pages'] },
            { name: 'Stack Overflow', icon: Globe, color: 'bg-orange-500', supported: true, features: ['Developer profiles', 'Q&A activity', 'Reputation scores', 'Tags & skills'] },
            { name: 'Hired.com', icon: Globe, color: 'bg-purple-600', supported: true, features: ['Candidate profiles', 'Active job seekers', 'Skills verification'] },
            { name: 'Dice', icon: Globe, color: 'bg-red-600', supported: true, features: ['Tech talent', 'Resume database', 'Active candidates'] },
            { name: 'Glassdoor', icon: Globe, color: 'bg-green-600', supported: true, features: ['Employee profiles', 'Company reviews', 'Salary data'] },
            { name: 'Twitter/X', icon: Globe, color: 'bg-blue-400', supported: true, features: ['Tech influencers', 'Developer bios', 'Profile links'] },
            { name: 'Behance', icon: Globe, color: 'bg-blue-600', supported: true, features: ['Designer profiles', 'Portfolio work', 'Creative talent'] },
            { name: 'Dribbble', icon: Globe, color: 'bg-pink-500', supported: true, features: ['Design work', 'Creative profiles', 'Freelancers'] },
            { name: 'ProductHunt', icon: Globe, color: 'bg-orange-600', supported: true, features: ['Maker profiles', 'Product creators', 'Startup founders'] },
          ].map((platform) => (
            <Card key={platform.name} className="p-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 ${platform.color} rounded flex items-center justify-center`}>
                    <platform.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm">{platform.name}</p>
                    <p className="text-xs text-gray-600">{platform.features.length} features</p>
                  </div>
                </div>
                <Badge className={platform.supported ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}>
                  {platform.supported ? 'Supported' : 'Coming Soon'}
                </Badge>
              </div>
              <div className="flex flex-wrap gap-1">
                {platform.features.map((feature, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs">
                    {feature}
                  </Badge>
                ))}
              </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="setup" className="space-y-4">
          <Card className="p-4">
            <h3 className="text-sm mb-3">Method 1: Chrome Extension (Recommended)</h3>
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">1</div>
                <div className="text-xs">
                  <p className="font-medium">Install Extension</p>
                  <p className="text-gray-600 mb-2">Click "Install Extension" button above</p>
                  <Button size="sm" onClick={handleInstallExtension} disabled={extensionInstalled}>
                    <Chrome className="w-4 h-4 mr-2" />
                    {extensionInstalled ? 'Installed' : 'Install Now'}
                  </Button>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">2</div>
                <div className="text-xs">
                  <p className="font-medium">Visit Supported Platform</p>
                  <p className="text-gray-600 mb-2">Go to LinkedIn, GitHub, AngelList, etc.</p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => window.open('https://linkedin.com', '_blank')}>
                      <ExternalLink className="w-3 h-3 mr-1" />
                      LinkedIn
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => window.open('https://github.com', '_blank')}>
                      <ExternalLink className="w-3 h-3 mr-1" />
                      GitHub
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">3</div>
                <div className="text-xs">
                  <p className="font-medium">Click Extension Icon</p>
                  <p className="text-gray-600">Look for AI Recruit icon in Chrome toolbar</p>
                  <p className="text-gray-600 mt-1">💡 On profile page: Import single candidate</p>
                  <p className="text-gray-600">💡 On search results: Bulk import entire page</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">4</div>
                <div className="text-xs">
                  <p className="font-medium">Review & Import</p>
                  <p className="text-gray-600">Candidates auto-enriched and added to your pipeline</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <h3 className="text-sm mb-3">Method 2: Bookmarklet (Alternative)</h3>
            <p className="text-xs text-gray-600 mb-3">
              For browsers that don't support extensions, use our bookmarklet
            </p>
            <div className="space-y-2">
              <Button size="sm" variant="outline" onClick={handleCopyBookmarklet} className="w-full">
                <Copy className="w-4 h-4 mr-2" />
                Copy Bookmarklet Code
              </Button>
              <div className="p-2 bg-gray-50 rounded border text-xs font-mono overflow-x-auto">
                javascript:(function()&#123;window.postMessage(...)&#125;)();
              </div>
              <p className="text-xs text-gray-600">
                After copying: Create new bookmark, paste code as URL, click on any profile page
              </p>
            </div>
          </Card>

          <Card className="p-4 bg-yellow-50 border-yellow-200">
            <h3 className="text-sm mb-2">⚠️ Important Notes</h3>
            <div className="space-y-1 text-xs text-gray-700">
              <p>• Extension requires you to be logged into the platform (e.g., LinkedIn account)</p>
              <p>• Respects rate limits - won't scrape too fast</p>
              <p>• Only accesses publicly visible information</p>
              <p>• Works best on premium/paid accounts (more visible data)</p>
              <p>• Some platforms (LinkedIn) may require Sales Navigator for best results</p>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-3">
          <Card className="p-4">
            <h3 className="text-sm mb-3">Recent Sourcing Activity</h3>
            <div className="space-y-2">
              {recentSources.map((source, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                      {source.platform === 'LinkedIn' && <Linkedin className="w-4 h-4 text-blue-600" />}
                      {source.platform === 'GitHub' && <Github className="w-4 h-4 text-gray-800" />}
                      {source.platform === 'AngelList' && <Globe className="w-4 h-4 text-black" />}
                    </div>
                    <div>
                      <p className="text-sm">{source.platform}</p>
                      <p className="text-xs text-gray-600">{source.count} candidates sourced</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">{source.time}</Badge>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-4">
            <h3 className="text-sm mb-3">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-2">
              <Button size="sm" variant="outline" onClick={() => toast.info('Opening LinkedIn...')}>
                <Linkedin className="w-4 h-4 mr-2" />
                Source from LinkedIn
              </Button>
              <Button size="sm" variant="outline" onClick={() => toast.info('Opening GitHub...')}>
                <Github className="w-4 h-4 mr-2" />
                Source from GitHub
              </Button>
              <Button size="sm" variant="outline" onClick={() => toast.info('Opening AngelList...')}>
                <Globe className="w-4 h-4 mr-2" />
                Source from AngelList
              </Button>
              <Button size="sm" variant="outline" onClick={() => toast.info('Opening Indeed...')}>
                <Globe className="w-4 h-4 mr-2" />
                Source from Indeed
              </Button>
            </div>
          </Card>

          <Alert>
            <AlertDescription className="text-xs">
              <strong>Pro Tip:</strong> Use the extension while browsing naturally. When you find interesting profiles,
              just click the extension icon. All candidates are auto-enriched with Apollo.io and Hunter.io.
            </AlertDescription>
          </Alert>
        </TabsContent>
      </Tabs>
    </div>
  );
}

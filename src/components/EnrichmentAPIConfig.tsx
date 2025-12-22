import { useState } from 'react';
import { Key, CheckCircle2, AlertCircle, RefreshCw, Zap, Mail, Phone, Users, ExternalLink } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { toast } from 'sonner';

interface APIStatus {
  connected: boolean;
  credits: number;
  lastUsed?: string;
  rateLimit?: string;
}

export function EnrichmentAPIConfig() {
  const [apolloKey, setApolloKey] = useState('');
  const [hunterKey, setHunterKey] = useState('');
  const [clearbitKey, setClearbitKey] = useState('');
  
  const [apolloStatus, setApolloStatus] = useState<APIStatus>({
    connected: false,
    credits: 0,
  });
  
  const [hunterStatus, setHunterStatus] = useState<APIStatus>({
    connected: false,
    credits: 0,
  });
  
  const [clearbitStatus, setClearbitStatus] = useState<APIStatus>({
    connected: false,
    credits: 0,
  });

  const handleConnectApollo = () => {
    if (!apolloKey) {
      toast.error('Please enter your Apollo.io API key');
      return;
    }
    
    // Simulate API connection
    toast.loading('Connecting to Apollo.io...');
    setTimeout(() => {
      setApolloStatus({
        connected: true,
        credits: 2500,
        lastUsed: 'Just now',
        rateLimit: '100/hour',
      });
      toast.success('Connected to Apollo.io!');
    }, 1500);
  };

  const handleConnectHunter = () => {
    if (!hunterKey) {
      toast.error('Please enter your Hunter.io API key');
      return;
    }
    
    toast.loading('Connecting to Hunter.io...');
    setTimeout(() => {
      setHunterStatus({
        connected: true,
        credits: 1000,
        lastUsed: 'Just now',
        rateLimit: '50/hour',
      });
      toast.success('Connected to Hunter.io!');
    }, 1500);
  };

  const handleConnectClearbit = () => {
    if (!clearbitKey) {
      toast.error('Please enter your Clearbit API key');
      return;
    }
    
    toast.loading('Connecting to Clearbit...');
    setTimeout(() => {
      setClearbitStatus({
        connected: true,
        credits: 5000,
        lastUsed: 'Just now',
        rateLimit: '200/hour',
      });
      toast.success('Connected to Clearbit!');
    }, 1500);
  };

  const handleTestEnrichment = () => {
    if (!apolloStatus.connected && !hunterStatus.connected) {
      toast.error('Please connect at least one enrichment service');
      return;
    }
    
    toast.loading('Running test enrichment...');
    setTimeout(() => {
      toast.success('Test successful! Found: john.doe@example.com, +1 (555) 123-4567');
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl flex items-center gap-2 mb-2">
          <Zap className="w-6 h-6 text-yellow-500" />
          API Integrations - Contact Enrichment
        </h2>
        <p className="text-sm text-gray-600">
          Connect enrichment services to automatically find emails, phones, and social profiles
        </p>
      </div>

      {/* Overview */}
      <Card className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <h3 className="text-sm mb-3">🚀 What Gets Enriched</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-start gap-2">
            <Mail className="w-4 h-4 text-blue-600 mt-0.5" />
            <div className="text-xs">
              <p className="font-medium">Email Addresses</p>
              <p className="text-gray-600">Personal + work emails (95% accuracy)</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Phone className="w-4 h-4 text-green-600 mt-0.5" />
            <div className="text-xs">
              <p className="font-medium">Phone Numbers</p>
              <p className="text-gray-600">Mobile + direct lines (85% accuracy)</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Users className="w-4 h-4 text-purple-600 mt-0.5" />
            <div className="text-xs">
              <p className="font-medium">Social Profiles</p>
              <p className="text-gray-600">LinkedIn, GitHub, Twitter/X</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-orange-600 mt-0.5" />
            <div className="text-xs">
              <p className="font-medium">Company Data</p>
              <p className="text-gray-600">Size, industry, funding, tech stack</p>
            </div>
          </div>
        </div>
      </Card>

      <Tabs defaultValue="apollo" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="apollo">Apollo.io</TabsTrigger>
          <TabsTrigger value="hunter">Hunter.io</TabsTrigger>
          <TabsTrigger value="clearbit">Clearbit</TabsTrigger>
          <TabsTrigger value="overview">Overview</TabsTrigger>
        </TabsList>

        <TabsContent value="apollo" className="space-y-4">
          <Card className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded flex items-center justify-center text-white">
                  A
                </div>
                <div>
                  <h3 className="text-sm">Apollo.io</h3>
                  <p className="text-xs text-gray-600">B2B contact & company data</p>
                </div>
              </div>
              <Badge className={apolloStatus.connected ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}>
                {apolloStatus.connected ? 'Connected' : 'Not Connected'}
              </Badge>
            </div>

            {apolloStatus.connected ? (
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-2 bg-blue-50 rounded text-center">
                    <div className="text-lg text-blue-600">{apolloStatus.credits}</div>
                    <div className="text-xs text-gray-600">Credits</div>
                  </div>
                  <div className="p-2 bg-green-50 rounded text-center">
                    <div className="text-lg text-green-600">{apolloStatus.rateLimit}</div>
                    <div className="text-xs text-gray-600">Rate Limit</div>
                  </div>
                  <div className="p-2 bg-purple-50 rounded text-center">
                    <div className="text-lg text-purple-600">95%</div>
                    <div className="text-xs text-gray-600">Accuracy</div>
                  </div>
                </div>
                <Alert>
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <AlertDescription className="text-xs">
                    Connected successfully. Last used: {apolloStatus.lastUsed}
                  </AlertDescription>
                </Alert>
                <Button variant="outline" size="sm" className="w-full" onClick={() => setApolloStatus({ ...apolloStatus, connected: false })}>
                  Disconnect
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                <div>
                  <Label htmlFor="apollo-key" className="text-xs">API Key</Label>
                  <Input
                    id="apollo-key"
                    type="password"
                    placeholder="Enter Apollo.io API key"
                    value={apolloKey}
                    onChange={(e) => setApolloKey(e.target.value)}
                    className="mt-1"
                  />
                  <p className="text-xs text-gray-600 mt-1">
                    Get your API key from{' '}
                    <a href="https://apollo.io/settings/api" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      Apollo.io Settings <ExternalLink className="w-3 h-3 inline" />
                    </a>
                  </p>
                </div>
                <Button onClick={handleConnectApollo} className="w-full" size="sm">
                  <Key className="w-4 h-4 mr-2" />
                  Connect Apollo.io
                </Button>
              </div>
            )}
          </Card>

          <Card className="p-4 bg-blue-50 border-blue-200">
            <h4 className="text-sm mb-2">What Apollo.io Provides:</h4>
            <ul className="space-y-1 text-xs text-gray-700">
              <li>✅ Email addresses (personal + work)</li>
              <li>✅ Direct phone numbers</li>
              <li>✅ LinkedIn profile URLs</li>
              <li>✅ Company information (size, industry, revenue)</li>
              <li>✅ Job title & seniority level</li>
              <li>✅ Technologies used at company</li>
              <li>✅ Contact verification (deliverability)</li>
              <li>✅ Intent data (job seeking signals)</li>
            </ul>
          </Card>
        </TabsContent>

        <TabsContent value="hunter" className="space-y-4">
          <Card className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-500 rounded flex items-center justify-center text-white">
                  H
                </div>
                <div>
                  <h3 className="text-sm">Hunter.io</h3>
                  <p className="text-xs text-gray-600">Email finding & verification</p>
                </div>
              </div>
              <Badge className={hunterStatus.connected ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}>
                {hunterStatus.connected ? 'Connected' : 'Not Connected'}
              </Badge>
            </div>

            {hunterStatus.connected ? (
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-2 bg-orange-50 rounded text-center">
                    <div className="text-lg text-orange-600">{hunterStatus.credits}</div>
                    <div className="text-xs text-gray-600">Searches</div>
                  </div>
                  <div className="p-2 bg-green-50 rounded text-center">
                    <div className="text-lg text-green-600">{hunterStatus.rateLimit}</div>
                    <div className="text-xs text-gray-600">Rate Limit</div>
                  </div>
                  <div className="p-2 bg-purple-50 rounded text-center">
                    <div className="text-lg text-purple-600">98%</div>
                    <div className="text-xs text-gray-600">Accuracy</div>
                  </div>
                </div>
                <Alert>
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <AlertDescription className="text-xs">
                    Connected successfully. Last used: {hunterStatus.lastUsed}
                  </AlertDescription>
                </Alert>
                <Button variant="outline" size="sm" className="w-full" onClick={() => setHunterStatus({ ...hunterStatus, connected: false })}>
                  Disconnect
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                <div>
                  <Label htmlFor="hunter-key" className="text-xs">API Key</Label>
                  <Input
                    id="hunter-key"
                    type="password"
                    placeholder="Enter Hunter.io API key"
                    value={hunterKey}
                    onChange={(e) => setHunterKey(e.target.value)}
                    className="mt-1"
                  />
                  <p className="text-xs text-gray-600 mt-1">
                    Get your API key from{' '}
                    <a href="https://hunter.io/api_keys" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      Hunter.io API Keys <ExternalLink className="w-3 h-3 inline" />
                    </a>
                  </p>
                </div>
                <Button onClick={handleConnectHunter} className="w-full" size="sm">
                  <Key className="w-4 h-4 mr-2" />
                  Connect Hunter.io
                </Button>
              </div>
            )}
          </Card>

          <Card className="p-4 bg-orange-50 border-orange-200">
            <h4 className="text-sm mb-2">What Hunter.io Provides:</h4>
            <ul className="space-y-1 text-xs text-gray-700">
              <li>✅ Email address finding (98% accuracy)</li>
              <li>✅ Email pattern detection (firstname.lastname@)</li>
              <li>✅ Email verification & validation</li>
              <li>✅ Deliverability checking</li>
              <li>✅ Domain search (all emails at company)</li>
              <li>✅ Confidence score for each email</li>
              <li>✅ Alternative email addresses</li>
            </ul>
          </Card>
        </TabsContent>

        <TabsContent value="clearbit" className="space-y-4">
          <Card className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-600 rounded flex items-center justify-center text-white">
                  C
                </div>
                <div>
                  <h3 className="text-sm">Clearbit</h3>
                  <p className="text-xs text-gray-600">Company & person enrichment</p>
                </div>
              </div>
              <Badge className={clearbitStatus.connected ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}>
                {clearbitStatus.connected ? 'Connected' : 'Not Connected'}
              </Badge>
            </div>

            {clearbitStatus.connected ? (
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-2 bg-purple-50 rounded text-center">
                    <div className="text-lg text-purple-600">{clearbitStatus.credits}</div>
                    <div className="text-xs text-gray-600">Credits</div>
                  </div>
                  <div className="p-2 bg-green-50 rounded text-center">
                    <div className="text-lg text-green-600">{clearbitStatus.rateLimit}</div>
                    <div className="text-xs text-gray-600">Rate Limit</div>
                  </div>
                  <div className="p-2 bg-blue-50 rounded text-center">
                    <div className="text-lg text-blue-600">92%</div>
                    <div className="text-xs text-gray-600">Accuracy</div>
                  </div>
                </div>
                <Alert>
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <AlertDescription className="text-xs">
                    Connected successfully. Last used: {clearbitStatus.lastUsed}
                  </AlertDescription>
                </Alert>
                <Button variant="outline" size="sm" className="w-full" onClick={() => setClearbitStatus({ ...clearbitStatus, connected: false })}>
                  Disconnect
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                <div>
                  <Label htmlFor="clearbit-key" className="text-xs">API Key</Label>
                  <Input
                    id="clearbit-key"
                    type="password"
                    placeholder="Enter Clearbit API key"
                    value={clearbitKey}
                    onChange={(e) => setClearbitKey(e.target.value)}
                    className="mt-1"
                  />
                  <p className="text-xs text-gray-600 mt-1">
                    Get your API key from{' '}
                    <a href="https://dashboard.clearbit.com/api" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      Clearbit Dashboard <ExternalLink className="w-3 h-3 inline" />
                    </a>
                  </p>
                </div>
                <Button onClick={handleConnectClearbit} className="w-full" size="sm">
                  <Key className="w-4 h-4 mr-2" />
                  Connect Clearbit
                </Button>
              </div>
            )}
          </Card>

          <Card className="p-4 bg-purple-50 border-purple-200">
            <h4 className="text-sm mb-2">What Clearbit Provides:</h4>
            <ul className="space-y-1 text-xs text-gray-700">
              <li>✅ Complete company profiles</li>
              <li>✅ Employee count & growth trends</li>
              <li>✅ Technologies used (tech stack)</li>
              <li>✅ Social media profiles</li>
              <li>✅ Person bio & employment history</li>
              <li>✅ Education & certifications</li>
              <li>✅ Location & timezone data</li>
              <li>✅ Industry & company category</li>
            </ul>
          </Card>
        </TabsContent>

        <TabsContent value="overview" className="space-y-4">
          <Card className="p-4">
            <h3 className="text-sm mb-3">Integration Status</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${apolloStatus.connected ? 'bg-green-500' : 'bg-gray-300'}`} />
                  <span className="text-sm">Apollo.io</span>
                </div>
                <Badge variant={apolloStatus.connected ? 'default' : 'outline'} className="text-xs">
                  {apolloStatus.connected ? `${apolloStatus.credits} credits` : 'Not connected'}
                </Badge>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${hunterStatus.connected ? 'bg-green-500' : 'bg-gray-300'}`} />
                  <span className="text-sm">Hunter.io</span>
                </div>
                <Badge variant={hunterStatus.connected ? 'default' : 'outline'} className="text-xs">
                  {hunterStatus.connected ? `${hunterStatus.credits} searches` : 'Not connected'}
                </Badge>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${clearbitStatus.connected ? 'bg-green-500' : 'bg-gray-300'}`} />
                  <span className="text-sm">Clearbit</span>
                </div>
                <Badge variant={clearbitStatus.connected ? 'default' : 'outline'} className="text-xs">
                  {clearbitStatus.connected ? `${clearbitStatus.credits} credits` : 'Not connected'}
                </Badge>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <h3 className="text-sm mb-3">Test Enrichment</h3>
            <p className="text-xs text-gray-600 mb-3">
              Test your connected services with a sample candidate
            </p>
            <Button onClick={handleTestEnrichment} className="w-full" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Run Test Enrichment
            </Button>
          </Card>

          <Card className="p-4 bg-yellow-50 border-yellow-200">
            <h4 className="text-sm mb-2">💡 Recommended Setup</h4>
            <div className="space-y-1 text-xs text-gray-700">
              <p><strong>For Best Results:</strong></p>
              <p>• <strong>Apollo.io</strong> - Primary source (best for B2B contacts)</p>
              <p>• <strong>Hunter.io</strong> - Backup for email verification</p>
              <p>• <strong>Clearbit</strong> - Company data enrichment</p>
              <p className="mt-2 text-gray-600">The system will automatically use the best source for each data point.</p>
            </div>
          </Card>

          <Alert>
            <AlertCircle className="w-4 h-4" />
            <AlertDescription className="text-xs">
              <strong>Cost Note:</strong> Each service charges per enrichment. Apollo.io: ~$0.10/contact,
              Hunter.io: ~$0.05/email, Clearbit: ~$0.15/profile. Total: ~$0.30 per fully enriched candidate.
            </AlertDescription>
          </Alert>
        </TabsContent>
      </Tabs>
    </div>
  );
}

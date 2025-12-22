import { useState } from 'react';
import { Users, Play, Pause, Settings, TrendingUp, Clock, CheckCircle2, AlertTriangle, Zap } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Progress } from './ui/progress';
import { toast } from 'sonner';

interface TalentPool {
  id: string;
  name: string;
  description: string;
  targetSize: number;
  currentSize: number;
  autoFillEnabled: boolean;
  searchQuery: string;
  frequency: 'daily' | 'weekly' | 'bi-weekly';
  sources: string[];
  lastRun?: string;
  nextRun?: string;
  status: 'active' | 'paused' | 'completed';
  addedThisWeek: number;
}

export function AutoTalentPoolBuilder() {
  const [talentPools, setTalentPools] = useState<TalentPool[]>([
    {
      id: '1',
      name: 'Senior React Developers',
      description: 'Experienced React devs for enterprise projects',
      targetSize: 100,
      currentSize: 73,
      autoFillEnabled: true,
      searchQuery: '(React OR ReactJS) AND (Senior OR Lead) AND experience:5+',
      frequency: 'daily',
      sources: ['LinkedIn', 'GitHub'],
      lastRun: '2 hours ago',
      nextRun: 'Tomorrow at 9:00 AM',
      status: 'active',
      addedThisWeek: 12,
    },
    {
      id: '2',
      name: 'Full Stack Engineers - Remote',
      description: 'Remote-ready full stack talent',
      targetSize: 150,
      currentSize: 145,
      autoFillEnabled: true,
      searchQuery: '"Full stack" AND (React OR Vue) AND (Node.js OR Python) AND remote',
      frequency: 'weekly',
      sources: ['LinkedIn', 'GitHub', 'Indeed'],
      lastRun: '1 day ago',
      nextRun: 'Next Monday at 9:00 AM',
      status: 'active',
      addedThisWeek: 8,
    },
    {
      id: '3',
      name: 'Backend Engineers - Python',
      description: 'Python backend specialists',
      targetSize: 80,
      currentSize: 45,
      autoFillEnabled: false,
      searchQuery: 'Backend AND Python AND (AWS OR GCP) AND experience:3+',
      frequency: 'bi-weekly',
      sources: ['GitHub', 'Stack Overflow'],
      lastRun: '5 days ago',
      nextRun: 'Paused',
      status: 'paused',
      addedThisWeek: 0,
    },
    {
      id: '4',
      name: 'DevOps Engineers',
      description: 'Infrastructure & deployment experts',
      targetSize: 50,
      currentSize: 50,
      autoFillEnabled: true,
      searchQuery: 'DevOps AND (Kubernetes OR Docker) AND (AWS OR Azure)',
      frequency: 'weekly',
      sources: ['LinkedIn', 'GitHub'],
      lastRun: '3 days ago',
      nextRun: 'Pool is full',
      status: 'completed',
      addedThisWeek: 0,
    },
  ]);

  const handleToggleAutoFill = (poolId: string) => {
    setTalentPools(pools =>
      pools.map(pool => {
        if (pool.id === poolId) {
          const newStatus = !pool.autoFillEnabled;
          toast.success(newStatus ? 'Auto-fill enabled' : 'Auto-fill paused');
          return {
            ...pool,
            autoFillEnabled: newStatus,
            status: newStatus ? 'active' : 'paused',
          };
        }
        return pool;
      })
    );
  };

  const handleRunNow = (pool: TalentPool) => {
    toast.loading(`Running search: ${pool.name}...`);
    setTimeout(() => {
      const newCandidates = Math.floor(Math.random() * 8) + 3;
      setTalentPools(pools =>
        pools.map(p => {
          if (p.id === pool.id) {
            return {
              ...p,
              currentSize: Math.min(p.currentSize + newCandidates, p.targetSize),
              lastRun: 'Just now',
              addedThisWeek: p.addedThisWeek + newCandidates,
            };
          }
          return p;
        })
      );
      toast.success(`Added ${newCandidates} candidates to ${pool.name}`);
    }, 2000);
  };

  const handleUpdateFrequency = (poolId: string, frequency: string) => {
    setTalentPools(pools =>
      pools.map(pool => {
        if (pool.id === poolId) {
          toast.success(`Updated frequency to ${frequency}`);
          return { ...pool, frequency: frequency as any };
        }
        return pool;
      })
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl flex items-center gap-2 mb-2">
            <Users className="w-6 h-6 text-purple-600" />
            Automatic Talent Pool Builder
          </h2>
          <p className="text-sm text-gray-600">
            Automatically maintain full talent pools with AI-powered sourcing
          </p>
        </div>
        <Button size="sm">
          <Users className="w-4 h-4 mr-2" />
          Create New Pool
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Active Pools</span>
            <Users className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl">
            {talentPools.filter(p => p.status === 'active').length}
          </div>
          <p className="text-xs text-gray-600 mt-1">Auto-filling now</p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Total Candidates</span>
            <TrendingUp className="w-4 h-4 text-green-600" />
          </div>
          <div className="text-2xl">
            {talentPools.reduce((sum, p) => sum + p.currentSize, 0)}
          </div>
          <p className="text-xs text-green-600 mt-1">+20 this week</p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Avg Fill Rate</span>
            <Zap className="w-4 h-4 text-yellow-600" />
          </div>
          <div className="text-2xl">87%</div>
          <p className="text-xs text-gray-600 mt-1">Target progress</p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Time Saved</span>
            <Clock className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl">24h</div>
          <p className="text-xs text-gray-600 mt-1">This month</p>
        </Card>
      </div>

      {/* How It Works */}
      <Card className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <h3 className="text-sm mb-3">🤖 How Automatic Talent Pool Building Works</h3>
        <div className="grid grid-cols-4 gap-3 text-xs">
          <div className="text-center">
            <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-2">1</div>
            <p className="font-medium">Set Target</p>
            <p className="text-gray-600">Define pool size goal</p>
          </div>
          <div className="text-center">
            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-2">2</div>
            <p className="font-medium">Auto Search</p>
            <p className="text-gray-600">Runs saved search automatically</p>
          </div>
          <div className="text-center">
            <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-2">3</div>
            <p className="font-medium">Enrich & Import</p>
            <p className="text-gray-600">Finds contacts, adds to pool</p>
          </div>
          <div className="text-center">
            <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center mx-auto mb-2">4</div>
            <p className="font-medium">Maintain</p>
            <p className="text-gray-600">Keeps pool at target size</p>
          </div>
        </div>
      </Card>

      {/* Talent Pools List */}
      <div className="space-y-4">
        {talentPools.map((pool) => {
          const fillPercentage = (pool.currentSize / pool.targetSize) * 100;
          const isNearTarget = fillPercentage >= 80;
          const isFull = fillPercentage >= 100;

          return (
            <Card key={pool.id} className="p-4">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm">{pool.name}</h3>
                      <Badge
                        className={
                          pool.status === 'active'
                            ? 'bg-green-100 text-green-700'
                            : pool.status === 'completed'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-gray-100 text-gray-600'
                        }
                      >
                        {pool.status === 'active' ? '● Active' : pool.status === 'completed' ? '✓ Complete' : '⏸ Paused'}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600">{pool.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={pool.autoFillEnabled}
                      onCheckedChange={() => handleToggleAutoFill(pool.id)}
                      disabled={isFull}
                    />
                    <Label className="text-xs text-gray-600">
                      Auto-fill
                    </Label>
                  </div>
                </div>

                {/* Progress */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-600">
                      {pool.currentSize} / {pool.targetSize} candidates
                    </span>
                    <span className="text-xs font-medium">
                      {fillPercentage.toFixed(0)}%
                    </span>
                  </div>
                  <Progress value={fillPercentage} className="h-2" />
                  {isNearTarget && !isFull && (
                    <p className="text-xs text-orange-600 mt-1">
                      <AlertTriangle className="w-3 h-3 inline mr-1" />
                      Approaching target size
                    </p>
                  )}
                  {isFull && (
                    <p className="text-xs text-green-600 mt-1">
                      <CheckCircle2 className="w-3 h-3 inline mr-1" />
                      Pool is full - auto-fill paused
                    </p>
                  )}
                </div>

                {/* Search Query */}
                <div className="p-2 bg-gray-50 rounded border">
                  <p className="text-xs text-gray-600 mb-1">Search Query:</p>
                  <p className="text-xs font-mono">{pool.searchQuery}</p>
                </div>

                {/* Sources & Schedule */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Sources:</p>
                    <div className="flex flex-wrap gap-1">
                      {pool.sources.map((source) => (
                        <Badge key={source} variant="outline" className="text-xs">
                          {source}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Frequency:</p>
                    <Select
                      value={pool.frequency}
                      onValueChange={(value) => handleUpdateFrequency(pool.id, value)}
                      disabled={!pool.autoFillEnabled}
                    >
                      <SelectTrigger className="h-8 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily at 9:00 AM</SelectItem>
                        <SelectItem value="weekly">Weekly (Mondays)</SelectItem>
                        <SelectItem value="bi-weekly">Bi-weekly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Stats & Actions */}
                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="flex items-center gap-4 text-xs text-gray-600">
                    <div>
                      <Clock className="w-3 h-3 inline mr-1" />
                      Last run: {pool.lastRun}
                    </div>
                    <div>
                      <TrendingUp className="w-3 h-3 inline mr-1" />
                      Added this week: {pool.addedThisWeek}
                    </div>
                    <div>
                      Next: {pool.nextRun}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleRunNow(pool)}
                      disabled={isFull}
                    >
                      <Play className="w-3 h-3 mr-1" />
                      Run Now
                    </Button>
                    <Button size="sm" variant="outline">
                      <Settings className="w-3 h-3 mr-1" />
                      Configure
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Tips */}
      <Card className="p-4 bg-blue-50 border-blue-200">
        <h3 className="text-sm mb-2">💡 Pro Tips for Talent Pool Building</h3>
        <ul className="space-y-1 text-xs text-gray-700">
          <li>• Set target size to 1.5x your typical hiring needs</li>
          <li>• Use daily frequency for urgent/hot roles</li>
          <li>• Weekly or bi-weekly for pipeline building</li>
          <li>• Pool pauses automatically when target is reached</li>
          <li>• Combine multiple sources for better diversity</li>
          <li>• Review new candidates weekly to maintain quality</li>
        </ul>
      </Card>
    </div>
  );
}

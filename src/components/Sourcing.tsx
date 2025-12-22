import { useState } from 'react';
import { Search, TrendingUp, Save, BarChart3, Sparkles, Chrome, Users, Zap } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card } from './ui/card';
import { BooleanSearchBuilder } from './BooleanSearchBuilder';
import { SavedSearches } from './SavedSearches';
import { SourceAnalytics } from './SourceAnalytics';
import { AISourcingPanel } from './AISourcingPanel';
import { SourcingHelpCard } from './SourcingHelpCard';
import { ChromeExtensionPanel } from './ChromeExtensionPanel';
import { EnrichmentAPIConfig } from './EnrichmentAPIConfig';
import { AutoTalentPoolBuilder } from './AutoTalentPoolBuilder';

export function Sourcing() {
  const [activeTab, setActiveTab] = useState('search');

  return (
    <div className="space-y-6">
      {/* Floating Help Button */}
      <SourcingHelpCard />
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl flex items-center gap-2">
            <Search className="w-7 h-7 text-blue-600" />
            AI Sourcing
          </h1>
          <p className="text-gray-600 mt-1">
            Find and import candidates from multiple platforms using AI-powered search
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-purple-50 border border-purple-200 rounded-lg">
          <Sparkles className="w-4 h-4 text-purple-600" />
          <span className="text-sm text-purple-900">AI-Powered Sourcing</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Sourced This Month</span>
            <Search className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl">247</div>
          <div className="text-xs text-green-600 mt-1">+23% from last month</div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Imported</span>
            <TrendingUp className="w-4 h-4 text-green-600" />
          </div>
          <div className="text-2xl">89</div>
          <div className="text-xs text-gray-600 mt-1">36% conversion rate</div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Saved Searches</span>
            <Save className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl">12</div>
          <div className="text-xs text-gray-600 mt-1">5 auto-running</div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Response Rate</span>
            <BarChart3 className="w-4 h-4 text-orange-600" />
          </div>
          <div className="text-2xl">18%</div>
          <div className="text-xs text-green-600 mt-1">+5% vs. manual sourcing</div>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="search" className="flex items-center gap-2">
            <Search className="w-4 h-4" />
            AI Search
          </TabsTrigger>
          <TabsTrigger value="extension" className="flex items-center gap-2">
            <Chrome className="w-4 h-4" />
            Extension
          </TabsTrigger>
          <TabsTrigger value="enrichment" className="flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Enrichment
          </TabsTrigger>
          <TabsTrigger value="pools" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Auto Pools
          </TabsTrigger>
          <TabsTrigger value="saved" className="flex items-center gap-2">
            <Save className="w-4 h-4" />
            Saved
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="search" className="space-y-6">
          <AISourcingPanel />
        </TabsContent>

        <TabsContent value="extension">
          <ChromeExtensionPanel />
        </TabsContent>

        <TabsContent value="enrichment">
          <EnrichmentAPIConfig />
        </TabsContent>

        <TabsContent value="pools">
          <AutoTalentPoolBuilder />
        </TabsContent>

        <TabsContent value="saved">
          <SavedSearches />
        </TabsContent>

        <TabsContent value="analytics">
          <SourceAnalytics />
        </TabsContent>
      </Tabs>
    </div>
  );
}

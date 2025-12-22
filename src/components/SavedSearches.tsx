import { useState } from 'react';
import { Search, Play, Edit, Trash2, Clock, Bell, Calendar, TrendingUp, Plus, Copy, Eye } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from 'sonner';

interface SavedSearch {
  id: string;
  name: string;
  query: string;
  platforms: string[];
  lastRun?: string;
  newResults: number;
  autoRun: boolean;
  schedule?: string;
  totalResults: number;
  createdDate: string;
}

const mockSavedSearches: SavedSearch[] = [
  {
    id: '1',
    name: 'Senior React Developers - NYC',
    query: '(React OR ReactJS) AND (TypeScript OR TS) AND "New York" AND experience:5+',
    platforms: ['linkedin', 'github'],
    lastRun: '2 hours ago',
    newResults: 12,
    autoRun: true,
    schedule: 'Daily at 9:00 AM',
    totalResults: 127,
    createdDate: '2024-01-15',
  },
  {
    id: '2',
    name: 'Backend Engineers - Remote',
    query: '(Backend OR "Back-end") AND (Python OR Go OR Java) AND remote',
    platforms: ['linkedin', 'stackoverflow'],
    lastRun: '1 day ago',
    newResults: 5,
    autoRun: true,
    schedule: 'Weekly on Monday',
    totalResults: 89,
    createdDate: '2024-01-10',
  },
  {
    id: '3',
    name: 'Full Stack - San Francisco',
    query: 'Full Stack AND (React OR Vue) AND "San Francisco"',
    platforms: ['github', 'linkedin'],
    lastRun: '3 days ago',
    newResults: 0,
    autoRun: false,
    totalResults: 56,
    createdDate: '2024-01-08',
  },
  {
    id: '4',
    name: 'DevOps Engineers',
    query: 'DevOps AND (AWS OR Azure OR GCP) AND Kubernetes',
    platforms: ['linkedin', 'github', 'stackoverflow'],
    lastRun: '5 hours ago',
    newResults: 8,
    autoRun: true,
    schedule: 'Daily at 6:00 PM',
    totalResults: 203,
    createdDate: '2024-01-20',
  },
];

export function SavedSearches() {
  const [searches, setSearches] = useState<SavedSearch[]>(mockSavedSearches);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editingSearch, setEditingSearch] = useState<SavedSearch | null>(null);

  const handleRunSearch = (search: SavedSearch) => {
    toast.loading(`Running search: ${search.name}...`);
    
    setTimeout(() => {
      const newResultsCount = Math.floor(Math.random() * 20);
      setSearches(prev => prev.map(s => 
        s.id === search.id 
          ? { ...s, lastRun: 'Just now', newResults: newResultsCount, totalResults: s.totalResults + newResultsCount }
          : s
      ));
      
      toast.success(`Search completed! Found ${newResultsCount} new candidates`);
    }, 2000);
  };

  const handleToggleAutoRun = (searchId: string, enabled: boolean) => {
    setSearches(prev => prev.map(s => 
      s.id === searchId ? { ...s, autoRun: enabled } : s
    ));
    
    toast.success(enabled ? 'Auto-run enabled' : 'Auto-run disabled');
  };

  const handleDeleteSearch = (searchId: string) => {
    if (confirm('Are you sure you want to delete this saved search?')) {
      setSearches(prev => prev.filter(s => s.id !== searchId));
      toast.success('Search deleted successfully');
    }
  };

  const handleEditSearch = (search: SavedSearch) => {
    setEditingSearch(search);
    setShowEditDialog(true);
  };

  const handleDuplicateSearch = (search: SavedSearch) => {
    const newSearch = {
      ...search,
      id: Date.now().toString(),
      name: `${search.name} (Copy)`,
      newResults: 0,
      lastRun: undefined,
      autoRun: false,
    };
    
    setSearches(prev => [newSearch, ...prev]);
    toast.success('Search duplicated successfully');
  };

  const getPlatformBadges = (platforms: string[]) => {
    const platformColors: Record<string, string> = {
      linkedin: 'bg-blue-100 text-blue-700',
      github: 'bg-gray-100 text-gray-700',
      indeed: 'bg-blue-100 text-blue-800',
      stackoverflow: 'bg-orange-100 text-orange-700',
    };

    return platforms.map(platform => (
      <Badge key={platform} variant="secondary" className={platformColors[platform]}>
        {platform.charAt(0).toUpperCase() + platform.slice(1)}
      </Badge>
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl">Saved Searches</h2>
          <p className="text-sm text-gray-600 mt-1">
            Manage and automate your candidate searches
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Create New Search
        </Button>
      </div>

      {/* Searches List */}
      <div className="space-y-4">
        {searches.map(search => (
          <Card key={search.id} className="p-6">
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg">{search.name}</h3>
                    {search.newResults > 0 && (
                      <Badge className="bg-green-500">
                        {search.newResults} new
                      </Badge>
                    )}
                  </div>
                  <code className="text-sm text-gray-600 bg-gray-50 px-2 py-1 rounded">
                    {search.query}
                  </code>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRunSearch(search)}
                  >
                    <Play className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDuplicateSearch(search)}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEditSearch(search)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteSearch(search.id)}
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </Button>
                </div>
              </div>

              {/* Platforms */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Platforms:</span>
                {getPlatformBadges(search.platforms)}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-4 gap-4 py-3 border-y">
                <div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                    <Clock className="w-4 h-4" />
                    Last Run
                  </div>
                  <div className="text-sm">
                    {search.lastRun || 'Never'}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                    <TrendingUp className="w-4 h-4" />
                    New Results
                  </div>
                  <div className="text-sm">
                    {search.newResults} candidates
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                    <Search className="w-4 h-4" />
                    Total Results
                  </div>
                  <div className="text-sm">
                    {search.totalResults} candidates
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                    <Calendar className="w-4 h-4" />
                    Created
                  </div>
                  <div className="text-sm">
                    {new Date(search.createdDate).toLocaleDateString()}
                  </div>
                </div>
              </div>

              {/* Auto-run Settings */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Switch
                    checked={search.autoRun}
                    onCheckedChange={(checked) => handleToggleAutoRun(search.id, checked)}
                  />
                  <div>
                    <Label className="text-sm">Auto-run this search</Label>
                    {search.autoRun && search.schedule && (
                      <p className="text-xs text-gray-600 mt-1 flex items-center gap-1">
                        <Bell className="w-3 h-3" />
                        {search.schedule}
                      </p>
                    )}
                  </div>
                </div>

                {search.newResults > 0 && (
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    View {search.newResults} New Results
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {searches.length === 0 && (
        <Card className="p-12">
          <div className="text-center">
            <Search className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg mb-2">No saved searches yet</h3>
            <p className="text-sm text-gray-600 mb-4">
              Create a search and save it to run automatically
            </p>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Search
            </Button>
          </div>
        </Card>
      )}

      {/* Edit Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Saved Search</DialogTitle>
            <DialogDescription>
              Update the name, query, and automation settings
            </DialogDescription>
          </DialogHeader>

          {editingSearch && (
            <div className="space-y-4">
              <div>
                <Label>Search Name</Label>
                <Input
                  value={editingSearch.name}
                  onChange={(e) => setEditingSearch({ ...editingSearch, name: e.target.value })}
                  className="mt-2"
                />
              </div>

              <div>
                <Label>Boolean Query</Label>
                <Input
                  value={editingSearch.query}
                  onChange={(e) => setEditingSearch({ ...editingSearch, query: e.target.value })}
                  className="mt-2"
                />
              </div>

              <div>
                <Label>Schedule</Label>
                <Select
                  value={editingSearch.schedule}
                  onValueChange={(value) => setEditingSearch({ ...editingSearch, schedule: value })}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Daily at 9:00 AM">Daily at 9:00 AM</SelectItem>
                    <SelectItem value="Daily at 6:00 PM">Daily at 6:00 PM</SelectItem>
                    <SelectItem value="Weekly on Monday">Weekly on Monday</SelectItem>
                    <SelectItem value="Weekly on Friday">Weekly on Friday</SelectItem>
                    <SelectItem value="Bi-weekly">Bi-weekly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-3 pt-4">
                <Button variant="outline" onClick={() => setShowEditDialog(false)} className="flex-1">
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    setSearches(prev => prev.map(s => 
                      s.id === editingSearch.id ? editingSearch : s
                    ));
                    setShowEditDialog(false);
                    toast.success('Search updated successfully');
                  }}
                  className="flex-1"
                >
                  Save Changes
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

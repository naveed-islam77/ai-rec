import { useState, useEffect } from 'react';
import { 
  Building2, 
  Plus, 
  Search, 
  Filter,
  MapPin,
  Users,
  Briefcase,
  TrendingUp,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  ExternalLink,
  Calendar,
  DollarSign,
  UserPlus,
  Grid3x3,
  List
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
  DialogFooter 
} from './ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from './ui/select';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { toast } from 'sonner@2.0.3';
import { CompanyDetailView } from './CompanyDetailView';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

interface Account {
  id: string;
  name: string;
  status: 'active' | 'inactive' | 'prospect';
  industry: string;
  location: string;
  totalEmployees: number;
  activeJobs: number;
  totalPlacements: number;
  revenue: string;
  primaryContact: {
    name: string;
    title: string;
    email: string;
  };
  createdDate: string;
  notes: string;
}

interface NewJob {
  title: string;
  department: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract';
  description: string;
  requirements: string;
  salary: string;
  assignedRecruiter: string;
}

interface AccountsProps {
  onSelectJob?: (jobId: number) => void;
}

export function Accounts({ onSelectJob }: AccountsProps) {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showNewJobDialog, setShowNewJobDialog] = useState(false);
  const [selectedAccountForJob, setSelectedAccountForJob] = useState<Account | null>(null);
  const [showAccountDetail, setShowAccountDetail] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showAddAccountDialog, setShowAddAccountDialog] = useState(false);
  const [showEditAccountDialog, setShowEditAccountDialog] = useState(false);
  const [editingAccount, setEditingAccount] = useState<Account | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const [newJob, setNewJob] = useState<NewJob>({
    title: '',
    department: '',
    location: '',
    type: 'full-time',
    description: '',
    requirements: '',
    salary: '',
    assignedRecruiter: ''
  });

  const [newAccount, setNewAccount] = useState<Partial<Account>>({
    name: '',
    status: 'prospect',
    industry: '',
    location: '',
    totalEmployees: 0,
    revenue: '',
    primaryContact: {
      name: '',
      title: '',
      email: ''
    },
    notes: ''
  });

  // Mock recruiters list - in production this would come from API
  const recruiters = [
    { id: '1', name: 'Sarah Johnson' },
    { id: '2', name: 'Michael Chen' },
    { id: '3', name: 'Emily Rodriguez' },
    { id: '4', name: 'David Park' },
  ];

  useEffect(() => {
    loadAccounts();
  }, []);

  const loadAccounts = () => {
    // Mock data - in production this would come from API
    const mockAccounts: Account[] = [
      {
        id: '1',
        name: 'TechCorp Solutions',
        status: 'active',
        industry: 'Technology',
        location: 'San Francisco, CA',
        totalEmployees: 5000,
        activeJobs: 12,
        totalPlacements: 45,
        revenue: '$500M - $1B',
        primaryContact: {
          name: 'David Park',
          title: 'VP of Engineering',
          email: 'david.park@techcorp.com'
        },
        createdDate: '2024-01-15',
        notes: 'High-value client with strong hiring needs'
      },
      {
        id: '2',
        name: 'DataFlow Inc',
        status: 'active',
        industry: 'Technology',
        location: 'New York, NY',
        totalEmployees: 3200,
        activeJobs: 8,
        totalPlacements: 28,
        revenue: '$100M - $500M',
        primaryContact: {
          name: 'Lisa Anderson',
          title: 'Chief Product Officer',
          email: 'lisa.anderson@dataflow.com'
        },
        createdDate: '2024-02-20',
        notes: 'Focus on data engineering and AI roles'
      },
      {
        id: '3',
        name: 'CloudNet Systems',
        status: 'prospect',
        industry: 'Technology',
        location: 'Seattle, WA',
        totalEmployees: 4100,
        activeJobs: 0,
        totalPlacements: 0,
        revenue: '$500M - $1B',
        primaryContact: {
          name: 'Robert Williams',
          title: 'Chief Revenue Officer',
          email: 'robert.williams@cloudnet.com'
        },
        createdDate: '2024-10-01',
        notes: 'Recently converted from Intelligence module'
      },
    ];
    setAccounts(mockAccounts);
  };

  const filteredAccounts = accounts.filter(account => {
    const matchesSearch = account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         account.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         account.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || account.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAddJob = (account: Account) => {
    setSelectedAccountForJob(account);
    setNewJob({
      title: '',
      department: '',
      location: account.location,
      type: 'full-time',
      description: '',
      requirements: '',
      salary: '',
      assignedRecruiter: ''
    });
    setShowNewJobDialog(true);
  };

  const handleCreateJob = async () => {
    if (!newJob.title || !newJob.assignedRecruiter) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    try {
      // In production, this would call an API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success(`Job "${newJob.title}" created and assigned to ${recruiters.find(r => r.id === newJob.assignedRecruiter)?.name}`);
      setShowNewJobDialog(false);
      
      // Update the account's active jobs count
      setAccounts(accounts.map(acc => 
        acc.id === selectedAccountForJob?.id 
          ? { ...acc, activeJobs: acc.activeJobs + 1 }
          : acc
      ));
    } catch (error) {
      toast.error('Failed to create job');
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewAccount = (account: Account) => {
    setSelectedAccount(account);
    setShowAccountDetail(true);
  };

  const handleDeleteAccount = async (accountId: string) => {
    if (window.confirm('Are you sure you want to delete this account?')) {
      setIsLoading(true);
      try {
        // In production, this would call an API
        await new Promise(resolve => setTimeout(resolve, 500));
        setAccounts(accounts.filter(acc => acc.id !== accountId));
        toast.success('Account deleted successfully');
      } catch (error) {
        toast.error('Failed to delete account');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleAddAccount = () => {
    setNewAccount({
      name: '',
      status: 'prospect',
      industry: '',
      location: '',
      totalEmployees: 0,
      revenue: '',
      primaryContact: {
        name: '',
        title: '',
        email: ''
      },
      notes: ''
    });
    setShowAddAccountDialog(true);
  };

  const handleEditAccount = (account: Account) => {
    setEditingAccount(account);
    setShowEditAccountDialog(true);
  };

  const handleSaveNewAccount = async () => {
    if (!newAccount.name || !newAccount.primaryContact?.email) {
      toast.error('Please fill in required fields (Name and Primary Contact Email)');
      return;
    }

    setIsLoading(true);
    try {
      // In production, this would call an API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const account: Account = {
        id: Date.now().toString(),
        name: newAccount.name!,
        status: newAccount.status as 'active' | 'inactive' | 'prospect',
        industry: newAccount.industry || '',
        location: newAccount.location || '',
        totalEmployees: newAccount.totalEmployees || 0,
        activeJobs: 0,
        totalPlacements: 0,
        revenue: newAccount.revenue || '',
        primaryContact: newAccount.primaryContact!,
        createdDate: new Date().toISOString().split('T')[0],
        notes: newAccount.notes || ''
      };
      
      setAccounts([...accounts, account]);
      toast.success('Account created successfully');
      setShowAddAccountDialog(false);
    } catch (error) {
      toast.error('Failed to create account');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveEditAccount = async () => {
    if (!editingAccount) return;

    setIsLoading(true);
    try {
      // In production, this would call an API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setAccounts(accounts.map(acc => 
        acc.id === editingAccount.id ? editingAccount : acc
      ));
      toast.success('Account updated successfully');
      setShowEditAccountDialog(false);
    } catch (error) {
      toast.error('Failed to update account');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'inactive': return 'bg-gray-100 text-gray-700';
      case 'prospect': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const stats = {
    total: accounts.length,
    active: accounts.filter(a => a.status === 'active').length,
    prospects: accounts.filter(a => a.status === 'prospect').length,
    totalActiveJobs: accounts.reduce((sum, a) => sum + a.activeJobs, 0),
  };

  if (showAccountDetail && selectedAccount) {
    return (
      <div className="fixed inset-0 z-50 bg-white">
        <CompanyDetailView
          companyName={selectedAccount.name}
          onClose={() => setShowAccountDetail(false)}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl mb-2">Accounts</h1>
        <p className="text-gray-600">Manage your client accounts and job openings</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Accounts</p>
                <p className="text-2xl font-semibold mt-1">{stats.total}</p>
              </div>
              <Building2 className="w-8 h-8 text-blue-600 opacity-80" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Accounts</p>
                <p className="text-2xl font-semibold mt-1">{stats.active}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600 opacity-80" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Prospects</p>
                <p className="text-2xl font-semibold mt-1">{stats.prospects}</p>
              </div>
              <Users className="w-8 h-8 text-purple-600 opacity-80" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Jobs</p>
                <p className="text-2xl font-semibold mt-1">{stats.totalActiveJobs}</p>
              </div>
              <Briefcase className="w-8 h-8 text-orange-600 opacity-80" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search accounts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="prospect">Prospect</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex gap-1 border rounded-lg p-1">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            <Grid3x3 className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
        <Button onClick={handleAddAccount} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Account
        </Button>
      </div>

      {/* Accounts Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 gap-4">
          {filteredAccounts.length === 0 ? (
            <Card>
              <CardContent className="pt-12 pb-12 text-center">
                <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600 mb-2">No accounts found</p>
                <p className="text-sm text-gray-500">
                  {searchTerm ? 'Try adjusting your search filters' : 'Convert companies from Intelligence to create accounts'}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredAccounts.map((account) => (
            <Card key={account.id} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white flex-shrink-0">
                        <Building2 className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-medium">{account.name}</h3>
                          <Badge className={getStatusColor(account.status)}>
                            {account.status}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3 text-sm">
                          <div className="flex items-center gap-2 text-gray-600">
                            <MapPin className="w-4 h-4" />
                            <span>{account.location}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <Users className="w-4 h-4" />
                            <span>{account.totalEmployees.toLocaleString()} employees</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <Briefcase className="w-4 h-4" />
                            <span>{account.activeJobs} active jobs</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <TrendingUp className="w-4 h-4" />
                            <span>{account.totalPlacements} placements</span>
                          </div>
                        </div>

                        <div className="flex items-start gap-2 text-sm">
                          <div className="bg-gray-50 rounded-lg p-3 flex-1">
                            <p className="text-xs text-gray-500 mb-1">Primary Contact</p>
                            <p className="font-medium">{account.primaryContact.name}</p>
                            <p className="text-gray-600">{account.primaryContact.title}</p>
                            <p className="text-blue-600 text-xs mt-1">{account.primaryContact.email}</p>
                          </div>
                          <div className="bg-gray-50 rounded-lg p-3 flex-1">
                            <p className="text-xs text-gray-500 mb-1">Account Info</p>
                            <p className="text-gray-600">Industry: {account.industry}</p>
                            <p className="text-gray-600">Revenue: {account.revenue}</p>
                            <p className="text-gray-600 text-xs mt-1">
                              Created: {new Date(account.createdDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 ml-4">
                    <Button
                      onClick={() => handleAddJob(account)}
                      size="sm"
                      className="gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Add Job
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewAccount(account)}>
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditAccount(account)}>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit Account
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeleteAccount(account.id)} className="text-red-600">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardContent>
            </Card>
            ))
          )}
        </div>
      )}

      {/* Accounts List View */}
      {viewMode === 'list' && (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Industry</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Employees</TableHead>
                <TableHead>Active Jobs</TableHead>
                <TableHead>Placements</TableHead>
                <TableHead>Primary Contact</TableHead>
                <TableHead className="w-32">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAccounts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-12">
                    <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600 mb-2">No accounts found</p>
                    <p className="text-sm text-gray-500">
                      {searchTerm ? 'Try adjusting your search filters' : 'Convert companies from Intelligence to create accounts'}
                    </p>
                  </TableCell>
                </TableRow>
              ) : (
                filteredAccounts.map((account) => (
                  <TableRow key={account.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white flex-shrink-0">
                          <Building2 className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-medium">{account.name}</p>
                          <p className="text-sm text-gray-500">{account.revenue}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(account.status)}>
                        {account.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{account.industry}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-gray-400" />
                        <span className="text-sm">{account.location}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3 text-gray-400" />
                        <span className="text-sm">{account.totalEmployees.toLocaleString()}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Briefcase className="w-3 h-3 text-gray-400" />
                        <span className="text-sm">{account.activeJobs}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-3 h-3 text-gray-400" />
                        <span className="text-sm">{account.totalPlacements}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm font-medium">{account.primaryContact.name}</p>
                        <p className="text-xs text-gray-500">{account.primaryContact.title}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0"
                          onClick={() => handleViewAccount(account)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0"
                          onClick={() => handleEditAccount(account)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleAddJob(account)}>
                              <Plus className="w-4 h-4 mr-2" />
                              Add Job
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDeleteAccount(account.id)} className="text-red-600">
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Card>
      )}

      {/* Add Account Dialog */}
      <Dialog open={showAddAccountDialog} onOpenChange={setShowAddAccountDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-blue-600" />
              Add New Account
            </DialogTitle>
            <DialogDescription>
              Create a new client account
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="account-name">Company Name *</Label>
                <Input
                  id="account-name"
                  placeholder="e.g. TechCorp Solutions"
                  value={newAccount.name}
                  onChange={(e) => setNewAccount({ ...newAccount, name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="account-status">Status</Label>
                <Select value={newAccount.status} onValueChange={(value: any) => setNewAccount({ ...newAccount, status: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="prospect">Prospect</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="account-industry">Industry</Label>
                <Input
                  id="account-industry"
                  placeholder="e.g. Technology"
                  value={newAccount.industry}
                  onChange={(e) => setNewAccount({ ...newAccount, industry: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="account-location">Location</Label>
                <Input
                  id="account-location"
                  placeholder="e.g. San Francisco, CA"
                  value={newAccount.location}
                  onChange={(e) => setNewAccount({ ...newAccount, location: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="account-employees">Total Employees</Label>
                <Input
                  id="account-employees"
                  type="number"
                  placeholder="e.g. 5000"
                  value={newAccount.totalEmployees}
                  onChange={(e) => setNewAccount({ ...newAccount, totalEmployees: parseInt(e.target.value) || 0 })}
                />
              </div>
              <div>
                <Label htmlFor="account-revenue">Revenue Range</Label>
                <Input
                  id="account-revenue"
                  placeholder="e.g. $100M - $500M"
                  value={newAccount.revenue}
                  onChange={(e) => setNewAccount({ ...newAccount, revenue: e.target.value })}
                />
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-medium mb-3">Primary Contact</h4>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="contact-name">Name *</Label>
                  <Input
                    id="contact-name"
                    placeholder="e.g. John Smith"
                    value={newAccount.primaryContact?.name}
                    onChange={(e) => setNewAccount({ 
                      ...newAccount, 
                      primaryContact: { ...newAccount.primaryContact!, name: e.target.value }
                    })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contact-title">Title</Label>
                    <Input
                      id="contact-title"
                      placeholder="e.g. VP of Engineering"
                      value={newAccount.primaryContact?.title}
                      onChange={(e) => setNewAccount({ 
                        ...newAccount, 
                        primaryContact: { ...newAccount.primaryContact!, title: e.target.value }
                      })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="contact-email">Email *</Label>
                    <Input
                      id="contact-email"
                      type="email"
                      placeholder="e.g. john@company.com"
                      value={newAccount.primaryContact?.email}
                      onChange={(e) => setNewAccount({ 
                        ...newAccount, 
                        primaryContact: { ...newAccount.primaryContact!, email: e.target.value }
                      })}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="account-notes">Notes</Label>
              <Textarea
                id="account-notes"
                placeholder="Add any additional notes about this account..."
                value={newAccount.notes}
                onChange={(e) => setNewAccount({ ...newAccount, notes: e.target.value })}
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddAccountDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveNewAccount} disabled={isLoading}>
              {isLoading ? 'Creating...' : 'Create Account'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Account Dialog */}
      <Dialog open={showEditAccountDialog} onOpenChange={setShowEditAccountDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit className="w-5 h-5 text-blue-600" />
              Edit Account
            </DialogTitle>
            <DialogDescription>
              Update account information
            </DialogDescription>
          </DialogHeader>

          {editingAccount && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-account-name">Company Name *</Label>
                  <Input
                    id="edit-account-name"
                    value={editingAccount.name}
                    onChange={(e) => setEditingAccount({ ...editingAccount, name: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-account-status">Status</Label>
                  <Select value={editingAccount.status} onValueChange={(value: any) => setEditingAccount({ ...editingAccount, status: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="prospect">Prospect</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-account-industry">Industry</Label>
                  <Input
                    id="edit-account-industry"
                    value={editingAccount.industry}
                    onChange={(e) => setEditingAccount({ ...editingAccount, industry: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-account-location">Location</Label>
                  <Input
                    id="edit-account-location"
                    value={editingAccount.location}
                    onChange={(e) => setEditingAccount({ ...editingAccount, location: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-account-employees">Total Employees</Label>
                  <Input
                    id="edit-account-employees"
                    type="number"
                    value={editingAccount.totalEmployees}
                    onChange={(e) => setEditingAccount({ ...editingAccount, totalEmployees: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-account-revenue">Revenue Range</Label>
                  <Input
                    id="edit-account-revenue"
                    value={editingAccount.revenue}
                    onChange={(e) => setEditingAccount({ ...editingAccount, revenue: e.target.value })}
                  />
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-medium mb-3">Primary Contact</h4>
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="edit-contact-name">Name *</Label>
                    <Input
                      id="edit-contact-name"
                      value={editingAccount.primaryContact.name}
                      onChange={(e) => setEditingAccount({ 
                        ...editingAccount, 
                        primaryContact: { ...editingAccount.primaryContact, name: e.target.value }
                      })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="edit-contact-title">Title</Label>
                      <Input
                        id="edit-contact-title"
                        value={editingAccount.primaryContact.title}
                        onChange={(e) => setEditingAccount({ 
                          ...editingAccount, 
                          primaryContact: { ...editingAccount.primaryContact, title: e.target.value }
                        })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-contact-email">Email *</Label>
                      <Input
                        id="edit-contact-email"
                        type="email"
                        value={editingAccount.primaryContact.email}
                        onChange={(e) => setEditingAccount({ 
                          ...editingAccount, 
                          primaryContact: { ...editingAccount.primaryContact, email: e.target.value }
                        })}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="edit-account-notes">Notes</Label>
                <Textarea
                  id="edit-account-notes"
                  value={editingAccount.notes}
                  onChange={(e) => setEditingAccount({ ...editingAccount, notes: e.target.value })}
                  rows={3}
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditAccountDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveEditAccount} disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Job Dialog */}
      <Dialog open={showNewJobDialog} onOpenChange={setShowNewJobDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-blue-600" />
              Add New Job Opening
            </DialogTitle>
            <DialogDescription>
              Create a new job opening for {selectedAccountForJob?.name}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Job Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g. Senior Software Engineer"
                  value={newJob.title}
                  onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="department">Department</Label>
                <Input
                  id="department"
                  placeholder="e.g. Engineering"
                  value={newJob.department}
                  onChange={(e) => setNewJob({ ...newJob, department: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="e.g. San Francisco, CA"
                  value={newJob.location}
                  onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="type">Job Type</Label>
                <Select value={newJob.type} onValueChange={(value: any) => setNewJob({ ...newJob, type: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full-time">Full-time</SelectItem>
                    <SelectItem value="part-time">Part-time</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="salary">Salary Range</Label>
              <Input
                id="salary"
                placeholder="e.g. $120,000 - $180,000"
                value={newJob.salary}
                onChange={(e) => setNewJob({ ...newJob, salary: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="recruiter">Assign Recruiter *</Label>
              <Select value={newJob.assignedRecruiter} onValueChange={(value) => setNewJob({ ...newJob, assignedRecruiter: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a recruiter" />
                </SelectTrigger>
                <SelectContent>
                  {recruiters.map((recruiter) => (
                    <SelectItem key={recruiter.id} value={recruiter.id}>
                      <div className="flex items-center gap-2">
                        <UserPlus className="w-4 h-4" />
                        {recruiter.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="description">Job Description</Label>
              <Textarea
                id="description"
                placeholder="Describe the role, responsibilities, and what you're looking for..."
                value={newJob.description}
                onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
                rows={4}
              />
            </div>

            <div>
              <Label htmlFor="requirements">Requirements</Label>
              <Textarea
                id="requirements"
                placeholder="List the key requirements, skills, and qualifications..."
                value={newJob.requirements}
                onChange={(e) => setNewJob({ ...newJob, requirements: e.target.value })}
                rows={4}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewJobDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateJob} disabled={isLoading}>
              {isLoading ? 'Creating...' : 'Create Job'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

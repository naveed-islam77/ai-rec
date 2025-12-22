import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Building2,
  Briefcase,
  Users,
  Settings as SettingsIcon,
  Sparkles,
  UserCircle,
  Brain,
  Inbox as InboxIcon,
  HelpCircle,
  Search,
} from "lucide-react";
import { Dashboard } from "./components/Dashboard";
import { Accounts } from "./components/Accounts";
import { Jobs } from "./components/Jobs";
import { Candidates } from "./components/Candidates";
import { CandidateDetail } from "./components/CandidateDetail";
import { JobDetail } from "./components/JobDetail";
import { RecruiterView } from "./components/RecruiterView";
import { Intelligence } from "./components/Intelligence-fixed";
import { Inbox } from "./components/Inbox";
import { Sourcing } from "./components/Sourcing";
import { Settings } from "./components/Settings";
import { PublicJobApplication } from "./components/PublicJobApplication";
import { PublicCandidateView } from "./components/PublicCandidateView";
import { Button } from "./components/ui/button";
import { Toaster } from "./components/ui/sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./components/ui/dialog";

type View =
  | "dashboard"
  | "accounts"
  | "jobs"
  | "candidates"
  | "recruiters"
  | "sourcing"
  | "intelligence"
  | "inbox"
  | "settings";

export default function App() {
  const [activeView, setActiveView] = useState<View>("dashboard");
  const [selectedCandidateId, setSelectedCandidateId] = useState<number | null>(
    null
  );
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null);
  const [showHelp, setShowHelp] = useState(false);
  const [isPublicApplyPage, setIsPublicApplyPage] = useState(false);
  const [publicJobId, setPublicJobId] = useState<number>(1);
  const [isPublicCandidateView, setIsPublicCandidateView] = useState(false);
  const [candidateShareToken, setCandidateShareToken] = useState<string>("");
  const [candidateEditMode, setCandidateEditMode] = useState(false);
  const [candidateDataForEdit, setCandidateDataForEdit] = useState<any>(null);

  useEffect(() => {
    // Check if URL contains /apply/ or /candidate-review/ path
    const path = window.location.pathname;
    const applyMatch = path.match(/\/apply\/(\d+)/);
    const candidateMatch = path.match(/\/candidate-review\/([a-zA-Z0-9]+)/);

    if (applyMatch) {
      setIsPublicApplyPage(true);
      setPublicJobId(parseInt(applyMatch[1]));
    } else if (candidateMatch) {
      setIsPublicCandidateView(true);
      setCandidateShareToken(candidateMatch[1]);
    }
  }, []);

  const navigationItems = [
    { id: "dashboard" as View, label: "Dashboard", icon: LayoutDashboard },
    { id: "accounts" as View, label: "Accounts", icon: Building2 },
    { id: "jobs" as View, label: "Jobs", icon: Briefcase },
    { id: "candidates" as View, label: "Candidates", icon: Users },
    { id: "sourcing" as View, label: "AI Sourcing", icon: Search },
    { id: "recruiters" as View, label: "Recruiters", icon: UserCircle },
    { id: "intelligence" as View, label: "Intelligence", icon: Brain },
    { id: "inbox" as View, label: "Inbox", icon: InboxIcon },
    { id: "settings" as View, label: "Settings", icon: SettingsIcon },
  ];

  const handleSelectCandidate = (
    candidateId: number,
    editMode = false,
    candidateData?: any
  ) => {
    setSelectedCandidateId(candidateId);
    setCandidateEditMode(editMode);
    setCandidateDataForEdit(candidateData);
  };

  const handleBackToCandidates = () => {
    setSelectedCandidateId(null);
    setCandidateEditMode(false);
    setCandidateDataForEdit(null);
  };

  const handleSaveCandidate = (updatedData: any) => {
    // This would normally save to backend
    console.log("Saving candidate data:", updatedData);
    handleBackToCandidates();
  };

  const handleSelectJob = (jobId: number) => {
    setSelectedJobId(jobId);
  };

  const handleBackToJobs = () => {
    setSelectedJobId(null);
  };

  const renderContent = () => {
    if (selectedCandidateId) {
      return (
        <CandidateDetail
          candidateId={selectedCandidateId}
          onBack={handleBackToCandidates}
          initialEditMode={candidateEditMode}
          candidateData={candidateDataForEdit}
          onSave={handleSaveCandidate}
        />
      );
    }

    if (selectedJobId) {
      return (
        <JobDetail
          jobId={selectedJobId}
          onBack={handleBackToJobs}
          onSelectCandidate={handleSelectCandidate}
        />
      );
    }

    switch (activeView) {
      case "dashboard":
        return <Dashboard onNavigate={(view) => setActiveView(view)} />;
      case "accounts":
        return <Accounts onSelectJob={handleSelectJob} />;
      case "jobs":
        return <Jobs onSelectJob={handleSelectJob} />;
      case "candidates":
        return <Candidates onSelectCandidate={handleSelectCandidate} />;
      case "sourcing":
        return <Sourcing />;
      case "recruiters":
        return <RecruiterView onSelectJob={handleSelectJob} />;
      case "intelligence":
        return <Intelligence />;
      case "inbox":
        return <Inbox onSelectCandidate={handleSelectCandidate} />;
      case "settings":
        return <Settings />;
      default:
        return <Dashboard onNavigate={(view) => setActiveView(view)} />;
    }
  };

  // Show public candidate view if accessing /candidate-review/:token
  if (isPublicCandidateView) {
    return (
      <>
        <PublicCandidateView
          shareToken={candidateShareToken}
          onClose={
            candidateShareToken === "demo-token-123"
              ? () => {
                  setIsPublicCandidateView(false);
                  setCandidateShareToken("");
                }
              : undefined
          }
        />
        <Toaster />
      </>
    );
  }

  // Show public application page if accessing /apply/:id
  if (isPublicApplyPage) {
    return (
      <>
        <PublicJobApplication jobId={publicJobId} />
        <Toaster />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-[1400px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl">AI Recruit</h1>
                <p className="text-xs text-gray-600">
                  Intelligent Hiring Platform
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowHelp(true)}
              >
                <HelpCircle className="w-4 h-4 mr-2" />
                Help
              </Button>
              <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full flex items-center justify-center text-white cursor-pointer">
                JD
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex max-w-[1400px] mx-auto">
        {/* Sidebar */}
        <aside className="w-64 min-h-[calc(100vh-73px)] bg-white border-r border-gray-200 p-6">
          <nav className="space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                activeView === item.id &&
                !selectedCandidateId &&
                !selectedJobId;
              const showBadge = item.id === "inbox";
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveView(item.id);
                    setSelectedCandidateId(null);
                    setSelectedJobId(null);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="flex-1 text-left">{item.label}</span>
                  {showBadge && (
                    <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                      3
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          <div className="mt-8 p-4 bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg">
            <div className="flex items-start gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-purple-600 flex-shrink-0" />
              <div>
                <p className="text-sm">AI-Powered Insights</p>
                <p className="text-xs text-gray-600 mt-1">
                  Get intelligent recommendations for your hiring process
                </p>
              </div>
            </div>
            <Button size="sm" className="w-full">
              Learn More
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">{renderContent()}</main>
      </div>
      <Toaster />

      {/* Help Dialog */}
      <Dialog open={showHelp} onOpenChange={setShowHelp}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-blue-600" />
              Help & Support
            </DialogTitle>
            <DialogDescription>
              Get help with AI Recruit and learn how to use the platform
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <h3 className="text-sm mb-1">📚 Documentation</h3>
                <p className="text-xs text-gray-600">
                  Browse comprehensive guides and tutorials
                </p>
              </div>
              <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <h3 className="text-sm mb-1">🎥 Video Tutorials</h3>
                <p className="text-xs text-gray-600">
                  Watch step-by-step video guides
                </p>
              </div>
              <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <h3 className="text-sm mb-1">💬 Contact Support</h3>
                <p className="text-xs text-gray-600">
                  Reach out to our support team
                </p>
              </div>
              <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <h3 className="text-sm mb-1">🔥 What's New</h3>
                <p className="text-xs text-gray-600">
                  See the latest features and updates
                </p>
              </div>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <h3 className="text-sm mb-2">🎯 Demo: Client Review Page</h3>
              <p className="text-xs text-gray-600 mb-3">
                Preview the public candidate review page (no login required)
              </p>
              <div className="space-y-2">
                <Button
                  size="sm"
                  className="w-full"
                  onClick={() => {
                    setIsPublicCandidateView(true);
                    setCandidateShareToken("demo-token-123");
                    setShowHelp(false);
                  }}
                >
                  Open Demo Review Page
                </Button>
                <p className="text-xs text-gray-500 text-center">
                  or copy: /candidate-review/demo-token-123
                </p>
              </div>
            </div>
            <div className="p-4 bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg border border-purple-200">
              <h3 className="text-sm mb-2 flex items-center gap-2">
                <Search className="w-4 h-4 text-purple-600" />✨ NEW: AI
                Sourcing Demo
              </h3>
              <p className="text-xs text-gray-600 mb-3">
                Learn how to find candidates from LinkedIn, GitHub, and other
                platforms
              </p>
              <div className="space-y-2">
                <Button
                  size="sm"
                  className="w-full bg-purple-600 hover:bg-purple-700"
                  onClick={() => {
                    setActiveView("sourcing");
                    setShowHelp(false);
                  }}
                >
                  Try AI Sourcing Now
                </Button>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div className="p-2 bg-white rounded border border-purple-100 text-center">
                    <div className="text-xs text-purple-900">Search</div>
                    <div className="text-[10px] text-purple-600">
                      Multi-platform
                    </div>
                  </div>
                  <div className="p-2 bg-white rounded border border-purple-100 text-center">
                    <div className="text-xs text-purple-900">Enrich</div>
                    <div className="text-[10px] text-purple-600">
                      Contact info
                    </div>
                  </div>
                  <div className="p-2 bg-white rounded border border-purple-100 text-center">
                    <div className="text-xs text-purple-900">Automate</div>
                    <div className="text-[10px] text-purple-600">
                      Save searches
                    </div>
                  </div>
                  <div className="p-2 bg-white rounded border border-purple-100 text-center">
                    <div className="text-xs text-purple-900">Analytics</div>
                    <div className="text-[10px] text-purple-600">
                      Track results
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="text-sm mb-2">🤖 AI Assistant</h3>
              <p className="text-xs text-gray-600 mb-3">
                Get instant answers to your questions from our AI assistant
              </p>
              <Button size="sm" className="w-full">
                Chat with AI Assistant
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

import { useState, useEffect } from "react";
import {
  Sparkles,
  MapPin,
  Briefcase,
  GraduationCap,
  FileText,
  Building2,
  CheckCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Separator } from "./ui/separator";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { toast } from "sonner";

interface PublicCandidateViewProps {
  shareToken?: string;
  onClose?: () => void;
}

export function PublicCandidateView({
  shareToken,
  onClose,
}: PublicCandidateViewProps) {
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  // Mock candidate data (in real app, fetch based on shareToken)
  const candidate = {
    id: 1,
    identifier: "Candidate #A847",
    title: "Senior Full Stack Developer",
    location: "San Francisco Bay Area",
    experience: "8 years",
    skills: [
      "React",
      "Node.js",
      "Python",
      "AWS",
      "MongoDB",
      "TypeScript",
      "Docker",
      "GraphQL",
    ],
    aiMatchScore: 94,
    summary:
      "Highly skilled full-stack developer with 8 years of experience building scalable web applications. Proven track record of leading technical teams and delivering complex projects on time.",
    workHistory: [
      {
        company: "Major Tech Company",
        role: "Senior Software Engineer",
        period: "2021 - Present",
        description:
          "Led development of microservices architecture serving 2M+ users. Mentored team of 5 junior developers.",
      },
      {
        company: "Technology Startup",
        role: "Full Stack Developer",
        period: "2018 - 2021",
        description:
          "Built and maintained core product features using React and Node.js. Improved application performance by 40%.",
      },
      {
        company: "Software Solutions Company",
        role: "Web Developer",
        period: "2017 - 2018",
        description:
          "Developed client-facing web applications and RESTful APIs. Collaborated with design team on UX improvements.",
      },
    ],
    education: "BS Computer Science, Top-tier University",
  };

  const interviewQuestions = [
    {
      category: "Technical Skills",
      questions: [
        "Rate the candidate's proficiency in React and modern frontend frameworks",
        "Assess their backend development experience (Node.js, Python)",
        "Evaluate their cloud infrastructure knowledge (AWS)",
      ],
    },
    {
      category: "Experience & Leadership",
      questions: [
        "Does their work history demonstrate progressive responsibility?",
        "Have they shown evidence of leading teams or mentoring?",
        "Do they have experience with large-scale systems?",
      ],
    },
    {
      category: "Cultural Fit",
      questions: [
        "Would this candidate fit well with your team culture?",
        "Do they demonstrate the values your organization prioritizes?",
      ],
    },
  ];

  const handleSubmitFeedback = () => {
    if (!feedback.trim() && rating === null) {
      toast.error("Please provide feedback or a rating");
      return;
    }

    // In real app, submit to backend
    setSubmitted(true);
    toast.success("Feedback submitted successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 space-y-6">
        {/* Header */}
        <Card>
          <CardHeader className="border-b">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <CardTitle className="text-2xl">
                    Candidate Profile Review
                  </CardTitle>
                  {shareToken === "demo-token-123" && (
                    <Badge variant="outline" className="text-xs">
                      Demo Mode
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-gray-600">
                  Please review this candidate's profile and provide your
                  feedback
                </p>
              </div>
              <Badge variant="secondary" className="text-sm">
                Anonymized Profile
              </Badge>
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Candidate Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {candidate.identifier}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg mb-2">{candidate.title}</h3>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {candidate.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Briefcase className="w-4 h-4" />
                      {candidate.experience}
                    </div>
                  </div>
                </div>

                <Separator />

                {/* AI Match Score */}
                <div>
                  <p className="text-sm mb-3">AI Match Score</p>
                  <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-purple-600" />
                        <span>Overall Match</span>
                      </div>
                      <span className="text-purple-600">
                        {candidate.aiMatchScore}%
                      </span>
                    </div>
                    <Progress value={candidate.aiMatchScore} className="h-2" />
                  </div>
                </div>

                <Separator />

                {/* Summary */}
                <div>
                  <p className="text-sm mb-2">Professional Summary</p>
                  <p className="text-gray-700">{candidate.summary}</p>
                </div>

                <Separator />

                {/* Skills */}
                <div>
                  <p className="text-sm mb-3">Technical Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {candidate.skills.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Work History */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="w-5 h-5" />
                  Work Experience
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {candidate.workHistory.map((job, index) => (
                  <div key={index}>
                    {index > 0 && <Separator className="my-6" />}
                    <div>
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-medium">{job.role}</h4>
                          <p className="text-sm text-gray-600">{job.company}</p>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {job.period}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-700 mt-2">
                        {job.description}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Education */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5" />
                  Education
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{candidate.education}</p>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Feedback */}
          <div className="space-y-6">
            <Card className={submitted ? "border-green-500 bg-green-50" : ""}>
              <CardHeader>
                <CardTitle className="text-lg">
                  {submitted ? (
                    <div className="flex items-center gap-2 text-green-700">
                      <CheckCircle className="w-5 h-5" />
                      Feedback Submitted
                    </div>
                  ) : (
                    "Provide Feedback"
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {!submitted ? (
                  <>
                    <div>
                      <Label className="text-sm mb-2 block">
                        Overall Rating
                      </Label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={() => setRating(star)}
                            className={`w-10 h-10 rounded border-2 transition-colors ${
                              rating && star <= rating
                                ? "bg-yellow-400 border-yellow-500 text-white"
                                : "border-gray-300 hover:border-yellow-400"
                            }`}
                          >
                            ⭐
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="feedback" className="text-sm mb-2 block">
                        Comments & Feedback
                      </Label>
                      <Textarea
                        id="feedback"
                        placeholder="Share your thoughts about this candidate..."
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        rows={6}
                      />
                    </div>

                    <Button onClick={handleSubmitFeedback} className="w-full">
                      Submit Feedback
                    </Button>
                  </>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-sm text-gray-600">
                      Thank you for your feedback! The recruiting team will
                      review your input.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Interview Guide */}
            {!submitted && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Interview Guide</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600">
                    Consider these areas when evaluating the candidate:
                  </p>
                  {interviewQuestions.map((section, idx) => (
                    <div key={idx}>
                      <p className="text-sm mb-2">{section.category}</p>
                      <ul className="text-xs text-gray-600 space-y-1 list-disc list-inside">
                        {section.questions.map((q, qIdx) => (
                          <li key={qIdx}>{q}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Demo Helper */}
        {shareToken === "demo-token-123" && onClose && (
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="text-sm mb-1">
                      Demo Mode - Client Review Flow
                    </h4>
                    <p className="text-xs text-gray-600 mb-3">
                      This is how your clients will see candidate profiles when
                      you send them for review. To test the full flow in your
                      app:
                    </p>
                    <ol className="text-xs text-gray-600 space-y-1 list-decimal list-inside mb-4">
                      <li>Go to Jobs → Select a job → Candidate Pipeline</li>
                      <li>
                        In the Screening column, select candidates with
                        checkboxes
                      </li>
                      <li>Click "Send to Client" to generate review links</li>
                      <li>
                        Share those links with your clients (no login required)
                      </li>
                    </ol>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={onClose}
                      className="w-full sm:w-auto"
                    >
                      ← Back to Main App
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

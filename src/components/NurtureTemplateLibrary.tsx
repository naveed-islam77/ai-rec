import {
  Award,
  Briefcase,
  Copy,
  Edit,
  Eye,
  Heart,
  Mail,
  MessageCircle,
  Search,
  Sparkles,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

interface EmailTemplate {
  id: string;
  name: string;
  category: string;
  subject: string;
  body: string;
  tags: string[];
  usageCount: number;
  avgOpenRate: number;
  avgClickRate: number;
  isFavorite: boolean;
}

interface NurtureTemplateLibraryProps {
  onSelectTemplate: (template: EmailTemplate) => void;
  onClose: () => void;
}

export default function NurtureTemplateLibrary({
  onSelectTemplate,
  onClose,
}: NurtureTemplateLibraryProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [previewTemplate, setPreviewTemplate] = useState<EmailTemplate | null>(
    null
  );

  const templates: EmailTemplate[] = [
    {
      id: "1",
      name: "Welcome to Our Network",
      category: "welcome",
      subject: "Welcome to {{companyName}}, {{firstName}}!",
      body: `Hi {{firstName}},

Welcome to our talent network! We're thrilled to have you here.

At {{companyName}}, we connect amazing professionals like you with opportunities that match your skills and career goals.

Here's what you can expect:
• Personalized job matches based on your profile
• Career advice and industry insights
• Direct communication with our expert recruiters
• Access to exclusive opportunities

We've already started looking for roles that fit your background in {{role}}.

Looking forward to working together!

Best regards,
{{recruiterName}}
{{companyName}}`,
      tags: ["onboarding", "introduction", "first-contact"],
      usageCount: 234,
      avgOpenRate: 71,
      avgClickRate: 28,
      isFavorite: true,
    },
    {
      id: "2",
      name: "Job Match Alert",
      category: "job-match",
      subject: "🎯 Perfect match: {{jobTitle}} at {{jobCompany}}",
      body: `Hi {{firstName}},

I found a role that's a perfect fit for your background!

📋 Position: {{jobTitle}}
🏢 Company: {{jobCompany}}
📍 Location: {{jobLocation}}
💰 Salary: {{jobSalary}}

Why this is a great fit:
✓ Matches your {{yearsExperience}} years of experience in {{role}}
✓ Requires your core skills: {{topSkills}}
✓ Aligns with your preferences ({{preferences}})

{{jobDescription}}

This is an exclusive opportunity and they're moving quickly. 

Are you interested in learning more? Just reply to this email and I'll send you the full details.

Best,
{{recruiterName}}`,
      tags: ["job-alert", "matching", "opportunity"],
      usageCount: 567,
      avgOpenRate: 83,
      avgClickRate: 47,
      isFavorite: true,
    },
    {
      id: "3",
      name: "Check-in Email",
      category: "engagement",
      subject: "Quick check-in, {{firstName}}",
      body: `Hi {{firstName}},

Hope you're doing well! I wanted to check in and see how things are going.

It's been {{daysSinceLastContact}} days since we last connected, and I wanted to make sure we're still aligned on your job search.

Quick questions:
• Are you still open to new opportunities?
• Have your preferences changed at all?
• Is there anything specific you're looking for right now?

No pressure at all - just want to make sure I'm sending you the most relevant opportunities.

Looking forward to hearing from you!

Best,
{{recruiterName}}`,
      tags: ["check-in", "engagement", "update"],
      usageCount: 445,
      avgOpenRate: 58,
      avgClickRate: 19,
      isFavorite: false,
    },
    {
      id: "4",
      name: "Re-engagement Campaign",
      category: "reengagement",
      subject: "We miss you, {{firstName}}! 👋",
      body: `Hi {{firstName}},

It's been a while since we last connected, and I wanted to reach out!

The market has been really active lately, especially for {{role}} professionals. I've been seeing some great opportunities that might interest you.

I'd love to reconnect and learn about:
• What you've been up to
• If you're open to exploring new opportunities
• What kind of roles would excite you right now

Even if you're not actively looking, staying in touch helps me send better opportunities your way when the time is right.

Want to catch up over a quick call this week?

Best,
{{recruiterName}}`,
      tags: ["re-engagement", "inactive", "reconnect"],
      usageCount: 334,
      avgOpenRate: 42,
      avgClickRate: 15,
      isFavorite: false,
    },
    {
      id: "5",
      name: "Career Advice - Skill Development",
      category: "value-add",
      subject: "Growing as a {{role}}: Skills to focus on in 2024",
      body: `Hi {{firstName}},

I wanted to share some insights that might be valuable for your career growth.

Based on current market trends, here are the top skills companies are looking for in {{role}} professionals:

1. {{skill1}} - 78% of job postings mention this
2. {{skill2}} - Growing 45% year-over-year
3. {{skill3}} - Average salary increase of $15K

You already have strong experience in {{currentSkills}}, which puts you in a great position.

Resources to level up:
📚 [Recommended course on {{skill1}}]
🎓 [Free certification for {{skill2}}]
💼 [Industry report on {{role}} trends]

I'm always here if you want to discuss your career path or explore opportunities that help you grow these skills.

Best,
{{recruiterName}}`,
      tags: ["career-advice", "value-add", "education"],
      usageCount: 198,
      avgOpenRate: 65,
      avgClickRate: 31,
      isFavorite: true,
    },
    {
      id: "6",
      name: "Company Culture Spotlight",
      category: "value-add",
      subject: "Inside look: What it's like to work at {{featuredCompany}}",
      body: `Hi {{firstName}},

I thought you'd be interested in this inside look at {{featuredCompany}}.

They're one of our partner companies and known for:
🌟 {{cultureTrait1}}
💡 {{cultureTrait2}}
🚀 {{cultureTrait3}}

What employees say:
"{{employeeQuote1}}" - {{employeeRole1}}
"{{employeeQuote2}}" - {{employeeRole2}}

Current benefits package:
• {{benefit1}}
• {{benefit2}}
• {{benefit3}}

We have {{openRoles}} open positions with them right now, including {{relevantRole}}.

Interested in learning more?

Best,
{{recruiterName}}`,
      tags: ["company-culture", "value-add", "insider"],
      usageCount: 156,
      avgOpenRate: 61,
      avgClickRate: 24,
      isFavorite: false,
    },
    {
      id: "7",
      name: "Interview Preparation",
      category: "interview",
      subject: "Prep guide for your {{companyName}} interview",
      body: `Hi {{firstName}},

Congrats on your upcoming interview with {{companyName}}!

Here's everything you need to prepare:

📅 Interview Details:
• Date: {{interviewDate}}
• Time: {{interviewTime}}
• Format: {{interviewFormat}}
• Interviewer: {{interviewerName}}, {{interviewerTitle}}

🔍 Research these topics:
1. {{researchTopic1}}
2. {{researchTopic2}}
3. {{researchTopic3}}

❓ Questions they typically ask:
• {{commonQuestion1}}
• {{commonQuestion2}}
• {{commonQuestion3}}

💡 Pro tips:
✓ {{tip1}}
✓ {{tip2}}
✓ {{tip3}}

Questions to ask them:
• {{candidateQuestion1}}
• {{candidateQuestion2}}

You've got this! Call me if you need anything.

Best,
{{recruiterName}}`,
      tags: ["interview", "preparation", "coaching"],
      usageCount: 289,
      avgOpenRate: 89,
      avgClickRate: 52,
      isFavorite: true,
    },
    {
      id: "8",
      name: "Salary Insights",
      category: "value-add",
      subject: "💰 {{role}} salary insights for {{location}}",
      body: `Hi {{firstName}},

I pulled together some salary data that might be useful for you.

{{role}} compensation in {{location}}:

Entry Level (0-2 years):
• Base: {{entryBase}}
• Total comp: {{entryTotal}}

Mid Level (3-5 years):
• Base: {{midBase}}  
• Total comp: {{midTotal}}

Senior Level (6+ years):
• Base: {{seniorBase}}
• Total comp: {{seniorTotal}}

Based on your {{yearsExperience}} years of experience, you should be targeting: {{targetRange}}

Top-paying companies for {{role}}:
1. {{topCompany1}} - {{topSalary1}}
2. {{topCompany2}} - {{topSalary2}}
3. {{topCompany3}} - {{topSalary3}}

Let me know if you'd like to discuss opportunities in this range!

Best,
{{recruiterName}}`,
      tags: ["salary", "value-add", "market-data"],
      usageCount: 412,
      avgOpenRate: 76,
      avgClickRate: 38,
      isFavorite: true,
    },
    {
      id: "9",
      name: "Referral Request",
      category: "referral",
      subject: "Know anyone perfect for this {{jobTitle}} role?",
      body: `Hi {{firstName}},

I have an amazing opportunity that might not be right for you, but I thought you might know someone who'd be interested.

The role:
📋 {{jobTitle}} at {{companyName}}
📍 {{location}}
💰 {{salaryRange}}

Ideal candidate:
• {{requirement1}}
• {{requirement2}}
• {{requirement3}}

If you refer someone who gets hired, you'll receive:
🎁 {{referralBonus}} referral bonus
⭐ Priority access to future opportunities
🤝 My eternal gratitude!

Know anyone who might be a fit? Just reply with their info or forward them this email.

Thanks!
{{recruiterName}}`,
      tags: ["referral", "network", "bonus"],
      usageCount: 167,
      avgOpenRate: 54,
      avgClickRate: 22,
      isFavorite: false,
    },
    {
      id: "10",
      name: "Success Story",
      category: "social-proof",
      subject: "How we helped {{candidateName}} land their dream job",
      body: `Hi {{firstName}},

I wanted to share a success story that might resonate with you.

Meet {{candidateName}}:
• Background: {{background}}
• Was looking for: {{lookingFor}}
• Challenge: {{challenge}}

How we helped:
✓ {{howWeHelped1}}
✓ {{howWeHelped2}}
✓ {{howWeHelped3}}

The result:
🎉 Landed {{newRole}} at {{newCompany}}
💰 {{salaryIncrease}} salary increase
😊 "{{testimonial}}"

We've helped {{numberPlaced}} {{role}} professionals find their ideal roles this year.

Want to explore what we can do for you?

Best,
{{recruiterName}}`,
      tags: ["social-proof", "testimonial", "success"],
      usageCount: 223,
      avgOpenRate: 68,
      avgClickRate: 29,
      isFavorite: false,
    },
  ];

  const categories = [
    { id: "all", name: "All Templates", icon: Mail, count: templates.length },
    {
      id: "welcome",
      name: "Welcome",
      icon: Heart,
      count: templates.filter((t) => t.category === "welcome").length,
    },
    {
      id: "job-match",
      name: "Job Matches",
      icon: Briefcase,
      count: templates.filter((t) => t.category === "job-match").length,
    },
    {
      id: "engagement",
      name: "Engagement",
      icon: MessageCircle,
      count: templates.filter((t) => t.category === "engagement").length,
    },
    {
      id: "reengagement",
      name: "Re-engagement",
      icon: Users,
      count: templates.filter((t) => t.category === "reengagement").length,
    },
    {
      id: "value-add",
      name: "Value-Add",
      icon: Award,
      count: templates.filter((t) => t.category === "value-add").length,
    },
    {
      id: "interview",
      name: "Interview",
      icon: Star,
      count: templates.filter((t) => t.category === "interview").length,
    },
  ];

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch =
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
    const matchesCategory =
      selectedCategory === "all" || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const topPerformers = [...templates]
    .sort((a, b) => b.avgOpenRate - a.avgOpenRate)
    .slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="flex items-center gap-2">
            <Mail className="w-6 h-6 text-blue-600" />
            Email Template Library
          </h2>
          <p className="text-muted-foreground">
            {templates.length} pre-built templates to accelerate your campaigns
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Sparkles className="w-4 h-4 mr-2" />
            Generate with AI
          </Button>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Search templates by name, subject, or tags..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Top Performers */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-green-600" />
            Top Performing Templates
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-3">
            {topPerformers.map((template, index) => (
              <div key={template.id} className="border rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary" className="text-xs">
                    #{index + 1}
                  </Badge>
                  <span className="text-sm font-medium truncate">
                    {template.name}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {template.avgOpenRate}%
                  </span>
                  <span>Used {template.usageCount}x</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Categories & Templates */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Categories Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Categories</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <Button
                    key={category.id}
                    variant={
                      selectedCategory === category.id ? "default" : "ghost"
                    }
                    className="w-full justify-start"
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {category.name}
                    <Badge variant="secondary" className="ml-auto text-xs">
                      {category.count}
                    </Badge>
                  </Button>
                );
              })}
            </CardContent>
          </Card>
        </div>

        {/* Templates Grid */}
        <div className="lg:col-span-3">
          {filteredTemplates.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <Mail className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="font-semibold mb-2">No templates found</h3>
                <p className="text-sm text-muted-foreground">
                  Try adjusting your search or filters
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {filteredTemplates.map((template) => (
                <Card
                  key={template.id}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <CardTitle className="text-base">
                            {template.name}
                          </CardTitle>
                          {template.isFavorite && (
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          )}
                        </div>
                        <CardDescription className="line-clamp-1">
                          {template.subject}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {/* Tags */}
                      <div className="flex flex-wrap gap-1">
                        {template.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      {/* Stats */}
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {template.avgOpenRate}% open
                        </span>
                        <span className="flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" />
                          {template.avgClickRate}% click
                        </span>
                        <span>Used {template.usageCount} times</span>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 pt-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setPreviewTemplate(template)}
                            >
                              <Eye className="w-3 h-3 mr-1" />
                              Preview
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>{template.name}</DialogTitle>
                              <DialogDescription>
                                Preview and customize this template
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <Label>Subject Line</Label>
                                <Input
                                  value={template.subject}
                                  readOnly
                                  className="mt-1"
                                />
                              </div>
                              <div>
                                <Label>Email Body</Label>
                                <Textarea
                                  value={template.body}
                                  readOnly
                                  rows={15}
                                  className="mt-1 font-mono text-sm"
                                />
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  onClick={() => {
                                    onSelectTemplate(template);
                                    toast.success(
                                      "Template copied to campaign"
                                    );
                                  }}
                                >
                                  <Copy className="w-4 h-4 mr-2" />
                                  Use This Template
                                </Button>
                                <Button variant="outline">
                                  <Edit className="w-4 h-4 mr-2" />
                                  Customize
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>

                        <Button
                          size="sm"
                          onClick={() => {
                            onSelectTemplate(template);
                            toast.success("Template added to campaign");
                          }}
                        >
                          <Copy className="w-3 h-3 mr-1" />
                          Use Template
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import { Bot, Send, Upload } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import {
  JobApplicationChatbotProps,
  Message,
} from "../ts/job-application-chatbot";
import PersonalInformations from "./job-application-chatbot/personal-information";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import { useUploadResumeMutation } from "../redux/services/job-application-chatbot";

export function JobApplicationChatbot({
  jobId,
  jobTitle,
  jobDescription,
  companyName,
  onClose,
}: JobApplicationChatbotProps) {
  const [uploadResume, { isLoading }] = useUploadResumeMutation();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: Date.now(),
      from: "bot",
      content: `Hello! 👋 Thank you for your interest in the **${jobTitle}** position at **${companyName}**.\n\nI'm here to help you through the application process. Let's get started!\n\nPlease upload your resume/CV, and I'll parse it to pre-fill your application.`,
      timestamp: new Date().toLocaleTimeString(),
      type: "text",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [parsedData, setParsedData] = useState<any>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedData, setEditedData] = useState<any>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const addMessage = (
    from: "bot" | "user",
    content: string,
    type: "text" | "file" | "parsed-data" = "text",
    data?: any
  ) => {
    setMessages((prev) => {
      const newMessage: Message = {
        id: Date.now() + Math.random(),
        from,
        content,
        timestamp: new Date().toLocaleTimeString(),
        type,
        data,
      };
      return [...prev, newMessage];
    });
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // setIsUploading(true);
    addMessage("user", `Uploaded: ${file.name}`, "file");
    const formData = new FormData();
    formData.append("file", file);

    uploadResume(formData)
      .unwrap()
      .then((response) => {
        console.log("Upload response:", response);
        setParsedData(response.data);
        setEditedData(response.data);

        addMessage(
          "bot",
          "Perfect! ✅ I've successfully parsed your resume. Here's what I extracted:",
          "parsed-data",
          response.data
        );

        setTimeout(() => {
          addMessage(
            "bot",
            'Please review the information above and make any necessary edits. Once you\'re happy with it, click the "Submit Application" button.'
          );
        }, 1000);
      })
      .catch((error) => {
        console.error("Upload error:", error);
        toast.error("Failed to upload resume");
      });

    setTimeout(() => {
      addMessage(
        "bot",
        "Great! I'm parsing your resume now... This will just take a moment. ⏳"
      );
    }, 200);

    // setTimeout(async () => {
    //   // setIsUploading(false);
    //   // setIsParsing(true);

    //   // Simulate AI parsing
    //   setTimeout(() => {
    //     const mockParsedData = {
    //       personalInfo: {
    //         fullName: "John Doe",
    //         email: "john.doe@email.com",
    //         phone: "+1 (555) 123-4567",
    //         location: "San Francisco, CA",
    //         linkedin: "linkedin.com/in/johndoe",
    //       },
    //       summary:
    //         "Experienced software engineer with 5+ years of experience in full-stack development. Passionate about building scalable web applications and leading technical teams.",
    //       experience: [
    //         {
    //           company: "Tech Corp Inc.",
    //           position: "Senior Software Engineer",
    //           duration: "2021 - Present",
    //           description:
    //             "Led development of microservices architecture, mentored junior developers, and improved system performance by 40%.",
    //         },
    //         {
    //           company: "StartupXYZ",
    //           position: "Software Engineer",
    //           duration: "2019 - 2021",
    //           description:
    //             "Built core features for SaaS platform using React and Node.js.",
    //         },
    //       ],
    //       education: [
    //         {
    //           degree: "BS Computer Science",
    //           institution: "Stanford University",
    //           year: "2019",
    //         },
    //       ],
    //       skills: [
    //         "React",
    //         "Node.js",
    //         "TypeScript",
    //         "Python",
    //         "AWS",
    //         "Docker",
    //         "PostgreSQL",
    //       ],
    //     };

    //     setParsedData(mockParsedData);
    //     setEditedData(mockParsedData);
    //     setIsParsing(false);

    //     addMessage(
    //       "bot",
    //       "Perfect! ✅ I've successfully parsed your resume. Here's what I extracted:",
    //       "parsed-data",
    //       mockParsedData
    //     );

    //     setTimeout(() => {
    //       addMessage(
    //         "bot",
    //         'Please review the information above and make any necessary edits. Once you\'re happy with it, click the "Submit Application" button.'
    //       );
    //     }, 1000);
    //   }, 2000);
    // }, 500);
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    addMessage("user", inputMessage);
    const userQuery = inputMessage.toLowerCase();
    setInputMessage("");

    // Simple Q&A about the job
    setTimeout(() => {
      if (
        userQuery.includes("salary") ||
        userQuery.includes("compensation") ||
        userQuery.includes("pay")
      ) {
        addMessage(
          "bot",
          "The salary range for this position is competitive and will be discussed during the interview process. We also offer comprehensive benefits including health insurance, 401(k) matching, and flexible work arrangements."
        );
      } else if (
        userQuery.includes("remote") ||
        userQuery.includes("work from home") ||
        userQuery.includes("location")
      ) {
        addMessage(
          "bot",
          "This position offers flexible remote work options. Our team operates with a hybrid model, with optional office days for collaboration."
        );
      } else if (
        userQuery.includes("experience") ||
        userQuery.includes("requirement") ||
        userQuery.includes("qualification")
      ) {
        addMessage(
          "bot",
          `For the ${jobTitle} role, we're looking for candidates with relevant experience in the field. The specific requirements are detailed in the job description. Would you like me to highlight any particular aspect?`
        );
      } else if (userQuery.includes("team") || userQuery.includes("culture")) {
        addMessage(
          "bot",
          "Our team values collaboration, innovation, and continuous learning. We foster an inclusive environment where everyone's ideas are valued. You'll be working with a diverse group of talented professionals."
        );
      } else if (
        userQuery.includes("interview") ||
        userQuery.includes("process") ||
        userQuery.includes("next steps")
      ) {
        addMessage(
          "bot",
          "After you submit your application, our recruiting team will review it within 3-5 business days. If selected, you'll be invited for an initial phone screen, followed by technical interviews and a final round with the team."
        );
      } else if (
        userQuery.includes("start") ||
        userQuery.includes("when") ||
        userQuery.includes("begin")
      ) {
        addMessage(
          "bot",
          "The start date is flexible and can be discussed during the interview process. We typically aim to onboard new hires within 2-4 weeks of accepting an offer."
        );
      } else {
        addMessage(
          "bot",
          `I'd be happy to help answer that! For detailed questions about the role, you can also reach out to our recruiting team after submitting your application. Is there anything specific about the ${jobTitle} position you'd like to know?`
        );
      }
    }, 500);
  };

  const handleSubmitApplication = async () => {
    setIsSubmitting(true);

    try {
      // In a real implementation, this would send to the backend
      await new Promise((resolve) => setTimeout(resolve, 1500));

      addMessage(
        "bot",
        `🎉 Excellent! Your application for the **${jobTitle}** position has been successfully submitted!\n\nHere's what happens next:\n\n✅ Our recruiting team will review your application within 3-5 business days\n✅ If your profile matches our requirements, we'll reach out to schedule an interview\n✅ You'll receive email updates about your application status\n\nThank you for your interest in joining ${companyName}! We're excited to learn more about you. Good luck! 🚀`
      );

      toast.success("Application submitted successfully!");

      setTimeout(() => {
        onClose();
      }, 5000);
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error("Failed to submit application");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateField = (section: string, field: string, value: any) => {
    setEditedData((prev: any) => {
      if (!section) {
        return {
          ...prev,
          [field]: value,
        };
      }

      return {
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value,
        },
      };
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl h-[90vh] flex flex-col">
        <CardHeader className="border-b">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-blue-600" />
                Apply for {jobTitle}
              </CardTitle>
              <p className="text-sm text-gray-600 mt-1">{companyName}</p>
            </div>
            <Button variant="outline" size="sm" onClick={onClose}>
              Close
            </Button>
          </div>
        </CardHeader>

        <CardContent className="flex-1 p-0 flex flex-col overflow-hidden">
          {/* Messages Area */}
          <div
            className="flex-1 overflow-y-auto p-6 scroll-smooth"
            ref={scrollRef}
            style={{ scrollbarGutter: "stable" }}
          >
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.from === "bot" ? "justify-start" : "justify-end"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-4 ${
                      message.from === "bot"
                        ? "bg-gray-100 text-gray-900"
                        : "bg-blue-600 text-white"
                    }`}
                  >
                    {message.from === "bot" && (
                      <div className="flex items-center gap-2 mb-2">
                        <Bot className="w-4 h-4 text-blue-600" />
                        <span className="text-xs">AI Assistant</span>
                      </div>
                    )}

                    {message.type === "parsed-data" && message.data ? (
                      <div className="space-y-4">
                        <p className="text-sm mb-3">{message.content}</p>

                        <PersonalInformations
                          isEditMode={isEditMode}
                          setIsEditMode={setIsEditMode}
                          editedData={editedData}
                          handleUpdateField={handleUpdateField}
                          setEditedData={setEditedData}
                          handleSubmitApplication={handleSubmitApplication}
                          isSubmitting={isSubmitting}
                        />
                      </div>
                    ) : (
                      <p className="text-sm whitespace-pre-line">
                        {message.content}
                      </p>
                    )}

                    <p className="text-xs mt-2 opacity-70">
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-lg p-4 max-w-[80%]">
                    <p className="text-sm text-gray-600">Uploading file...</p>
                  </div>
                </div>
              )}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-lg p-4 max-w-[80%]">
                    <p className="text-sm text-gray-600">
                      Parsing resume with AI...
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Input Area */}
          <div className="p-4 bg-gray-50">
            {!parsedData ? (
              <div className="flex gap-2">
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isLoading}
                  className="flex-1"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Resume
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>
            ) : null}

            <div className="flex gap-2 mt-2">
              <Input
                placeholder="Ask me anything about this job..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                disabled={isSubmitting}
              />
              <Button
                onClick={handleSendMessage}
                size="icon"
                disabled={isSubmitting}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>

            <p className="text-xs text-gray-500 mt-2 text-center">
              Ask me about salary, work culture, interview process, or anything
              else!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

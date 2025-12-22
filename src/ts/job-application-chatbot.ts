export interface Message {
  id: number;
  from: "bot" | "user";
  content: string;
  timestamp: string;
  type?: "text" | "file" | "parsed-data";
  data?: any;
}

export interface JobApplicationChatbotProps {
  jobId: number;
  jobTitle: string;
  jobDescription: string;
  companyName: string;
  onClose: () => void;
}


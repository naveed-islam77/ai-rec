import { configureStore } from "@reduxjs/toolkit";
import { jobApplicationChatbotApi } from "../services/job-application-chatbot";

export const store = configureStore({
  reducer: {
    [jobApplicationChatbotApi.reducerPath]: jobApplicationChatbotApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(jobApplicationChatbotApi.middleware),
});

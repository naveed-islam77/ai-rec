import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery.ts";

export const jobApplicationChatbotApi = createApi({
  reducerPath: "jobApplicationChatbotApi",
  baseQuery,
  endpoints: (builder) => ({
    uploadResume: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: "/aiModel/create",
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const {
  useUploadResumeMutation
} = jobApplicationChatbotApi;

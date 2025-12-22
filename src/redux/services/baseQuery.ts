import { fetchBaseQuery as rtkFetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseQuery = rtkFetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_BACKEND_URL,
  responseHandler: async (response) => {
    const data = await response.json();
    return data;
  },
});

"use client";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL } from "../utils";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints: (builder) => ({
    getusers: builder.query({
      query: () => "/api/users",
    }),
  }),
});

export const { useGetusersQuery } = userApi;

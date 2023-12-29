"use client";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL } from "../utils";

export const projectApi = createApi({
  reducerPath: "projectApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints: (builder) => ({
    getprojects: builder.query({
      query: () => "/api/projects/getprojects",
    }),
    createproject: builder.mutation({
      query: (newProject) => ({
          url: 'api/users/projects/createproject',
          method: 'POST',
          body: newProject,
          
      })
  }),
  
  }),
});

export const { useGetprojectsQuery, useCreateprojectMutation} = projectApi;
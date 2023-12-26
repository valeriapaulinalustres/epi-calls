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
    registeruser: builder.mutation({
      query: (newUser) => ({
          url: 'api/users/register',
          method: 'POST',
          body: newUser,
          
      })
  }),
  
  }),
});

export const { useGetusersQuery, useRegisteruserMutation} = userApi;

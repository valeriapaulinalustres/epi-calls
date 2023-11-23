"use client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL } from "../utils";

export const loginApi = createApi({
  reducerPath: "loginApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (auth) => ({
        url: "api/users/login",
        method: "POST",
        body: auth,
      }),
    }),
    token: builder.mutation({
      query: (token) => ({
        url: "api/users/token",
        method: "POST",
        body: token,
      }),
    }),
    prueba: builder.query({
      query: () => "",
    }),
    // getUsers: builder.mutation({
    //     query: (token)
    // })
  }),
});

export const { useLoginMutation, usePruebaQuery, useTokenMutation } = loginApi;

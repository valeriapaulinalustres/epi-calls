'use client'

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL } from "../utils";

export const sheetApi = createApi({
    reducerPath: 'sheetApi',
    baseQuery: fetchBaseQuery({baseUrl: baseURL}),
    endpoints: (builder) => ({
        createsheet: builder.mutation({
            query: (excelAndProject) => ({
                url: 'api/sheets/createsheets',
                method: 'POST',
                body: excelAndProject,
                
            })
        }),
       
    })
})

export const {useCreatesheetMutation} = sheetApi
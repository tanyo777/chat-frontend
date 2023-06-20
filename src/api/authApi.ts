import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { IRegisterPayload, ILoginPayload } from "../types/auth";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_SERVER,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    register: builder.mutation<any, IRegisterPayload>({
      query: (payload) => ({
        url: "/register",
        method: "POST",
        body: payload,
      }),
    }),
    login: builder.mutation<any, ILoginPayload>({
      query: (payload) => ({
        url: "/login",
        method: "POST",
        body: payload,
      }),
    }),
    logout: builder.query<any, any>({
      query: (arg) => ({
        url: "/logout",
        method: "GET",
      }),
    }),
    refresh: builder.query<any, any>({
      query: (arg) => ({
        url: "/refresh",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLazyLogoutQuery,
  useLazyRefreshQuery,
} = authApi;

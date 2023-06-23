import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { IRegisterPayload, ILoginPayload } from "../types/auth";
import { envVariables } from "../config/envVars";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: envVariables.backendUrl,
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
    logout: builder.query<any, void>({
      query: (arg) => ({
        url: "/logout",
        method: "GET",
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useLazyLogoutQuery } =
  authApi;

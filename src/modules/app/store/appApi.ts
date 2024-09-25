import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import {
  RootState,
  StateFromRoot,
  dynamicMiddlewaresInstance,
  registerReducer,
} from "@/core/store"
import { AuthState } from "."
import { App } from "../interfaces"
import { Hamster } from "../interfaces/hamster"

export const baseAppApiURL = new URL(
  import.meta.env.REACT_APP_API,
  window.location.origin,
).toString()
export const appApi = createApi({
  reducerPath: "appApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${
      baseAppApiURL.endsWith("/") ? baseAppApiURL : baseAppApiURL + "/"
    }`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState<StateFromRoot<AuthState>>).auth
        .token
      if (token) {
        headers.set("Authorization", `Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes: ["LoginToken", "Hamster", "HamsterLog", "MiniGameLevelConfig"],
  endpoints: (build) => ({
    login: build.query<App.LoginRes, App.LoginReq>({
      query: () => ({
        url: `auth/login-token`,
        method: "POST",
      }),
      providesTags: ["LoginToken"],
    }),
    auth: build.query<App.AuthRes, App.AuthReq>({
      query: ({ body }) => ({
        url: `auth/check-login-long`,
        method: "POST",
        responseHandler: "text",
        body,
        timeout: 60000,
      }),
    }),
    getHamster: build.query<Hamster.HamsterRes, Hamster.HamsterReq>({
      query: () => ({
        url: `hamster`,
        method: "GET",
      }),
      providesTags: ["Hamster"],
    }),
    getHamsterLog: build.query<Hamster.HamsterLogRes, Hamster.HamsterLogReq>({
      query: () => ({
        url: `hamster/log`,
        method: "GET",
      }),
      providesTags: ["HamsterLog"],
    }),
    createHamster: build.mutation<
      Hamster.CreateHamsterRes,
      Hamster.CreateHamsterReq
    >({
      query: ({ body }) => ({
        url: `hamster`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Hamster"],
    }),
    createHamsterAdmin: build.mutation<
      Hamster.CreateHamsterRes,
      Hamster.CreateHamsterReq
    >({
      query: ({ body }) => ({
        url: `admin/hamster`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Hamster"],
    }),
    updateHamster: build.mutation<
      Hamster.UpdateHamsterRes,
      Hamster.UpdateHamsterReq
    >({
      query: ({ body }) => ({
        url: `hamster`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Hamster"],
    }),
    getMiniGameLevelConfig: build.query<
      Hamster.MiniGameLevelConfigRes,
      Hamster.MiniGameLevelConfigReq
    >({
      query: () => ({
        url: `mini-game/level-config`,
        method: "GET",
      }),
      providesTags: ["MiniGameLevelConfig"],
    }),
  }),
})
dynamicMiddlewaresInstance.addMiddleware(appApi.middleware)
registerReducer(appApi.reducerPath, appApi.reducer)

export const {
  useLoginQuery,
  useAuthQuery,
  useCreateHamsterMutation,
  useGetHamsterQuery,
  useGetHamsterLogQuery,
  useUpdateHamsterMutation,
  useCreateHamsterAdminMutation,
  useGetMiniGameLevelConfigQuery,
  useLazyGetMiniGameLevelConfigQuery,
} = appApi

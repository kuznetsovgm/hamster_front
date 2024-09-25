import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import { App } from "@app/interfaces"
import { RootState, StateFromRoot, registerReducer, store } from "@/core/store"

const STATE_KEY = "auth"
const STORAGE_KEY = STATE_KEY
export type AuthState = {
  role: App.UserRole
  token?: string
}

const defaultState = { role: App.UserRole.ANON }
const persistantState = localStorage.getItem(STORAGE_KEY)

const initialState: AuthState = persistantState
  ? JSON.parse(persistantState)
  : defaultState

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setAuth: (
      state,
      { payload: { role, token } }: PayloadAction<AuthState>,
    ) => {
      state.token = token
      state.role = role
      return state
    },
    resetAuth: () => {
      localStorage.removeItem(STORAGE_KEY)
      return defaultState
    },
  },
})
registerReducer(authSlice.name, authSlice.reducer)
store.subscribe(() => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store.getState().auth))
})

export const { setAuth, resetAuth } = authSlice.actions

export const getAuth = (state: RootState<StateFromRoot<AuthState>>) =>
  state.auth
export const getAuthToken = (state: RootState<StateFromRoot<AuthState>>) =>
  state.auth.token
export const getAuthRole = (state: RootState<StateFromRoot<AuthState>>) =>
  state.auth.role

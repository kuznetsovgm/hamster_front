import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import { Themes } from "@app/themes/interface"
import { RootState, StateFromRoot, registerReducer, store } from "@/core/store"

const STATE_KEY = "app"
export const CONFIG_KEY = `${STATE_KEY}_config`
type AppState = {
  theme?: Themes
}

const persistantState = localStorage.getItem(CONFIG_KEY)
const initialState: AppState = !!persistantState
  ? JSON.parse(persistantState)
  : {}

export const appSlice = createSlice({
  name: "app",
  initialState: initialState,
  reducers: {
    setThemeName: (state, { payload: theme }: PayloadAction<Themes>) => {
      state.theme = theme
    },
  },
})
registerReducer(appSlice.name, appSlice.reducer)
store.subscribe(() => {
  localStorage.setItem(CONFIG_KEY, JSON.stringify(store.getState().app))
})

export const { setThemeName } = appSlice.actions

export const getAppThemeName = (state: RootState<StateFromRoot<AppState>>) =>
  state.app.theme

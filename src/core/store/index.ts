import {
  ReducersMapObject,
  configureStore,
  ThunkAction,
  Action,
  AnyAction,
  combineReducers,
  StateFromReducersMapObject,
} from "@reduxjs/toolkit"
import { Reducer } from "react"
import { createDynamicMiddlewares } from "redux-dynamic-middlewares"

export const dynamicMiddlewaresInstance = createDynamicMiddlewares()
const dynamicReducers: ReducersMapObject<any, any> = {}
const emptyReducer = (state: any, action: Action) => ""

export const setupStore = () => {
  return configureStore({
    reducer: combineReducers({
      empty: emptyReducer, // remove "Store does not have a valid reducer" error from console
    }),
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(dynamicMiddlewaresInstance.enhancer),
  })
}

export const registerReducer = (
  name: string,
  reducer: Reducer<any, AnyAction>,
) => {
  dynamicReducers[name] = reducer
  store.replaceReducer(combineReducers(dynamicReducers))
}

export const store = setupStore()
export type RootState<
  S extends any = any,
  A extends Action = Action,
> = StateFromReducersMapObject<ReducersMapObject<S, A>>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore["dispatch"]
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
export type StateFromRoot<T> = { [key: string]: T }

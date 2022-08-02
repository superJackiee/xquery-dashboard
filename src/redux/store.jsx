import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"
import toogleReducer from "./slice/toogleSlice"
import projectReducer from "./slice/projectSlice"

export const store = configureStore({
  reducer: {
    toogle: toogleReducer,
    project: projectReducer
  },
  middleware: [...getDefaultMiddleware({ serializableCheck: false })]
})
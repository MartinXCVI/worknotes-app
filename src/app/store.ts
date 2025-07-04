// Redux imports
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from '../features/auth/authSlice'

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: false // Disabling Redux devtools for deployment
})

setupListeners(store.dispatch)

// 🔸 Types for hooks and usage
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
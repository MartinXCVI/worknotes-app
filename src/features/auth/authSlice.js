// Redux imports
import { createSlice } from "@reduxjs/toolkit";

/* Define a slice that generates action creator functions
and action types based on the reducer functions provided */
const authSlice = createSlice({
  name: 'auth', // Name of the slice
  initialState: { token: null }, // Initial state
  reducers: {
    setCredentials: (state, action)=> {
      const { accessToken } = action.payload
      state.token = accessToken
    },
    logOut: (state, action)=> {
      state.token = null
    },
  }
})

export const { setCredentials, logOut } = authSlice.actions

export default authSlice.reducer

export const selectCurrentToken = (state)=> state.auth.token
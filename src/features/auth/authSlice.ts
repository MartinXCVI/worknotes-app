// Types/Interfaces imports
import { IAuthState } from "@/interfaces/IAuthState";
// Redux imports
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState: IAuthState = {
  token: null
}

/* Define a slice that generates action creator functions
and action types based on the reducer functions provided */
const authSlice = createSlice({
  name: 'auth', // Name of the slice
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ accessToken: string }>)=> {
      const { accessToken } = action.payload
      state.token = accessToken
    },
    logOut: (state)=> {
      state.token = null
    },
  }
})

export const { setCredentials, logOut } = authSlice.actions

export default authSlice.reducer

export const selectCurrentToken = (state: { auth: IAuthState })=> state.auth.token
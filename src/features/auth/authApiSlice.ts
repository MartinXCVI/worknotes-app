// Types/Interfaces imports
import { ILoginRequest } from '../../interfaces/ILoginRequest'
import { ILoginResponse } from '../../interfaces/ILoginResponse'
// Redux imports
import { apiSlice } from '../../app/api/apiSlice'
import { logOut, setCredentials } from './authSlice'
import { IRefreshResponse } from '@/interfaces/IRefreshResponse'


export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation<ILoginResponse, ILoginRequest>({
      query: credentials => ({
        url: '/auth',
        method: 'POST',
        body: credentials 
      })
    }), // End of login endpoint

    sendLogout: builder.mutation<unknown, void>({
      query: ()=> ({
        url: '/auth/logout',
        method: 'POST',
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
         const { data } = await queryFulfilled
          console.log(data)
          dispatch(logOut())
          // Reseting the API state
          setTimeout(()=> {
            dispatch(apiSlice.util.resetApiState())
          }, 1000)
          dispatch(apiSlice.util.resetApiState())
        } catch(error) {
          console.error(error)
        }
      }
    }), // End of sendLogout endpoint

    refresh: builder.mutation<IRefreshResponse, void>({
      query: ()=> ({
        url: '/auth/refresh',
        method: 'GET',
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          console.log(data)
          const { accessToken } = data
          dispatch(setCredentials({ accessToken }))
        } catch(error) {
          console.error(error)
        }
      }
    }) // End of refresh endpoint

  })
  /* End of endpoints' builder */
}) // End of authApiSlice

export const {
  useLoginMutation,
  useSendLogoutMutation,
  useRefreshMutation,
} = authApiSlice
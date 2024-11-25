// Redux imports
import { apiSlice } from '../../app/api/apiSlice'
import { logOut } from './authSlice'

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: credentials => ({
        url: '/auth',
        method: 'POST',
        body: { ...credentials }
      })
    }), // End of login endpoint
    sendLogout: builder.mutation({
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
    refresh: builder.mutation({
      query: ()=> ({
        url: '/auth/refresh',
        method: 'GET',
      })
    }) // End of refresh endpoint
  })
  /* End of endpoints' builder */
})

export const {
  useLoginMutation,
  useSendLogoutMutation,
  useRefreshMutation,
} = authApiSlice
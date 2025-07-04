import { IRefreshResponse } from "@/interfaces/IRefreshResponse"
import { createApi, fetchBaseQuery, BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query/react"
import type { RootState } from '../store'
import { setCredentials } from '../../features/auth/authSlice'


const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:3500',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token

    if(token) {
      headers.set('authorization', `Bearer ${token}`)
    }
    return headers
  }
})

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
  // console.log(args) // request url, method, body
  // console.log(api) // signal, dispatch, getState()
  // console.log(extraOptions) //custom like {shout: true}

  let result = await baseQuery(args, api, extraOptions)

  // Handling the status codes
  if(result?.error?.status === 403) {
    console.log('Sending the refresh token')
    // Sending refresh token to get a new access token 
    const refreshResult = await baseQuery('/auth/refresh', api, extraOptions)

    if(refreshResult?.data) {
       const data = refreshResult.data as IRefreshResponse
      // Storing the new token 
      api.dispatch(setCredentials({ accessToken: data.accessToken }))
      // Retrying original query with the new access token
      result = await baseQuery(args, api, extraOptions)
    } else {
      // Handling the login error
      if(
        refreshResult?.error?.status === 403 &&
        refreshResult.error.data &&
        typeof refreshResult.error.data === 'object'
      ) {
        refreshResult.error.data = {
          ...refreshResult.error.data,
          message: "Your login has expired.",
        }
      }
      return refreshResult
    }
  }
  return result
}

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Note', 'User'], // for cache management
  endpoints: builder => ({}) // endpoints will be injected elsewhere
})
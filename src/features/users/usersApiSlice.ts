// Types/Interfaces imports
import { IUser } from "@/interfaces/IUser";
import { RootState } from "@/app/store";
// Redux imports
import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const usersAdapter = createEntityAdapter<IUser>({})

const initialState = usersAdapter.getInitialState()

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    /* Get users endpoint */
    getUsers: builder.query({
      query: () => ({
        url: '/users',
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError
        },
      }),
      transformResponse: (responseData: IUser[]) => {
        const loadedUsers = responseData.map(user => {
          user.id = user._id
          return user
        });
        return usersAdapter.setAll(initialState, loadedUsers)
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: 'User', id: 'LIST' },
            ...result.ids.map(id => ({ type: 'User' as const, id }))
          ]
        } else return [{ type: 'User', id: 'LIST' }]
      }
    }), // End of getUsers endpoint
    /* Add a new user endpoint */
    addNewUser: builder.mutation<void, Partial<IUser>>({
      query: initialUserData => ({
        url: '/users',
        method: 'POST',
        body: {
          ...initialUserData,
        }
      }),
      invalidatesTags: [{ type: 'User', id: "LIST" }]
    }), // End of addNewUser endpoint
    /* Update user endpoint */ 
    updateUser: builder.mutation<void, Partial<IUser> & { id: string }>({
      query: initialUserData => ({
        url: '/users',
        method: 'PATCH',
        body: {
            ...initialUserData,
        }
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'User', id: arg.id }]
    }), // End of updateUser endpoint
    /* Delete user endpoint */
    deleteUser: builder.mutation({
      query: ({ id }) => ({
        url: `/users`,
        method: 'DELETE',
        body: { id }
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'User', id: arg.id }]
    }), // End of deleteUser endpoint
  }), // End of endpoints' builder
})

export const { 
  useGetUsersQuery,
  useAddNewUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation
} = usersApiSlice

// Returns the query result object
export const selectUsersResult = usersApiSlice.endpoints.getUsers.select(undefined)

// Creates memoized selector
const selectUsersData = createSelector(
  selectUsersResult,
  usersResult => usersResult.data // normalized state object with ids & entities
)

/* getSelectors creates these selectors and 
we rename them with aliases using destructuring */
export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserIds
  // Pass in a selector that returns the users slice of state
} = usersAdapter.getSelectors<RootState>((state: any) => selectUsersData(state) ?? initialState)
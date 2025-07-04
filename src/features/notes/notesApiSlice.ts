// Types/Interfaces imports
import { INote } from "@/interfaces/INote"
// Redux imports
import { RootState } from "@/app/store"
import { createSelector, createEntityAdapter } from "@reduxjs/toolkit"
import { apiSlice } from "../../app/api/apiSlice"


const notesAdapter = createEntityAdapter<INote>({
  sortComparer: (a, b) => (a.completed === b.completed) 
  ? 0 
  : a.completed ? 1 : -1
})

const initialState = notesAdapter.getInitialState()

export const notesApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    /* Get notes endpoint */
    getNotes: builder.query({
      query: () => ({
        url: '/notes',
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError
        },
      }),
      transformResponse: (responseData: INote[]) => {
        const loadedNotes = responseData.map((note, index) => {
          return {
            ...note,
            id: note._id || `${index}`, // Fallback for an eventual missing _id
          };
        });
        return notesAdapter.setAll(initialState, loadedNotes)
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: 'Note' as const, id: 'LIST' },
            ...result.ids.map((id: string) => ({ type: 'Note' as const, id }))
          ]
        } else return [{ type: 'Note' as const, id: 'LIST' }]
      }
    }), // End of getNotes endpoint
    /* Add new note endpoint */
    addNewNote: builder.mutation({
      query: initialNote => ({
        url: '/notes',
        method: 'POST',
        body: {
            ...initialNote,
        }
      }),
      invalidatesTags: [
        { type: 'Note', id: "LIST" }
      ]
    }), // End of addNewNote endpoint
    /* Update note endpoint */
    updateNote: builder.mutation({
      query: initialNote => ({
        url: '/notes',
        method: 'PATCH',
        body: {
          ...initialNote,
        }
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Note', id: arg.id }
      ]
    }), // End of updateNote endpoint
    /* Delete note endpoint */
    deleteNote: builder.mutation({
      query: ({ id }) => ({
        url: `/notes`,
        method: 'DELETE',
        body: { id }
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Note', id: arg.id }
      ]
    }), // End of deleteNote endpoint
  }), // End of endpoints' builder
})

export const { 
  useGetNotesQuery,
  useAddNewNoteMutation,
  useUpdateNoteMutation,
  useDeleteNoteMutation
} = notesApiSlice

// Returns the query result object
export const selectNotesResult = notesApiSlice.endpoints.getNotes.select(undefined)

// Creates memoized selector
const selectNotesData = createSelector(
  selectNotesResult,
  notesResult => notesResult.data ?? initialState // normalized state object with ids & entities
)

/* getSelectors creates these selectors and
we rename them with aliases using destructuring */
export const {
  selectAll: selectAllNotes,
  selectById: selectNoteById,
  selectIds: selectNoteIds
  // Pass in a selector that returns the notes slice of state
} = notesAdapter.getSelectors<RootState>((state: any) => selectNotesData(state) ?? initialState)
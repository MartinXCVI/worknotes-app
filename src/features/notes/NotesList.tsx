// React imports
import { JSX } from 'react';
// Redux imports
import { useGetNotesQuery } from './notesApiSlice';
// Components
import Note from './Note';
// Custom hooks imports
import useAuth from '../../hooks/useAuth'
import useTitle from '../../hooks/useTitle';
// React spinners imports
import { PulseLoader } from 'react-spinners';
// Types/Interfaces imports
import { INote } from '@/interfaces/INote';


const NotesList = (): JSX.Element | null => {

  useTitle('WorkNotes: Notes List')

  const { username, isManager, isAdmin } = useAuth()

  const {
    data: notes,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetNotesQuery(
    'notesList',
    {
      pollingInterval: 15000,
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true
    }
  )

  let content: JSX.Element | null = null

  if(isLoading) {
    content = <PulseLoader color={"#FFF"} />
  }

  if(isError) {
    content = <p className="error-msg">{(error as any)?.data?.message}</p>
  }

  if(isSuccess && notes?.ids?.length) {
    const { ids, entities } = notes

    const filteredIds = (isManager || isAdmin)
      ? [...ids]
      : ids.filter((id: string) => {
          const note = entities[id] as INote | undefined
          return note?.username === username
        })

    const tableContent = filteredIds.map(
      (noteId: string): JSX.Element => <Note key={noteId} noteId={noteId} />
    )

    content = (
      <table className="table table-notes">
        <thead className="table-thead">
          <tr>
            <th scope="col" className="table-th note-status">Username</th>
            <th scope="col" className="table-th note-created">Created</th>
            <th scope="col" className="table-th note-updated">Updated</th>
            <th scope="col" className="table-th note-title">Title</th>
            <th scope="col" className="table-th note-username">Owner</th>
            <th scope="col" className="table-th note-edit">Edit</th>
          </tr>
        </thead>
        <tbody>
          {tableContent}
        </tbody>
      </table>
    )
  }

  return content
}

export default NotesList
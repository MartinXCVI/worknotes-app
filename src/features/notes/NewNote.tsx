// React imports
import { JSX } from 'react'
// Types/Interfaces imports
import { IUser } from '@/interfaces/IUser'
// Redux imports
import { useGetUsersQuery } from '../users/usersApiSlice'
// React spinners imports
import { PulseLoader } from 'react-spinners'
// New not form import
import NewNoteForm from './NewNoteForm'
// Custom hooks imports
import useTitle from '../../hooks/useTitle'


const NewNote = (): JSX.Element => {

  useTitle('WorkNotes: New Note')

  const { users } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data })=> ({
      users: data?.ids.map((id: string) => data?.entities[id]) as IUser[]
    }),
  })

  if(!users?.length) {
    return <PulseLoader color={"#FFF"} />
  }

  const content: JSX.Element = <NewNoteForm users={users} />

  return content
}

export default NewNote
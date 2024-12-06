// Redux imports
import { useGetUsersQuery } from '../users/usersApiSlice'

// React spinners imports
import { PulseLoader } from 'react-spinners'

// New not form import
import NewNoteForm from './NewNoteForm'

// Custom hooks imports
import useTitle from '../../hooks/useTitle'

const NewNote = () => {

  useTitle('WorkNotes: New Note')

  const { users } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data })=> ({
      users: data?.ids.map(id => data?.entities[id])
    }),
  })

  if(!users?.length) {
    return (
      <PulseLoader color={"#FFF"} />
    )
  }

  const content = <NewNoteForm users={users} />

  return content
}

export default NewNote
// React router imports
import { useParams } from "react-router-dom"

// Redux imports
import { useGetNotesQuery } from "./notesApiSlice"
import { useGetUsersQuery } from "../users/usersApiSlice"

// Custom hooks
import useAuth from "../../hooks/useAuth"
import useTitle from "../../hooks/useTitle"

// React spinner imports
import { PulseLoader } from "react-spinners"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLock } from "@fortawesome/free-solid-svg-icons"

// Components
import EditNoteForm from './EditNoteForm'


const EditNote = () => {

  useTitle('WorkNotes: Edit Note')

  const { id } = useParams()
  
  const { username, isManager, isAdmin } = useAuth()

  const { note } = useGetNotesQuery("notesList", {
    selectFromResult: ({ data })=> ({
      note: data?.entities[id]
    }),
  })

  const { users } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data })=> ({
      users: data?.ids.map(id => data?.entities[id])
    }),
  })

  if(!note || !users?.length) {
    return (
      <PulseLoader color={"#FFF"} />
    )
  }

  if(!isManager && !isAdmin) {
    if(note.username !== username) {
      return <p className="error-msg">No access <FontAwesomeIcon icon={faLock} /></p>
    }
  }

  const content = <EditNoteForm note={note} users={users} />

  return content
}

export default EditNote
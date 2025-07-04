// Types/Interfaces imports
import { JSX } from "react"
import { INote } from '../../interfaces/INote'
import { IUser } from '../../interfaces/IUser'
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
// Icons imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLock } from "@fortawesome/free-solid-svg-icons"
// Components
import EditNoteForm from './EditNoteForm'


const EditNote = (): JSX.Element => {

  useTitle('WorkNotes: Edit Note')

  const { id } = useParams<{ id: string }>()
  
  const { username, isManager, isAdmin } = useAuth()

  const { note } = useGetNotesQuery(undefined, {
    selectFromResult: ({ data })=> ({
      note: data?.entities[id!] as INote | undefined
    }),
  })

  const { users } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data })=> ({
      users: data?.ids.map((id: string) => data?.entities[id]) as IUser[]
    }),
  })

  if(!note || !users?.length) {
    return (
      <PulseLoader color={"#FFF"} />
    )
  }

  if(!isManager && !isAdmin && note.username !== username) {
    return <p className="error-msg">No access <FontAwesomeIcon icon={faLock} /></p>
  }

  const content: JSX.Element = <EditNoteForm note={note} users={users} />

  return content
}

export default EditNote
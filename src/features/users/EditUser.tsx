// React imports
import { JSX } from "react"
// React router imports
import { useParams } from "react-router-dom"
// React redux imports
import { useGetUsersQuery } from "./usersApiSlice"
// React spinners imports
import { PulseLoader } from "react-spinners"
// Components
import EditUserForm from "./EditUserForm"
// Custom hooks imports
import useTitle from "../../hooks/useTitle"
// Types/interfaces imports
import { IUser } from "@/interfaces/IUser"


const EditUser = (): JSX.Element => {

  useTitle('WorkNotes: Edit User')
  
  const { id } = useParams()

  if(!id) return <PulseLoader color="#fff" />
  
  const { user } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data })=> ({
      user: data?.entities[id] as IUser | undefined
    })
  })

  if(!user) return <PulseLoader color={"#fff"} />

  const content: JSX.Element = <EditUserForm user={user} />

  return content
}

export default EditUser
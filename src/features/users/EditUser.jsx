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


const EditUser = () => {

  useTitle('WorkNotes: Edit User')
  
  const { id } = useParams()
  
  const { user } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data })=> ({
      user: data?.entities[id]
    })
  })

  if(!user) {
    return (
      <PulseLoader color={"#fff"} />
    )
  }

  const content = <EditUserForm user={user} />

  return content
}

export default EditUser
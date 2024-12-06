// React router imports
import { useParams } from "react-router-dom"

// React redux imports
import { useGetUsersQuery } from "./usersApiSlice"

// React spinners imports
import { PulseLoader } from "react-spinners"

// Components
import EditUserForm from "./EditUserForm"


const EditUser = () => {
  
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
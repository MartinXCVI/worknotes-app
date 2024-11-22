// React router imports
import { useParams } from "react-router-dom"

// React redux imports
import { useSelector } from "react-redux"

// usersApiSlice imports
import { selectUserById } from './usersApiSlice'

// Components
import EditUserForm from "./EditUserForm"

const EditUser = () => {
  
  const { id } = useParams()
  const user = useSelector(state => selectUserById(state, id))
  const content = user ? <EditUserForm user={user} /> : <p>Loading...</p>

  return content
}

export default EditUser
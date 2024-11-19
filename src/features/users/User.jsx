// Font Awesome imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

// React router imports
import { useNavigate } from "react-router-dom";

// Redux imports
import { useSelector } from "react-redux";
import { selectUserById } from "./usersApiSlice";


const User = ({ userId }) => {

  const user = useSelector(state => selectUserById(state, userId))
  const navigate = useNavigate()

  if(user) {
    const handleEdit = () => navigate(`/dash/users/${userId}`)
    const userRolesString = user.roles.toString().replaceAll(',', ', ')
    const cellStatus = user.active ? '' : 'table__cell--inactive'

    return (
      <tr className="table-row user">
        <td className={`table-cell ${cellStatus}`}>{user.username}</td>
        <td className={`table-cell capital ${cellStatus}`}>{userRolesString}</td>
        <td className={`table-cell ${cellStatus}`}>
          <button
            className="icon-button table-button"
            onClick={handleEdit}
          >
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </td>
      </tr>
    )
  }
  else return null
}

export default User
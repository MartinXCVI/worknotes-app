// React imports
import { memo } from "react";

// Font Awesome imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

// React router imports
import { useNavigate } from "react-router-dom";

// Redux imports
import { useGetUsersQuery } from "./usersApiSlice";


const User = ({ userId }) => {

  const { user } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[userId]
    }),
  })

  const navigate = useNavigate()

  if(user) {
    const handleEdit = () => navigate(`/dashboard/users/${userId}`)
    const userRolesString = user.roles.toString().replaceAll(',', ', ')
    const cellStatus = user.active ? '' : 'table-cell-inactive'

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

const memoizedUser = memo(User)

export default memoizedUser
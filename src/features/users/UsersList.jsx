// Redux imports
import { useGetUsersQuery } from './usersApiSlice'

// Components
import User from './User'

// React spinners imports
import { PulseLoader } from 'react-spinners'

// Custom hooks imports
import useTitle from '../../hooks/useTitle'

const UsersList = () => {

  useTitle('WorkNotes: Users List')

  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetUsersQuery(
    'usersList',
    {
      pollingInterval: 60000,
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true
    }
  )

  let content

  if(isLoading) {
    content = <PulseLoader color={"#FFF"} />
  }

  if(isError) {
    content = <p className='error-msg'>{error?.data?.message}</p>
  }

  if (isSuccess) {
    const { ids } = users
    const tableContent = ids?.length && ids.map(userId => <User key={userId} userId={userId} />)

    content = (
      <table className="table table-users">
        <thead className="table-thead">
          <tr>
            <th scope="col" className="table-th user-username capital">username</th>
            <th scope="col" className="table-th user-roles capital">roles</th>
            <th scope="col" className="table-th user-edit capital">edit</th>
          </tr>
        </thead>
        <tbody>
          {tableContent}
        </tbody>
      </table>
    )
  }
  return content
}

export default UsersList
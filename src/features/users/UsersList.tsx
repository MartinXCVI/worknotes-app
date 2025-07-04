// React imports
import { JSX } from 'react'
// Redux imports
import { useGetUsersQuery } from './usersApiSlice'
// Components
import User from './User'
// React spinners imports
import { PulseLoader } from 'react-spinners'
// Custom hooks imports
import useTitle from '../../hooks/useTitle'

const UsersList = (): JSX.Element | null => {

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

  let content: JSX.Element | null = null

  if(isLoading) {
    content = <PulseLoader color={"#FFF"} />
  }

  if(isError) {
    content = <p className='error-msg'>{(error as any)?.data?.message}</p>
  }

  if (isSuccess && users?.ids?.length) {
    // const { ids } = users
    const tableContent = users.ids.map((userId: string) => (
      <User key={userId} userId={userId} />
    ))

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
  return content || null
}

export default UsersList
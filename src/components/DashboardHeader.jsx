// React hooks
import { useEffect } from "react"

// Font awesome icons imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons"

// React router imports
import { useNavigate, useLocation, Link } from "react-router-dom"

// Redux imports
import { useSendLogoutMutation } from '../features/auth/authApiSlice'

// RegEx constants
const dashRegEx = /^\dashboard(\/)?$/
const notesRegEx = /^\dashboard\/notes(\/)?$/
const usersRegEx = /^\dashboard\/users(\/)?$/


const DashboardHeader = () => {

  const navigate = useNavigate()
  const { pathname } = useLocation()

  const [
    sendLogout,
    {
      isLoading,
      isSuccess,
      isError,
      error
    }
  ] = useSendLogoutMutation()
  
  useEffect(()=> {
    if(isSuccess) navigate('/')
  }, [isSuccess, navigate])

  // Logout handler that calls the sendLogout function
  const handleLogoutClick = ()=> {
    sendLogout()
    navigate('/')
  }

  if(isLoading) return <p>Logging out...</p>

  if(isError) return <p>Error: {error.data?.message}</p>

  let dashboardClass = null
  
  if(!dashRegEx.test(pathname) && !notesRegEx.test(pathname) && !usersRegEx.test(pathname)) {
    dashboardClass = 'dash-header-container-small'
  }

  const logoutButton = (
    <button
      className='icon-button'
      title='Logout'
      onClick={handleLogoutClick}
    >
      <FontAwesomeIcon icon={faRightFromBracket} />
    </button>
  )

  const content = (
    <header className="dashboard-header">
      <div className={`dashboard-header-container ${dashboardClass}`}>
        <Link to="/dashboard">
          <h1 className="dashboard-header-title">workNotes</h1>
        </Link>
        <nav className="dashboard-header-nav">
          {/* add more buttons later */}
          {logoutButton}
        </nav>
      </div>
    </header>
  )
  return content
}

export default DashboardHeader
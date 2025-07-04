import { JSX } from "react"
// React hooks
import { useEffect } from "react"
// Font awesome icons imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faRightFromBracket, faUserPlus, faUserGear, faFilePen, faFileCirclePlus } from "@fortawesome/free-solid-svg-icons"
// React router imports
import { useNavigate, useLocation, Link } from "react-router-dom"
// Redux imports
import { useSendLogoutMutation } from '../features/auth/authApiSlice'
// Custom hooks imports
import useAuth from '../hooks/useAuth'
// React spinners imports
import { PulseLoader } from "react-spinners"


// RegEx constants
const dashRegEx: RegExp = /^\/dashboard(\/)?$/
const notesRegEx: RegExp = /^\/dashboard\/notes(\/)?$/
const usersRegEx: RegExp = /^\/dashboard\/users(\/)?$/


const DashboardHeader = (): JSX.Element => {

  const { isManager, isAdmin } = useAuth()

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

  const handleNewNoteClick = ()=> navigate('/dashboard/notes/new')
  const handleNewUserClick = ()=> navigate('/dashboard/users/new')
  const handleNotesClick = ()=> navigate('/dashboard/notes')
  const handleUsersClick = ()=> navigate('/dashboard/users')

  // Logout handler that calls the sendLogout function
  const handleLogoutClick = ()=> {
    sendLogout()
    navigate('/')
  }

  let dashboardClass: string | null = null
  
  if(!dashRegEx.test(pathname) && !notesRegEx.test(pathname) && !usersRegEx.test(pathname)) {
    dashboardClass = 'dash-header-container-small'
  }

  let newNoteButton: JSX.Element | null = null
  if (notesRegEx.test(pathname)) {
    newNoteButton = (
      <button
        className="icon-button"
        title="New Note"
        onClick={handleNewNoteClick}
      >
        <FontAwesomeIcon icon={faFileCirclePlus} />
      </button>
    )
  }

  let newUserButton: JSX.Element | null = null
  if (usersRegEx.test(pathname)) {
    newUserButton = (
      <button
        className="icon-button"
        title="New User"
        onClick={handleNewUserClick}
      >
        <FontAwesomeIcon icon={faUserPlus} />
      </button>
    )
  }

  let userButton: JSX.Element | null = null
  if (isManager || isAdmin) {
    if (!usersRegEx.test(pathname) && pathname.includes('/dashboard')) {
      userButton = (
        <button
          className="icon-button"
          title="Users"
          onClick={handleUsersClick}
        >
          <FontAwesomeIcon icon={faUserGear} />
        </button>
      )
    }
  }

  let notesButton: JSX.Element | null = null
  if (!notesRegEx.test(pathname) && pathname.includes('/dashboard')) {
    notesButton = (
      <button
        className="icon-button"
        title="Notes"
        onClick={handleNotesClick}
      >
        <FontAwesomeIcon icon={faFilePen} />
      </button>
    )
  }

  const logoutButton: JSX.Element | null = (
    <button
      className='icon-button'
      title='Logout'
      onClick={handleLogoutClick}
    >
      <FontAwesomeIcon icon={faRightFromBracket} />
    </button>
  )

  const errorClass: string = isError ? 'error-msg' : 'offscreen'

  let buttonContent: JSX.Element | null
  if(isLoading) {
    buttonContent = <PulseLoader color={"#FFF"} />
  } else {
    buttonContent = (
      <>
        {newNoteButton}
        {newUserButton}
        {notesButton}
        {userButton}
        {logoutButton}
      </>
    )
  }

  const content: JSX.Element = (
    <>
      <p className={errorClass}>{(error as any)?.data?.message}</p>
      <header className="dashboard-header">
        <div className={`dashboard-header-container ${dashboardClass}`}>
          <Link to="/dashboard">
            <h1 className="dashboard-header-title">WorkNotes</h1>
          </Link>
          <nav className="dashboard-header-nav">
            {buttonContent}
          </nav>
        </div>
      </header>
    </>
  )
  
  return content
}

export default DashboardHeader
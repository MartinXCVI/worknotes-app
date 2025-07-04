// React imports
import { JSX } from "react"
// Font awesome imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHouse, faBriefcase, faUser } from "@fortawesome/free-solid-svg-icons"
// React router imports
import { useNavigate, useLocation } from "react-router-dom"
// Custom hooks imports
import useAuth from "../hooks/useAuth"


const DashboardFooter = (): JSX.Element => {

  const { username, status } = useAuth()

  const navigate = useNavigate()
  const { pathname } = useLocation()
  
  const onGoHomeClicked = (): void => navigate('/dashboard')

  let goHomeButton: JSX.Element | null = null
  
  if(pathname !== '/dashboard') {
    goHomeButton = (
      <button
        className="dashboard-footer-button icon-button"
        title="Home"
        onClick={onGoHomeClicked}
      >
        <FontAwesomeIcon icon={faHouse} /> Home
      </button>
    )
  }

  const content: JSX.Element = (
    <footer className="dashboard-footer">
      {goHomeButton}
      <div className="footer-data">
        <p><FontAwesomeIcon icon={faUser} /> Current User: {username}</p>
        <p><FontAwesomeIcon icon={faBriefcase} /> Status: {status}</p>
      </div>
    </footer>
  )

  return content
}

export default DashboardFooter
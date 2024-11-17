// Font awesome imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHouse } from "@fortawesome/free-solid-svg-icons"

// React router imports
import { useNavigate, useLocation } from "react-router-dom"

const DashboardFooter = () => {

  const navigate = useNavigate()
  const { pathname } = useLocation()
  
  const onGoHomeClicked = ()=> navigate('/dashboard')

  let goHomeButton = null
  
  if(pathname !== '/dashboard') {
    goHomeButton = (
      <button
        className="dashboard-footer-button icon-button"
        title="Home"
        onClick={onGoHomeClicked}
      >
        <FontAwesomeIcon icon={faHouse} />
      </button>
    )
  }

  const content = (
    <footer className="dashboard-footer">
      {goHomeButton}
      <p>current user: </p>
      <p>status: </p>
    </footer>
  )
  return content
}

export default DashboardFooter
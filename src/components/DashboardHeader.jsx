// React router imports
import { Link } from "react-router-dom"

const DashboardHeader = () => {
  
  const content = (
    <header className="dashboard-header">
        <div className="dashboard-header-container">
            <Link to="/dashboard">
                <h1 className="dashboard-header-title">workNotes</h1>
            </Link>
            <nav className="dashboard-header-nav">
                {/* add nav buttons later */}
            </nav>
        </div>
    </header>
  )
  return content
}

export default DashboardHeader
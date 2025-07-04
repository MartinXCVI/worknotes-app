import { JSX } from 'react'
// React router imports
import { Outlet } from 'react-router-dom'
// Components imports
import DashboardHeader from './DashboardHeader'
import DashboardFooter from './DashboardFooter'

const Dashboard = (): JSX.Element => {
  return (
    <>
      <DashboardHeader />
      <div className="dashboard-container">
        <Outlet />
      </div>
      <DashboardFooter />
    </>
  )
}

export default Dashboard
// React imports
import { JSX } from 'react'
// React Router imports
import { Outlet } from 'react-router-dom'


const Layout = (): JSX.Element => {
  return (
    <Outlet />
  )
}

export default Layout
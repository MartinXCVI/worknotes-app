// React router imports
import { useLocation, Navigate, Outlet } from 'react-router-dom'

// Custom hooks
import useAuth from '../../hooks/useAuth'


const RequireAuth = ({ allowedRoles }) => {

  const location = useLocation()
  const { roles } = useAuth()

  const content = (
    roles.some(role => allowedRoles.includes(role))
      ? <Outlet />
      : <Navigate to="/login" state={{ from: location}} replace />
  )

  return content
}

export default RequireAuth
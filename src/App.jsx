// React router imports
import { Routes, Route } from 'react-router-dom'
// Components imports
import Layout from './components/Layout'
import Public from './components/Public'
import Login from './features/auth/Login'
import DashboardLayout from './components/DashboardLayout'
import Welcome from './features/auth/Welcome'
import NotesList from './features/notes/NotesList'
import UsersList from './features/users/UsersList'
import EditUser from './features/users/EditUser'
import NewUserForm from './features/users/NewUserForm'
import EditNote from './features/notes/EditNote'
import NewNote from './features/notes/NewNote'
import Prefetch from './features/auth/Prefetch'
import PersistLogin from './features/auth/PersistLogin'
import RequireAuth from './features/auth/RequireAuth'
// Roles object import
import { ROLES } from './config/roles'
// Custom hooks imports
import useTitle from './hooks/useTitle'


function App() {

  useTitle('WorkNotes App')

  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          {/* Public routes */}
          <Route index element={<Public />} />
          <Route path='login' element={<Login />} />

          {/* Protected routes */}
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
              <Route element={<Prefetch />}>
                <Route path='dashboard' element={<DashboardLayout />}>

                  <Route index element={<Welcome />} />
                  <Route element={<RequireAuth allowedRoles={[ROLES.Manager, ROLES.Admin]} />}>
                    <Route path='users'>
                      <Route index element={<UsersList />} />
                      <Route path=":id" element={<EditUser />} />
                      <Route path="new" element={<NewUserForm />} />
                    </Route>
                  </Route>

                  <Route path='notes'>
                    <Route index element={<NotesList />} />
                    <Route path=":id" element={<EditNote />} />
                    <Route path="new" element={<NewNote />} />
                  </Route>

                </Route>
                {/* END of Dashboard */}
              </Route>
            </Route>
          </Route>
          {/* END of Protected routes */}
        </Route>
      </Routes>
    </>
  )
}

export default App

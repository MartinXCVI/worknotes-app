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


function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Public />} />
          <Route path='login' element={<Login />} />
          <Route path='dashboard' element={<DashboardLayout />}>
            <Route index element={<Welcome />} />
            <Route path='notes'>
              <Route index element={<NotesList />} />
            </Route>
            <Route path='users'>
              <Route index element={<UsersList />} />
            </Route>
          </Route>
          {/* END of Dashboard */}
        </Route>
      </Routes>
    </>
  )
}

export default App

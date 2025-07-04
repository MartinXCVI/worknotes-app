// Redux imports
import { store } from '../../app/store'
import { notesApiSlice } from '../notes/notesApiSlice'
import { usersApiSlice } from '../users/usersApiSlice'
// React & React hooks imports
import { useEffect, JSX } from 'react'
// React router imports
import { Outlet } from 'react-router-dom'


const Prefetch = (): JSX.Element => {
  
  useEffect((): void => {
    store.dispatch(notesApiSlice.util.prefetch('getNotes', 'notesList', { force: true }))
    store.dispatch(usersApiSlice.util.prefetch('getUsers', 'usersList', { force: true }))
  }, [])

  return <Outlet />
}

export default Prefetch
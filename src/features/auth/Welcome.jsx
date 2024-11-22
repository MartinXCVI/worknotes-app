import { Link } from "react-router-dom"

const Welcome = () => {
  const date = new Date()
  const today = new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long' }).format(date)

  const content = (
      <section className="welcome-section">
          <p className="date">{today}</p>
          <h2>Welcome!</h2>
          <p><Link to="/dashboard/notes">View workNotes</Link></p>
          <p><Link to="/dashboard/notes/new">Add New Work Note</Link></p>
          <p><Link to="/dashboard/users">View User Settings</Link></p>
          <p><Link to="/dashboard/users/new">Add New User</Link></p>
      </section>
  )
  return content
}

export default Welcome
// React hooks imports
import { useState, useEffect } from "react"

// React router imports
import { useNavigate } from "react-router-dom"

// Redux imports
import { useAddNewNoteMutation } from "./notesApiSlice"

// Font awesome icons imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from "@fortawesome/free-solid-svg-icons"


const NewNoteForm = ({ users }) => {

  const [
    addNewNote,
    {
      isLoading,
      isSuccess,
      isError,
      error
    }
  ] = useAddNewNoteMutation()

  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [userId, setUserId] = useState(users[0].id)

  // Check the status after calling the mutation
  useEffect(()=> {
    if(isSuccess) {
      setTitle('')
      setText('')
      setUserId('')
      navigate('/dashboard/notes')
    }
  }, [isSuccess, navigate])

  const handleTitleChange = event => setTitle(event.target.value)
  const handleTextChange = event => setText(event.target.value)
  const handleUserIdChange = event => setUserId(event.target.value)

  const canSave = [title, text, userId].every(Boolean) && !isLoading

  const handleSaveNoteClick = async (event) => {
    event.preventDefault()
    if(canSave) {
      await addNewNote({ user: userId, title, text })
    }
  }

  const options = users.map(user => {
    return (
      <option
        key={user.id}
        value={user.id}
      >
        {user.username}
      </option>
    )
  })

  const errorClass = isError ? "error-msg" : "offscreen"
  const validTitleClass = !title ? "form-input-incomplete" : ''
  const validTextClass = !text ? "form-input-incomplete" : ''

  const content = (
    <>
      <p className={errorClass}>{error?.data?.message}</p>

      <form className="form" onSubmit={handleSaveNoteClick}>
        <div className="form-title-row">
          <h2>New Note</h2>
          <div className="form-action-buttons">
            <button
              className="icon-button"
              title="Save"
              disabled={!canSave}
            >
              <FontAwesomeIcon icon={faSave} />
            </button>
          </div>
        </div>
        <label className="form-label" htmlFor="title">
          Title:
        </label>
        <input
          className={`form-input ${validTitleClass}`}
          id="title"
          name="title"
          type="text"
          autoComplete="off"
          value={title}
          onChange={handleTitleChange}
        />
        <label className="form-label" htmlFor="text">
          Text:
        </label>
        <textarea
          className={`form-input form-input-text ${validTextClass}`}
          id="text"
          name="text"
          value={text}
          onChange={handleTextChange}
        />
        <label className="form-label form-checkbox-container" htmlFor="username">
          ASSIGNED TO:
        </label>
        <select
          id="username"
          name="username"
          className="form-select"
          value={userId}
          onChange={handleUserIdChange}
        >
          {options}
        </select>
      </form>
    </>
  )

  return content
}

export default NewNoteForm
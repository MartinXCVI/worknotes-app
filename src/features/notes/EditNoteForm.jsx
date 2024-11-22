// React hooks imports
import { useState, useEffect } from "react"

// Redux imports
import { useUpdateNoteMutation, useDeleteNoteMutation } from "./notesApiSlice"

// React router imports
import { useNavigate } from "react-router-dom"

// Font awesome icons imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons"


const EditNoteForm = ({ note, users }) => {

  const [
    updateNote,
    {
      isLoading,
      isSuccess,
      isError,
      error
    }
  ] = useUpdateNoteMutation()

  const [
    deleteNote,
    {
      isSuccess: isDelSuccess,
      isError: isDelError,
      error: delError
    }
  ] = useDeleteNoteMutation()

  const navigate = useNavigate()

  const [title, setTitle] = useState(note.title)
  const [text, setText] = useState(note.text)
  const [completed, setCompleted] = useState(note.completed)
  const [userId, setUserId] = useState(note.user)

  // Check the status after calling the mutation
  useEffect(() => {
    if(isSuccess || isDelSuccess) {
      setTitle('')
      setText('')
      setUserId('')
      navigate('/dashboard/notes')
    }
  }, [isSuccess, isDelSuccess, navigate])

  const handleTitleChange = event => setTitle(event.target.value)
  const handleTextChange = event => setText(event.target.value)
  const handleCompletedChange = event => setCompleted(prev => !prev)
  const handleUserIdChange = event => setUserId(event.target.value)

  const canSave = [title, text, userId].every(Boolean) && !isLoading

  const handleSaveNoteClick = async (event) => {
    if(canSave) {
      await updateNote({ id: note.id, user: userId, title, text, completed })
    }
  }

  const handleDeleteNoteClick = async (event) => {
    await deleteNote({ id: note.id })
  }

  const created = new Date(note.createdAt).toLocaleString('en-US', { 
    day: 'numeric', month: 'long', year: 'numeric', 
    hour: 'numeric', minute: 'numeric', second: 'numeric' 
  })

  const updated = new Date(note.updatedAt).toLocaleString('en-US', { 
    day: 'numeric', month: 'long', year: 'numeric', 
    hour: 'numeric', minute: 'numeric', second: 'numeric' 
  })

  const options = users.map(user => {
    return (
      <option
        key={user.id}
        value={user.id}
      >
        {user.username}
      </option >
    )
  })

  const errorClass = (isError || isDelError) ? "error-msg" : "offscreen"
  const validTitleClass = !title ? "form-input-incomplete" : ''
  const validTextClass = !text ? "form-input-incomplete" : ''

  const errorContent = (error?.data?.message || delError?.data?.message) ?? ''

  const content = (
    <>
      <p className={errorClass}>{errorContent}</p>

      <form className="form" onSubmit={event => event.preventDefault()}>
        <div className="form-title-row">
          <h2>Edit Note #{note.ticket}</h2>
          <div className="form-action-buttons">
            <button
                className="icon-button"
                title="Save"
                onClick={handleSaveNoteClick}
                disabled={!canSave}
            >
              <FontAwesomeIcon icon={faSave} />
            </button>
            <button
                className="icon-button"
                title="Delete"
                onClick={handleDeleteNoteClick}
            >
              <FontAwesomeIcon icon={faTrashCan} />
            </button>
          </div>
        </div>
        <label className="form-label" htmlFor="note-title">
          Title:
        </label>
        <input
          className={`form-input ${validTitleClass}`}
          id="note-title"
          name="title"
          type="text"
          autoComplete="off"
          value={title}
          onChange={handleTitleChange}
        />

        <label className="form-label" htmlFor="note-text">
          Text:
        </label>
        <textarea
          className={`form-input form-input-text ${validTextClass}`}
          id="note-text"
          name="text"
          value={text}
          onChange={handleTextChange}
        />
        <div className="form-row">
          <div className="form-divider">
            <label className="form-label form-checkbox-container" htmlFor="note-completed">
              WORK COMPLETE:
              <input
                className="form-checkbox"
                id="note-completed"
                name="completed"
                type="checkbox"
                checked={completed}
                onChange={handleCompletedChange}
              />
            </label>
            <label className="form-label form-checkbox-container" htmlFor="note-username">
              ASSIGNED TO:
            </label>
            <select
              id="note-username"
              name="username"
              className="form-select"
              value={userId}
              onChange={handleUserIdChange}
            >
              {options}
            </select>
          </div>
          <div className="form-divider">
            <p className="form-created">Created:<br />{created}</p>
            <p className="form-updated">Updated:<br />{updated}</p>
          </div>
        </div>
      </form>
    </>
  )

  return content
}

export default EditNoteForm
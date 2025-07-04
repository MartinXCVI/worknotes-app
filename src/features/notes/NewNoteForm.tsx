// React & React hooks imports
import { useState, useEffect, JSX, ChangeEvent, FormEvent } from "react"
// React router imports
import { useNavigate } from "react-router-dom"
// Redux imports
import { useAddNewNoteMutation } from "./notesApiSlice"
// Font awesome icons imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from "@fortawesome/free-solid-svg-icons"
// Types/Interfaces imports
import { IUser } from "@/interfaces/IUser"


interface INewNoteFormProps {
  users: IUser[]
}

const NewNoteForm = ({ users }: INewNoteFormProps) => {

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

  const [title, setTitle] = useState<string>('')
  const [text, setText] = useState<string>('')
  const [userId, setUserId] = useState<string>(users[0].id)

  // Check the status after calling the mutation
  useEffect((): void => {
    if(isSuccess) {
      setTitle('')
      setText('')
      setUserId('')
      navigate('/dashboard/notes')
    }
  }, [isSuccess, navigate])

  /* Handler functions */
  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setTitle(event.target.value)
  }
  const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    setText(event.target.value)
  }
  const handleUserIdChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    setUserId(event.target.value)
  }

  const canSave: boolean = [title, text, userId].every(Boolean) && !isLoading

  const handleSaveNoteClick = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    if(canSave) {
      await addNewNote({ user: userId, title, text })
    }
  }

  const options: JSX.Element[] = users.map((user): JSX.Element => {
    return (
      <option key={user.id} value={user.id}>
        {user.username}
      </option>
    )
  })

  const errorClass = isError ? "error-msg" : "offscreen"
  const validTitleClass = !title ? "form-input-incomplete" : ''
  const validTextClass = !text ? "form-input-incomplete" : ''

  const content: JSX.Element = (
    <>
      <p className={errorClass}>
        {(error as any)?.data?.message || "An unexpected error ocurred."}
      </p>

      <form className="form" onSubmit={handleSaveNoteClick}>
        <div className="form-title-row">
          <h2 className="capital">new note</h2>
          <div className="form-action-buttons">
            <button
              type="submit"
              className="icon-button"
              title="Save"
              disabled={!canSave}
            >
              <FontAwesomeIcon icon={faSave} />
            </button>
          </div>
        </div>
        <div className="form-divider">
          <label className="form-label capital" htmlFor="title">
            title:
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
        </div>
        <div className="form-divider">
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
        </div>
        <div className="form-divider select-divider">
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
        </div>
      </form>
    </>
  )

  return content
}

export default NewNoteForm
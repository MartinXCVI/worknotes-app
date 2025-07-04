// React & React hook imports
import { useState, useEffect, JSX, ChangeEvent, FormEvent } from 'react'
// Redux imports
import { useAddNewUserMutation } from './usersApiSlice'
// React router imports
import { useNavigate } from 'react-router-dom'
// Font Awesome imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from '@fortawesome/free-solid-svg-icons'
// 'ROLES' object import
import { ROLES } from '../../config/roles'
// Custom hooks imports
import useTitle from '../../hooks/useTitle'


// Regular expressions for user name and password
const userRegex: RegExp = /^[A-z]{3,20}$/
const passRegex: RegExp = /^[A-z0-9!@#$%]{4,12}$/

const NewUserForm = (): JSX.Element => {
  
  useTitle('WorkNotes: New User')

  const [
    addNewUser,
    {
      isLoading,
      isSuccess,
      isError,
      error
    }
  ] = useAddNewUserMutation()

  const navigate = useNavigate()

  const [username, setUsername] = useState<string>('')
  const [validUsername, setValidUsername] = useState<boolean>(false)
  const [password, setPassword] = useState<string>('')
  const [validPassword, setValidPassword] = useState<boolean>(false)
  const [roles, setRoles] = useState<string[]>(['Employee'])

  // RegEx validation for username
  useEffect(()=> {
    setValidUsername(userRegex.test(username))
  }, [username])

  // RegEx validation for password
  useEffect(()=> {
    setValidPassword(passRegex.test(password))
  }, [password])

  // Check the status after calling the mutation
  useEffect(()=> {
    if(isSuccess) {
      setUsername('')
      setPassword('')
      setRoles([])
      navigate('/dashboard/users')
    }
  }, [isSuccess, navigate])

  // Events handlers
  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setUsername(event.target.value)
  }
  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setPassword(event.target.value)
  }
  const handleRolesChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    const values = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    )
    setRoles(values)
  }

  // Validating if it can be saved
  const canSave = [roles.length, validUsername, validPassword].every(Boolean) && !isLoading

  const handleSaveUserClick = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    if(canSave) {
      await addNewUser({ username, password, roles })
    }
  }

  const options = (Object.values(ROLES) as string[]).map(role => {
    return (
      <option
        key={role}
        value={role}
      >
        {role}
      </option>
    )
  })

  const errorClass = isError ? 'error-msg' : 'offscreen'
  const validUserClass = username && !validUsername ? 'form-input-incomplete' : ''
  const validPassClass = password && !validPassword ? 'form-input-incomplete' : ''
  const validRolesClass = !Boolean(roles.length) ? 'form-input-incomplete' : ''

  const content: JSX.Element = (
    <>
      <p className={errorClass}>{(error as any)?.data?.message}</p>
      {/*---- New user form ----*/}
      <form className="form" onSubmit={handleSaveUserClick}>
        <div className="form-title-row">
          <h2 className='capital'>new user</h2>
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
        {/* Username input */}
        <div className="form-divider">
          <label className="form-label" htmlFor="username">
            Username: </label>
          <input
            className={`form-input ${validUserClass}`}
            id="username"
            name="username"
            type="text"
            autoComplete="off"
            value={username}
            onChange={handleUsernameChange}
          />
          <span className="nowrap">[3-20 letters]</span>
        </div>
        {/* Password input */}
        <div className="form-divider">
          <label className="form-label" htmlFor="password">
            Password:</label>
          <input
            className={`form-input ${validPassClass}`}
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <span className="nowrap">[4-12 chars incl. !@#$%]</span>
        </div>
        {/* Roles input */}
        <div className="form-divider select-divider-roles">
          <label className="form-label" htmlFor="roles">
            ASSIGNED ROLES:</label>
          <select
            id="roles"
            name="roles"
            className={`form-select ${validRolesClass}`}
            multiple={true}
            size={3}
            value={roles}
            onChange={handleRolesChange}
          >
            {options}
          </select>
        </div>
      {/* End of form */}
      </form>
    </>
  )

  return content
}

export default NewUserForm
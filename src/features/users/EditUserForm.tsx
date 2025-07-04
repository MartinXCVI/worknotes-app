// React & React hook imports
import { useState, useEffect, ChangeEvent, FormEvent, MouseEvent, JSX } from 'react'
// Redux imports
import { useUpdateUserMutation, useDeleteUserMutation } from './usersApiSlice'
// React router imports
import { useNavigate } from 'react-router-dom'
// Font Awesome imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan } from '@fortawesome/free-solid-svg-icons'
// 'ROLES' object import
import { ROLES } from '../../config/roles'
// Types/Interfaces imports
import { IUser } from '@/interfaces/IUser'


interface IEditUserFormProps {
  user: IUser;
}

// Regular expressions for user name and password
const userRegex: RegExp = /^[A-z]{3,20}$/
const passRegex: RegExp = /^[A-z0-9!@#$%]{4,12}$/

const EditUserForm = ({ user }: IEditUserFormProps) => {

  const [
    updateUser,
    {
      isLoading,
      isSuccess,
      isError,
      error
    }
  ] = useUpdateUserMutation()

  const [
    deleteUser,
    {
      isSuccess: isDelSuccess,
      isError: isDelError,
      error: delError
    }
  ] = useDeleteUserMutation()

  const navigate = useNavigate()

  const [username, setUsername] = useState<string>(user.username)
  const [validUsername, setValidUsername] = useState<boolean>(false)
  const [password, setPassword] = useState<string>('')
  const [validPassword, setValidPassword] = useState<boolean>(false)
  const [roles, setRoles] = useState<string[]>(user.roles)
  const [active, setActive] = useState<boolean>(user.active)

  // RegEx validation for username
  useEffect((): void => {
    setValidUsername(userRegex.test(username))
  }, [username])

  // RegEx validation for password
  useEffect((): void => {
    setValidPassword(passRegex.test(password))
  }, [password])

  // Check the status after calling the mutation
  useEffect((): void => {
    if(isSuccess || isDelSuccess) {
      setUsername('')
      setPassword('')
      setRoles([])
      navigate('/dashboard/users')
    }
  }, [isSuccess, isDelSuccess, navigate])

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

  const handleActiveChange = (): void => setActive((prev: boolean) => !prev)

  const handleSaveUserClick = async (event: MouseEvent<HTMLButtonElement>): Promise<void> => {
    if(password) {
      await updateUser({ id: user.id, username, password, roles, active })
    } else {
      await updateUser({ id: user.id, username, roles, active })
    }
  }

  const handleDeleteUserClick = async (): Promise<void> => {
    await deleteUser({ id: user.id })
  }

  const options = (Object.values(ROLES) as string[]).map(role => {
    return (
      <option key={role} value={role}>
        {role}
      </option >
    )
  })

  let canSave
  if(password) {
    canSave = [roles.length, validUsername, validPassword].every(Boolean) && !isLoading
  } else {
    canSave = [roles.length, validUsername].every(Boolean) && !isLoading
  }

  const errorClass = (isError || isDelError) ? 'error-msg' : 'offscreen'
  const validUserClass = username && !validUsername ? 'form-input-incomplete' : ''
  const validPassClass = password && !validPassword ? 'form-input-incomplete' : ''
  const validRolesClass = !Boolean(roles.length) ? 'form-input-incomplete' : ''

  const errorContent = ((error as any)?.data?.message || (delError as any)?.data?.message) ?? ''

  const content: JSX.Element = (
    <>
      <p className={errorClass}>{errorContent}</p>
      {/*---- Edit user form ----*/}
      <form
        className="form"
        onSubmit={(event: FormEvent<HTMLFormElement>): void => event.preventDefault()}
      >
        <div className="form-title-row">
          <h2 className='capital'>edit user</h2>
          <div className="form-action-buttons">
            <button
              className="icon-button"
              title="Save"
              onClick={handleSaveUserClick}
              disabled={!canSave}
            >
              <FontAwesomeIcon icon={faSave} />
            </button>
            <button
              className="icon-button"
              title="Delete"
              onClick={handleDeleteUserClick}
            >
              <FontAwesomeIcon icon={faTrashCan} />
            </button>
          </div>
        </div>
        {/* Username input */}
        <div className="form-divider">
          <label className="form-label" htmlFor="username">
            Username: <span className="nowrap">[3-20 letters]</span>
          </label>
          <input
            className={`form-input ${validUserClass}`}
            id="username"
            name="username"
            type="text"
            autoComplete="off"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        {/* Password input */}
        <div className="form-divider">
          <label className="form-label" htmlFor="password">
            Password: <span className="nowrap">[empty = no change]</span> <span className="nowrap">[4-12 chars incl. !@#$%]</span>
          </label>
          <input
            className={`form-input ${validPassClass}`}
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        {/* User active status checkbox */}
        <div className="form-divider">
          <label className="form-label form-checkbox-container" htmlFor="user-active">
            ACTIVE:
            <input
              className="form-checkbox"
              id="user-active"
              name="user-active"
              type="checkbox"
              checked={active}
              onChange={handleActiveChange}
            />
          </label>
        </div>
        {/* Roles input */}
        <div className="form-divider select-divider-roles">
          <label className="form-label" htmlFor="roles">
            ASSIGNED ROLES:
          </label>
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

export default EditUserForm
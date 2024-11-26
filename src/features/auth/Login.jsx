// React hooks imports
import { useRef, useState, useEffect } from 'react'

// React router imports
import { useNavigate, Link } from 'react-router-dom'

// Redux imports
import { useDispatch } from 'react-redux'
import { setCredentials } from './authSlice'
import { useLoginMutation } from './authApiSlice'

// Custom hooks
import usePersist from '../../hooks/usePersist'


const Login = () => {

  const userRef = useRef()
  const errorRef = useRef()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [persist, setPersist] = usePersist()

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [login, { isLoading }] = useLoginMutation()
  
  /* Puts the focus in the username 
  field once the components mounts */
  useEffect(()=> {
    userRef.current.focus()
  }, [])

  /* Clears the error message once the 
  state of the username or password changes */
  useEffect(()=> {
    setErrorMsg('')
  }, [username, password])

  /* Form submission */
  const handleSubmit = async (event)=> {
    event.preventDefault()
    try {
      const { accessToken } = await login({ username, password}).unwrap()
      dispatch(setCredentials({ accessToken }))
      setUsername('')
      setPassword('')
      navigate('/dashboard')
    } catch(error) {
      if(!error.status) {
        setErrorMsg('No server response was received')
      } else if(error.status === 400) {
        setErrorMsg('Missing either username or password')
      } else if(error.status === 401) {
        setErrorMsg('Unauthorized')
      } else {
        setErrorMsg(error.data?.message)
      }
      errorRef.current.focus()
    }
  }

  const handleUserInput = event => setUsername(event.target.value)
  const handlePassInput = event => setPassword(event.target.value)
  const handleToggle = ()=> setPersist(prev => !prev)

  const errorClass = errorMsg ? 'error-msg' : 'offscreen'

  if(isLoading) return <p>Loading...</p>

  const content = (
    <section className='public'>
      <header>
        <h1>Employee Login</h1>
      </header>
      <main className='login'>
        {/* Error message */}
        <p 
          ref={errorRef} 
          className={errorClass}
          aria-live='assertive'
        >
          {errorMsg}
        </p>
        <form className='form' onSubmit={handleSubmit}>
          {/* Username input */}
          <label htmlFor="username">Username:</label>
          <input 
            className='form-input'
            type="text"
            id='username'
            ref={userRef}
            value={username}
            onChange={handleUserInput}
            autoComplete='off'
            required
          />
          {/* Password input */}
          <label htmlFor="password">Password:</label>
          <input
            className='form-input'
            type='password'
            id='password'
            onChange={handlePassInput}
            value={password}
            required
          />
          <button className='form-submit-button'>Sign In</button>

          <label htmlFor="persist" className='form-persist capital'>
            <input 
              type="checkbox"
              className='form-checkbox'
              id='persist'
              onChange={handleToggle}
              checked={persist}
            />
            trust this device
          </label>
        </form>
      </main>
      <footer>
        <Link to="/">Back to Home</Link>
      </footer>
    </section>
  )

  return content
}

export default Login
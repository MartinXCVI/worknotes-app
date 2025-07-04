// Types/Interfaces imports
import { RTKQueryError } from "@/types/RTKQueryError";
// React router imports
import { Outlet, Link } from "react-router-dom";
// React & React hooks imports
import { useEffect, useRef, useState, JSX } from "react";
// Redux imports
import { useRefreshMutation } from "./authApiSlice";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./authSlice";
// Custom hooks imports
import usePersist from "../../hooks/usePersist";
// React spinners imports
import { PulseLoader } from "react-spinners";


const PersistLogin = (): JSX.Element => {

  const [persist] = usePersist()
  const token = useSelector(selectCurrentToken)
  const effectRan = useRef<boolean>(false)
  const [trueSuccess, setTrueSuccess] = useState<boolean>(false)

  const [
    refresh,
    {
      isUninitialized,
      isLoading,
      isSuccess,
      isError,
      error
    }
  ] = useRefreshMutation()

  useEffect(() => {

    if (effectRan.current === true || process.env.NODE_ENV !== 'development') { // React 18 Strict Mode
      const verifyRefreshToken = async (): Promise<void> => {
        console.log('Verifying refresh token')
        try {
          //const response = 
          await refresh()
          //const { accessToken } = response.data
          setTrueSuccess(true)
        }
        catch(error) {
          console.error(error)
        }
      }
      if(!token && persist) verifyRefreshToken()
    }
    return (): void => {
      effectRan.current = true
    }
    // eslint-disable-next-line
  }, [])

  let content: JSX.Element = <></>

  if(!persist) { // persist: no
    console.info('[Auth] Session persistence is disabled — rendering route directly.')
    content = <Outlet />
  } else if(isLoading) { // persist: yes, token: no
    console.info('[Auth] Refresh token request in progress — showing loading indicator.')
    content = <PulseLoader color={"#FFF"} />
  } else if(isError) { // persist: yes, token: no
    console.warn('[Auth] Failed to refresh token.', {
      error: (error as RTKQueryError)?.data?.message ?? 'Unknown error',
    })
    content = (
      <p className='error-msg'>
        {(error as RTKQueryError)?.data?.message ?? 'Login expired'} —{' '}
        <Link to="/login">Please login again</Link>.
      </p>
    )
  } else if(isSuccess && trueSuccess) { //persist: yes, token: yes
    console.info('[Auth] Token refresh succeeded — proceeding to protected route.')
    content = <Outlet />
  } else if(token && isUninitialized) { //persist: yes, token: yes
    console.info('[Auth] Token already exists — skipping refresh.')
    content = <Outlet />
  }

  return content
}

export default PersistLogin
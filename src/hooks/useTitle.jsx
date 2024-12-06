import { useEffect } from 'react'

const useTitle = (title)=> {
  
  useEffect(()=> {
    /* Getting the document's previous title and
    resetting it to the new title value, or storing
    the old one in prevTitle */
    const prevTitle = document.title
    document.title = title

    return ()=> document.title = prevTitle
  }, [title])
}

export default useTitle
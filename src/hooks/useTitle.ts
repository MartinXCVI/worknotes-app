import { useEffect } from 'react'

const useTitle = (title: string): void => {
  
  useEffect(() => {
    /* Getting the document's previous title and
    resetting it to the new title value, or storing
    the old one in prevTitle */
    const prevTitle = document.title
    document.title = title

    return (): void => {
      document.title = prevTitle
    }
  }, [title])
}

export default useTitle
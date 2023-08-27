import { useEffect } from 'react'

const NotFoundPage = () => {
  useEffect(() => {
    document.title = 'Page not found'
  }, [])

  return (
    <>
      <h1>404</h1>
      <p>Page not found</p>
    </>
  )
}

export default NotFoundPage

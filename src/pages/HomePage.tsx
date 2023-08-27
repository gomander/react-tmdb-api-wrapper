import { useEffect } from 'react'

const HomePage = () => {
  useEffect(() => {
    document.title = 'TMDB - Gunnar'
  }, [])

  return (
    <h1>Home</h1>
  )
}

export default HomePage

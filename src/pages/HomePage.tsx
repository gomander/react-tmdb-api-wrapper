import { useEffect } from 'react'
import useHistory from '../hooks/useHistory'
import MovieCard from '../components/MovieCard'

const HomePage = () => {
  const [getHistory] = useHistory()
  const history = getHistory()

  useEffect(() => {
    document.title = 'TMDB - Gunnar'
  }, [])

  return (
    <>
      <h1>Home</h1>

      <h2>History</h2>
      {
        history.length > 0 &&
        <ul className="card-list justify-content-center px-0">
          {
            history.map((movie, i) =>
              <li key={i}>
                <MovieCard movie={movie} />
              </li>
            )
          }
        </ul>
      }
      {
        history.length === 0 &&
        <p>Your recently viewed movies will appear here.</p>
      }
    </>
  )
}

export default HomePage

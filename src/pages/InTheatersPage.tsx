import { useEffect } from 'react'
import { getMoviesInTheaters } from '../services/TmdbApiService'
import MoviesList from '../components/MoviesList'

const InTheatersPage = () => {
  useEffect(() => {
    document.title = 'Movies in theaters'
  }, [])

  return (
    <>
      <h1>Now playing in theaters</h1>

      <MoviesList queryName="latest-movies" queryFn={getMoviesInTheaters} />
    </>
  )
}

export default InTheatersPage

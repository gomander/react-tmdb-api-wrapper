import { useEffect } from 'react'
import { getTopMovies } from '../services/TmdbApiService'
import MoviesList from '../components/MoviesList'

const TopMoviesPage = () => {
  useEffect(() => {
    document.title = 'Top movies'
  }, [])

  return (
    <>
      <h1>Top Movies</h1>

      <MoviesList queryName="top-movies" queryFn={getTopMovies} />
    </>
  )
}

export default TopMoviesPage

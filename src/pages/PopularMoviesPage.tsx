import { useEffect } from 'react'
import { getPopularMovies } from '../services/TmdbApiService'
import MoviesList from '../components/MoviesList'

const PopularMoviesPage = () => {
  useEffect(() => {
    document.title = 'Popular movies'
  }, [])

  return (
    <>
      <h1>Popular Movies</h1>

      <MoviesList queryName="popular-movies" queryFn={getPopularMovies} />
    </>
  )
}

export default PopularMoviesPage

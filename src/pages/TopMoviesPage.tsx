import { getTopMovies } from '../services/TmdbApiService'
import MoviesList from '../components/MoviesList'

const TopMoviesPage = () => {
  return (
    <>
      <h1>Top Movies</h1>

      <MoviesList queryName="top-movies" queryFn={getTopMovies} />
    </>
  )
}

export default TopMoviesPage

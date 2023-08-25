import { getLatestMovies } from '../services/TmdbApiService'
import MoviesList from '../components/MoviesList'

const LatestMoviesPage = () => {
  return (
    <>
      <h1>Latest Releases</h1>

      <MoviesList queryName="latest-movies" queryFn={getLatestMovies} />
    </>
  )
}

export default LatestMoviesPage

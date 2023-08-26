import BrowseMoviesForm from '../components/BrowseMoviesForm'
import MoviesList from '../components/MoviesList'
import { discover } from '../services/TmdbApiService'

const BrowseMoviesPage = () => {
  const search = async (page?: number) => {
    return await discover({ page })
  }

  return (
    <>
      <h1>Browse</h1>

      <BrowseMoviesForm />

      <MoviesList queryName="browse-movies" queryFn={search} />
    </>
  )
}

export default BrowseMoviesPage

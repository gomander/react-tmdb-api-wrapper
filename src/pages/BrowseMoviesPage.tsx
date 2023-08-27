import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import BrowseMoviesForm from '../components/BrowseMoviesForm'
import MoviesList from '../components/MoviesList'
import { discover } from '../services/TmdbApiService'
import { DiscoverOptions } from '../types/util.type'

const BrowseMoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [queryName, setQueryName] = useState<Record<string, string>>(
    { name: 'browse-movies' }
  )

  const search = async (page?: number) => {
    const discoverOptions: Parameters<typeof discover>[0] = { page }
    if (searchParams.get('genre')) {
      discoverOptions.genre = Number(searchParams.get('genre'))
    }
    if (searchParams.get('sort')) {
      discoverOptions.sortBy = searchParams.get('sort')!
    }
    return await discover(discoverOptions)
  }

  const onSearch = (discoverOptions: DiscoverOptions) => {
    const params: Record<string, string> = {}
    if (discoverOptions.genre) params.genre = String(discoverOptions.genre)
    if (discoverOptions.sort) params.sort = discoverOptions.sort
    setSearchParams(new URLSearchParams(params))
    setQueryName({
      name: 'browse-movies',
      genre: params.genre,
      sort: params.sort
    })
  }

  return (
    <>
      <h1>Browse</h1>

      <BrowseMoviesForm onSearch={onSearch} />

      <MoviesList queryName={queryName} queryFn={search} />
    </>
  )
}

export default BrowseMoviesPage

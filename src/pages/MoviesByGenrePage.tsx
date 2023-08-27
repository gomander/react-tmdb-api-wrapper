import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import GenreSortSelect from '../components/GenreSortSelect'
import MoviesList from '../components/MoviesList'
import { discover } from '../services/TmdbApiService'
import { DiscoverOptions } from '../types/util.type'

const MoviesByGenrePage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [queryKey, setQueryKey] = useState<Record<string, string>>(
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
    setQueryKey({ name: queryKey.name, ...params })
  }

  return (
    <>
      <h1>Browse movies by genre</h1>

      <GenreSortSelect onSearch={onSearch} />

      <MoviesList queryName={queryKey} queryFn={search} />
    </>
  )
}

export default MoviesByGenrePage

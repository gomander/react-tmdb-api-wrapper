import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getTopMovies } from '../services/TmdbApiService'

const TopMoviesPage = () => {
  const [page, setPage] = useState(1)
  const topMoviesQuery = useQuery({
    queryKey: ['top-movies', page], queryFn: () => getTopMovies(page)
  })

  return (
    <>
      <h1>Top Movies</h1>

      <ul>
        {
          topMoviesQuery.data?.results.map((movie: { title: string, id: number }) => (
            <li key={movie.id}>{movie.title}</li>
          ))
        }
      </ul>
    </>
  )
}

export default TopMoviesPage

import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getTopMovies } from '../services/TmdbApiService'
import Alert from 'react-bootstrap/Alert'
import Pagination from '../components/Pagination'

const TopMoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [page, setPage] = useState(Number(searchParams.get('page')) || 1)
  const topMoviesQuery = useQuery({
    queryKey: ['top-movies', page], queryFn: () => getTopMovies(page)
  })

  useEffect(() => {
    if (page === 1) return setSearchParams({})
    setSearchParams({ page: String(page) })
  }, [page])

  return (
    <>
      <h1>Top Movies</h1>

      {
        topMoviesQuery.isError &&
        <Alert variant="danger">An error occurred</Alert>
      }

      {
        topMoviesQuery.data &&
        <>
          <ul>
            {
              topMoviesQuery.data.results.map(movie => (
                <li key={movie.id}>{movie.title}</li>
              ))
            }
          </ul>

          <Pagination
            page={page}
            totalPages={10}
            hasPreviousPage={page > 1}
            hasNextPage={page < 10}
            onPreviousPage={() => setPage(page - 1)}
            onNextPage={() => setPage(page + 1)}
          />
        </>
      }
    </>
  )
}

export default TopMoviesPage

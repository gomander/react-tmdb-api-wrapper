import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import Alert from 'react-bootstrap/Alert'
import Pagination from '../components/Pagination'
import { DiscoverMoviesResult } from '../types/TmdbApi.types'

interface Props {
  queryName: string
  queryFn: (page: number) => Promise<DiscoverMoviesResult>
}

const MoviesList = ({ queryName, queryFn }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [page, setPage] = useState(Number(searchParams.get('page')) || 1)
  const moviesQuery = useQuery({
    queryKey: [queryName, { page }],
    queryFn: () => queryFn(page)
  })

  useEffect(() => {
    if (page === 1) return setSearchParams({})
    setSearchParams({ page: String(page) })
  }, [page])

  return (
    <>
      {
        moviesQuery.isError &&
        <Alert variant="danger">An error occurred</Alert>
      }

      {
        moviesQuery.data &&
        <>
          <ul>
            {
              moviesQuery.data.results.map(movie => (
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

export default MoviesList

import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import Alert from 'react-bootstrap/Alert'
import Pagination from './Pagination'
import MovieCard from './MovieCard'
import { DiscoverMoviesResult } from '../types/TmdbApi.types'

interface Props {
  queryName: string | Record<string, string>
  queryFn: (page: number) => Promise<DiscoverMoviesResult> | null
}

const MoviesList = ({ queryName, queryFn }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [page, setPage] = useState(Number(searchParams.get('page')) || 1)
  const moviesQuery = useQuery({
    queryKey: [queryName, { page }],
    queryFn: () => queryFn(page)
  })

  const updatePage = (newPage: number) => {
    setPage(newPage)
    const newParams = Object.fromEntries(searchParams.entries())
    delete newParams.page
    if (newPage === 1) return setSearchParams(newParams)
    setSearchParams({ ...newParams, page: String(newPage) })
  }

  useEffect(() => {
    const pageParam = Number(searchParams.get('page')) || 1
    if (page !== pageParam) setPage(pageParam)
  }, [searchParams])

  return (
    <>
      {
        moviesQuery.isError &&
        <Alert variant="danger">An error occurred</Alert>
      }

      {
        moviesQuery.data && moviesQuery.data.results.length > 0 &&
        <>
          <ul className="card-list justify-content-center px-0">
            {
              moviesQuery.data.results.map(movie => (
                <li key={movie.id}>
                  <MovieCard movie={movie} />
                </li>
              ))
            }
          </ul>

          <Pagination
            page={moviesQuery.data.page}
            totalPages={moviesQuery.data.total_pages}
            hasPreviousPage={page > 1}
            hasNextPage={page < moviesQuery.data.total_pages}
            onPreviousPage={() => updatePage(moviesQuery.data!.page - 1)}
            onNextPage={() => updatePage(moviesQuery.data!.page + 1)}
          />
        </>
      }

      {
        moviesQuery.data && moviesQuery.data.results.length === 0 &&
        <Alert variant="warning">No results</Alert>
      }
    </>
  )
}

export default MoviesList

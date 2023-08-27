import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import Alert from 'react-bootstrap/Alert'
import Pagination from './Pagination'
import MovieCard from './MovieCard'
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

  const updatePage = (newPage: number) => {
    setPage(newPage)
    searchParams.delete('page')
    if (newPage === 1) return setSearchParams(searchParams)
    setSearchParams({ ...searchParams, page: String(newPage) })
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
        moviesQuery.data &&
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
            onPreviousPage={() => updatePage(moviesQuery.data.page - 1)}
            onNextPage={() => updatePage(moviesQuery.data.page + 1)}
          />
        </>
      }
    </>
  )
}

export default MoviesList

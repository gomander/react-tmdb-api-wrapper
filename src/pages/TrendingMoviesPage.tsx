import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getTrendingMovies } from '../services/TmdbApiService'
import MoviesList from '../components/MoviesList'
import { Form } from 'react-bootstrap'
import { Timeframe } from '../types/TmdbApi.types'

const timeframes: { label: string, value: Timeframe }[] = [
  { label: 'Today', value: 'day' },
  { label: 'This week', value: 'week' }
]

const TrendingMoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [timeframe, setTimeframe] = useState<Timeframe>(
    timeframes.find(t => t.value === searchParams.get('timeframe'))
      ? searchParams.get('timeframe') as Timeframe
      : 'day'
  )

  useEffect(() => {
    document.title = 'Trending movies'
  }, [])

  useEffect(() => {
    if (timeframe === 'day') return setSearchParams()
    setSearchParams({ timeframe })
  }, [timeframe])

  return (
    <>
      <h1>Trending Movies</h1>

      <Form className="mb-3">
        <Form.Group>
          <Form.Label>Timeframe</Form.Label>
          <Form.Select
            value={timeframe}
            onChange={e => setTimeframe(e.target.value as Timeframe)}
          >
            {
              timeframes.map(t => (
                <option
                  value={t.value}
                  key={t.value}
                >{t.label}</option>
              ))
            }
          </Form.Select>
        </Form.Group>
      </Form>

      <MoviesList
        queryName={`trending-movies-${timeframe}`}
        queryFn={page => getTrendingMovies(timeframe, page)}
      />
    </>
  )
}

export default TrendingMoviesPage

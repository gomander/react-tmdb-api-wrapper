import { useEffect, useState } from 'react'
import { getTrendingMovies } from '../services/TmdbApiService'
import MoviesList from '../components/MoviesList'

const TrendingMoviesPage = () => {
  const [timeframe, setTimeframe] = useState<'day' | 'week'>('day')

  useEffect(() => {
    document.title = 'Trending movies'
  }, [])

  return (
    <>
      <h1>Trending Movies</h1>

      <MoviesList
        queryName="trending-movies"
        queryFn={() => getTrendingMovies(timeframe)}
      />
    </>
  )
}

export default TrendingMoviesPage

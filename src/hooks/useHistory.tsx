import { useEffect, useState } from 'react'
import {
  MovieDetails, MovieDetailsWithCreditsAndSimilar
} from '../types/TmdbApi.types'
import { simplifyMovie } from '../utils/util'

const useHistory = () => {
  const [history, setHistory] = useState<MovieDetails[]>(
    JSON.parse(localStorage.getItem('history') || '[]')
  )

  useEffect(() => {
    localStorage.setItem('history', JSON.stringify(history))
  }, [history])

  const get = () => history

  const push = (movie: MovieDetailsWithCreditsAndSimilar) => {
    if (history[0]?.id === movie.id) return
    const simplifiedMovie = simplifyMovie(movie)
    setHistory([
      simplifiedMovie,
      ...history.filter(m => m.id !== movie.id)
    ].slice(0, 10))
  }

  return [get, push] as const
}

export default useHistory

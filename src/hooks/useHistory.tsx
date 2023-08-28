import { useEffect, useState } from 'react'
import { MovieDetailsWithCredits } from '../types/TmdbApi.types'

const useHistory = () => {
  const [history, setHistory] = useState<MovieDetailsWithCredits[]>(
    JSON.parse(localStorage.getItem('history') || '[]')
  )

  useEffect(() => {
    localStorage.setItem('history', JSON.stringify(history))
  }, [history])

  const get = () => history

  const push = (movie: MovieDetailsWithCredits) => {
    if (history[0]?.id === movie.id) return
    setHistory([movie, ...history.filter(m => m.id !== movie.id)].slice(0, 10))
  }

  return [get, push] as const
}

export default useHistory

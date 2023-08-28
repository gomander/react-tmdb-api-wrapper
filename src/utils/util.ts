import {
  MovieDetails, MovieDetailsWithCreditsAndSimilar
} from '../types/TmdbApi.types'

export const API_ROOT = import.meta.env.VITE_API_ROOT
export const IMAGE_ROOT = import.meta.env.VITE_IMAGE_ROOT
export const API_KEY = import.meta.env.VITE_API_KEY
export const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN

if (!(API_ROOT && IMAGE_ROOT && API_KEY && ACCESS_TOKEN)) {
  throw new Error('Environment variables incorrectly configured!')
}

export const formatDate = (input: string) => {
  if (!input) return 'unavailable'
  return Intl.DateTimeFormat(
    'en-US', { day: 'numeric', month: 'short', year: 'numeric' }
  ).format(new Date(input))
}

export const formatTime = (minutes: number) => {
  return `${Math.floor(minutes / 60)} hours ${minutes % 60} minutes`
}

export const getDateString = (date: Date) => {
  return date.toISOString().split('T')[0]
}

export const simplifyMovie = (movie: MovieDetailsWithCreditsAndSimilar) => {
  const simplifiedMovie = structuredClone(movie) as MovieDetails
  if ('credits' in simplifiedMovie) delete simplifiedMovie.credits
  if ('similar' in simplifiedMovie) delete simplifiedMovie.similar
  simplifiedMovie.vote_average = Math.round(movie.vote_average * 10) / 10
  return simplifiedMovie
}

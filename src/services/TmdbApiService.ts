import axios from 'axios'
import { API_ROOT, ACCESS_TOKEN, getDateString } from '../utils/util'
import {
  DiscoverMoviesResult, Genre, MovieCollectionDetails,
  MovieDetailsWithCreditsAndSimilar, PersonWithCredits
} from '../types/TmdbApi.types'

const instance = axios.create({
  baseURL: API_ROOT,
  headers: { Authorization: `Bearer ${ACCESS_TOKEN}` }
})

const get = async <T>(endpoint: string) => {
  const response = await instance.get<T>(endpoint)
  return response.data
}

export const discover = async (
  { page, sortBy, genre }: {
    page?: number
    sortBy?: string
    genre?: number
  } = {}, additionalOptions?: Record<string, string>
) => {
  const params = new URLSearchParams({
    include_adult: 'false',
    include_video: 'false',
    language: 'en-US',
    region: 'US',
    sort_by: sortBy || 'popularity.desc',
    with_genres: genre ? String(genre) : '',
    page: page ? String(page) : '1',
    'vote_count.gte': '250',
    'with_runtime.gte': '30',
    ...additionalOptions
  })
  return await get<DiscoverMoviesResult>(`discover/movie?${params}`)
}

export const getPopularMovies = async (page?: number) => {
  return await discover({ page })
}

export const getTopMovies = async (page?: number) => {
  return await discover(
    { page, sortBy: 'vote_average.desc' },
    { without_genres: '99' }
  )
}

export const getMoviesInTheaters = async (page?: number) => {
  const startTime = Date.now() - 1000 * 60 * 60 * 24 * 7 * 6
  return await discover(
    { page },
    {
      with_release_type: '2|3',
      'primary_release_date.gte': getDateString(new Date(startTime)),
      'release_date.lte': getDateString(new Date()),
      'vote_count.gte': '0'
    }
  )
}

export const getMovie = async (id: number | string) => {
  return await get<MovieDetailsWithCreditsAndSimilar>(
    `movie/${id}?append_to_response=credits,similar`
  )
}

export const searchMovies = async (query: string, page?: number) => {
  return await get<DiscoverMoviesResult>(
    `search/movie?query=${query}&include_adult=false&language=en-US&page=${page || 1}&region=US`
  )
}

export const getGenres = async () => {
  return await get<{ genres: Genre[] }>('genre/movie/list?language=en')
}

export const getPerson = async (id: number | string) => {
  return await get<PersonWithCredits>(
    `person/${id}?append_to_response=movie_credits`
  )
}

export const getCollection = async (id?: number) => {
  if (!id) return
  return await get<MovieCollectionDetails>(`collection/${id}`)
}

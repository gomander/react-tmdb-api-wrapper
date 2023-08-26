import axios from 'axios'
import { API_ROOT, ACCESS_TOKEN } from '../utils/util'
import {
  DiscoverMoviesResult, Genre, MovieDetailsWithCredits, PersonWithCredits
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
  { page, sortBy, genre, minimumVotes }: {
    page?: number
    sortBy?: string
    genre?: number
    minimumVotes?: number
  } = {}
) => {
  const params = new URLSearchParams({
    include_adult: 'false',
    include_video: 'false',
    language: 'en-US',
    region: 'US',
    sort_by: sortBy || 'popularity.desc',
    with_genres: genre ? String(genre) : '',
    page: page ? String(page) : '1',
    'vote_count.gte': minimumVotes ? String(minimumVotes) : '1',
    'primary_release_date.lte': new Date().toISOString().split('T')[0]
  })
  return await get<DiscoverMoviesResult>(`discover/movie?${params}`)
}

export const getPopularMovies = async (page?: number) => {
  return await discover({ page })
}

export const getTopMovies = async (page?: number) => {
  return await discover({
    page,
    sortBy: 'vote_average.desc',
    minimumVotes: 1000
  })
}

export const getLatestMovies = async (page?: number) => {
  return await discover({
    page,
    sortBy: 'primary_release_date.desc'
  })
}

export const getMovie = async (id: number | string) => {
  return await get<MovieDetailsWithCredits>(`movie/${id}?append_to_response=credits`)
}

export const getGenres = async () => {
  return await get<{ genres: Genre[] }>('genre/movie/list?language=en')
}

export const getPerson = async (id: number | string) => {
  return await get<PersonWithCredits>(`person/${id}?append_to_response=movie_credits`)
}

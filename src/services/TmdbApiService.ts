import axios from 'axios'
import { DiscoverMoviesResult } from '../types/TmdbApi.types'

const API_ROOT = import.meta.env.VITE_APP_API_ROOT
const API_KEY = import.meta.env.VITE_APP_API_KEY
const ACCESS_TOKEN = import.meta.env.VITE_APP_ACCESS_TOKEN

if (!(API_ROOT && API_KEY && ACCESS_TOKEN)) {
  throw new Error('Environment variables incorrectly configured!')
}

const instance = axios.create({
  baseURL: API_ROOT, headers: { Authorization: `Bearer ${ACCESS_TOKEN}` }
})

const get = async <T>(endpoint: string) => {
  const response = await instance.get<T>(endpoint)
  return response.data
}

export const discover = async (
  { page, sortBy }: { page?: number, sortBy?: string } = {}
) => {
  if (!page) page = 1
  if (!sortBy) sortBy = 'popularity.desc'
  return await get<DiscoverMoviesResult>(
    `discover/movie?include_adult=false&include_video=false&language=en-US&sort_by=${sortBy}&page=${page}`
  )
}

export const getPopularMovies = async (page?: number) => {
  return await discover({ page })
}

export const getTopMovies = async (page?: number) => {
  return await discover({ page, sortBy: 'vote_average.desc' })
}

export const getLatestMovies = async (page?: number) => {
  return await discover({ page, sortBy: 'primary_release_date.desc' })
}

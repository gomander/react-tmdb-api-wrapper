export interface DiscoverMovie {
  adult: boolean
  backdrop_path: ImagePath
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: ImagePath
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

export interface DiscoverMoviesResult {
  page: number
  results: DiscoverMovie[]
  total_pages: number
  total_results: number
}

export interface MovieDetails {
  adult: boolean
  backdrop_path: ImagePath
  belongs_to_collection: DiscoverMovieCollection | null
  budget: number
  genres: Genre[]
  homepage: string
  id: number
  imdb_id: string
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: ImagePath
  production_companies: Company[]
  release_date: string
  revenue: number
  runtime: number
  spoken_languages: Language[]
  status: string
  tagline: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

interface DiscoverMovieCollection {
  id: number
  name: string
  poster_path: string
  backdrop_path: string
}

export interface Genre {
  id: number
  name: string
}

interface Company {
  id: number
  logo_path: ImagePath
  name: string
  origin_country: string
}

interface Language {
  english_name: string
  iso_639_1: string
  name: string
}

type ImagePath = string | null

interface MoviePerson {
  adult: boolean
  gender: Gender
  id: number
  known_for_departmnent: string
  name: string
  original_name: string
  popularity: number
  profile_path: ImagePath
  credit_id: string
}

export interface CastMember extends MoviePerson {
  cast_id: number
  character: string
  order: number
}

export interface CrewMember extends MoviePerson {
  department: string
  job: string
}

export interface MovieDetailsWithCreditsAndSimilar extends MovieDetails {
  credits: {
    cast: CastMember[]
    crew: CrewMember[]
  }
  similar: DiscoverMoviesResult
}

export interface Person {
  adult: boolean
  also_known_as: string[]
  biography: string
  birthday: string
  deathday: string | null
  gender: Gender
  homepage: string | null
  id: number
  imdb_id: string
  known_for_department: string
  name: string
  place_of_birth: string
  popularity: number
  profile_path: ImagePath
}

export interface PersonWithCredits extends Person {
  movie_credits: {
    cast: CastMovie[]
    crew: CrewMovie[]
  }
}

enum Gender {
  'Not set / not specified',
  'Female',
  'Male',
  'Non-binary'
}

export interface CastMovie extends DiscoverMovie {
  character: string
  credit_id: string
  order: number
}

export interface CrewMovie extends DiscoverMovie {
  credit_id: string
  department: string
  job: string
}

export interface MovieCollectionDetails {
  id: number
  name: string
  overview: string
  poster_path: ImagePath
  backdrop_path: ImagePath
  parts: DiscoverMovie[]
}

export type Timeframe = 'day' | 'week'

export type DiscoverMovie = {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

export type DiscoverMoviesResult = {
  page: number
  results: DiscoverMovie[]
  total_pages: number
  total_results: number
}

export type MovieDetails = {
  adult: boolean
  backdrop_path: string
  belongs_to_collection: MovieCollection | null
  budget: number
  genres: Genre[]
  homepage: string
  id: number
  imdb_id: string
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
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

type MovieCollection = {
  id: number
  name: string
  poster_path: string
  backdrop_path: string
}

type Genre = {
  id: number
  name: string
}

type Company = {
  id: number
  logo_path: string
  name: string
  origin_country: string
}

type Language = {
  english_name: string
  iso_639_1: string
  name: string
}

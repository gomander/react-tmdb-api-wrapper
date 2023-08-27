import { FormEvent, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import SearchForm from '../components/SearchForm'
import MoviesList from '../components/MoviesList'
import { searchMovies } from '../services/TmdbApiService'

const SearchMoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [search, setSearch] = useState(searchParams.get('query') || '')

  const handleSearch = (e: FormEvent, query: string) => {
    e.preventDefault()
    setSearch(query)
    setSearchParams({ query })
  }

  useEffect(() => {
    document.title = 'Search movies'
  }, [])

  useEffect(() => {
    if (!search) return
    document.title = `Search results - ${search}`
  }, [search])

  return (
    <>
      <h1>Search movies</h1>

      <SearchForm handleSearch={handleSearch} />

      <MoviesList
        queryName={{ name: 'search-movies', search }}
        queryFn={page => {
          if (!search) return null
          return searchMovies(search, page)
        }}
      />
    </>
  )
}

export default SearchMoviesPage

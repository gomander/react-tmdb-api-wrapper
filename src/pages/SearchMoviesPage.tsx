import { FormEvent, useState } from 'react'
import SearchForm from '../components/SearchForm'
import MoviesList from '../components/MoviesList'
import { searchMovies } from '../services/TmdbApiService'

const SearchMoviesPage = () => {
  const [search, setSearch] = useState('')

  const handleSearch = (e: FormEvent, query: string) => {
    e.preventDefault()
    setSearch(query)
  }

  return (
    <>
      <h1>Search movies</h1>

      <SearchForm handleSearch={handleSearch} />

      <MoviesList
        queryName={{ name: 'search-movies', search }}
        queryFn={page => searchMovies(search, page)}
      />
    </>
  )
}

export default SearchMoviesPage

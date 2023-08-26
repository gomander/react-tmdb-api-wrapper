import { FormEvent, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { getGenres } from '../services/TmdbApiService'
import { useSearchParams } from 'react-router-dom'

const sorts = [
  { label: 'Popularity', value: 'popularity.desc' },
  { label: 'Ratings', value: 'vote_average.desc' },
  { label: 'Release date', value: 'primary_release_date.desc' },
  { label: 'Revenue', value: 'revenue.desc' },
]

const onSubmit = (e: FormEvent) => {
  e.preventDefault()
}

const BrowseMoviesForm = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [search] = useState(searchParams.get('search') || '')
  const [genre] = useState(searchParams.get('genre') || '')
  const [sort] = useState(searchParams.get('sort') || 'popularity.desc')
  const genresQuery = useQuery({
    queryKey: ['genres'],
    queryFn: () => getGenres()
  })

  const updateSearchParams = (
    { newSearch, newGenre, newSort }: {
      newSearch?: string
      newGenre?: string
      newSort?: string
    } = {}
  ) => {
    const params = new URLSearchParams()
    if (newSearch || search) params.set('search', newSearch || search)
    if (newGenre || genre) params.set('genre', newGenre || genre)
    if (newSort || sort) params.set('sort', newSort || sort)
    setSearchParams(params)
  }

  return (
    <Form onSubmit={onSubmit} className="d-flex flex-column row-gap-3">
      <Form.Group controlId="movieTitle">
        <Form.Label>Movie title</Form.Label>
        <Form.Control type="text" />
      </Form.Group>

      <div className="d-flex column-gap-3">
        <Form.Group controlId="movieGenre" className="w-50">
          <Form.Label>Genre</Form.Label>
          <Form.Select
            defaultValue={genre}
            onChange={e => updateSearchParams({ newGenre: e.target.value })}
          >
            <option value="">All</option>
            {
              genresQuery.data &&
              genresQuery.data.genres.map(genre => (
                <option
                  value={genre.id}
                  key={genre.id}
                >{genre.name}</option>
              ))
            }
          </Form.Select>
        </Form.Group>

        <Form.Group controlId="movieSort" className="w-50">
          <Form.Label>Sort by</Form.Label>
          <Form.Select
            defaultValue={sort}
            onChange={e => updateSearchParams({ newSort: e.target.value })}
          >
            {
              sorts.map(sort => (
                <option
                  value={sort.value}
                  key={sort.value}
                >{sort.label}</option>
              ))
            }
          </Form.Select>
        </Form.Group>
      </div>

      <Button variant="primary" type="submit">Search</Button>
    </Form>
  )
}

export default BrowseMoviesForm

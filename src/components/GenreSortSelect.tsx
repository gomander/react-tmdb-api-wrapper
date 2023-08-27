import { FormEvent, useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import Form from 'react-bootstrap/Form'
import { getGenres } from '../services/TmdbApiService'
import { useSearchParams } from 'react-router-dom'
import { DiscoverOptions } from '../types/util.type'

const sorts = [
  { label: 'Popularity', value: 'popularity.desc' },
  { label: 'Ratings', value: 'vote_average.desc' },
  { label: 'Release date', value: 'primary_release_date.desc' },
  { label: 'Revenue', value: 'revenue.desc' },
]

interface Props {
  onSearch: (discoverOptions: DiscoverOptions) => void
}

const GenreSortSelect = ({ onSearch }: Props) => {
  const [searchParams] = useSearchParams()
  const [genre, setGenre] = useState(Number(searchParams.get('genre')) || 0)
  const [sort, setSort] = useState(searchParams.get('sort') || 'popularity.desc')
  const genresQuery = useQuery({
    queryKey: ['genres'],
    queryFn: () => getGenres()
  })

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    onSearch({ genre, sort })
  }

  useEffect(() => onSearch({ genre, sort }), [genre, sort])

  return (
    <Form onSubmit={onSubmit} className="d-flex flex-column row-gap-3 mb-3">
      <div className="d-flex column-gap-3">
        <Form.Group controlId="movieGenre" className="w-50">
          <Form.Label>Genre</Form.Label>
          <Form.Select
            value={genre}
            onChange={e => setGenre(Number(e.target.value))}
          >
            <option value={0}>All</option>
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
            value={sort}
            onChange={e => setSort(e.target.value)}
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
    </Form>
  )
}

export default GenreSortSelect

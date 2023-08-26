import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import Image from 'react-bootstrap/Image'
import { formatDate } from '../utils/util'
import { getMovie } from '../services/TmdbApiService'

const MovieDetailsPage = () => {
  const { id } = useParams()
  const movieQuery = useQuery({
    queryKey: ['movie', { id }],
    queryFn: () => getMovie(id!)
  })

  return (
    <>
      {
        movieQuery.data &&
        <>
          <h1>{movieQuery.data.title}</h1>

          <Image
            fluid
            src={`https://image.tmdb.org/t/p/w500/${movieQuery.data.poster_path}`}
            alt=""
          />

          <h2>Overview</h2>
          <p>{movieQuery.data.overview}</p>

          <h2>Release date</h2>
          <p>{formatDate(movieQuery.data.release_date)}</p>

          <h2>Rating</h2>
          <p>{movieQuery.data.vote_average} / 10</p>

          <h2>Runtime</h2>
          <p>{movieQuery.data.runtime} minutes</p>
        </>
      }
    </>
  )
}

export default MovieDetailsPage

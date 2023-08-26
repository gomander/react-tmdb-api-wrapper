import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import Image from 'react-bootstrap/Image'
import { IMAGE_ROOT, formatDate, formatTime } from '../utils/util'
import { getMovie } from '../services/TmdbApiService'

const MovieDetailsPage = () => {
  const { id } = useParams()
  const movieQuery = useQuery({
    queryKey: ['movie', { id }],
    queryFn: () => getMovie(id!)
  })
  const movie = movieQuery.data

  return (
    <>
      {
        movie &&
        <>
          <h1>{movie.title}</h1>

          <div className="d-flex flex-wrap row-gap-3 column-gap-4">
            <Image
              fluid
              src={`${IMAGE_ROOT}w500/${movie.poster_path}`}
              alt=""
              width={500}
            />

            <div>
              <h2>Overview</h2>
              <p style={{ maxWidth: '45em' }}>{movie.overview}</p>

              <h2>Release date</h2>
              <p>{formatDate(movie.release_date)}</p>

              <h2>Rating</h2>
              <p>{movie.vote_average} / 10</p>

              <h2>Runtime</h2>
              <p>{formatTime(movie.runtime)}</p>

              {
                movie.homepage &&
                <>
                  <h2>Homepage</h2>
                  <p>
                    <a target="_blank" href={movie.homepage}>
                      {movie.homepage}
                    </a>
                  </p>
                </>
              }
            </div>
          </div>
        </>
      }
    </>
  )
}

export default MovieDetailsPage

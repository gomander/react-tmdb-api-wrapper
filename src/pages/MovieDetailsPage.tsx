import { useEffect } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import Alert from 'react-bootstrap/Alert'
import Image from 'react-bootstrap/Image'
import { IMAGE_ROOT, formatDate, formatTime } from '../utils/util'
import { getMovie } from '../services/TmdbApiService'
import ActorCard from '../components/ActorCard'
import useHistory from '../hooks/useHistory'

const MovieDetailsPage = () => {
  const { id } = useParams()
  const movieQuery = useQuery({
    queryKey: ['movie', { id }],
    queryFn: () => getMovie(id!)
  })
  const movie = movieQuery.data

  const [_getHistory, pushHistory] = useHistory()

  useEffect(() => {
    if (!movie) return
    document.title = `${movie.title} - TMDB`
    pushHistory(movie)
  }, [movie])

  return (
    <>
      {
        movie &&
        <>
          <h1>{movie.title}</h1>

          <div className="mb-3 d-flex flex-wrap row-gap-3 column-gap-4">
            <div>
              <Image
                fluid
                src={`${IMAGE_ROOT}w500/${movie.poster_path}`}
                alt=""
                width={500}
              />
            </div>

            <div>
              <h2>Overview</h2>
              <p style={{ maxWidth: '45em' }}>{movie.overview}</p>

              <h2>Release date</h2>
              <p>{formatDate(movie.release_date)}</p>

              <h2>Rating</h2>
              <p>{movie.vote_average} / 10</p>

              <h2>Runtime</h2>
              <p>{formatTime(movie.runtime)}</p>

              <h2>Genres</h2>
              <ul>
                {
                  movie.genres.map(genre =>
                    <li key={genre.id}>{genre.name}</li>
                  )
                }
              </ul>

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

          <h2>Cast</h2>
          <ul className="card-list justify-content-center px-0">
            {
              movie.credits.cast.map(castMember => (
                <li key={castMember.credit_id}>
                  <ActorCard castMember={castMember} />
                </li>
              ))
            }
          </ul>
        </>
      }
      {
        movieQuery.isError &&
        <>
          <Alert variant="danger">The movie could not be found!</Alert>
          <NavLink
            to={'/'}
            className="btn btn-primary"
          >Go home</NavLink>
        </>
      }
    </>
  )
}

export default MovieDetailsPage

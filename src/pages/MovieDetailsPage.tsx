import { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Collapse from 'react-bootstrap/Collapse'
import Image from 'react-bootstrap/Image'
import { IMAGE_ROOT, formatDate, formatTime } from '../utils/util'
import { getCollection, getMovie } from '../services/TmdbApiService'
import ActorCard from '../components/ActorCard'
import CrewCard from '../components/CrewCard'
import useHistory from '../hooks/useHistory'
import MovieCard from '../components/MovieCard'

const MovieDetailsPage = () => {
  const { id } = useParams()
  const movieQuery = useQuery({
    queryKey: ['movie', { id }],
    queryFn: () => getMovie(id!)
  })
  const movie = movieQuery.data

  const collectionQuery = useQuery({
    enabled: !!movie?.belongs_to_collection,
    queryKey: ['collection', { id: movie?.belongs_to_collection?.id }],
    queryFn: () => getCollection(movie?.belongs_to_collection?.id)
  })

  const [_getHistory, pushHistory] = useHistory()

  useEffect(() => {
    if (!movie) return
    document.title = `${movie.title} - TMDB`
    pushHistory(movie)
  }, [movie])

  const [showCast, setShowCast] = useState(true)
  const [showCrew, setShowCrew] = useState(false)
  const [showCollection, setShowCollection] = useState(true)

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

          <div className="my-2 d-flex justify-content-between">
            <h2>Cast</h2>

            <Button
              variant="primary"
              onClick={() => setShowCast(!showCast)}
            >
              {showCast ? 'Collapse' : 'Expand'}
            </Button>
          </div>

          <Collapse in={showCast}>
            <ul className="card-list justify-content-center px-0">
              {
                movie.credits.cast.map(castMember => (
                  <li key={castMember.credit_id}>
                    <ActorCard castMember={castMember} />
                  </li>
                ))
              }
            </ul>
          </Collapse>

          <div className="my-2 d-flex justify-content-between">
            <h2>Crew</h2>

            <Button
              variant="primary"
              onClick={() => setShowCrew(!showCrew)}
            >
              {showCrew ? 'Collapse' : 'Expand'}
            </Button>
          </div>

          <Collapse in={showCrew}>
            <ul className="card-list justify-content-center px-0">
              {
                movie.credits.crew.map(crewMember => (
                  <li key={crewMember.credit_id}>
                    <CrewCard crewMember={crewMember} />
                  </li>
                ))
              }
            </ul>
          </Collapse>

          {
            movie.belongs_to_collection && collectionQuery.data &&
            <>
              <div className="my-2 d-flex justify-content-between">
                <h2>Movies in "{movie.belongs_to_collection.name}"</h2>

                <Button
                  variant="primary"
                  onClick={() => setShowCollection(!showCollection)}
                >
                  {showCollection ? 'Collapse' : 'Expand'}
                </Button>
              </div>

              <Collapse in={showCollection}>
                <ul className="card-list justify-content-center px-0">
                  {
                    collectionQuery.data.parts.map(part => (
                      <li key={part.id}>
                        <MovieCard movie={part} />
                      </li>
                    ))
                  }
                </ul>
              </Collapse>
            </>
          }
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

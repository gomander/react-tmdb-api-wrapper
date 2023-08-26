import Card from 'react-bootstrap/Card'
import Image from 'react-bootstrap/Image'
import { NavLink } from 'react-router-dom'
import { formatDate } from '../utils/util'
import { DiscoverMovie } from '../types/TmdbApi.types'

interface Props {
  movie: DiscoverMovie
}

const MovieCard = ({ movie }: Props) => {
  return (
    <Card
      as={NavLink}
      to={`/movie/${movie.id}`}
      className="text-decoration-none"
    >
      <Card.Header>{movie.title}</Card.Header>

      <Card.Body className="px-0 py-0">
        <Image
          fluid
          src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
          alt=""
          className="w-100"
        />
      </Card.Body>

      <Card.Footer className="d-flex justify-content-between">
        <div>Released {formatDate(movie.release_date)}</div>

        <div>Rated {movie.vote_average} / 10</div>
      </Card.Footer>
    </Card>
  )
}

export default MovieCard

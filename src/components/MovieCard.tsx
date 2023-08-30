import { formatDate } from '../utils/util'
import { DiscoverMovie, MovieDetails } from '../types/TmdbApi.types'
import ImageLinkCard from './ImageLinkCard'

interface Props { movie: DiscoverMovie | MovieDetails }

const MovieCard = ({ movie }: Props) => {
  return (
    <ImageLinkCard
      link={`/movie/${movie.id}`}
      header={movie.title}
      image={movie.poster_path}
      footerLeft={`Released ${formatDate(movie.release_date)}`}
      footerRight={`Rated ${Math.round(movie.vote_average * 10) / 10} / 10`}
    />
  )
}

export default MovieCard

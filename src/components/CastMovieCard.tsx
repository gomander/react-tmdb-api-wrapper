import { CastMovie } from '../types/TmdbApi.types'
import ImageLinkCard from './ImageLinkCard'

interface Props { movie: CastMovie }

const CastMovieCard = ({ movie }: Props) => {
  return (
    <ImageLinkCard
      link={`/movie/${movie.id}`}
      header={movie.title}
      image={movie.poster_path}
      footerLeft={`As ${movie.character}`}
    />
  )
}

export default CastMovieCard

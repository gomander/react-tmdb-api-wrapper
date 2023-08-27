import { CrewMovie } from '../types/TmdbApi.types'
import ImageLinkCard from './ImageLinkCard'

interface Props { movie: CrewMovie }

const CrewMovieCard = ({ movie }: Props) => {
  return (
    <ImageLinkCard
      link={`/movie/${movie.id}`}
      header={movie.title}
      image={movie.poster_path}
      footerLeft={`Role: ${movie.job}`}
    />
  )
}

export default CrewMovieCard

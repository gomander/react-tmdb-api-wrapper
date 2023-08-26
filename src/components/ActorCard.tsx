import { CastMember } from '../types/TmdbApi.types'
import ImageLinkCard from './ImageLinkCard'

interface Props { castMember: CastMember }

const ActorCard = ({ castMember }: Props) => {
  return (
    <ImageLinkCard
      link={`/person/${castMember.id}`}
      header={castMember.name}
      image={castMember.profile_path}
      footerLeft={`As ${castMember.character}`}
    />
  )
}

export default ActorCard

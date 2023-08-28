import { CrewMember } from '../types/TmdbApi.types'
import ImageLinkCard from './ImageLinkCard'

interface Props { crewMember: CrewMember }

const CrewCard = ({ crewMember }: Props) => {
  return (
    <ImageLinkCard
      link={`/person/${crewMember.id}`}
      header={crewMember.name}
      image={crewMember.profile_path}
      footerLeft={`Role: ${crewMember.job}`}
    />
  )
}

export default CrewCard

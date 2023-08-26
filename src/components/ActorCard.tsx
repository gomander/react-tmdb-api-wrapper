import Card from 'react-bootstrap/Card'
import Image from 'react-bootstrap/Image'
import { NavLink } from 'react-router-dom'
import { IMAGE_ROOT } from '../utils/util'
import { CastMember } from '../types/TmdbApi.types'

interface Props {
  castMember: CastMember
}

const ActorCard = ({ castMember }: Props) => {
  return (
    <Card
      as={NavLink}
      to={`/person/${castMember.id}`}
      className="text-decoration-none h-100"
    >
      <Card.Header>{castMember.name}</Card.Header>

      <Card.Body className="px-0 py-0 d-flex justify-content-center align-items-center">
        {
          castMember.profile_path &&
          <Image
            fluid
            src={`${IMAGE_ROOT}w300/${castMember.profile_path}`}
            alt=""
            className="w-100"
          />
        }
        {
          !castMember.profile_path &&
          <p>No picture available</p>
        }
      </Card.Body>

      <Card.Footer>
        As {castMember.character}
      </Card.Footer>
    </Card>
  )
}

export default ActorCard

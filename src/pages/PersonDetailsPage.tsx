import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import Image from 'react-bootstrap/Image'
import { getPerson } from '../services/TmdbApiService'
import { IMAGE_ROOT } from '../utils/util'

const PersonDetailsPage = () => {
  const { id } = useParams()
  const personQuery = useQuery({
    queryKey: ['person', { id }],
    queryFn: () => getPerson(id!)
  })
  const person = personQuery.data

  return (
    <>
      {
        person &&
        <>
          <h1>{person.name}</h1>

          <div className="mb-3 d-flex flex-wrap row-gap-3 column-gap-4">
            <Image
              fluid
              src={`${IMAGE_ROOT}w500/${person.profile_path}`}
              alt=""
              width={500}
            />
          </div>
        </>
      }
    </>
  )
}

export default PersonDetailsPage

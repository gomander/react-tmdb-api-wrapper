import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import Image from 'react-bootstrap/Image'
import { getPerson } from '../services/TmdbApiService'
import { IMAGE_ROOT, formatDate } from '../utils/util'
import CastMovieCard from '../components/CastMovieCard'
import CrewMovieCard from '../components/CrewMovieCard'

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
            <div>
              <Image
                fluid
                src={`${IMAGE_ROOT}w500/${person.profile_path}`}
                alt=""
                width={500}
              />
            </div>

            <div>
              <h2>Biography</h2>
              <p style={{ maxWidth: '45em' }}>{person.biography}</p>

              <h2>Birthday</h2>
              <p>{formatDate(person.birthday)}</p>

              <h2>Place of birth</h2>
              <p>{person.place_of_birth}</p>

              {
                person.deathday &&
                <>
                  <h2>Deathday</h2>
                  <p>{formatDate(person.deathday)}</p>
                </>
              }

              {
                person.also_known_as.length > 0 &&
                <>
                  <h2>Also known as</h2>
                  <ul>
                    {
                      person.also_known_as.map(name =>
                        <li key={name}>{name}</li>
                      )
                    }
                  </ul>
                </>
              }

              {
                person.homepage &&
                <>
                  <h2>Homepage</h2>
                  <p>
                    <a target="_blank" href={person.homepage}>
                      {person.homepage}
                    </a>
                  </p>
                </>
              }
            </div>
          </div>

          <h2>Credited in</h2>
          {
            person.movie_credits.cast.length > 0 &&
            <>
              <h3>As cast</h3>
              <ul className="card-list justify-content-center px-0">
                {
                  person.movie_credits.cast.map(movie => (
                    <li key={movie.credit_id}>
                      <CastMovieCard movie={movie} />
                    </li>
                  ))
                }
              </ul>
            </>
          }
          {
            person.movie_credits.crew.length > 0 &&
            <>
              <h3>As crew</h3>
              <ul className="card-list justify-content-center px-0">
                {
                  person.movie_credits.crew.map(movie => (
                    <li key={movie.credit_id}>
                      <CrewMovieCard movie={movie} />
                    </li>
                  ))
                }
              </ul>
            </>
          }
        </>
      }
    </>
  )
}

export default PersonDetailsPage

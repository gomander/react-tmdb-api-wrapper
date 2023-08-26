import Card from 'react-bootstrap/Card'
import Image from 'react-bootstrap/Image'
import { NavLink } from 'react-router-dom'
import { IMAGE_ROOT } from '../utils/util'

interface Props {
  link: string
  header: string
  image: string | null
  footerLeft: string
  footerRight?: string
}

const ImageLinkCard = (
  { link, header, image, footerLeft, footerRight }: Props
) => {
  return (
    <Card
      as={NavLink}
      to={link}
      className="text-decoration-none h-100"
    >
      <Card.Header>{header}</Card.Header>

      <Card.Body className="px-0 py-0 d-flex justify-content-center align-items-center">
        {
          image &&
          <Image
            fluid
            src={`${IMAGE_ROOT}w300/${image}`}
            alt=""
            className="w-100"
          />
        }
        {
          !image &&
          <p>No picture available</p>
        }
      </Card.Body>

      <Card.Footer className="d-flex justify-content-between">
        <div>{footerLeft}</div>
        <div>{footerRight}</div>
      </Card.Footer>
    </Card>
  )
}

export default ImageLinkCard

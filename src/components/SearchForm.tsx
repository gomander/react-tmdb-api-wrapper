import { FormEvent, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

interface Props {
  handleSearch: (e: FormEvent, query: string) => void
}

const SearchForm = ({ handleSearch }: Props) => {
  const [query, setQuery] = useState('')

  return (
    <Form
      onSubmit={e => handleSearch(e, query)}
      className="mb-3 d-flex column-gap-3"
    >
      <Form.Group className="col">
        <Form.Control
          type="text"
          placeholder="Type your query..."
          name="query"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
      </Form.Group>

      <Button
        type="submit"
        variant="primary"
        className="col-3"
      >Search</Button>
    </Form>
  )
}

export default SearchForm

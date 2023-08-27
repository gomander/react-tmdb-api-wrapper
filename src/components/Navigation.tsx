import { NavLink, Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

const Navigation = () => {
	return (
		<Navbar bg="dark" variant="dark" expand="md">
			<Container>
				<Navbar.Brand as={Link} to="/">TMDB</Navbar.Brand>

				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/movies/popular">Popular</Nav.Link>
            <Nav.Link as={NavLink} to="/movies/top">Top Rated</Nav.Link>
            <Nav.Link as={NavLink} to="/movies/in-theaters">In Theaters</Nav.Link>
            <Nav.Link as={NavLink} to="/movies/by-genre">By Genre</Nav.Link>
            <Nav.Link as={NavLink} to="/movies/search">Search</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}

export default Navigation

import { Route, Routes } from 'react-router-dom'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import HomePage from './pages/HomePage'
import PopularMoviesPage from './pages/PopularMoviesPage'
import TopMoviesPage from './pages/TopMoviesPage'
import InTheatersPage from './pages/InTheatersPage'
import MoviesByGenrePage from './pages/MoviesByGenrePage'
import MovieDetailsPage from './pages/MovieDetailsPage'
import PersonDetailsPage from './pages/PersonDetailsPage'
import NotFoundPage from './pages/NotFoundPage'
import Navigation from './components/Navigation'
import Container from 'react-bootstrap/Container'
import './assets/sass/App.sass'

function App() {
  return (
    <>
      <Navigation />

      <Container className="py-3">
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/movies">
            <Route path="popular" element={<PopularMoviesPage />} />

            <Route path="top" element={<TopMoviesPage />} />

            <Route path="in-theaters" element={<InTheatersPage />} />

            <Route path="by-genre" element={<MoviesByGenrePage />} />
          </Route>

          <Route path="/movie/:id" element={<MovieDetailsPage />} />

          <Route path="/person/:id" element={<PersonDetailsPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Container>

      <ReactQueryDevtools />
    </>
  )
}

export default App

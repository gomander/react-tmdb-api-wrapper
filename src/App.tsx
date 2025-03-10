import { Route, Routes } from 'react-router-dom'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import HomePage from './pages/HomePage'
import TrendingMoviesPage from './pages/TrendingMoviesPage'
import TopMoviesPage from './pages/TopMoviesPage'
import InTheatersPage from './pages/InTheatersPage'
import MoviesByGenrePage from './pages/MoviesByGenrePage'
import SearchMoviesPage from './pages/SearchMoviesPage'
import MovieDetailsPage from './pages/MovieDetailsPage'
import PersonDetailsPage from './pages/PersonDetailsPage'
import NotFoundPage from './pages/NotFoundPage'
import Navigation from './components/Navigation'
import Spinner from './components/Spinner'
import Container from 'react-bootstrap/Container'
import './assets/sass/App.sass'

function App() {
  return (
    <>
      <Navigation />

      <Spinner />

      <Container className="py-3">
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/movies">
            <Route path="trending" element={<TrendingMoviesPage />} />

            <Route path="top" element={<TopMoviesPage />} />

            <Route path="in-theaters" element={<InTheatersPage />} />

            <Route path="by-genre" element={<MoviesByGenrePage />} />

            <Route path="search" element={<SearchMoviesPage />} />
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

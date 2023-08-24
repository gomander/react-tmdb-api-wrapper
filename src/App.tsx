import { Route, Routes } from 'react-router-dom'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import HomePage from './pages/HomePage'
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
        </Routes>
      </Container>

      <ReactQueryDevtools />
    </>
  )
}

export default App

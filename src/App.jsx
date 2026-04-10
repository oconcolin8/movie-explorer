import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import MovieDetailPage from './pages/MovieDetailPage'

function App() {
  return (
    <Routes>
      {/* When URL is '/' show the HomePage component */}
      <Route path="/" element={<HomePage />} />

      {/* When URL is '/movie/27205' for example, show MovieDetailPage */}
      {/* :id is a URL parameter — it can be any value */}
      <Route path="/movie/:id" element={<MovieDetailPage />} />
    </Routes>
  )
}

export default App
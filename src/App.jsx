import { Route, Routes } from 'react-router-dom'
import SearchPage from './pages/SearchPage.jsx'
import NotFound from './pages/NotFound.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<SearchPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App

import { Route, Routes } from 'react-router-dom'
import { NotFound } from '@pages/not-found'
import { SearchPage } from '@pages/search-page'
import { PageContainer } from '@shared/components'

export function App() {
  return (
    <PageContainer>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </PageContainer>
  )
}

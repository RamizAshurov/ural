import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { PageContainer } from '@shared/components'
import { MIN_QUERY_LENGTH, SearchForm } from '@modules/search'
import { useDebounce } from '@shared/hooks'
import SearchResults from './SearchResults.jsx'
import styles from './SearchPage.module.scss'

function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [search, setSearch] = useState(() => searchParams.get('q') ?? '')
  const query = useDebounce(search).trim()

  useEffect(() => {
    if ((searchParams.get('q') ?? '') === query) return
    setSearchParams(query ? { q: query } : {}, { replace: true })
  }, [query, searchParams, setSearchParams])

  return (
    <PageContainer>
      <h1 className={styles.title}>Поиск автозапчастей и аналогов</h1>
      <SearchForm value={search} onChange={setSearch} />
      {query.length >= MIN_QUERY_LENGTH && <SearchResults key={query} query={query} />}
    </PageContainer>
  )
}

export default SearchPage

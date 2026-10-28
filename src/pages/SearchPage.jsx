import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { PageContainer } from '@shared/components'
import { Manufacturers } from '@modules/manufacturer'
import { Products } from '@modules/product'
import {
  MIN_QUERY_LENGTH,
  SearchForm,
  loadAnalogues,
  loadManufacturers,
  resetSearch,
  selectSearch,
} from '@modules/search'
import { useDebounce } from '@shared/hooks'
import styles from './SearchPage.module.scss'

function SearchPage() {
  const dispatch = useDispatch()
  const { selectedBrand, manufacturers, analogues } = useSelector(selectSearch)
  const [searchParams, setSearchParams] = useSearchParams()
  const [search, setSearch] = useState(() => searchParams.get('q') ?? '')
  const query = useDebounce(search.trim())
  const analoguesRequest = useRef(null)

  useEffect(() => {
    if ((searchParams.get('q') ?? '') === query) return
    setSearchParams(query ? { q: query } : {}, { replace: true })
  }, [query, searchParams, setSearchParams])

  useEffect(() => {
    if (query.length < MIN_QUERY_LENGTH) {
      dispatch(resetSearch())
      return
    }
    const request = dispatch(loadManufacturers(query))
    return () => {
      request.abort()
      analoguesRequest.current?.abort()
    }
  }, [query, dispatch])

  function handleSelectBrand(brand) {
    if (brand === selectedBrand && !analogues.error) return
    analoguesRequest.current?.abort()
    analoguesRequest.current = dispatch(loadAnalogues({ query, brand }))
  }

  return (
    <PageContainer>
      <h1 className={styles.title}>Поиск автозапчастей и аналогов</h1>
      <SearchForm value={search} onChange={setSearch} />
      <Manufacturers
        isLoading={manufacturers.isLoading}
        error={manufacturers.error}
        data={manufacturers.data}
        search={query}
        selectedBrand={selectedBrand}
        onSelect={handleSelectBrand}
      />
      <Products
        isLoading={analogues.isLoading}
        error={analogues.error}
        data={analogues.data}
        brand={selectedBrand}
      />
    </PageContainer>
  )
}

export default SearchPage

import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { ManufacturerList } from '@modules/manufacturer'
import { ProductList } from '@modules/product'
import {
  MIN_QUERY_LENGTH,
  SearchForm,
  loadAnalogues,
  loadManufacturers,
  resetSearch,
  selectAnalogues,
  selectManufacturers,
  selectSelectedBrand,
} from '@modules/search'
import { useDebounce } from '@shared/hooks'
import styles from './search-page.module.scss'

export function SearchPage() {
  const dispatch = useDispatch()
  const selectedBrand = useSelector(selectSelectedBrand)
  const manufacturers = useSelector(selectManufacturers)
  const analogues = useSelector(selectAnalogues)
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
    if (brand === selectedBrand && analogues.status !== 'failed') return
    analoguesRequest.current?.abort()
    analoguesRequest.current = dispatch(loadAnalogues({ query, brand }))
  }

  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>Поиск автозапчастей и аналогов</h1>
        <p className={styles.lead}>
          Введите артикул, выберите производителя — покажем цены, наличие и аналоги
        </p>
      </header>
      <SearchForm value={search} onChange={setSearch} />
      <ManufacturerList
        status={manufacturers.status}
        error={manufacturers.error}
        data={manufacturers.data}
        query={query}
        selectedBrand={selectedBrand}
        onSelect={handleSelectBrand}
      />
      <ProductList
        status={analogues.status}
        error={analogues.error}
        data={analogues.data}
        brand={selectedBrand}
      />
    </>
  )
}

import { useEffect, useState } from 'react'
import { PageContainer } from '@shared/components'
import { SearchForm } from '@modules/search'
import { Manufacturers } from '@modules/manufacturer'
import { Products } from '@modules/product'
import { useDebounce, useFetching } from '@shared/hooks'
import { fetchAnalogues, fetchManufacturers } from '@api/service.js'
import styles from './SearchPage.module.scss'

const MIN_QUERY_LENGTH = 3

function SearchPage() {
  const [search, setSearch] = useState('')
  const [selectedBrand, setSelectedBrand] = useState(null)
  const debouncedSearch = useDebounce(search)

  const {
    fetchData: searchManufacturers,
    isLoading: isLoadingManufacturers,
    error: manufacturersError,
    data: manufacturersData,
  } = useFetching(fetchManufacturers)
  const {
    fetchData: searchAnalogues,
    isLoading: isLoadingAnalogues,
    error: analoguesError,
    data: analoguesData,
  } = useFetching(fetchAnalogues)

  useEffect(() => {
    const trimmed = debouncedSearch.trim()
    if (trimmed.length < MIN_QUERY_LENGTH) return
    searchManufacturers(trimmed)
  }, [debouncedSearch, searchManufacturers])

  function handleSelectBrand(brand) {
    setSelectedBrand(brand)
    searchAnalogues(debouncedSearch.trim(), brand)
  }

  return (
    <PageContainer>
      <h1 className={styles.title}>Поиск автозапчастей и аналогов</h1>
      <SearchForm value={search} onChange={setSearch} />
      <Manufacturers
        isLoading={isLoadingManufacturers}
        error={manufacturersError}
        data={manufacturersData}
        search={debouncedSearch.trim()}
        selectedBrand={selectedBrand}
        onSelect={handleSelectBrand}
      />
      <Products
        isLoading={isLoadingAnalogues}
        error={analoguesError}
        data={analoguesData}
        brand={selectedBrand}
      />
    </PageContainer>
  )
}

export default SearchPage

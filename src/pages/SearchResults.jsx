import { useEffect, useState } from 'react'
import { Manufacturers } from '@modules/manufacturer'
import { Products } from '@modules/product'
import { useFetching } from '@shared/hooks'
import { fetchAnalogues, fetchManufacturers } from '@api/service.js'

function SearchResults({ query }) {
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

  const [selectedBrand, setSelectedBrand] = useState(null)

  useEffect(() => {
    searchManufacturers(query)
  }, [query, searchManufacturers])

  function handleSelectBrand(brand) {
    if (brand === selectedBrand && !analoguesError) return
    setSelectedBrand(brand)
    searchAnalogues(query, brand)
  }

  return (
    <>
      <Manufacturers
        isLoading={isLoadingManufacturers}
        error={manufacturersError}
        data={manufacturersData}
        search={query}
        selectedBrand={selectedBrand}
        onSelect={handleSelectBrand}
      />
      <Products
        isLoading={isLoadingAnalogues}
        error={analoguesError}
        data={analoguesData}
        brand={selectedBrand}
      />
    </>
  )
}

export default SearchResults

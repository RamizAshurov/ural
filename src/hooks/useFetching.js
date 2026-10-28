import axios from 'axios'
import { useCallback, useState } from 'react'

export function useFetching(callback) {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetching = useCallback(
    async (...args) => {
      setIsLoading(true)
      setError(null)

      try {
        const result = await callback(...args)
        setData(result)
        return result
      } catch (err) {
        if (!axios.isCancel(err)) {
          setError(err)
        }
      } finally {
        setIsLoading(false)
      }
    },
    [callback],
  )

  return { fetching, isLoading, error, data }
}

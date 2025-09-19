import type { TPagination } from '@/types/pagination'
import type { TSeries } from '@/types/series'

export const useGetSeries = (
  page: number,
  func: (series: TSeries[], pagination: TPagination) => void,
) => {
  fetch(`${import.meta.env?.VITE_API_URL}/series`)
    .then(async (response) => {
      const parsedResponse = await response.json()
      const series = parsedResponse['series']
      const pagination = parsedResponse['pagination']
      func(series, pagination)
    })
    .catch((error) => {})
}

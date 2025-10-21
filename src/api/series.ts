import type { TPagination } from '@/types/pagination'
import type { TSeries } from '@/types/series'
import { store } from '@/store'

const SERIES_COUNT = 10

export const useGetSeries = (
  page: number,
  func: (series: TSeries[], pagination: TPagination) => void,
) => {
  let series: TSeries[] = store.series.series
  let totalPages: number = store.series.totalPages

  const length = (page - 1) * SERIES_COUNT + 1

  if (series.length >= length) {
    const sliceIndex = page * SERIES_COUNT
    func(series.slice(0, sliceIndex), { currentPage: page, totalPages })
    return
  } else if (store.networkOperation === 'get.series') return

  store.networkOperation = 'get.series'

  fetch(`${import.meta.env?.VITE_API_URL}/series?page=${page}&count=${SERIES_COUNT}`)
    .then(async (response) => {
      const parsedResponse = await response.json()
      const fetchedSeries = parsedResponse['series']
      const pagination = parsedResponse['pagination']
      const series = [...store.series.series, ...fetchedSeries]
      store.series = { series, totalPages: pagination['totalPages'] }

      func(series, pagination)
      store.networkOperation = ''
    })
    .catch((error) => {})
}

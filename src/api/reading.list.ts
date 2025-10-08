import { store } from '@/store'
import type { TReadingListItem } from '@/types/reading.list'

export const useGetReadingList = (func: (items: TReadingListItem[]) => void) => {
  if (store['reading-list']) {
    func(store['reading-list'])
    return
  }

  fetch(`${import.meta.env?.VITE_API_URL}/reading-list`)
    .then(async (response) => {
      const readingList = await response.json()
      store['reading-list'] = readingList
      func(readingList)
    })
    .catch(() => {})
}

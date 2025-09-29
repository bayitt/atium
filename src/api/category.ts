import { store } from '@/store'

type TCategory = {
  uuid: string
  name: string
  slug: string
}

export const useGetCategories = (func: (categories: TCategory[]) => void) => {
  if (store['categories']) {
    func(store['categories'])
    return
  }

  fetch(`${import.meta.env?.VITE_API_URL}/categories`)
    .then(async (response) => {
      const parsedResponse = await response.json()
      const categories = [{ name: 'All', slug: '/' }, ...parsedResponse]

      store['categories'] = categories
      func(categories)
    })
    .catch((responseError) => {})
}

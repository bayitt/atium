import { ref } from 'vue'

type TCategory = {
  name: string
  slug: string
}

export const useGetCategories = () => {
  const categories = ref<TCategory[] | undefined>()
  const error = ref(null)

  fetch(`${import.meta.env?.VITE_API_URL ?? ''}/categories`)
    .then(async (response) => {
      categories.value = await response.json()
    })
    .catch((responseError) => {
      error.value = responseError
    })

  return { categories, error }
}

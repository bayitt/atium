import { ref } from 'vue'

type TCategory = {
  name: string
  slug: string
}

export const useGetCategories = () => {
  const categories = ref<TCategory[] | undefined>()

  fetch(`${import.meta.env?.VITE_API_URL}/categories`)
    .then(async (response) => {
      categories.value = [{ name: 'All', slug: '/' }, ...(await response.json())]
    })
    .catch((responseError) => {})

  return { categories }
}

import { reactive } from 'vue'

export const store: Record<string, any> = reactive({
  isFetching: false,
  home: { totalPages: 0, reviews: [] },
})

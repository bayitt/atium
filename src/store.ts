import { reactive } from 'vue'

export const store: Record<string, any> = reactive({
  networkOperation: '',
  home: { totalPages: 0, reviews: [] },
  series: { totalPages: 0, series: [] },
})

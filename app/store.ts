import { reactive } from 'vue'

export const store: Record<string, string> = reactive({
  networkOperation: '',
})

export const useNetworkOperation = () => useState('networkOperation', () => '')

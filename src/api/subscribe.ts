import { store } from '@/store'

export const subscribe = (email: string, func: () => void) => {
  store.networkOperation = 'subscribe'

  fetch(`${import.meta.env?.VITE_API_URL}/subscribers`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  })
    .then(() => {
      store.networkOperation = ''
      func()
    })
    .catch(() => {})
}

import { useCartStore } from '@/stores/cart'
import { watch } from 'vue'

export function persistCartPlugin() {
  const cartStore = useCartStore()
  cartStore.initFromLocalStorage()

  watch(
    () => cartStore.items,
    (items) => {
      localStorage.setItem('cartItems', JSON.stringify(items))
    },
    { deep: true }
  )
}
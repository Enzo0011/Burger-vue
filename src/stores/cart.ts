import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as any[],
  }),
  actions: {
    initFromLocalStorage() {
      const saved = localStorage.getItem('cartItems')
      if (saved) {
        this.items = JSON.parse(saved)
      }
    },
    addItem(item: any) {
      const existing = this.items.find(i => i.id === item.id)
      if (existing) {
        existing.quantity += 1
      } else {
        this.items.push({ ...item, quantity: 1 })
      }
    },
    removeItem(index: number) {
      this.items.splice(index, 1)
    },
  },
})
<template>
  <div class="cart-page">
    <h1>🛒 Votre panier</h1>

    <div v-if="items.length === 0" class="empty">
      Votre panier est vide.
    </div>

    <div v-else>
      <ul class="cart-list">
        <li v-for="(item, index) in items" :key="index" class="cart-item">
          <div class="details">
            <h3>{{ item.name }}</h3>
            <p>{{ item.description }}</p>
            <p>Prix unitaire : {{ formatPrice(item.price) }} €</p>
            <p>Quantité : {{ item.quantity }}</p>
          </div>
          <button @click="removeItem(index)" class="remove-btn">❌ Supprimer</button>
        </li>
      </ul>

      <div class="summary">
        <p><strong>Total :</strong> {{ formatPrice(total) }} €</p>
        <button class="order-btn" @click="goToOrder">Commander</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useCartStore } from '@/stores/cart'
import { useRouter } from 'vue-router'

const cartStore = useCartStore()
const router = useRouter()

const items = computed(() => cartStore.items)

const total = computed(() =>
  cartStore.items.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0)
)

const removeItem = (index: number) => {
  cartStore.removeItem(index)
}

const goToOrder = () => {
  router.push('/commande')
}

const formatPrice = (price: number) => price.toFixed(2)
</script>

<style scoped>
.cart-page {
  max-width: 800px;
  margin: 2rem auto;
  padding: 1rem;
}

.cart-list {
  list-style: none;
  padding: 0;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #ccc;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 8px;
  background: #f9f9f9;
  color: #333;
}

.details {
  max-width: 70%;
}

.summary {
  text-align: right;
  margin-top: 2rem;
}

.remove-btn {
  background-color: #e53e3e;
  color: white;
  border: none;
  padding: 0.4rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.3s;
}

.remove-btn:hover {
  background-color: #c53030;
}

.order-btn {
  background-color: #28a745;
  color: white;
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.order-btn:hover {
  background-color: #218838;
}

.empty {
  text-align: center;
  font-size: 1.2rem;
  margin-top: 3rem;
}
</style>

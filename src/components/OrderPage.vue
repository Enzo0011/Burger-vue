<template>
  <div class="order-page">
    <h1>📦 Finalisez votre commande</h1>

    <div class="form">
      <label for="address">Adresse de livraison</label>
      <input
        id="address"
        v-model="address"
        type="text"
        placeholder="123 rue de Paris, 75000 Paris"
      />
      <p class="error" v-if="error">{{ error }}</p>

      <h2>🧾 Récapitulatif</h2>
      <ul>
        <li v-for="item in items" :key="item.id">
          {{ item.name }} x{{ item.quantity }} – {{ formatPrice(item.price * item.quantity) }} €
        </li>
      </ul>
      <p class="total"><strong>Total :</strong> {{ formatPrice(total) }} €</p>

      <button @click="submitOrder">Commander</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '@/stores/cart'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const cartStore = useCartStore()
const router = useRouter()

const address = ref('')
const error = ref('')
const loading = ref(false)

const items = computed(() => cartStore.items)
const total = computed(() => items.value.reduce((sum, item) => sum + item.price * item.quantity, 0))

const formatPrice = (price: number) => price.toFixed(2)

const submitOrder = async () => {
  if (!address.value.trim()) {
    error.value = 'Veuillez renseigner votre adresse.'
    return
  }

  error.value = ''
  loading.value = true

  try {
    const token = localStorage.getItem('token')
    const response = await fetch('http://localhost:3000/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        address: address.value,
        items: items.value,
        total: total.value,
      }),
    })

    if (!response.ok) {
      const data = await response.json()
      throw new Error(data.message || 'Erreur serveur')
    }

    cartStore.items = []
    localStorage.removeItem('cartItems')
    router.push('/confirmation')
  } catch (e: any) {
    error.value = e.message || 'Une erreur est survenue. Veuillez réessayer.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.order-page {
  max-width: 600px;
  margin: 2rem auto;
  padding: 1rem;
}

.form label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.form input {
  width: 100%;
  padding: 0.6rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
}

.error {
  color: red;
  margin-bottom: 1rem;
}

ul {
  list-style: none;
  padding-left: 0;
}

.total {
  margin-top: 1rem;
  font-size: 1.2rem;
}

button {
  background-color: #28a745;
  color: white;
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #218838;
}
</style>
<template>
  <div class="order-history-page">
    <h1>📜 Historique de vos commandes</h1>

    <div v-if="loading" class="loading">Chargement...</div>
    <div v-if="error" class="error">{{ error }}</div>

    <div v-if="orders.length === 0 && !loading">
      Vous n'avez encore passé aucune commande.
    </div>

    <ul v-else class="orders-list">
      <li v-for="order in orders.reverse()" :key="order.id" class="order-item">
        <h2>Commande du {{ formatDate(order.date) }}</h2>
        <ul>
          <li v-for="item in order.items" :key="item.id">
            {{ item.name }} x{{ item.quantity }} — {{ formatPrice(item.price * item.quantity) }} €
          </li>
        </ul>
        <p><strong>Total :</strong> {{ formatPrice(order.total) }} €</p>
        <p><em>Adresse de livraison :</em> {{ order.address }}</p>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const orders = ref<any[]>([])
const loading = ref(false)
const error = ref('')

const fetchOrders = async () => {
  loading.value = true
  error.value = ''
  try {
    const token = localStorage.getItem('token')
    const res = await fetch('http://localhost:3000/orders', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!res.ok) {
      const data = await res.json()
      throw new Error(data.message || 'Erreur lors de la récupération des commandes')
    }

    orders.value = await res.json()
  } catch (e: any) {
    error.value = e.message || 'Une erreur est survenue'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchOrders()
})

const formatDate = (dateStr: string) => {
  const d = new Date(dateStr)
  return d.toLocaleDateString() + ' à ' + d.toLocaleTimeString()
}

const formatPrice = (price: number) => price.toFixed(2)
</script>

<style scoped>
.order-history-page {
  max-width: 700px;
  margin: 2rem auto;
  padding: 1rem;
}

.loading {
  font-style: italic;
  color: gray;
}

.orders-list {
  list-style: none;
  padding: 0;
}

.order-item {
  border: 1px solid #ccc;
  padding: 1rem;
  margin-bottom: 1.5rem;
  border-radius: 8px;
  background-color: #fafafa;
  color: #333;
}
</style>
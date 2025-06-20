<template>
  <div class="admin-order-history">
    <h1>📦 Toutes les commandes</h1>

    <div v-if="loading">Chargement...</div>
    <div v-if="error" class="error">{{ error }}</div>

    <div v-if="orders.length === 0 && !loading">Aucune commande pour le moment.</div>

    <ul v-else class="orders-list">
      <li v-for="order in orders.reverse()" :key="order.id" class="order-item">
        <h2>Commande de {{ order.email }} — {{ formatDate(order.date) }}</h2>
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
import { useUserStore } from '@/stores/user'
import { onMounted, ref } from 'vue'

const orders = ref<any[]>([])
const loading = ref(false)
const error = ref('')
const userStore = useUserStore()

const fetchAllOrders = async () => {
  loading.value = true
  try {
    const res = await fetch('http://localhost:3000/orders/all', {
      headers: {
        Authorization: `Bearer ${userStore.token}`,
      },
    })

    if (!res.ok) {
      const data = await res.json()
      throw new Error(data.message || 'Erreur lors du chargement')
    }

    orders.value = await res.json()
  } catch (err: any) {
    error.value = err.message || 'Erreur inconnue'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  if (userStore.isAdmin()) {
    fetchAllOrders()
  } else {
    error.value = "Accès interdit : vous n'êtes pas administrateur"
  }
})

const formatDate = (dateStr: string) => {
  const d = new Date(dateStr)
  return d.toLocaleDateString() + ' à ' + d.toLocaleTimeString()
}

const formatPrice = (price: number) => price.toFixed(2)
</script>

<style scoped>
.admin-order-history {
  max-width: 800px;
  margin: 2rem auto;
  padding: 1rem;
}
.orders-list {
  list-style: none;
  padding: 0;
}
.order-item {
  border: 1px solid #ddd;
  padding: 1rem;
  margin-bottom: 1.5rem;
  border-radius: 8px;
  background-color: #f5f5f5;
  color: #333;
}
.error {
  color: red;
}
</style>
<template>
  <header>
    <nav>
      <RouterLink to="/">Accueil</RouterLink>
      <RouterLink to="/login" v-if="!isLoggedIn">Connexion</RouterLink>
      <RouterLink to="/register" v-if="!isLoggedIn">Inscription</RouterLink>

      <template v-if="isLoggedIn && !isAdmin">
        <RouterLink to="/cart">
          Panier<span v-if="cartItemCount > 0"> ({{ cartItemCount }})</span>
        </RouterLink>
        <RouterLink to="/history">Historique</RouterLink>
      </template>

      <RouterLink to="/admin" v-if="isLoggedIn && isAdmin">Admin</RouterLink>

      <button @click="logout" v-if="isLoggedIn">Déconnexion</button>
    </nav>
  </header>

  <RouterView v-slot="{ Component }">
    <component :is="Component" />
  </RouterView>

  <LandingPage v-if="isHome && !isLoggedIn" />
  <MenuPage v-else-if="isHome && isLoggedIn" />
</template>


<script setup lang="ts">
import { useCartStore } from '@/stores/cart'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from './stores/user'

import LandingPage from '@/components/LandingPage.vue'
import MenuPage from '@/components/MenuPage.vue'

const userStore = useUserStore()
const router = useRouter()
const isLoggedIn = computed(() => !!userStore.token)
const cartStore = useCartStore()
const cartItemCount = computed(() => cartStore.items.length)
const route = useRoute()
const isHome = computed(() => route.path === '/')
const isAdmin = computed(() => userStore.isAdmin?.())

const logout = () => {
  userStore.logout()
  router.push('/login')
}
</script>
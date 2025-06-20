<template>
  <div class="confirmation-page">
    <h1>✅ Merci pour votre commande !</h1>
    <p>Merci {{ userName }} ! Votre commande a bien été prise en compte.</p>
    <RouterLink to="/" class="home-link">Retour à l'accueil</RouterLink>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const userName = userStore.getName()
console.log("Nom de l'utilisateur :", userName)
</script>

<style scoped>
.confirmation-page {
  max-width: 600px;
  margin: 2rem auto;
  text-align: center;
}

.home-link {
  display: inline-block;
  margin-top: 1.5rem;
  text-decoration: none;
  color: #007bff;
}
</style>
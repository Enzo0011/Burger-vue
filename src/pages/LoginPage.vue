<template>
    <div class="login">
        <h1>Connexion</h1>
        <form @submit.prevent="login">
            <input v-model="email" type="email" placeholder="Email" required />
            <input v-model="password" type="password" placeholder="Mot de passe" required minlength="6" />

            <p v-if="error" class="error">{{ error }}</p>

            <button type="submit">Se connecter</button>            
        </form>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'

const email = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()
const userStore = useUserStore()

const login = async () => {
  try {
    const res = await axios.post('http://localhost:3000/auth/login', {
      email: email.value,
      password: password.value
    })

    userStore.login(res.data.token, res.data.user.email)
    router.push('/')
  } catch (e: any) {
    error.value = e.response?.data?.message || "Erreur de connexion"
  }
}
</script>
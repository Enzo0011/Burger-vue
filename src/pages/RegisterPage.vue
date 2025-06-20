<template>
    <div class="register">
        <h1>Créer un compte</h1>
        <form @submit.prevent="handleSubmit">
            <input v-model="email" type="email" placeholder="Email" required />
            <input v-model="name" type="text" placeholder="Nom" required />
            <input v-model="password" type="password" placeholder="Mot de passe" required minlength="6" />
            <input v-model="confirmPassword" type="password" placeholder="Confirmer le mot de passe" required />
            
            <p v-if="error" class="error">{{ error }}</p>

            <button type="submit">S'inscrire</button>
        </form>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const name = ref('')
const password = ref('')
const confirmPassword = ref('')
const error = ref('')

const handleSubmit = async () => {
  error.value = ''

  if (!email.value.includes('@')) {
    error.value = "L'email est invalide."
    return
  }

  if (password.value.length < 6) {
    error.value = 'Le mot de passe doit contenir au moins 6 caractères.'
    return
  }

  if (password.value !== confirmPassword.value) {
    error.value = 'Les mots de passe ne correspondent pas.'
    return
  }

  try {
    const res = await fetch('http://localhost:3000/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name.value, email: email.value, password: password.value }),
    })

    if (!res.ok) {
      const data = await res.json()
      error.value = data.message || "Erreur lors de l'inscription."
      return
    }

    router.push('/login')
  } catch (e) {
    error.value = 'Une erreur est survenue.'
  }
}
</script>
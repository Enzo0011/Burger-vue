<template>
  <section class="landing">
    <h1>🍔 Bienvenue chez BurgerMaster</h1>
    <p>Commandez vos burgers préférés en quelques clics.</p>
    <RouterLink to="/login" class="btn">Se connecter</RouterLink>
    <RouterLink to="/register" class="btn secondary">Créer un compte</RouterLink>
  </section>
</template>

<style scoped>
.landing {
  text-align: center;
  margin: 5rem auto;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
}

.btn {
  background-color: #3182ce;
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  margin: 0 1rem;
  text-decoration: none;
  font-weight: bold;
}

.btn.secondary {
  background-color: #4a5568;
}
</style>

<template>
  <section class="menu">
    <h1>Notre Menu</h1>

    <div class="custom-burger">
      <h2>Créer votre burger</h2>
      <p>Sélectionnez vos ingrédients :</p>

      <div class="ingredients-list">
        <label v-for="ingredient in allIngredients" :key="ingredient.name">
          <input
            type="checkbox"
            :value="ingredient.name"
            v-model="customSelected"
          />
          {{ ingredient.name }} (+{{ ingredient.price.toFixed(2) }} €)
        </label>
      </div>

      <p>
        Prix : <strong>{{ customPrice.toFixed(2) }} €</strong>
      </p>
      <button @click="addCustomBurgerToCart">Ajouter au panier</button>
    </div>

    <div class="grid">
      <div
        class="burger-card"
        v-for="burger in burgers"
        :key="burger.id"
        @click="showDetails(burger)"
      >
        <h2>{{ burger.name }}</h2>
        <p>{{ burger.description }}</p>
        <p class="price">{{ burger.price.toFixed(2) }} €</p>
        <button @click.stop="addToCart(burger)">Ajouter au panier</button>
      </div>
    </div>

    <div v-if="selectedBurger" class="modal">
      <div class="modal-content">
        <h2>{{ selectedBurger.name }}</h2>
        <p><strong>Description :</strong> {{ selectedBurger.description }}</p>
        <p>
          <strong>Ingrédients :</strong> {{ selectedBurger.ingredients.join(', ') }}
        </p>
        <button @click="selectedBurger = null">Fermer</button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useCartStore } from '@/stores/cart'
import { computed, ref } from 'vue'

const burgers = ref([
  {
    id: 1,
    name: 'Classic Burger',
    description: 'Un burger simple et efficace.',
    price: 8.99,
    ingredients: ['Pain', 'Steak', 'Salade', 'Tomate', 'Fromage'],
  },
  {
    id: 2,
    name: 'Cheesy Bacon',
    description: 'Du fromage et du bacon.',
    price: 10.5,
    ingredients: ['Pain', 'Steak', 'Fromage', 'Bacon', 'Oignons'],
  },
])

const allIngredients = [
  { name: 'Pain', price: 1 },
  { name: 'Steak', price: 3 },
  { name: 'Salade', price: 0.5 },
  { name: 'Tomate', price: 0.5 },
  { name: 'Fromage', price: 1 },
  { name: 'Bacon', price: 1.5 },
  { name: 'Oignons', price: 0.5 },
  { name: 'Cornichons', price: 0.5 },
  { name: 'Sauce', price: 0.3 },
]

const selectedBurger = ref(null as null | typeof burgers.value[0])
const cartStore = useCartStore()

const showDetails = (burger: typeof burgers.value[0]) => {
  selectedBurger.value = burger
}

const addToCart = (burger: typeof burgers.value[0]) => {
  cartStore.addItem({
    ...burger,
    quantity: 1,
  })
}

const customSelected = ref<string[]>(['Pain', 'Steak'])

const customPrice = computed(() => {
  return customSelected.value.reduce((acc, ing) => {
    const found = allIngredients.find(i => i.name === ing)
    return acc + (found ? found.price : 0)
  }, 0)
})

const addCustomBurgerToCart = () => {
  if (customSelected.value.length === 0) {
    alert('Veuillez sélectionner au moins un ingrédient.')
    return
  }

  const customBurger = {
    id: Date.now(),
    name: 'Burger personnalisé',
    description: 'Votre burger sur-mesure',
    price: customPrice.value,
    ingredients: [...customSelected.value],
    quantity: 1,
  }

  cartStore.addItem(customBurger)
}
</script>

<style scoped>
h1 {
  color: #fff;
}

.menu {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  color: #333;
}

.custom-burger {
  margin-bottom: 2rem;
  padding: 2rem 2rem 2.5rem;
  border: 2px solid #38a169;
  border-radius: 12px;
  background: #f0fff4;
  box-shadow: 0 4px 8px rgb(56 161 105 / 0.2);
}

.custom-burger h2 {
  margin-bottom: 1rem;
  font-weight: 700;
  color: #2f855a;
  font-size: 1.8rem;
  letter-spacing: 0.03em;
}

.ingredients-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 1rem 1.5rem;
  margin: 1rem 0 1.5rem;
}

.ingredients-list label {
  background: white;
  padding: 0.5rem 1rem;
  border: 1.5px solid #38a169;
  border-radius: 8px;
  cursor: pointer;
  user-select: none;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  transition: background-color 0.2s, color 0.2s, border-color 0.2s;
  color: #2f855a;
}

.ingredients-list label:hover {
  background-color: #c6f6d5;
}

.ingredients-list input[type='checkbox'] {
  accent-color: #38a169;
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.price {
  font-weight: 700;
  font-size: 1.3rem;
  margin-bottom: 1.5rem;
  color: #276749;
}

button {
  background-color: #2f855a;
  color: white;
  padding: 0.8rem 1.6rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: 600;
  box-shadow: 0 3px 6px rgb(56 161 105 / 0.4);
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #276749;
}

button:active {
  background-color: #22543d;
  box-shadow: none;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
}
.burger-card {
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1rem;
  text-align: center;
  cursor: pointer;
  background: white;
  transition: transform 0.2s;
}
.burger-card:hover {
  transform: scale(1.02);
}
.price {
  font-weight: bold;
  margin: 0.5rem 0;
}
button {
  background-color: #38a169;
  color: white;
  padding: 0.6rem 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  color: #333;
}
.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  width: 90%;
  max-width: 500px;
}
</style>
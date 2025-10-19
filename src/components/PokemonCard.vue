<script setup lang="ts">
import type { Pokemon } from '@/models/Pokemon';
import { capitalize, padLeft } from '@/utils/string';

interface Props {
  pokemon: Pokemon;
}

defineProps<Props>();
</script>

<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">{{ capitalize(pokemon.name) }}</p>
    </header>
    <div class="card-image">
      <figure class="image">
        <img :src="pokemon.sprite_url" alt="Placeholder image" />
      </figure>
    </div>
    <div class="card-content p-4">
      <div class="content">
        <div class="columns is-mobile is-2 mb-2">
          <div class="column is-half">
            <p class="mb-0 has-text-grey-light">
              <strong class="label">ID:</strong>
              {{ padLeft(pokemon.id, '0', 4) }}
            </p>
          </div>
          <div class="column is-half">
            <p class="mb-0">
              <strong class="label">Status:</strong>
              <span :class="pokemon.is_legendary ? 'has-text-warning' : 'has-text-grey'">
                {{ pokemon.is_legendary ? 'Legendary' : 'Common' }}
              </span>
            </p>
          </div>
        </div>

        <div class="columns is-mobile is-2 mb-2">
          <div class="column is-half">
            <p class="mb-0">
              <strong class="label">Types:</strong>
              {{ pokemon.types.join(', ') }}
            </p>
          </div>
          <div class="column is-half">
            <p class="mb-0">
              <strong class="label">Species:</strong>
              {{ pokemon.species }}
            </p>
          </div>
        </div>

        <hr class="my-3" />

        <div class="columns is-mobile is-2 mb-2">
          <div class="column is-half">
            <p class="mb-0">
              <strong class="label">Height:</strong>
              {{ (pokemon.height / 10).toFixed(1) }}m
            </p>
          </div>
          <div class="column is-half">
            <p class="mb-0">
              <strong class="label">Weight:</strong>
              {{ (pokemon.weight / 10).toFixed(1) }}kg
            </p>
          </div>
        </div>

        <div class="columns is-mobile is-2 mb-2">
          <div class="column is-half">
            <p class="mb-0">
              <strong class="label">Base XP:</strong>
              {{ pokemon.base_experience }}
            </p>
          </div>
          <div class="column is-half">
            <p class="mb-0">
              <strong class="label">Generation:</strong>
              {{ pokemon.generation }}
            </p>
          </div>
        </div>

        <div class="mb-2">
          <strong class="label">Abilities:</strong>
          <div v-for="ability in pokemon.abilities" :key="ability" class="tag is-warning mr-1">{{ ability }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  transition: transform 0.3s ease;
}

.card:hover {
  transform: scale(1.02);
}

p,
.tag {
  font-weight: 700;
}

.label {
  font-size: 0.8rem;
  font-weight: 300;
  margin: 0;
}

figure {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 120px;
  background: radial-gradient(circle, var(--bulma-grey) 0%, var(--bulma-dark) 100%);
}

img {
  width: auto;
  height: 96px;
  transition: transform 0.3s ease;
}

img:hover {
  transform: scale(1.25);
}
</style>

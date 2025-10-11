<script setup lang="ts">
import { computed, onMounted, ref, type Ref } from 'vue';
import type { SortDir } from 'collectype';

import { PokemonCollection } from '@/collections/PokemonCollection';
import FilterBreadcrumb from '@/components/FilterBreadcrumb.vue';
import FilterNavbar from '@/components/FilterNavbar.vue';
import PokemonCard from '@/components/PokemonCard.vue';
import PokemonStats from '@/components/PokemonStats.vue';
import PokemonTypeStats from '@/components/PokemonTypeStats.vue';
import SortNavbar from '@/components/SortNavbar.vue';
import type { Pokemon } from '@/models/Pokemon';
import type { SortField } from '@/enums/PokemenSort';

/**
 * Pokemon data import (mocked for demo purposes)
 */
import { pokemons } from '@/data/pokemons';

/**
 * Reactive reference to fetched Pokemon data
 */
const fetched: Ref<Pokemon[]> = ref([]);

/**
 * Collection wrapper for Pokemon operations
 */
const collection = computed(() => new PokemonCollection(fetched.value));

/**
 * Current filter expression
 */
const piping = ref('all()');

/**
 * Current sort field and direction
 */
const sortField = ref<SortField>('id');
const sortDir = ref<SortDir>('asc');

/**
 * Filtered and sorted Pokemon collection
 */
const filtered = computed(() => {
  return collection.value.fn.pipe(piping.value).sort(sortField.value, sortDir.value);
});

/**
 * Handles filter changes from navbar
 */
function handleNavChange(filter: string) {
  piping.value = filter;
}

/**
 * Handles sort changes from navbar
 */
function handleSortChange(field: SortField, dir: SortDir) {
  sortField.value = field;
  sortDir.value = dir;
}

/**
 * Initializes Pokemon data on component mount
 */
onMounted(async () => {
  try {
    fetched.value = pokemons;
    piping.value = 'all()';
  } catch (err) {
    console.error('Error fetching Pokemon:', err);
  }
});
</script>

<template>
  <header class="hero is-success">
    <div class="hero-body">
      <h1 class="title">Pokemons</h1>
      <p class="subtitle">Demonstration of <strong>CollecType</strong> as a collection engine in <strong>Vue</strong>.</p>
    </div>
  </header>

  <main class="section">
    <div v-if="collection.count === 0">
      <div class="container">
        <p class="has-text-centered">No Pokémon found.</p>
      </div>
    </div>

    <div v-else>
      <div class="container">
        <PokemonStats :pokemons="collection.items" class="mb-6 is-hidden-touch" />

        <div class="block mb-5">
          <FilterNavbar :piping="piping" :count="filtered.count" @change="handleNavChange" />
        </div>

        <FilterBreadcrumb :piping="piping" class="is-hidden-touch" />

        <PokemonTypeStats :pokemons="filtered.items" />

        <SortNavbar :sort-field="sortField" :sort-dir="sortDir" @change="handleSortChange" />

        <div class="fixed-grid has-1-cols-mobile has-4-cols-tablet has-5-cols-desktop">
          <div class="grid">
            <PokemonCard v-for="pokemon in filtered.items" :key="pokemon.id" :pokemon="pokemon" />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, type Ref } from 'vue';
import type { SortDir } from 'collectype';

import { PokemonCollection } from '@/collections/PokemonCollection';
import FilterBreadcrumb from '@/components/FilterBreadcrumb.vue';
import FilterNavbar from '@/components/FilterNavbar.vue';
import PaginationBar from '@/components/PaginationBar.vue';
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
const collection = computed(() => {
  console.log(`Collection initialized with ${fetched.value.length} item(s).`);
  return new PokemonCollection(fetched.value);
});

/**
 * Current pipe expression
 */
const expression = ref('all()');

/**
 * Current sort field and direction
 */
const sortField = ref<SortField>('id');
const sortDir = ref<SortDir>('asc');

/**
 * Current pagination page
 */
const page = ref<number>(1);
const perPage = ref<number>(20);

/**
 * Filtered and sorted Pokemon collection
 */
const filtered = computed(() => {
  const result = collection.value.fn.pipe(expression.value).sort(sortField.value, sortDir.value);
  return result;
});

/**
 * Paginated Pokemon collection
 */
const paginated = computed(() => {
  const result = collection.value.fn.pipe(expression.value).sort(sortField.value, sortDir.value).page(page.value, perPage.value);
  return result;
});

/**
 * Handles expression changes
 */
function handleExpressionChange(newExpression: string) {
  page.value = 1;
  expression.value = newExpression;
}

/**
 * Handles sort changes
 */
function handleSortChange(newSortField: SortField, newSortDir: SortDir) {
  sortField.value = newSortField;
  sortDir.value = newSortDir;
}

/**
 * Handles pagination changes
 */
function handlePageChange(newPage: number, newPerPage: number) {
  page.value = newPage;
  perPage.value = newPerPage;
}

/**
 * Initializes Pokemon data on component mount
 */
onMounted(async () => {
  try {
    fetched.value = pokemons;
    expression.value = 'all()';
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
          <FilterNavbar :current="expression" :count="filtered.count" @change="handleExpressionChange" />
        </div>

        <FilterBreadcrumb :info="filtered.info" class="is-hidden-touch" />

        <PokemonTypeStats :pokemons="filtered.items" />

        <SortNavbar :sort-field="sortField" :sort-dir="sortDir" @change="handleSortChange" />

        <hr />

        <PaginationBar :info="paginated.info" @change="handlePageChange" />

        <div class="fixed-grid has-1-cols-mobile has-4-cols-tablet has-5-cols-desktop">
          <div class="grid">
            <PokemonCard v-for="pokemon in paginated.items" :key="pokemon.id" :pokemon="pokemon" />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

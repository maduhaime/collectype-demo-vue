<script setup lang="ts">
import { computed } from 'vue';

import { capitalize, padLeft } from '@/utils/string';
import { PokemonCollection } from '@/collections/PokemonCollection';
import { PokemonType } from '@/enums/PokemonType';
import type { Pokemon } from '@/models/Pokemon';

/**
 * Component props for Pokemon list
 */
const props = defineProps<{
  pokemons: Pokemon[];
}>();

/**
 * Reactive collection wrapper for Pokemon operations
 */
const collection = computed(() => new PokemonCollection(props.pokemons));
</script>

<template>
  <div class="is-hidden-touch">
    <nav class="level">
      <div v-for="type in Object.values(PokemonType)" :key="type" class="level-item has-text-centered">
        <div>
          <p class="heading is-size-7">{{ capitalize(type) }}</p>
          <p class="title has-text-primary is-size-5">
            {{ padLeft(collection.fn.arrayIncludes('types', type).count, '0', 3) }}
          </p>
        </div>
      </div>
    </nav>
  </div>
</template>

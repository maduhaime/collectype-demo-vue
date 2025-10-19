<script setup lang="ts">
import { computed, ref } from 'vue';
import type { Pokemon } from '@/models/Pokemon';
import { PokemonCollection } from '@/collections/PokemonCollection';
import { padLeft } from '@/utils/string';
import { Generation } from '@/enums/Generation';

/**
 * Component props for generation stats
 */
interface Props {
  pokemons: Pokemon[];
  current?: number | null;
}

const props = withDefaults(defineProps<Props>(), {
  current: null,
});

/**
 * Emits generation change events
 */
const emit = defineEmits<{
  change: [generation: number | null];
}>();

/**
 * Local generation state
 */
const generation = ref<number | null>(null);

/**
 * Computed collection wrapper
 */
const collection = computed(() => new PokemonCollection(props.pokemons));

/**
 * List of available generations
 */
const generations = Object.values(Generation).filter((gen) => typeof gen === 'number') as number[];

/**
 * Handles generation selection
 */
function setGeneration(gen: number | null) {
  generation.value = gen;
  emit('change', gen);
}

/**
 * Determines if a generation is active
 */
function isActiveClass(gen: number | null): string {
  return props.current === gen ? 'is-active' : '';
}
</script>

<template>
  <div class="level is-hidden-touch">
    <!-- Option "All" -->
    <div :class="'level-item has-text-centered py-2 ' + isActiveClass(null)">
      <div @click="setGeneration(null)" style="cursor: pointer; text-decoration: none">
        <p class="heading is-size-7">All</p>
        <a class="title has-text-primary is-size-4">
          {{ padLeft(collection.count, '0', 3) }}
        </a>
      </div>
    </div>

    <!-- Generation options -->
    <div v-for="gen in generations" :key="gen" :class="'level-item has-text-centered py-2 ' + isActiveClass(gen)">
      <div @click="setGeneration(gen)" style="cursor: pointer; text-decoration: none">
        <p class="heading is-size-7">Gen {{ gen }}</p>
        <a class="title has-text-primary is-size-4">
          {{ padLeft(collection.fn.numberEquals('generation', gen).count, '0', 3) }}
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
a:hover {
  cursor: pointer;
}

div.is-active {
  color: var(--bulma-white);
  background-color: var(--bulma-primary);
  border-radius: 0.5rem;
}

div.is-active a {
  color: var(--bulma-white) !important;
}
</style>

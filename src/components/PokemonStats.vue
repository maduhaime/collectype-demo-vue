<script setup lang="ts">
import { computed } from 'vue';
import { PokemonCollection } from '@/collections/PokemonCollection';
import type { Pokemon } from '@/models/Pokemon';

/**
 * Component props for Pokemon list
 */
interface Props {
  pokemons: Pokemon[];
}

const props = defineProps<Props>();

/**
 * Computed collection wrapper
 */
const collection = computed(() => new PokemonCollection(props.pokemons));
</script>

<template>
  <nav class="level is-hidden-touch">
    <div class="level-item has-text-centered">
      <div>
        <p class="heading">Experienced</p>
        <p class="title">{{ collection.fn.experienced().count }}</p>
      </div>
    </div>
    <div class="level-item has-text-centered">
      <div>
        <p class="heading">Flying</p>
        <p class="title">{{ collection.fn.flying().count }}</p>
      </div>
    </div>
    <div class="level-item has-text-centered">
      <div>
        <p class="heading">Intimidating</p>
        <p class="title">{{ collection.fn.intimidating().count }}</p>
      </div>
    </div>
    <div class="level-item has-text-centered">
      <div>
        <p class="heading">Legendary</p>
        <p class="title">{{ collection.fn.legendary().count }}</p>
      </div>
    </div>
    <div class="level-item has-text-centered">
      <div>
        <p class="heading">Rare</p>
        <p class="title">{{ collection.fn.rare().count }}</p>
      </div>
    </div>
    <div class="level-item has-text-centered">
      <div>
        <p class="heading">Tall</p>
        <p class="title">{{ collection.fn.tall().count }}</p>
      </div>
    </div>
    <div class="level-item has-text-centered">
      <div>
        <p class="heading">Total</p>
        <p class="title">{{ collection.count }}</p>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.level-item {
  width: calc(100% / 8);
}
</style>

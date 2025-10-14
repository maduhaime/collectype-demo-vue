<script setup lang="ts">
import type { CollectionInfo } from 'collectype';

/**
 * Component props for breadcrumb navigation
 */
interface Props {
  info: CollectionInfo;
}

const props = defineProps<Props>();
</script>

<template>
  <nav class="breadcrumb is-small mt-0 is-hidden-touch">
    <ul>
      <li>
        <span class="icon is-small">
          <i class="fas fa-home" aria-hidden="true"></i>
        </span>
        <span>Pokemons</span>
      </li>

      <li v-for="(step, index) in props.info.steps" :key="index">
        <span class="icon is-small">
          <i class="fas fa-filter" aria-hidden="true"></i>
        </span>
        <span>{{ step }}</span>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
li::before {
  margin: 0 0.5rem;
}
</style>

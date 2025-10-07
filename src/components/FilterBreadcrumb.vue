<script setup lang="ts">
import { computed } from 'vue';

/**
 * Component props for breadcrumb navigation
 */
interface Props {
  piping: string;
}

const props = defineProps<Props>();

/**
 * Parsed piping expression into breadcrumb parts
 */
const breadcrumb = computed(() => {
  const parts = props.piping.split('|').map((part: string) => part.trim());
  return parts;
});
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

      <li v-for="(part, index) in breadcrumb" :key="index">
        <span class="icon is-small">
          <i class="fas fa-filter" aria-hidden="true"></i>
        </span>
        <span>{{ part }}</span>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
li::before {
  margin: 0 0.5rem;
}
</style>

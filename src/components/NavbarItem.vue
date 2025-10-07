<script setup lang="ts">
/**
 * Component props for filter navigation item
 */
interface Props {
  filter: string;
  piping: string;
}

defineProps<Props>();

/**
 * Emits filter change events
 */
defineEmits<{
  change: [filter: string];
}>();
</script>

<template>
  <a @click="$emit('change', filter)" class="navbar-item" :class="{ 'is-active': piping === filter }">
    <slot />
  </a>
</template>

<style scoped>
.navbar-item {
  font-weight: bold;
}

.is-active {
  background-color: rgba(255, 255, 255, 0.25);
}
</style>

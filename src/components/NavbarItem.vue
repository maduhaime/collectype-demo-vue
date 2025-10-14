<script setup lang="ts">
/**
 * Component props for navigation item
 */
interface Props {
  current: string;
  expression: string;
}

const props = defineProps<Props>();

/**
 * Emits filter change events
 */
const emit = defineEmits<{
  change: [expression: string];
}>();

function setExpression() {
  emit('change', props.expression);
}

function isActiveClass() {
  return props.current === props.expression ? 'is-active' : '';
}
</script>

<template>
  <a @click.prevent="setExpression()" class="navbar-item" :class="isActiveClass()">
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

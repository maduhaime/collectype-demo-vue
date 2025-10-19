<script setup lang="ts">
import { ref } from 'vue';
import NavbarItem from './NavbarItem.vue';

/**
 * Component props for filter navigation
 */
interface Props {
  count: number;
  current: string;
}

defineProps<Props>();

/**
 * Emits filter change events
 */
const emit = defineEmits<{
  change: [expression: string];
}>();

/**
 * Mobile menu toggle state
 */
const menuClass = ref('');

/**
 * Toggles mobile menu visibility
 */
function toggleMenu() {
  menuClass.value = menuClass.value === '' ? 'is-active' : '';
}

/**
 * Emits filter change
 */
function handleExpressionChange(expression: string) {
  emit('change', expression);
}
</script>

<template>
  <nav class="navbar is-success" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a @click="toggleMenu" class="navbar-burger">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <div class="navbar-menu" :class="menuClass">
      <div class="navbar-start">
        <div class="navbar-item">Filters:</div>
        <NavbarItem expression="all()" :current="current" @change="handleExpressionChange">No Filter</NavbarItem>
        <NavbarItem expression="experienced()" :current="current" @change="handleExpressionChange">Experienced</NavbarItem>
        <NavbarItem expression="flying()" :current="current" @change="handleExpressionChange">Flying</NavbarItem>
        <NavbarItem expression="intimidating()" :current="current" @change="handleExpressionChange">Intimidating</NavbarItem>
        <NavbarItem expression="legendary()" :current="current" @change="handleExpressionChange">Legendary</NavbarItem>
        <NavbarItem expression="rare()" :current="current" @change="handleExpressionChange">Rare</NavbarItem>
        <NavbarItem expression="tall()" :current="current" @change="handleExpressionChange">Tall</NavbarItem>
        <NavbarItem expression="flying() | rare()" :current="current" @change="handleExpressionChange">Flying + Rare</NavbarItem>
      </div>
      <div class="navbar-endis-hidden-touch">
        <div class="navbar-item">
          Total:
          <span class="count">{{ count }}</span>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.count {
  font-weight: bold;
  text-align: right;
  font-size: 1.5rem;
  min-width: 4rem;
}
</style>

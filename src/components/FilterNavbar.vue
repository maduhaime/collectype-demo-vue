<script setup lang="ts">
import { ref } from 'vue';
import NavbarItem from './NavbarItem.vue';

/**
 * Component props for filter navigation
 */
interface Props {
  count: number;
  piping: string;
}

defineProps<Props>();

/**
 * Emits filter change events
 */
const emit = defineEmits<{
  change: [filter: string];
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
function setFilter(filter: string) {
  emit('change', filter);
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
        <NavbarItem filter="all()" :piping="piping" @change="setFilter">All</NavbarItem>
        <NavbarItem filter="experienced()" :piping="piping" @change="setFilter">Experienced</NavbarItem>
        <NavbarItem filter="flying()" :piping="piping" @change="setFilter">Flying</NavbarItem>
        <NavbarItem filter="intimidating()" :piping="piping" @change="setFilter">Intimidating</NavbarItem>
        <NavbarItem filter="legendary()" :piping="piping" @change="setFilter">Legendary</NavbarItem>
        <NavbarItem filter="rare()" :piping="piping" @change="setFilter">Rare</NavbarItem>
        <NavbarItem filter="tall()" :piping="piping" @change="setFilter">Tall</NavbarItem>
        <NavbarItem filter="flying() | rare()" :piping="piping" @change="setFilter">Flying + Rare</NavbarItem>
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

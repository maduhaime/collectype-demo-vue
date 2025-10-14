<script setup lang="ts">
import { ref } from 'vue';
import type { SortDir } from 'collectype';
import type { SortField } from '@/enums/PokemenSort';

/**
 * Component props for sort field and direction
 */
interface Props {
  sortField: SortField;
  sortDir: SortDir;
}

defineProps<Props>();

/**
 * Emits sort changes with field and direction
 */
const emit = defineEmits<{
  change: [field: SortField, dir: SortDir];
}>();

/** Current sort field */
const field = ref<SortField>('id');

/** Current sort direction */
const dir = ref<SortDir>('asc');

/**
 * Updates sort field and emits change
 */
function setField(newField: SortField) {
  field.value = newField;
  emit('change', field.value, dir.value);
}

/**
 * Updates sort direction and emits change
 */
function setDir(newDir: SortDir) {
  dir.value = newDir;
  emit('change', field.value, dir.value);
}

function fieldClass(f: SortField) {
  return f === field.value ? 'is-active' : '';
}

function dirClass(d: SortDir) {
  return d === dir.value ? 'is-active' : '';
}
</script>

<template>
  <div class="columns is-mobile">
    <div class="column">
      <div class="buttons has-addons">
        <button class="button is-info is-small" @click="setField('id')" :class="fieldClass('id')">ID</button>
        <button class="button is-info is-small" @click="setField('name')" :class="fieldClass('name')">Name</button>
        <button class="button is-info is-small" @click="setField('species')" :class="fieldClass('species')">Species</button>
        <button class="button is-info is-small" @click="setField('generation')" :class="fieldClass('generation')">Generation</button>
        <button class="button is-info is-small" @click="setField('base_experience')" :class="fieldClass('base_experience')">Base Experience</button>
        <button class="button is-info is-small" @click="setField('height')" :class="fieldClass('height')">Height</button>
        <button class="button is-info is-small" @click="setField('weight')" :class="fieldClass('weight')">Weight</button>
      </div>
    </div>
    <div class="column is-narrow">
      <div class="buttons has-addons is-right">
        <button class="button is-info is-small" @click="setDir('asc')" :class="dirClass('asc')">ASC</button>
        <button class="button is-info is-small" @click="setDir('desc')" :class="dirClass('desc')">DESC</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.button {
  font-weight: bold;
}

/* .is-active {
  background-color: rgba(255, 255, 255, 0.25);
} */
</style>

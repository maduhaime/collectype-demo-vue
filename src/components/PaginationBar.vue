<script setup lang="ts">
import { computed } from 'vue';
import type { CollectionInfo } from 'collectype';
import { paginationNumbers } from '../utils/pagination.js';

/**
 * Component props for pagination bar
 */
interface Props {
  info: CollectionInfo;
}

const props = defineProps<Props>();

/**
 * Emits pagination events
 */
const emit = defineEmits<{
  change: [page: number, perPage: number];
}>();

/**
 * Computed pagination pages using the simple utility function
 * Automatically updates when current page changes
 */
const pageNumbers = computed(() => {
  if (!props.info.page) return [];

  const { current, totalPages } = props.info.page;
  return paginationNumbers(current, totalPages);
});

function setPage(newPage: number | string) {
  if (!props.info.page || typeof newPage !== 'number') return;

  const { current, totalPages, perPage } = props.info.page;
  if (newPage === current || newPage < 1 || newPage > totalPages) return;

  emit('change', newPage, perPage);
}

function setPerPage(event: Event) {
  if (!props.info.page) return;

  const newPerPage = Number((event.target as HTMLSelectElement).value);
  const { perPage } = props.info.page;
  if (newPerPage === perPage) return;

  emit('change', 1, newPerPage);
}
</script>

<template>
  <nav v-if="info.page" class="pagination is-small" role="navigation">
    <a @click.prevent="setPage(info.page.current - 1)" class="pagination-previous" :class="{ 'is-disabled': info.page.current === 1 }"> Previous </a>
    <a @click.prevent="setPage(info.page.current + 1)" class="pagination-next" :class="{ 'is-disabled': info.page.current === info.page.totalPages }"> Next </a>

    <ul class="pagination-list">
      <li v-for="(page, index) in pageNumbers" :key="`page-${index}`">
        <!-- Ellipsis -->
        <span v-if="page === '...'" class="pagination-ellipsis">&hellip;</span>

        <!-- Page number -->
        <a v-else @click.prevent="setPage(page)" class="pagination-link" :class="{ 'is-current': page === info.page.current }">
          {{ page }}
        </a>
      </li>
    </ul>
  </nav>

  <div v-if="info.page" class="columns is-mobile is-vcentered mb-5">
    <div class="column">
      <p class="is-size-7">
        Items <b>{{ info.page.startIndex + 1 }}</b> - <b>{{ info.page.endIndex }}</b> of <b>{{ info.page.totalItems }}</b>
      </p>
    </div>
    <div class="column is-flex is-vcentered is-justify-content-flex-end">
      <div><span class="is-size-7">Per Page :&nbsp;</span></div>
      <div class="field">
        <div class="control">
          <div class="select is-small">
            <select :value="info.page.perPage" @change="setPerPage($event)">
              <option value="20">20</option>
              <option value="40">40</option>
              <option value="60">60</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

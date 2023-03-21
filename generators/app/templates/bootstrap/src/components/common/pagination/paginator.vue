<template>
  <nav class="paginator" aria-label="..." v-if="pagingOptions.totalPages > 1">
    <ul
      class="pagination"
      :class="{
        'pagination-sm': pagingOptions.small,
        'pagination-lg': pagingOptions.large,
        'justify-content-center': pagingOptions.align === 'center',
        'justify-content-end': pagingOptions.align === 'right',
      }"
    >
      <li
        v-if="pagingOptions.showFirst"
        class="page-item"
        :class="{ disabled: pagingOptions.currentPage === 1 }"
        @click="gotoPage(1)"
      >
        <a class="page-link" href="#">First</a>
      </li>
      <li
        v-if="pagingOptions.showPrev"
        class="page-item"
        :class="{ disabled: pagingOptions.currentPage - 1 < 1 }"
        @click="gotoPage(pagingOptions.currentPage - 1)"
      >
        <a class="page-link" href="#" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>

      <li
        v-for="(item, index) of pagingOptions.pageLinks"
        class="page-item"
        :class="{ active: pagingOptions.currentPage === item, disabled: isSpacer(item) }"
        :key="getKey(id, index)"
      >
        <a class="page-link" href="#" @click="gotoPage(item)">{{ item }}</a>
      </li>

      <li
        v-if="pagingOptions.showNext"
        class="page-item"
        :class="{ disabled: pagingOptions.currentPage + 1 > pagingOptions.totalPages }"
        @click="gotoPage(pagingOptions.currentPage + 1)"
      >
        <a class="page-link" href="#" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
      <li
        v-if="pagingOptions.showLast"
        class="page-item"
        :class="{ disabled: pagingOptions.currentPage === pagingOptions.totalPages }"
        @click="gotoPage(pagingOptions.totalPages)"
      >
        <a class="page-link" href="#">Last</a>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { isSpacer } from './spacer';
import { usePaginator, PagingOptions } from './use-pagination';

export interface PropDefs {
  align?: 'left' | 'center' | 'right';
  currentPage?: number;
  items?: any[];
  itemsPerPage?: number | 'all';
  itemsPerPageChoices?: (number | 'all')[];
  large?: boolean;
  pageLinks?: (number | string)[];
  showFirst?: boolean;
  showLast?: boolean;
  showNext?: boolean;
  showPrev?: boolean;
  small?: boolean;
  totalItemCount?: number;
  totalPages?: number;
  options?: PagingOptions;
}

const props = withDefaults(defineProps<PropDefs>(), {
  align: () => 'center',
  currentPage: () => 1,
  items: () => [],
  itemsPerPage: () => 5,
  itemsPerPageChoices: () => [5, 10, 15, 25, 50, 100, 'all'],
  large: () => false,
  pageLinks: () => [],
  showFirst: () => true,
  showLast: () => true,
  showNext: () => true,
  showPrev: () => true,
  small: () => false,
  totalItemCount: () => 0,
  totalPages: () => 1,
});
const emit = defineEmits([
  'update:page-links',
  'update:paged-items',
  'update:total-pages',
  'update:current-page',
  'update:options',
]);

const { id, pagingOptions, getKey, gotoPage } = usePaginator(props, emit);

defineExpose({
  gotoPage,
});
</script>

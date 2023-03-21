import { computed, nextTick, watch } from 'vue';
import { calculatePageLinks } from './calculate-page-links';
import { isSpacer } from './spacer';
import { useComponentHelpers } from '../use-component-helpers';

export interface PagingOptions {
  align: 'left' | 'center' | 'right';
  currentPage: number;
  items: any[];
  itemsPerPage: number | 'all';
  itemsPerPageChoices: (number | 'all')[];
  large: boolean;
  pagedItems: any[];
  pageLinks: (number | string)[];
  showFirst: boolean;
  showLast: boolean;
  showNext: boolean;
  showPrev: boolean;
  small: boolean;
  totalItemCount: number;
  totalPages: number;
  options?: PagingOptions;
}

export const getPagingOptions = (): PagingOptions => ({
  align: 'center',
  currentPage: 1,
  items: [],
  itemsPerPage: 5,
  itemsPerPageChoices: [],
  large: false,
  pagedItems: [],
  pageLinks: [],
  showFirst: true,
  showLast: true,
  showNext: true,
  showPrev: true,
  small: false,
  totalItemCount: 0,
  totalPages: 1,
});

export type PaginatorEmitter = Emitter<
  'update:page-links' | 'update:paged-items' | 'update:total-pages' | 'update:current-page' | 'update:options'
>;

export const usePaginator = (paginatorProps: Partial<PagingOptions>, emit: PaginatorEmitter) => {
  const props = computed(() => paginatorProps);
  const pagingOptions = computed<PagingOptions>(() => props.value.options || (props.value as any));
  const { generateId, getKey } = useComponentHelpers();
  const id = computed(() => generateId('paginator'));

  let updating = false;
  const updatePages = async () => {
    if (updating) return false;
    updating = true;
    const updatedOptions = { ...pagingOptions.value };
    const itemsPerPage = pagingOptions.value.itemsPerPage;
    if (!itemsPerPage || itemsPerPage === 'all') {
      emit('update:page-links', []);
      emit('update:total-pages', 1);
      emit('update:options', { ...updatedOptions, pageLinks: [], totalPages: 1 });
      await nextTick(() => (updating = false));
      return true;
    }

    let pageCount = 0;
    const items = pagingOptions.value.items;
    if (itemsPerPage < items.length) {
      pageCount = Math.floor(items.length / itemsPerPage);
      if (items.length % itemsPerPage > 0) pageCount++;
    }
    const links = pageCount > 0 ? calculatePageLinks(items.length, itemsPerPage, pagingOptions.value.currentPage) : [];
    emit('update:page-links', links);
    updatedOptions.pageLinks = links;
    if (pageCount !== pagingOptions.value.totalPages) {
      emit('update:total-pages', pageCount);
      updatedOptions.totalPages = pageCount;
    }
    emit('update:options', updatedOptions);
    await nextTick(() => (updating = false));
    return true;
  };

  const updatePagedItems = (pageLinkCount: number) => {
    let pagedItems: any[] = [];
    const itemsPerPage = pagingOptions.value.itemsPerPage;
    const items = pagingOptions.value.items;
    if (pageLinkCount === 0 || !itemsPerPage || itemsPerPage === 'all') {
      pagedItems = [...items];
    } else {
      const length = itemsPerPage;
      const start = (pagingOptions.value.currentPage - 1) * length;
      pagedItems = items.slice(start, start + length);
    }
    emit('update:paged-items', pagedItems);
    emit('update:options', { ...pagingOptions.value, pagedItems });
  };

  const itemsUpdated = async () => {
    await nextTick(async () => {
      if (await updatePages()) updatePagedItems(pagingOptions.value.totalPages);
    });
  };

  const gotoPage = (page: string | number) => {
    if (isSpacer(page)) return;
    if (page < 1 || page > pagingOptions.value.totalPages) return;

    const currentPage = page;
    emit('update:current-page', currentPage);
    emit('update:options', { ...pagingOptions.value, currentPage });
  };

  watch(
    pagingOptions,
    async (newVal, oldVal) => {
      const update =
        (!!newVal && !oldVal) ||
        (!!newVal &&
          !!oldVal &&
          (JSON.stringify(newVal.items) !== JSON.stringify(oldVal.items) ||
            newVal.currentPage !== oldVal.currentPage ||
            newVal.itemsPerPage !== oldVal.itemsPerPage));

      if (update) {
        await itemsUpdated();
      }
    },
    { immediate: true, deep: true }
  );

  return {
    id,
    getKey,
    gotoPage,
    pagingOptions,
  };
};

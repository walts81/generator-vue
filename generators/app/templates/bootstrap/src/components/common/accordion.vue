<template>
  <div class="accordion" :class="{ 'accordion-flush': flush }" :id="id" ref="el">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { useComponentHelpers } from './use-component-helpers';

export interface PropDefs {
  flush?: boolean;
  keepOpen?: boolean;
}
const props = withDefaults(defineProps<PropDefs>(), {
  flush: () => false,
  keepOpen: () => false,
});
const { generateId } = useComponentHelpers();
const id = computed(() => generateId('accordion'));
const el = ref<any>(null);
onMounted(() => {
  if (!props.keepOpen) {
    for (let i = 0; i < el.value.children.length; i++) {
      const child = el.value.children[i];
      const collapseable = child.children[1];
      collapseable.setAttribute('data-bs-parent', '#' + id.value);
    }
  }
});
</script>

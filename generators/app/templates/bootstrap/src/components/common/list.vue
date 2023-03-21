<template>
  <div class="list-group" :class="{ 'list-group-flush': flush, 'list-group-numbered': numbered, ...horizontalClass }">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

export interface PropDefs {
  flush?: boolean;
  horizontal?: boolean;
  horizontalAtBreakpoint?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  numbered?: boolean;
}
const props = withDefaults(defineProps<PropDefs>(), {
  flush: () => false,
  horizontal: () => false,
  numbered: () => false,
});
const horizontalClass = computed(() => {
  if (!!props.horizontalAtBreakpoint) {
    return { [`list-group-horizontal-${props.horizontalAtBreakpoint}`]: true };
  }
  return { ['list-group-horizontal']: props.horizontal };
});
</script>

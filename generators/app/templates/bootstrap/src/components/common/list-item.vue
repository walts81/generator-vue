<template>
  <template v-if="!!button">
    <button
      type="button"
      class="list-group-item list-group-item-action"
      :class="{ active, disabled }"
      :disabled="disabled"
      v-bind="$attrs"
      @click="emit('click', $event)"
    >
      {{ text }}
    </button>
  </template>
  <template v-if="!button && hasSlot">
    <div
      class="list-group-item"
      :class="{ 'list-group-item-action': isAction, ...colorClass, active, disabled }"
      v-bind="$attrs"
      @click="emit('click', $event)"
    >
      <slot>{{ text }}</slot>
    </div>
  </template>
  <template v-if="!button && !hasSlot">
    <div
      class="list-group-item d-flex justify-content-between"
      :class="{ ...colorClass, ...alignClass, 'list-group-item-action': isAction, active, disabled }"
      v-bind="$attrs"
      @click="emit('click', $event)"
    >
      {{ text }}
    </div>
  </template>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue';

export interface PropDefs {
  active?: boolean;
  button?: boolean;
  action?: boolean;
  color?: string;
  disabled?: boolean;
  text?: string;
  alignContent?: 'left' | 'center' | 'right';
}
const props = withDefaults(defineProps<PropDefs>(), {
  alignContent: () => 'left',
  button: () => false,
  action: () => false,
  color: () => '',
});
const emit = defineEmits(['click']);
const slots = useSlots();

const hasSlot = computed(() => !!slots.default);
const colorClass = computed(() => ({ [`list-group-item-${props.color}`]: !!props.color }));
const alignClass = computed(() => {
  if (props.alignContent === 'center') return { 'align-items-center': true };
  if (props.alignContent === 'right') return { 'align-items-end': true };
  return { 'align-items-start': true };
});
const isAction = computed(() => props.button || props.action);
</script>

<style scoped lang="scss">
.list-group-item-action {
  &:not(.disabled),
  &:not(:disabled) {
    cursor: pointer;
  }
}
</style>

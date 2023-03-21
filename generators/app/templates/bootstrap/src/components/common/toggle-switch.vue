<template>
  <div class="form-check form-switch">
    <input
      class="form-check-input"
      type="checkbox"
      role="switch"
      :checked="modelValue"
      :class="{ readonly }"
      :disabled="disabled"
      :id="id"
      :readonly="readonly"
      @input="onInput(!modelValue)"
    />
    <label class="form-check-label" :for="id" v-if="!!label">{{ label }}</label>
  </div>
</template>

<script setup lang="ts">
import { useToggleable } from './use-toggleable';

export interface PropDefs {
  modelValue: boolean;
  label?: string;
  disabled?: boolean;
  readonly?: boolean;
}
const props = withDefaults(defineProps<PropDefs>(), {
  label: () => '',
  disabled: () => false,
  readonly: () => false,
});
const emit = defineEmits(['update:modelValue']);
const { id, onInput } = useToggleable('toggle-switch', emit);
</script>

<style scoped lang="scss">
.form-check.form-switch {
  text-align: left;
  input[type='checkbox'],
  label {
    cursor: pointer;
  }
}
</style>

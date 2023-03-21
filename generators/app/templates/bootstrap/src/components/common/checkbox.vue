<template>
  <div class="form-check" :class="{ 'form-check-inline': inline }">
    <input
      class="form-check-input"
      type="checkbox"
      :checked="modelValue"
      :class="{ readonly }"
      :disabled="disabled"
      :id="id"
      :readonly="readonly"
      @click="onInput(!modelValue)"
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
  inline?: boolean;
}
const props = withDefaults(defineProps<PropDefs>(), {
  label: () => '',
  disabled: () => false,
  inline: () => false,
  readonly: () => false,
});
const emit = defineEmits(['update:modelValue']);
const { id, onInput } = useToggleable('checkbox', emit);
</script>

<style scoped lang="scss">
.form-check {
  text-align: left;
  input[type='checkbox'],
  label {
    cursor: pointer;
  }
}
</style>

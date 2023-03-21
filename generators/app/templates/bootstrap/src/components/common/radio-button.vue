<template>
  <div class="radio-group form-check">
    <input
      class="form-check-input"
      type="radio"
      :checked="modelValue"
      :class="{ readonly }"
      :disabled="disabled"
      :id="id"
      :name="groupName"
      :readonly="readonly"
      @click="onInput(!modelValue)"
    />
    <label class="form-check-label" :for="id" v-if="!!label"> {{ label }} </label>
  </div>
</template>

<script setup lang="ts">
import { useToggleable } from './use-toggleable';

export interface PropDefs {
  modelValue: boolean;
  label?: string;
  disabled?: boolean;
  groupName?: string;
  readonly?: boolean;
}
const props = withDefaults(defineProps<PropDefs>(), {
  label: () => '',
  disabled: () => false,
  groupName: () => '',
  readonly: () => false,
});
const emit = defineEmits(['update:modelValue']);
const { id, onInput } = useToggleable('radio-button', emit);
</script>

<style scoped lang="scss">
.radio-group.form-check {
  text-align: left;
  input[type='radio'],
  label {
    cursor: pointer;
  }
}
</style>

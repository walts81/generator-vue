<template>
  <div
    class="text-input mb-3"
    :class="{
      'form-floating': floatingLabel,
      'input-group': append || prepend,
    }"
  >
    <label :for="id" v-if="!!label && !floatingLabel">{{ label }}</label>
    <div class="input-group-text" v-if="prepend">
      <slot name="prepend"></slot>
    </div>
    <input
      class="form-control"
      :class="{
        'is-invalid': isInvalid,
        'form-control-sm': small,
        'form-control-lg': large,
        readonly,
      }"
      :disabled="disabled"
      :id="id"
      :placeholder="localPlaceholder"
      :readonly="readonly"
      :type="type"
      :value="modelValue"
      @blur="validateAndBlur($event)"
      @input="onInput($event)"
    />
    <div class="input-group-text" v-if="append">
      <slot name="append"></slot>
    </div>
    <label :for="id" v-if="!!label && floatingLabel">{{ label }}</label>
    <div v-if="!!validationMessage" class="invalid-feedback">
      {{ validationMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useComponentHelpers } from './use-component-helpers';
import { ValidationRules } from './use-validation';

export interface PropDefs {
  modelValue: string;
  append?: boolean;
  disabled?: boolean;
  floatingLabel?: boolean;
  label?: string;
  large?: boolean;
  placeholder?: string;
  prepend?: boolean;
  readonly?: boolean;
  required?: boolean;
  rules?: ValidationRules;
  small?: boolean;
  type?: string;
}
const props = withDefaults(defineProps<PropDefs>(), {
  append: () => false,
  disabled: () => false,
  floatingLabel: () => false,
  label: () => '',
  large: () => false,
  placeholder: () => '',
  prepend: () => false,
  readonly: () => false,
  required: () => false,
  rules: () => [],
  small: () => false,
  type: () => 'text',
});
const emit = defineEmits(['update:modelValue', 'blur']);
const { isInvalid, validateAndBlur, validationMessage, generateId } = useComponentHelpers({ props, emit });
const id = computed(() => generateId('text-input'));
const localPlaceholder = computed(() =>
  props.floatingLabel ? props.placeholder || props.label || 'placeholder' : props.placeholder
);
const onInput = (e: any) => {
  isInvalid.value = false;
  emit('update:modelValue', e.target.value);
};
</script>

<style scoped lang="scss">
.text-input {
  text-align: left;
  .input-group-text:has(.form-check) {
    padding-right: 0.25rem;
  }
}
</style>

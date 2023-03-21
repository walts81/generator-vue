<template>
  <div class="autocomplete-input mb-3" :class="{ 'form-floating': floatingLabel }">
    <label :for="id" class="form-label" v-if="!!label && !floatingLabel">{{ label }}</label>
    <input
      type="text"
      class="form-control"
      :class="{
        'is-invalid': isInvalid,
        'form-control-sm': small,
        'form-control-lg': large,
        readonly,
      }"
      :disabled="disabled"
      :id="id"
      :list="datalistOptions"
      :placeholder="localPlaceholder"
      :readonly="readonly"
      :value="modelValue"
      @blur="validateAndBlur($event)"
      @input="onInput($event)"
    />
    <label :for="id" class="form-label" v-if="!!label && floatingLabel">{{ label }}</label>
    <datalist :id="datalistOptions">
      <option v-for="(item, index) of items" :key="getKey(id, index)" :value="getText(item)"></option>
    </datalist>
    <div v-if="!!validationMessage" class="invalid-feedback">
      {{ validationMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useChoices } from './use-choices';
import { ValidationRules, useValidation } from './use-validation';

export interface PropDefs {
  modelValue: string | any;
  disabled?: boolean;
  floatingLabel?: boolean;
  items: any[];
  itemText?: string;
  itemValue?: string;
  label?: string;
  large?: boolean;
  placeholder?: string;
  readonly?: boolean;
  required?: boolean;
  rules?: ValidationRules;
  small?: boolean;
  unselectedText?: string;
}

const props = withDefaults(defineProps<PropDefs>(), {
  disabled: () => false,
  floatingLabel: () => false,
  itemText: () => 'text',
  itemValue: () => 'value',
  label: () => '',
  large: () => false,
  placeholder: () => '',
  readonly: () => false,
  required: () => false,
  rules: () => [],
  small: () => false,
  unselectedText: () => '',
});
const emit = defineEmits(['blur', 'update:modelValue']);

const { id, getKey, getText } = useChoices('auto-complete', props, emit);
const { isInvalid, validateAndBlur, validationMessage } = useValidation({ props, emit });
const datalistOptions = computed(() => id.value + '_datalist');
const localPlaceholder = computed(() =>
  props.floatingLabel ? props.placeholder || props.label || 'placeholder' : props.placeholder
);
const onInput = (e: any) => {
  emit('update:modelValue', e.target.value);
};
</script>

<style scoped lang="scss">
.autocomplete-input {
  text-align: left;
}
</style>

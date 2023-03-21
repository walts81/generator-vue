<template>
  <div class="drop-down mb-3">
    <label :for="id" v-if="!!label && !floatingLabel">{{ label }}</label>
    <select
      aria-label="form-select"
      class="form-select mb-3"
      :class="{ 'is-invalid': isInvalid, readonly, 'form-select-sm': small, 'form-select-lg': large }"
      :id="id"
      :disabled="disabled || readonly"
      @change="onSelect($event)"
      @blur="validateAndBlur($event)"
    >
      <option :selected="!modelValue" @click="selectItem(null)">{{ unselectedItemText }}</option>
      <option
        v-for="(item, index) of items"
        :key="getKey(id, index)"
        :selected="isSelected(item)"
        :value="getValue(item)"
      >
        {{ getText(item) }}
      </option>
    </select>
    <label :for="id" v-if="!!label && floatingLabel">{{ label }}</label>
    <div v-if="!!validationMessage" class="invalid-feedback">
      {{ validationMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useChoices } from './use-choices';
import { useValidation, ValidationRules } from './use-validation';

export interface PropDefs {
  modelValue: any;
  items: any[];
  disabled?: boolean;
  floatingLabel?: boolean;
  label?: string;
  large?: boolean;
  readonly?: boolean;
  required?: boolean;
  rules?: ValidationRules;
  small?: boolean;
  itemText?: string;
  itemValue?: string;
  unselectedText?: string;
}

const props = withDefaults(defineProps<PropDefs>(), {
  disabled: () => false,
  floatingLabel: () => false,
  label: () => '',
  large: () => false,
  readonly: () => false,
  required: () => false,
  rules: () => [],
  small: () => false,
  itemText: () => 'text',
  itemValue: () => 'value',
  unselectedText: () => '',
});

const emit = defineEmits(['blur', 'update:modelValue']);
const { id, getKey, getText, getValue, isSelected, selectItem, selectValue } = useChoices('drop-down', props, emit);
const { isInvalid, validateAndBlur, validationMessage } = useValidation({ props, emit });
const unselectedItemText = computed(() => props.unselectedText || 'Select an item');
const onSelect = (e: any) => {
  selectValue(e.target.value);
};
</script>

<style scoped lang="scss">
.drop-down {
  text-align: left;
  .form-select:disabled {
    &.readonly {
      background-color: #fff;
    }
  }
}
</style>

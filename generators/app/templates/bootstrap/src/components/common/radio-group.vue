<template>
  <RadioButton
    v-for="(item, index) of items"
    :key="getKey(id, index)"
    :group-name="id"
    :label="getText(item)"
    :model-value="isSelected(item)"
    @update:model-value="onSelect($event, item)"
  />
</template>

<script setup lang="ts">
import { useChoices } from './use-choices';
import RadioButton from './radio-button.vue';

export interface RadioGroupProps {
  modelValue: any;
  items: any[];
  itemText?: string;
  itemValue?: string;
}
const props = withDefaults(defineProps<RadioGroupProps>(), {
  itemText: () => 'text',
  itemValue: () => 'value',
});
const emit = defineEmits(['update:modelValue']);
const { getKey, getText, id, isSelected, selectItem } = useChoices('radio-group', props, emit);
const onSelect = (e: boolean, item: any) => {
  if (e) {
    selectItem(item);
  }
};
</script>

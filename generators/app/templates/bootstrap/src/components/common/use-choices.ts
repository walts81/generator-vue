import { computed } from 'vue';
import { useComponentHelpers } from './use-component-helpers';

export interface ChoicesProps {
  modelValue?: any;
  items: any[];
  itemText: string;
  itemValue: string;
}
export const useChoices = (
  prefix: string,
  props: ChoicesProps,
  emit: (eventName: 'update:modelValue', ...args: any[]) => void
) => {
  const helpers = useComponentHelpers();
  const id = computed(() => helpers.generateId(prefix));

  const modelValue = computed(() => props.modelValue);
  const items = computed(() => props.items);
  const isString = computed(() => !!items.value && items.value.length > 0 && typeof items.value[0] === 'string');

  const getText = (item: any) => item[props.itemText];
  const getValue = (item: any) => item[props.itemValue];
  const selectValue = (value: any) => {
    const itemValue = props.itemValue;
    if (!!value) {
      const selected =
        items.value.find(x => (isString.value && x === value) || (!isString.value && x[itemValue] === value)) || null;
      emit('update:modelValue', selected);
    } else {
      emit('update:modelValue', null);
    }
  };
  const selectItem = (item: any) => {
    if (isString.value) {
      selectValue(item);
    } else {
      selectValue(!!item ? item[props.itemValue] : null);
    }
  };
  const isSelected = (item: any) => {
    const itemValue = props.itemValue;
    return (
      (isString.value && modelValue.value === item) ||
      (!isString.value && !!modelValue.value && !!item && modelValue.value[itemValue] === item[itemValue])
    );
  };

  return {
    ...helpers,
    id,
    getText,
    getValue,
    selectItem,
    selectValue,
    isSelected,
  };
};

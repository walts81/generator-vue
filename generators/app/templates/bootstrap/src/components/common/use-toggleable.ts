import { computed } from 'vue';
import { useComponentHelpers } from './use-component-helpers';

export const useToggleable = (prefix: string, emit: ModelEmitter) => {
  const { generateId } = useComponentHelpers();
  const id = computed(() => generateId(prefix));
  const onInput = (value: boolean) => {
    emit('update:modelValue', value);
  };

  return {
    id,
    onInput,
  };
};

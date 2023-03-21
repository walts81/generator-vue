<template>
  <input
    class="form-control"
    :type="type"
    :aria-label="label"
    :class="{ 'form-control-sm': small, 'form-control-lg': large }"
    :value="modelValue"
    @input="onInput($event)"
  />
</template>

<script setup lang="ts">
export interface PropDefs {
  modelValue: string;
  label?: string;
  large?: boolean;
  small?: boolean;
  type?: string;
}
const props = withDefaults(defineProps<PropDefs>(), {
  type: () => 'text',
  label: () => '',
});
const emit = defineEmits(['update:modelValue']);
const onInput = (e: any) => {
  emit('update:modelValue', e.target.value);
};
</script>
